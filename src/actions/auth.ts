"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Define the passwords and their corresponding roles using environment variables
const authData: Record<string, string> = {
  [process.env.AUTH_QUOTE_SUPER_ADMIN || "behumble"]: "super-admin",
  [process.env.AUTH_QUOTE_BUSINESS_PARTNER || "partner123"]: "business-partner",
  [process.env.AUTH_QUOTE_SALES || "sales123"]: "sales",
  [process.env.AUTH_QUOTE_CRM || "crm123"]: "crm",
  [process.env.AUTH_QUOTE_MATERIALS || "materials123"]: "materials",
  [process.env.AUTH_QUOTE_MARKETING || "marketing123"]: "marketing",
  [process.env.AUTH_QUOTE_HRD || "hrd123"]: "hrd",
  [process.env.AUTH_QUOTE_FINANCE || "finance123"]: "finance",
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

  // Set cookie valid for 7 days
  const cookieStore = await cookies();
  cookieStore.set("auth_role", role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, 
    path: "/",
  });

  // Let the client handle the redirect after successful login to avoid Next.js redirect throwing
  // wait, redirect() in server actions throws, but it's handled by Next.js correctly if not caught
  return { success: true, role };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_role");
  redirect("/login");
}
