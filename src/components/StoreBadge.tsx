import { STORE_URL } from "@/lib/links";

/**
 * Microsoft's official "Get it from Microsoft" badge. The web component is
 * registered by the script loaded in the root layout; until it is defined (or
 * if the script is blocked) a plain link to the Store page is shown instead.
 */
export function StoreBadge({ className }: { className?: string }) {
  return (
    <div className={`store-badge ${className ?? ""}`.trim()}>
      <ms-store-badge
        productid="9n02k65s7rmw"
        productname="Clipz"
        window-mode="direct"
        theme="auto"
        size="large"
        language="en-us"
        animation="on"
      />
      <a
        href={STORE_URL}
        target="_blank"
        rel="noreferrer"
        className="store-badge-fallback inline-flex items-center rounded-full bg-[var(--color-violet-deep)] px-6 py-3 text-[0.875rem] font-medium text-white transition-colors hover:bg-[var(--color-violet)]"
      >
        Get it from Microsoft Store
      </a>
    </div>
  );
}
