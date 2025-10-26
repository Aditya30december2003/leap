"use client";
import { useEffect, useRef } from "react";

export default function MorphToAI() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const box = boxRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;

    // --- Tuned for calm, smooth motion ---
    const PIXEL = 5;             // bigger voxels = clearer shape
    const GAP = 8;               // fewer particles, more minimal
    const EASE = 0.025;          // slower approach (smooth)
    const SWIRL = 0.03;          // gentler ambient drift
    const DAMP = 0.9;            // stronger damping for silkier motion
    const LOOP_MS = 7000;        // longer cycle
    const FORM_HOLD_MS = 2600;   // hold "AI" longer
    const SCATTER_HOLD_MS = 1600;
    const SHOW_CHAR_ALPHA = 0.35;// softer glyph overlay
    // -------------------------------------

    const setSize = () => {
      canvas.width = Math.max(320, box.clientWidth);
      canvas.height = Math.max(280, box.clientHeight);
    };
    setSize();
    const onResize = () => {
      setSize();
      buildTargets();
    };
    window.addEventListener("resize", onResize);

    // Use only the letter "P"
    const CHAR_POOL = ["P"];

    type P = {
      x: number; y: number; z: number;
      tx: number; ty: number; tz: number;
      vx: number; vy: number;
      char: string;
    };
    const particles: P[] = [];
    let targets: { x: number; y: number }[] = [];

    // Offscreen canvas for sampling "AI"
    const off = document.createElement("canvas");
    const offCtx = off.getContext("2d")!;

    function buildTargets() {
      const W = canvas.width;
      const H = canvas.height;
      off.width = W;
      off.height = H;
      offCtx.clearRect(0, 0, W, H);

      const base = Math.min(W, H);
      const fontSize = Math.floor(base * 0.42);
      offCtx.fillStyle = "#fff";
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.font = `900 ${fontSize}px "Press Start 2P", ui-monospace, monospace`;
      offCtx.fillText("AI", W * 0.5, H * 0.52);

      const img = offCtx.getImageData(0, 0, W, H).data;
      const pts: { x: number; y: number }[] = [];
      for (let y = 0; y < H; y += GAP) {
        for (let x = 0; x < W; x += GAP) {
          const a = img[(y * W + x) * 4 + 3];
          if (a > 10) pts.push({ x, y });
        }
      }
      targets = pts;

      // match pool size
      if (particles.length < targets.length) {
        const need = targets.length - particles.length;
        for (let i = 0; i < need; i++) particles.push(spawn(W, H));
      } else particles.length = targets.length;

      // assign targets
      for (let i = 0; i < particles.length; i++) {
        particles[i].tx = targets[i].x;
        particles[i].ty = targets[i].y;
        particles[i].tz = Math.random() * 16 - 8;
      }
    }

    function spawn(W: number, H: number): P {
      return {
        x: W * (0.25 + Math.random() * 0.5),
        y: H * (0.25 + Math.random() * 0.5),
        z: Math.random() * 16 - 8,
        tx: Math.random() * W,
        ty: Math.random() * H,
        tz: Math.random() * 16 - 8,
        vx: 0, vy: 0,
        char: CHAR_POOL[0], // always "P"
      };
    }

    buildTargets();

    let mode: "form" | "scatter" = "form";
    let lastSwitch = performance.now();
    let modeHold = FORM_HOLD_MS;

    function maybeSwitch(now: number) {
      if (now - lastSwitch < modeHold) return;
      lastSwitch = now;
      if (mode === "form") {
        mode = "scatter";
        modeHold = SCATTER_HOLD_MS;
        for (const p of particles) {
          p.tx = canvas.width * (0.25 + Math.random() * 0.5);
          p.ty = canvas.height * (0.25 + Math.random() * 0.5);
        }
      } else {
        mode = "form";
        modeHold = LOOP_MS - SCATTER_HOLD_MS;
        for (let i = 0; i < particles.length; i++) {
          particles[i].tx = targets[i].x;
          particles[i].ty = targets[i].y;
        }
      }
    }

    function draw(now: number) {
      maybeSwitch(now);

      const W = canvas.width, H = canvas.height;
      // keep canvas transparent so it blends with the section bg
      ctx.clearRect(0, 0, W, H);

      // very subtle glow (barely visible, avoids left/right seam)
      const g = ctx.createRadialGradient(W*0.45, H*0.55, 10, W*0.5, H*0.5, Math.max(W,H)*0.9);
      g.addColorStop(0, "rgba(168,85,247,0.06)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      ctx.shadowColor = "rgba(168,85,247,0.45)";
      ctx.shadowBlur = 8;

      for (const p of particles) {
        // gentle swirl + eased approach with damping
        const s = Math.sin((p.x + p.y) * 0.004 + now * 0.0005) * SWIRL;
        p.vx = (p.vx + (p.tx - p.x) * EASE + s) * DAMP;
        p.vy = (p.vy + (p.ty - p.y) * EASE - s) * DAMP;
        p.x += p.vx;
        p.y += p.vy;

        const size = PIXEL + (p.tz / 16) * 1.1;
        ctx.fillStyle = "hsl(268, 85%, 72%)";
        ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);

        // faint "P" overlay for the voxel
        ctx.globalAlpha = SHOW_CHAR_ALPHA;
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.font = "10px ui-monospace, monospace";
        ctx.fillText(p.char, p.x - 3, p.y + 3);
        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={boxRef} className="w-full h-[360px] sm:h-[420px] lg:h-[520px] relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none"
        style={{ imageRendering: "pixelated" }}
      />
      {/* keep or remove this blur; it’s very faint */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl blur-3xl bg-purple-500/5" />
    </div>
  );
}
