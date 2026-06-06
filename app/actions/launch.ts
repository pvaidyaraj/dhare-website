"use server";

import { unstable_noStore as noStore } from "next/cache";
import { createServerClient } from "@/lib/supabase";

export async function getLaunchActive(): Promise<boolean> {
  noStore();
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

export async function completeLaunch(): Promise<{ success: boolean }> {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("site_settings")
    .update({ launch_active: false })
    .eq("id", true);
  return { success: !error };
}

export async function reactivateLaunch() {
  const supabase = createServerClient();
  await supabase
    .from("site_settings")
    .update({ launch_active: true })
    .eq("id", true);
}
