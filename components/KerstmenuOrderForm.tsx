"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Loader2, Minus, Plus } from "lucide-react";
import DatePicker, { registerLocale } from "react-datepicker";
import { nl } from "date-fns/locale/nl";
import "react-datepicker/dist/react-datepicker.css";
import { sendKerstorder, type KerstorderLine } from "@/app/actions/sendKerstorder";

registerLocale("nl", nl);

// ─── TYPES ───────────────────────────────────────────────────────────────────

type Item = {
  id: string;
  name: string;
  description?: string;
  subdescription?: string; // extra info (ingredients, etc.)
  price: string;
  sauces?: string[];
  aardappelChoice?: boolean;
};

type Subsection = {
  title?: string;
  note?: string;
  cols: 2 | 3;
  items: Item[];
  infoOnly?: boolean;
};

type Section = {
  id: string;
  title: string;
  note?: string;
  subsections: Subsection[];
};

// ─── DATA ────────────────────────────────────────────────────────────────────

const SAUZEN = [
  "druivensaus",
  "champignonroomsaus",
  "peperroomsaus",
  "roze-peper",
  "Edele Fine Champagnesaus",
];

const AARDAPPEL_OPTIES = [
  "Huisbereide kroketten (5st/pp)",
  "Gratin van het huis",
  "Pomme dûchesse",
];

const GROENTENKRANS = "gestoofd witloof, spruitjes, boontjesspek, appel, veenbes en trostomaatjes";

