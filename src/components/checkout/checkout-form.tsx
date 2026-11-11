"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/button";
import { BookCover } from "@/components/books/book-cover";
import { clearCart, useCart, useHydrated } from "@/components/cart/cart-store";
import {
  CheckIcon,
  Field,
  FieldLabel,
  isValidPhone,
  MailIcon,
  PhoneField,
  PinIcon,
  sanitizePhone,
  textareaBase,
  UserIcon,
} from "@/components/form-fields";
import { formatKs } from "@/content/books";
import { company, shop } from "@/content/site";

type Fulfilment = "delivery" | "pickup";
type Payment = "cod" | "kbzpay" | "wavepay";
type Placed = { orderNo: string; payment: Payment; amount: number };

const fulfilments: Fulfilment[] = ["delivery", "pickup"];
const payments: Payment[] = ["cod", "kbzpay", "wavepay"];

export function CheckoutForm() {
  const t = useTranslations("Checkout");
  const tContact = useTranslations("Contact");
  const tBooks = useTranslations("Books");
  const hydrated = useHydrated();
  const { items, lines, count, subtotal } = useCart();
  const [fulfilment, setFulfilment] = useState<Fulfilment>("delivery");
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [placed, setPlaced] = useState<Placed | null>(null);
  const ks = (amount: number) => tBooks("price", { amount: formatKs(amount) });

  if (placed) {
    return <OrderPlaced placed={placed} />;
  }

  if (!hydrated) {
    return <div className="h-[36rem] animate-pulse rounded-brand bg-white" aria-hidden />;
  }

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-brand border border-hairline bg-white px-6 py-16 text-center">
        <p className="text-subtitle">{t("emptyTitle")}</p>
        <p className="text-body mt-3 max-w-sm">{t("emptyBody")}</p>
        <Button href="/books" className="mt-8" arrow>
          {t("keepShopping")}
        </Button>
      </div>
    );
  }

  return (
    <form
      className="grid items-start gap-6 lg:grid-cols-[1fr_24rem]"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const phone = sanitizePhone(String(data.get("phone") ?? ""));
        const payment = String(data.get("payment") ?? "cod") as Payment;

        if (!isValidPhone(phone)) {
          const phoneInput = form.elements.namedItem("phone");
          if (phoneInput instanceof HTMLInputElement) {
            phoneInput.setCustomValidity(tContact("fields.phoneError"));
            phoneInput.reportValidity();
          }
          return;
        }

        setSubmitError("");
        setSending(true);

        try {
          const response = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: data.get("name"),
              phone,
              email: data.get("email"),
              fulfilment,
              township: data.get("township"),
              address: data.get("address"),
              payment,
              note: data.get("note"),
              items,
            }),
          });
          const result = (await response.json()) as { orderNo?: string };

          if (!response.ok || !result.orderNo) {
            throw new Error("order_failed");
          }

          setPlaced({ orderNo: result.orderNo, payment, amount: subtotal });
          clearCart();
          window.scrollTo({ top: 0, behavior: "smooth" });
        } catch {
          setSubmitError(t("submitError"));
        } finally {
          setSending(false);
        }
      }}
    >
      <div className="grid gap-6">
        <Panel step="01" title={t("contactTitle")}>
          <Field
            idPrefix="checkout"
            label={t("fields.name")}
            name="name"
            autoComplete="name"
            icon={<UserIcon />}
            required
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <PhoneField
              idPrefix="checkout"
              label={t("fields.phone")}
              errorMessage={tContact("fields.phoneError")}
            />
            <Field
              idPrefix="checkout"
              label={t("fields.email")}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              icon={<MailIcon />}
            />
          </div>
        </Panel>

        <Panel step="02" title={t("fulfilmentTitle")}>
          <div className="grid gap-3 sm:grid-cols-2">
            {fulfilments.map((option) => (
              <ChoiceCard
                key={option}
                name="fulfilment"
                value={option}
                checked={fulfilment === option}
                onChange={() => setFulfilment(option)}
                label={t(`fulfilment.${option}`)}
                hint={t(`fulfilment.${option}Hint`)}
                icon={option === "delivery" ? <TruckIcon /> : <StoreIcon />}
              />
            ))}
          </div>
          {fulfilment === "delivery" ? (
            <div className="grid gap-5 sm:grid-cols-[1fr_1.4fr]">
              <Field
                idPrefix="checkout"
                label={t("fields.township")}
                name="township"
                autoComplete="address-level2"
                icon={<PinIcon />}
                required
              />
              <Field
                idPrefix="checkout"
                label={t("fields.address")}
                name="address"
                autoComplete="street-address"
                icon={<HomeIcon />}
                required
              />
            </div>
          ) : null}
        </Panel>

        <Panel step="03" title={t("paymentTitle")}>
          <div className="grid gap-3 sm:grid-cols-3">
            {payments.map((option, index) => (
              <ChoiceCard
                key={option}
                name="payment"
                value={option}
                defaultChecked={index === 0}
                stacked
                label={t(`payment.${option}`)}
                hint={t(`payment.${option}Hint`)}
                icon={option === "cod" ? <CashIcon /> : <WalletIcon />}
              />
            ))}
          </div>
          <div className="grid gap-2 text-sm">
            <FieldLabel htmlFor="checkout-note">{t("fields.note")}</FieldLabel>
            <textarea
              id="checkout-note"
              name="note"
              rows={3}
              maxLength={1000}
              placeholder={t("fields.notePlaceholder")}
              className={textareaBase}
            />
          </div>
        </Panel>
      </div>

      <aside className="grain relative overflow-hidden rounded-brand bg-ink p-6 text-white lg:sticky lg:top-24">
        <div
          aria-hidden
          className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/25 blur-3xl"
        />
        <div className="relative">
          <p className="text-subtitle text-white">
            {t("summaryTitle")}
            <span className="ml-2 align-middle text-sm font-normal text-white/50 tabular-nums">({count})</span>
          </p>
          <ul className="mt-5 space-y-3">
            {lines.map(({ book, qty, total }) => {
              const title = tBooks(`items.${book.id}.title`);
              return (
                <li key={book.id} className="flex items-center gap-3">
                  <BookCover book={book} title={title} author="" size="sm" className="w-10 shrink-0" />
                  <p className="min-w-0 flex-1 text-sm">
                    <span className="block truncate font-medium">{title}</span>
                    <span className="text-white/50 tabular-nums">× {qty}</span>
                  </p>
                  <p className="text-sm font-semibold tabular-nums">{ks(total)}</p>
                </li>
              );
            })}
          </ul>
          <dl className="mt-6 space-y-2 border-t border-white/10 pt-5 text-sm">
            <div className="flex justify-between text-white/70">
              <dt>{t("total")}</dt>
              <dd className="tabular-nums">{ks(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-white/70">
              <dt>{t("delivery")}</dt>
              <dd>{fulfilment === "pickup" ? ks(0) : t("deliveryValue")}</dd>
            </div>
          </dl>
          <div className="mt-5 flex items-baseline justify-between border-t border-white/10 pt-5">
            <p className="text-eyebrow text-white/60">{t("grandTotal")}</p>
            <p className="text-title text-primary tabular-nums">{ks(subtotal)}</p>
          </div>
          {submitError ? (
            <p role="alert" className="mt-5 rounded-brand border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {submitError}
            </p>
          ) : null}
          <Button type="submit" className="mt-6 w-full" arrow disabled={sending}>
            {sending ? t("placing") : t("placeOrder")}
          </Button>
        </div>
      </aside>
    </form>
  );
}

