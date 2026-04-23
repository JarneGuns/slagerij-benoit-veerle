import type { Metadata } from "next";
import { Heart, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Over Ons | Slagerij & Traiteur Benoît en Veerle",
  description:
    "Leer Benoît en Veerle kennen — het duo achter uw ambachtelijke dorpsslager in Huldenberg.",
};

export default function OverOns() {
  return (
    <>
      {/* Page header */}
      <section className="bg-rood py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-200 text-sm uppercase tracking-widest mb-2">Ons verhaal</p>
          <h1 className="text-white text-4xl md:text-5xl font-bold">Over Ons</h1>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-creme">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-rood/10 text-rood px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Heart size={16} />
                Met hart en ziel
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-antraciet mb-6 leading-tight">
                Van kleuterklas tot slagerijkraam — een onverwacht avontuur.
              </h2>
              <div className="space-y-4 text-antraciet-light text-lg leading-relaxed">
                <p>
                  Veerle werkte 10 jaar als kleuterleidster in de regio Tervuren voordat ze
                  de stap naar de slagerij zette. Toen ze Benoît leerde kennen, sprong de vonk
                  niet alleen over op hem, maar ook op het slagersvak.
                </p>
                <p>
                  Samen runnen zij de zaak nu met hart en ziel. Onze passie ligt in het
                  sociale contact met onze klanten en het aanbieden van producten waar we zelf
                  100% achter staan.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-creme-dark text-center">
                  <p className="text-4xl font-bold text-rood mb-1">25+</p>
                  <p className="text-antraciet-light text-sm">Jaar ervaring</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-creme-dark text-center">
                  <p className="text-4xl font-bold text-rood mb-1">100%</p>
                  <p className="text-antraciet-light text-sm">Eigen bereiding</p>
                </div>
              </div>
            </div>

            {/* Photo placeholder */}
            <div className="relative">
              <div className="bg-creme-dark rounded-3xl overflow-hidden aspect-[4/3] flex items-center justify-center shadow-lg border border-creme-dark">
                <div className="text-center p-8">
                  <Users size={64} className="text-rood/30 mx-auto mb-4" />
                  <p className="text-antraciet-light text-sm">
                    Foto van de zaak / het team
                  </p>
                </div>
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-rood/10 rounded-3xl -z-10" />
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-rood/5 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-antraciet text-center mb-12">
            Onze waarden
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Kwaliteit",
                text: "Enkel de beste grondstoffen. Wij werken met lokale leveranciers en selecteren persoonlijk elke levering.",
              },
              {
                title: "Eerlijkheid",
                text: "Transparante prijzen, eerlijk advies. Wij verkopen u wat u nodig heeft, niet meer.",
              },
              {
                title: "Gemeenschap",
                text: "Wij zijn trots deel uit te maken van Huldenberg. De dorpsgemeenschap is onze familie.",
              },
            ].map((v) => (
              <div key={v.title} className="border-l-4 border-rood pl-6">
                <h3 className="font-bold text-antraciet text-xl mb-2">{v.title}</h3>
                <p className="text-antraciet-light leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
