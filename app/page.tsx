import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Leaf, Heart, Star } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-rood overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col items-center text-center">
          <Image
            src="/B&V_wit_transparant.png"
            alt="Benoît & Veerle Slagerij-Traiteur"
            width={800}
            height={534}
            className="h-auto w-full max-w-lg md:max-w-xl object-contain mb-10"
            priority
          />
          <p className="text-red-200 text-sm font-medium uppercase tracking-widest mb-4">
            Ambachtelijke dorpsslager · Huldenberg
          </p>
          <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight max-w-3xl mb-6">
            Kwaliteit uit eigen atelier, met een glimlach geserveerd.
          </h1>
          <p className="text-red-100 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            Uw ambachtelijke dorpsslager in Huldenberg voor vers vlees, huisbereide
            charcuterie en traiteurgerechten.
          </p>

          {/* Primary CTA */}
          <Link
            href="/bestellen"
            className="inline-flex items-center justify-center gap-3 bg-white text-rood font-bold px-8 py-5 rounded-2xl hover:bg-creme transition-colors shadow-xl text-lg mb-4 w-full max-w-xl">
              Klik hier om een Bestelling te plaatsen!
          </Link>
        </div>
      </section>
    </>
  );
}
