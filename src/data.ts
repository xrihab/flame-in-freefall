export type EnvId = 'all' | 'iss' | 'lunar' | 'mars' | 'rover';

export const ENVIRONMENTS: { id: EnvId; label: string; short: string }[] = [
  { id: 'all', label: 'All Environments', short: 'All' },
  { id: 'iss', label: 'ISS (Low-Earth Orbit)', short: 'ISS' },
  { id: 'lunar', label: 'Lunar Habitat (0.16g High Oxygen)', short: 'Lunar' },
  { id: 'mars', label: 'Mars Base (0.38g Reduced Gravity)', short: 'Mars' },
  { id: 'rover', label: 'Pressurized Rover', short: 'Rover' },
];

export const LINKS = {
  psi: 'https://psi.nasa.gov/physci/repo/search?q=combustion&data_source=psi&data_type=investigation',
  combustion:
    'https://www.nasa.gov/glenn/glenn-expertise-space-exploration/physical-sciences-program/combustion-science/',
  youtube: 'https://www.youtube.com/watch?v=W1oXykoz9zg',
  guide: 'https://www.nasa.gov/missions/station/a-researchers-guide-to-combustion-science/',
  apollo1: 'https://sma.nasa.gov/sma-disciplines/accllp/apollo-1',
  apollo13: 'https://sma.nasa.gov/sma-disciplines/accllp/apollo-13',
  mir: 'https://www.nasa.gov/history/25-years-ago-fire-aboard-space-station-mir/',
  spin1: 'https://spinoff.nasa.gov/node/9582',
  spin2: 'https://spinoff.nasa.gov/node/9407',
  spin3: 'https://spinoff.nasa.gov/node/9918',
};

export type Level = 'Moderate' | 'Elevated' | 'High';

export interface Experiment {
  id: string;
  name: string;
  full: string;
  habitats: EnvId[]; // 'all' means every environment
  habitatLabels: string;
  relevance: number;
  fuel: string;
  condition: string;
  summary: string;
  spinoff: string;
  source: string;
  sourceLabel: string;
  spread: string;
  ignition: string;
  ignitionLevel: Level;
  suppression: string;
}

