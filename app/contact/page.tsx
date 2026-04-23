import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Openingsuren | Slagerij & Traiteur Benoît en Veerle",
  description:
    "Contactgegevens en openingsuren van Slagerij & Traiteur Benoît en Veerle in Huldenberg.",
};

const hours = [
  { days: "Maandag", time: "06:30 – 18:30", closed: false },
  { days: "Dinsdag", time: "06:30 – 18:30", closed: false },
  { days: "Woensdag", time: "06:30 – 18:30", closed: false },
  { days: "Donderdag", time: "Gesloten", closed: true },
  { days: "Vrijdag", time: "06:30 – 18:30", closed: false },
  { days: "Zaterdag", time: "06:30 – 16:00", closed: false },
  { days: "Zondag", time: "Gesloten", closed: true },
];

const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Stroobantsstraat+104+3040+Huldenberg";

export default function Contact() {
  const now = new Date();
  const dayIndex = now.getDay();
  const todayName = ["Zondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag"][dayIndex];

  return (
    <>
      {/* Page header */}
      <section className="bg-rood py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-200 text-sm uppercase tracking-widest mb-2">Vind ons</p>
          <h1 className="text-white text-4xl md:text-5xl font-bold">Contact</h1>
        </div>
      </section>

      <section className="py-20 bg-creme">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top row: info + openingsuren */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
            {/* Contact info + map */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-creme-dark p-8">
                <h2 className="text-2xl font-bold text-antraciet mb-6 flex items-center gap-3">
                  <Phone size={22} className="text-rood" />
                  Contactgegevens
                </h2>
                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <div className="bg-rood/10 rounded-xl p-2.5 shrink-0 mt-0.5">
                      <MapPin size={20} className="text-rood" />
                    </div>
                    <div>
                      <p className="font-medium text-antraciet">Adres</p>
                      <p className="text-antraciet-light mt-0.5">
                        Stroobantsstraat 104<br />3040 Huldenberg
                      </p>
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-sm text-rood font-medium hover:underline"
                      >
                        Open in Google Maps →
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-rood/10 rounded-xl p-2.5 shrink-0 mt-0.5">
                      <Phone size={20} className="text-rood" />
                    </div>
                    <div>
                      <p className="font-medium text-antraciet">Telefoon</p>
                      <a
                        href="tel:+3216477290"
                        className="text-antraciet-light hover:text-rood transition-colors mt-0.5 block"
                      >
                        016 / 47 72 90
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-rood/10 rounded-xl p-2.5 shrink-0 mt-0.5">
                      <Mail size={20} className="text-rood" />
                    </div>
                    <div>
                      <p className="font-medium text-antraciet">E-mail</p>
                      <a
                        href="mailto:info@benoitveerle.be"
                        className="text-antraciet-light hover:text-rood transition-colors mt-0.5 block"
                      >
                        info@benoitveerle.be
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Google Maps embed */}
              <div className="rounded-2xl overflow-hidden shadow-sm border border-creme-dark h-64">
                <iframe
                  src="https://maps.google.com/maps?q=Stroobantsstraat+104,+3040+Huldenberg,+Belgium&output=embed&hl=nl&z=15"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Locatie Slagerij Benoît & Veerle"
                />
              </div>
            </div>

            {/* Opening hours */}
            <div className="bg-white rounded-2xl shadow-sm border border-creme-dark p-8">
              <h2 className="text-2xl font-bold text-antraciet mb-6 flex items-center gap-3">
                <Clock size={22} className="text-rood" />
                Openingsuren
              </h2>
              <table className="w-full">
                <tbody className="divide-y divide-creme-dark">
                  {hours.map((row) => {
                    const isToday = row.days === todayName;
                    return (
                      <tr key={row.days} className={isToday ? "bg-rood/5" : ""}>
                        <td className="py-3.5 pr-4">
                          <span className={`font-medium ${isToday ? "text-rood" : "text-antraciet"}`}>
                            {row.days}
                            {isToday && (
                              <span className="ml-2 text-xs bg-rood text-white px-2 py-0.5 rounded-full">
                                Vandaag
                              </span>
                            )}
                          </span>
                        </td>
                        <td className="py-3.5 text-right">
                          <span className={`font-medium ${row.closed ? "text-red-400" : "text-antraciet-light"}`}>
                            {row.time}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 text-sm">
                  <strong>Tip:</strong> Voor traiteurbestellingen raden wij aan om minstens
                  één week op voorhand te bestellen.
                </p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white rounded-2xl shadow-sm border border-creme-dark p-8 md:p-10">
            <h2 className="text-2xl font-bold text-antraciet mb-2">Stuur ons een bericht</h2>
            <p className="text-antraciet-light mb-8">
              Heeft u een vraag of wilt u meer informatie? Wij antwoorden zo snel mogelijk.
            </p>
            <ContactForm />
          </div>

        </div>
      </section>
    </>
  );
}
