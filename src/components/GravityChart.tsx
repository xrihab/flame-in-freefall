import { useState } from 'react';
import { GRAVITY_POINTS, METRICS } from '../data';

export default function GravityChart() {
  const [metricId, setMetricId] = useState('temp');
  const [mode, setMode] = useState<'bar' | 'line'>('bar');
  const [hover, setHover] = useState<number | null>(null);
  const m = METRICS.find((x) => x.id === metricId)!;

  const W = 640, H = 300, pl = 56, pr = 20, pt = 24, pb = 52;
  const iw = W - pl - pr, ih = H - pt - pb;
  const max = Math.max(...m.values) * 1.15;
  const step = iw / m.values.length;
  const x = (i: number) => pl + step * i + step / 2;
  const y = (v: number) => pt + ih - (v / max) * ih;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => max * t);
  const fmt = (v: number) => (v >= 100 ? v.toFixed(0) : v < 1 ? v.toFixed(2) : v.toFixed(1));
  const active = hover ?? 0;

  return (
    <section className="glass rounded-3xl p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display italic text-3xl text-white">Gravity &amp; fire behavior comparison</h2>
          <p className="text-xs text-slate-500 font-mono mt-1">Earth (1g) · Mars (0.38g) · Lunar (0.16g) · Microgravity (0g)</p>
        </div>
        <div className="flex gap-1 p-1 rounded-full bg-white/5 border border-white/10 text-xs">
          {(['bar', 'line'] as const).map((k) => (
            <button
              key={k}
              onClick={() => setMode(k)}
              className={`px-3.5 py-1 rounded-full capitalize cursor-pointer ${mode === k ? 'bg-amber-400/20 ring-1 ring-amber-400/40 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {METRICS.map((x) => (
          <button
            key={x.id}
            onClick={() => setMetricId(x.id)}
            className="text-xs px-3.5 py-1.5 rounded-full border transition cursor-pointer"
            style={{
              borderColor: metricId === x.id ? x.color : 'rgba(148,163,184,.2)',
              background: metricId === x.id ? x.color + '1f' : 'transparent',
              color: metricId === x.id ? x.color : '#94a3b8',
            }}
          >
            {x.label} ({x.unit})
          </button>
        ))}
      </div>

      <div className="mt-4 grid lg:grid-cols-[1fr_220px] gap-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" onMouseLeave={() => setHover(null)}>
          {ticks.map((t, i) => (
            <g key={i}>
              <line x1={pl} x2={W - pr} y1={y(t)} y2={y(t)} stroke="rgba(148,163,184,.12)" />
              <text x={pl - 8} y={y(t) + 4} textAnchor="end" className="fill-slate-500" style={{ font: '10px JetBrains Mono, monospace' }}>
                {fmt(t)}
              </text>
            </g>
          ))}
          <text x={14} y={pt + ih / 2} transform={`rotate(-90 14 ${pt + ih / 2})`} textAnchor="middle" className="fill-slate-500" style={{ font: '10px Plus Jakarta Sans, sans-serif' }}>
            {m.label} ({m.unit})
          </text>

          {mode === 'bar' &&
            m.values.map((v, i) => {
              const bw = Math.min(70, step * 0.55);
              return (
                <rect
                  key={i}
                  x={x(i) - bw / 2}
                  y={y(v)}
                  width={bw}
                  height={pt + ih - y(v)}
                  rx={6}
                  fill={m.color}
                  opacity={hover === null || hover === i ? 0.9 : 0.35}
                  style={{ transition: 'all .4s ease' }}
                />
              );
            })}

          {mode === 'line' && (
            <>
              <polyline
                fill="none"
                stroke={m.color}
                strokeWidth={3}
                strokeLinejoin="round"
                points={m.values.map((v, i) => `${x(i)},${y(v)}`).join(' ')}
              />
              {m.values.map((v, i) => (
                <circle key={i} cx={x(i)} cy={y(v)} r={hover === i ? 8 : 5.5} fill="#08070C" stroke={m.color} strokeWidth={3} />
              ))}
            </>
          )}

          {m.values.map((v, i) => (
            <g key={'l' + i}>
              <text x={x(i)} y={y(v) - 12} textAnchor="middle" fill="#e2e8f0" style={{ font: '600 11px JetBrains Mono, monospace' }}>
                {fmt(v)}
              </text>
              <text x={x(i)} y={H - 28} textAnchor="middle" fill="#e2e8f0" style={{ font: '600 12px JetBrains Mono, monospace' }}>
                {GRAVITY_POINTS[i].g}
              </text>
              <text x={x(i)} y={H - 12} textAnchor="middle" className="fill-slate-500" style={{ font: '10px Plus Jakarta Sans, sans-serif' }}>
                {GRAVITY_POINTS[i].label}
              </text>
              <rect
                x={x(i) - step / 2}
                y={pt}
                width={step}
                height={ih + pb}
                fill="transparent"
                onMouseEnter={() => setHover(i)}
                onClick={() => setHover(i)}
                style={{ cursor: 'pointer' }}
              />
            </g>
          ))}
        </svg>

        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 text-sm self-start">
          <div className="text-[11px] text-slate-500 font-mono">selected regime</div>
          <div className="font-mono text-2xl font-bold mt-1" style={{ color: m.color }}>
            {fmt(m.values[active])}
            <span className="text-sm text-slate-400 ml-1">{m.unit}</span>
          </div>
          <div className="text-slate-200 text-xs mt-1">
            {GRAVITY_POINTS[active].label} · {GRAVITY_POINTS[active].g}
          </div>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">{m.note}</p>
        </div>
      </div>

      <p className="text-[11px] text-amber-200/70 mt-3 border-t border-white/5 pt-3">
        ⚠ Illustrative trend model for planning discussion. The verified NASA dataset in this hub does not publish these
        numeric values; consult the linked NASA sources for measured data.
      </p>
    </section>
  );
}