export const EXPERIMENTS: Experiment[] = [
  {
    id: 'sofie',
    name: 'SoFIE',
    full: 'Solid Fuel Ignition and Extinction',
    habitats: ['iss', 'lunar', 'mars'],
    habitatLabels: 'ISS · Lunar Habitat · Mars Base',
    relevance: 97,
    fuel: 'Solid spacecraft polymers & fabrics',
    condition: 'Microgravity (0g) & partial gravity',
    summary:
      'Evaluates material flammability in low-g because standard 1g ground tests (NASA-STD-6001) may underestimate space fire risks.',
    spinoff: 'Flame-resistant building materials',
    source: LINKS.combustion,
    sourceLabel: 'NASA Combustion Science',
    spread:
      'Flame spread over solid polymers and fabrics is measured directly in 0g and partial gravity instead of being extrapolated from 1g behavior.',
    ignition:
      'Material flammability screened only at 1g (NASA-STD-6001) may underestimate the ignition and burning risk of the same material in a low-g habitat.',
    ignitionLevel: 'High',
    suppression:
      'Extinction behavior of solid fuels is characterized in low-g; do not carry over 1g safety margins for suppression without low-g evidence.',
  },
  {
    id: 'fm2',
    name: 'FM2',
    full: 'Flammability of Materials on the Moon',
    habitats: ['lunar'],
    habitatLabels: 'Lunar Habitat (0.16g High Oxygen)',
    relevance: 96,
    fuel: 'Cotton-fiberglass blend (SIBAL fabric)',
    condition: '1/6th Lunar gravity (0.16g)',
    summary:
      'First experiment studying how solid materials ignite and burn specifically at lunar gravity levels to guide Artemis habitat safety.',
    spinoff: 'Safer aviation and industrial textiles',
    source: LINKS.combustion,
    sourceLabel: 'NASA Combustion Science',
    spread:
      'Studies how SIBAL fabric (cotton-fiberglass) ignites and burns at 0.16g, the first dataset aimed squarely at lunar gravity.',
    ignition:
      'Lunar habitats are defined here as 0.16g with high oxygen; both factors matter for ignition, which is why a lunar-specific dataset is needed.',
    ignitionLevel: 'High',
    suppression:
      'Findings are intended to guide Artemis habitat safety, including material selection and fire response planning at lunar gravity.',
  },
  {
    id: 'same',
    name: 'SAME',
    full: 'Smoke Aerosol Measurement Experiment',
    habitats: ['all'],
    habitatLabels: 'All Environments',
    relevance: 95,
    fuel: 'Hydrocarbon soot & recondensed plastic droplets',
    condition: 'Microgravity (0g)',
    summary:
      'Proved microgravity smoke produces different particle sizes than Earth fires, requiring calibrated optical detectors to avoid missed alarms.',
    spinoff: 'Brunswick Incipient Fire Detectors',
    source: LINKS.psi,
    sourceLabel: 'PSI Data Repository',
    spread:
      'Focused on smoke rather than flame spread: soot and recondensed plastic droplets form particles with different sizes than in Earth fires.',
    ignition:
      'The main exposure is a detection gap: detectors tuned to 1g smoke signatures may miss microgravity smoke and delay the alarm.',
    ignitionLevel: 'High',
    suppression:
      'Early detection comes first. Use calibrated optical detectors tuned to microgravity particle sizes so suppression can begin before a fire grows.',
  },
  {
    id: 'flex',
    name: 'FLEX',
    full: 'Flame Extinguishment Experiment',
    habitats: ['iss', 'rover'],
    habitatLabels: 'ISS · Pressurized Rover',
    relevance: 92,
    fuel: 'Liquid fuel droplets (heptane, methanol)',
    condition: 'Inert-gas dilution (CO2, helium) in 0g',
    summary:
      "Quantified limiting oxygen indexes and discovered flames can keep burning invisibly as low-temperature 'cool flames' after appearing extinguished.",
    spinoff: 'Cleaner, lower-emission vehicle engines',
    source: LINKS.psi,
    sourceLabel: 'PSI Data Repository',
    spread:
      'Burning of heptane and methanol droplets was observed in 0g while diluting the atmosphere with CO2 or helium.',
    ignition:
      "A flame that looks extinguished may persist as an invisible low-temperature 'cool flame', so visual confirmation alone is not enough.",
    ignitionLevel: 'Elevated',
    suppression:
      'Limiting oxygen indexes were quantified for CO2 and helium dilution. Verify extinction by means other than sight alone.',
  },
  {
    id: 'acme',
    name: 'ACME',
    full: 'Advanced Combustion via Microgravity Experiments',
    habitats: ['lunar', 'iss'],
    habitatLabels: 'Lunar Habitat (High Oxygen) · ISS',
    relevance: 91,
    fuel: 'Gaseous fuels in the ISS Combustion Integrated Rack',
    condition: 'Flicker-free 0g flames under varying oxygen levels',
    summary:
      'Studied soot reduction, flame stability, and extinction limits without gravity-driven buoyancy turbulence.',
    spinoff: 'High-efficiency, low-pollution industrial burners',
    source: LINKS.youtube,
    sourceLabel: 'NASA video (YouTube)',
    spread:
      'Without buoyancy-driven turbulence, 0g gas flames are flicker-free, letting flame stability be studied across oxygen levels.',
    ignition:
      'Oxygen level is the key variable studied, which is directly relevant to high-oxygen lunar habitat atmospheres.',
    ignitionLevel: 'Moderate',
    suppression:
      'Extinction limits were studied under varying oxygen levels and can inform oxygen-based suppression strategy.',
  },
  {
    id: 'bass',
    name: 'BASS',
    full: 'Burning and Suppression of Solids',
    habitats: ['iss', 'rover'],
    habitatLabels: 'ISS · Pressurized Rover',
    relevance: 90,
    fuel: 'Solid fuel samples',
    condition: 'Low-speed airflow (<1 cm/s) in 0g',
    summary:
      'Demonstrated that gentle ventilation airflow in microgravity can intensify dim blue flames and make them harder to extinguish.',
    spinoff: 'Improved spacecraft and terrestrial fire extinguishers',
    source: LINKS.guide,
    sourceLabel: "Researcher's Guide to Combustion Science",
    spread:
      'Gentle airflow below 1 cm/s in 0g can intensify dim blue flames on solid fuel samples.',
    ignition:
      'Ventilation is not a neutral factor: even very slow airflow, as in a small cabin, can strengthen an existing flame.',
    ignitionLevel: 'Elevated',
    suppression:
      'Flames in gentle airflow are harder to extinguish. Treat ventilation state as a variable in suppression procedures.',
  },
];

