"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { logout } from "./actions";

type Row = Record<string, unknown>;

interface Props {
  saplings: Row[];
  volunteers: Row[];
}

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

function formatCell(value: unknown): string {
  if (value == null) return "—";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "string" && /\d{4}-\d{2}-\d{2}T/.test(value)) {
    return new Date(value).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  }
  return String(value);
}

function totalSaplings(saplings: Row[]): number {
  return saplings.reduce((sum, r) => sum + (Number(r.saplings_count) || 0), 0);
}

function downloadCSV(data: Row[], cols: { key: string; label: string }[], filename: string) {
  if (!data.length) return;
  const header = cols.map(c => `"${c.label}"`).join(",");
  const rows = data.map(row =>
    cols.map(c => `"${formatCell(row[c.key]).replace(/"/g, '""')}"`).join(",")
  );
  const blob = new Blob(["﻿" + [header, ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: number | string; sub?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0 text-green-700">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value.toLocaleString("en-IN")}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

export default function AdminDashboard({ saplings, volunteers }: Props) {
  const [tab, setTab] = useState<"saplings" | "volunteers">("saplings");
  const [search, setSearch] = useState("");

  const isSaplings = tab === "saplings";
  const cols  = isSaplings ? SAPLING_COLS : VOLUNTEER_COLS;
  const rawData = isSaplings ? saplings : volunteers;

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return rawData;
    return rawData.filter(row => cols.some(c => formatCell(row[c.key]).toLowerCase().includes(q)));
  }, [rawData, cols, search]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ── Header ── */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20">
        <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between">
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
      </header>

      <main className="flex-1 max-w-screen-xl mx-auto w-full px-6 py-8 space-y-7">

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Sapling Registrations"
            value={saplings.length}
            sub="Total requests received"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            }
          />
          <StatCard
            label="Total Saplings Requested"
            value={totalSaplings(saplings)}
            sub="Across all registrations"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            label="Volunteer Registrations"
            value={volunteers.length}
            sub="People ready to contribute"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
          />
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-2 border-b border-gray-200">
          {(["saplings", "volunteers"] as const).map(t => {
            const active = tab === t;
            const label = t === "saplings" ? "Sapling Registrations" : "Volunteer Registrations";
            const count = t === "saplings" ? saplings.length : volunteers.length;
            return (
              <button
                key={t}
                onClick={() => { setTab(t); setSearch(""); }}
                className={`relative pb-3 px-4 text-sm font-semibold transition-colors ${
                  active ? "text-green-700" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {label}
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {count}
                </span>
                {active && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-full" />}
              </button>
            );
          })}
        </div>

        {/* ── Toolbar ── */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, email, phone, constituency…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <span className="text-sm text-gray-400 whitespace-nowrap">
            {filtered.length} of {rawData.length} records
          </span>
          <button
            onClick={() => downloadCSV(filtered, cols, `dhare-${tab}-${new Date().toISOString().slice(0, 10)}.csv`)}
            disabled={filtered.length === 0}
            className="flex items-center gap-2 bg-green-700 hover:bg-green-800 disabled:opacity-40 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors shadow-sm whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download CSV
          </button>
        </div>

        {/* ── Table ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-green-50 border-b border-green-100">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-green-800 uppercase tracking-wider w-10">#</th>
                  {cols.map(c => (
                    <th key={c.key} className="text-left px-5 py-3.5 text-xs font-semibold text-green-800 uppercase tracking-wider whitespace-nowrap">
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={cols.length + 1} className="text-center py-16">
                      <div className="flex flex-col items-center gap-2 text-gray-400">
                        <svg className="w-10 h-10 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <p className="text-sm font-medium">No records found</p>
                        {search && <p className="text-xs">Try a different search term</p>}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((row, i) => (
                    <tr
                      key={String(row.id ?? i)}
                      className={`border-b border-gray-50 hover:bg-green-50/40 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}
                    >
                      <td className="px-5 py-3.5 text-gray-400 text-xs font-medium">{i + 1}</td>
                      {cols.map(c => (
                        <td key={c.key} className="px-5 py-3.5 text-gray-700 max-w-[240px]">
                          {c.key === "saplings_count" ? (
                            <span className="bg-green-100 text-green-800 font-semibold text-xs px-2.5 py-1 rounded-full">
                              {formatCell(row[c.key])}
                            </span>
                          ) : c.key === "skills" || c.key === "availability" ? (
                            <div className="flex flex-wrap gap-1">
                              {(row[c.key] as string[] ?? []).slice(0, 3).map((tag: string) => (
                                <span key={tag} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">{tag}</span>
                              ))}
                              {(row[c.key] as string[] ?? []).length > 3 && (
                                <span className="text-gray-400 text-xs">+{(row[c.key] as string[]).length - 3}</span>
                              )}
                            </div>
                          ) : (
                            <span className="block truncate" title={formatCell(row[c.key])}>
                              {formatCell(row[c.key])}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {filtered.length > 0 && (
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400 flex items-center justify-between">
              <span>Showing {filtered.length} record{filtered.length !== 1 ? "s" : ""}</span>
              <span>All times in IST</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
