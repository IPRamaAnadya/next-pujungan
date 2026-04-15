/**
 * Normalises an Indonesian WhatsApp number to digits-only starting with `62`.
 *
 * Accepted input formats:
 *  - 08xxxxxxxxx   → 628xxxxxxxxx
 *  - 628xxxxxxxxx  → 628xxxxxxxxx  (no-op)
 *  - +628xxxxxxxxx → 628xxxxxxxxx
 *  - 8xxxxxxxxx    → 628xxxxxxxxx
 *  - Spaces, dashes, dots, parentheses are stripped before processing.
 *
 * Returns `null` when the result fails basic validation:
 *  - Must start with `62`
 *  - Total length must be between 10 and 15 digits (covers all Indonesian mobile/landline)
 */
export function normalizeWhatsappNumber(raw: string): string | null {
  // Strip everything that is not a digit
  const digits = raw.replace(/\D/g, "");

  let normalized: string;

  if (digits.startsWith("62")) {
    normalized = digits;
  } else if (digits.startsWith("0")) {
    normalized = "62" + digits.slice(1);
  } else {
    normalized = "62" + digits;
  }

  // Validate: must start with 62 followed by 8–13 more digits
  // Shortest valid: 62-8xx-xxx-xxx  = 12 digits
  // Longest valid:  62-xxx-xxxx-xxxx = 15 digits
  if (!/^62\d{8,13}$/.test(normalized)) {
    return null;
  }

  return normalized;
}
