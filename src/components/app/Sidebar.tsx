"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
// @ts-ignore
import { LicenseFooter } from "../../lib/core-ui";
import {
  MessageSquare,
  Users,
  GraduationCap,
  Factory,
  Calculator,
  LayoutDashboard,
  Settings,
  Menu,
  X,
  FolderOpen,
  FileText,
  TrendingUp,
  PenTool,
  Scissors,
  Truck,
  Receipt,
  Loader2,
  Megaphone,
  MonitorPlay,
  Briefcase,
  CalendarClock,
  Banknote,
  LineChart,
  UserCheck,
  Scale,
  Wallet,
  UserMinus,
  PieChart
} from "lucide-react";

const salesNavigation = [
  { name: "Leads Dashboard", href: "/app/leads-dashboard", icon: LayoutDashboard },
  { name: "Inbox", href: "/app/inbox", icon: MessageSquare },
  { name: "Leads Database", href: "/app/leads", icon: Users },
  { name: "Calculator", href: "/app/calculator", icon: Calculator },
  { name: "Quotations (SPH)", href: "/app/quotations", icon: FileText },
  { name: "Invoices (Tagihan)", href: "/app/invoices", icon: Receipt },
  { name: "Sales Reports", href: "/app/sales-reports", icon: PieChart },
  { name: "Assets", href: "/app/assets", icon: FolderOpen },
  { name: "Playbook", href: "/app/playbook", icon: GraduationCap },
];

const crmNavigation = [
  { name: "Clients Database", href: "/app/clients", icon: Users },
  { name: "Pipelines Kanban", href: "/app/pipelines", icon: TrendingUp },
];

const operationNavigation = [
  { name: "Factory Database", href: "/app/factory", icon: Factory },
  { name: "Inventory", href: "/app/inventory", icon: Scissors },
];

const marketingNavigation = [
  { name: "Google Ads", href: "/app/google-ads", icon: MonitorPlay },
  { name: "Meta Ads", href: "/app/meta-ads", icon: Megaphone },
];

const hrdNavigation = [
  { name: "Employee Directory", href: "/app/hrd/employees", icon: Briefcase },
  { name: "Attendance & Leave", href: "/app/hrd/attendance", icon: CalendarClock },
  { name: "Payroll", href: "/app/hrd/payroll", icon: Banknote },
  { name: "Recruitment", href: "/app/hrd/recruitment", icon: UserCheck },
  { name: "Termination", href: "/app/hrd/termination", icon: UserMinus },
];

const financeNavigation = [
  { name: "Cash Flow", href: "/app/finance/cash-flow", icon: LineChart },
  { name: "Expenses", href: "/app/finance/expenses", icon: Wallet },
  { name: "Financial Reports", href: "/app/finance/reports", icon: FileText },
  { name: "Tax & Legal", href: "/app/finance/tax", icon: Scale },
];

