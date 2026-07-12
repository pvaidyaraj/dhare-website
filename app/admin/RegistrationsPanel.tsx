"use client";

import { useState, useMemo } from "react";

type Row = Record<string, unknown>;

export type Col = { key: string; label: string };
export type Stat = { icon: React.ReactNode; label: string; value: number | string; sub?: string };

interface Props {
  data: Row[];
  cols: Col[];
  stats: Stat[];
  searchPlaceholder: string;
  csvFilenamePrefix: string;
  renderRowActions?: (row: Row) => React.ReactNode;
  onGpsClick?: (row: Row) => void;
}

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

function downloadCSV(data: Row[], cols: Col[], filename: string) {
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

export function StatCard({ icon, label, value, sub }: Stat) {
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

export default function RegistrationsPanel({ data, cols, stats, searchPlaceholder, csvFilenamePrefix, renderRowActions, onGpsClick }: Props) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return data;
    return data.filter(row => cols.some(c => formatCell(row[c.key]).toLowerCase().includes(q)));
  }, [data, cols, search]);

  return (
    <div className="space-y-7">
      {/* ── Stat cards ── */}
      {stats.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>
      )}

      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder={searchPlaceholder}
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
          {filtered.length} of {data.length} records
        </span>
        <button
          onClick={() => downloadCSV(filtered, cols, `${csvFilenamePrefix}-${new Date().toISOString().slice(0, 10)}.csv`)}
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
                {renderRowActions && <th className="w-10" />}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={cols.length + (renderRowActions ? 2 : 1)} className="text-center py-16">
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
                        {c.key === "saplings_count" || c.key === "sapling_count" ? (
                          <span className="bg-green-100 text-green-800 font-semibold text-xs px-2.5 py-1 rounded-full">
                            {formatCell(row[c.key])}
                          </span>
                        ) : c.key === "gps" && onGpsClick && row[c.key] ? (
                          <button
                            onClick={() => onGpsClick(row)}
                            className="text-green-700 hover:text-green-900 underline decoration-dotted underline-offset-2"
                          >
                            {formatCell(row[c.key])}
                          </button>
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
                    {renderRowActions && (
                      <td className="px-5 py-3.5 text-right">{renderRowActions(row)}</td>
                    )}
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
    </div>
  );
}
