import Image from "next/image";

const SHOTS: { src: string; title: string; caption: string }[] = [
  {
    src: "/screenshots/drawer.png",
    title: "Your history, one hover away",
    caption: "Every copy is captured and listed with its source app and time.",
  },
  {
    src: "/screenshots/search.png",
    title: "Instant full-text search",
    caption: "Type a few letters and the list narrows as you go.",
  },
  {
    src: "/screenshots/filters.png",
    title: "Sorted automatically",
    caption: "Text, code, links and images are filtered with one click.",
  },
  {
    src: "/screenshots/sensitive.png",
    title: "Secrets stay masked",
    caption: "Passwords and keys are encrypted and hidden until you reveal them.",
  },
];

export function Screenshots() {
  return (
    <section
      id="screenshots"
      className="border-t border-[var(--border)] section-pad"
    >
      <div className="container-page">
        <div className="mb-12 flex items-baseline justify-between gap-6 border-b border-[var(--border)] pb-6">
          <h2 className="text-[clamp(1.5rem,5vw,2.25rem)] font-semibold leading-[1.25] tracking-[-0.02em]">
            See it in action
          </h2>
          <span className="font-mono text-[0.78rem] uppercase tracking-[0.18em] text-faint">
            Sample data
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {SHOTS.map((shot) => (
            <figure key={shot.src} className="min-w-0">
              <div className="overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[#0d0f17]">
                <Image
                  src={shot.src}
                  alt={`${shot.title}: Clipz notch drawer`}
                  width={1920}
                  height={1080}
                  sizes="(min-width: 1024px) 540px, (min-width: 768px) 45vw, 100vw"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-4">
                <h3 className="text-[1rem] font-semibold text-text">{shot.title}</h3>
                <p className="mt-1 text-[0.9rem] leading-relaxed text-muted">
                  {shot.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