export function matchesEnv(habitats: EnvId[], env: EnvId) {
  return env === 'all' || habitats.includes('all') || habitats.includes(env);
}

/** Environment-weighted relevance: NASA-listed relevance plus a small specificity bonus. */
export function weightedScore(e: Experiment, env: EnvId) {
  if (env === 'all') return e.relevance;
  if (e.habitats.includes('all')) return e.relevance;
  const bonus = e.habitats.length === 1 ? 3 : e.habitats.length === 2 ? 2 : 1;
  return Math.min(99, e.relevance + bonus);
}

export interface Alert {
  id: string;
  habitats: EnvId[];
  severity: 'critical' | 'warning' | 'advisory';
  title: string;
  body: string;
  ref: string;
}

export const ALERTS: Alert[] = [
  {
    id: 'a1',
    habitats: ['all'],
    severity: 'critical',
    title: 'Detector calibration gap',
    body: 'Microgravity smoke has different particle sizes than Earth fires. Uncalibrated detectors risk missed alarms.',
    ref: 'SAME',
  },
  {
    id: 'a2',
    habitats: ['iss', 'mars', 'lunar'],
    severity: 'warning',
    title: '1g ground tests may underestimate risk',
    body: 'NASA-STD-6001 results at 1g may understate material flammability in low-g habitats.',
    ref: 'SoFIE',
  },
  {
    id: 'a3',
    habitats: ['lunar'],
    severity: 'critical',
    title: 'High-oxygen, 0.16g material exposure',
    body: 'Lunar-gravity burning of SIBAL fabric is under study; qualify habitat textiles at 0.16g, not 1g.',
    ref: 'FM2 · ACME',
  },
  {
    id: 'a4',
    habitats: ['iss', 'rover'],
    severity: 'warning',
    title: 'Ventilation can intensify flames',
    body: 'Airflow under 1 cm/s can strengthen dim blue flames and make them harder to extinguish.',
    ref: 'BASS',
  },
  {
    id: 'a5',
    habitats: ['iss', 'rover'],
    severity: 'advisory',
    title: "Invisible 'cool flames'",
    body: 'A flame can keep burning at low temperature after appearing extinguished.',
    ref: 'FLEX',
  },
];

export interface Lesson {
  id: string;
  kind: 'lesson' | 'spinoff';
  tag: string;
  title: string;
  body: string;
  outcome?: string;
  link: string;
  linkLabel: string;
}