const SECTIONS: Section[] = [
  {
    id: "aperitiefhapjes",
    title: "Aperitiefhapjes",
    subsections: [
      {
        note: "Huisbereide, opgevulde en versierde minihapjes",
        cols: 3,
        items: [
          { id: "ap-kaas", name: "Kaas", price: "€ 1,30" },
          { id: "ap-kaas-hesp", name: "Kaas en hesp", price: "€ 1,30" },
          { id: "ap-lorraine", name: "Lorraine", price: "€ 1,30" },
          { id: "ap-vishapje", name: "Vishapje", price: "€ 1,30" },
          { id: "ap-worstenbroodje", name: "Worstenbroodje", price: "€ 1,30" },
          { id: "ap-bouchee-zalm", name: "Apéro bouchée zalm (koud hapje)", price: "€ 2,50" },
        ],
      },
    ],
  },
  {
    id: "voorgerechten",
    title: "Voorgerechten en soepen",
    subsections: [
      {
        title: "Voorgerechten",
        note: "Deze worden gemaakt in individuele porseleinen schoteltjes, waarborg € 3,00/st",
        cols: 3,
        items: [
          { id: "vg-jacobsnootjes", name: "St. Jacobsnootjes met een vleugje limoen", price: "€ 16,00/pp" },
          { id: "vg-scampis", name: "Scampi's van de chef", price: "€ 14,00/pp" },
          { id: "vg-tongrolletjes", name: "Tongrolletjes saffraansaus prei/venkel", price: "€ 14,00/pp" },
          { id: "vg-rundscarpaccio", name: "Rundscarpaccio", price: "€ 14,00/pp" },
          { id: "vg-garnaalskroketten", name: "Garnaalkroketten", price: "€ 6,00/st" },
          { id: "vg-kaaskroketten", name: "Kaaskroketten", price: "€ 3,00/st" },
        ],
      },
      {
        title: "Soepen",
        cols: 3,
        items: [
          { id: "sp-tomaat", name: "Tomatenroomsoep met balletjes", price: "€ 7,50/l" },
          { id: "sp-witloof", name: "Witloofroomsoep met grijze garnaaltjes", price: "€ 8,50/l" },
          { id: "sp-schaaldieren", name: "Schaaldierensoep met rivierkreeftjes", price: "€ 12,50/l" },
        ],
      },
    ],
  },
  {
    id: "suggesties",
    title: "Suggesties en bijgerechten",
    subsections: [
      {
        title: "Suggesties",
        note: "Indien u bij een suggestie voor verschillende personen een andere saus wenst, gelieve dit dan in de opmerkingen onderaan te specifiëren.",
        cols: 2,
        items: [
          {
            id: "sug-varkenshaasje",
            name: "Varkenshaasje",
            price: "€ 13,50/pp",
            sauces: SAUZEN.map((s) => `Varkenshaasje met ${s}`),
          },
          {
            id: "sug-kalkoenfilet",
            name: "Kalkoenfilet",
            price: "€ 13,50/pp",
            sauces: SAUZEN.map((s) => `Kalkoenfilet met ${s}`),
          },
          {
            id: "sug-parelhoenfilet",
            name: "Parelhoenfilet",
            price: "€ 15,00/pp",
            sauces: SAUZEN.map((s) => `Parelhoenfilet met ${s}`),
          },
          {
            id: "sug-risotto",
            name: "Risotto met champignons en truffeltapenade",
            price: "€ 17,50/pp",
          },
          {
            id: "sug-hertstoverij",
            name: "Hertstoverij met garnituur van bereide veenbessen",
            description: "350g/pp",
            price: "€ 14,50/pp",
          },
        ],
      },
      {
        title: "Bijgerechten",
        note: "Apart te verkrijgen",
        cols: 3,
        items: [
          { id: "bij-kroketten", name: "Huisgemaakte kroketten", price: "€ 0,60/st" },
          { id: "bij-gratin", name: "Gratin van het huis", price: "€ 4,50/pp" },
          { id: "bij-pomme", name: "Pomme dûchesse", price: "€ 4,50/pp" },
          {
            id: "bij-groentenkrans",
            name: "Warme groentenkrans",
            subdescription: "Gestoofd witloof · Spruitjes · Boontjes spek · Appel · Veenbes · Trostomaatjes",
            price: "€ 10,00/pp",
          },
        ],
      },
    ],
  },
  {
    id: "specialiteiten",
    title: "Specialiteiten van het huis",
    note: "Brood & botertjes zijn NIET inbegrepen bij de groentenschotels voor fondue, gourmet, teppanyaki.",
    subsections: [
      {
        cols: 2,
        items: [
          {
            id: "spec-vleesfondue",
            name: "Vleesfondue",
            description: "350g/pp",
            subdescription:
              "Rundsvlees Bocquillon wit/blauw, varkenshaasje, kip, kalfsvlees, worstjes, kalkoen, balletjes, kipnuggets, mini pensjes en blinde vink",
            price: "€ 14,00/pp",
          },
          {
            id: "spec-gourmet",
            name: "Gourmet",
            description: "350g/pp",
            subdescription:
              "Kipgyros, varkenshaasje, kip, rundsvlees Bocquillon wit/blauw, kalfsvlees, mini-hamburger, worstjes, nuggets, hert en kwarteleitjes",
            price: "€ 16,00/pp",
          },
          {
            id: "spec-extra-lam",
            name: "Extra lamsvlees bij Gourmet",
            description: "Lamsbrazade",
            price: "€ 2,50/st",
          },
          {
            id: "spec-extra-berloumi",
            name: "Extra berloumi kaas bij Gourmet",
            price: "€ 2,00/st",
          },
          {
            id: "spec-teppanyaki",
            name: "Teppanyaki (vlees met scampi's)",
            description: "400g/pp",
            subdescription:
              "Lamsvlees, gemarineerde biefstuk, varkenshaasje, kalfsvlees, kip, chipo natuur, hert en scampi's",
            price: "€ 18,00/pp",
          },
          {
            id: "spec-groentenschotel",
            name: "Groentenschotel (Fondue, Gourmet en Teppanyaki)",
            subdescription:
              "Gemengde sla, tuinkers, komkommer, bloemkool, kerstomaatjes, vers geraspte worteltjes, witte koolsla, jonge sojaboontjes, rode bietensla, aardappelsla en pasta — Sauzen: huisbereide mayonaise, cocktailsaus en vinaigrette",
            price: "€ 9,50/pp",
          },
        ],
      },
    ],
  },
  {
    id: "buffet-menus",
    title: "Buffet en menu's",
    subsections: [
      {
        title: "Koud buffet",
        cols: 2,
        items: [
          {
            id: "buffet-koud",
            name: "Feestelijk koud buffet",
            subdescription:
              "Gerookte zalm · Scampi's Espagnol · Traag gegaarde zalm · Glaasje tomaat garnaal · Schaaltje perzik tonijn · Meloen Superano · Pastrami Bocquillon wit/blauw · Hamrolletjes · Gegrilde kipfilet met vleugje mango · Gegarneerd eitje · Glaasje huisbereide paté met uienconfituur · Groentenbuffet · Huisbereide mayonaise, cocktailsaus en vinaigrette · Frans brood (wit en/of bruin + botertjes)",
            price: "€ 32,00/pp",
          },
        ],
      },
      {
        title: "Menu's",
        note: "Al onze menu's worden geserveerd met een groentenkrans en aardappelen naar keuze!!",
        cols: 2,
        items: [
          {
            id: "menu-1",
            name: "Menu 1 — Hertgebraad Edele Fine Champagnesaus",
            subdescription: `Groentenkrans: ${GROENTENKRANS}`,
            price: "€ 32,00/pp",
            aardappelChoice: true,
          },
          {
            id: "menu-2",
            name: "Menu 2 — Fazantenfilet met roze-pepersaus",
            subdescription: `Groentenkrans: ${GROENTENKRANS}`,
            price: "€ 32,00/pp",
            aardappelChoice: true,
          },
        ],
      },
    ],
  },
  {
    id: "vers-assortiment",
    title: "Vers assortiment",
    subsections: [
      {
        title: "Vers vlees, wild en gevogelte",
        note: "Te verkrijgen op bestelling, gelieve hiervoor telefonisch contact op te nemen.",
        cols: 2,
        infoOnly: true,
        items: [
          { id: "vers-rund", name: "Runds: wit/blauw en Limousin", price: "" },
          { id: "vers-lam", name: "Lamsvlees: koteletjes, lamskroontjes, lamsbout, …", price: "" },
          { id: "vers-varken", name: "Varkensvlees 'Deli-porc': varkensfiletgebraad, varkenshaasje, varkenswangetjes, …", price: "" },
          { id: "vers-gevogelte", name: "Gevogelte: kalkoen, opgevulde kalkoen, kip, soepkip, …", price: "" },
          { id: "vers-kalf", name: "Kalf: gebraad, …", price: "" },
          { id: "vers-wild", name: "Wild: ree, hert, everzwijn, …", price: "" },
        ],
      },
    ],
  },
];

