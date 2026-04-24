import type { Metadata } from "next";
import { Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "Ons Aanbod | Slagerij & Traiteur Benoît en Veerle",
  description:
    "Ontdek ons volledige aanbod: vers vlees, huisbereide charcuterie, verse salades en traiteurgerechten.",
};

const categories = [
  {
    id: "vers-vlees",
    title: "Vers Vlees",
    intro: "Je kan bij ons terecht voor verschillende soorten vers vlees.",
    items: ["Rund", "Varken", "Gevogelte", "Kalf", "Lam", "Konijn", "Wild (op bestelling)", "Paard (op bestelling)"],
    extra: "U vindt bij ons Blauw-wit rundsvlees en Duroc varkensvlees. Andere soorten zijn te verkrijgen op bestelling.",
  },
  {
    id: "vleeswaren",
    title: "Vleeswaren",
    intro: "Wij bereiden zelf nog héél wat vleeswaren. Versierde charcuterieschotels kunnen wij uiteraard ook voor je maken! Glutenvrije vleeswaren bereiden wij sinds kort ook: hespenworst, witte en zwarte pensen.",
    items: ["boerenpaté", "veenbespaté", "Normandische paté", "kip- en kalkoenfilet", "hespenworst", "pensen", "…"],
    extra: null,
  },
  {
    id: "salades",
    title: "Salades",
    intro: "Een deel van onze salades wordt huisbereid.",
    items: ["hamsla", "krabsla", "tonijnsla", "eiersla", "salade van de chef (op basis van kip)", "pita pikant salade", "smosjes salade", "kip curry", "…"],
    extra: null,
  },
  {
    id: "kazen",
    title: "Kazen",
    intro: "Wij hebben een aanbod van de meest courante kazen in huis. Wij maken ook versierde kaasschotels.",
    items: ["camembert", "chaumes", "chamois d'or", "brie", "père joseph", "oud-Brugge", "Kortrijkse brokkel", "…"],
    extra: null,
  },
  {
    id: "broodjes",
    title: "Belegde Broodjes",
    intro: "Met plezier maken wij een belegd broodje voor je klaar: een witte baguette, fitnessbroodje enz… Keuze in overvloed, neem maar een kijkje in onze toog! Indien je meerdere broodjes wenst, is het handig om dit even op voorhand te bestellen, zo kunnen wij gemakkelijk aan jullie wensen voldoen.",
    items: ["Ham – kaas", "eiersla", "Franse salade", "Griekse champignons", "…"],
    extra: null,
  },
  {
    id: "traiteur",
    title: "Traiteurbereidingen",
    intro: "Zoals jullie ons al kennen of … ons nu ontdekken… leggen wij vooral het accent op \"huisbereide\" gerechten! Met passie voor het vak als beenhouwer en kok stellen we graag gerechten samen op maat van de klant. Een vegetarisch gerechtje kan ook altijd!",
    items: ["sauzen", "soepen", "aardappelen-, vlees- en kipgerechten met bijpassende groentekrans", "…"],
    extra: null,
  },
];

function PhotoPlaceholder() {
  return (
    <div className="bg-creme-dark rounded-2xl aspect-[4/3] flex items-center justify-center border border-creme-dark shadow-sm">
      <div className="text-center p-4">
        <Camera size={36} className="text-rood/30 mx-auto mb-2" />
        <p className="text-antraciet-light text-xs">Foto</p>
      </div>
    </div>
  );
}

export default function OnsAanbod() {
  return (
    <>
      {/* Page header */}
      <section className="bg-rood py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-200 text-sm uppercase tracking-widest mb-2">Vers uit eigen atelier</p>
          <h1 className="text-white text-4xl md:text-5xl font-bold">Ons Aanbod</h1>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-creme">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {categories.map((cat, i) => (
            <div
              key={cat.id}
              className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              {/* Text */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-antraciet mb-4">{cat.title}</h2>
                <p className="text-antraciet leading-relaxed mb-5">{cat.intro}</p>
                <p className="text-sm font-semibold text-antraciet mb-2">Een greep uit ons aanbod:</p>
                <p className="text-antraciet leading-relaxed mb-4">
                  {cat.items.join(" , ")}
                </p>
                {cat.extra && (
                  <p className="text-antraciet leading-relaxed mb-4">{cat.extra}</p>
                )}
                <p className="text-sm text-rood font-medium">
                  Neem een kijkje in de bijhorende pdf voor de volledige lijst!
                </p>
              </div>

              {/* Photo */}
              <PhotoPlaceholder />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
