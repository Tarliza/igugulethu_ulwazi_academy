
import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, UserCheck, ShieldCheck, Phone, BookOpen, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/Logo";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container mx-auto flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Official Brand Logo */}
        <Logo className="h-10 sm:h-12 w-auto" />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7 text-sm font-semibold text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-primary [&.active]:text-primary">
            Home
          </Link>
          <Link to="/about" className="transition-colors hover:text-primary [&.active]:text-primary">
            About Us
          </Link>
          <Link to="/subscription" className="transition-colors hover:text-primary [&.active]:text-primary">
            Pricing Plans
          </Link>
          <Link to="/contact" className="transition-colors hover:text-primary [&.active]:text-primary">
            Contact
          </Link>
        </nav>

        {/* Desktop Portal Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Link to="/student-login">
            <Button variant="outline" size="sm" className="gap-1.5 font-semibold text-xs h-9">
              <UserCheck className="h-4 w-4 text-primary" />
              Student Portal
            </Button>
          </Link>
          <Link to="/staff-login">
            <Button variant="default" size="sm" className="gap-1.5 font-semibold text-xs h-9">
              <ShieldCheck className="h-4 w-4" />
              Staff Portal
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="h-10 w-10 p-2"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b bg-background px-5 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2.5">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-accent transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-accent transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/subscription"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-accent transition-colors"
            >
              Pricing Plans
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-accent transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="pt-3 border-t flex flex-col space-y-2.5">
            <Link to="/student-login" onClick={() => setMobileMenuOpen(false)} className="w-full">
              <Button variant="outline" className="w-full justify-center gap-2 text-sm font-semibold">
                <UserCheck className="h-4 w-4 text-primary" />
                Student Portal
              </Button>
            </Link>
            <Link to="/staff-login" onClick={() => setMobileMenuOpen(false)} className="w-full">
              <Button variant="default" className="w-full justify-center gap-2 text-sm font-semibold">
                <ShieldCheck className="h-4 w-4" />
                Staff Portal
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
