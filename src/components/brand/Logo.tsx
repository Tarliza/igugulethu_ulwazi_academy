import logo from "@/assets/logo.jpeg";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export function Logo({ variant = "dark", className = "" }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-brand-navy";
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={logo}
        alt="Igugulethu Ulwazi Academy"
        className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-black/10"
        width={44}
        height={44}
      />
      <div className="leading-tight">
        <div className={`font-display text-sm font-extrabold tracking-wide ${textColor}`}>
          IGUGULETHU ULWAZI
        </div>
        <div className="text-[11px] font-bold tracking-[0.2em] text-brand-amber">
          ACADEMY
        </div>
      </div>
    </div>
  );
}
