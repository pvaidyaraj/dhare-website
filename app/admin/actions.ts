"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase";
import { getSaplingsPlanted } from "@/lib/settings";
import { getSiteMedia, type PlantationMedia } from "@/lib/plantations";
import { requireRole } from "@/lib/auth/session";
import { plantationSchema, parseGps, sanitizeFilename, validateMediaFiles } from "./plantationValidation";

export { getSaplingsPlanted };

export async function isAuthenticated(): Promise<boolean> {
  return (await requireRole("admin")) !== null;
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

export type PlantationFormState = { error?: string; success?: boolean; warnings?: string[] };

export async function createPlantationSite(
  _prev: PlantationFormState | null,
  formData: FormData
): Promise<PlantationFormState> {
  const authed = await isAuthenticated();
  if (!authed) return { error: "Unauthorized" };

  const parsed = plantationSchema.safeParse({
    year: formData.get("year"),
    district: formData.get("district"),
    place_name: formData.get("place_name"),
    address: formData.get("address"),
    sapling_count: formData.get("sapling_count"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form fields." };
  }

  const gps = parseGps(formData.get("gps")?.toString() ?? "");
  if (!gps) {
    return {
      error:
        "Couldn't read those coordinates — copy the two numbers Google Maps shows, e.g. 12.9716, 77.5946.",
    };
  }

  const files = formData.getAll("media").filter((f): f is File => f instanceof File && f.size > 0);
  const fileError = validateMediaFiles(files);
  if (fileError) return { error: fileError };

  const supabase = createServerClient();

  const { data: site, error: siteError } = await supabase
    .from("plantation_sites")
    .insert({
      year: parsed.data.year,
      district: parsed.data.district,
      place_name: parsed.data.place_name,
      address: parsed.data.address,
      sapling_count: parsed.data.sapling_count,
      latitude: gps.latitude,
      longitude: gps.longitude,
    })
    .select("id")
    .single();

  if (siteError || !site) {
    return { error: siteError?.message ?? "Failed to save the plantation site." };
  }

  const warnings: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const path = `${site.id}/${i}-${sanitizeFilename(file.name)}`;

    const { error: uploadError } = await supabase.storage
      .from("plantation-media")
      .upload(path, file, { contentType: file.type });

    if (uploadError) {
      warnings.push(`Failed to upload "${file.name}": ${uploadError.message}`);
      continue;
    }

    const { error: mediaError } = await supabase.from("plantation_media").insert({
      site_id: site.id,
      storage_path: path,
      file_type: file.type.startsWith("video/") ? "video" : "photo",
      sort_order: i,
    });
    if (mediaError) {
      warnings.push(`Saved "${file.name}" but failed to record it: ${mediaError.message}`);
    }
  }

  revalidatePath("/admin");
  return { success: true, warnings: warnings.length ? warnings : undefined };
}

export async function getPlantationMediaForSite(siteId: string): Promise<PlantationMedia[]> {
  const authed = await isAuthenticated();
  if (!authed) return [];
  return getSiteMedia(siteId);
}

export async function updatePlantationSite(
  _prev: PlantationFormState | null,
  formData: FormData
): Promise<PlantationFormState> {
  const authed = await isAuthenticated();
  if (!authed) return { error: "Unauthorized" };

  const siteId = formData.get("site_id")?.toString();
  if (!siteId) return { error: "Missing site reference." };

  const parsed = plantationSchema.safeParse({
    year: formData.get("year"),
    district: formData.get("district"),
    place_name: formData.get("place_name"),
    address: formData.get("address"),
    sapling_count: formData.get("sapling_count"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form fields." };
  }

  const gps = parseGps(formData.get("gps")?.toString() ?? "");
  if (!gps) {
    return {
      error:
        "Couldn't read those coordinates — copy the two numbers Google Maps shows, e.g. 12.9716, 77.5946.",
    };
  }

  const files = formData.getAll("media").filter((f): f is File => f instanceof File && f.size > 0);
  const fileError = validateMediaFiles(files);
  if (fileError) return { error: fileError };

  const supabase = createServerClient();

  const { error: updateError } = await supabase
    .from("plantation_sites")
    .update({
      year: parsed.data.year,
      district: parsed.data.district,
      place_name: parsed.data.place_name,
      address: parsed.data.address,
      sapling_count: parsed.data.sapling_count,
      latitude: gps.latitude,
      longitude: gps.longitude,
    })
    .eq("id", siteId);

  if (updateError) {
    return { error: updateError.message };
  }

  const warnings: string[] = [];
  if (files.length > 0) {
    const { count: existingCount, error: countError } = await supabase
      .from("plantation_media")
      .select("id", { count: "exact", head: true })
      .eq("site_id", siteId);

    if (countError) {
      warnings.push(`Site updated, but couldn't check existing media: ${countError.message}`);
    } else {
      const startIndex = existingCount ?? 0;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const path = `${siteId}/${startIndex + i}-${sanitizeFilename(file.name)}`;

        const { error: uploadError } = await supabase.storage
          .from("plantation-media")
          .upload(path, file, { contentType: file.type });

        if (uploadError) {
          warnings.push(`Failed to upload "${file.name}": ${uploadError.message}`);
          continue;
        }

        const { error: mediaError } = await supabase.from("plantation_media").insert({
          site_id: siteId,
          storage_path: path,
          file_type: file.type.startsWith("video/") ? "video" : "photo",
          sort_order: startIndex + i,
        });
        if (mediaError) {
          warnings.push(`Saved "${file.name}" but failed to record it: ${mediaError.message}`);
        }
      }
    }
  }

  revalidatePath("/admin");
  return { success: true, warnings: warnings.length ? warnings : undefined };
}
