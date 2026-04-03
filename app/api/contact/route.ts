import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const smtpEndpoint = "https://api.smtp2go.com/v3/email/send";

type ContactPayload = {
  email?: string;
  honeypot?: string;
  message?: string;
  name?: string;
  phone?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "Neplatné dáta formulára." }, { status: 400 });
  }

  const name = `${body.name ?? ""}`.trim();
  const email = `${body.email ?? ""}`.trim();
  const phone = `${body.phone ?? ""}`.trim();
  const message = `${body.message ?? ""}`.trim();
  const honeypot = `${body.honeypot ?? ""}`.trim();

  if (honeypot) {
    return NextResponse.json({
      message: "Ďakujeme, vaša správa bola prijatá.",
      success: true,
    });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { message: "Vyplňte prosím meno, e-mail a správu." },
      { status: 400 },
    );
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { message: "Zadajte prosím platnú e-mailovú adresu." },
      { status: 400 },
    );
  }

  const apiKey = process.env.SMTP2GO_API_KEY;
  const recipientEmail = process.env.CONTACT_FORM_RECIPIENT;
  const sender = process.env.SMTP2GO_SENDER;

  if (!apiKey || !recipientEmail || !sender) {
    return NextResponse.json(
      {
        message:
          "Formulár ešte nie je dokončený na serveri. Doplňte SMTP2GO nastavenia do .env.",
      },
      { status: 500 },
    );
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || "Neuvedené");
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  const subject = `Nový dopyt z webu od ${name}`;
  const textBody = [
    "Nový dopyt z webu Vavrostav",
    "",
    `Meno: ${name}`,
    `Email: ${email}`,
    `Telefón: ${phone || "Neuvedené"}`,
    "",
    "Správa:",
    message,
  ].join("\n");

  const htmlBody = `
    <h2>Nový dopyt z webu Vavrostav</h2>
    <p><strong>Meno:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Telefón:</strong> ${safePhone}</p>
    <p><strong>Správa:</strong><br />${safeMessage}</p>
  `;

  try {
    const smtpResponse = await fetch(smtpEndpoint, {
      body: JSON.stringify({
        api_key: apiKey,
        html_body: htmlBody,
        sender,
        subject,
        text_body: textBody,
        to: [recipientEmail],
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      cache: "no-store",
    });

    const smtpPayload = (await smtpResponse.json().catch(() => null)) as
      | {
          data?: {
            failed?: number;
            succeeded?: number;
          };
          error?: string;
          errors?: unknown[];
        }
      | null;

    const failedCount = Number(smtpPayload?.data?.failed ?? 0);
    const succeededCount = Number(
      smtpPayload?.data?.succeeded ?? (smtpResponse.ok ? 1 : 0),
    );
    const hasApiError = Boolean(smtpPayload?.error) || Boolean(smtpPayload?.errors?.length);

    if (!smtpResponse.ok || hasApiError || failedCount > 0 || succeededCount < 1) {
      console.error("SMTP2GO send failed", {
        smtpPayload,
        status: smtpResponse.status,
      });

      return NextResponse.json(
        { message: "Správu sa nepodarilo odoslať. Skúste to prosím znovu." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      message: "Ďakujeme, vaša správa bola odoslaná. Ozveme sa vám čo najskôr.",
      success: true,
    });
  } catch (error) {
    console.error("SMTP2GO request error", error);

    return NextResponse.json(
      { message: "Spojenie so službou pre odoslanie správ zlyhalo. Skúste to znovu neskôr." },
      { status: 500 },
    );
  }
}
