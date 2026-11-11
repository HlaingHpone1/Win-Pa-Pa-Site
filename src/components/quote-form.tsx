"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/button";
import { ServiceSelect } from "@/components/service-select";
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

  const serviceOptions = serviceValues.map((value) => ({
    value,
    label: t(`services.${value}`),
    hint: t(`serviceHints.${value}`),
    icon: serviceIcons[value],
  }));

  return (
    <form
      className="rounded-brand border border-hairline bg-white shadow-[0_32px_70px_-40px_rgba(14,17,11,0.45)]"
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
          label={t("fields.name")}
          name="name"
          autoComplete="name"
          icon={<UserIcon />}
          required
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2 text-sm">
            <label htmlFor="quote-phone" className="font-medium text-ink">
              {t("fields.phone")}
              <span aria-hidden className="ml-0.5 text-primary-ink">*</span>
            </label>
            <div className="group relative">
              <span className={iconSlot}>
                <PhoneIcon />
              </span>
              <input
                id="quote-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                value={phone}
                pattern={phonePattern}
                placeholder="09-xxx xxx xxx"
                aria-invalid={phoneError ? true : undefined}
                aria-describedby={phoneError ? "phone-error" : undefined}
                className={`${inputBase} ${
                  phoneError ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-hairline"
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
            </div>
            {phoneError ? (
              <span id="phone-error" className="text-xs text-red-600">
                {phoneError}
              </span>
            ) : null}
          </div>
          <Field
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
          <label htmlFor="quote-message" className="font-medium text-ink">
            {t("fields.message")}
            <span aria-hidden className="ml-0.5 text-primary-ink">*</span>
          </label>
          <textarea
            id="quote-message"
            name="message"
            required
            rows={4}
            className="resize-y rounded-brand border border-hairline bg-paper px-3.5 py-3 text-ink outline-none transition-[border-color,background-color,box-shadow] duration-300 ease-out placeholder:text-slate/60 hover:border-ink/25 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/25"
            placeholder={t("placeholder")}
          />
        </div>
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

const iconSlot =
  "pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate/70 transition-colors duration-300 ease-out group-focus-within:text-primary-ink";

const inputBase =
  "min-h-12 w-full rounded-brand border bg-paper pr-3.5 pl-11 text-ink outline-none transition-[border-color,background-color,box-shadow] duration-300 ease-out placeholder:text-slate/50 hover:border-ink/25 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/25";

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  placeholder,
  icon,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  icon: React.ReactNode;
  required?: boolean;
}) {
  const id = `quote-${name}`;

  return (
    <div className="grid gap-2 text-sm">
      <label htmlFor={id} className="font-medium text-ink">
        {label}
        {required ? <span aria-hidden className="ml-0.5 text-primary-ink">*</span> : null}
      </label>
      <div className="group relative">
        <span className={iconSlot}>{icon}</span>
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          required={required}
          className={`${inputBase} border-hairline`}
        />
      </div>
    </div>
  );
}

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function UserIcon() {
  return (
    <Icon>
      <circle cx="10" cy="7" r="3.2" />
      <path d="M3.8 17c.9-3 3.3-4.6 6.2-4.6s5.3 1.6 6.2 4.6" />
    </Icon>
  );
}

function PhoneIcon() {
  return (
    <Icon>
      <path d="M5.4 3.8h2.2l1.1 2.8-1.4 1.4a10.5 10.5 0 0 0 5.7 5.7l1.4-1.4 2.8 1.1v2.2c0 .8-.6 1.4-1.4 1.4C8.6 17 3 11.4 3 4.8c0-.8.6-1 1.4-1Z" />
    </Icon>
  );
}

function MailIcon() {
  return (
    <Icon>
      <rect x="3" y="5" width="14" height="10.4" rx="1.6" />
      <path d="M4 6.4 10 11l6-4.6" />
    </Icon>
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
