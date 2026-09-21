import { contact } from "@/content/site";
import { sendQuoteToTelegram } from "@/lib/telegram";

const services = new Set(contact.serviceOptions.map((option) => option.value));
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const name = readString(payload.name).slice(0, 120);
  const phone = readString(payload.phone).slice(0, 30);
  const email = readString(payload.email).slice(0, 120);
  const service = readString(payload.service);
  const message = readString(payload.message).slice(0, 2000);
  const digitCount = digitsOnly(phone).length;

  if (
    !name ||
    !phone ||
    !email ||
    !service ||
    !message ||
    !emailPattern.test(email) ||
    !services.has(service) ||
    digitCount < 8 ||
    digitCount > 15
  ) {
    return Response.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  try {
    await sendQuoteToTelegram({ name, phone, email, service, message });
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Could not send to Telegram. Please call us." },
      { status: 500 },
    );
  }
}
