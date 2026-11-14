import { useState } from 'react';
import { LESSONS, Lesson } from '../data';

function LessonCard({ l }: { l: Lesson }) {
  const spin = l.kind === 'spinoff';
  const [more, setMore] = useState(false);
  return (
    <div className="glass glass-hover fade-up rounded-3xl p-6 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span
          className={`font-mono text-xs font-bold px-3 py-1 rounded-full border ${
            spin ? 'text-emerald-300 bg-emerald-400/10 border-emerald-400/25' : 'text-amber-300 bg-amber-400/10 border-amber-400/25'
          }`}
        >
          {l.tag}
        </span>
        <span className="text-xl" aria-hidden>{spin ? '🌍' : '🔥'}</span>
      </div>
      <h3 className="font-display italic text-3xl text-white leading-[1.05]">{l.title}</h3>
      <p className={`text-sm text-slate-300 leading-relaxed ${more ? '' : 'line-clamp-2'}`}>{l.body}</p>
      {more && l.outcome && (
        <p className="fade-up text-sm text-slate-200 border-l-2 border-amber-400/60 pl-3">
          <b className="text-amber-300">Design response:</b> {l.outcome}
        </p>
      )}
      <div className="mt-auto flex items-center justify-between pt-2">
        <button onClick={() => setMore((m) => !m)} aria-expanded={more} className="text-xs font-semibold text-amber-300 hover:text-amber-200 cursor-pointer">
          {more ? 'Show less' : 'Read more'}
        </button>
        <a href={l.link} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-slate-300 hover:text-white underline-offset-4 hover:underline">
          {l.linkLabel} ↗
        </a>
      </div>
    </div>
  );
}

export default function Lessons({ view }: { view: 'all' | 'lesson' | 'spinoff' }) {
  const lessons = LESSONS.filter((l) => l.kind === 'lesson');
  const spins = LESSONS.filter((l) => l.kind === 'spinoff');
  return (
    <div className="space-y-10">
      {view !== 'spinoff' && (
        <div>
          <h2 className="font-display italic text-3xl text-white">Historical spaceflight fire lessons</h2>
          <p className="text-xs text-slate-500 mb-5 mt-1">Events that shaped spacecraft fire-safety requirements.</p>
          <div className="grid md:grid-cols-3 gap-4">
            {lessons.map((l) => (
              <LessonCard key={l.id} l={l} />
            ))}
          </div>
        </div>
      )}
      {view !== 'lesson' && (
        <div>
          <h2 className="font-display italic text-3xl text-white">NASA firefighting &amp; safety spinoffs</h2>
          <p className="text-xs text-slate-500 mb-5 mt-1">Space-developed technology now protecting people on Earth.</p>
          <div className="grid md:grid-cols-3 gap-4">
            {spins.map((l) => (
              <LessonCard key={l.id} l={l} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
