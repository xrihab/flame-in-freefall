import { useMemo, useState } from 'react';
import Hero from './components/Hero';
import EmberField from './components/EmberField';
import {
  ALERTS,
  ENVIRONMENTS,
  EXPERIMENTS,
  EnvId,
  LINKS,
  matchesEnv,
  weightedScore,
} from './data';
import { ExperimentCard, ExperimentModal } from './components/Experiments';
import GravityChart from './components/GravityChart';
import Lessons from './components/Lessons';
import Assistant from './components/Assistant';

const SEV = {
  critical: { c: '#fb7185', l: 'Critical' },
  warning: { c: '#fb923c', l: 'Warning' },
  advisory: { c: '#fbbf24', l: 'Advisory' },
};

const FOOTER_LINKS: { label: string; desc?: string; href: string }[] = [
  {
    label: 'PSI Data Repository: Combustion Science',
    desc: 'Physical Sciences Informatics (PSI) source of the data upon which this app is based.',
    href: LINKS.psi,
  },
  {
    label: 'NASA Combustion Science',
    desc: 'Basic information about most of the combustion investigations found in the PSI Data Repository.',
    href: LINKS.combustion,
  },
  { label: 'ACME video (YouTube)', href: LINKS.youtube },
  { label: "A Researcher's Guide to Combustion Science", href: LINKS.guide },
  { label: 'Apollo 1', href: LINKS.apollo1 },
  { label: 'Apollo 13', href: LINKS.apollo13 },
  { label: 'Mir fire, 25 years on', href: LINKS.mir },
  { label: 'Spinoff: Firefighter air tanks', href: LINKS.spin1 },
  { label: 'Spinoff: Brunswick fire detector', href: LINKS.spin2 },
  { label: 'Spinoff: Project FIRES gear', href: LINKS.spin3 },
];


function AlertCard({ a }: { a: (typeof ALERTS)[number] }) {
  const [more, setMore] = useState(false);
  const s = SEV[a.severity];
  return (
    <button
      onClick={() => setMore((m) => !m)}
      aria-expanded={more}
      className="glass fade-up rounded-2xl px-4 py-3 text-left w-full cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.c, boxShadow: `0 0 8px ${s.c}` }} />
        <span className="font-mono text-[10px] font-bold" style={{ color: s.c }}>{s.l}</span>
        <span className="font-mono text-[10px] text-slate-500 ml-auto">{a.ref}</span>
      </div>
      <div className="text-sm font-semibold text-white mt-1.5 leading-snug">{a.title}</div>
      <p className={`text-xs text-slate-400 mt-1 leading-relaxed ${more ? '' : 'line-clamp-1'}`}>{a.body}</p>
    </button>
  );
}

