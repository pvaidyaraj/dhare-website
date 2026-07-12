"use server";

import { z } from "zod";
import { createServerClient } from "@/lib/supabase";
import { isAuthenticated } from "@/lib/auth/session";
import { hashPassword, getSiteCoordinators } from "@/lib/auth/staffUsers";

export { getSiteCoordinators };

const registerCoordinatorSchema = z.object({
  name: z.string().trim().min(2, "Please enter a name"),
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-z0-9_.]+$/, "Username can only contain letters, numbers, dots, and underscores"),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type RegisterCoordinatorState = { error?: string; success?: boolean };

export async function registerStaffCoordinator(
  _prev: RegisterCoordinatorState | null,
  formData: FormData
): Promise<RegisterCoordinatorState> {
  const authed = await isAuthenticated();
  if (!authed) return { error: "Unauthorized" };

  const parsed = registerCoordinatorSchema.safeParse({
    name: formData.get("name"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form fields." };
  }

  const password_hash = await hashPassword(parsed.data.password);
  const supabase = createServerClient();

  const { error } = await supabase.from("staff_users").insert({
    name: parsed.data.name,
    username: parsed.data.username,
    email: parsed.data.email,
    password_hash,
    role: "site_coordinator",
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "That username or email is already registered." };
    }
    return { error: error.message };
  }

  return { success: true };
}