function OrderPlaced({ placed }: { placed: Placed }) {
  const t = useTranslations("Checkout");
  const transfer = placed.payment === "cod" ? null : shop.payments[placed.payment];

  return (
    <div className="mx-auto max-w-2xl rounded-brand border border-primary/40 bg-white p-8 sm:p-10">
      <span className="flex h-14 w-14 items-center justify-center rounded-brand bg-primary text-ink">
        <CheckIcon size={28} />
      </span>
      <p className="text-title mt-6 text-ink">{t("successTitle")}</p>
      <p className="text-body mt-3">{t("successBody")}</p>
      <div className="mt-8 inline-flex flex-col rounded-brand bg-ink px-5 py-4">
        <span className="text-eyebrow text-white/60">{t("orderNo")}</span>
        <span className="text-subtitle mt-1 text-primary tabular-nums">{placed.orderNo}</span>
      </div>

      {transfer ? (
        <div className="mt-8 rounded-brand border border-hairline bg-paper p-6">
          <p className="text-subtitle">{t("transferTitle", { method: t(`payment.${placed.payment}`) })}</p>
          <p className="text-body mt-2">
            {t("transferBody", { amount: formatKs(placed.amount), phone: company.phones[0] })}
          </p>
          <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-brand bg-white p-4">
              <dt className="text-eyebrow text-slate">{t("accountName")}</dt>
              <dd className="mt-1 font-semibold text-ink">{transfer.accountName}</dd>
            </div>
            <div className="rounded-brand bg-white p-4">
              <dt className="text-eyebrow text-slate">{t("accountNumber")}</dt>
              <dd className="mt-1 font-semibold text-ink tabular-nums">{transfer.accountNumber}</dd>
            </div>
          </dl>
        </div>
      ) : null}

      <Button href="/books" variant="secondary" className="mt-8" arrow>
        {t("keepShopping")}
      </Button>
    </div>
  );
}

