import type { Metadata } from "next";
import KerstmenuOrderForm from "@/components/KerstmenuOrderForm";

export const metadata: Metadata = {
  title: "Kerstmenu & Feestmenu | Slagerij & Traiteur Benoît en Veerle",
  description:
    "Ontdek onze speciale kerstmenu's en feestmenu's bij Slagerij Benoît & Veerle in Huldenberg.",
};

export default function Kerstmenu() {
  return (
    <>
      {/* Page header */}
      <section className="bg-rood py-16 relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-white text-4xl md:text-5xl font-bold">Klaar voor de feestdagen ?</h1>
          <p className="text-red-100 mt-3 text-lg max-w-2xl">
            Bestel je feestmenu online !
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-creme">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <KerstmenuOrderForm />
        </div>
      </section>
    </>
  );
}
