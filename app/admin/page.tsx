import type { Metadata } from "next";
import { isAuthenticated, getSaplingRegistrations, getVolunteerRegistrations } from "./actions";
import LoginForm from "./LoginForm";
import AdminDashboard from "./AdminDashboard";

export const metadata: Metadata = {
  title: "Admin — Dhare Foundation",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const authed = await isAuthenticated();

  if (!authed) {
    return <LoginForm />;
  }

  const [saplings, volunteers] = await Promise.all([
    getSaplingRegistrations(),
    getVolunteerRegistrations(),
  ]);

  return <AdminDashboard saplings={saplings} volunteers={volunteers} />;
}
