import { Phone, Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export function SiteFooter() {
  return (
    <footer className="bg-brand-navy-deep text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-3 lg:px-10">
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm text-white/70">
            Expert tutors, curated resources, and a proven approach that
            guarantees A grades.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-[0.2em] text-brand-amber">SUBJECTS OFFERED</h4>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-white/80">
            <li>Physical Sciences</li>
            <li>Mathematics</li>
            <li>Math Literacy</li>
            <li>Economics</li>
            <li>Business Studies</li>
            <li>History</li>
            <li>Geography</li>
            <li>Life Sciences</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-[0.2em] text-brand-amber">CONTACT US</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-brand-amber" /> 067 148 6015</li>
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-brand-amber" /> moiane158@gmail.com</li>
            <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-brand-amber" /> Johannesburg,&nbsp; South Africa</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-4 text-xs text-white/50 lg:px-10">
          &copy; {new Date().getFullYear()} Igugulethu Ulwazi Academy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
