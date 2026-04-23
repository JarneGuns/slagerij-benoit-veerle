import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { ChevronRight, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Kerstmenu & Feestmenu | Slagerij & Traiteur Benoît en Veerle",
  description:
    "Ontdek onze speciale kerstmenu's en feestmenu's bij Slagerij Benoît & Veerle in Huldenberg.",
};

// Om deze pagina te activeren: zet `kerstmenuActief: true` in lib/config.ts
export default function Kerstmenu() {
  if (!siteConfig.kerstmenuActief) {
    notFound();
  }

  return (
    <>
      {/* Page header */}
      <section className="bg-rood py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 text-[200px] flex items-center justify-center select-none pointer-events-none">
          🎄
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-200 text-sm uppercase tracking-widest mb-2">
            Seizoensaanbod
          </p>
          <h1 className="text-white text-4xl md:text-5xl font-bold">
            Kerstmenu &amp; Feestmenu
          </h1>
          <p className="text-red-100 mt-3 text-lg max-w-2xl">
            Maak van uw feestdagen een onvergetelijke ervaring met onze ambachtelijke
            kerstmenu&apos;s, samengesteld met dezelfde zorg en kwaliteit als al onze producten.
          </p>
        </div>
      </section>

      {/* Bestelling-waarschuwing */}
      <section className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center gap-3">
          <span className="text-2xl">⚠️</span>
          <p className="text-amber-800 font-medium">
            <strong>Bestel tijdig!</strong> Voor de feestdagen raden wij aan om minstens{" "}
            <strong>2 weken op voorhand</strong> te bestellen. Vol is vol.
          </p>
        </div>
      </section>

      <section className="py-20 bg-creme">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Menu cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              {
                tag: "Klassiek",
                title: "Klassiek Kerstmenu",
                prijs: "Op aanvraag",
                items: [
                  "Huisgemaakte soep van de dag",
                  "Kerstbrood met huisbereide paté",
                  "Rosbief Limousin (per persoon)",
                  "Gegratineerde aardappelen",
                  "Seizoensgroenten",
                  "Kerstdessert",
                ],
              },
              {
                tag: "Feest",
                title: "Groot Feestbuffet",
                prijs: "Op aanvraag",
                items: [
                  "Selectie huisbereide salades (6 soorten)",
                  "Koude vleeswaren & charcuterie",
                  "Warme traiteurgerechten (2 keuzes)",
                  "Selectie ambachtelijke kazen",
                  "Belegde feestbroodjes",
                  "Kerstdessertbuffet",
                ],
              },
            ].map((menu) => (
              <div
                key={menu.title}
                className="bg-white rounded-2xl shadow-sm border border-creme-dark overflow-hidden"
              >
                <div className="bg-rood px-8 py-5 flex items-center justify-between">
                  <div>
                    <span className="text-red-200 text-xs uppercase tracking-widest">
                      {menu.tag}
                    </span>
                    <h2 className="text-white text-xl font-bold mt-0.5">{menu.title}</h2>
                  </div>
                  <Star size={28} className="text-red-300" />
                </div>
                <ul className="px-8 py-6 space-y-3">
                  {menu.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-antraciet">
                      <span className="w-2 h-2 rounded-full bg-rood shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="px-8 pb-6">
                  <p className="text-antraciet-light text-sm italic">{menu.prijs}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-rood/10 border border-rood/20 rounded-2xl p-10 text-center">
            <h3 className="text-2xl font-bold text-antraciet mb-3">
              Stel uw feestmenu samen
            </h3>
            <p className="text-antraciet-light mb-6 max-w-lg mx-auto">
              Alle menu&apos;s worden op maat samengesteld. Contacteer ons of gebruik het
              bestelformulier om uw wensen door te geven.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/bestellen"
                className="inline-flex items-center justify-center gap-2 bg-rood text-white font-semibold px-8 py-4 rounded-xl hover:bg-rood-dark transition-colors shadow-lg"
              >
                Bestelformulier
                <ChevronRight size={18} />
              </Link>
              <a
                href="tel:+3216477290"
                className="inline-flex items-center justify-center gap-2 bg-white border border-creme-dark text-antraciet font-semibold px-8 py-4 rounded-xl hover:bg-creme transition-colors"
              >
                016 / 47 72 90
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
