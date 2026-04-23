import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-antraciet text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-rood-light font-bold text-lg mb-3">
              Benoît &amp; Veerle
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Uw ambachtelijke dorpsslager in Huldenberg. Kwaliteit met een glimlach,
              elke dag opnieuw.
            </p>
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
          © Copyright 1998 – 2026 | Site door Jarne Guns
        </div>
      </div>
    </footer>
  );
}
