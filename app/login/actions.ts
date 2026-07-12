"use server";

import { redirect } from "next/navigation";
import { getSession, setSessionCookie, clearSessionCookie, type StaffRole } from "@/lib/auth/session";
import { findStaffUser, verifyPassword } from "@/lib/auth/staffUsers";

const DASHBOARD_PATH: Record<StaffRole, string> = {
  admin: "/admin",
  site_coordinator: "/coordinator",
};

function isStaffRole(value: FormDataEntryValue | null): value is StaffRole {
  return value === "admin" || value === "site_coordinator";
}

export async function login(
  _prev: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  const role = formData.get("role");
  const identifier = formData.get("identifier")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  if (!isStaffRole(role)) {
    return { error: "Please select a role." };
  }
  if (!identifier || !password) {
    return { error: "Please enter your username/email and password." };
  }

  const user = await findStaffUser(identifier, role);
  if (!user || !(await verifyPassword(user.password_hash, password))) {
    return { error: "Incorrect username/email or password. Please try again." };
  }

  await setSessionCookie({ userId: user.id, role: user.role, name: user.name });
  redirect(DASHBOARD_PATH[user.role]);
}

export async function logout() {
  await clearSessionCookie();
  redirect("/login");
}

export async function redirectPathForExistingSession(): Promise<string | null> {
  const session = await getSession();
  if (!session) return null;
  return DASHBOARD_PATH[session.role];
}
