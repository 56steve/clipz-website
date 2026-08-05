export type ClassValue = string | number | false | null | undefined;

/** Minimal className joiner (no external dependency). */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
