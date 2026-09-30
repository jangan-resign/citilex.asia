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
};

export async function loginAction(prevState: any, formData: FormData) {
  const password = formData.get("password") as string;
  
  if (!password) {
    return { error: "Password cannot be empty." };
  }

  const role = authData[password];

  if (!role) {
    return { error: "Invalid password." };
  }

  const cookieStore = await cookies();

  if (role !== "super-admin") {
    const existingSession = await prisma.roleSession.findUnique({
      where: { role }
    });

    const currentDeviceSession = cookieStore.get("auth_session_token")?.value;

    if (existingSession && existingSession.expiresAt > new Date()) {
      if (existingSession.sessionToken !== currentDeviceSession) {
        return { error: "Akses ditolak: Akun ini sedang login di perangkat lain. Harap tunggu hingga sesi sebelumnya berakhir (maks 8 jam)." };
      }
    }

    const sessionToken = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 8);

    await prisma.roleSession.upsert({
      where: { role },
      update: { sessionToken, expiresAt },
      create: { role, sessionToken, expiresAt }
    });

    cookieStore.set("auth_session_token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });
  }

  cookieStore.set("auth_role", role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8, // 8 hours
    path: "/",
  });

  return { success: true, role };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const role = cookieStore.get("auth_role")?.value;
  
  if (role && role !== "super-admin") {
    const currentDeviceSession = cookieStore.get("auth_session_token")?.value;
    if (currentDeviceSession) {
      await prisma.roleSession.deleteMany({
        where: { 
          role,
          sessionToken: currentDeviceSession
        }
      });
    }
  }

  cookieStore.delete("auth_role");
  cookieStore.delete("auth_session_token");
  redirect("/login");
}
