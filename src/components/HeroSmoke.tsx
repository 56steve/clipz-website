"use client";

import { useEffect, useRef } from "react";

/** The smoke simulation runs at this fraction of the canvas CSS size. */
const RENDER_SCALE = 0.4;
/** Smoothing time constant of the cloud following the cursor, in seconds. */
const FOLLOW_SECONDS = 0.07;
/** Per-frame (at 60fps) fade of the smoke body and of its hot core while moving. */
const BODY_DECAY = 0.976;
const CORE_DECAY = 0.93;
/** Per-frame fade once the cursor has stopped: the smoke melts away over about 1.5 to 2s. */
const BODY_DECAY_RESTING = 0.983;
const CORE_DECAY_RESTING = 0.955;
/** The cursor counts as stopped after this long without a move event (seconds). */
const REST_AFTER_SECONDS = 0.05;
/** Seconds after the last movement before the loop stops completely. */
const STOP_AFTER_SECONDS = 3.6;

/** How many recent cloud positions colour the headline, and how far each glows (css px). */
const TINT_TRAIL = 7;
const TINT_RADIUS = 150;

interface Point {
  x: number;
  y: number;
}

const VERTEX_SHADER = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const NOISE = `
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.0, 31.0);
    a *= 0.5;
  }
  return v;
}`;

/**
 * Simulation step. The smoke lives in a texture: x = density, y = heat (the hot
 * core), z = density-weighted hue. Every frame it is swirled by noise, blurred a
 * little, faded, and the cursor's path since the last frame is added on top.
 */
const SIM_SHADER = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uPrev;
uniform vec2 uRes;
uniform vec2 uTexel;
uniform vec2 uFrom;
uniform vec2 uTo;
uniform float uStrength;
uniform float uHue;
uniform float uRadius;
uniform float uTime;
uniform float uBodyDecay;
uniform float uCoreDecay;
uniform float uStep;
uniform float uSwirl;
out vec4 outState;
${NOISE}
void main() {
  vec2 px = vUv * uRes;
  vec2 q = vUv * vec2(uRes.x / uRes.y, 1.0);

  // Swirl: noise bends where each bit of smoke came from.
  vec2 flow = vec2(
    fbm(q * 3.5 + vec2(0.0, uTime * 0.25)),
    fbm(q * 3.5 + vec2(5.2, 1.3) - vec2(uTime * 0.2, 0.0))
  ) - 0.5;
  vec2 uv = vUv - flow * 0.007 * uStep * uSwirl + vec2(0.0, 0.0005 * uStep * uSwirl);

  // Light diffusion keeps the cloud soft and stops it pixelating.
  vec4 c = texture(uPrev, uv) * 0.4
    + (texture(uPrev, uv + vec2(uTexel.x, 0.0))
     + texture(uPrev, uv - vec2(uTexel.x, 0.0))
     + texture(uPrev, uv + vec2(0.0, uTexel.y))
     + texture(uPrev, uv - vec2(0.0, uTexel.y))) * 0.15;

  c.xz *= uBodyDecay;
  c.y *= uCoreDecay;

  // Cursor path since the last frame, as a capsule so there are no gaps.
  vec2 pa = px - uFrom;
  vec2 ba = uTo - uFrom;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 0.0001), 0.0, 1.0);
  float d = length(pa - ba * h);
  float wisp = 0.5 + 0.9 * fbm(q * 8.0 + vec2(uTime * 0.6, -uTime * 0.4));
  float body = exp(-(d * d) / (uRadius * uRadius)) * uStrength * wisp;
  float core = exp(-(d * d) / (uRadius * uRadius * 0.16)) * uStrength;

  float addDensity = body * 0.2 * uStep;
  c.x += addDensity;
  c.y += core * 0.28 * uStep;
  c.z += uHue * addDensity;

  if (c.x < 0.0015) c = vec4(0.0);
  outState = c;
}`;

/** Draws the smoke texture: colour ramp, wispy filaments, soft tone-mapping. */
const DISPLAY_SHADER = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uState;
uniform vec2 uRes;
uniform float uTime;
out vec4 outColor;
${NOISE}
vec3 hsv2rgb(vec3 c) {
  vec3 p = abs(fract(c.xxx + vec3(0.0, 2.0 / 3.0, 1.0 / 3.0)) * 6.0 - 3.0);
  return c.z * mix(vec3(1.0), clamp(p - 1.0, 0.0, 1.0), c.y);
}
void main() {
  vec4 s = texture(uState, vUv);
  float density = s.x;
  if (density < 0.002) {
    outColor = vec4(0.0);
    return;
  }
  vec2 q = vUv * vec2(uRes.x / uRes.y, 1.0);
  float hue = s.z / density;

  float d = 1.0 - exp(-density * 1.5);
  float h = 1.0 - exp(-s.y * 1.2);

  // Ridged noise carves the body into filaments with dark gaps.
  float ridge = 1.0 - abs(2.0 * fbm(q * 7.0 + s.xy * 0.8 - vec2(0.0, uTime * 0.25)) - 1.0);
  float shaped = smoothstep(0.04, 0.85, d * (0.3 + 1.1 * pow(ridge, 2.2)));

  vec3 color = hsv2rgb(vec3(fract(hue), 0.9, 1.0)) * shaped * 0.78;
  color += vec3(1.0, 0.9, 0.8) * pow(h, 2.6) * shaped * 0.5;
  float alpha = clamp(shaped * 0.5 + h * shaped * 0.2, 0.0, 1.0) * 0.4;
  color += (hash(gl_FragCoord.xy + uTime) - 0.5) / 255.0; // dither
  outColor = vec4(color, alpha); // premultiplied: glows rather than covers
}`;

