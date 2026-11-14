import { useEffect } from 'react';
import { Experiment, EnvId, Level, weightedScore } from '../data';

export function ScoreBadge({ score, base }: { score: number; base?: number }) {
  const color = score >= 96 ? '#fbbf24' : score >= 92 ? '#fb923c' : '#fb7185';
  const r = 20, c = 2 * Math.PI * r;
  return (
    <div
      className="relative w-14 h-14 shrink-0"
      title={base !== undefined && base !== score ? `NASA-listed relevance ${base}%` : 'Safety Relevance Score'}
    >
      <svg viewBox="0 0 48 48" className="w-full h-full -rotate-90" aria-hidden>
        <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="3.5" />
        <circle cx="24" cy="24" r={r} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)} style={{ transition: 'stroke-dashoffset .8s ease', filter: `drop-shadow(0 0 4px ${color}88)` }} />
      </svg>
      <span className="absolute inset-0 grid place-items-center font-mono text-[13px] font-bold text-white">{score}<span className="text-[8px] text-slate-400">%</span></span>
    </div>
  );
}

export function ExperimentCard({
  e,
  env,
  rank,
  onOpen,
  feature,
}: {
  e: Experiment;
  env: EnvId;
  rank: number;
  onOpen: () => void;
  feature?: boolean;
}) {
  const score = weightedScore(e, env);
  return (
    <button
      onClick={onOpen}
      className={`glass glass-hover fade-up text-left rounded-3xl p-5 sm:p-6 flex flex-col gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer w-full h-full ${feature ? 'sm:p-7' : ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] rounded-full border border-amber-400/30 text-amber-300 px-2 py-0.5">
              {feature ? 'Top pick' : `#${rank}`}
            </span>
          </div>
          <h3 className={`font-display italic text-white leading-none ${feature ? 'text-6xl' : 'text-4xl'}`}>{e.name}</h3>
          <p className="text-xs text-slate-400 mt-2">{e.full}</p>
        </div>
        <ScoreBadge score={score} base={e.relevance} />
      </div>

      <p className={`text-slate-200 leading-snug ${feature ? 'text-base line-clamp-3' : 'text-sm line-clamp-2'}`}>{e.summary}</p>

      <div className="flex flex-wrap gap-2 text-[11px]">
        <span className="font-mono rounded-full bg-sky-400/10 border border-sky-300/25 text-sky-200 px-2.5 py-1">{e.condition}</span>
        <span className="rounded-full bg-white/[0.05] border border-white/10 text-slate-300 px-2.5 py-1">{e.fuel}</span>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 pt-1">
        <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-300 bg-emerald-400/10 border border-emerald-400/25 rounded-full px-2.5 py-1 min-w-0">
          <span aria-hidden>🌍</span><span className="truncate">{e.spinoff}</span>
        </span>
        <span className="text-xs font-semibold text-amber-300 shrink-0">Inspect →</span>
      </div>
      <div className="text-[10px] text-slate-500 font-mono -mt-2">{e.habitatLabels}</div>
    </button>
  );
}

const LEVELS: Level[] = ['Moderate', 'Elevated', 'High'];
const LEVEL_COLOR: Record<Level, string> = { Moderate: '#fbbf24', Elevated: '#fb923c', High: '#fb7185' };

export function ExperimentModal({
  e,
  env,
  onClose,
}: {
  e: Experiment;
  env: EnvId;
  onClose: () => void;
}) {
  useEffect(() => {
    const h = (ev: KeyboardEvent) => ev.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', h);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const lvl = LEVELS.indexOf(e.ignitionLevel);
  const color = LEVEL_COLOR[e.ignitionLevel];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08070C]/80 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="glass fade-up w-full max-w-2xl max-h-[90vh] overflow-y-auto scroll-thin rounded-3xl p-6 sm:p-8"
        onClick={(x) => x.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-amber-300 font-mono">experiment inspection</p>
            <h2 className="font-display italic text-6xl text-white leading-none mt-1">{e.name}</h2>
            <p className="text-sm text-slate-400">{e.full}</p>
          </div>
          <div className="flex items-start gap-3">
            <ScoreBadge score={weightedScore(e, env)} base={e.relevance} />
            <button
              onClick={onClose}
              aria-label="Close"
              className="w-9 h-9 rounded-full border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        <p className="mt-4 text-slate-200 leading-relaxed">{e.summary}</p>

        <div className="grid sm:grid-cols-3 gap-2 mt-4 text-xs">
          <Cell k="Habitats" v={e.habitatLabels} />
          <Cell k="Fuel / Material" v={e.fuel} />
          <Cell k="Condition" v={e.condition} mono />
        </div>

        <h3 className="mt-6 mb-2 font-display italic text-2xl text-white">Fire prediction metrics</h3>
        <div className="space-y-3">
          <Metric title="Flame spread behavior" body={e.spread} />
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-white">Ignition risk</div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {LEVELS.map((l, i) => (
                    <span
                      key={l}
                      className="w-7 h-1.5 rounded-full"
                      style={{ background: i <= lvl ? color : 'rgba(148,163,184,.2)' }}
                    />
                  ))}
                </div>
                <span className="font-mono text-xs font-bold" style={{ color }}>
                  {e.ignitionLevel.toUpperCase()}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">{e.ignition}</p>
          </div>
          <Metric title="Suppression notes" body={e.suppression} />
        </div>

        <div className="mt-4 text-sm text-emerald-300 bg-emerald-400/10 border border-emerald-400/25 rounded-xl px-4 py-3">
          🌍 <b>Earth Safety Spinoff:</b> {e.spinoff}
        </div>

        <p className="text-[11px] text-slate-500 mt-4">
          Risk levels are qualitative readings of the verified NASA summary above, not NASA-published ratings.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={e.source}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-110 text-[#08070C] font-bold text-sm px-6 py-3 rounded-full transition"
          >
            View Official NASA Source ↗
          </a>
          <span className="self-center text-xs text-slate-500">{e.sourceLabel}</span>
        </div>
      </div>
    </div>
  );
}

function Cell({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2">
      <div className="text-[10px] text-slate-500 font-mono">{k}</div>
      <div className={`mt-0.5 text-slate-200 ${mono ? 'font-mono text-sky-200' : ''}`}>{v}</div>
    </div>
  );
}

function Metric({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="text-sm font-semibold text-white">{title}</div>
      <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">{body}</p>
    </div>
  );
}
