import { useState, type CSSProperties } from 'react';

type G = '1g' | '0g';

const COPY: Record<G, { title: string; body: string }> = {
  '1g': {
    title: 'Buoyancy lifts the flame',
    body: 'Hot gas is lighter than cool air, so it rises. That draft feeds oxygen in from below and stretches the flame into a tall teardrop with trailing soot.',
  },
  '0g': {
    title: 'No buoyancy, no upward draft',
    body: 'Nothing makes hot gas rise in orbit. Oxygen arrives only by slow diffusion, so the flame settles into a rounded, dimmer sphere that burns evenly in every direction.',
  },
};

export default function Hero() {
  const [focus, setFocus] = useState<G>('1g');
  const [pinned, setPinned] = useState(false);
  const hover = (g: G) => !pinned && setFocus(g);

  return (
    <div className="glass rounded-3xl p-4 sm:p-5" aria-label="Interactive comparison of a flame at 1g and 0g">
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="font-mono text-[11px] text-amber-300/80">combustion · side by side</span>
        <div className="inline-flex p-0.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono" role="tablist">
          {(['1g', '0g'] as G[]).map((g) => (
            <button
              key={g}
              role="tab"
              aria-selected={focus === g}
              onClick={() => { setFocus(g); setPinned(true); }}
              className={`px-3.5 py-1 rounded-full cursor-pointer transition ${focus === g ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-[#08070C] font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* 1g */}
        <figure
          onMouseEnter={() => hover('1g')}
          onClick={() => { setFocus('1g'); setPinned(true); }}
          className={`relative rounded-2xl overflow-hidden border cursor-pointer transition-all duration-500 ${focus === '1g' ? 'border-amber-400/50 bg-amber-500/[0.06]' : 'border-white/5 bg-white/[0.02] opacity-60'}`}
        >
          <svg viewBox="0 0 200 260" className="w-full h-auto" role="img" aria-label="Teardrop flame rising with soot at Earth gravity">
            <defs>
              <linearGradient id="fl" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stopColor="#60a5fa" stopOpacity=".9" />
                <stop offset=".18" stopColor="#f59e0b" />
                <stop offset=".6" stopColor="#ea580c" />
                <stop offset="1" stopColor="#9f1239" stopOpacity=".85" />
              </linearGradient>
              <radialGradient id="glow1" cx=".5" cy=".75" r=".55"><stop offset="0" stopColor="#f59e0b" stopOpacity=".35" /><stop offset="1" stopColor="#f59e0b" stopOpacity="0" /></radialGradient>
            </defs>
            <rect width="200" height="260" fill="url(#glow1)" />
            {[70, 100, 130].map((x, i) => (
              <path key={x} className="convect" style={{ animationDelay: `${i * 0.5}s` }} d={`M${x - 6} 70 L${x} 58 L${x + 6} 70`} fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
            ))}
            <rect x="94" y="232" width="12" height="18" rx="3" fill="#3f2a2a" />
            <g className="flame-1g">
              <path d="M100 40 C118 88 150 128 150 175 C150 214 126 236 100 236 C74 236 50 214 50 175 C50 128 82 88 100 40Z" fill="url(#fl)" />
            </g>
            <g className="flame-core">
              <path d="M100 118 C110 148 126 168 126 190 C126 214 114 228 100 228 C86 228 74 214 74 190 C74 168 90 148 100 118Z" fill="#fde68a" opacity=".85" />
            </g>
            {[[84, 0, -10], [104, 0.7, 12], [94, 1.4, -4], [114, 2.1, 14], [78, 2.8, -14]].map(([x, d, dx], i) => (
              <circle key={i} className="soot" cx={x} cy="60" r={i % 2 ? 2.2 : 1.6} fill="#a8a29e" style={{ animationDelay: `${d}s`, '--dx': `${dx}px` } as CSSProperties} />
            ))}
          </svg>
          <figcaption className="absolute left-3 bottom-2 font-mono text-[11px]"><b className="text-amber-300 text-sm">1g</b> <span className="text-slate-400">Earth</span></figcaption>
        </figure>

        {/* 0g */}
        <figure
          onMouseEnter={() => hover('0g')}
          onClick={() => { setFocus('0g'); setPinned(true); }}
          className={`relative rounded-2xl overflow-hidden border cursor-pointer transition-all duration-500 ${focus === '0g' ? 'border-sky-300/40 bg-sky-400/[0.05]' : 'border-white/5 bg-white/[0.02] opacity-60'}`}
        >
          <svg viewBox="0 0 200 260" className="w-full h-auto" role="img" aria-label="Spherical blue and amber flame in microgravity">
            <defs>
              <radialGradient id="sp" cx=".5" cy=".5" r=".5">
                <stop offset="0" stopColor="#bae6fd" />
                <stop offset=".3" stopColor="#38bdf8" stopOpacity=".95" />
                <stop offset=".62" stopColor="#f59e0b" stopOpacity=".95" />
                <stop offset="1" stopColor="#ea580c" stopOpacity=".15" />
              </radialGradient>
              <radialGradient id="glow0" cx=".5" cy=".54" r=".5"><stop offset="0" stopColor="#38bdf8" stopOpacity=".22" /><stop offset="1" stopColor="#38bdf8" stopOpacity="0" /></radialGradient>
            </defs>
            <rect width="200" height="260" fill="url(#glow0)" />
            <circle className="halo" cx="100" cy="140" r="62" fill="none" stroke="#f59e0b" strokeWidth="1.2" />
            <circle className="halo" style={{ animationDelay: '1.6s' }} cx="100" cy="140" r="62" fill="none" stroke="#38bdf8" strokeWidth="1" />
            {Array.from({ length: 8 }, (_, i) => {
              const a = (i * Math.PI) / 4, x1 = 100 + Math.cos(a) * 80, y1 = 140 + Math.sin(a) * 80, x2 = 100 + Math.cos(a) * 94, y2 = 140 + Math.sin(a) * 94;
              return <line key={i} className="diffuse" style={{ animationDelay: `${i * 0.2}s` }} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#7dd3fc" strokeWidth="1.5" strokeLinecap="round" />;
            })}
            <circle className="sphere" cx="100" cy="140" r="62" fill="url(#sp)" />
          </svg>
          <figcaption className="absolute left-3 bottom-2 font-mono text-[11px]"><b className="text-sky-300 text-sm">0g</b> <span className="text-slate-400">Microgravity</span></figcaption>
        </figure>
      </div>

      <div key={focus} className="fade-up mt-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
        <div className="text-sm font-semibold text-white">{COPY[focus].title}</div>
        <p className="text-[13px] text-slate-400 mt-1 leading-relaxed">{COPY[focus].body}</p>
      </div>
      <p className="text-[10px] text-slate-600 mt-2 font-mono">Illustrative graphic. Tap a flame or use the toggle.</p>
    </div>
  );
}
