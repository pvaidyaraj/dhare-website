import { createServerClient } from "./supabase";

export type PlantationSite = {
  id: string;
  year: number;
  district: string;
  place_name: string;
  address: string;
  sapling_count: number;
  latitude: number | null;
  longitude: number | null;
  planted_date: string | null;
  created_at: string;
};

export type PlantationMedia = {
  id: string;
  site_id: string;
  storage_path: string;
  file_type: "photo" | "video";
  caption: string | null;
  sort_order: number;
  created_at: string;
  url: string;
};

export type PlantationStats = {
  total_saplings: number;
  total_sites: number;
  total_districts: number;
};

export type DistrictSummary = {
  district: string;
  sapling_count: number;
  site_count: number;
  sites: PlantationSite[];
};

function getMediaUrl(storagePath: string): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${url}/storage/v1/object/public/plantation-media/${storagePath}`;
}

export async function getPlantationYears(): Promise<number[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("plantation_sites")
    .select("year")
    .order("year", { ascending: false });

  if (error) throw new Error(`Failed to fetch years: ${error.message}`);

  const years = [...new Set((data ?? []).map((r) => r.year as number))];
  return years;
}

export async function getPlantationStats(year?: number): Promise<PlantationStats> {
  const supabase = createServerClient();
  let query = supabase.from("plantation_sites").select("district, sapling_count");
  if (year) query = query.eq("year", year);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to fetch stats: ${error.message}`);

  const rows = data ?? [];
  return {
    total_saplings: rows.reduce((sum, r) => sum + (r.sapling_count as number), 0),
    total_sites: rows.length,
    total_districts: new Set(rows.map((r) => r.district as string)).size,
  };
}

export async function getPlantationSites(year?: number): Promise<PlantationSite[]> {
  const supabase = createServerClient();
  let query = supabase
    .from("plantation_sites")
    .select("*")
    .order("district")
    .order("place_name");

  if (year) query = query.eq("year", year);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to fetch sites: ${error.message}`);

  return (data ?? []) as PlantationSite[];
}

export async function getDistrictSummaries(year?: number): Promise<DistrictSummary[]> {
  const sites = await getPlantationSites(year);

  const map = new Map<string, DistrictSummary>();
  for (const site of sites) {
    const existing = map.get(site.district);
    if (existing) {
      existing.sapling_count += site.sapling_count;
      existing.site_count += 1;
      existing.sites.push(site);
    } else {
      map.set(site.district, {
        district: site.district,
        sapling_count: site.sapling_count,
        site_count: 1,
        sites: [site],
      });
    }
  }

  return [...map.values()].sort((a, b) => b.sapling_count - a.sapling_count);
}

export async function getSiteMedia(siteId: string): Promise<PlantationMedia[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("plantation_media")
    .select("*")
    .eq("site_id", siteId)
    .order("sort_order")
    .order("created_at");

  if (error) throw new Error(`Failed to fetch media: ${error.message}`);

  return ((data ?? []) as Omit<PlantationMedia, "url">[]).map((row) => ({
    ...row,
    url: getMediaUrl(row.storage_path),
  }));
}
