"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

interface Bolt {
  path: Point[];
  branches: Point[][];
  bornAt: number;
  lifeMs: number;
}

/** Brand violet (#7c86ff) as an rgb triplet for canvas alpha blending. */
const BOLT_RGB = "124, 134, 255";
const MIN_GAP_MS = 2600;
const MAX_GAP_MS = 6200;

/** Recursive midpoint displacement: turns a straight segment into a jagged bolt. */
function jag(a: Point, b: Point, spread: number, depth: number): Point[] {
  if (depth === 0) return [a, b];
  const mid: Point = {
    x: (a.x + b.x) / 2 + (Math.random() - 0.5) * spread,
    y: (a.y + b.y) / 2 + (Math.random() - 0.5) * spread * 0.35,
  };
  const left = jag(a, mid, spread / 2, depth - 1);
  const right = jag(mid, b, spread / 2, depth - 1);
  return [...left.slice(0, -1), ...right];
}

function buildBolt(width: number, height: number, now: number): Bolt {
  const start: Point = {
    x: width * (0.18 + Math.random() * 0.64),
    y: -10,
  };
  const end: Point = {
    x: start.x + (Math.random() - 0.5) * width * 0.22,
    y: height * (0.42 + Math.random() * 0.22),
  };
  const path = jag(start, end, width * 0.12, 6);

  const branches: Point[][] = [];
  const branchCount = 1 + Math.floor(Math.random() * 2);
  for (let i = 0; i < branchCount; i += 1) {
    const origin = path[Math.floor(path.length * (0.3 + Math.random() * 0.4))];
    const tip: Point = {
      x: origin.x + (Math.random() - 0.5) * width * 0.18,
      y: origin.y + height * (0.12 + Math.random() * 0.16),
    };
    branches.push(jag(origin, tip, width * 0.05, 4));
  }

  return { path, branches, bornAt: now, lifeMs: 650 + Math.random() * 350 };
}

function strokePath(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  lineWidth: number,
  alpha: number
): void {
  if (points.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.strokeStyle = `rgba(${BOLT_RGB}, ${alpha})`;
  ctx.shadowColor = `rgba(${BOLT_RGB}, ${alpha})`;
  ctx.shadowBlur = 14;
  ctx.lineWidth = lineWidth;
  ctx.lineJoin = "round";
  ctx.stroke();
}

/**
 * Decorative, low-cost lightning behind the hero. Draws a faint bolt every few
 * seconds, pauses while off-screen or in a background tab, and renders nothing
 * for visitors who prefer reduced motion.
 */
export function HeroBolt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let width = 0;
    let height = 0;
    let visible = true;
    let frame = 0;
    let bolt: Bolt | null = null;
    let nextAt = performance.now() + 900;

    const resize = (): void => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const tick = (now: number): void => {
      frame = requestAnimationFrame(tick);
      if (!visible || document.visibilityState === "hidden") return;

      ctx.clearRect(0, 0, width, height);

      if (!bolt && now >= nextAt) {
        bolt = buildBolt(width, height, now);
      }

      if (bolt) {
        const age = (now - bolt.bornAt) / bolt.lifeMs;
        if (age >= 1) {
          bolt = null;
          nextAt = now + MIN_GAP_MS + Math.random() * (MAX_GAP_MS - MIN_GAP_MS);
          return;
        }
        // Sharp flash, quick flicker, then fade.
        const flicker = age < 0.35 ? 0.6 + Math.random() * 0.4 : 1;
        const alpha = Math.max(0, (1 - age) ** 2) * 0.55 * flicker;
        for (const branch of bolt.branches) {
          strokePath(ctx, branch, 0.8, alpha * 0.6);
        }
        strokePath(ctx, bolt.path, 1.4, alpha);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full [mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)]"
    />
  );
}
