import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthenticated, getSaplingRegistrations, getVolunteerRegistrations, getSaplingsPlanted, getSiteCoordinators } from "./actions";
import { getPlantationSites, getPlantationStats } from "@/lib/plantations";
import AdminDashboard from "./AdminDashboard";

export const metadata: Metadata = {
  title: "Admin — Dhare Foundation",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const authed = await isAuthenticated();

  if (!authed) {
    redirect("/login");
  }

  const [saplings, volunteers, saplingsPlanted, plantationSites, plantationStats, siteCoordinators] = await Promise.all([
    getSaplingRegistrations(),
    getVolunteerRegistrations(),
    getSaplingsPlanted(),
    getPlantationSites(),
    getPlantationStats(),
    getSiteCoordinators(),
  ]);

  return (
    <AdminDashboard
      saplings={saplings}
      volunteers={volunteers}
      saplingsPlanted={saplingsPlanted}
      plantationSites={plantationSites}
      plantationStats={plantationStats}
      siteCoordinators={siteCoordinators}
    />
  );
}
