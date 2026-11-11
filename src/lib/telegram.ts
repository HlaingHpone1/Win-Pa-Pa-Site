import { formatKs } from "@/content/books";

type QuotePayload = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function readChatId(value: string) {
  const trimmed = value.trim().replaceAll(/^["']|["']$/g, "");
  return /^-?\d+$/.test(trimmed) ? Number(trimmed) : trimmed;
}

export type OrderPayload = {
  orderNo: string;
  name: string;
  phone: string;
  email: string;
  fulfilment: "delivery" | "pickup";
  township: string;
  address: string;
  payment: "cod" | "kbzpay" | "wavepay";
  note: string;
  lines: { title: string; qty: number; total: number }[];
  subtotal: number;
};

// Quotes and book orders go to separate bots, so neither chat drowns out the other.
// There is deliberately no fallback between them.
type Channel = "quotes" | "orders";

function readChannel(channel: Channel) {
  const token =
    channel === "orders" ? process.env.TELEGRAM_ORDERS_BOT_TOKEN : process.env.TELEGRAM_BOT_TOKEN;
  const chatId =
    channel === "orders" ? process.env.TELEGRAM_ORDERS_CHAT_ID : process.env.TELEGRAM_CHAT_ID;

  return {
    token: token?.trim(),
    chatId: chatId ? readChatId(chatId) : "",
  };
}

async function sendTelegramMessage(text: string, channel: Channel) {
  const { token, chatId } = readChannel(channel);

  if (!token || chatId === "") {
    throw new Error(`Telegram (${channel}) is not configured.`);
  }

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    },
  );

  const result = (await response.json()) as {
    ok?: boolean;
    description?: string;
  };

  if (!response.ok || !result.ok) {
    throw new Error(result.description ?? "Telegram rejected the message.");
  }
}

export async function sendQuoteToTelegram(payload: QuotePayload) {
  const text = [
    "<b>New quote · Win Pa Pa</b>",
    "",
    `<b>Name:</b> ${escapeHtml(payload.name)}`,
    `<b>Phone:</b> ${escapeHtml(payload.phone)}`,
    `<b>Email:</b> ${escapeHtml(payload.email)}`,
    `<b>Service:</b> ${escapeHtml(payload.service)}`,
    "",
    escapeHtml(payload.message),
  ].join("\n");

  await sendTelegramMessage(text, "quotes");
}

const paymentLabels: Record<OrderPayload["payment"], string> = {
  cod: "Cash on delivery",
  kbzpay: "KBZPay transfer",
  wavepay: "WavePay transfer",
};

export async function sendOrderToTelegram(order: OrderPayload) {
  const text = [
    `<b>New book order · ${escapeHtml(order.orderNo)}</b>`,
    "",
    `<b>Name:</b> ${escapeHtml(order.name)}`,
    `<b>Phone:</b> ${escapeHtml(order.phone)}`,
    order.email ? `<b>Email:</b> ${escapeHtml(order.email)}` : null,
    `<b>Payment:</b> ${paymentLabels[order.payment]}`,
    order.fulfilment === "delivery"
      ? `<b>Deliver to:</b> ${escapeHtml(order.address)}, ${escapeHtml(order.township)} (fee to confirm by phone)`
      : "<b>Pickup</b> at the shop",
    "",
    ...order.lines.map(
      (line) => `${line.qty} × ${escapeHtml(line.title)} = ${formatKs(line.total)} Ks`,
    ),
    `<b>Subtotal:</b> ${formatKs(order.subtotal)} Ks`,
    order.note ? `\n<b>Note:</b> ${escapeHtml(order.note)}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");

  await sendTelegramMessage(text, "orders");
}
