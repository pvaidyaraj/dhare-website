"use client";

import { useState, useMemo } from "react";
import { logout } from "./actions";

type SaplingRow = Record<string, unknown>;
type VolunteerRow = Record<string, unknown>;

interface Props {
  saplings: SaplingRow[];
  volunteers: VolunteerRow[];
}

const SAPLING_COLS = [
  { key: "full_name", label: "Name" },
  { key: "mobile", label: "Mobile" },
  { key: "email", label: "Email" },
  { key: "assembly_constituency", label: "Constituency" },
  { key: "address", label: "Address" },
  { key: "saplings_count", label: "Saplings" },
  { key: "created_at", label: "Registered On" },
];

const VOLUNTEER_COLS = [
  { key: "full_name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "district", label: "District" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "skills", label: "Skills" },
  { key: "availability", label: "Availability" },
  { key: "other_interests", label: "Other Interests" },
  { key: "motivation", label: "Motivation" },
  { key: "created_at", label: "Registered On" },
];

function formatCell(value: unknown): string {
  if (value == null) return "—";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "string" && value.includes("T") && value.includes("Z")) {
    return new Date(value).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  }
  return String(value);
}

function downloadCSV(data: Record<string, unknown>[], cols: { key: string; label: string }[], filename: string) {
  if (!data.length) return;
  const header = cols.map(c => `"${c.label}"`).join(",");
  const rows = data.map(row =>
    cols.map(c => {
      const val = formatCell(row[c.key]);
      return `"${val.replace(/"/g, '""')}"`;
    }).join(",")
  );
  const csv = [header, ...rows].join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminDashboard({ saplings, volunteers }: Props) {
  const [tab, setTab] = useState<"saplings" | "volunteers">("saplings");
  const [search, setSearch] = useState("");

  const isSaplings = tab === "saplings";
  const cols = isSaplings ? SAPLING_COLS : VOLUNTEER_COLS;
  const rawData = isSaplings ? saplings : volunteers;

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return rawData;
    return rawData.filter(row =>
      cols.some(c => formatCell(row[c.key]).toLowerCase().includes(q))
    );
  }, [rawData, cols, search]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-800 text-white px-6 py-4 flex items-center justify-between shadow">
        <div>
          <h1 className="text-lg font-bold">Dhare Foundation — Admin</h1>
          <p className="text-green-200 text-xs">Registrations Dashboard</p>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="text-sm bg-green-700 hover:bg-green-600 border border-green-600 px-4 py-1.5 rounded-lg transition-colors"
          >
            Logout
          </button>
        </form>
      </header>

      <main className="px-6 py-6 max-w-screen-xl mx-auto">
        {/* Tabs + Stats */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <button
            onClick={() => { setTab("saplings"); setSearch(""); }}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
              isSaplings ? "bg-green-700 text-white shadow" : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Sapling Registrations
            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${isSaplings ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500"}`}>
              {saplings.length}
            </span>
          </button>
          <button
            onClick={() => { setTab("volunteers"); setSearch(""); }}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
              !isSaplings ? "bg-green-700 text-white shadow" : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Volunteer Registrations
            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${!isSaplings ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500"}`}>
              {volunteers.length}
            </span>
          </button>
        </div>

        {/* Search + Download */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Search by name, email, phone…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-[220px] border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <span className="text-sm text-gray-500">
            {filtered.length} of {rawData.length} records
          </span>
          <button
            onClick={() => downloadCSV(
              filtered,
              cols,
              `dhare-${tab}-${new Date().toISOString().slice(0, 10)}.csv`
            )}
            disabled={filtered.length === 0}
            className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-40 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download CSV
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-10">#</th>
                  {cols.map(c => (
                    <th key={c.key} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={cols.length + 1} className="text-center py-12 text-gray-400">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((row, i) => (
                    <tr key={String(row.id ?? i)} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-400 text-xs">{i + 1}</td>
                      {cols.map(c => (
                        <td key={c.key} className="px-4 py-3 text-gray-700 max-w-[260px]">
                          <span className="block truncate" title={formatCell(row[c.key])}>
                            {formatCell(row[c.key])}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
