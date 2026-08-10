import crypto from "node:crypto";

const SESSION_COOKIE = "kleber_admin";

function secret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "kleber-store-local-development-secret-change-me"
  );
}

export function createAdminSession(email: string) {
  const normalized = email.toLowerCase().trim();
  const payload = Buffer.from(normalized, "utf8").toString("base64url");
  const signature = crypto
    .createHmac("sha256", secret())
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

export function verifyAdminSession(token: string | undefined) {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = crypto
    .createHmac("sha256", secret())
    .update(payload)
    .digest("base64url");

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    return Buffer.from(payload, "base64url").toString("utf8").toLowerCase().trim();
  } catch {
    return null;
  }
}

export { SESSION_COOKIE };
