"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  FileText,
  Lightbulb,
  Globe,
  FolderOpen,
  Menu,
  X,
  LogOut,
  ExternalLink,
} from "lucide-react";

const contentStudioNavigation = [
  { name: "SEO Overview", href: "/cms", icon: LayoutDashboard, exact: true },
  { name: "AI Article Studio", href: "/cms/write", icon: Sparkles, exact: false },
  { name: "Articles Library", href: "/cms/articles", icon: FileText, exact: false },
  { name: "AI Topic Bank", href: "/cms/topics", icon: Lightbulb, exact: false },
];

const seoArchitectureNavigation = [
  { name: "Money Pages", href: "/cms/landing-pages", icon: Globe, exact: false },
  { name: "Media Gallery", href: "/cms/media", icon: FolderOpen, exact: false },
];

export function CmsSidebar({ userRole = "cms" }: { userRole?: string }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const roleDisplayNames: Record<string, string> = {
    "cms": "CMS Staff",
  };

  const displayRole = roleDisplayNames[userRole] || "CMS Staff";
  const initials = displayRole
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const isExpanded = isHovered || isMobileOpen;

  return (
    <>
      {/* Mobile Topbar */}
      <div className="flex md:hidden h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 shrink-0">
        <div className="flex items-center gap-2.5">
          <img src="/workspace.png" alt="Logo" className="h-8 w-auto" />
          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-brand-gold/10 text-brand-gold">
            CMS Studio
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          aria-label="Buka menu CMS"
          className="text-slate-500 hover:text-brand-gold transition-colors p-2"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Desktop Spacer */}
      <div className="hidden md:block w-20 shrink-0 h-full border-r border-slate-200 bg-white" />

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Actual Sidebar */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed inset-y-0 left-0 z-50 flex h-full flex-col bg-white shadow-xl md:shadow-none border-r border-slate-200 transition-all duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${isExpanded ? "w-64" : "w-20"}
        `}
      >
        {/* Logo Area */}
        <div
          className={`flex h-16 items-center border-b border-slate-200 relative ${
            isExpanded ? "px-6 justify-between" : "justify-center px-0"
          }`}
        >
          <Link href="/cms" className="flex items-center gap-2" onClick={() => setIsMobileOpen(false)}>
            <div
              className={`relative overflow-hidden transition-all duration-300 flex items-center ${
                isExpanded ? "w-32" : "w-8"
              }`}
            >
              <img
                src="/workspace.png"
                alt="CITILEX ASIA CMS Logo"
                className="h-8 w-auto max-w-none"
              />
            </div>
            {isExpanded && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-gold/10 text-brand-gold shrink-0">
                CMS
              </span>
            )}
          </Link>

          {isMobileOpen && (
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Tutup menu CMS"
              className="md:hidden text-slate-400 hover:text-brand-primary p-1"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4 scrollbar-hide">
          {/* Modul 1: Content Studio */}
          <div className="space-y-1">
            <h4
              className={`px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 transition-all ${
                !isExpanded ? "opacity-0 w-0 h-0 overflow-hidden" : "opacity-100"
              }`}
            >
              Content Studio
            </h4>
            {contentStudioNavigation.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  title={!isExpanded ? item.name : undefined}
                  className={`relative group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-brand-gold-light text-brand-gold"
                      : "text-slate-500 hover:bg-slate-50 hover:text-brand-primary"
                  } ${!isExpanded ? "justify-center" : ""}`}
                >
                  <item.icon
                    className={`h-5 w-5 flex-shrink-0 transition-colors ${
                      isActive ? "text-brand-gold" : "text-slate-400 group-hover:text-brand-primary"
                    } ${isExpanded ? "mr-3" : ""}`}
                    aria-hidden="true"
                  />
                  <span
                    className={`overflow-hidden whitespace-nowrap transition-all duration-300 flex-1 ${
                      isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Modul 2: SEO Architecture */}
          <div className="space-y-1 border-t border-slate-100 pt-4 mt-4">
            <h4
              className={`px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 transition-all ${
                !isExpanded ? "opacity-0 w-0 h-0 overflow-hidden" : "opacity-100"
              }`}
            >
              SEO Architecture
            </h4>
            {seoArchitectureNavigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  title={!isExpanded ? item.name : undefined}
                  className={`relative group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-brand-gold-light text-brand-gold"
                      : "text-slate-500 hover:bg-slate-50 hover:text-brand-primary"
                  } ${!isExpanded ? "justify-center" : ""}`}
                >
                  <item.icon
                    className={`h-5 w-5 flex-shrink-0 transition-colors ${
                      isActive ? "text-brand-gold" : "text-slate-400 group-hover:text-brand-primary"
                    } ${isExpanded ? "mr-3" : ""}`}
                    aria-hidden="true"
                  />
                  <span
                    className={`overflow-hidden whitespace-nowrap transition-all duration-300 flex-1 ${
                      isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div ref={profileRef} className="relative border-t border-slate-200 p-4">
          <div
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors ${
              !isExpanded ? "justify-center" : ""
            }`}
            title={!isExpanded ? displayRole : undefined}
          >
            <div className="h-8 w-8 shrink-0 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold font-bold text-xs">
              {initials}
            </div>
            <div
              className={`flex flex-col truncate transition-all duration-300 ${
                isExpanded ? "w-auto opacity-100" : "w-0 opacity-0 hidden"
              }`}
            >
              <span className="text-sm font-semibold text-brand-primary truncate">{displayRole}</span>
              <span className="text-xs text-slate-500">Online</span>
            </div>
          </div>

          {isProfileMenuOpen && (
            <div
              className={`absolute bottom-full left-4 mb-2 bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-200/50 overflow-hidden transition-all duration-200 ${
                isExpanded ? "w-56" : "w-52"
              }`}
            >
              <div className="p-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold font-bold text-sm">
                    {initials}
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="text-sm font-bold text-slate-800 truncate">{displayRole}</span>
                    <span className="text-[10px] text-brand-gold font-medium px-2 py-0.5 bg-brand-gold/10 rounded-full w-max mt-0.5">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-1 space-y-0.5">
                <Link
                  href="/blog"
                  target="_blank"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-brand-primary hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Lihat Blog Publik</span>
                </Link>

                <button
                  type="button"
                  disabled={isLoggingOut}
                  onClick={() => {
                    setIsLoggingOut(true);
                    setIsProfileMenuOpen(false);
                    setTimeout(() => {
                      import("../../actions/auth").then((m) => m.logoutCmsAction());
                    }, 600);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-brand-primary hover:bg-slate-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <LogOut className="w-4 h-4 flex-shrink-0" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full-Screen Logout Overlay */}
      {isLoggingOut && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md"
          style={{
            background: "rgba(26, 29, 37, 0.95)",
            animation: "fadeIn 0.3s ease-out forwards",
          }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes zoomIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
            @keyframes spinSlow { to { transform: rotate(360deg); } }
            @keyframes spinReverse { to { transform: rotate(-360deg); } }
            @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
          `,
            }}
          />

          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div
            className="relative flex flex-col items-center gap-8"
            style={{ animation: "zoomIn 0.5s ease-out 0.1s forwards", opacity: 0 }}
          >
            <img src="/login-logout.png" alt="Logo" className="h-10 w-auto" style={{ opacity: 0.85 }} />

            <div className="relative h-14 w-14">
              <div className="absolute inset-0 rounded-full border-2 border-white/[0.08]" />
              <div
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{
                  borderTopColor: "#b8975a",
                  animation: "spinSlow 0.8s linear infinite",
                }}
              />
              <div
                className="absolute inset-2 rounded-full border-2 border-transparent"
                style={{
                  borderBottomColor: "rgba(255,255,255,0.2)",
                  animation: "spinReverse 1.2s linear infinite",
                }}
              />
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium tracking-wide" style={{ color: "rgba(255,255,255,0.85)" }}>
                Signing you out...
              </span>
              <span
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.35)", animation: "pulse 2s ease-in-out infinite" }}
              >
                See you next time 👋
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
