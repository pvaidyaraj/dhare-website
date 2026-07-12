import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth/session";
import CoordinatorDashboard from "./CoordinatorDashboard";

export const metadata: Metadata = {
  title: "Site Coordinator — Dhare Foundation",
  robots: { index: false, follow: false },
};

export default async function CoordinatorPage() {
  const session = await requireRole("site_coordinator");

  if (!session) {
    redirect("/login");
  }

  return <CoordinatorDashboard name={session.name} />;
}
