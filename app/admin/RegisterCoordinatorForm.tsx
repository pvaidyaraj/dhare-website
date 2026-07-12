"use client";

import { useActionState, useEffect, useRef } from "react";
import { registerStaffCoordinator } from "./actions";

export default function RegisterCoordinatorForm() {
  const [state, formAction, pending] = useActionState(registerStaffCoordinator, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) formRef.current?.reset();
  }, [state]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-md">
      <p className="font-semibold text-gray-900 leading-tight mb-1">Register Site Coordinator</p>
      <p className="text-xs text-gray-400 mb-4">Creates a login for a new Site Coordinator</p>

      <form ref={formRef} action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Name</label>
          <input
            name="name"
            type="text"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Username</label>
          <input
            name="username"
            type="text"
            placeholder="e.g. prash77"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
          <input
            name="password"
            type="password"
            minLength={8}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          />
          <p className="text-gray-400 text-xs mt-1">At least 8 characters. Share this with the coordinator securely.</p>
        </div>

        {state?.error && (
          <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-xl p-3">
            {state.error}
          </p>
        )}

        {state?.success && (
          <p className="text-sm text-green-700 font-medium bg-green-50 border border-green-100 rounded-xl p-3 flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Site Coordinator account created.
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 disabled:opacity-40 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          {pending ? "Creating…" : "Create Coordinator Account"}
        </button>
      </form>
    </div>
  );
}
