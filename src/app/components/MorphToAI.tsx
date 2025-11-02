"use client";
import { useEffect, useRef } from "react";

export default function BackgroundNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    // ---- Tunables (slower + purple) ----
    const NODE_COLOR = "rgba(168,85,247,1)";            // purple-500
    const LINE_COLOR = "rgba(168,85,247,";              // opacity appended
    const GLOW_COLOR = "rgba(168,85,247,0.28)";
    const NODE_MIN = 2.2;
    const NODE_MAX = 3.6;
    const SPEED_MIN = 0.035;   // ↓ slower
    const SPEED_MAX = 0.12;    // ↓ slower
    const MAX_LINK_DIST = 150;
    const DENSITY = 16000;     // ↑ fewer nodes than before (perf)
    const HIGHLIGHT_EVERY = 10;
    // ------------------------------------

    type Node = { x:number; y:number; vx:number; vy:number; r:number; hl:boolean; };
    let nodes: Node[] = [];
    let raf = 0;
    let running = true;

    const rand = (a:number,b:number)=>a+Math.random()*(b-a);
    const clamp = (v:number,a:number,b:number)=>Math.max(a,Math.min(b,v));

    function setSize() {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes(w, h);
    }

    function buildNodes(w:number,h:number) {
      const count = Math.round((w * h) / DENSITY);
      nodes = [];
      for (let i = 0; i < count; i++) {
        const r = rand(NODE_MIN, NODE_MAX);
        const s = rand(SPEED_MIN, SPEED_MAX) * (Math.random() < 0.5 ? -1 : 1);
        nodes.push({
          x: rand(r, w - r),
          y: rand(r, h - r),
          vx: s * rand(0.7, 1.2),
          vy: s * rand(0.7, 1.2),
          r: r * (i % HIGHLIGHT_EVERY === 0 ? 1.3 : 1),
          hl: i % HIGHLIGHT_EVERY === 0,
        });
      }
    }

    function drawBg(w:number,h:number) {
      ctx.clearRect(0,0,w,h);
      const g = ctx.createRadialGradient(w*0.5, h*0.65, 10, w*0.5, h*0.65, Math.max(w,h));
      g.addColorStop(0, "rgba(168,85,247,0.05)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0,0,w,h);
    }

    function step(w:number,h:number) {
      const maxDist = MAX_LINK_DIST;

      // move
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < n.r || n.x > w - n.r) { n.vx *= -1; n.x = clamp(n.x, n.r, w - n.r); }
        if (n.y < n.r || n.y > h - n.r) { n.vy *= -1; n.y = clamp(n.y, n.r, h - n.r); }
      }

      // lines
      ctx.lineWidth = 1;
      for (let i=0;i<nodes.length;i++){
        const a = nodes[i];
        for (let j=i+1;j<nodes.length;j++){
          const b = nodes[j];
          const dx = a.x-b.x, dy = a.y-b.y;
          const d = Math.hypot(dx,dy);
          if (d < maxDist){
            const alpha = (1 - d/maxDist) * 0.5;
            ctx.strokeStyle = `${LINE_COLOR}${alpha})`;
            ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes){
        if (n.hl){ ctx.shadowColor = GLOW_COLOR; ctx.shadowBlur = 10; }
        else { ctx.shadowBlur = 0; ctx.shadowColor = "transparent"; }
        ctx.fillStyle = NODE_COLOR;
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fill();

        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.beginPath(); ctx.arc(n.x,n.y,Math.max(0.8,n.r*0.45),0,Math.PI*2); ctx.fill();
      }
    }

    function render() {
      if (!running) return;
      const w = canvas.clientWidth, h = canvas.clientHeight;
      drawBg(w,h);
      step(w,h);
      raf = requestAnimationFrame(render);
    }

    setSize();
    render();

    const onResize = () => setSize();
    window.addEventListener("resize", onResize);

    // Parallax: very subtle & slow for calm effect
    const onMouseMove = (e: MouseEvent) => {
      const cx = e.clientX, cy = e.clientY;
      const w = window.innerWidth, h = window.innerHeight;
      const fx = (cx - w/2) / w, fy = (cy - h/2) / h;
      for (const n of nodes){ n.vx += fx * 0.0006; n.vy += fy * 0.0006; }
    };
    window.addEventListener("mousemove", onMouseMove);

    // Pause when tab is hidden / for reduced motion
    const onVis = () => {
      if (document.hidden || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        running = false; cancelAnimationFrame(raf);
      } else {
        if (!running){ running = true; render(); }
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // fixed full-viewport canvas, behind everything
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      // keeping it transparent so your site colors show; body can be black.
    />
  );
}
