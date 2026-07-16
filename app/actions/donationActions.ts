"use server";

import { z } from "zod";
import crypto from "crypto";
import Razorpay from "razorpay";

const createOrderSchema = z.object({
  amount: z.number().int().min(1, "Enter an amount"),
});

export type CreateOrderResult =
  | { success: true; orderId: string; amount: number; currency: string; keyId: string }
  | { success: false; error: string };

export async function createRazorpayOrder(
  data: z.infer<typeof createOrderSchema>
): Promise<CreateOrderResult> {
  const parsed = createOrderSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Enter a valid donation amount." };
  }

  const amountPaise = Math.round(parsed.data.amount * 100);
  if (amountPaise < 100) {
    return { success: false, error: "Minimum donation amount is ₹1." };
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    console.error("Razorpay credentials are not configured.");
    return { success: false, error: "Payment is temporarily unavailable. Please try again later." };
  }

  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

  try {
    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: `donation_${Date.now()}`,
    });

    return {
      success: true,
      orderId: order.id,
      amount: amountPaise,
      currency: order.currency,
      keyId,
    };
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    return { success: false, error: "Could not start payment. Please try again." };
  }
}

const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

export type VerifyPaymentResult =
  | { success: true }
  | { success: false; error: string };

export async function verifyRazorpayPayment(
  data: z.infer<typeof verifyPaymentSchema>
): Promise<VerifyPaymentResult> {
  const parsed = verifyPaymentSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Missing payment details." };
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    console.error("Razorpay credentials are not configured.");
    return { success: false, error: "Could not verify payment. Please contact us." };
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  const isValid =
    expectedSignature.length === razorpay_signature.length &&
    crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(razorpay_signature));

  if (!isValid) {
    return { success: false, error: "Payment verification failed." };
  }

  return { success: true };
}
