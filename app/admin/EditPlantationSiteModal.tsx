"use client";

import { useActionState, useEffect, useState } from "react";
import { updatePlantationSite, getPlantationMediaForSite } from "./plantationActions";
import { KARNATAKA_DISTRICTS } from "@/app/data/karnatakaDistricts";
import type { PlantationSite, PlantationMedia } from "@/lib/plantations";

interface Props {
  site: PlantationSite;
  onClose: () => void;
}

export default function EditPlantationSiteModal({ site, onClose }: Props) {
  const [state, formAction, pending] = useActionState(updatePlantationSite, null);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [media, setMedia] = useState<PlantationMedia[] | null>(null);

  useEffect(() => {
    getPlantationMediaForSite(site.id).then(setMedia);
  }, [site.id]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (state?.success && !state.warnings) {
      const t = setTimeout(onClose, 1200);
      return () => clearTimeout(t);
    }
  }, [state, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">Edit Plantation Site</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form action={formAction} className="space-y-5">
          <input type="hidden" name="site_id" value={site.id} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Year <span className="text-red-500">*</span>
              </label>
              <input
                name="year"
                type="number"
                defaultValue={site.year}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                District <span className="text-red-500">*</span>
              </label>
              <select
                name="district"
                required
                defaultValue={site.district}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              >
                {KARNATAKA_DISTRICTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Location Name <span className="text-red-500">*</span>
            </label>
            <input
              name="place_name"
              type="text"
              defaultValue={site.place_name}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              rows={2}
              defaultValue={site.address}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              GPS Coordinates <span className="text-red-500">*</span>
            </label>
            <input
              name="gps"
              type="text"
              defaultValue={site.latitude != null && site.longitude != null ? `${site.latitude}, ${site.longitude}` : ""}
              placeholder="12.9716, 77.5946"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
            <p className="text-gray-400 text-xs mt-1">
              Open the location in Google Maps, right-click it, then click the coordinates shown to copy them — paste here.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              No. of Trees <span className="text-red-500">*</span>
            </label>
            <input
              name="sapling_count"
              type="number"
              min={1}
              defaultValue={site.sapling_count}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>

          {/* Existing media (read-only for now) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Existing Media {media ? `(${media.length})` : ""}
            </label>
            {media === null ? (
              <p className="text-gray-400 text-xs">Loading…</p>
            ) : media.length === 0 ? (
              <p className="text-gray-400 text-xs">No photos or videos uploaded yet.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {media.map((m) =>
                  m.file_type === "photo" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={m.id} src={m.url} alt="" className="w-16 h-16 rounded-lg object-cover border border-gray-200" />
                  ) : (
                    <span key={m.id} className="w-16 h-16 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </span>
                  )
                )}
              </div>
            )}
          </div>

          {/* Add more photos/videos */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Add More Photos/Videos
            </label>
            <input
              name="media"
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={(e) => setFileNames(Array.from(e.target.files ?? []).map((f) => f.name))}
              className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-green-50 file:text-green-700 file:text-sm file:font-semibold hover:file:bg-green-100"
            />
            {fileNames.length > 0 && (
              <p className="text-gray-400 text-xs mt-1">
                {fileNames.length} file{fileNames.length !== 1 ? "s" : ""} selected: {fileNames.join(", ")}
              </p>
            )}
          </div>

          {state?.error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-xl p-3">
              {state.error}
            </p>
          )}

          {state?.success && (
            <div className="text-sm text-green-700 font-medium bg-green-50 border border-green-100 rounded-xl p-3 space-y-1">
              <p className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Plantation site updated.
              </p>
              {state.warnings?.map((w) => (
                <p key={w} className="text-amber-600 text-xs">{w}</p>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={pending}
              className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 disabled:opacity-40 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              {pending ? "Saving…" : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-gray-700 px-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
