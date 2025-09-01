import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const linkBase =
    "block px-3 py-2 rounded-xl text-md font-medium hover:bg-slate-100 transition";
  const linkActive = ({ isActive }: { isActive: boolean }) =>
    `${linkBase} ${isActive ? "bg-slate-900 text-white hover:bg-slate-900" : ""}`;

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/assets/logo.webp" alt="PromobilLeasing Logo" className="h-22 w-auto" />
          <p className="text-lg lg:text-2xl font-semibold tracking-tight text-slate-900">PromobilLeasing</p>
        </Link>

        <nav className="hidden md:flex items-center gap-2 text-slate-900">
          <NavLink to="/" className={linkActive} end>Home</NavLink>
          <NavLink to="/cars" className={linkActive}>Fahrzeuge</NavLink>
          <NavLink to="about" className={linkActive}>Über uns</NavLink>
          <NavLink to="/request" className={linkActive}>Leasinganfrage</NavLink>
          <NavLink to="/contact" className={linkActive}>Kontakt</NavLink>
        </nav>

        <button
          aria-label="Menü umschalten"
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="md:hidden rounded-xl border border-slate-900 px-3 py-1.5 cursor-pointer"
          onClick={() => setOpen(v => !v)}
        >
          ☰
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="md:hidden border-t border-slate-900 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-2">
            <NavLink to="/" className={linkActive} onClick={() => setOpen(false)} end>Home</NavLink>
            <NavLink to="/cars" className={linkActive} onClick={() => setOpen(false)}>Fahrzeuge</NavLink>
            <NavLink to="/request" className={linkActive} onClick={() => setOpen(false)}>Leasinganfrage</NavLink>
            <NavLink to="/contact" className={linkActive} onClick={() => setOpen(false)}>Kontakt</NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
