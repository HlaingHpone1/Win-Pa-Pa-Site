"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/button";
import { ServiceSelect } from "@/components/service-select";
import { HoneypotField, Turnstile, useStartedAt, type TurnstileHandle } from "@/components/spam-guard";
import { serviceValues } from "@/content/site";
import {
  Field,
  FieldLabel,
  Icon,
  isValidPhone,
  MailIcon,
  PhoneField,
  sanitizePhone,
  textareaBase,
  UserIcon,
} from "@/components/form-fields";

type Status = "idle" | "sending" | "sent";

export function QuoteForm() {
  const t = useTranslations("Contact");
  const tCommon = useTranslations("Common");
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState("");
  const startedAt = useStartedAt();
  const turnstile = useRef<TurnstileHandle>(null);

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start rounded-brand border border-primary/40 bg-primary-soft p-8 sm:p-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-brand bg-primary text-ink">
          <svg width="28" height="28" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="m4.5 10.5 3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="text-subtitle mt-6 text-ink">{t("successTitle")}</p>
        <p className="text-body mt-3">{t("successBody")}</p>
        <Button
          className="mt-8"
          variant="secondary"
          onClick={() => {
            setStatus("idle");
            setSubmitError("");
          }}
        >
          {tCommon("sendAnother")}
        </Button>
      </div>
    );
  }

  const serviceOptions = serviceValues.map((value) => ({
    value,
    label: t(`services.${value}`),
    hint: t(`serviceHints.${value}`),
    icon: serviceIcons[value],
  }));

  return (
    <form
      className="relative rounded-brand border border-hairline bg-white shadow-[0_32px_70px_-40px_rgba(14,17,11,0.45)]"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const name = String(data.get("name") ?? "").trim();
        const nextPhone = sanitizePhone(String(data.get("phone") ?? ""));
        const email = String(data.get("email") ?? "").trim();
        const service = String(data.get("service") ?? "");
        const message = String(data.get("message") ?? "").trim();

        if (!isValidPhone(nextPhone)) {
          const phoneInput = form.elements.namedItem("phone");
          if (phoneInput instanceof HTMLInputElement) {
            phoneInput.setCustomValidity(t("fields.phoneError"));
            phoneInput.reportValidity();
          }
          return;
        }

        setSubmitError("");
        setStatus("sending");

        try {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              phone: nextPhone,
              email,
              service,
              message,
              website: data.get("website"),
              startedAt,
              turnstileToken: data.get("cf-turnstile-response"),
            }),
          });

          if (!response.ok) {
            throw new Error(response.status === 403 ? "captcha" : "send_failed");
          }

          setStatus("sent");
        } catch (error) {
          setStatus("idle");
          setSubmitError(
            error instanceof Error && error.message === "captcha" ? t("captchaError") : t("submitError"),
          );
          turnstile.current?.reset();
        }
      }}
    >
      <div className="grain relative overflow-hidden rounded-t-brand bg-ink px-6 py-6 sm:px-8">
        <div
          aria-hidden
          className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/30 blur-3xl"
        />
        <div className="relative flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-brand bg-primary text-ink">
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M6 7V3h8v4M6 14H4.5A1.5 1.5 0 0 1 3 12.5v-4A1.5 1.5 0 0 1 4.5 7h11A1.5 1.5 0 0 1 17 8.5v4a1.5 1.5 0 0 1-1.5 1.5H14M6 11h8v6H6v-6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <p className="text-subtitle text-white">{t("formTitle")}</p>
            <p className="text-body mt-1 text-white/65">{t("lead")}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-6 sm:p-8">
        <Field
          idPrefix="quote"
          label={t("fields.name")}
          name="name"
          autoComplete="name"
          icon={<UserIcon />}
          required
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <PhoneField
            idPrefix="quote"
            label={t("fields.phone")}
            errorMessage={t("fields.phoneError")}
          />
          <Field
            idPrefix="quote"
            label={t("fields.email")}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            icon={<MailIcon />}
            required
          />
        </div>
        <ServiceSelect
          name="service"
          label={t("fields.service")}
          options={serviceOptions}
          defaultValue="both"
        />
        <div className="grid gap-2 text-sm">
          <FieldLabel htmlFor="quote-message" required>
            {t("fields.message")}
          </FieldLabel>
          <textarea
            id="quote-message"
            name="message"
            required
            rows={4}
            className={textareaBase}
            placeholder={t("placeholder")}
          />
        </div>
        <HoneypotField />
        <Turnstile ref={turnstile} />
        {submitError ? (
          <p role="alert" className="rounded-brand border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {submitError}
          </p>
        ) : null}
        <Button type="submit" className="w-full" arrow disabled={status === "sending"}>
          {status === "sending" ? t("fields.sending") : t("fields.submit")}
        </Button>
      </div>
    </form>
  );
}

const serviceIcons: Record<(typeof serviceValues)[number], React.ReactNode> = {
  printing: (
    <Icon>
      <path d="M6 7V3h8v4M6 14H4.5A1.5 1.5 0 0 1 3 12.5v-4A1.5 1.5 0 0 1 4.5 7h11A1.5 1.5 0 0 1 17 8.5v4a1.5 1.5 0 0 1-1.5 1.5H14M6 11h8v6H6v-6Z" />
    </Icon>
  ),
  binding: (
    <Icon>
      <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H16v12H5.5A1.5 1.5 0 0 0 4 16.5v-12ZM4 16.5A1.5 1.5 0 0 0 5.5 18H16M8 3v12" />
    </Icon>
  ),
  both: (
    <Icon>
      <path d="m10 3 7 3.5-7 3.5-7-3.5L10 3ZM3 10l7 3.5 7-3.5M3 13.5 10 17l7-3.5" />
    </Icon>
  ),
  other: (
    <Icon>
      <path d="M10 3v3M10 14v3M3 10h3M14 10h3M5.2 5.2l2 2M12.8 12.8l2 2M5.2 14.8l2-2M12.8 7.2l2-2" />
    </Icon>
  ),
};
