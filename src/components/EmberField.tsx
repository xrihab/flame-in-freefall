import { useEffect, useRef } from 'react';

/** Starlight dust + rising embers on a fixed canvas behind the UI. */
export default function EmberField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext('2d')!;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    const stars = Array.from({ length: 110 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.1 + 0.2, p: Math.random() * 6, s: Math.random() * 0.0006 + 0.0002 }));
    const mk = (init = false) => ({ x: Math.random() * w, y: init ? Math.random() * h : h + 10, r: Math.random() * 1.8 + 0.6, vy: Math.random() * 0.35 + 0.12, vx: (Math.random() - 0.5) * 0.15, a: Math.random() * 0.5 + 0.2, hue: Math.random() < 0.7 ? 36 : 14 });
    const embers = Array.from({ length: 38 }, () => mk(true));
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const a = 0.25 + 0.35 * Math.sin(t * s.s * 4 + s.p);
        ctx.fillStyle = `rgba(255,236,214,${Math.max(a, 0.05)})`;
        ctx.beginPath(); ctx.arc(s.x * w, ((s.y * h) + t * s.s * 8) % h, s.r, 0, 6.3); ctx.fill();
      }
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.y -= e.vy; e.x += e.vx + Math.sin(t * 0.001 + i) * 0.1;
        if (e.y < -10) embers[i] = mk();
        const fade = Math.min(1, e.y / (h * 0.5));
        const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 5);
        g.addColorStop(0, `hsla(${e.hue},95%,60%,${e.a * fade})`);
        g.addColorStop(1, 'hsla(20,95%,50%,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(e.x, e.y, e.r * 5, 0, 6.3); ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} aria-hidden className="fixed inset-0 -z-[1] pointer-events-none" />;
}