function Panel({ step, title, children }: { step: string; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-brand border border-hairline bg-white p-6 sm:p-8">
      <h2 className="text-subtitle flex items-center gap-3">
        <span className="text-eyebrow flex h-9 w-9 items-center justify-center rounded-brand bg-primary text-ink">
          {step}
        </span>
        {title}
      </h2>
      <div className="mt-6 grid gap-5">{children}</div>
    </section>
  );
}

function ChoiceCard({
  name,
  value,
  label,
  hint,
  icon,
  checked,
  defaultChecked,
  onChange,
  stacked,
}: {
  name: string;
  value: string;
  label: string;
  hint: string;
  icon: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: () => void;
  /** Icon above the text, for narrow three-up cards. */
  stacked?: boolean;
}) {
  return (
    <label className={`group relative flex cursor-pointer gap-3 ${stacked ? "sm:flex-col" : "items-start"} rounded-brand border border-hairline bg-paper p-4 transition-[border-color,background-color,box-shadow] duration-300 ease-out hover:border-primary/60 has-checked:border-primary has-checked:bg-primary-soft has-focus-visible:ring-4 has-focus-visible:ring-primary/25`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-brand bg-white text-primary-ink transition-colors duration-300 ease-out peer-checked:bg-ink peer-checked:text-primary">
        {icon}
      </span>
      <span className="min-w-0 flex-1 pr-6 text-sm">
        <span className="block font-semibold text-ink">{label}</span>
        <span className="mt-0.5 block text-xs leading-5 text-slate">{hint}</span>
      </span>
      <span
        aria-hidden
        className="absolute top-3 right-3 flex h-5 w-5 scale-50 items-center justify-center rounded-full bg-ink text-primary opacity-0 transition-[opacity,transform] duration-200 ease-out peer-checked:scale-100 peer-checked:opacity-100"
      >
        <CheckIcon />
      </span>
    </label>
  );
}

function Glyph({ d }: { d: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

function TruckIcon() {
  return <Glyph d="M2.5 5.5h9v8h-9v-8ZM11.5 8.5h3l3 3v2h-6M5.5 16a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM14.5 16a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />;
}

function StoreIcon() {
  return <Glyph d="M3 8.5 4.5 4h11L17 8.5M3 8.5h14M3 8.5V16h14V8.5M8 16v-4h4v4" />;
}

function HomeIcon() {
  return <Glyph d="M3.5 9 10 3.5 16.5 9M5 8v8.5h10V8M8.5 16.5v-4h3v4" />;
}

function CashIcon() {
  return <Glyph d="M2.5 5.5h15v9h-15v-9ZM10 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4ZM5 8v4M15 8v4" />;
}

function WalletIcon() {
  return <Glyph d="M3 6.5A1.5 1.5 0 0 1 4.5 5H15v2.5M3 6.5v8A1.5 1.5 0 0 0 4.5 16h11a1.5 1.5 0 0 0 1.5-1.5v-7H4.5A1.5 1.5 0 0 1 3 6.5ZM13.5 11.5h.01" />;
}
