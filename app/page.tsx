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
            width={220}
            height={147}
            className="h-36 w-auto object-contain mb-10"
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
            className="inline-flex items-center justify-center gap-3 bg-white text-rood font-bold px-8 py-5 rounded-2xl hover:bg-creme transition-colors shadow-xl text-lg mb-4 w-full max-w-xl"
          >
            <ChevronRight size={22} />
            Bij ons kan u uw bestelling online plaatsen — klik hier
          </Link>

          <Link
            href="/ons-aanbod"
            className="inline-flex items-center justify-center gap-2 text-red-200 hover:text-white transition-colors text-sm font-medium underline underline-offset-4"
          >
            Bekijk eerst ons aanbod
          </Link>
        </div>
      </section>

      {/* Dorpsmentaliteit */}
      <section className="py-20 bg-creme">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-rood/10 text-rood px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart size={16} />
              Dorpsmentaliteit
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-antraciet mb-6">
              Bij ons bent u geen nummer.
            </h2>
            <p className="text-antraciet-light text-lg leading-relaxed">
              Wij maken tijd voor een praatje, een grapje of een luisterend oor. Dat is
              de kracht van onze dorpswinkel.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-antraciet text-center mb-14">
            Waarom kiezen voor Benoît &amp; Veerle?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Star size={28} className="text-rood" />,
                title: "Topkwaliteit vlees",
                text: "Belgisch Wit-Blauw, Limousin en Deli-porc. Wij selecteren enkel het beste voor uw bord.",
              },
              {
                icon: <Leaf size={28} className="text-rood" />,
                title: "Eigen bereiding",
                text: "Van ambachtelijke paté tot verse salades en traiteurgerechten — alles gemaakt in ons eigen atelier.",
              },
              {
                icon: <Heart size={28} className="text-rood" />,
                title: "Persoonlijke service",
                text: "Al meer dan 25 jaar verwelkomen wij u met een glimlach. U bent altijd welkom voor advies.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-creme rounded-2xl p-8 shadow-sm border border-creme-dark"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-bold text-antraciet text-xl mb-3">{item.title}</h3>
                <p className="text-antraciet-light leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-creme-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-antraciet mb-4">
            Klaar om te bestellen?
          </h2>
          <p className="text-antraciet-light mb-8">
            Geef uw bestelling minstens één week op voorhand door voor traiteurgerechten,
            buffetten en feestmenu&apos;s.
          </p>
          <Link
            href="/bestellen"
            className="inline-flex items-center gap-2 bg-rood text-white font-semibold px-10 py-4 rounded-xl hover:bg-rood-dark transition-colors shadow-lg text-lg"
          >
            Bestel nu
            <ChevronRight size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
