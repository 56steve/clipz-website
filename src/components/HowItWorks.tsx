import Image from "next/image";
import { cn } from "@/lib/cn";
import { Bell, ScanText, Star } from "@/components/ui/icons";
import { IconTile, type TileTone } from "@/components/ui/IconTile";
import { Reveal } from "./motion/Reveal";
import { ScrollImage } from "./motion/ScrollImage";
import { WordReveal } from "./motion/WordReveal";

type Step = {
  title: string;
  body: string;
  image: string;
  alt: string;
  reverse?: boolean;
};

const STEPS: Step[] = [
  {
    title: "Finds anything instantly.",
    body: "Search your whole clipboard history as you type.",
    image: "/screenshots/search.png",
    alt: "Searching the Clipz drawer for the word clip",
  },
  {
    title: "Sorts everything for you.",
    body: "Text, code, links and images are filtered with one click.",
    image: "/screenshots/filters.png",
    alt: "The Clipz drawer filtered to code snippets",
    reverse: true,
  },
  {
    title: "Keeps secrets safe.",
    body: "Passwords are encrypted, hidden, and wiped from memory after 60 seconds.",
    image: "/screenshots/sensitive.png",
    alt: "Password clips shown masked in the Clipz drawer",
  },
];

const EXTRAS: { title: string; body: string; Icon: typeof Star; tone: TileTone }[] = [
  { title: "On-device OCR", body: "Search text inside screenshots.", Icon: ScanText, tone: "blue" },
  { title: "Timed reminders", body: "Bring a clip back when you need it.", Icon: Bell, tone: "orange" },
  { title: "Favorites and pins", body: "Keep your go-to snippets on top.", Icon: Star, tone: "pink" },
];

export function HowItWorks() {
  return (
    <section id="how" className="section-pad">
      <div className="container-page">
        <h2 className="mb-10 text-[clamp(1.5rem,5vw,2.25rem)] font-light leading-[1.25] tracking-[-0.02em] sm:mb-14">
          <WordReveal lines={["How Clipz works"]} />
        </h2>

        <div className="flex flex-col gap-14 sm:gap-20">
          {STEPS.map((s) => (
            <div
              key={s.title}
              className={cn(
                "grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 [&>*]:min-w-0",
                s.reverse && "lg:[&>*:first-child]:order-2"
              )}
            >
              <div>
                <h3 className="max-w-sm text-[clamp(1.5rem,5vw,2.25rem)] font-light leading-[1.2] tracking-[-0.02em]">
                  <WordReveal lines={[s.title]} />
                </h3>
                <Reveal delay={0.25} y={18}>
                  <p className="mt-4 max-w-sm text-[1.125rem] leading-[1.56] text-muted">
                    {s.body}
                  </p>
                </Reveal>
              </div>

              <ScrollImage>
                <Image
                  src={s.image}
                  alt={s.alt}
                  width={1440}
                  height={1000}
                  sizes="(min-width: 1024px) 540px, 100vw"
                  className="h-auto w-full rounded-2xl border border-[var(--border-strong)]"
                />
              </ScrollImage>
            </div>
          ))}
        </div>

        <ul className="mt-14 grid gap-8 border-t border-[var(--border)] pt-10 sm:mt-20 sm:grid-cols-3">
          {EXTRAS.map(({ title, body, Icon, tone }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.12}>
                <IconTile tone={tone}>
                  <Icon className="h-6 w-6" />
                </IconTile>
                <h3 className="mt-4 text-[1.125rem] font-medium">{title}</h3>
                <p className="mt-1.5 text-[1rem] leading-[1.5] text-muted">{body}</p>
              </Reveal>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
