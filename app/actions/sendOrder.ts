"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type OrderData = {
  voornaam: string;
  achternaam: string;
  email: string;
  telefoon: string;
  afhaaldatum: string;
  bestelling: string;
};

export type ActionResult =
  | { success: true }
  | { success: false; error: string };

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("nl-BE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function shopEmailHtml(data: OrderData): string {
  return `
<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"><style>
  body { font-family: Georgia, serif; background: #FDF8F3; margin: 0; padding: 0; }
  .wrap { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; }
  .header { background: #8B1A1A; padding: 32px; }
  .header h1 { color: white; margin: 0; font-size: 24px; }
  .header p { color: #fca5a5; margin: 4px 0 0; font-size: 14px; }
  .body { padding: 32px; }
  table { width: 100%; border-collapse: collapse; margin: 16px 0; }
  th { text-align: left; padding: 10px 14px; background: #F5EDE0; color: #2C2C2C; font-size: 13px; font-weight: bold; }
  td { padding: 10px 14px; border-bottom: 1px solid #F5EDE0; color: #4A4A4A; font-size: 14px; }
  .bestelling { background: #FDF8F3; border: 1px solid #F5EDE0; border-radius: 12px; padding: 20px; margin-top: 20px; }
  .bestelling h3 { color: #8B1A1A; margin: 0 0 12px; font-size: 16px; }
  .bestelling pre { margin: 0; white-space: pre-wrap; font-family: Georgia, serif; color: #2C2C2C; font-size: 14px; line-height: 1.6; }
  .footer { padding: 24px 32px; background: #F5EDE0; font-size: 12px; color: #4A4A4A; text-align: center; }
</style></head>
<body>
<div class="wrap">
  <div class="header">
    <h1>Nieuwe bestelling ontvangen</h1>
    <p>Slagerij &amp; Traiteur Benoît en Veerle</p>
  </div>
  <div class="body">
    <table>
      <tr><th colspan="2">Klantgegevens</th></tr>
      <tr><td><strong>Naam</strong></td><td>${data.voornaam} ${data.achternaam}</td></tr>
      <tr><td><strong>E-mail</strong></td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
      <tr><td><strong>Telefoon</strong></td><td>${data.telefoon}</td></tr>
      <tr><td><strong>Afhaaldatum</strong></td><td>${formatDate(data.afhaaldatum)}</td></tr>
    </table>
    <div class="bestelling">
      <h3>Bestellijst</h3>
      <pre>${data.bestelling}</pre>
    </div>
  </div>
  <div class="footer">Benoît &amp; Veerle · Stroobantsstraat 104, 3040 Huldenberg · 016 / 47 72 90</div>
</div>
</body></html>`;
}

function confirmationEmailHtml(data: OrderData): string {
  return `
<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"><style>
  body { font-family: Georgia, serif; background: #FDF8F3; margin: 0; padding: 0; }
  .wrap { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; }
  .header { background: #8B1A1A; padding: 32px; }
  .header h1 { color: white; margin: 0; font-size: 24px; }
  .header p { color: #fca5a5; margin: 4px 0 0; font-size: 14px; }
  .body { padding: 32px; }
  .body p { color: #4A4A4A; line-height: 1.7; }
  .bestelling { background: #FDF8F3; border: 1px solid #F5EDE0; border-radius: 12px; padding: 20px; margin-top: 20px; }
  .bestelling h3 { color: #8B1A1A; margin: 0 0 12px; font-size: 16px; }
  .bestelling pre { margin: 0; white-space: pre-wrap; font-family: Georgia, serif; color: #2C2C2C; font-size: 14px; line-height: 1.6; }
  .highlight { background: #FDF8F3; border-left: 4px solid #8B1A1A; padding: 14px 18px; border-radius: 0 10px 10px 0; margin: 20px 0; }
  .footer { padding: 24px 32px; background: #F5EDE0; font-size: 12px; color: #4A4A4A; text-align: center; }
</style></head>
<body>
<div class="wrap">
  <div class="header">
    <h1>Bedankt voor uw bestelling!</h1>
    <p>Slagerij &amp; Traiteur Benoît en Veerle</p>
  </div>
  <div class="body">
    <p>Beste ${data.voornaam},</p>
    <p>
      Wij hebben uw bestelling goed ontvangen en nemen zo snel mogelijk contact met u op
      ter bevestiging. U kunt uw bestelling afhalen op <strong>${formatDate(data.afhaaldatum)}</strong>.
    </p>
    <div class="highlight">
      <strong>Uw bestellijst:</strong>
    </div>
    <div class="bestelling">
      <pre>${data.bestelling}</pre>
    </div>
    <p style="margin-top: 24px;">
      Heeft u vragen? Aarzel niet om ons te bellen op
      <a href="tel:+3216477290" style="color:#8B1A1A;">016 / 47 72 90</a>
      of te mailen naar
      <a href="mailto:info@benoitveerle.be" style="color:#8B1A1A;">info@benoitveerle.be</a>.
    </p>
    <p>Tot binnenkort bij Benoît &amp; Veerle!</p>
  </div>
  <div class="footer">Benoît &amp; Veerle · Stroobantsstraat 104, 3040 Huldenberg · 016 / 47 72 90</div>
</div>
</body></html>`;
}

export async function sendOrder(data: OrderData): Promise<ActionResult> {
  try {
    await Promise.all([
      resend.emails.send({
        from: "Benoît & Veerle <bestellingen@benoitveerle.be>",
        to: "jarneguns@gmail.com",
        subject: `Nieuwe bestelling van ${data.voornaam} ${data.achternaam} — afhaling ${formatDate(data.afhaaldatum)}`,
        html: shopEmailHtml(data),
        replyTo: data.email,
      }),
      resend.emails.send({
        from: "Benoît & Veerle <bestellingen@benoitveerle.be>",
        to: data.email,
        subject: "Uw bestelling bij Slagerij Benoît & Veerle is ontvangen",
        html: confirmationEmailHtml(data),
      }),
    ]);

    return { success: true };
  } catch (err) {
    console.error("sendOrder error:", err);
    return { success: false, error: "E-mail kon niet verstuurd worden. Probeer het opnieuw of bel ons op 016 / 47 72 90." };
  }
}
