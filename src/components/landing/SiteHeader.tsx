import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu, X, GraduationCap, UserCheck, ShieldCheck, Phone, BookOpen } from 'lucide-react';
import { Button } from '../ui/button';

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="rounded-lg bg-primary p-2 text-primary-foreground">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="font-bold text-lg sm:text-xl tracking-tight">
            Igugulethu Ulwazi Academy
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link to="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/about" className="transition-colors hover:text-primary">
            About
          </Link>
          <Link to="/contact" className="transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>

        {/* Desktop Portal Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Link to="/student-login">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5">
              <UserCheck className="h-4 w-4" />
              Student Portal
            </Button>
          </Link>
          <Link to="/staff-login">
            <Button variant="default" size="sm" className="flex items-center gap-1.5">
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
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b bg-background px-4 pt-2 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3 pt-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-base font-medium hover:bg-accent transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-base font-medium hover:bg-accent transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-base font-medium hover:bg-accent transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="pt-4 border-t flex flex-col space-y-2.5">
            <Link to="/student-login" onClick={() => setMobileMenuOpen(false)} className="w-full">
              <Button variant="outline" className="w-full justify-center gap-2">
                <UserCheck className="h-4 w-4" />
                Student Portal
              </Button>
            </Link>
            <Link to="/staff-login" onClick={() => setMobileMenuOpen(false)} className="w-full">
              <Button variant="default" className="w-full justify-center gap-2">
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
