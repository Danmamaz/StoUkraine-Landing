"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import type { SiteSettings } from "@/content/types";
import { MESSENGER_COLORS, MESSENGER_ICONS } from "@/components/ui/BrandIcons";

type Props = {
  site: Pick<SiteSettings, "messengerWidget" | "messengers" | "labels">;
};

/**
 * Pulsing round button in the bottom-right corner (Fasadu pattern). Opens a
 * panel with Telegram / WhatsApp / Viber only - the phone lives in the header.
 * Closes with the button, ×, Esc or a click outside.
 */
export default function MessengerWidget({ site }: Props) {
  const { messengerWidget: w } = site;
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="fixed bottom-4 right-4 z-[60] flex flex-col items-end sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label={w.title}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            style={{ transformOrigin: "bottom right" }}
            className="relative mb-3 w-[min(320px,calc(100vw-2rem))] rounded-card bg-white p-5 shadow-popup ring-1 ring-line"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={w.closeLabel}
              className="absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-sand hover:text-ink"
            >
              <X size={18} aria-hidden />
            </button>
            <p className="pr-8 font-display text-[18px] font-extrabold text-ink">{w.title}</p>
            <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">{w.text}</p>
            <ul className="mt-4 grid gap-2">
              {site.messengers.map((m) => {
                const Icon = MESSENGER_ICONS[m.kind];
                return (
                  <li key={m.kind}>
                    <a
                      href={m.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ backgroundColor: MESSENGER_COLORS[m.kind] }}
                      className="flex min-h-12 items-center gap-3 rounded-button px-4 text-[15px] font-semibold text-white transition-[filter] hover:brightness-110"
                    >
                      <Icon size={20} />
                      {site.labels.writeIn} {m.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? w.closeLabel : w.openLabel}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand text-ink shadow-popup ring-1 ring-ink/10 transition-colors duration-200 hover:bg-brand-hover"
      >
        {!open && !reduce && <span aria-hidden className="absolute inset-0 animate-soft-ping rounded-full bg-brand" />}
        <span className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "open"}
              initial={reduce ? false : { rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex"
            >
              {open ? <X size={24} aria-hidden /> : <MessageCircle size={26} aria-hidden />}
            </motion.span>
          </AnimatePresence>
        </span>
      </button>
    </div>
  );
}
