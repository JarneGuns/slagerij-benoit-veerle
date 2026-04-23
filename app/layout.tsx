import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Slagerij & Traiteur Benoît en Veerle | Huldenberg",
  description:
    "Uw ambachtelijke dorpsslager in Huldenberg. Vers vlees, huisbereide charcuterie en traiteurgerechten van topkwaliteit.",
  keywords: ["slagerij", "traiteur", "Huldenberg", "Benoît", "Veerle", "vers vlees", "charcuterie"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-creme text-antraciet">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
