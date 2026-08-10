import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { readStore, writeStore, nextId } from "@/db/local-store";
import { SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-session";

const DEMO_ADMIN_EMAIL = "admin@kleberstore.com";
const DEMO_ADMIN_PASSWORD = "123456";

export async function requireLocalAdmin() {
  const email = verifyAdminSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!email) return null;

  const store = await readStore();
  let user = store.users.find((u) => u.email.toLowerCase() === email && u.role === "admin");

  // Repair only the fixed demo admin account. This keeps the local demo panel
  // usable after older project copies left an old password/role in store.json.
  if (!user && email === DEMO_ADMIN_EMAIL) {
    user = store.users.find((u) => u.email.toLowerCase() === DEMO_ADMIN_EMAIL);
    if (!user) {
      user = {
        id: nextId(store.users),
        name: "Kleber Admin",
        email: DEMO_ADMIN_EMAIL,
        password: await bcrypt.hash(DEMO_ADMIN_PASSWORD, 10),
        role: "admin",
      };
      store.users.push(user);
    } else {
      user.role = "admin";
      user.password = await bcrypt.hash(DEMO_ADMIN_PASSWORD, 10);
      user.name = user.name || "Kleber Admin";
    }
    await writeStore(store);
  }

  return user ?? null;
}
