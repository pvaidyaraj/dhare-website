"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createPlantationSite } from "./plantationActions";
import { KARNATAKA_DISTRICTS } from "@/app/data/karnatakaDistricts";

const CURRENT_YEAR = new Date().getFullYear();

export default function PlantationForm() {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(createPlantationSite, null);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (formData: FormData) => {
    formAction(formData);
  };

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      setFileNames([]);
    }
  }, [state]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-700 shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900 leading-tight">Add Plantation Site</p>
            <p className="text-xs text-gray-400 mt-0.5">Record a new plantation location and its details</p>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <form ref={formRef} action={handleSubmit} className="mt-6 space-y-5">
          {/* Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Year <span className="text-red-500">*</span>
              </label>
              <input
                name="year"
                type="number"
                defaultValue={CURRENT_YEAR}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>

            {/* District */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                District <span className="text-red-500">*</span>
              </label>
              <select
                name="district"
                required
                defaultValue=""
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              >
                <option value="" disabled>
                  Select district
                </option>
                {KARNATAKA_DISTRICTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Location Name <span className="text-red-500">*</span>
            </label>
            <input
              name="place_name"
              type="text"
              placeholder="e.g. Bannerghatta Road Green Belt"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              rows={2}
              placeholder="Full address of the plantation site"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent resize-none"
            />
          </div>

          {/* GPS Coordinates */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              GPS Coordinates <span className="text-red-500">*</span>
            </label>
            <input
              name="gps"
              type="text"
              placeholder="12.9716, 77.5946"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
            <p className="text-gray-400 text-xs mt-1">
              Open the location in Google Maps, right-click it, then click the coordinates shown
              (e.g. 12.9716, 77.5946) to copy them — paste here.
            </p>
          </div>

          {/* No. of Trees */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              No. of Trees <span className="text-red-500">*</span>
            </label>
            <input
              name="sapling_count"
              type="number"
              min={1}
              placeholder="e.g. 250"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>

          {/* Upload Photos/Videos */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Upload Photos/Videos
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
                Plantation site saved.
              </p>
              {state.warnings?.map((w) => (
                <p key={w} className="text-amber-600 text-xs">{w}</p>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 disabled:opacity-40 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            {pending ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Saving…
              </>
            ) : (
              "Save Plantation Site"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
