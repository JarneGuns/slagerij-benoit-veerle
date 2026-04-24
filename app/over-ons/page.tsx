import type { Metadata } from "next";
import { Users } from "lucide-react";

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
          <h1 className="text-white text-4xl md:text-5xl font-bold">Benoît en Veerle</h1>
        </div>
      </section>

      {/* Wie zijn we */}
      <section className="py-20 bg-creme">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-antraciet mb-10">Wie zijn we?</h2>

          <div className="space-y-6 text-antraciet text-lg leading-relaxed">
            <p>
              Benoît Guns, gestudeerd aan het COOVI instituut te Anderlecht, slagerij-beenhouwerij,
              met specialisatiejaar traiteurbereidingen. Ik ben na m&apos;n studies enkele jaren gaan
              werken en ben in 1998 als zelfstandige &ldquo;beenhouwer-traiteur&rdquo; begonnen in de
              Stroobantsstraat 104, te Huldenberg.
            </p>
            <p>
              Veerle Schoonheydt, afgestudeerd aan Groep-T als kleuterleidster, heb een 10-tal jaren
              in het onderwijs gestaan in de regio van Tervuren. Een zeer leuke job! Maar toen ik
              Benoît op m&apos;n pad tegenkwam, kwam ook de liefde voor de zaak. Het bedienen van
              klanten doe ik met hart en ziel. We zijn een dorpswinkel met een dorpsmentaliteit: een
              praatje, een mopje, een luisterend oor&nbsp;&hellip;
            </p>
            <p>Wij hebben samen 3 kinderen: Jarne, Lotte &amp; Roan.</p>
          </div>

          {/* Foto's */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-creme-dark rounded-2xl aspect-[4/3] flex items-center justify-center border border-creme-dark shadow-sm"
              >
                <div className="text-center p-4">
                  <Users size={40} className="text-rood/30 mx-auto mb-2" />
                  <p className="text-antraciet-light text-xs">Foto {i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Onze visie */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-antraciet mb-10">
            Onze visie
          </h2>

          <div className="space-y-8 text-antraciet text-lg leading-relaxed">
            <div>
              <p className="font-semibold mb-4">Werken in de beenhouwerij:</p>
              <ul className="space-y-2 ml-4">
                {[
                  "doen we met gedrevenheid",
                  "doen we met hart & ziel",
                  "is onze passie!",
                  "is véél sociaal contact hebben met verschillende mensen",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-rood font-bold mt-1">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Onze accenten liggen op:</p>
              <p>de smaak, de kwaliteit van het vlees en het gerecht.</p>
              <p className="mt-2">Klantvriendelijkheid is één van onze troeven.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
