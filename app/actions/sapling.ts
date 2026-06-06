"use server";

import { z } from "zod";
import { createServerClient } from "@/lib/supabase";
import { CONSTITUENCIES } from "@/app/data/constituencies";

const saplingSchema = z.object({
  assembly_constituency: z.string().min(1, "Please select your Assembly Constituency"),
  full_name: z.string().min(3, "Name must be at least 3 characters"),
  address: z.string().min(10, "Please enter your full address"),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Enter a valid email address"),
  saplings_count: z
    .number()
    .int()
    .min(51, "Minimum request is more than 50 saplings"),
});

export type SaplingFormData = z.infer<typeof saplingSchema>;

export type SaplingActionResult =
  | { success: true }
  | { success: false; error: string };

export async function submitSaplingRegistration(
  data: SaplingFormData
): Promise<SaplingActionResult> {
  const parsed = saplingSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: "Invalid form data. Please check your inputs." };
  }

  if (!CONSTITUENCIES.includes(parsed.data.assembly_constituency as typeof CONSTITUENCIES[number])) {
    return { success: false, error: "Invalid Assembly Constituency selected." };
  }

  const supabase = createServerClient();

  const { error } = await supabase.from("sapling_registrations").insert({
    assembly_constituency: parsed.data.assembly_constituency,
    full_name: parsed.data.full_name,
    address: parsed.data.address,
    mobile: parsed.data.mobile,
    email: parsed.data.email,
    saplings_count: parsed.data.saplings_count,
  });

  if (error) {
    console.error("Supabase insert error:", error.message);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true };
}