export const LESSONS: Lesson[] = [
  {
    id: 'apollo1',
    kind: 'lesson',
    tag: '1967',
    title: 'Apollo 1',
    body: 'A 100% pure oxygen cabin atmosphere caused an instant flash fire during a pad test.',
    outcome: 'Led to non-flammable materials and quick-release hatches.',
    link: LINKS.apollo1,
    linkLabel: 'NASA SMA: Apollo 1',
  },
  {
    id: 'apollo13',
    kind: 'lesson',
    tag: '1970',
    title: 'Apollo 13',
    body: 'Damaged Teflon wire insulation inside a high-pressure oxygen tank caused an explosion.',
    outcome: 'Led to strict wiring insulation and tank safety standards.',
    link: LINKS.apollo13,
    linkLabel: 'NASA SMA: Apollo 13',
  },
  {
    id: 'mir',
    kind: 'lesson',
    tag: '1997',
    title: 'Mir Space Station Fire',
    body: 'A solid-fuel oxygen generator canister ignited, filling modules with toxic smoke.',
    outcome: 'Proved the need for rapid smoke clearing and clear escape routes.',
    link: LINKS.mir,
    linkLabel: 'NASA History: Mir fire',
  },
  {
    id: 'spin1',
    kind: 'spinoff',
    tag: 'Spinoff 1',
    title: 'Lightweight Firefighter Air Tanks',
    body: 'Composite tanks pressurized at 4,500 psi that weigh 13 lbs less than older tanks.',
    link: LINKS.spin1,
    linkLabel: 'NASA Spinoff',
  },
  {
    id: 'spin2',
    kind: 'spinoff',
    tag: 'Spinoff 2',
    title: 'Brunswick Incipient Fire Detector',
    body: 'Space shuttle sensor technology that distinguishes combustion particles from dust to stop false alarms.',
    link: LINKS.spin2,
    linkLabel: 'NASA Spinoff',
  },
  {
    id: 'spin3',
    kind: 'spinoff',
    tag: 'Spinoff 3',
    title: 'Project FIRES Protective Gear',
    body: 'Apollo spacesuit-derived heat-protective materials for municipal firefighters.',
    link: LINKS.spin3,
    linkLabel: 'NASA Spinoff',
  },
];

/* ---------- Chart data (illustrative trend model) ---------- */
export const GRAVITY_POINTS = [
  { id: '1g', label: 'Earth', g: '1g' },
  { id: '0.38g', label: 'Mars', g: '0.38g' },
  { id: '0.16g', label: 'Lunar', g: '0.16g' },
  { id: '0g', label: 'Microgravity', g: '0g' },
];

export const METRICS = [
  {
    id: 'temp',
    label: 'Flame Temperature',
    unit: '°C',
    values: [1400, 1260, 1180, 1050],
    note: 'Buoyancy-driven mixing weakens as gravity drops, so flames run cooler and rounder.',
    color: '#ff7a3d',
  },
  {
    id: 'smoke',
    label: 'Smoke Particle Size',
    unit: 'µm',
    values: [0.15, 0.25, 0.35, 0.6],
    note: 'Soot lingers in the flame longer without buoyant flow, so smoke particle sizes shift. This is why SAME calls for calibrated optical detectors.',
    color: '#38d6e8',
  },
  {
    id: 'spread',
    label: 'Flame Spread Speed',
    unit: 'mm/s',
    values: [8, 11, 13, 6],
    note: 'Partial gravity can sustain spread. Near-zero airflow slows it, but even gentle airflow (BASS) can intensify flames.',
    color: '#facc15',
  },
];

/* ---------- Assistant ---------- */
export interface Answer {
  headline: string;
  recommendation: string;
  evidence: { name: string; text: string; link: string }[];
  actions: string[];
  caveat: string;
}

