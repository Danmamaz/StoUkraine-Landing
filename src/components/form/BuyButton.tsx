"use client";

import { ShoppingBag } from "lucide-react";
import { buttonClass } from "@/components/ui/buttonStyles";
import { useLeadForm } from "./LeadFormContext";

/** «Купити»: no cart - scrolls to the lead form with this product preselected */
export default function BuyButton({ productId, label, className }: { productId: string; label: string; className?: string }) {
  const { requestForm } = useLeadForm();
  return (
    <button type="button" onClick={() => requestForm(productId)} className={buttonClass("primary", "lg", className)}>
      <ShoppingBag size={18} aria-hidden />
      {label}
    </button>
  );
}
