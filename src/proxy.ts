import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Area mappings for RBAC
const roleAccessMap: Record<string, string[]> = {
  "super-admin": ["*"], // All access
  "business-partner": ["*"], // All access (Edit button hidden via UI)
  "sales": ["sales-reports", "pipelines", "quotations", "clients", "playbook", "calculator", "leads-dashboard", "inbox", "leads", "assets"],
  "crm": ["leads", "leads-dashboard", "inbox", "clients", "pipelines"],
  "materials": ["inventory", "factory"],
  "marketing": ["meta-ads", "google-ads"],
  "hrd": ["hrd"],
  "finance": ["finance", "invoices"],
};

const defaultPathMap: Record<string, string> = {
  "super-admin": "/app/leads-dashboard",
  "business-partner": "/app/leads-dashboard",
  "sales": "/app/leads-dashboard",
  "crm": "/app/clients",
  "materials": "/app/factory",
  "marketing": "/app/google-ads",
  "hrd": "/app/hrd/employees",
  "finance": "/app/finance/cash-flow",
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /app routes
  if (pathname.startsWith("/app")) {
    const roleCookie = request.cookies.get("auth_role")?.value;

    if (!roleCookie) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // RBAC check
    const allowedAreas = roleAccessMap[roleCookie] || [];
    
    // If user has wildcard access, let them through
    if (allowedAreas.includes("*")) {
      // Except if they hit exactly /app
      if (pathname === "/app" || pathname === "/app/") {
        return NextResponse.redirect(new URL(defaultPathMap[roleCookie] || "/app/leads-dashboard", request.url));
      }
      return NextResponse.next();
    }

    // Extract the specific area from the path, e.g. /app/sales-reports -> sales-reports
    const pathParts = pathname.split("/");
    const requestedArea = pathParts[2]; // e.g. ["", "app", "sales-reports"] -> "sales-reports"

    // If accessing root /app, redirect to their default path
    if (!requestedArea) {
      const defaultPath = defaultPathMap[roleCookie];
      if (defaultPath) {
         return NextResponse.redirect(new URL(defaultPath, request.url));
      } else {
         return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    // Check if the area is allowed
    if (!allowedAreas.includes(requestedArea) && requestedArea !== "") {
       // Redirect to unauthorized or their main area
       const defaultPath = defaultPathMap[roleCookie] || "/login";
       return NextResponse.redirect(new URL(defaultPath, request.url));
    }
  }

  // Redirect authenticated users from /login to /app
  if (pathname === "/login") {
    const roleCookie = request.cookies.get("auth_role")?.value;
    if (roleCookie) {
      return NextResponse.redirect(new URL(defaultPathMap[roleCookie] || "/app", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/login"],
};
