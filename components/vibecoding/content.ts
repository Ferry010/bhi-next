// ─────────────────────────────────────────────────────────────────────────────
// Pricing. Set the real number here and it shows across both languages. Until
// then (while it still contains "["), the page shows a "custom quote" line
// instead of a broken price, so it is safe to ship before pricing is decided.
// ─────────────────────────────────────────────────────────────────────────────
export const VIBECODING_PRICE = {
  from: "€[bedrag]", // e.g. "€79" per person. Placeholder until set.
  minGroup: 6,
};
export const priceIsSet = !VIBECODING_PRICE.from.includes("[");

export type VibeContent = {
  lang: "en" | "nl";
  langSwitch: { href: string; label: string };
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    sub: string;
    cta: string;
    note: string;
  };
  not: { heading: string; sub: string; items: { label: string; text: string }[]; punch: string };
  what: { heading: string; body: string[]; points: { title: string; text: string }[] };
  about: { eyebrow: string; heading: string; body: string[]; caption: string };
  how: { heading: string; sub: string; steps: { title: string; text: string }[] };
  where: {
    heading: string;
    sub: string;
    yours: { title: string; text: string };
    ours: { title: string; text: string; bonusLabel: string; bonus: string };
  };
  pricing: { eyebrow: string; heading: string; unit: string; minLabel: string; quote: string; note: string };
  form: {
    heading: string;
    sub: string;
    name: string;
    email: string;
    company: string;
    groupSize: string;
    groupOptions: string[];
    location: string;
    locationOptions: string[];
    timing: string;
    message: string;
    submit: string;
    sending: string;
    privacy: string;
    success: { title: string; body: string };
  };
};

export const en: VibeContent = {
  lang: "en",
  langSwitch: { href: "/teamuitje", label: "Nederlands" },
  meta: {
    title: "Vibecoding | The Team Day Where You Actually Build Something",
    description:
      "Skip the escape room. A couple of hours of pure fun building real things with AI, in groups. At your place or our Rotterdam office. Bring your team.",
  },
  hero: {
    eyebrow: "Team day, done differently",
    title: "Skip the escape room. ",
    titleAccent: "Build something instead.",
    sub: "A couple of hours of pure fun, building real, working things with AI, in groups. No coding experience needed. No trust falls. Just your team, some laptops, and what you can make together.",
    cta: "Bring your team",
    note: "Any group size · at your place or our Rotterdam office",
  },
  not: {
    heading: "Not another escape room.",
    sub: "You have done the usual team outings. This one your team actually talks about afterwards.",
    items: [
      { label: "Not an escape room", text: "You solve it once, then forget it. Here you leave with something you made." },
      { label: "Not bowling", text: "Fun for an hour. This is fun and your team learns they can build with AI." },
      { label: "Not a survival weekend", text: "Nobody wants to be cold and muddy with their colleagues. Stay warm, stay curious." },
    ],
    punch: "Vibecoding is the one where you laugh a lot and walk out having built something real.",
  },
  what: {
    heading: "So, what is vibecoding?",
    body: [
      "You and your team spend a couple of hours building actual working things with AI. Apps, tools, little games, useful, useless, and gloriously both.",
      "No experience needed. That is the whole point. AI does the heavy lifting, your people bring the ideas. Everyone ships something, and everyone is surprised by what they made.",
    ],
    points: [
      { title: "AI does the coding", text: "You describe it, the AI builds it. Your team focuses on ideas, not syntax." },
      { title: "Genuinely fun", text: "Fast, hands-on and a little chaotic. The good kind of chaos." },
      { title: "Everyone ships", text: "By the end, every group has something real to show off. A proper show-and-tell." },
    ],
  },
  about: {
    eyebrow: "Your host",
    heading: "Meet Ferry, in the room all day",
    body: [
      "Ferry spends his year on stages across the globe getting rooms excited about working with AI instead of against it. Around 40 keynotes a year, in front of teams at GlaxoSmithKline, Unilever, VodafoneZiggo and the Dutch government, and he still talks to people like people.",
      "He is the one who makes the tech feel easy and the room feel loose. Sharp, funny, zero jargon, and genuinely thrilled when a team that swore they are not techy ships something they are proud of. Which is every single time.",
      "Short version: he is exactly who you want in the room when your team builds their first thing with AI.",
    ],
    caption: "Ferry, doing his favourite thing",
  },
  how: {
    heading: "How the day works",
    sub: "Come with the whole team, or split into small groups. We shape it around you.",
    steps: [
      { title: "Split into groups", text: "Small teams of a few people each. Mix departments, mix the people who never work together." },
      { title: "Build, for real", text: "A couple of hours of guided building with AI. We are in the room the whole time to keep it moving." },
      { title: "Show and tell", text: "Every group demos what they made. Expect surprises, applause, and a few happy accidents." },
    ],
  },
  where: {
    heading: "Where it happens",
    sub: "Your turf or ours. Both work great.",
    yours: {
      title: "At your place",
      text: "We bring the session to your office, anywhere. All your team needs is a room, some laptops and a bit of wifi.",
    },
    ours: {
      title: "At our Rotterdam office",
      text: "Right in the city centre. A change of scenery, and a small legendary bonus.",
      bonusLabel: "The bonus",
      bonus:
        "The viral crème brûlée sandwich shop is right underneath our office. Yes, we can serve them. Yes, they are as good as the internet says.",
    },
  },
  pricing: {
    eyebrow: "Pricing",
    heading: "Simple and per person.",
    unit: "per person",
    minLabel: `Minimum group of ${VIBECODING_PRICE.minGroup}`,
    quote: "Custom quote per group",
    note: "Tell us your group size and where, and we come back with an exact price and a date. No sales call needed.",
  },
  form: {
    heading: "Bring your team",
    sub: "Tell us a little about your group and we come back with a date and an exact quote, usually within one working day.",
    name: "Your name",
    email: "Work email",
    company: "Company",
    groupSize: "How big is your group?",
    groupOptions: ["Up to 10", "10 to 20", "20 to 40", "40 or more"],
    location: "Where would you like it?",
    locationOptions: ["At our Rotterdam office", "At our place", "Not sure yet"],
    timing: "Any date or timeframe in mind? (optional)",
    message: "Anything else we should know? (optional)",
    submit: "Get my quote",
    sending: "Sending…",
    privacy: "A real human reads this and replies. By sending you agree to our",
    success: {
      title: "Got it. This is going to be fun.",
      body: "We have your request and a human, Ferry or Jonathan, will come back with a date and an exact quote, usually within one working day.",
    },
  },
};

