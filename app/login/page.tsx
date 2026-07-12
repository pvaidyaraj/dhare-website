import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { redirectPathForExistingSession } from "./actions";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login — Dhare Foundation",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const existingPath = await redirectPathForExistingSession();
  if (existingPath) redirect(existingPath);

  return <LoginForm />;
}