function compile(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("HeroSmoke shader error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function link(
  gl: WebGL2RenderingContext,
  vertex: WebGLShader,
  fragmentSource: string,
): WebGLProgram | null {
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!fragment || !program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn("HeroSmoke link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

interface Target {
  texture: WebGLTexture;
  framebuffer: WebGLFramebuffer;
}

/**
 * Cursor-following smoke for the hero. A fluid-style buffer: the cursor adds
 * smoke along its path, noise swirls it, and it fades. Movement speed sets the
 * brightness, so it blooms when you sweep and dims as you slow down, and the
 * moment the cursor stops the smoke dies away. It runs only while there is
 * smoke on screen, pauses off-screen, ignores touch, and does nothing without
 * WebGL2 float targets or for reduced-motion visitors.
 */
export function HeroSmoke() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) return;
    if (
      !gl.getExtension("EXT_color_buffer_float") &&
      !gl.getExtension("EXT_color_buffer_half_float")
    )
      return;

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    if (!vertex) return;
    const simProgram = link(gl, vertex, SIM_SHADER);
    const displayProgram = link(gl, vertex, DISPLAY_SHADER);
    gl.deleteShader(vertex);
    if (!simProgram || !displayProgram) return;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const bindGeometry = (program: WebGLProgram): void => {
      const location = gl.getAttribLocation(program, "aPos");
      gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
    };

    const sim = {
      prev: gl.getUniformLocation(simProgram, "uPrev"),
      res: gl.getUniformLocation(simProgram, "uRes"),
      texel: gl.getUniformLocation(simProgram, "uTexel"),
      from: gl.getUniformLocation(simProgram, "uFrom"),
      to: gl.getUniformLocation(simProgram, "uTo"),
      strength: gl.getUniformLocation(simProgram, "uStrength"),
      hue: gl.getUniformLocation(simProgram, "uHue"),
      radius: gl.getUniformLocation(simProgram, "uRadius"),
      time: gl.getUniformLocation(simProgram, "uTime"),
      bodyDecay: gl.getUniformLocation(simProgram, "uBodyDecay"),
      coreDecay: gl.getUniformLocation(simProgram, "uCoreDecay"),
      step: gl.getUniformLocation(simProgram, "uStep"),
      swirl: gl.getUniformLocation(simProgram, "uSwirl"),
    };
    const display = {
      state: gl.getUniformLocation(displayProgram, "uState"),
      res: gl.getUniformLocation(displayProgram, "uRes"),
      time: gl.getUniformLocation(displayProgram, "uTime"),
    };

    let width = 1;
    let height = 1;
    let targets: Target[] = [];
    let current = 0;

    const freeTargets = (): void => {
      for (const target of targets) {
        gl.deleteTexture(target.texture);
        gl.deleteFramebuffer(target.framebuffer);
      }
      targets = [];
    };

    const makeTargets = (): boolean => {
      freeTargets();
      for (let i = 0; i < 2; i += 1) {
        const texture = gl.createTexture();
        const framebuffer = gl.createFramebuffer();
        if (!texture || !framebuffer) return false;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA16F,
          width,
          height,
          0,
          gl.RGBA,
          gl.HALF_FLOAT,
          null,
        );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.framebufferTexture2D(
          gl.FRAMEBUFFER,
          gl.COLOR_ATTACHMENT0,
          gl.TEXTURE_2D,
          texture,
          0,
        );
        if (
          gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE
        )
          return false;
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        targets.push({ texture, framebuffer });
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      current = 0;
      return true;
    };

    const clearAll = (): void => {
      gl.clearColor(0, 0, 0, 0);
      for (const target of targets) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, width, height);
      gl.clear(gl.COLOR_BUFFER_BIT);
    };

    const pointer = { x: 0, y: 0 }; // where the cursor is (render px, GL origin bottom-left)
    const smooth = { x: 0, y: 0 }; // where the cloud is
    let strength = 0;
    let travelled = 0;
    let frame = 0;
    let running = false;
    let enabled = true;
    let visible = true;
    let lastMove = -Infinity;
    let lastTick = 0;

    // Colour layer over the headline letters, driven by the same smoke state.
    const tintElement =
      document.querySelector<HTMLElement>("[data-smoke-tint]");
    const trail: Point[] = []; // recent cloud positions, css px relative to the canvas
    let tint = 0;

    const clearTint = (): void => {
      trail.length = 0;
      tint = 0;
      if (tintElement) tintElement.style.backgroundImage = "";
    };

    /**
     * Paints the colour the smoke is carrying onto the letters it passes over.
     * The layer is a copy of the headline whose text is a window onto a few
     * soft gradients placed along the cloud's recent path, in the cloud's hue.
     */
    const paintTint = (
      dt: number,
      step: number,
      resting: boolean,
      hueValue: number,
    ): void => {
      if (!tintElement) return;
      if (resting) {
        tint *= Math.pow(BODY_DECAY_RESTING, step); // melts at the same pace as the smoke
      } else {
        tint +=
          (Math.min(1, strength / 0.55) - tint) * (1 - Math.exp(-dt / 0.08));
        const x = smooth.x / RENDER_SCALE;
        const y = (height - smooth.y) / RENDER_SCALE;
        const latest = trail[0];
        if (!latest || Math.hypot(x - latest.x, y - latest.y) > 14) {
          trail.unshift({ x, y });
          if (trail.length > TINT_TRAIL) trail.pop();
        }
      }

      if (tint < 0.02 || trail.length === 0) {
        tintElement.style.backgroundImage = "";
        return;
      }

      const canvasRect = canvas.getBoundingClientRect();
      const textRect = tintElement.getBoundingClientRect();
      const offsetX = canvasRect.left - textRect.left;
      const offsetY = canvasRect.top - textRect.top;
      const degrees = (((hueValue * 360) % 360) + 360) % 360;

      const layers = trail.map((point, i) => {
        const alpha = tint * 0.95 * Math.pow(0.8, i);
        const radius = TINT_RADIUS - i * 9;
        const x = (point.x + offsetX).toFixed(1);
        const y = (point.y + offsetY).toFixed(1);
        return (
          `radial-gradient(circle ${radius}px at ${x}px ${y}px, ` +
          `hsla(${degrees.toFixed(0)}, 100%, 60%, ${alpha.toFixed(3)}) 0%, ` +
          `hsla(${(degrees + 18).toFixed(0)}, 100%, 66%, ${(alpha * 0.5).toFixed(3)}) 50%, ` +
          `hsla(${degrees.toFixed(0)}, 100%, 60%, 0) 100%)`
        );
      });

      // A small hot core at the head of the cloud, like the smoke's own.
      const head = trail[0];
      const hx = (head.x + offsetX).toFixed(1);
      const hy = (head.y + offsetY).toFixed(1);
      layers.unshift(
        `radial-gradient(circle 55px at ${hx}px ${hy}px, ` +
          `hsla(${((degrees + 30) % 360).toFixed(0)}, 90%, 86%, ${(tint * 0.8).toFixed(3)}) 0%, ` +
          `hsla(${degrees.toFixed(0)}, 100%, 70%, 0) 100%)`,
      );
      tintElement.style.backgroundImage = layers.join(",");
    };

    function stop(): void {
      enabled = false;
      running = false;
      cancelAnimationFrame(frame);
    }

    const resize = (): void => {
      width = Math.max(1, Math.floor(canvas.clientWidth * RENDER_SCALE));
      height = Math.max(1, Math.floor(canvas.clientHeight * RENDER_SCALE));
      canvas.width = width;
      canvas.height = height;
      if (!makeTargets()) {
        console.warn("HeroSmoke: float render targets are not supported here.");
        stop();
      }
    };

    const onPointerMove = (event: PointerEvent): void => {
      if (!enabled || event.pointerType === "touch") return;
      const rect = canvas.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      if (!inside) return;

      const now = performance.now();
      pointer.x = (event.clientX - rect.left) * RENDER_SCALE;
      pointer.y = height - (event.clientY - rect.top) * RENDER_SCALE;
      if ((now - lastMove) / 1000 > 0.3) {
        // Starting from rest: begin at the cursor instead of sweeping in from afar.
        smooth.x = pointer.x;
        smooth.y = pointer.y;
        trail.length = 0;
      }
      lastMove = now;
      start();
    };

    const tick = (now: number): void => {
      frame = requestAnimationFrame(tick);
      if (!visible || document.visibilityState === "hidden") {
        lastTick = now;
        return;
      }

      const dt = Math.min(0.05, Math.max(0.001, (now - lastTick) / 1000));
      lastTick = now;
      const step = dt * 60; // 1 at 60fps, so the look does not depend on frame rate
      const sinceMove = (now - lastMove) / 1000;
      const resting = sinceMove > REST_AFTER_SECONDS;

      // Frame-rate independent easing toward the cursor.
      const follow = 1 - Math.exp(-dt / FOLLOW_SECONDS);
      const fromX = smooth.x;
      const fromY = smooth.y;
      smooth.x += (pointer.x - smooth.x) * follow;
      smooth.y += (pointer.y - smooth.y) * follow;

      // Speed sets brightness: sweep fast and it blooms, slow down and it dims.
      // A stopped cursor adds nothing at all.
      const distance = Math.hypot(smooth.x - fromX, smooth.y - fromY);
      const speed = distance / dt;
      const wanted = resting
        ? 0
        : Math.min(1, Math.max(0, (speed - 25) / 420)) * 0.9;
      strength +=
        (wanted - strength) * (1 - Math.exp(-dt / (resting ? 0.03 : 0.06)));
      travelled += distance;

      // Orange -> red -> magenta -> violet, drifting with time and distance.
      const phase = now * 0.00012 + travelled * 0.0011;
      const t = 0.5 + 0.5 * Math.sin(phase * Math.PI * 2);
      const hue = 0.08 - t * 0.3; // continuous range, so averaging never wraps
      paintTint(dt, step, resting, hue);

      // Once the cursor rests the smoke melts away gently, drifting a little as it goes.
      const bodyDecay = resting ? BODY_DECAY_RESTING : BODY_DECAY;
      const coreDecay = resting ? CORE_DECAY_RESTING : CORE_DECAY;

      const target = targets[1 - current];
      gl.useProgram(simProgram);
      bindGeometry(simProgram);
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer);
      gl.viewport(0, 0, width, height);
      gl.disable(gl.BLEND);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, targets[current].texture);
      gl.uniform1i(sim.prev, 0);
      gl.uniform2f(sim.res, width, height);
      gl.uniform2f(sim.texel, 1 / width, 1 / height);
      gl.uniform2f(sim.from, fromX, fromY);
      gl.uniform2f(sim.to, smooth.x, smooth.y);
      gl.uniform1f(sim.strength, strength);
      gl.uniform1f(sim.hue, hue);
      gl.uniform1f(sim.radius, Math.max(width, height) * 0.04);
      gl.uniform1f(sim.time, now * 0.001);
      gl.uniform1f(sim.bodyDecay, Math.pow(bodyDecay, step));
      gl.uniform1f(sim.coreDecay, Math.pow(coreDecay, step));
      gl.uniform1f(sim.step, step);
      gl.uniform1f(sim.swirl, resting ? 0.6 : 1);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      current = 1 - current;

      gl.useProgram(displayProgram);
      bindGeometry(displayProgram);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, width, height);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.bindTexture(gl.TEXTURE_2D, targets[current].texture);
      gl.uniform1i(display.state, 0);
      gl.uniform2f(display.res, width, height);
      gl.uniform1f(display.time, now * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // The smoke has gone: stop the loop until the pointer moves again.
      if (sinceMove > STOP_AFTER_SECONDS) {
        clearAll();
        clearTint();
        strength = 0;
        cancelAnimationFrame(frame);
        running = false;
      }
    };

    function start(): void {
      if (running || !enabled) return;
      running = true;
      lastTick = performance.now();
      frame = requestAnimationFrame(tick);
    }

    const onContextLost = (event: Event): void => {
      event.preventDefault();
      stop();
    };

    const intersection = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    intersection.observe(canvas);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    canvas.addEventListener("webglcontextlost", onContextLost);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      stop();
      clearTint();
      window.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      intersection.disconnect();
      resizeObserver.disconnect();
      freeTargets();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(simProgram);
      gl.deleteProgram(displayProgram);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
