import type { Metadata } from "next";
import { Beef, UtensilsCrossed, Salad, ShoppingBag, Snowflake } from "lucide-react";

export const metadata: Metadata = {
  title: "Ons Aanbod | Slagerij & Traiteur Benoît en Veerle",
  description:
    "Ontdek ons volledige aanbod: vers vlees, huisbereide charcuterie, verse salades en traiteurgerechten.",
};

const categories = [
  {
    id: "vers-vlees",
    icon: <Beef size={28} className="text-rood" />,
    title: "Vers Vlees",
    description: "Dagvers, zorgvuldig geselecteerd bij de beste leveranciers.",
    items: [
      { name: "Belgisch Wit-Blauw rundsvlees", note: "" },
      { name: "Limousin rundsvlees", note: "" },
      { name: "Deli-porc varkensvlees", note: "" },
      { name: "Lamsvlees", note: "" },
      { name: "Kalfsvlees", note: "" },
      { name: "Gevogelte", note: "" },
      { name: "Ree, hert & everzwijn", note: "seizoensgebonden", seasonal: true },
    ],
  },
  {
    id: "charcuterie",
    icon: <UtensilsCrossed size={28} className="text-rood" />,
    title: "Huisbereide Charcuterie",
    description: "Ambachtelijk bereid in ons eigen atelier, met recepten vol karakter.",
    items: [
      { name: "Ambachtelijke boerenpaté", note: "" },
      { name: "Veenbespaté", note: "" },
      { name: "Normandische paté", note: "" },
      { name: "Pensen", note: "" },
      { name: "Hespenworst", note: "" },
    ],
  },
  {
    id: "salades",
    icon: <Salad size={28} className="text-rood" />,
    title: "Verse Salades",
    description: "Elke dag vers bereid — de perfecte aanvulling bij uw maaltijd.",
    items: [
      { name: "Huisgemaakte hamsla", note: "" },
      { name: "Krabsla", note: "" },
      { name: "Tonijnsla", note: "" },
      { name: "Eiersla", note: "" },
      { name: "Kip curry", note: "" },
      { name: "Salade van de chef", note: "onze huisspecialiteit" },
    ],
  },
  {
    id: "extra",
    icon: <ShoppingBag size={28} className="text-rood" />,
    title: "Extra",
    description: "Kleine extras voor een complete winkelervaring.",
    items: [
      { name: "Selectie kazen", note: "" },
      { name: "Dagvers belegde broodjes", note: "" },
    ],
  },
];

export default function OnsAanbod() {
  return (
    <>
      {/* Page header */}
      <section className="bg-rood py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-200 text-sm uppercase tracking-widest mb-2">
            Vers uit eigen atelier
          </p>
          <h1 className="text-white text-4xl md:text-5xl font-bold">Ons Aanbod</h1>
        </div>
      </section>

      {/* Categories grid */}
      <section className="py-20 bg-creme">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-2xl shadow-sm border border-creme-dark overflow-hidden"
              >
                <div className="bg-creme-dark px-8 py-6 flex items-center gap-4">
                  <div className="bg-white rounded-xl p-3 shadow-sm">{cat.icon}</div>
                  <div>
                    <h2 className="text-xl font-bold text-antraciet">{cat.title}</h2>
                    <p className="text-antraciet-light text-sm mt-0.5">{cat.description}</p>
                  </div>
                </div>
                <ul className="px-8 py-6 space-y-3">
                  {cat.items.map((item) => (
                    <li key={item.name} className="flex items-center justify-between gap-4">
                      <span className="flex items-center gap-2 text-antraciet">
                        <span className="w-2 h-2 rounded-full bg-rood shrink-0" />
                        {item.name}
                      </span>
                      {item.seasonal && (
                        <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                          <Snowflake size={10} />
                          Seizoensgebonden
                        </span>
                      )}
                      {item.note && !item.seasonal && (
                        <span className="text-xs text-antraciet-light italic whitespace-nowrap">
                          {item.note}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-rood/10 border border-rood/20 rounded-2xl p-8 text-center">
            <p className="text-antraciet font-medium text-lg">
              Heeft u een specifieke wens of vraag over ons aanbod?
            </p>
            <p className="text-antraciet-light mt-2">
              Bel ons op{" "}
              <a href="tel:+3216477290" className="text-rood font-semibold hover:underline">
                016 / 47 72 90
              </a>{" "}
              of stuur een e-mail naar{" "}
              <a href="mailto:info@benoitveerle.be" className="text-rood font-semibold hover:underline">
                info@benoitveerle.be
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
