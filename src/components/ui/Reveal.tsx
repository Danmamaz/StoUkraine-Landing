"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  /** Vertical offset in px the element slides from */
  y?: number;
  className?: string;
  as?: "div" | "li";
};

/** Fades content in when it scrolls into view (same feel as StoCretec). */
export default function Reveal({ children, delay = 0, y = 24, className, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Cmp = as === "li" ? motion.li : motion.div;
  return (
    <Cmp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </Cmp>
  );
}