// ─── PERSONAL DETAILS SCHEMA ─────────────────────────────────────────────────

const schema = z.object({
  voornaam: z.string().min(2, "Verplicht"),
  familienaam: z.string().min(2, "Verplicht"),
  telefoon: z.string().min(9, "Geldig telefoonnummer vereist"),
  email: z.string().email("Geldig e-mailadres vereist"),
  adres: z.string().min(3, "Verplicht"),
  plaats: z.string().min(2, "Verplicht"),
  postcode: z.string().min(4, "Verplicht"),
  opmerkingen: z.string().optional(),
});

type PersonalData = z.infer<typeof schema>;

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const inputClass =
  "w-full border border-creme-dark rounded-xl px-4 py-3 text-antraciet bg-creme focus:outline-none focus:ring-2 focus:ring-rood focus:border-transparent transition-shadow placeholder:text-gray-400 text-base";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-red-500 text-sm mt-1">{message}</p>;
}

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-antraciet mb-1.5">
      {children}
    </label>
  );
}

// ─── ITEM CARD ────────────────────────────────────────────────────────────────

function ItemCard({
  item,
  quantity,
  sauce,
  aardappel,
  onQuantityChange,
  onSauceChange,
  onAardappelChange,
}: {
  item: Item;
  quantity: number;
  sauce: string;
  aardappel: string;
  onQuantityChange: (id: string, val: number) => void;
  onSauceChange: (id: string, val: string) => void;
  onAardappelChange: (id: string, val: string) => void;
}) {
  const active = quantity > 0;

  return (
    <div className={`rounded-xl border p-4 transition-all ${active ? "border-rood bg-rood/5" : "border-creme-dark bg-white"}`}>
      <p className="font-semibold text-antraciet text-sm leading-snug">{item.name}</p>
      {item.description && <p className="text-xs text-antraciet-light mt-0.5">{item.description}</p>}
      {item.subdescription && (
        <p className="text-xs text-antraciet-light mt-1 leading-relaxed">{item.subdescription}</p>
      )}
      <p className="text-rood text-sm font-semibold mt-2">{item.price}</p>

      {/* Quantity */}
      <div className="flex items-center gap-2 mt-3">
        <button
          type="button"
          onClick={() => onQuantityChange(item.id, Math.max(0, quantity - 1))}
          className="w-7 h-7 rounded-lg bg-creme border border-creme-dark flex items-center justify-center hover:bg-creme-dark transition-colors"
        >
          <Minus size={12} />
        </button>
        <input
          type="number"
          min={0}
          value={quantity}
          onChange={(e) => onQuantityChange(item.id, Math.max(0, parseInt(e.target.value) || 0))}
          className="w-12 text-center text-sm font-semibold text-antraciet border border-creme-dark rounded-lg py-1 bg-creme focus:outline-none focus:ring-1 focus:ring-rood"
        />
        <button
          type="button"
          onClick={() => onQuantityChange(item.id, quantity + 1)}
          className="w-7 h-7 rounded-lg bg-creme border border-creme-dark flex items-center justify-center hover:bg-creme-dark transition-colors"
        >
          <Plus size={12} />
        </button>
        <span className="text-xs text-antraciet-light ml-1">Aantal</span>
      </div>

      {/* Sauce */}
      {item.sauces && active && (
        <div className="mt-3 border-t border-creme-dark pt-3">
          <p className="text-xs font-semibold text-antraciet mb-2">Saus naar keuze:</p>
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={`sauce-${item.id}`}
                value=""
                checked={sauce === ""}
                onChange={() => onSauceChange(item.id, "")}
                className="accent-rood"
              />
              <span className="text-xs text-antraciet-light italic">— Geen saus —</span>
            </label>
            {item.sauces.map((s) => (
              <label key={s} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={`sauce-${item.id}`}
                  value={s}
                  checked={sauce === s}
                  onChange={() => onSauceChange(item.id, s)}
                  className="accent-rood"
                />
                <span className="text-xs text-antraciet">{s}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Aardappelen + groentenkrans */}
      {item.aardappelChoice && active && (
        <div className="mt-3 border-t border-creme-dark pt-3 space-y-3">
          <div>
            <p className="text-xs font-semibold text-antraciet mb-2">Aardappelen naar keuze:</p>
            <div className="space-y-1.5">
              {AARDAPPEL_OPTIES.map((a) => (
                <label key={a} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`aardappel-${item.id}`}
                    value={a}
                    checked={aardappel === a}
                    onChange={() => onAardappelChange(item.id, a)}
                    className="accent-rood"
                  />
                  <span className="text-xs text-antraciet">{a}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-antraciet mb-1">Groentenkrans inbegrepen:</p>
            <p className="text-xs text-antraciet-light">{GROENTENKRANS}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MAIN FORM ────────────────────────────────────────────────────────────────

export default function KerstmenuOrderForm() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [sauceChoices, setSauceChoices] = useState<Record<string, string>>({});
  const [aardappelChoices, setAardappelChoices] = useState<Record<string, string>>({});
  const [afhaaldatum, setAfhaaldatum] = useState<Date | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PersonalData>({ resolver: zodResolver(schema) });

  const setQty = (id: string, val: number) => {
    setQuantities((p) => ({ ...p, [id]: val }));
    if (val === 0) {
      setSauceChoices((p) => { const n = { ...p }; delete n[id]; return n; });
      setAardappelChoices((p) => { const n = { ...p }; delete n[id]; return n; });
    }
  };
  const setSauce = (id: string, val: string) => setSauceChoices((p) => ({ ...p, [id]: val }));
  const setAardappel = (id: string, val: string) => setAardappelChoices((p) => ({ ...p, [id]: val }));

  const totalItems = Object.values(quantities).reduce((s, v) => s + v, 0);

  const onSubmit = async (data: PersonalData) => {
    setServerError(null);

    const lines: KerstorderLine[] = SECTIONS.flatMap((sec) =>
      sec.subsections
        .filter((sub) => !sub.infoOnly)
        .flatMap((sub) =>
          sub.items
            .filter((item) => (quantities[item.id] ?? 0) > 0)
            .map((item) => ({
              name: item.name,
              price: item.price,
              quantity: quantities[item.id],
              sauce: sauceChoices[item.id],
              aardappel: aardappelChoices[item.id],
            }))
        )
    );

    if (lines.length === 0) {
      setServerError("Selecteer minstens één product.");
      return;
    }

    const result = await sendKerstorder({
      ...data,
      opmerkingen: data.opmerkingen ?? "",
      afhaaldatum: afhaaldatum
        ? afhaaldatum.toLocaleDateString("nl-BE", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
        : "",
      afhaaluur: afhaaldatum
        ? afhaaldatum.toLocaleTimeString("nl-BE", { hour: "2-digit", minute: "2-digit", hour12: false })
        : "",
      lines,
    });

    if (result.success) setSubmitted(true);
    else setServerError(result.error);
  };

  if (submitted) {
    return (
      <div className="text-center py-20">
        <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-antraciet mb-4">Bestelling ontvangen!</h2>
        <p className="text-antraciet-light text-lg max-w-md mx-auto">
          Bedankt voor uw kerstbestelling. Wij nemen zo snel mogelijk contact met u op ter bevestiging.
        </p>
      </div>
    );
  }

  const today = new Date();

  return (
    <div className="space-y-16">
      {/* ── MENU SECTIONS ── */}
      {SECTIONS.map((section) => (
        <div key={section.id}>
          <div className="border-b-2 border-rood pb-3 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-antraciet uppercase tracking-wide">
              {section.title}
            </h2>
            {section.note && (
              <p className="text-antraciet-light text-sm mt-2">{section.note}</p>
            )}
          </div>

          <div className="space-y-8">
            {section.subsections.map((sub, si) => (
              <div key={si}>
                {sub.title && (
                  <h3 className="text-lg font-bold text-antraciet mb-1 border-b border-creme-dark pb-2">
                    {sub.title}
                  </h3>
                )}
                {sub.note && (
                  <p className="text-sm text-antraciet-light italic mb-4">{sub.note}</p>
                )}

                {sub.infoOnly ? (
                  <ul className="space-y-2 list-disc list-inside">
                    {sub.items.map((item) => (
                      <li key={item.id} className="text-antraciet">{item.name}</li>
                    ))}
                  </ul>
                ) : (
                  <div
                    className={`grid gap-4 ${
                      sub.cols === 3
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        : "grid-cols-1 sm:grid-cols-2"
                    }`}
                  >
                    {sub.items.map((item) => (
                      <ItemCard
                        key={item.id}
                        item={item}
                        quantity={quantities[item.id] ?? 0}
                        sauce={sauceChoices[item.id] ?? ""}
                        aardappel={aardappelChoices[item.id] ?? ""}
                        onQuantityChange={setQty}
                        onSauceChange={setSauce}
                        onAardappelChange={setAardappel}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* ── PERSONAL DETAILS ── */}
      <div>
        <div className="border-b-2 border-rood pb-3 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-antraciet uppercase tracking-wide">
            Uw gegevens
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-creme-dark p-8 shadow-sm">
          {/* Afhaalinfo */}
          <div className="bg-creme rounded-xl border border-creme-dark p-5 mb-8 text-sm text-antraciet space-y-1 leading-relaxed">
            <p className="font-semibold text-antraciet mb-2">Mogelijke afhaalmomenten:</p>
            <p><span className="text-red-500">di. 23/12/2025:</span> gesloten</p>
            <p>woe. 24/12/2025: afhalen bestellingen 12u – 15u</p>
            <p>do. 25/12/2025: afhalen bestellingen 10u – 12u</p>
            <p>vrij. 26/12/2025: open 6u30 – 18u30</p>
            <p>zat. 27/12/2025: open 6u30 – 16u</p>
            <p><span className="text-red-500">zon. 28/12/2025:</span> gesloten</p>
            <p>ma. 29/12/2025: open 6u30 – 18u30</p>
            <p><span className="text-red-500">di. 30/12/2025:</span> gesloten</p>
            <p>woe. 31/12/2025: afhalen bestellingen 12u – 15u</p>
            <p>do. 01/01/2026: afhalen bestellingen 10u – 12u</p>
            <div className="border-t border-creme-dark pt-3 mt-3 space-y-1 text-antraciet-light">
              <p>Ten laatste <strong>16/12</strong> bestellen voor afhalingen op 24 &amp; 25 december 2025</p>
              <p>Ten laatste <strong>23/12</strong> bestellen voor afhalingen op 31 december 2025 &amp; 1 januari 2026</p>
              <p>De winkel zal gesloten zijn van vrij. 2 januari 2026 t.e.m. do. 8 januari 2026</p>
            </div>
            <p className="text-antraciet-light pt-2">Indien vragen rond gluten en/of allergenen, aarzel niet om ons te contacteren.</p>
          </div>


          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="voornaam">Voornaam *</Label>
                <input id="voornaam" type="text" autoComplete="given-name" className={inputClass} {...register("voornaam")} />
                <FieldError message={errors.voornaam?.message} />
              </div>
              <div>
                <Label htmlFor="familienaam">Familienaam *</Label>
                <input id="familienaam" type="text" autoComplete="family-name" className={inputClass} {...register("familienaam")} />
                <FieldError message={errors.familienaam?.message} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="telefoon">Telefoonnummer *</Label>
                <input id="telefoon" type="tel" autoComplete="tel" placeholder="0499 12 34 56" className={inputClass} {...register("telefoon")} />
                <FieldError message={errors.telefoon?.message} />
              </div>
              <div>
                <Label htmlFor="email">E-mailadres *</Label>
                <input id="email" type="email" autoComplete="email" placeholder="jan@voorbeeld.be" className={inputClass} {...register("email")} />
                <FieldError message={errors.email?.message} />
              </div>
            </div>

            <div>
              <Label htmlFor="adres">Adres (straat + huisnummer) *</Label>
              <input id="adres" type="text" autoComplete="street-address" placeholder="Stroobantsstraat 10" className={inputClass} {...register("adres")} />
              <FieldError message={errors.adres?.message} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="plaats">Plaats *</Label>
                <input id="plaats" type="text" autoComplete="address-level2" placeholder="Huldenberg" className={inputClass} {...register("plaats")} />
                <FieldError message={errors.plaats?.message} />
              </div>
              <div>
                <Label htmlFor="postcode">Postcode *</Label>
                <input id="postcode" type="text" autoComplete="postal-code" placeholder="3040" className={inputClass} {...register("postcode")} />
                <FieldError message={errors.postcode?.message} />
              </div>
            </div>

            <div>
              <Label htmlFor="afhaaldatum">Afhaaldatum &amp; -uur *</Label>
              <p className="text-xs text-antraciet-light mb-1.5">Bekijk hierboven de mogelijke afhaalmomenten</p>
              <DatePicker
                id="afhaaldatum"
                selected={afhaaldatum}
                onChange={(val: Date | null) => setAfhaaldatum(val)}
                minDate={today}
                locale="nl"
                dateFormat="dd/MM/yyyy HH:mm"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                timeCaption="Uur"
                placeholderText="Kies datum en uur"
                autoComplete="off"
                wrapperClassName="block w-full"
                className={inputClass}
              />
            </div>

            <div>
              <Label htmlFor="opmerkingen">Opmerkingen | speciale wensen | verduidelijkingen</Label>
              <textarea
                id="opmerkingen"
                rows={4}
                placeholder="Bijv. saus voor 2 personen champignonroomsaus, 1 persoon peperroomsaus…"
                className={`${inputClass} resize-none`}
                {...register("opmerkingen")}
              />
            </div>

            {serverError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-rood text-white font-semibold py-4 px-8 rounded-xl hover:bg-rood-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Bestelling versturen...
                </>
              ) : (
                "Valideren"
              )}
            </button>

            <p className="text-xs text-antraciet-light text-center">
              * Verplichte velden. Wij gebruiken uw gegevens enkel voor de verwerking van uw bestelling.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
