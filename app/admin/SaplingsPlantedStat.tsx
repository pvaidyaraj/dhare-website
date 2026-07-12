"use client";

import { useActionState, useEffect, useState } from "react";
import { updateSaplingsPlanted } from "./actions";

interface Props {
  initialValue: number;
}

export default function SaplingsPlantedStat({ initialValue }: Props) {
  const [value, setValue] = useState(initialValue);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(initialValue));
  const [state, formAction, pending] = useActionState(updateSaplingsPlanted, null);

  useEffect(() => {
    if (state?.success) {
      setValue(Number(draft));
      setEditing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  if (!editing) {
    return (
      <button
        onClick={() => { setDraft(String(value)); setEditing(true); }}
        className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-green-700 transition-colors"
      >
        <span>
          Saplings Planted: <span className="font-semibold text-gray-900">{value.toLocaleString("en-IN")}</span>
        </span>
        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
    );
  }

  return (
    <form action={formAction} className="flex items-center gap-2">
      <input
        name="saplings_planted"
        type="number"
        min="0"
        step="1"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        autoFocus
        className="w-32 border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
      />
      <button
        type="submit"
        disabled={pending}
        className="text-sm font-medium text-white bg-green-700 hover:bg-green-800 disabled:opacity-40 px-3 py-1.5 rounded-lg transition-colors"
      >
        {pending ? "…" : "Save"}
      </button>
      <button
        type="button"
        onClick={() => setEditing(false)}
        className="text-sm text-gray-500 hover:text-gray-700 px-2"
      >
        Cancel
      </button>
      {state?.error && <p className="text-xs text-red-600">{state.error}</p>}
    </form>
  );
}
