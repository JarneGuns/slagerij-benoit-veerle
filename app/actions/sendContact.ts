"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactData = {
  naam: string;
  email: string;
  telefoon: string;
  bericht: string;
};

export type ActionResult = { success: true } | { success: false; error: string };

export async function sendContact(data: ContactData): Promise<ActionResult> {
  try {
    await resend.emails.send({
      from: "Benoît & Veerle <contact@benoitveerle.be>",
      to: "jarneguns@gmail.com",
      subject: `Nieuw contactbericht van ${data.naam}`,
      replyTo: data.email,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:40px auto;background:white;border-radius:16px;overflow:hidden;border:1px solid #F5EDE0">
          <div style="background:#8B1A1A;padding:28px 32px">
            <h1 style="color:white;margin:0;font-size:20px">Nieuw contactbericht</h1>
            <p style="color:#fca5a5;margin:4px 0 0;font-size:13px">Slagerij &amp; Traiteur Benoît en Veerle</p>
          </div>
          <div style="padding:32px">
            <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
              <tr><th style="text-align:left;padding:10px 14px;background:#F5EDE0;font-size:13px" colspan="2">Afzender</th></tr>
              <tr><td style="padding:10px 14px;border-bottom:1px solid #F5EDE0;color:#4A4A4A;width:120px"><strong>Naam</strong></td><td style="padding:10px 14px;border-bottom:1px solid #F5EDE0">${data.naam}</td></tr>
              <tr><td style="padding:10px 14px;border-bottom:1px solid #F5EDE0;color:#4A4A4A"><strong>E-mail</strong></td><td style="padding:10px 14px;border-bottom:1px solid #F5EDE0"><a href="mailto:${data.email}">${data.email}</a></td></tr>
              <tr><td style="padding:10px 14px;border-bottom:1px solid #F5EDE0;color:#4A4A4A"><strong>Telefoon</strong></td><td style="padding:10px 14px;border-bottom:1px solid #F5EDE0">${data.telefoon}</td></tr>
            </table>
            <div style="background:#FDF8F3;border:1px solid #F5EDE0;border-radius:12px;padding:20px">
              <h3 style="color:#8B1A1A;margin:0 0 12px;font-size:15px">Bericht</h3>
              <p style="margin:0;color:#2C2C2C;font-size:14px;line-height:1.7;white-space:pre-wrap">${data.bericht}</p>
            </div>
          </div>
          <div style="padding:20px 32px;background:#F5EDE0;font-size:12px;color:#4A4A4A;text-align:center">
            Benoît &amp; Veerle · Stroobantsstraat 104, 3040 Huldenberg · 016 / 47 72 90
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error("sendContact error:", err);
    return {
      success: false,
      error: "Bericht kon niet verstuurd worden. Bel ons op 016 / 47 72 90.",
    };
  }
}
