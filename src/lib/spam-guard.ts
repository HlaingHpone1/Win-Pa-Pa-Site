const MIN_FILL_MS = 3_000;
const MAX_FILL_MS = 24 * 60 * 60 * 1000;
const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export type SpamCheck = "ok" | "silent-drop" | "captcha-failed";

function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    undefined
  );
}

async function verifyTurnstile(token: string, ip?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    // Fail closed: a missing key must not quietly switch the check off.
    throw new Error("Turnstile is not configured.");
  }
  if (!token) {
    return false;
  }

  const body = new URLSearchParams({ secret, response: token });
  if (ip) {
    body.set("remoteip", ip);
  }

  const response = await fetch(SITEVERIFY_URL, { method: "POST", body });
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

/**
 * Runs the cheap bot checks first (trap field, fill time) and only then asks Cloudflare.
 * Bots caught by the first two get a fake success, so they don't learn they were blocked.
 */
export async function checkSubmission(
  payload: Record<string, unknown>,
  request: Request,
): Promise<SpamCheck> {
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return "silent-drop";
  }

  const startedAt = Number(payload.startedAt);
  const elapsed = Date.now() - startedAt;
  if (!Number.isFinite(startedAt) || elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS) {
    return "silent-drop";
  }

  const token = typeof payload.turnstileToken === "string" ? payload.turnstileToken.slice(0, 2048) : "";
  return (await verifyTurnstile(token, clientIp(request))) ? "ok" : "captcha-failed";
}
