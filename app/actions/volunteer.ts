"use server";

import { z } from "zod";
import { createServerClient } from "@/lib/supabase";

const volunteerSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  age: z
    .number({ message: "Please enter a valid age" })
    .int("Age must be a whole number")
    .min(16, "Must be at least 16 years old")
    .max(100, "Please enter a valid age"),
  city: z.string().min(2, "City is required"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Enter a valid email address"),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  other_interests: z.string().max(500).optional(),
  availability: z.array(z.string()).min(1, "Select at least one availability slot"),
  motivation: z
    .string()
    .min(20, "Please share a bit more — at least 20 characters")
    .max(1000, "Maximum 1000 characters"),
  not_a_robot: z.literal(true).optional(),
});

export type VolunteerFormData = z.infer<typeof volunteerSchema>;

export type VolunteerActionResult =
  | { success: true }
  | { success: false; error: string };

export async function submitVolunteerForm(
  data: VolunteerFormData
): Promise<VolunteerActionResult> {
  const parsed = volunteerSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: "Invalid form data. Please check your inputs." };
  }

  const supabase = createServerClient();

  const { error } = await supabase.from("volunteer_registrations").insert({
    full_name: parsed.data.full_name,
    age: parsed.data.age,
    city: parsed.data.city,
    phone: parsed.data.phone,
    email: parsed.data.email,
    skills: parsed.data.skills,
    other_interests: parsed.data.other_interests ?? null,
    availability: parsed.data.availability,
    motivation: parsed.data.motivation,
  });

  if (error) {
    if (error.code === "23505") {
      return {
        success: false,
        error: "This email is already registered as a volunteer. Thank you!",
      };
    }
    console.error("Supabase insert error:", error.message);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true };
}
