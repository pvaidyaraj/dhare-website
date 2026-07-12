"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase";
import { getSaplingsPlanted } from "@/lib/settings";
import { isAuthenticated } from "@/lib/auth/session";

export { getSaplingsPlanted };

export async function getSaplingRegistrations() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("sapling_registrations")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getVolunteerRegistrations() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("volunteer_registrations")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function updateSaplingsPlanted(
  _prev: { error?: string; success?: boolean } | null,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const authed = await isAuthenticated();
  if (!authed) return { error: "Unauthorized" };

  const count = Number(formData.get("saplings_planted"));
  if (!Number.isInteger(count) || count < 0) {
    return { error: "Please enter a valid positive number." };
  }

  const supabase = createServerClient();
  const { error } = await supabase
    .from("site_settings")
    .update({ saplings_planted: count })
    .eq("id", true);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/[locale]", "page");
  return { success: true };
}