export const nl: VibeContent = {
  lang: "nl",
  langSwitch: { href: "/vibecoding", label: "English" },
  meta: {
    title: "Vibecoding | Het teamuitje waar je écht iets bouwt",
    description:
      "Geen escape room. Een paar uur puur plezier: samen echte dingen bouwen met AI, in groepjes. Bij jullie of op ons kantoor in Rotterdam. Neem je team mee.",
  },
  hero: {
    eyebrow: "Een teamuitje, maar dan anders",
    title: "Sla de escape room over. ",
    titleAccent: "Bouw samen iets echts.",
    sub: "Een paar uur puur plezier, samen echte, werkende dingen bouwen met AI, in groepjes. Geen programmeerervaring nodig. Geen trust falls. Gewoon je team, wat laptops, en wat jullie samen kunnen maken.",
    cta: "Neem je team mee",
    note: "Elke groepsgrootte · bij jullie of op ons kantoor in Rotterdam",
  },
  not: {
    heading: "Geen zoveelste escape room.",
    sub: "De standaard uitjes heb je gehad. Over dit uitje praat je team daarna nog na.",
    items: [
      { label: "Geen escape room", text: "Eén keer opgelost en weer vergeten. Hier ga je weg met iets dat je zelf maakte." },
      { label: "Geen bowlen", text: "Een uurtje lol. Dit is lol én je team ontdekt dat ze kunnen bouwen met AI." },
      { label: "Geen survivalweekend", text: "Niemand wil koud en modderig zijn met collega's. Lekker warm, lekker nieuwsgierig." },
    ],
    punch: "Vibecoding is dat uitje waar je veel lacht en naar buiten loopt met iets dat je écht gebouwd hebt.",
  },
  what: {
    heading: "Wat is vibecoding?",
    body: [
      "Jij en je team bouwen een paar uur lang echte, werkende dingen met AI. Apps, tools, kleine spelletjes, nuttig, nutteloos, en heerlijk allebei.",
      "Geen ervaring nodig. Dat is precies de bedoeling. AI doet het zware werk, jouw mensen brengen de ideeën. Iedereen levert iets op, en iedereen is verrast door wat ze maakten.",
    ],
    points: [
      { title: "AI doet het coderen", text: "Jij beschrijft het, de AI bouwt het. Je team focust op ideeën, niet op code." },
      { title: "Echt leuk", text: "Snel, hands-on en een beetje chaotisch. De goede soort chaos." },
      { title: "Iedereen levert iets op", text: "Aan het eind heeft elk groepje iets echts om te laten zien. Een echte show-and-tell." },
    ],
  },
  about: {
    eyebrow: "Je host",
    heading: "Dit is Ferry, de hele dag in de zaal",
    body: [
      "Ferry staat het hele jaar op podia over de hele wereld om zalen enthousiast te maken over wérken met AI in plaats van ertegen. Zo'n 40 keynotes per jaar, voor teams bij GlaxoSmithKline, Unilever, VodafoneZiggo en de Rijksoverheid, en hij praat nog steeds met mensen als mensen.",
      "Hij is degene die de techniek makkelijk laat voelen en de zaal los maakt. Scherp, grappig, nul jargon, en oprecht blij als een team dat zwoer 'niet technisch' te zijn iets maakt waar ze trots op zijn. Wat elke keer gebeurt.",
      "Kort gezegd: precies wie je in de zaal wil als je team voor het eerst iets bouwt met AI.",
    ],
    caption: "Ferry, in zijn element",
  },
  how: {
    heading: "Hoe de dag werkt",
    sub: "Kom met het hele team, of splits in kleine groepjes. We vormen het rond jullie.",
    steps: [
      { title: "Splits in groepjes", text: "Kleine teams van een paar mensen. Mix afdelingen, mix de mensen die nooit samenwerken." },
      { title: "Bouwen, echt waar", text: "Een paar uur begeleid bouwen met AI. We zijn de hele tijd in de zaal om het vaart te geven." },
      { title: "Show-and-tell", text: "Elk groepje demonstreert wat ze maakten. Verwacht verrassingen, applaus en een paar gelukkige ongelukjes." },
    ],
  },
  where: {
    heading: "Waar het gebeurt",
    sub: "Bij jullie of bij ons. Allebei top.",
    yours: {
      title: "Bij jullie op kantoor",
      text: "We brengen de sessie naar jullie toe, waar dan ook. Je team heeft alleen een ruimte, wat laptops en een beetje wifi nodig.",
    },
    ours: {
      title: "Op ons kantoor in Rotterdam",
      text: "Middenin het centrum. Even een andere omgeving, en een kleine legendarische bonus.",
      bonusLabel: "De bonus",
      bonus:
        "De virale crème brûlée tosti-zaak zit precies onder ons kantoor. Ja, we kunnen ze serveren. Ja, ze zijn zo goed als het internet zegt.",
    },
  },
  pricing: {
    eyebrow: "Prijs",
    heading: "Simpel en per persoon.",
    unit: "per persoon",
    minLabel: `Minimale groep van ${VIBECODING_PRICE.minGroup}`,
    quote: "Prijs op maat per groep",
    note: "Vertel ons je groepsgrootte en waar, dan komen we terug met een exacte prijs en een datum. Geen salesgesprek nodig.",
  },
  form: {
    heading: "Neem je team mee",
    sub: "Vertel ons kort iets over je groep, dan komen we terug met een datum en een exacte prijs, meestal binnen één werkdag.",
    name: "Je naam",
    email: "Werk-e-mail",
    company: "Bedrijf",
    groupSize: "Hoe groot is je groep?",
    groupOptions: ["Tot 10", "10 tot 20", "20 tot 40", "40 of meer"],
    location: "Waar wil je het?",
    locationOptions: ["Op ons kantoor in Rotterdam", "Bij ons op kantoor", "Weet ik nog niet"],
    timing: "Datum of periode in gedachten? (optioneel)",
    message: "Nog iets dat we moeten weten? (optioneel)",
    submit: "Vraag mijn prijs op",
    sending: "Versturen…",
    privacy: "Een echt mens leest dit en reageert. Door te versturen ga je akkoord met ons",
    success: {
      title: "Gelukt. Dit wordt leuk.",
      body: "We hebben je aanvraag en een mens, Ferry of Jonathan, komt terug met een datum en een exacte prijs, meestal binnen één werkdag.",
    },
  },
};
