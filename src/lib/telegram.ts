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

export async function sendQuoteToTelegram(payload: QuotePayload) {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID
    ? readChatId(process.env.TELEGRAM_CHAT_ID)
    : "";

  if (!token || chatId === "") {
    throw new Error("Telegram is not configured.");
  }

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
