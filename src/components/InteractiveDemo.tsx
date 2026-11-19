"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "./motion/Reveal";
import { WordReveal } from "./motion/WordReveal";
import {
  Check,
  Code2,
  Link2,
  Lock,
  RefreshCw,
  Type,
} from "@/components/ui/icons";

/**
 * The stage is the real Clipz interface, built from the desktop app's own
 * source and served from /app-demo. Only the backend is replaced (see
 * public/app-demo/mock.js), so search, filters, keyboard use, pinning and the
 * rest behave exactly as they do in the app.
 */
const DEMO_SRC = "/app-demo/index.html";
/** Height of the demo window, in the app's own (unscaled) pixels. */
const DEMO_HEIGHT = 560;
/**
 * The desktop window is designed for a wide canvas. On narrow screens it is
 * laid out at this width and scaled down to fit, instead of being squeezed.
 */
const MIN_LOGICAL_WIDTH = 500;
const FULL_SCALE_FROM = 640;

type PresetCategory = "code" | "sensitive" | "link" | "text";

interface Preset {
  label: string;
  category: PresetCategory;
  content: string;
  sourceApp: string;
  secret?: string;
  Icon: typeof Code2;
}

const PRESETS: Preset[] = [
  {
    label: "Copy some code",
    category: "code",
    content: "const { data } = await supabase.from('clips').select('*');",
    sourceApp: "VS Code",
    Icon: Code2,
  },
  {
    label: "Copy a secret",
    category: "sensitive",
    content: "\u{1F512} Password Protected",
    sourceApp: "Stripe Dashboard",
    secret: "whsec_9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d",
    Icon: Lock,
  },
  {
    label: "Copy a link",
    category: "link",
    content: "https://github.com/56steve/clipz/releases",
    sourceApp: "Browser",
    Icon: Link2,
  },
  {
    label: "Copy some text",
    category: "text",
    content: "Review Q3 release notes & changelog before deploy.",
    sourceApp: "Notion",
    Icon: Type,
  },
];

export function InteractiveDemo() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flash = useCallback((message: string) => {
    setStatus(message);
    if (statusTimer.current) clearTimeout(statusTimer.current);
    statusTimer.current = setTimeout(() => setStatus(null), 2200);
  }, []);

  const post = useCallback((message: Record<string, unknown>) => {
    frameRef.current?.contentWindow?.postMessage(
      message,
      window.location.origin,
    );
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(([entry]) =>
      setStageWidth(entry.contentRect.width),
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  // The demo tells us when a visitor pastes a clip, so we can confirm it.
  useEffect(() => {
    const onMessage = (event: MessageEvent): void => {
      if (event.origin !== window.location.origin) return;
      if (event.source !== frameRef.current?.contentWindow) return;
      if (event.data?.type === "clipz:copied") flash("Copied");
    };
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      if (statusTimer.current) clearTimeout(statusTimer.current);
    };
  }, [flash]);

  const simulate = (preset: Preset): void => {
    post({
      type: "clipz:add",
      clip: {
        category: preset.category,
        content: preset.content,
        source_app: preset.sourceApp,
        secret: preset.secret,
      },
    });
    flash("Captured");
  };

  const logicalWidth =
    stageWidth >= FULL_SCALE_FROM ? stageWidth : MIN_LOGICAL_WIDTH;
  const scale = stageWidth > 0 ? Math.min(1, stageWidth / logicalWidth) : 1;

  const reset = (): void => {
    post({ type: "clipz:reset" });
    flash("Reset");
  };

  return (
    <section id="demo" className="section-pad border-t border-[var(--border)]">
      <div className="container-page">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
          <h2 className="text-[clamp(1.5rem,5vw,2.25rem)] font-light leading-[1.25] tracking-[-0.02em]">
            <WordReveal lines={["Try it right here."]} />
          </h2>

          <div className="flex min-h-10 items-center gap-3">
            {status && (
              <span
                role="status"
                className="flex items-center gap-1.5 text-[0.875rem] text-emerald"
              >
                <Check className="h-4 w-4" />
                {status}
              </span>
            )}
            <button
              onClick={reset}
              className="btn-depth-soft inline-flex min-h-10 cursor-pointer items-center gap-2 px-4 text-[0.875rem] font-medium"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PRESETS.map((preset) => (
            <button
              key={preset.category}
              onClick={() => simulate(preset)}
              className="btn-depth-soft flex min-h-12 cursor-pointer items-center justify-center gap-2 px-4 text-[0.875rem] font-medium"
            >
              <preset.Icon className="h-4 w-4 text-[var(--color-violet)]" />
              {preset.label}
            </button>
          ))}
        </div>

        <Reveal y={36}>
          <div
            ref={stageRef}
            className="overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[#101012]"
            style={{ height: DEMO_HEIGHT * scale }}
          >
            <iframe
              ref={frameRef}
              src={DEMO_SRC}
              title="Clipz, running live in your browser"
              loading="lazy"
              className="block border-0"
              style={{
                colorScheme: "normal",
                width: stageWidth > 0 ? logicalWidth : "100%",
                height: DEMO_HEIGHT,
                transform: scale < 1 ? `scale(${scale})` : undefined,
                transformOrigin: "top left",
              }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
