
import React from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, Mail, Phone, MessageSquare, GraduationCap, ShieldCheck, UserCheck, ExternalLink } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export function SiteFooter() {
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Logo className="h-10 w-auto" />
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Empowering South Africa&apos;s next generation of learners through high-impact tutoring, structured curriculum resources, and academic excellence.
            </p>
            <div className="text-xs font-semibold text-primary">
              Change Lives • Inspire Dreams • Push Limits
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-sm">
            <h4 className="font-bold text-foreground tracking-tight">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">About Us & Our Approach</Link>
              </li>
              <li>
                <Link to="/subscription" className="hover:text-primary transition-colors">Subscription Plans</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">Contact Academy</Link>
              </li>
            </ul>
          </div>

          {/* Portals */}
          <div className="space-y-3 text-sm">
            <h4 className="font-bold text-foreground tracking-tight">Portal Access</h4>
            <ul className="space-y-2 text-muted-foreground text-xs sm:text-sm">
              <li>
                <Link to="/student-login" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <UserCheck className="h-3.5 w-3.5 text-primary" /> Student Portal
                </Link>
              </li>
              <li>
                <Link to="/staff-login" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Staff Portal
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-primary transition-colors">Student Registration</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 text-sm">
            <h4 className="font-bold text-foreground tracking-tight">Contact Us</h4>
            <ul className="space-y-3 text-muted-foreground text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Johannesburg South, Gauteng, RSA</span>
              </li>
              <li>
                <a
                  href="mailto:moiane158@gmail.com"
                  className="flex items-center gap-2.5 hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <span>moiane158@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/27671486015"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-green-600 hover:text-green-700 font-semibold transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>+27 67 148 6015 (WhatsApp)</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>© {new Date().getFullYear()} Igugulethu Ulwazi Academy. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Registered Academy • Johannesburg South, South Africa
          </p>
        </div>
      </div>
    </footer>
  );
}
