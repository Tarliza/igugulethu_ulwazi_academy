
import React from "react";
import { Link } from "@tanstack/react-router";

export function Logo({ className = "h-9 w-auto", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <img
        src="/logo.jpeg"
        alt="Igugulethu Ulwazi Academy Logo"
        className={`object-contain rounded-md ${className}`}
        onError={(e) => {
          // Fallback if image path fails
          e.currentTarget.style.display = "none";
        }}
      />
      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-extrabold text-sm sm:text-base tracking-tight text-foreground group-hover:text-primary transition-colors">
            IGUGULETHU ULWAZI
          </span>
          <span className="text-[10px] tracking-widest font-bold text-primary uppercase">
            ACADEMY
          </span>
        </div>
      )}
    </Link>
  );
}