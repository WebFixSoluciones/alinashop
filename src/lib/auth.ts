import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "alina_admin_session";
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD_DEFAULT || "AlinaAdmin2026*";

export async function isAuthenticatedAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME);
  return session?.value === "authenticated_alina_admin";
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, "authenticated_alina_admin", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export function verifyAdminPassword(password: string): boolean {
  return password === DEFAULT_ADMIN_PASSWORD;
}
