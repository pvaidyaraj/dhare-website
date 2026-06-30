"use server";

import { createHash } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase";
import { getSaplingsPlanted } from "@/lib/settings";

export { getSaplingsPlanted };

function sessionToken(): string {
  const pw = process.env.ADMIN_PASSWORD ?? "";
  return createHash("sha256").update(`dhare-admin:${pw}`).digest("hex");
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  return !!session && session === sessionToken();
}

export async function login(
  _prev: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  const password = formData.get("password")?.toString() ?? "";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "";

  if (!adminPassword || password !== adminPassword) {
    return { error: "Incorrect password. Please try again." };
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_session", sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
    path: "/",
  });

  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin");
}

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
