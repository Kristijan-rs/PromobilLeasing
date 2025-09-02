import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

type LinkItem = {
  to: string;
  label: string;
  end?: boolean; // za Home
};

const LINKS: readonly LinkItem[] = [
  { to: "/", label: "Home", end: true },
  { to: "/cars", label: "Fahrzeuge" },
  { to: "/leasing-info", label: "LeasingInfos" },
  { to: "/request", label: "Leasinganfrage" },
  { to: "/contact", label: "Kontakt" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkBase =
    "block px-3 py-2 rounded-xl text-md font-medium hover:bg-slate-100";
  const linkActive = ({ isActive }: { isActive: boolean }) =>
    `${linkBase} ${isActive ? "bg-blue-950 text-white" : ""}`;

  return (
    <header className="bg-white border-b border-slate-200 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/logo.webp"
            alt="PromobilLeasing Logo"
            className="h-20 w-auto"
            loading="eager"
            decoding="async"
          />
          <p className="text-lg lg:text-2xl font-semibold tracking-tight text-slate-900">
            PromobilLeasing
          </p>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2 text-slate-900">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkActive}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          aria-label="Menü umschalten"
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="md:hidden rounded-xl border border-slate-900 px-3 py-1.5 cursor-pointer"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div id="mobile-nav" className="md:hidden border-t border-slate-900 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-2">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={linkActive}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
