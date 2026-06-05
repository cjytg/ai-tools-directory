"use client";

import { useEffect, useRef, memo } from "react";

interface Dot {
  ax: number;
  ay: number;
  sx: number;
  sy: number;
}

interface DotFieldProps {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  bulgeStrength?: number;
  dotColor?: string;
  dotOpacity?: number;
}

const DotField = memo(
  ({
    dotRadius = 2,
    dotSpacing = 24,
    cursorRadius = 500,
    bulgeStrength = 50,
    dotColor = "rgba(148, 163, 184, 0.4)",
    dotOpacity = 1,
  }: DotFieldProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dotsRef = useRef<Dot[]>([]);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const rafRef = useRef<number | null>(null);
    const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 });

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      let resizeTimer: ReturnType<typeof setTimeout>;

      function resize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(doResize, 100);
      }

      function doResize() {
        const rect = canvas!.parentElement!.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;

        canvas!.width = w * dpr;
        canvas!.height = h * dpr;
        canvas!.style.width = `${w}px`;
        canvas!.style.height = `${h}px`;
        ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

        sizeRef.current = {
          w,
          h,
          offsetX: rect.left + window.scrollX,
          offsetY: rect.top + window.scrollY,
        };

        buildDots(w, h);
      }

      function buildDots(w: number, h: number) {
        const step = dotRadius + dotSpacing;
        const cols = Math.floor(w / step);
        const rows = Math.floor(h / step);
        const padX = (w % step) / 2;
        const padY = (h % step) / 2;
        const dots: Dot[] = new Array(rows * cols);
        let idx = 0;

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const ax = padX + col * step + step / 2;
            const ay = padY + row * step + step / 2;
            dots[idx++] = { ax, ay, sx: ax, sy: ay };
          }
        }
        dotsRef.current = dots;
      }

      function onMouseMove(e: MouseEvent) {
        const s = sizeRef.current;
        mouseRef.current.x = e.clientX - s.offsetX;
        mouseRef.current.y = e.clientY - s.offsetY;
      }

      function tick() {
        const dots = dotsRef.current;
        const m = mouseRef.current;
        const { w, h } = sizeRef.current;
        if (!w || !h) {
          rafRef.current = requestAnimationFrame(tick);
          return;
        }

        ctx!.clearRect(0, 0, w, h);
        ctx!.fillStyle = dotColor;
        ctx!.globalAlpha = dotOpacity;

        const cr = cursorRadius;
        const crSq = cr * cr;
        const rad = dotRadius / 2;
        const len = dots.length;

        ctx!.beginPath();

        for (let i = 0; i < len; i++) {
          const d = dots[i];
          const dx = m.x - d.ax;
          const dy = m.y - d.ay;
          const distSq = dx * dx + dy * dy;

          let drawX = d.ax;
          let drawY = d.ay;

          if (distSq < crSq) {
            const dist = Math.sqrt(distSq);
            const t = 1 - dist / cr;
            const push = t * t * bulgeStrength;
            const angle = Math.atan2(dy, dx);
            drawX = d.ax - Math.cos(angle) * push;
            drawY = d.ay - Math.sin(angle) * push;
            d.sx += (drawX - d.sx) * 0.15;
            d.sy += (drawY - d.sy) * 0.15;
          } else {
            d.sx += (d.ax - d.sx) * 0.1;
            d.sy += (d.ay - d.sy) * 0.1;
          }

          ctx!.moveTo(d.sx + rad, d.sy);
          ctx!.arc(d.sx, d.sy, rad, 0, Math.PI * 2);
        }

        ctx!.fill();
        ctx!.globalAlpha = 1;

        rafRef.current = requestAnimationFrame(tick);
      }

      doResize();
      window.addEventListener("resize", resize);
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      rafRef.current = requestAnimationFrame(tick);

      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", resize);
        window.removeEventListener("mousemove", onMouseMove);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div className="w-full h-full relative">
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    );
  }
);

DotField.displayName = "DotField";

export default DotField;
