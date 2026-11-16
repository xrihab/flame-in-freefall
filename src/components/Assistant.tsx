import { useEffect, useRef, useState } from 'react';
import { Answer, STARTERS } from '../data';

type Entry = { k: string[]; a: string };

const KB: Entry[] = [
  { k: ['hello', 'hi', 'hey', 'help'], a: 'Hi! Ask me about flame shape, NASA experiments (SoFIE, FLEX, BASS, ACME, SAME), smoke detection, suppression, or lunar habitat safety.' },
  { k: ['sphere', 'spherical', 'shape', 'round', 'teardrop', 'blue'], a: 'On Earth, buoyancy makes hot gas rise and gives flames a teardrop shape. In microgravity there is no buoyancy-driven convection, so flames become dim, blue, roughly spherical shapes.' },
  { k: ['why different', 'convection', 'buoyancy', 'gravity', 'earth vs', 'compare'], a: "Without gravity, hot gases don't rise and fresh oxygen isn't pulled in by convection. Oxygen reaches the flame mainly by slow diffusion, which changes flame shape, temperature, soot production and spread rate." },
  { k: ['sofie', 'solid fuel', 'ignition'], a: 'SoFIE (Solid Fuel Ignition and Extinction) studies how solid materials ignite, burn and go out in microgravity, to help choose safer materials for spacecraft.' },
  { k: ['flex', 'extinguishment'], a: 'FLEX (Flame Extinguishment Experiment) studied how flames burn and are put out in microgravity. Open its card in the Experiments tab for the findings and the NASA source link.' },
  { k: ['bass', 'burning and suppression'], a: 'BASS (Burning and Suppression of Solids) examined how solid materials burn and how fires can be suppressed in microgravity.' },
  { k: ['acme', 'advanced combustion'], a: 'ACME (Advanced Combustion via Microgravity Experiments) is a set of ISS combustion studies on flames in microgravity, aimed at better fuel efficiency and safety.' },
  { k: ['same', 'smoke aerosol'], a: 'SAME (Smoke Aerosol Measurement Experiment) measured the particles produced by overheated materials to improve spacecraft smoke detection.' },
  { k: ['fm2'], a: 'FM2 is one of the microgravity combustion experiments in this dashboard. Open its card in the Experiments tab for its findings and NASA source link.' },
  { k: ['apollo', 'apollo 1'], a: 'The Apollo 1 fire in 1967 showed how dangerous a pure-oxygen environment is, and it changed how NASA designs spacecraft and chooses materials.' },
  { k: ['mir'], a: 'A fire aboard the Mir space station in 1997 showed how serious fires can be on a long-duration station and shaped later fire-safety practices.' },
  { k: ['extinguisher', 'put out', 'suppress', 'co2', 'suppression', 'water mist'], a: "Suppression is harder in space because there's no convection to carry the extinguishing agent. See the FLEX and BASS cards for NASA's findings." },
  { k: ['smoke', 'detect', 'alarm', 'sensor'], a: "Smoke doesn't rise in microgravity, so detectors must sense small particles wherever they drift. Some microgravity flames are also very faint, which makes early detection important." },
  { k: ['lunar', 'moon', 'habitat', 'mars', 'rule', 'guideline', 'design'], a: 'Use the Mission Environment filter to see how experiment relevance changes for lunar, Mars and spacecraft habitats, then open any card for the engineering details.' },
  { k: ['danger', 'risk', 'hazard', 'toxic', 'escape'], a: 'Fire is among the most serious risks in space: the air is a closed system, escape routes are limited, and burning materials can release toxic gases.' },
  { k: ['data', 'source', 'dataset', 'psi', 'ntrs', 'resource', 'link'], a: 'Our data comes from NASA Physical Sciences Informatics (PSI) and NASA Combustion Science. Every source is linked in the footer of the page.' },
  { k: ['team', 'who', 'built', 'made'], a: 'Flame in Freefall was built for the 2026 NASA Space Apps Challenge by Rihabuddin Mohammed, Farhan Shaik, Yash Vardhan Amduri and Harshith Vardhan Amduri.' },
];

const FALLBACK =
  'I can help with flame shape, Earth vs. microgravity, NASA experiments (SoFIE, FLEX, BASS, ACME, SAME), smoke detection, suppression, and lunar habitat safety. Try one of those!';

