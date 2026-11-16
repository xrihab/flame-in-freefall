type Entry = { k: string[]; a: string };

const KB: Entry[] = [
  { k: ["hello", "hi", "hey", "help"], a: "Hi! I'm the Flame in Freefall assistant. Ask me about flame shape, NASA experiments (SoFIE, FLEX, BASS, ACME, SAME), smoke detection, suppression, or lunar habitat safety." },
  { k: ["sphere", "spherical", "shape", "round", "teardrop", "blue"], a: "On Earth, buoyancy makes hot gas rise and gives flames a teardrop shape. In microgravity there is no buoyancy-driven convection, so flames become dim, blue, roughly spherical shapes." },
  { k: ["why different", "convection", "buoyancy", "gravity", "earth vs", "compare"], a: "Without gravity, hot gases don't rise and fresh oxygen isn't pulled in by convection. Oxygen reaches the flame mainly by slow diffusion, which changes flame shape, temperature, soot production and spread rate." },
  { k: ["sofie", "solid fuel", "ignition"], a: "SoFIE (Solid Fuel Ignition and Extinction) studies how solid materials ignite, burn and go out in microgravity, to help choose safer materials for spacecraft." },
  { k: ["flex", "extinguishment"], a: "FLEX (Flame Extinguishment Experiment) studied how flames of liquid fuel droplets burn and are put out in microgravity." },
  { k: ["bass", "burning and suppression"], a: "BASS (Burning and Suppression of Solids) examined how solid materials burn and how fires can be suppressed in microgravity." },
  { k: ["acme", "advanced combustion"], a: "ACME (Advanced Combustion via Microgravity Experiments) is a set of ISS combustion studies on flames in microgravity, aimed at better fuel efficiency and safety." },
  { k: ["same", "smoke aerosol"], a: "SAME (Smoke Aerosol Measurement Experiment) measured the particles produced by overheated materials to improve spacecraft smoke detection." },
  { k: ["fm2"], a: "FM2 is one of the microgravity combustion experiments featured in our NASA Experiment Explorer. Open that section of the dashboard for its findings and source links." },
  { k: ["apollo", "apollo 1"], a: "The Apollo 1 fire in 1967 showed how dangerous a pure-oxygen environment is, and it changed how NASA designs spacecraft and chooses materials." },
  { k: ["mir"], a: "A fire aboard the Mir space station in 1997 showed how serious fires can be on a long-duration station and shaped later fire-safety practices." },
  { k: ["extinguisher", "put out", "suppress", "co2", "suppression", "water mist"], a: "Suppression is harder in space because there's no convection to carry the extinguishing agent. Crews use CO2 extinguishers, and water-mist designs have also been developed. See our safety rules section for details." },
  { k: ["smoke", "detect", "alarm", "sensor"], a: "Smoke doesn't rise in microgravity, so detectors must sense small particles wherever they drift. Some microgravity flames are also very faint, which makes early detection important." },
  { k: ["lunar", "moon", "habitat", "mars", "rule", "guideline", "design"], a: "Our dashboard turns experimental data into design guidelines for spacecraft and lunar habitats: material selection, oxygen levels, detection, and suppression. Check the Safety Rules section." },
  { k: ["danger", "risk", "hazard", "toxic", "escape"], a: "Fire is among the most serious risks in space: the air is a closed system, escape routes are limited, and burning materials can release toxic gases." },
  { k: ["data", "source", "dataset", "psi", "ntrs", "resource", "link"], a: "Our sources include NASA Physical Sciences Informatics (PSI), the NASA Technical Reports Server (NTRS), and the 2026 Space Apps datasets. All are linked at the bottom of the page." },
  { k: ["team", "who", "built", "made"], a: "Flame in Freefall was built for the 2026 NASA Space Apps Challenge by Rihabuddin Mohammed, Farhan Shaik, Yash Vardhan Amduri and Harshith Vardhan Amduri." },
];

const FALLBACK =
  "I can help with flame shape, Earth vs. microgravity differences, NASA experiments (SoFIE, FLEX, BASS, ACME, SAME), smoke detection, suppression, and lunar habitat safety. Try one of those!";

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

function initChatbot(): void {
  if (document.getElementById("ff-btn")) return;

  const style = document.createElement("style");
  style.textContent = `
  #ff-btn{position:fixed;right:20px;bottom:20px;width:58px;height:58px;border-radius:50%;border:0;background:#ff6a1a;color:#fff;font-size:26px;cursor:pointer;z-index:99999;box-shadow:0 4px 16px rgba(0,0,0,.5)}
  #ff-box{position:fixed;right:20px;bottom:90px;width:340px;max-width:calc(100vw - 40px);height:440px;background:#08070C;color:#eee;border:1px solid #ff6a1a;border-radius:12px;display:none;flex-direction:column;z-index:99999;font:14px system-ui,sans-serif;overflow:hidden}
  #ff-box.open{display:flex}
  #ff-head{padding:12px 14px;background:#1a1420;font-weight:600}
  #ff-msgs{flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:8px}
  .ff-m{padding:8px 11px;border-radius:10px;max-width:88%;line-height:1.4}
  .ff-b{background:#1f1826;align-self:flex-start}
  .ff-u{background:#ff6a1a;color:#fff;align-self:flex-end}
  #ff-in{display:flex;border-top:1px solid #2a2230}
  #ff-in input{flex:1;padding:12px;background:#08070C;color:#eee;border:0;outline:0;font-size:14px}
  #ff-in button{padding:0 16px;background:#ff6a1a;color:#fff;border:0;cursor:pointer}`;
  document.head.appendChild(style);

  const btn = document.createElement("button");
  btn.id = "ff-btn";
  btn.textContent = "🔥";
  btn.setAttribute("aria-label", "Open chat");

  const box = document.createElement("div");
  box.id = "ff-box";
  box.innerHTML =
    '<div id="ff-head">Flame in Freefall Assistant</div>' +
    '<div id="ff-msgs"></div>' +
    '<form id="ff-in"><input placeholder="Ask about fire in space..." autocomplete="off"><button type="submit">Send</button></form>';

  document.body.append(btn, box);

  const msgs = box.querySelector("#ff-msgs") as HTMLDivElement;
  const form = box.querySelector("#ff-in") as HTMLFormElement;
  const input = form.querySelector("input") as HTMLInputElement;

  const add = (text: string, cls: string) => {
    const d = document.createElement("div");
    d.className = "ff-m " + cls;
    d.textContent = text;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  };

  add("Hi! Ask me anything about fire safety in microgravity.", "ff-b");
  btn.addEventListener("click", () => box.classList.toggle("open"));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = input.value.trim();
    if (!v) return;
    add(v, "ff-u");
    input.value = "";
    setTimeout(() => add(getReply(v), "ff-b"), 300);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initChatbot);
} else {
  initChatbot();
}
