import "server-only";
import bcrypt from "bcryptjs";
import { createServerClient } from "@/lib/supabase";
import type { StaffRole } from "./session";

export type StaffUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  password_hash: string;
  role: StaffRole;
};

const STAFF_USER_COLUMNS = "id, name, username, email, password_hash, role";

export async function findStaffUser(identifier: string, role: StaffRole): Promise<StaffUser | null> {
  const value = identifier.trim().toLowerCase();
  const supabase = createServerClient();

  const byUsername = await supabase
    .from("staff_users")
    .select(STAFF_USER_COLUMNS)
    .eq("username", value)
    .eq("role", role)
    .maybeSingle();
  if (byUsername.error) throw new Error(byUsername.error.message);
  if (byUsername.data) return byUsername.data;

  const byEmail = await supabase
    .from("staff_users")
    .select(STAFF_USER_COLUMNS)
    .eq("email", value)
    .eq("role", role)
    .maybeSingle();
  if (byEmail.error) throw new Error(byEmail.error.message);
  return byEmail.data;
}

export async function verifyPassword(hash: string, plain: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

export type SiteCoordinator = {
  id: string;
  name: string;
  username: string;
  email: string;
  created_at: string;
};

export async function getSiteCoordinators(): Promise<SiteCoordinator[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("staff_users")
    .select("id, name, username, email, created_at")
    .eq("role", "site_coordinator")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}
