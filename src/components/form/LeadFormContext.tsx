"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type Ctx = {
  product: string;
  setProduct: (id: string) => void;
  /** Bumped by «Купити» so the form knows to take focus after the scroll */
  focusRequest: number;
  requestForm: (productId?: string) => void;
};

const LeadFormContext = createContext<Ctx | null>(null);

export function LeadFormProvider({ anchor, children }: { anchor: string; children: ReactNode }) {
  const [product, setProduct] = useState("");
  const [focusRequest, setFocusRequest] = useState(0);

  const requestForm = useCallback(
    (productId?: string) => {
      if (productId) setProduct(productId);
      document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
      setFocusRequest((n) => n + 1);
    },
    [anchor],
  );

  const value = useMemo(() => ({ product, setProduct, focusRequest, requestForm }), [product, focusRequest, requestForm]);
  return <LeadFormContext.Provider value={value}>{children}</LeadFormContext.Provider>;
}

export function useLeadForm() {
  const ctx = useContext(LeadFormContext);
  if (!ctx) throw new Error("useLeadForm must be used inside LeadFormProvider");
  return ctx;
}
