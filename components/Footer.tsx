import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-antraciet text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Image
              src="/B&V_wit_transparant.png"
              alt="Benoît & Veerle"
              width={100}
              height={67}
              className="h-16 w-auto object-contain mb-3"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Uw ambachtelijke dorpsslager in Huldenberg. Kwaliteit met een glimlach,
              elke dag opnieuw.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://www.facebook.com/slagerijbenoitveerle"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bezoek onze Facebookpagina"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-400" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Volg ons op Facebook
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-rood-light font-bold text-lg mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-rood-light mt-0.5 shrink-0" />
                <span>Stroobantsstraat 104<br />3040 Huldenberg</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-rood-light shrink-0" />
                <a href="tel:+3216477290" className="hover:text-white transition-colors">
                  016 / 47 72 90
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-rood-light shrink-0" />
                <a href="mailto:info@benoitveerle.be" className="hover:text-white transition-colors">
                  info@benoitveerle.be
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-rood-light font-bold text-lg mb-3">Openingsuren</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li className="flex justify-between gap-4">
                <span>Ma, Di, Wo, Vr</span>
                <span>06:30 – 18:30</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Zaterdag</span>
                <span>06:30 – 16:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Do &amp; Zondag</span>
                <span className="text-red-400">Gesloten</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-xs text-gray-500">
          © Copyright 1998 – 2026 | Benoît en Veerle | Alle Rechten Voorbehouden | Site door Jarne Guns
        </div>
      </div>
    </footer>
  );
}
