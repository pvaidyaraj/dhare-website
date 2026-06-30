import { createServerClient } from "@/lib/supabase";

export async function getSaplingsPlanted(): Promise<number> {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("site_settings")
    .select("saplings_planted")
    .eq("id", true)
    .single();
  return data?.saplings_planted ?? 40000;
}
