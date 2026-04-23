"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/config";

const baseLinks = [
  { href: "/", label: "Home" },
  { href: "/over-ons", label: "Over Ons" },
  { href: "/ons-aanbod", label: "Ons Aanbod" },
  { href: "/bestellen", label: "Bestellen" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = siteConfig.kerstmenuActief
    ? [...baseLinks.slice(0, 3), { href: "/kerstmenu", label: "🎄 Kerstmenu" }, ...baseLinks.slice(3)]
    : baseLinks;

  return (
    <header className="bg-rood shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/B&V_wit_transparant.png"
              alt="Benoît & Veerle Slagerij-Traiteur"
              width={120}
              height={80}
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-rood-dark text-white"
                    : "text-red-100 hover:bg-rood-dark hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-rood-dark transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Menu openen"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-rood-dark border-t border-red-800 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium mt-1 transition-colors ${
                pathname === link.href
                  ? "bg-rood text-white"
                  : "text-red-100 hover:bg-rood hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