export function Sidebar({ userRole = "Unknown" }: { userRole?: string }) {
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
    "super-admin": "Super Admin",
    "business-partner": "Business Partner",
    "sales": "Sales Staff",
    "crm": "CRM Staff",
    "materials": "Materials Staff",
    "marketing": "Marketing Staff",
    "hrd": "HRD Staff",
    "finance": "Finance Staff",
  };
  
  const displayRole = roleDisplayNames[userRole] || userRole;
  // create initials from displayRole (e.g. "Super Admin" -> "SA")
  const initials = displayRole.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();

  const isExpanded = isHovered || isMobileOpen;
  const isMultiArea = ["super-admin", "business-partner"].includes(userRole);

  return (
    <>
      {/* Mobile Topbar */}
      <div className="flex md:hidden h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 shrink-0">
        <div className="flex items-center">
          <img
            src="/workspace.png"
            alt="Logo"
            className="h-8 w-auto"
          />
        </div>
        <button
          onClick={() => setIsMobileOpen(true)}
          className="text-slate-500 hover:text-brand-gold transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Desktop Spacer (keeps the main content from sliding under the fixed sidebar) */}
      <div className="hidden md:block w-20 shrink-0 h-full border-r border-slate-200 bg-white"></div>

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
        <div className={`flex h-16 items-center border-b border-slate-200 relative ${isExpanded ? "px-6" : "justify-center px-0"}`}>
          <Link href="/app" className="flex items-center" onClick={() => setIsMobileOpen(false)}>
            <div className={`relative overflow-hidden transition-all duration-300 flex items-center ${isExpanded ? "w-36" : "w-8"}`}>
              <img
                src="/workspace.png"
                alt="CITILEX ASIA Workspace Logo"
                className="h-8 w-auto max-w-none"
              />
            </div>
          </Link>
          {/* Mobile Close Button */}
          {isMobileOpen && (
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute right-4 md:hidden text-slate-400 hover:text-brand-primary"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4 scrollbar-hide">
          {/* Sales Area */}
          {(["super-admin", "business-partner", "sales"].includes(userRole)) && (
          <div className="space-y-1">
            <h4 className={`px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 transition-all ${!isExpanded ? "opacity-0 w-0 h-0 overflow-hidden" : "opacity-100"}`}>
              Sales Area
            </h4>
            {salesNavigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  title={!isExpanded ? item.name : undefined}
                  className={`group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                    ? "bg-brand-gold-light text-brand-gold"
                    : "text-slate-500 hover:bg-slate-50 hover:text-brand-primary"
                    } ${!isExpanded ? "justify-center" : ""}`}
                >
                  <item.icon
                    className={`h-5 w-5 flex-shrink-0 transition-colors ${isActive ? "text-brand-gold" : "text-slate-400 group-hover:text-brand-primary"
                      } ${isExpanded && "mr-3"}`}
                    aria-hidden="true"
                  />
                  <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
          )}

          {/* CRM Area */}
          {(["super-admin", "business-partner", "crm"].includes(userRole)) && (
          <div className={`space-y-1 ${isMultiArea ? "border-t border-slate-100 pt-4 mt-4" : ""}`}>
            <h4 className={`px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 transition-all ${!isExpanded ? "opacity-0 w-0 h-0 overflow-hidden" : "opacity-100"}`}>
              CRM Area
            </h4>
            {(() => {
              const items = [...crmNavigation];
              // Move Inbox to CRM Area specifically for CRM role
              if (userRole === "crm") {
                const inboxItem = salesNavigation.find(i => i.name === "Inbox");
                if (inboxItem) items.unshift(inboxItem);
              }
              return items;
            })().map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  title={!isExpanded ? item.name : undefined}
                  className={`group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                    ? "bg-brand-gold-light text-brand-gold"
                    : "text-slate-500 hover:bg-slate-50 hover:text-brand-primary"
                    } ${!isExpanded ? "justify-center" : ""}`}
                >
                  <item.icon
                    className={`h-5 w-5 flex-shrink-0 transition-colors ${isActive ? "text-brand-gold" : "text-slate-400 group-hover:text-brand-primary"
                      } ${isExpanded && "mr-3"}`}
                    aria-hidden="true"
                  />
                  <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
          )}

          {/* Materials Area */}
          {(["super-admin", "business-partner", "materials"].includes(userRole)) && (
          <div className={`space-y-1 ${isMultiArea ? "border-t border-slate-100 pt-4 mt-4" : ""}`}>
            <h4 className={`px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 transition-all ${!isExpanded ? "opacity-0 w-0 h-0 overflow-hidden" : "opacity-100"}`}>
              Materials Area
            </h4>
            {operationNavigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  title={!isExpanded ? item.name : undefined}
                  className={`group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                    ? "bg-brand-gold-light text-brand-gold"
                    : "text-slate-500 hover:bg-slate-50 hover:text-brand-primary"
                    } ${!isExpanded ? "justify-center" : ""}`}
                >
                  <item.icon
                    className={`h-5 w-5 flex-shrink-0 transition-colors ${isActive ? "text-brand-gold" : "text-slate-400 group-hover:text-brand-primary"
                      } ${isExpanded && "mr-3"}`}
                    aria-hidden="true"
                  />
                  <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
          )}

          {/* Marketing Area */}
          {(["super-admin", "business-partner", "marketing"].includes(userRole)) && (
          <div className={`space-y-1 ${isMultiArea ? "border-t border-slate-100 pt-4 mt-4" : ""}`}>
            <h4 className={`px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 transition-all ${!isExpanded ? "opacity-0 w-0 h-0 overflow-hidden" : "opacity-100"}`}>
              Marketing Area
            </h4>
            {marketingNavigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  title={!isExpanded ? item.name : undefined}
                  className={`group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                    ? "bg-brand-gold-light text-brand-gold"
                    : "text-slate-500 hover:bg-slate-50 hover:text-brand-primary"
                    } ${!isExpanded ? "justify-center" : ""}`}
                >
                  <item.icon
                    className={`h-5 w-5 flex-shrink-0 transition-colors ${isActive ? "text-brand-gold" : "text-slate-400 group-hover:text-brand-primary"
                      } ${isExpanded && "mr-3"}`}
                    aria-hidden="true"
                  />
                  <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
          )}

          {/* HRD Area */}
          {(["super-admin", "business-partner", "hrd"].includes(userRole)) && (
          <div className={`space-y-1 ${isMultiArea ? "border-t border-slate-100 pt-4 mt-4" : ""}`}>
            <h4 className={`px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 transition-all ${!isExpanded ? "opacity-0 w-0 h-0 overflow-hidden" : "opacity-100"}`}>
              HRD Area
            </h4>
            {hrdNavigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  title={!isExpanded ? item.name : undefined}
                  className={`group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                    ? "bg-brand-gold-light text-brand-gold"
                    : "text-slate-500 hover:bg-slate-50 hover:text-brand-primary"
                    } ${!isExpanded ? "justify-center" : ""}`}
                >
                  <item.icon
                    className={`h-5 w-5 flex-shrink-0 transition-colors ${isActive ? "text-brand-gold" : "text-slate-400 group-hover:text-brand-primary"
                      } ${isExpanded && "mr-3"}`}
                    aria-hidden="true"
                  />
                  <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
          )}

          {/* Finance Area */}
          {(["super-admin", "business-partner", "finance"].includes(userRole)) && (
          <div className={`space-y-1 ${isMultiArea ? "border-t border-slate-100 pt-4 mt-4" : ""}`}>
            <h4 className={`px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 transition-all ${!isExpanded ? "opacity-0 w-0 h-0 overflow-hidden" : "opacity-100"}`}>
              Finance Area
            </h4>
            {financeNavigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  title={!isExpanded ? item.name : undefined}
                  className={`group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                    ? "bg-brand-gold-light text-brand-gold"
                    : "text-slate-500 hover:bg-slate-50 hover:text-brand-primary"
                    } ${!isExpanded ? "justify-center" : ""}`}
                >
                  <item.icon
                    className={`h-5 w-5 flex-shrink-0 transition-colors ${isActive ? "text-brand-gold" : "text-slate-400 group-hover:text-brand-primary"
                      } ${isExpanded && "mr-3"}`}
                    aria-hidden="true"
                  />
                  <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
          )}

          {/* Settings Area Removed - Now only in dropdown */}
        </nav>

        {/* User Profile */}
        <div ref={profileRef} className="relative border-t border-slate-200 p-4">
          <div 
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors ${!isExpanded ? "justify-center" : ""}`}
            title={!isExpanded ? displayRole : undefined}
          >
            <div className="h-8 w-8 shrink-0 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold font-bold text-xs">
              {initials}
            </div>
            <div className={`flex flex-col truncate transition-all duration-300 ${isExpanded ? "w-auto opacity-100" : "w-0 opacity-0 hidden"}`}>
              <span className="text-sm font-semibold text-brand-primary truncate">{displayRole}</span>
              <span className="text-xs text-slate-500">Online</span>
            </div>
          </div>
          
          {/* Profile Dropdown Menu */}
          {isProfileMenuOpen && (
            <div className={`absolute bottom-full left-4 mb-2 bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-200/50 overflow-hidden transition-all duration-200 ${isExpanded ? "w-56" : "w-48"}`}>
              <div className="p-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold font-bold text-sm">
                    {initials}
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="text-sm font-bold text-slate-800 truncate">{displayRole}</span>
                    <span className="text-[10px] text-brand-gold font-medium px-2 py-0.5 bg-brand-gold/10 rounded-full w-max mt-0.5">Verified</span>
                  </div>
                </div>
              </div>
              <div className="p-1">
                <Link
                  href="/app/settings"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-brand-primary hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
                <button 
                  disabled={isLoggingOut}
                  onClick={() => {
                    setIsLoggingOut(true);
                    import("../../actions/auth").then(m => m.logoutAction());
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-brand-primary hover:bg-slate-50 rounded-lg transition-colors mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoggingOut ? (
                    <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out flex-shrink-0"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                  )}
                  {isLoggingOut ? "Keluar..." : "Logout"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
