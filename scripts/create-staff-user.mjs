// Creates or updates a staff_users row (admin / site_coordinator login).
// Usage: node --env-file=.env.local scripts/create-staff-user.mjs
// Prompts interactively so credentials are never typed into chat or saved to a file.

import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const rl = readline.createInterface({ input: stdin, output: stdout });

async function promptPassword(question) {
  // Node's readline has no built-in masking; this keeps the script simple
  // since it's only ever run locally by the site's own maintainer.
  return rl.question(question);
}

async function main() {
  const name = await rl.question("Name: ");
  const username = (await rl.question("Username (e.g. admin, prash77): ")).trim().toLowerCase();
  const email = (await rl.question("Email: ")).trim().toLowerCase();
  let role = (await rl.question("Role (admin/site_coordinator): ")).trim();
  const password = await promptPassword("Password: ");

  if (role !== "admin" && role !== "site_coordinator") {
    console.error('Role must be exactly "admin" or "site_coordinator".');
    process.exit(1);
  }
  if (!name || !username || !email || !password) {
    console.error("Name, username, email, and password are all required.");
    process.exit(1);
  }

  const password_hash = await bcrypt.hash(password, 10);

  const { error } = await supabase
    .from("staff_users")
    .upsert({ name, username, email, role, password_hash }, { onConflict: "email" });

  if (error) {
    console.error("Failed to create staff user:", error.message);
    process.exit(1);
  }

  console.log(`Created/updated ${role} account for ${email}.`);
  rl.close();
}

main();
