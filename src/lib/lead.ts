export type LeadPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  product?: string;
  objectTypes?: string[];
  notes?: string;
  /** Honeypot - real people leave it empty */
  website?: string;
};

/**
 * Part 1 (layout on test data): no e-mail sending yet, the request is
 * simulated so every form state can be reviewed.
 * TODO(part 2): POST to `${basePath}/api/lead` (Resend + rate limit).
 */
export async function submitLead(payload: LeadPayload): Promise<{ ok: boolean }> {
  if (payload.website) return { ok: true };
  await new Promise((r) => setTimeout(r, 700));
  if (process.env.NODE_ENV !== "production") console.info("[lead] simulated submit", payload);
  return { ok: true };
}