const A_LUNAR: Answer = {
  headline: 'Lunar base smoke detection',
  recommendation:
    'SAME (Smoke Aerosol Measurement Experiment) is the best-fit study, supported by FM2 for lunar material behavior.',
  evidence: [
    {
      name: 'SAME · 95% relevance',
      text: 'Microgravity smoke produces different particle sizes than Earth fires, so calibrated optical detectors are required to avoid missed alarms.',
      link: LINKS.psi,
    },
    {
      name: 'FM2 · 96% relevance',
      text: 'First study of how solid materials ignite and burn at lunar gravity (0.16g), using SIBAL fabric, to guide Artemis habitat safety.',
      link: LINKS.combustion,
    },
    {
      name: 'ACME · 91% relevance',
      text: 'Studied flame stability and extinction limits under varying oxygen levels, relevant to high-oxygen lunar atmospheres.',
      link: LINKS.youtube,
    },
  ],
  actions: [
    'Calibrate optical smoke detectors to low-g particle sizes rather than 1g smoke signatures.',
    'Evaluate detector options similar in principle to the Brunswick Incipient Fire Detector, which separates combustion particles from dust.',
    'Qualify habitat textiles for 0.16g and high oxygen rather than relying on 1g data.',
  ],
  caveat:
    'The dataset does not give lunar-specific smoke particle sizes. Detector thresholds still need test validation.',
};

const A_MARS: Answer = {
  headline: 'Mars base material flammability',
  recommendation: 'SoFIE is the primary reference for 0.38g habitat materials.',
  evidence: [
    {
      name: 'SoFIE · 97% relevance',
      text: 'Evaluates solid spacecraft polymers and fabrics in microgravity and partial gravity. Standard 1g tests (NASA-STD-6001) may underestimate space fire risk.',
      link: LINKS.combustion,
    },
    {
      name: 'SAME · 95% relevance',
      text: 'Applies to all environments: smoke detection must account for different particle sizes.',
      link: LINKS.psi,
    },
  ],
  actions: [
    'Do not accept 1g NASA-STD-6001 results alone for Mars habitat materials.',
    'Request partial-gravity flammability evidence for polymers and fabrics.',
    'Apply calibrated optical detection in all Mars habitat modules.',
  ],
  caveat:
    'The verified dataset lists SoFIE for partial gravity but gives no Mars-specific numeric thresholds.',
};

const A_ROVER: Answer = {
  headline: 'Pressurized rover suppression',
  recommendation:
    'Combine FLEX and BASS: verify extinction, and manage ventilation during a fire.',
  evidence: [
    {
      name: 'BASS · 90% relevance',
      text: 'Gentle airflow (<1 cm/s) in microgravity can intensify dim blue flames and make them harder to extinguish.',
      link: LINKS.guide,
    },
    {
      name: 'FLEX · 92% relevance',
      text: "Quantified limiting oxygen indexes with CO2 and helium dilution, and found flames can persist invisibly as low-temperature 'cool flames'.",
      link: LINKS.psi,
    },
    {
      name: 'SAME · 95% relevance',
      text: 'Calibrated optical detectors are needed to avoid missed alarms.',
      link: LINKS.psi,
    },
  ],
  actions: [
    'Include ventilation state in the fire response procedure; gentle airflow is not neutral.',
    'Consider inert-gas dilution (CO2) guided by limiting oxygen index data.',
    "Do not declare a fire out on visual inspection alone, because of 'cool flames'.",
  ],
  caveat:
    'Rover volume and gas-handling limits are not covered by the verified dataset.',
};

const A_GROUND: Answer = {
  headline: 'Limits of 1g ground testing',
  recommendation:
    'Treat 1g results as a screening step only. Confirm with low-g or partial-gravity evidence.',
  evidence: [
    {
      name: 'SoFIE · 97% relevance',
      text: 'Standard 1g ground tests (NASA-STD-6001) may underestimate space fire risks for solid materials.',
      link: LINKS.combustion,
    },
    {
      name: 'SAME · 95% relevance',
      text: 'Smoke particle sizes in microgravity differ from Earth fires.',
      link: LINKS.psi,
    },
    {
      name: 'ACME · 91% relevance',
      text: 'Without gravity-driven buoyancy turbulence, flames behave differently (flicker-free, different soot and stability behavior).',
      link: LINKS.youtube,
    },
  ],
  actions: [
    'Flag any material cleared only by 1g testing for low-g review.',
    'Validate detectors against low-g smoke, not Earth smoke.',
    'Use the Comparison Chart to see how behavior shifts with gravity.',
  ],
  caveat:
    'Chart values on this dashboard are illustrative trends, not NASA measurements.',
};

