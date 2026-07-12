import { z } from "zod";
import { KARNATAKA_DISTRICTS } from "@/app/data/karnatakaDistricts";

export const plantationSchema = z.object({
  year: z.coerce.number().int().min(2000, "Enter a valid year").max(2100, "Enter a valid year"),
  district: z.string().refine((v) => KARNATAKA_DISTRICTS.includes(v), "Please select a valid district"),
  place_name: z.string().trim().min(2, "Please enter a location name"),
  address: z.string().trim().min(5, "Please enter a full address"),
  sapling_count: z.coerce.number().int().min(1, "Enter at least 1 tree"),
});

export const MAX_MEDIA_FILES = 10;
export const MAX_MEDIA_FILE_SIZE = 25 * 1024 * 1024;

export function parseGps(raw: string): { latitude: number; longitude: number } | null {
  const parts = raw.split(",").map((p) => p.trim());
  if (parts.length !== 2) return null;

  const latitude = Number(parts[0]);
  const longitude = Number(parts[1]);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) return null;

  return { latitude, longitude };
}

export function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export function validateMediaFiles(files: File[]): string | null {
  if (files.length > MAX_MEDIA_FILES) {
    return `Please upload at most ${MAX_MEDIA_FILES} files at a time.`;
  }
  for (const file of files) {
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      return `"${file.name}" isn't a photo or video.`;
    }
    if (file.size > MAX_MEDIA_FILE_SIZE) {
      return `"${file.name}" is larger than 25MB.`;
    }
  }
  return null;
}
