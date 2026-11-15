import { useEffect, useRef, useState } from 'react';
import { model } from '../firebase';
import { ALERTS, EXPERIMENTS, LESSONS, STARTERS } from '../data';

type Msg = { role: 'user' | 'bot'; text: string };

const systemContext = `You are the SI Safety Assistant. Answer using only the verified NASA data below.
Do not invent facts, thresholds, or sources. If the data does not answer a question, say so.
When relevant, cite the dataset item by name and include its source URL. Distinguish NASA findings from recommendations or limitations in the data.

Verified NASA data:
${JSON.stringify({ experiments: EXPERIMENTS, alerts: ALERTS, lessons: LESSONS })}`;

export default function Assistant({ onClose }: { onClose: () => void }) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [msgs, typing]);

  const ask = async (q: string) => {
    if (!q.trim() || typing) return;
    setMsgs((m) => [...m, { role: 'user', text: q }]);
    setTyping(true);
    try {
      const result = await model.generateContent({
        systemInstruction: systemContext,
        contents: [{ role: 'user', parts: [{ type: 'text', text: q }] }],
      });
      const answer = result.response.text().trim();
      if (!answer) throw new Error('The model returned an empty response.');
      setMsgs((m) => [...m, { role: 'bot', text: answer }]);
    } catch (error) {
      console.error('Failed to generate assistant response:', error);
      setMsgs((m) => [
        ...m,
        { role: 'bot', text: 'Unable to generate an answer right now. Please try again.' },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <div>
          <div className="font-bold text-white text-sm flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b] animate-pulse" />SI Safety Assistant</div>
          <div className="text-[11px] text-slate-400">Answers cite only verified NASA data</div>
        </div>
        <button onClick={onClose} aria-label="Collapse assistant" className="w-8 h-8 rounded-full border border-white/10 text-slate-400 hover:text-white cursor-pointer">
          ›
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scroll-thin p-4 space-y-4">
        <div className="text-sm text-slate-300">
          Ask a question or tap a starter to get a structured engineering recommendation.
        </div>
        {msgs.length === 0 && (
          <div className="space-y-2">
            {STARTERS.map((s) => (
              <button
                key={s.q}
                onClick={() => ask(s.q)}
                className="w-full text-left text-sm rounded-2xl border border-amber-400/25 bg-amber-400/[0.04] hover:bg-amber-400/10 hover:border-amber-400/50 px-3.5 py-3 text-amber-50 cursor-pointer transition"
              >
                {s.q}
              </button>
            ))}
          </div>
        )}
        {msgs.map((m, i) =>
          m.role === 'user' ? (
            <div key={i} className="flex justify-end">
              <div className="max-w-[85%] bg-gradient-to-br from-orange-500/20 to-rose-800/20 border border-orange-400/30 text-orange-50 text-sm rounded-2xl rounded-br-sm px-3 py-2">
                {m.text}
              </div>
            </div>
          ) : (
            <div key={i} className="fade-up rounded-2xl rounded-bl-sm bg-white/[0.05] border border-white/10 p-3">
              <p className="text-sm text-slate-100 leading-relaxed whitespace-pre-wrap">{m.text}</p>
            </div>
          ),
        )}
        {typing && <div className="text-xs text-slate-500 font-mono">analyzing dataset…</div>}
        {msgs.length > 0 && !typing && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {STARTERS.map((s) => (
              <button
                key={s.q}
                onClick={() => ask(s.q)}
                className="text-[11px] rounded-full border border-white/10 px-2.5 py-1 text-slate-400 hover:text-white hover:border-amber-400/40 cursor-pointer"
              >
                {s.q.length > 38 ? s.q.slice(0, 36) + '…' : s.q}
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
          placeholder="Ask about detectors, rovers, materials…"
          className="flex-1 bg-white/5 border border-white/10 rounded-full px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400/50"
        />
        <button className="bg-gradient-to-r from-amber-400 to-orange-500 text-[#08070C] font-bold text-sm rounded-full px-5 cursor-pointer hover:brightness-110">Send</button>
      </form>
    </div>
  );
}
