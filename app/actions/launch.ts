"use server";

import { createServerClient } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function getLaunchActive(): Promise<boolean> {
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("site_settings")
      .select("launch_active")
      .eq("id", true)
      .single();
    return data?.launch_active ?? false;
  } catch {
    return false;
  }
}

export async function completeLaunch() {
  const supabase = createServerClient();
  await supabase
    .from("site_settings")
    .update({ launch_active: false })
    .eq("id", true);
  redirect("/");
}

export async function reactivateLaunch() {
  const supabase = createServerClient();
  await supabase
    .from("site_settings")
    .update({ launch_active: true })
    .eq("id", true);
}
