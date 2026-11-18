"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "../lib/prisma";

// Define the passwords and their corresponding roles using environment variables
const authData: Record<string, string> = {
  [process.env.AUTH_QUOTE_SUPER_ADMIN || "gofor1T"]: "super-admin",
  [process.env.AUTH_QUOTE_BUSINESS_PARTNER || "100%scaleup"]: "business-partner",
  [process.env.AUTH_QUOTE_SALES || "behumble"]: "sales",
  [process.env.AUTH_QUOTE_CRM || "nevergiveup"]: "crm",
  [process.env.AUTH_QUOTE_MATERIALS || "keepmoving"]: "materials",
  [process.env.AUTH_QUOTE_MARKETING || "makeithappen"]: "marketing",
  [process.env.AUTH_QUOTE_HRD || "thinkbig"]: "hrd",
  [process.env.AUTH_QUOTE_FINANCE || "stayfocused"]: "finance",
  [process.env.AUTH_QUOTE_CMS || "contentking"]: "cms",
};

interface SessionCookieKeys {
  roleCookie: "auth_role" | "cms_auth_role";
  tokenCookie: "auth_session_token" | "cms_session_token";
}

function getCookieKeysForRole(role: string): SessionCookieKeys {
  return role === "cms"
    ? { roleCookie: "cms_auth_role", tokenCookie: "cms_session_token" }
    : { roleCookie: "auth_role", tokenCookie: "auth_session_token" };
}

async function claimRoleSession(role: string): Promise<{ ok: boolean; error?: string }> {
  const cookieStore = await cookies();
  const { roleCookie, tokenCookie } = getCookieKeysForRole(role);

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8, // 8 hours
    path: "/",
  };

  // Super Admin (pemilik) tidak dibatasi 1-device / 1-browser
  if (role === "super-admin") {
    cookieStore.set(roleCookie, role, cookieOptions);
    return { ok: true };
  }

  const existingSession = await prisma.roleSession.findUnique({
    where: { role },
  });

  const currentDeviceSession = cookieStore.get(tokenCookie)?.value;

  if (existingSession && existingSession.expiresAt > new Date()) {
    if (existingSession.sessionToken !== currentDeviceSession) {
      return {
        ok: false,
        error: "Akses ditolak: Akun ini sedang login di perangkat/browser lain.",
      };
    }
  }

  const sessionToken = crypto.randomUUID();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 8);

  await prisma.roleSession.upsert({
    where: { role },
    update: { sessionToken, expiresAt },
    create: { role, sessionToken, expiresAt },
  });

  cookieStore.set(tokenCookie, sessionToken, cookieOptions);
  cookieStore.set(roleCookie, role, cookieOptions);

  return { ok: true };
}

export async function loginAction(prevState: any, formData: FormData) {
  const password = formData.get("password") as string;

  if (!password) {
    return { error: "Password cannot be empty." };
  }

  const role = authData[password];

  if (!role) {
    return { error: "Invalid password." };
  }

  const result = await claimRoleSession(role);
  if (!result.ok) {
    return { error: result.error };
  }

  return { success: true, role };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const role = cookieStore.get("auth_role")?.value;
  const currentDeviceSession = cookieStore.get("auth_session_token")?.value;

  if (role && role !== "super-admin" && currentDeviceSession) {
    await prisma.roleSession.deleteMany({
      where: {
        role,
        sessionToken: currentDeviceSession,
      },
    });
  }

  cookieStore.delete("auth_role");
  cookieStore.delete("auth_session_token");
  redirect("/login");
}

export async function logoutCmsAction() {
  const cookieStore = await cookies();
  const currentCmsSession = cookieStore.get("cms_session_token")?.value;

  if (currentCmsSession) {
    await prisma.roleSession.deleteMany({
      where: {
        role: "cms",
        sessionToken: currentCmsSession,
      },
    });
  }

  cookieStore.delete("cms_auth_role");
  cookieStore.delete("cms_session_token");
  redirect("/login?from=cms");
}
