import type { Metadata } from "next";
import { AlertCircle } from "lucide-react";
import OrderForm from "@/components/OrderForm";

export const metadata: Metadata = {
  title: "Bestellen | Slagerij & Traiteur Benoît en Veerle",
  description:
    "Plaats uw bestelling online bij Slagerij & Traiteur Benoît en Veerle in Huldenberg.",
};

export default function Bestellen() {
  return (
    <>
      {/* Page header */}
      <section className="bg-rood py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-200 text-sm uppercase tracking-widest mb-2">Online bestellen</p>
          <h1 className="text-white text-4xl md:text-5xl font-bold">Bestellen</h1>
        </div>
      </section>

      <section className="py-20 bg-creme">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Important notice */}
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-300 rounded-2xl p-5 mb-10">
            <AlertCircle size={22} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800">Bestelling op voorhand</p>
              <p className="text-amber-700 text-sm mt-1">
                Graag <strong>één week op voorhand</strong> bestellen voor traiteurgerechten,
                buffetten en feestmenu&apos;s.
              </p>
            </div>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl shadow-sm border border-creme-dark p-8 md:p-10">
            <h2 className="text-2xl font-bold text-antraciet mb-8">Uw bestelling</h2>
            <OrderForm />
          </div>
        </div>
      </section>
    </>
  );
}
