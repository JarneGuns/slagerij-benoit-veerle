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
                href="https://www.facebook.com/gunsschoonheydt"
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
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://www.instagram.com/benoit_veerle/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bezoek onze Instagram"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                </svg>
                Volg ons op Instagram
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
