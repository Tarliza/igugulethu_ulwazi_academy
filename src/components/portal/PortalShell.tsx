import { Link, useRouterState } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { LogOut, HelpCircle, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import logo from "@/assets/logo.jpeg";

export interface PortalNavItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

interface PortalShellProps {
  portalName: string;
  variant: "tutor" | "student";
  nav: PortalNavItem[];
  user: { name: string; subtitle: string; initials: string; avatar?: string };
  children: ReactNode;
  pageTitle: string;
}

/**
 * Two visual styles per the Figma designs:
 *  - "tutor": deep-navy sidebar, white content area
 *  - "student": light sidebar with amber active pill, cool content area
 */
export function PortalShell({
  portalName,
  variant,
  nav,
  user,
  children,
  pageTitle,
}: PortalShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isTutor = variant === "tutor";

  const sidebarClass = isTutor
    ? "bg-brand-navy text-white"
    : "bg-white text-brand-navy border-r border-border";

  const activeClass = isTutor
    ? "bg-brand-amber text-brand-navy shadow-soft"
    : "bg-brand-amber text-brand-navy shadow-soft";

  const inactiveClass = isTutor
    ? "text-white/80 hover:bg-white/5 hover:text-white"
    : "text-brand-navy/80 hover:bg-muted";

  return (
    <div className="flex min-h-screen bg-brand-cream">
      {/* Sidebar (desktop) */}
      <aside
        className={`hidden w-64 shrink-0 flex-col justify-between px-4 py-6 md:flex ${sidebarClass}`}
      >
        <div>
          <div className="flex flex-col items-center gap-3 pb-8">
            <img
              src={logo}
              alt="Logo"
              width={72}
              height={72}
              className="h-18 w-18 rounded-full ring-2 ring-brand-amber/50 object-cover"
            />
            <div className="text-center leading-tight">
              <div className={`font-display text-sm font-extrabold ${isTutor ? "text-white" : "text-brand-navy"}`}>
                Igugulethu Ulwazi
              </div>
              <div className="text-xs font-bold tracking-widest text-brand-amber">
                ACADEMY
              </div>
              <div className={`mt-1 text-[11px] ${isTutor ? "text-white/60" : "text-muted-foreground"}`}>
                {portalName}
              </div>
            </div>
          </div>

          <nav className="space-y-1.5">
            {nav.map((item) => {
              const active = pathname === item.to || pathname.startsWith(item.to + "/");
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                    active ? activeClass : inactiveClass
                  }`}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <Link
          to="/"
          className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${inactiveClass}`}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Link>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside
            className={`absolute left-0 top-0 flex h-full w-72 flex-col justify-between px-4 py-6 ${sidebarClass}`}
          >
            <div>
              <div className="flex items-center justify-between pb-6">
                <div className="flex items-center gap-2">
                  <img src={logo} alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
                  <span className={`font-display text-sm font-extrabold ${isTutor ? "text-white" : "text-brand-navy"}`}>
                    {portalName}
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className={`grid h-9 w-9 place-items-center rounded-full ${isTutor ? "bg-white/10 text-white" : "bg-muted text-brand-navy"}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="space-y-1.5">
                {nav.map((item) => {
                  const active = pathname === item.to || pathname.startsWith(item.to + "/");
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium ${
                        active ? activeClass : inactiveClass
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium ${inactiveClass}`}
            >
              <LogOut className="h-4 w-4" /> Logout
            </Link>
          </aside>
        </div>
      )}

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border/60 bg-brand-cream/90 px-4 py-4 backdrop-blur sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-navy text-white md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="truncate font-display text-lg font-extrabold text-brand-navy sm:text-2xl">
              {pageTitle}
            </h1>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden text-right sm:block">
              <div className="text-sm font-semibold text-brand-navy">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.subtitle}</div>
            </div>
            {user.avatar ? (
              <img src={user.avatar} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover ring-2 ring-brand-amber/50" />
            ) : (
              <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-amber font-bold text-brand-navy">
                {user.initials}
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8">{children}</main>

        <button
          className="fixed bottom-5 right-5 grid h-11 w-11 place-items-center rounded-full bg-brand-navy text-white shadow-card transition hover:bg-brand-navy-deep"
          aria-label="Help"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
