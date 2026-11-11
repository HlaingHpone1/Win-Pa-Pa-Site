"use client";

import { useState } from "react";

export const phonePattern = "^[+]?[\\d\\s\\-()]{8,20}$";

export function sanitizePhone(value: string) {
  return value.replace(/[^\d+\-\s()]/g, "");
}

export function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

export const iconSlot =
  "pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate/70 transition-colors duration-300 ease-out group-focus-within:text-primary-ink";

export const inputBase =
  "min-h-12 w-full rounded-brand border bg-paper pr-3.5 pl-11 text-ink outline-none transition-[border-color,background-color,box-shadow] duration-300 ease-out placeholder:text-slate/50 hover:border-ink/25 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/25";

export const textareaBase =
  "resize-y rounded-brand border border-hairline bg-paper px-3.5 py-3 text-ink outline-none transition-[border-color,background-color,box-shadow] duration-300 ease-out placeholder:text-slate/60 hover:border-ink/25 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/25";

export function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="font-medium text-ink">
      {children}
      {required ? <span aria-hidden className="ml-0.5 text-primary-ink">*</span> : null}
    </label>
  );
}

export function Field({
  idPrefix,
  label,
  name,
  type = "text",
  autoComplete,
  placeholder,
  icon,
  required,
}: {
  idPrefix: string;
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  icon: React.ReactNode;
  required?: boolean;
}) {
  const id = `${idPrefix}-${name}`;

  return (
    <div className="grid gap-2 text-sm">
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
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

/** Phone input with live validation; marks itself invalid so the browser blocks submit. */
export function PhoneField({
  idPrefix,
  label,
  errorMessage,
}: {
  idPrefix: string;
  label: string;
  errorMessage: string;
}) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const id = `${idPrefix}-phone`;
  const errorId = `${idPrefix}-phone-error`;

  return (
    <div className="grid gap-2 text-sm">
      <FieldLabel htmlFor={id} required>
        {label}
      </FieldLabel>
      <div className="group relative">
        <span className={iconSlot}>
          <PhoneIcon />
        </span>
        <input
          id={id}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          value={phone}
          pattern={phonePattern}
          placeholder="09-xxx xxx xxx"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`${inputBase} ${
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-hairline"
          }`}
          onChange={(event) => {
            const next = sanitizePhone(event.target.value);
            setPhone(next);
            if (!next || isValidPhone(next)) {
              setError("");
              event.target.setCustomValidity("");
            } else {
              setError(errorMessage);
              event.target.setCustomValidity(errorMessage);
            }
          }}
          onInvalid={(event) => {
            if (event.currentTarget.value) {
              setError(errorMessage);
            }
          }}
        />
      </div>
      {error ? (
        <span id={errorId} className="text-xs text-red-600">
          {error}
        </span>
      ) : null}
    </div>
  );
}

export function Icon({ children }: { children: React.ReactNode }) {
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

export function UserIcon() {
  return (
    <Icon>
      <circle cx="10" cy="7" r="3.2" />
      <path d="M3.8 17c.9-3 3.3-4.6 6.2-4.6s5.3 1.6 6.2 4.6" />
    </Icon>
  );
}

export function PhoneIcon() {
  return (
    <Icon>
      <path d="M5.4 3.8h2.2l1.1 2.8-1.4 1.4a10.5 10.5 0 0 0 5.7 5.7l1.4-1.4 2.8 1.1v2.2c0 .8-.6 1.4-1.4 1.4C8.6 17 3 11.4 3 4.8c0-.8.6-1 1.4-1Z" />
    </Icon>
  );
}

export function MailIcon() {
  return (
    <Icon>
      <rect x="3" y="5" width="14" height="10.4" rx="1.6" />
      <path d="M4 6.4 10 11l6-4.6" />
    </Icon>
  );
}

export function PinIcon() {
  return (
    <Icon>
      <path d="M10 17.5s5.5-4.9 5.5-9.3a5.5 5.5 0 0 0-11 0c0 4.4 5.5 9.3 5.5 9.3Z" />
      <circle cx="10" cy="8.2" r="2" />
    </Icon>
  );
}

export function CheckIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="m4.5 10.5 3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
