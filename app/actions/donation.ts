"use server";

import crypto from "crypto";
import Razorpay from "razorpay";
import { z } from "zod";

function getRazorpayClient() {
  const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error("Missing Razorpay environment variables");
  }

  return new Razorpay({ key_id, key_secret });
}

const createOrderSchema = z.object({
  amount: z
    .number()
    .int("Amount must be a whole number of rupees")
    .min(10, "Minimum donation is ₹10")
    .max(1000000, "Amount is too large"),
});

export type CreateDonationOrderResult =
  | { success: true; orderId: string; amount: number; currency: string; keyId: string }
  | { success: false; error: string };

export async function createDonationOrder(
  amountInRupees: number
): Promise<CreateDonationOrderResult> {
  const parsed = createOrderSchema.safeParse({ amount: amountInRupees });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid amount" };
  }

  try {
    const razorpay = getRazorpayClient();
    const order = await razorpay.orders.create({
      amount: parsed.data.amount * 100, // paise
      currency: "INR",
      receipt: `donation_${Date.now()}`,
    });

    return {
      success: true,
      orderId: order.id,
      amount: parsed.data.amount * 100,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
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

export type VerifyDonationPaymentResult =
  | { success: true; paymentId: string }
  | { success: false; error: string };

export async function verifyDonationPayment(
  data: z.infer<typeof verifyPaymentSchema>
): Promise<VerifyDonationPaymentResult> {
  const parsed = verifyPaymentSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: "Invalid payment response" };
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_secret) {
    throw new Error("Missing Razorpay environment variables");
  }

  const expectedSignature = crypto
    .createHmac("sha256", key_secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  const expected = Buffer.from(expectedSignature);
  const actual = Buffer.from(razorpay_signature);
  const isValid = expected.length === actual.length && crypto.timingSafeEqual(expected, actual);

  if (!isValid) {
    return { success: false, error: "Payment verification failed" };
  }

  return { success: true, paymentId: razorpay_payment_id };
}
