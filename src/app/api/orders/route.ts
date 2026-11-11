import { randomBytes } from "node:crypto";
import en from "../../../../messages/en.json";
import { getBook, MAX_QTY } from "@/content/books";
import { sendOrderToTelegram, type OrderPayload } from "@/lib/telegram";

const MAX_LINES = 30;
const payments = new Set(["cod", "kbzpay", "wavepay"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function createOrderNo() {
  const date = new Date().toISOString().slice(2, 10).replaceAll("-", "");
  const suffix = randomBytes(2).toString("hex").toUpperCase();
  return `WPP-${date}-${suffix}`;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const name = readString(payload.name, 120);
  const phone = readString(payload.phone, 30);
  const email = readString(payload.email, 120);
  const fulfilment = payload.fulfilment === "pickup" ? "pickup" : "delivery";
  const township = readString(payload.township, 120);
  const address = readString(payload.address, 400);
  const payment = readString(payload.payment, 20);
  const note = readString(payload.note, 1000);
  const digitCount = phone.replace(/\D/g, "").length;

  // Prices always come from the catalogue, never from the client.
  const rawItems = Array.isArray(payload.items) ? payload.items.slice(0, MAX_LINES) : [];
  const lines: OrderPayload["lines"] = [];
  for (const item of rawItems) {
    const book = getBook(typeof item?.id === "string" ? item.id : "");
    const qty = Math.floor(Number(item?.qty));
    if (!book || !(qty >= 1 && qty <= MAX_QTY)) {
      return Response.json({ error: "Please check your cart and try again." }, { status: 400 });
    }
    lines.push({ title: en.Books.items[book.id].title, qty, total: book.price * qty });
  }

  if (
    !name ||
    digitCount < 8 ||
    digitCount > 15 ||
    (email && !emailPattern.test(email)) ||
    !payments.has(payment) ||
    (fulfilment === "delivery" && (!township || !address)) ||
    lines.length === 0
  ) {
    return Response.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const orderNo = createOrderNo();

  try {
    await sendOrderToTelegram({
      orderNo,
      name,
      phone,
      email,
      fulfilment,
      township: fulfilment === "delivery" ? township : "",
      address: fulfilment === "delivery" ? address : "",
      payment: payment as OrderPayload["payment"],
      note,
      lines,
      subtotal: lines.reduce((sum, line) => sum + line.total, 0),
    });
    return Response.json({ ok: true, orderNo });
  } catch {
    return Response.json(
      { error: "Could not send the order. Please call us." },
      { status: 500 },
    );
  }
}