export default function App() {
  const [env, setEnv] = useState<EnvId>('all');
  const [tab, setTab] = useState<'lab' | 'lessons'>('lab');
  const [lessonView, setLessonView] = useState<'all' | 'lesson' | 'spinoff'>('all');
  const [open, setOpen] = useState<string | null>(null);
  const [chat, setChat] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 1280);

  const ranked = useMemo(
    () =>
      EXPERIMENTS.filter((e) => matchesEnv(e.habitats, env)).sort(
        (a, b) => weightedScore(b, env) - weightedScore(a, env) || b.relevance - a.relevance,
      ),
    [env],
  );
  const alerts = ALERTS.filter((a) => matchesEnv(a.habitats, env));
  const envLabel = ENVIRONMENTS.find((e) => e.id === env)!.label;
  const current = EXPERIMENTS.find((e) => e.id === open);
  const [top, ...rest] = ranked;

  return (
    <div className="min-h-screen relative">
      <div className="aurora" aria-hidden><i /><i /><i /><i /></div>
      <EmberField />

      <div className={`transition-[padding] duration-500 ${chat ? 'xl:pr-[420px]' : ''}`}>
        {/* Hero */}
        <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-8">
          <div className="flex items-center gap-2.5 mb-8 sm:mb-12">
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden><path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-4 3-7 1 1 1 2 2 3 0-3 0-5 1-8Z" fill="url(#lg)" /><defs><linearGradient id="lg" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#ea580c" /><stop offset="1" stopColor="#fbbf24" /></linearGradient></defs></svg>
            <span className="font-mono text-[11px] text-slate-400">NASA PSI · Combustion Science</span>
          </div>
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="text-5xl sm:text-7xl font-extrabold tracking-[-0.04em] leading-[0.95] text-white">
                Flame in <em className="font-display font-normal italic ember-text pr-1">Freefall</em>
              </h1>
              <p className="mt-5 text-lg sm:text-xl text-slate-300 max-w-md leading-snug">
                Fire behaves differently in <em className="font-display italic text-amber-300 text-2xl">Microgravity</em>. Plan for it.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {[['6', 'experiments', '#fbbf24'], ['3', 'flight lessons', '#fb7185'], ['3', 'Earth spinoffs', '#34d399']].map(([n, l, c]) => (
                  <span key={l} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5">
                    <b className="font-mono text-base" style={{ color: c }}>{n}</b>
                    <span className="text-xs text-slate-300">{l}</span>
                  </span>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#lab" className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-[#08070C] font-bold text-sm px-5 py-2.5 hover:brightness-110 transition">Explore experiments</a>
                <button onClick={() => setChat(true)} className="rounded-full border border-amber-400/40 text-amber-200 hover:bg-amber-400/10 text-sm font-semibold px-5 py-2.5 cursor-pointer transition">Ask the SI Safety Assistant</button>
              </div>
            </div>
            <Hero />
          </div>
        </header>

        {/* Filter bar */}
        <div id="lab" className="sticky top-0 z-30 backdrop-blur-xl bg-[#08070C]/70 border-y border-white/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2.5 overflow-x-auto scroll-thin">
            <span className="text-xs text-slate-500 shrink-0 mr-1">Mission environment</span>
            {ENVIRONMENTS.map((e) => (
              <button
                key={e.id}
                onClick={() => setEnv(e.id)}
                aria-pressed={env === e.id}
                className={`shrink-0 text-xs sm:text-sm px-4 py-1.5 rounded-full border transition cursor-pointer ${
                  env === e.id
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-[#08070C] border-transparent font-bold shadow-[0_0_24px_rgba(245,158,11,.35)]'
                    : 'border-white/10 text-slate-300 hover:border-amber-400/50 hover:text-white'
                }`}
              >
                {e.label}
              </button>
            ))}
          </div>
        </div>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/10">
              {([
                ['lab', 'Experiments & Analysis'],
                ['lessons', 'Fire Lessons & Earth Spinoffs'],
              ] as const).map(([k, l]) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition cursor-pointer ${
                    tab === k ? 'bg-white/12 text-white shadow-[inset_0_0_0_1px_rgba(245,158,11,.35)]' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            {tab === 'lessons' && (
              <div className="flex gap-1.5 text-xs">
                {([
                  ['all', 'All'],
                  ['lesson', 'Lessons'],
                  ['spinoff', 'Spinoffs'],
                ] as const).map(([k, l]) => (
                  <button
                    key={k}
                    onClick={() => setLessonView(k)}
                    className={`px-3.5 py-1.5 rounded-full border cursor-pointer transition ${
                      lessonView === k ? 'border-amber-400 text-amber-200 bg-amber-400/10' : 'border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          {tab === 'lab' ? (
            <>
              {/* Bento: top pick + alerts */}
              <section className="grid lg:grid-cols-3 gap-4 items-stretch">
                <div className="lg:col-span-2">
                  {top && (
                    <ExperimentCard key={top.id + env} e={top} env={env} rank={1} feature onOpen={() => setOpen(top.id)} />
                  )}
                </div>
                <div className="relative min-h-[240px]">
                  <div className="lg:absolute lg:inset-0 flex flex-col gap-3 lg:overflow-y-auto scroll-thin lg:pr-1">
                    <div className="flex items-baseline justify-between px-1">
                      <h2 className="font-display italic text-2xl text-white">Safety alerts</h2>
                      <span className="font-mono text-[11px] text-slate-500">{alerts.length} · {envLabel}</span>
                    </div>
                    {alerts.map((a) => (
                      <AlertCard key={a.id} a={a} />
                    ))}
                  </div>
                </div>
              </section>

              {/* Ranked experiments */}
              <section>
                <div className="flex flex-wrap items-end justify-between mb-4 gap-2">
                  <div>
                    <h2 className="text-2xl font-display italic text-white">Ranked by safety relevance</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {env === 'all' ? 'NASA-listed relevance.' : 'Environment-weighted: dedicated habitat studies gain up to +3 points.'}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-slate-500">{ranked.length} of 6 shown</span>
                </div>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {rest.map((e, i) => (
                    <ExperimentCard key={e.id + env} e={e} env={env} rank={i + 2} onOpen={() => setOpen(e.id)} />
                  ))}
                </div>
              </section>

              <GravityChart />
            </>
          ) : (
            <Lessons view={lessonView} />
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <h2 className="font-display italic text-2xl text-white mb-5">NASA sources &amp; data</h2>
            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href + l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-amber-200 hover:underline break-all">
                    {l.label} ↗
                  </a>
                  {l.desc && <p className="text-xs text-slate-500 mt-0.5">{l.desc}</p>}
                  <p className="font-mono text-[10px] text-slate-600 break-all">{l.href}</p>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-slate-600 mt-6">
              Flame in Freefall is an independent educational dashboard built on public NASA data. It is not an official NASA product.
            </p>
          </div>
        </footer>
      </div>

      {/* Floating trigger */}
      {!chat && (
        <button
          onClick={() => setChat(true)}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-[#08070C] font-bold text-sm pl-4 pr-5 py-3 shadow-[0_10px_40px_rgba(234,88,12,.45)] hover:brightness-110 transition cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-[#08070C] animate-pulse" /> SI Safety Assistant
        </button>
      )}

      {/* Assistant drawer */}
      <aside
        className={`glass fixed z-40 top-3 right-3 bottom-3 w-[calc(100%-1.5rem)] sm:w-[396px] rounded-3xl transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${
          chat ? 'translate-x-0' : 'translate-x-[calc(100%+1.5rem)]'
        }`}
        aria-hidden={!chat}
      >
        <Assistant onClose={() => setChat(false)} />
      </aside>

      {current && <ExperimentModal e={current} env={env} onClose={() => setOpen(null)} />}
    </div>
  );
}
