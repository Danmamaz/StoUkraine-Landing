"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import type { LeadFormContent, Product } from "@/content/types";
import { buttonClass } from "@/components/ui/buttonStyles";
import { submitLead } from "@/lib/lead";
import { cn, formatPhone, phoneDigits } from "@/lib/utils";
import { useLeadForm } from "./LeadFormContext";

type Props = {
  content: LeadFormContent;
  products: Pick<Product, "id" | "name">[];
};

type Errors = Partial<Record<"firstName" | "lastName" | "phone" | "email", string>>;
type Status = "idle" | "sending" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const inputClass =
  "block w-full rounded-button border bg-sand px-4 text-[15px] text-ink placeholder:text-ink-muted/80 transition-colors focus:border-ink focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand";

function Field({
  id,
  label,
  required,
  optionalHint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optionalHint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[14px] font-semibold text-ink">
        {label}
        {required && <span className="text-danger"> *</span>}
        {!required && optionalHint && <span className="font-normal text-ink-muted"> {optionalHint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[13px] font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

/** First/last name*, phone* (+380 mask), e-mail, product, object type chips, notes. «Купити» preselects the product. */
export default function LeadForm({ content: c, products }: Props) {
  const { product, setProduct, focusRequest } = useLeadForm();
  const uid = useId();
  const ids = { firstName: `${uid}-first-name`, lastName: `${uid}-last-name`, phone: `${uid}-phone`, email: `${uid}-email`, product: `${uid}-product`, notes: `${uid}-notes` };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [objectTypes, setObjectTypes] = useState<string[]>([]);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const nameRef = useRef<HTMLInputElement>(null);

  // After «Купити» scrolls here, move focus to the first field without jumping the page
  useEffect(() => {
    if (!focusRequest) return;
    const t = setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 600);
    return () => clearTimeout(t);
  }, [focusRequest]);

  const validate = (): Errors => {
    const e: Errors = {};
    if (firstName.trim().length < 2) e.firstName = c.fields.firstName.error;
    if (lastName.trim().length < 2) e.lastName = c.fields.lastName.error;
    if (phoneDigits(phone).length !== 9) e.phone = c.fields.phone.error;
    if (email.trim() && !EMAIL_RE.test(email.trim())) e.email = c.fields.email.error;
    return e;
  };

  // Once the user tried to submit, errors update live as they fix the fields
  useEffect(() => {
    if (touched) setErrors(validate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, lastName, phone, email, touched]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const found = validate();
    setErrors(found);
    const firstInvalid = (["firstName", "lastName", "phone", "email"] as const).find((k) => found[k]);
    if (firstInvalid) {
      document.getElementById(ids[firstInvalid])?.focus();
      return;
    }
    setStatus("sending");
    try {
      const productName = products.find((p) => p.id === product)?.name;
      const res = await submitLead({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: `+380${phoneDigits(phone)}`,
        email: email.trim() || undefined,
        product: productName,
        objectTypes: objectTypes.length ? objectTypes : undefined,
        notes: notes.trim() || undefined,
        website,
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setFirstName("");
    setLastName("");
    setObjectTypes([]);
    setPhone("");
    setEmail("");
    setNotes("");
    setProduct("");
    setErrors({});
    setTouched(false);
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <div role="status" className="flex min-h-[420px] flex-col items-center justify-center text-center">
        <CheckCircle2 size={52} className="text-success" aria-hidden />
        <p className="mt-5 font-display text-[22px] font-extrabold text-ink">{c.success.title}</p>
        <p className="mt-2 max-w-sm text-ink-soft">{c.success.text}</p>
        <button type="button" onClick={reset} className={buttonClass("outline", "md", "mt-7")}>
          {c.success.again}
        </button>
      </div>
    );
  }

  const sending = status === "sending";
  const border = (key: keyof Errors) => (errors[key] ? "border-danger" : "border-line-strong/70");

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <p className="text-small text-ink-muted">{c.requiredHint}</p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={ids.firstName} label={c.fields.firstName.label} required error={errors.firstName}>
          <input
            ref={nameRef}
            id={ids.firstName}
            name="firstName"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? `${ids.firstName}-error` : undefined}
            className={cn(inputClass, "h-12", border("firstName"))}
          />
        </Field>

        <Field id={ids.lastName} label={c.fields.lastName.label} required error={errors.lastName}>
          <input
            id={ids.lastName}
            name="lastName"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? `${ids.lastName}-error` : undefined}
            className={cn(inputClass, "h-12", border("lastName"))}
          />
        </Field>
      </div>

      <Field id={ids.phone} label={c.fields.phone.label} required error={errors.phone}>
        <input
          id={ids.phone}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder={c.fields.phone.placeholder}
          value={phone}
          onFocus={() => !phone && setPhone("+380 ")}
          onBlur={() => phone.trim() === "+380" && setPhone("")}
          onChange={(e) => setPhone(formatPhone(e.target.value) || "+380 ")}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? `${ids.phone}-error` : undefined}
          className={cn(inputClass, "h-12 tabular-nums", border("phone"))}
        />
      </Field>

      <Field id={ids.email} label={c.fields.email.label} optionalHint={c.optionalHint} error={errors.email}>
        <input
          id={ids.email}
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${ids.email}-error` : undefined}
          className={cn(inputClass, "h-12", border("email"))}
        />
      </Field>

      <Field id={ids.product} label={c.fields.product.label} optionalHint={c.optionalHint}>
        <div className="relative">
          <select
            id={ids.product}
            name="product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className={cn(inputClass, "h-12 appearance-none pr-11 border-line-strong/70")}
          >
            <option value="">{c.fields.product.emptyOption}</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <ChevronDown size={18} aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft" />
        </div>
      </Field>

      <fieldset>
        <legend className="mb-2.5 block text-[14px] font-semibold text-ink">
          {c.fields.objectType.label} <span className="font-normal text-ink-muted">{c.optionalHint}</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {c.fields.objectType.options.map((option) => {
            const active = objectTypes.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => setObjectTypes((list) => (active ? list.filter((o) => o !== option) : [...list, option]))}
                aria-pressed={active}
                className={cn(
                  "min-h-10 rounded-chip border px-4 text-[13.5px] font-medium transition-colors duration-150",
                  active ? "border-ink bg-brand text-ink" : "border-line-strong bg-white text-ink-soft hover:border-ink hover:text-ink",
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
      </fieldset>

      <Field id={ids.notes} label={c.fields.notes.label} optionalHint={c.optionalHint}>
        <textarea
          id={ids.notes}
          name="notes"
          rows={4}
          placeholder={c.fields.notes.placeholder}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className={cn(inputClass, "resize-y py-3 border-line-strong/70")}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech, bots fill it */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-button border border-danger/30 bg-danger/5 px-4 py-3 text-[14px] text-danger">
          {c.errorText}
        </p>
      )}

      <button type="submit" disabled={sending} className={buttonClass("dark", "lg", "w-full")}>
        {sending && <Loader2 size={18} className="animate-spin" aria-hidden />}
        {sending ? c.sendingLabel : c.submitLabel}
      </button>
      <p className="text-[12.5px] leading-relaxed text-ink-muted">{c.privacyNote}</p>
    </form>
  );
}
