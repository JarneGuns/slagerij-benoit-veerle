import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Leaf, Heart, Star } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-lichtgrijs overflow-hidden min-h-screen">
<div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col items-center text-center">
          <Image
            src="/B&V_wit_transparant.png"
            alt="Benoît & Veerle Slagerij-Traiteur"
            width={800}
            height={534}
            className="h-auto w-full max-w-lg md:max-w-xl object-contain mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
            priority
          />
          <p className="text-rood text-sm font-medium uppercase tracking-widest mb-4">
            Ambachtelijke dorpsslager · Huldenberg
          </p>
          <h1 className="text-antraciet text-4xl md:text-6xl font-bold leading-tight max-w-3xl mb-6">
            Kwaliteit uit eigen atelier, met een glimlach geserveerd.
          </h1>
          <p className="text-antraciet-light text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            Uw ambachtelijke dorpsslager in Huldenberg voor vers vlees, huisbereide
            charcuterie en traiteurgerechten.
          </p>

          {/* Primary CTA */}
          <Link
            href="/bestellen"
            className="inline-flex items-center justify-center gap-3 bg-rood text-white font-bold px-8 py-5 rounded-2xl hover:bg-rood-dark transition-colors shadow-xl text-lg mb-4 w-full max-w-xl">
              Klik hier om een Bestelling te plaatsen!
          </Link>
        </div>
      </section>
    </>
  );
}
