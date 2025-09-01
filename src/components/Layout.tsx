import { Outlet, ScrollRestoration } from "react-router-dom";
import { useScrollTop } from "@/hooks/useScrollTop";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export default function Layout() {
  useScrollTop();

  return (
    <div className="min-h-dvh flex flex-col bg-gradient-to-br from-slate-800 via-slate-600 to-slate-400 text-neutral-900">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>
      <Footer />
      <CookieBanner />
      <ScrollRestoration />
    </div>
  );
}
