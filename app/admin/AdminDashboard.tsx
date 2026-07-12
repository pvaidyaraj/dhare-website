"use client";

import { useState } from "react";
import Image from "next/image";
import { logout } from "@/app/login/actions";
import PlantationForm from "./PlantationForm";
import EditPlantationSiteModal from "./EditPlantationSiteModal";
import GoogleMapModal from "./GoogleMapModal";
import RegistrationsPanel, { type Stat } from "./RegistrationsPanel";
import SaplingsPlantedStat from "./SaplingsPlantedStat";
import type { PlantationSite, PlantationStats } from "@/lib/plantations";

type Row = Record<string, unknown>;

interface Props {
  saplings: Row[];
  volunteers: Row[];
  saplingsPlanted: number;
  plantationSites: PlantationSite[];
  plantationStats: PlantationStats;
}

const PLANTATION_COLS = [
  { key: "year",          label: "Year" },
  { key: "district",      label: "District" },
  { key: "place_name",    label: "Location" },
  { key: "address",       label: "Address" },
  { key: "gps",           label: "GPS" },
  { key: "sapling_count", label: "Trees" },
  { key: "created_at",    label: "Added On" },
];

const SAPLING_COLS = [
  { key: "full_name",             label: "Name" },
  { key: "mobile",                label: "Mobile" },
  { key: "email",                 label: "Email" },
  { key: "assembly_constituency", label: "Constituency" },
  { key: "address",               label: "Address" },
  { key: "saplings_count",        label: "Saplings" },
  { key: "created_at",            label: "Registered On" },
];

const VOLUNTEER_COLS = [
  { key: "full_name",      label: "Name" },
  { key: "age",            label: "Age" },
  { key: "district",       label: "District" },
  { key: "phone",          label: "Phone" },
  { key: "email",          label: "Email" },
  { key: "skills",         label: "Skills" },
  { key: "availability",   label: "Availability" },
  { key: "other_interests",label: "Other Interests" },
  { key: "motivation",     label: "Motivation" },
  { key: "created_at",     label: "Registered On" },
];

function totalSaplingsRequested(saplings: Row[]): number {
  return saplings.reduce((sum, r) => sum + (Number(r.saplings_count) || 0), 0);
}

const TABS = [
  { key: "plantations", label: "Plantation Sites" },
  { key: "saplings",    label: "Sapling Registrations" },
  { key: "volunteers",  label: "Volunteer Registrations" },
  { key: "settings",    label: "Settings" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function AdminDashboard({ saplings, volunteers, saplingsPlanted, plantationSites, plantationStats }: Props) {
  const [tab, setTab] = useState<TabKey>("plantations");
  const [editingSite, setEditingSite] = useState<PlantationSite | null>(null);
  const [mapSite, setMapSite] = useState<{ latitude: number; longitude: number; label: string } | null>(null);

  const plantationRows: Row[] = plantationSites.map(s => ({
    ...s,
    gps: s.latitude != null && s.longitude != null ? `${s.latitude}, ${s.longitude}` : null,
  }));

  const counts: Partial<Record<TabKey, number>> = {
    plantations: plantationSites.length,
    saplings: saplings.length,
    volunteers: volunteers.length,
  };

  const plantationStatCards: Stat[] = [
    {
      label: "Plantation Sites",
      value: plantationStats.total_sites,
      sub: "Total sites recorded",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
    },
    {
      label: "Total Trees Planted",
      value: plantationStats.total_saplings,
      sub: "Across all recorded sites",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      label: "Districts Covered",
      value: plantationStats.total_districts,
      sub: "Distinct districts",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  const saplingStatCards: Stat[] = [
    {
      label: "Sapling Registrations",
      value: saplings.length,
      sub: "Total requests received",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      label: "Total Saplings Requested",
      value: totalSaplingsRequested(saplings),
      sub: "Across all registrations",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const volunteerStatCards: Stat[] = [
    {
      label: "Volunteer Registrations",
      value: volunteers.length,
      sub: "People ready to contribute",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ── Header ── */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20">
        <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logos/dhare-logo-new.png"
              alt="Dhare Foundation"
              width={44}
              height={44}
              className="rounded-full"
            />
            <div>
              <p className="font-bold text-gray-900 leading-tight">Dhare Foundation</p>
              <p className="text-xs text-gray-400">Administration Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <form action={logout}>
              <button
                type="submit"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-200 px-4 py-2 rounded-xl transition-colors bg-gray-50 hover:bg-red-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-screen-xl mx-auto w-full px-6 py-8 space-y-7">

        {/* ── Tabs ── */}
        <div className="flex gap-2 border-b border-gray-200">
          {TABS.map(({ key, label }) => {
            const active = tab === key;
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`relative pb-3 px-4 text-sm font-semibold transition-colors ${
                  active ? "text-green-700" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {label}
                {counts[key] !== undefined && (
                  <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {counts[key]}
                  </span>
                )}
                {active && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-full" />}
              </button>
            );
          })}
        </div>

        {tab === "plantations" && (
          <div className="space-y-7">
            <PlantationForm />
            <RegistrationsPanel
              data={plantationRows}
              cols={PLANTATION_COLS}
              stats={plantationStatCards}
              searchPlaceholder="Search by location, district, address…"
              csvFilenamePrefix="dhare-plantation-sites"
              onGpsClick={(row) => {
                const latitude = row.latitude as number | null;
                const longitude = row.longitude as number | null;
                if (latitude == null || longitude == null) return;
                setMapSite({ latitude, longitude, label: String(row.place_name ?? "Plantation Site") });
              }}
              renderRowActions={(row) => (
                <button
                  onClick={() => setEditingSite(row as unknown as PlantationSite)}
                  className="text-green-700 hover:text-green-900 text-xs font-semibold"
                >
                  Edit
                </button>
              )}
            />
          </div>
        )}

        {tab === "saplings" && (
          <RegistrationsPanel
            data={saplings}
            cols={SAPLING_COLS}
            stats={saplingStatCards}
            searchPlaceholder="Search by name, email, phone, constituency…"
            csvFilenamePrefix="dhare-saplings"
          />
        )}

        {tab === "volunteers" && (
          <RegistrationsPanel
            data={volunteers}
            cols={VOLUNTEER_COLS}
            stats={volunteerStatCards}
            searchPlaceholder="Search by name, email, phone, district…"
            csvFilenamePrefix="dhare-volunteers"
          />
        )}

        {tab === "settings" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-md">
            <p className="font-semibold text-gray-900 leading-tight mb-1">Public Website Counter</p>
            <p className="text-xs text-gray-400 mb-4">Displayed on the Hero and About sections of the public website</p>
            <SaplingsPlantedStat initialValue={saplingsPlanted} />
          </div>
        )}
      </main>

      {editingSite && (
        <EditPlantationSiteModal site={editingSite} onClose={() => setEditingSite(null)} />
      )}

      {mapSite && (
        <GoogleMapModal
          latitude={mapSite.latitude}
          longitude={mapSite.longitude}
          label={mapSite.label}
          onClose={() => setMapSite(null)}
        />
      )}
    </div>
  );
}
