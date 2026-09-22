"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/button";
import { serviceValues } from "@/content/site";

type Status = "idle" | "sending" | "sent";

const phonePattern = "^[+]?[\\d\\s\\-()]{8,20}$";

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

function sanitizePhone(value: string) {
  return value.replace(/[^\d+\-\s()]/g, "");
}

function isValidPhone(value: string) {
  const digits = digitsOnly(value);
  return digits.length >= 8 && digits.length <= 15;
}

export function QuoteForm() {
  const t = useTranslations("Contact");
  const tCommon = useTranslations("Common");
  const [status, setStatus] = useState<Status>("idle");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitError, setSubmitError] = useState("");

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-hairline bg-paper p-8">
        <p className="font-display text-2xl font-semibold text-ink">
          {t("successTitle")}
        </p>
        <p className="mt-3 text-sm leading-6">{t("successBody")}</p>
        <Button
          className="mt-6"
          variant="secondary"
          onClick={() => {
            setStatus("idle");
            setPhone("");
            setPhoneError("");
            setSubmitError("");
          }}
        >
          {tCommon("sendAnother")}
        </Button>
      </div>
    );
  }

  return (
    <form
      className="grid gap-5 rounded-2xl border border-hairline bg-white p-6 sm:p-8"
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
          setPhoneError(t("fields.phoneError"));
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
            }),
          });

          if (!response.ok) {
            throw new Error("send_failed");
          }

          setStatus("sent");
        } catch {
          setStatus("idle");
          setSubmitError(t("submitError"));
        }
      }}
    >
      <p className="font-display text-2xl font-semibold text-ink">
        {t("formTitle")}
      </p>
      <Field
        label={t("fields.name")}
        name="name"
        autoComplete="name"
        required
      />
      <label className="grid gap-2 text-sm">
        <span className="font-medium text-ink">{t("fields.phone")}</span>
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          value={phone}
          pattern={phonePattern}
          aria-invalid={phoneError ? true : undefined}
          aria-describedby={phoneError ? "phone-error" : undefined}
          className={`min-h-11 rounded-xl border bg-paper px-3 text-ink outline-none transition-colors duration-300 ease-out focus:border-primary ${
            phoneError ? "border-red-500" : "border-hairline"
          }`}
          onChange={(event) => {
            const next = sanitizePhone(event.target.value);
            setPhone(next);
            if (!next || isValidPhone(next)) {
              setPhoneError("");
              event.target.setCustomValidity("");
            } else {
              setPhoneError(t("fields.phoneError"));
              event.target.setCustomValidity(t("fields.phoneError"));
            }
          }}
        />
        {phoneError ? (
          <span id="phone-error" className="text-xs text-red-600">
            {phoneError}
          </span>
        ) : null}
      </label>
      <Field
        label={t("fields.email")}
        name="email"
        type="email"
        autoComplete="email"
        required
      />
      <label className="grid gap-2 text-sm">
        <span className="font-medium text-ink">{t("fields.service")}</span>
        <select
          name="service"
          required
          defaultValue="both"
          className="min-h-11 rounded-xl border border-hairline bg-paper px-3 text-ink outline-none transition-colors duration-300 ease-out focus:border-primary"
        >
          {serviceValues.map((value) => (
            <option key={value} value={value}>
              {t(`services.${value}`)}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm">
        <span className="font-medium text-ink">{t("fields.message")}</span>
        <textarea
          name="message"
          required
          rows={5}
          className="rounded-xl border border-hairline bg-paper px-3 py-3 text-ink outline-none transition-colors duration-300 ease-out focus:border-primary"
          placeholder={t("placeholder")}
        />
      </label>
      {submitError ? (
        <p className="text-sm text-red-600">{submitError}</p>
      ) : null}
      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? t("fields.sending") : t("fields.submit")}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium text-ink">{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="min-h-11 rounded-xl border border-hairline bg-paper px-3 text-ink outline-none transition-colors duration-300 ease-out focus:border-primary"
      />
    </label>
  );
}