const A_APOLLO: Answer = {
  headline: 'Historical lessons',
  recommendation:
    'Three flight events define spacecraft fire design rules: Apollo 1, Apollo 13, and the Mir fire.',
  evidence: [
    {
      name: 'Apollo 1 (1967)',
      text: '100% pure oxygen caused an instant flash fire, leading to non-flammable materials and quick-release hatches.',
      link: LINKS.apollo1,
    },
    {
      name: 'Apollo 13 (1970)',
      text: 'Damaged Teflon wire insulation in a high-pressure oxygen tank caused an explosion, leading to strict wiring and tank standards.',
      link: LINKS.apollo13,
    },
    {
      name: 'Mir (1997)',
      text: 'A solid-fuel oxygen generator canister ignited and filled modules with toxic smoke.',
      link: LINKS.mir,
    },
  ],
  actions: [
    'Minimize oxygen-enriched exposure of flammable materials.',
    'Control wire insulation and pressurized oxygen hardware.',
    'Plan for rapid smoke clearing and clear escape routes.',
  ],
  caveat: 'See the Lessons & Spinoffs tab for source links.',
};

const A_SPINOFF: Answer = {
  headline: 'Earth safety spinoffs',
  recommendation: 'NASA fire research already supports firefighters and industry on Earth.',
  evidence: [
    {
      name: 'Brunswick Incipient Fire Detector',
      text: 'Space shuttle sensor technology that distinguishes combustion particles from dust to stop false alarms.',
      link: LINKS.spin2,
    },
    {
      name: 'Lightweight Firefighter Air Tanks',
      text: 'Composite tanks pressurized at 4,500 psi that weigh 13 lbs less than older tanks.',
      link: LINKS.spin1,
    },
    {
      name: 'Project FIRES Protective Gear',
      text: 'Apollo spacesuit-derived heat-protective materials for municipal firefighters.',
      link: LINKS.spin3,
    },
  ],
  actions: [
    'Reuse detector discrimination approaches to limit false alarms in crewed habitats.',
    'Review the Earth Spinoff tags on each experiment card for further transfer.',
  ],
  caveat: 'Spinoff details are limited to the verified NASA pages linked above.',
};

export const STARTERS: { q: string; a: Answer }[] = [
  { q: 'Which NASA study best informs Lunar base smoke detectors?', a: A_LUNAR },
  { q: 'What does the data say about Mars base material flammability?', a: A_MARS },
  { q: 'How should a pressurized rover approach fire suppression?', a: A_ROVER },
  { q: 'Why can’t we rely on 1g ground tests for space fire safety?', a: A_GROUND },
];

export function answerFor(text: string): Answer {
  const t = text.toLowerCase();
  if (/smoke|detect|alarm|lunar|moon|artemis/.test(t)) return A_LUNAR;
  if (/mars|material|fabric|polymer|flammab/.test(t)) return A_MARS;
  if (/rover|suppress|extinguish|vent|airflow|co2|cool flame/.test(t)) return A_ROVER;
  if (/1g|ground|earth|gravity|test/.test(t)) return A_GROUND;
  if (/apollo|mir|histor|lesson/.test(t)) return A_APOLLO;
  if (/spinoff|firefight|tank|spin/.test(t)) return A_SPINOFF;
  return {
    headline: 'Outside the verified dataset',
    recommendation:
      'I can only answer from the six verified NASA PSI experiments (SoFIE, FM2, SAME, FLEX, ACME, BASS) and the historical lessons shown here.',
    evidence: [],
    actions: [
      'Try asking about smoke detectors, material flammability, suppression, ground testing, historical fires, or spinoffs.',
    ],
    caveat: 'No recommendation is made without a supporting source.',
  };
}
