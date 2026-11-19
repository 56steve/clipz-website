import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { IconTile, type TileTone } from "@/components/ui/IconTile";
import { Github, Sparkles, Star } from "@/components/ui/icons";
import { BUG_REPORT_URL, FEATURE_REQUEST_URL, STORE_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Send feedback",
  description:
    "Report a bug, suggest a feature or rate Clipz. Clipz is built in the open, and what you ask for shapes what comes next.",
  alternates: { canonical: "/feedback" },
};

const OPTIONS: {
  title: string;
  body: string;
  action: string;
  href: string;
  tone: TileTone;
  Icon: typeof Github;
}[] = [
  {
    title: "Report a bug",
    body: "Something broke or behaved oddly? Tell me what happened and on which system.",
    action: "Open a bug report",
    href: BUG_REPORT_URL,
    tone: "graphite",
    Icon: Github,
  },
  {
    title: "Request a feature",
    body: "Missing something you reach for every day? Describe it and I'll consider it.",
    action: "Suggest a feature",
    href: FEATURE_REQUEST_URL,
    tone: "violet",
    Icon: Sparkles,
  },
  {
    title: "Rate Clipz",
    body: "If Clipz saves you time, a short honest review helps other people find it.",
    action: "Rate on Microsoft Store",
    href: STORE_URL,
    tone: "orange",
    Icon: Star,
  },
];

export default function FeedbackPage() {
  return (
    <>
      <Navbar />
      <main className="container-page pb-12 pt-36 sm:pb-14 sm:pt-44">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-[clamp(2.19rem,7vw,3.25rem)] font-light leading-[1.1] tracking-[-0.03em]">
            Tell me what to build next.
          </h1>
          <p className="mt-5 max-w-xl text-[1.125rem] leading-[1.56] text-muted">
            Clipz is built in the open. Bugs, ideas and small annoyances all
            shape what comes next.
          </p>

          <ul className="mt-12 grid gap-8 sm:grid-cols-3">
            {OPTIONS.map(({ title, body, action, href, tone, Icon }) => (
              <li key={title} className="flex flex-col">
                <IconTile tone={tone}>
                  <Icon className="h-6 w-6" />
                </IconTile>
                <h2 className="mt-4 text-[1.125rem] font-medium">{title}</h2>
                <p className="mt-1.5 flex-1 text-[1rem] leading-[1.5] text-muted">
                  {body}
                </p>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-depth-soft mt-5 inline-flex min-h-11 items-center justify-center px-5 text-[0.875rem] font-medium"
                >
                  {action}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
