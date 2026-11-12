"use client";

import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ImageAsset, LightboxLabels } from "@/content/types";
import Img from "./Img";

type Props = {
  images: ImageAsset[];
  /** Index to show; null = closed */
  index: number | null;
  onIndexChange: (i: number | null) => void;
  labels: LightboxLabels;
  /** Shown above the photo, e.g. the project name */
  title?: string;
};

/**
 * Centered full-screen viewer: Esc / × / backdrop close, ←/→ and swipe
 * navigate, focus is trapped inside and returned to the trigger on close.
 */
export default function Lightbox({ images, index, onIndexChange, labels, title }: Props) {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const count = images.length;
  const isOpen = index !== null;

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => onIndexChange(null), [onIndexChange]);
  const prev = useCallback(() => index !== null && onIndexChange((index - 1 + count) % count), [index, count, onIndexChange]);
  const next = useCallback(() => index !== null && onIndexChange((index + 1) % count), [index, count, onIndexChange]);

  useEffect(() => {
    if (!isOpen) return;
    const trigger = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      trigger?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, prev, next]);

  if (!mounted || index === null || !images[index]) return null;
  const current = images[index];

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta > 0) prev();
    else next();
  };

  const navBtn =
    "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand hover:text-ink sm:h-12 sm:w-12";

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={title ?? current.alt}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-deep/95"
      onClick={close}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute left-4 right-16 top-4 flex items-baseline gap-3 text-white sm:left-6 sm:top-6">
        {title && <p className="truncate font-display text-[15px] font-bold">{title}</p>}
        <p className="shrink-0 text-[13px] text-white/60" aria-live="polite">
          {index + 1} / {count}
        </p>
      </div>

      <button
        ref={closeRef}
        type="button"
        onClick={close}
        aria-label={labels.close}
        className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand hover:text-ink sm:right-5 sm:top-5"
      >
        <X size={22} aria-hidden />
      </button>

      {count > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          aria-label={labels.prev}
          className={`${navBtn} left-2 sm:left-5`}
        >
          <ChevronLeft size={24} aria-hidden />
        </button>
      )}

      <figure className="relative mx-2 h-[72vh] w-full max-w-5xl sm:mx-20" onClick={(e) => e.stopPropagation()}>
        <Img src={current.src} alt={current.alt} fill sizes="(max-width: 1100px) 100vw, 1024px" className="object-contain" priority />
        <figcaption className="absolute -bottom-10 left-0 right-0 line-clamp-2 text-center text-[13px] text-white/70">
          {current.alt}
        </figcaption>
      </figure>

      {count > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label={labels.next}
          className={`${navBtn} right-2 sm:right-5`}
        >
          <ChevronRight size={24} aria-hidden />
        </button>
      )}
    </div>,
    document.body,
  );
}
