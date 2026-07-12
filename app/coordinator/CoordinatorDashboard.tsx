"use client";

import Image from "next/image";
import { logout } from "@/app/login/actions";

interface Props {
  name: string;
}

export default function CoordinatorDashboard({ name }: Props) {
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
              <p className="text-xs text-gray-400">Site Coordinator Portal</p>
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

      <main className="flex-1 max-w-screen-xl mx-auto w-full px-6 py-16 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mb-5">
          <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {name}</h1>
        <p className="text-gray-500 max-w-md">
          The Site Coordinator dashboard is being built. Features and forms for managing your
          plantation site will appear here soon.
        </p>
      </main>
    </div>
  );
}
