"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type KerstorderLine = {
  name: string;
  price: string;
  quantity: number;
  sauce?: string;
  aardappel?: string;
};

export type KerstorderData = {
  voornaam: string;
  familienaam: string;
  telefoon: string;
  email: string;
  adres: string;
  gemeente: string;
  afhaaldatum: string;
  afhaaluur: string;
  opmerkingen: string;
  lines: KerstorderLine[];
};

export type ActionResult = { success: true } | { success: false; error: string };

function formatLines(lines: KerstorderLine[]): string {
  return lines
    .map((l) => {
      let row = `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #F5EDE0">${l.name}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #F5EDE0">${l.price}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #F5EDE0;text-align:center">${l.quantity}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #F5EDE0">${l.sauce ?? ""}${l.aardappel ? `Aardappelen: ${l.aardappel}` : ""}</td>
      </tr>`;
      return row;
    })
    .join("");
}

export async function sendKerstorder(data: KerstorderData): Promise<ActionResult> {
  try {
    const html = `
      <div style="font-family:Georgia,serif;max-width:700px;margin:40px auto;background:white;border-radius:16px;overflow:hidden;border:1px solid #F5EDE0">
        <div style="background:#8B1A1A;padding:28px 32px">
          <h1 style="color:white;margin:0;font-size:20px">🎄 Nieuwe kerstbestelling</h1>
          <p style="color:#fca5a5;margin:4px 0 0;font-size:13px">Slagerij &amp; Traiteur Benoît en Veerle</p>
        </div>
        <div style="padding:32px">
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            <tr><th colspan="2" style="text-align:left;padding:10px 12px;background:#F5EDE0;font-size:13px">Klantgegevens</th></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #F5EDE0;width:140px"><strong>Naam</strong></td><td style="padding:8px 12px;border-bottom:1px solid #F5EDE0">${data.voornaam} ${data.familienaam}</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #F5EDE0"><strong>Telefoon</strong></td><td style="padding:8px 12px;border-bottom:1px solid #F5EDE0">${data.telefoon}</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #F5EDE0"><strong>E-mail</strong></td><td style="padding:8px 12px;border-bottom:1px solid #F5EDE0">${data.email}</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #F5EDE0"><strong>Adres</strong></td><td style="padding:8px 12px;border-bottom:1px solid #F5EDE0">${data.adres}, ${data.gemeente}</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #F5EDE0"><strong>Afhaling</strong></td><td style="padding:8px 12px;border-bottom:1px solid #F5EDE0">${data.afhaaldatum} om ${data.afhaaluur}</td></tr>
          </table>

          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            <tr><th style="text-align:left;padding:10px 12px;background:#F5EDE0;font-size:13px">Product</th><th style="padding:10px 12px;background:#F5EDE0;font-size:13px">Prijs</th><th style="padding:10px 12px;background:#F5EDE0;font-size:13px;text-align:center">Aantal</th><th style="padding:10px 12px;background:#F5EDE0;font-size:13px">Opties</th></tr>
            ${formatLines(data.lines)}
          </table>

          ${data.opmerkingen ? `<div style="background:#FDF8F3;border:1px solid #F5EDE0;border-radius:12px;padding:16px"><strong>Opmerkingen:</strong><p style="margin:8px 0 0;white-space:pre-wrap">${data.opmerkingen}</p></div>` : ""}
        </div>
        <div style="padding:16px 32px;background:#F5EDE0;font-size:12px;color:#4A4A4A;text-align:center">
          Benoît &amp; Veerle · Stroobantsstraat 104, 3040 Huldenberg · 016 / 47 72 90
        </div>
      </div>
    `;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "jarneguns@gmail.com",
      subject: `🎄 Kerstbestelling van ${data.voornaam} ${data.familienaam} — afhaling ${data.afhaaldatum}`,
      html,
      replyTo: data.email,
    });

    return { success: true };
  } catch (err) {
    console.error("sendKerstorder error:", err);
    return { success: false, error: "Bestelling kon niet verstuurd worden. Bel ons op 016 / 47 72 90." };
  }
}