function getReply(message: string): string {
  const t = message.toLowerCase();
  let best: Entry | null = null;
  let bestScore = 0;
  for (const e of KB) {
    const score = e.k.filter((w) => t.includes(w)).length;
    if (score > bestScore) {
      bestScore = score;
      best = e;
    }
  }
  return best ? best.a : FALLBACK;
}

interface Msg {
  role: 'user' | 'bot';
  text?: string;
  answer?: Answer;
}

function AnswerView({ a }: { a: Answer }) {
  return (
    <div className="space-y-3 text-sm">
      <div>
        <div className="font-display italic text-2xl text-amber-200 leading-none">{a.headline}</div>
        <p className="text-slate-100 font-medium mt-1 leading-relaxed">{a.recommendation}</p>
      </div>
      {a.evidence.length > 0 && (
        <div>
          <div className="text-[11px] text-slate-500 font-mono mb-1">evidence</div>
          <ul className="space-y-2">
            {a.evidence.map((e) => (
              <li key={e.name} className="rounded-lg bg-white/[0.04] border border-white/5 p-2.5">
                <div className="flex justify-between gap-2">
                  <span className="font-mono text-xs text-amber-300">{e.name}</span>
                  <a href={e.link} target="_blank" rel="noopener noreferrer" className="text-[11px] text-slate-400 hover:text-white shrink-0">
                    Source ↗
                  </a>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{e.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <div className="text-[11px] text-slate-500 font-mono mb-1">engineering actions</div>
        <ul className="space-y-1 text-xs text-slate-300 list-disc pl-4">
          {a.actions.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
      <p className="text-[11px] text-amber-200/70 border-t border-white/5 pt-2">Limits: {a.caveat}</p>
    </div>
  );
}

export default function Assistant({ onClose }: { onClose: () => void }) {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'bot', text: 'Hi! Ask me anything about fire safety in microgravity, or tap a starter question.' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [msgs, typing]);

  const ask = (q: string, a?: Answer) => {
    if (!q.trim() || typing) return;
    setMsgs((m) => [...m, { role: 'user', text: q }]);
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, a ? { role: 'bot', answer: a } : { role: 'bot', text: getReply(q) }]);
      setTyping(false);
    }, 400);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <div>
          <div className="font-bold text-white text-sm flex items-center gap-2"><span aria-hidden>🔥</span>SI Safety Assistant</div>
          <div className="text-[11px] text-slate-400">Microgravity fire safety guide</div>
        </div>
        <button onClick={onClose} aria-label="Collapse assistant" className="w-8 h-8 rounded-full border border-white/10 text-slate-400 hover:text-white cursor-pointer">
          ›
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scroll-thin p-4 space-y-4">
        {msgs.map((m, i) =>
          m.role === 'user' ? (
            <div key={i} className="flex justify-end">
              <div className="max-w-[85%] bg-gradient-to-br from-orange-500/20 to-rose-800/20 border border-orange-400/30 text-orange-50 text-sm rounded-2xl rounded-br-sm px-3 py-2">
                {m.text}
              </div>
            </div>
          ) : (
            <div key={i} className="fade-up rounded-2xl rounded-bl-sm bg-white/[0.05] border border-white/10 p-3">
              {m.answer ? <AnswerView a={m.answer} /> : <p className="text-sm text-slate-200 leading-relaxed">{m.text}</p>}
            </div>
          ),
        )}
        {typing && <div className="text-xs text-slate-500 font-mono">typing…</div>}
        {!typing && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {STARTERS.map((s) => (
              <button
                key={s.q}
                onClick={() => ask(s.q, s.a)}
                className="text-[11px] text-left rounded-full border border-amber-400/25 bg-amber-400/[0.04] px-3 py-1.5 text-amber-100 hover:bg-amber-400/10 hover:border-amber-400/50 cursor-pointer transition"
              >
                {s.q}
              </button>
            ))}
          </div>
        )}
        <div ref={end} />
      </div>

      <form
        className="p-4 border-t border-white/10 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
          setInput('');
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about fire in space..."
          className="flex-1 bg-white/5 border border-white/10 rounded-full px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400/50"
        />
        <button className="bg-gradient-to-r from-amber-400 to-orange-500 text-[#08070C] font-bold text-sm rounded-full px-5 cursor-pointer hover:brightness-110">Send</button>
      </form>
    </div>
  );
}
