// ─────────────────────────────────────────────────────────────────────────────
// Pricing. One flat price per GROUP (not per person), in three size tiers.
// Why tiers and not a per-person rate or a slider: a flat price reads more
// premium and skips the "request a quote" friction, three anchored options let
// the middle tier do the selling (most groups pick it), and a small "per person"
// line still gives buyers the "the more we bring, the better the value" feeling
// without making them do the maths. Numbers live here, once, for both languages.
//
// To change a price or a band, edit VIBECODING_TIERS. To hide prices again while
// they are being reconsidered, set pricingIsSet = false and the page falls back
// to a clean "custom quote" line instead of showing a broken price.
// ─────────────────────────────────────────────────────────────────────────────
export const VIBECODING_TIERS = [
  { minPeople: 4, maxPeople: 8, price: 1750 },
  { minPeople: 9, maxPeople: 15, price: 2450, popular: true },
  { minPeople: 16, maxPeople: 20, price: 2950 },
] as const;
export const pricingIsSet = true;

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
  not: {
    heading: string;
    sub: string;
    notLabel: string;
    items: { label: string; text: string }[];
    punch: string;
  };
  what: { heading: string; body: string[]; points: { title: string; text: string }[]; examplesLabel: string; examples: string[] };
  about: { eyebrow: string; heading: string; body: string[]; caption: string };
  how: { heading: string; sub: string; steps: { title: string; text: string }[] };
  where: {
    heading: string;
    sub: string;
    yours: { title: string; text: string; imageAlt: string };
    ours: { title: string; text: string; buildingAlt: string };
  };
  pricing: {
    eyebrow: string;
    heading: string;
    sub: string;
    popularLabel: string;
    peopleWord: string;
    approx: string;
    perPerson: string;
    atWord: string;
    tiers: { name: string; tagline: string }[];
    includes: string[];
    overflow: string;
    quote: string;
    cta: string;
    note: string;
  };
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
    timingOptions: string[];
    message: string;
    submit: string;
    sending: string;
    privacy: string;
    steps: {
      back: string;
      next: string;
      groupSizeQ: string;
      nameQ: string;
      locationQ: string;
      timingQ: string;
      timingHelp: string;
      contactQ: string;
      contactHelp: string;
    };
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
    note: "Groups of 4 to 20 · at your place or our Rotterdam office",
  },
  not: {
    heading: "Not another escape room.",
    sub: "You have done the usual team outings. This is the one your team actually talks about afterwards.",
    notLabel: "Not",
    items: [
      { label: "an escape room", text: "You solve it once, then forget it. Here you walk out with something you built yourself." },
      { label: "bowling", text: "Fun for an hour, then done. This is fun and your team discovers it can build with AI." },
      { label: "a survival weekend", text: "Nobody wants to be cold and muddy with their colleagues. Stay inside, stay curious." },
    ],
    punch: "Vibecoding is the one where you laugh a lot and walk out having built something real.",
  },
  what: {
    heading: "So, what is vibecoding?",
    body: [
      "You and your team spend a couple of hours building actual working things with AI. Apps, tools, little games, useful, useless, and gloriously both.",
      "Here is how it actually works: you type what you want in plain language, “build me a quiz that picks our next team lunch,” and the AI writes the code and puts a working thing on the screen. Don't like it? You just tell it what to change. That is the whole loop. Prompt, look, tweak, repeat.",
      "No experience needed. That is the whole point. AI does the heavy lifting, your people bring the ideas. Everyone ships something, and everyone is surprised by what they made.",
    ],
    examplesLabel: "What teams actually build",
    examples: [
      "A quiz that finally settles the team-lunch debate",
      "A name generator for the new project",
      "A tiny game with your colleagues as the characters",
      "A tool that fixes one annoying part of your own workflow",
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
      "Ferry is on stages around the world about 40 times a year, in front of teams at GlaxoSmithKline, Unilever, VodafoneZiggo and the Dutch government. His mission: get people working with AI instead of against it.",
      "His strength is making technology feel simple and carrying a room without any effort. Sharp, funny, zero jargon, and genuinely thrilled when a team that calls itself “not technical” suddenly builds something it is proud of. Which happens every single time.",
      "In short: exactly who you want in the room when your team builds its first real thing with AI.",
    ],
    caption: "Ferry, doing his favourite thing",
  },
  how: {
    heading: "How the day works",
    sub: "Come with the whole team, or split into small groups. We shape it around you.",
    steps: [
      { title: "Split into groups", text: "Small teams of a few people each. Mix departments, mix the people who never work together." },
      { title: "We build something real", text: "A couple of hours of guided building with AI. We are in the room the whole time to keep it moving." },
      { title: "Show and tell", text: "Every group demos what they made. Expect surprises, applause, and a few happy accidents." },
    ],
  },
  where: {
    heading: "Where it happens",
    sub: "Your turf or ours. Both work great.",
    yours: {
      title: "At your place",
      text: "We bring the session to your office, anywhere. All your team needs is a room, some laptops and a bit of wifi.",
      imageAlt: "Your office, wherever that is.",
    },
    ours: {
      title: "At our Rotterdam office",
      text: "In the iconic Groothandelsgebouw, right in the city centre. A change of scenery with zero hassle, we sort the room.",
      buildingAlt: "The Groothandelsgebouw in Rotterdam, home to our office.",
    },
  },
  pricing: {
    eyebrow: "Pricing",
    heading: "One clear price. Pick your group.",
    sub: "A half-day session of about three hours, host and facilitation included. You see the price before you decide, no sales call needed.",
    popularLabel: "Most chosen",
    peopleWord: "people",
    approx: "≈",
    perPerson: "per person",
    atWord: "at",
    tiers: [
      { name: "Small team", tagline: "A tight, hands-on crew." },
      { name: "Full team", tagline: "The sweet spot for most teams." },
      { name: "Big group", tagline: "The whole department, best value per head." },
    ],
    includes: [
      "Ferry hosting the whole session",
      "All the AI tools, set up and ready to go",
      "At your place or our Rotterdam office",
    ],
    overflow: "More than 20? We'll sort it out together, and it usually gets even better per head.",
    quote: "Custom quote per group",
    cta: "Bring your team",
    note: "One flat price for the group. The bigger your team, the less it works out to per person.",
  },
  form: {
    heading: "Bring your team",
    sub: "Tell us a little about your group and we come back with a date and an exact quote, usually within one working day.",
    name: "Your name",
    email: "Work email",
    company: "Company",
    groupSize: "How big is your group?",
    groupOptions: ["4 to 8", "9 to 15", "16 to 20", "More than 20"],
    location: "Where would you like it?",
    locationOptions: ["At our Rotterdam office", "At our place", "Not sure yet"],
    timing: "e.g. late May, or “still flexible”",
    timingOptions: ["This quarter", "Next quarter", "Still flexible"],
    message: "Anything else we should know? (optional)",
    submit: "Send it",
    sending: "Sending…",
    privacy: "A real human reads this and replies. By sending you agree to our",
    steps: {
      back: "Back",
      next: "Next",
      groupSizeQ: "How big is your team?",
      nameQ: "First things first, what should we call you?",
      locationQ: "Where would you like to host it?",
      timingQ: "Roughly when?",
      timingHelp: "A ballpark is fine, we lock the exact date together.",
      contactQ: "Where can we reach you?",
      contactHelp: "We come back with a date and confirm the price, usually within one working day.",
    },
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
    note: "Groepen van 4 tot 20 · bij jullie of op ons kantoor in Rotterdam",
  },
  not: {
    heading: "Niet wéér een escape room.",
    sub: "De standaard uitjes heb je gehad. Dit is het uitje waar je team daarna nog over napraat.",
    notLabel: "Geen",
    items: [
      { label: "escape room", text: "Eén keer opgelost en meteen weer vergeten. Hier loop je naar buiten met iets dat je zelf gebouwd hebt." },
      { label: "bowlen", text: "Een uurtje lol en klaar. Dit is lol én je team ontdekt dat het kan bouwen met AI." },
      { label: "survivalweekend", text: "Niemand wil koud en modderig zijn met z'n collega's. Lekker binnen, lekker nieuwsgierig." },
    ],
    punch: "Vibecoding is dat uitje waar je veel lacht en naar buiten loopt met iets dat je écht gebouwd hebt.",
  },
  what: {
    heading: "Wat is vibecoding?",
    body: [
      "Jij en je team bouwen een paar uur lang echte, werkende dingen met AI. Apps, tools, kleine spelletjes, nuttig, nutteloos, en heerlijk allebei.",
      "Zo werkt het echt: je typt in gewone taal wat je wil, “bouw een quiz die onze volgende teamlunch kiest,” en de AI schrijft de code en zet er een werkend ding neer. Niet tevreden? Je zegt gewoon wat er anders moet. Dat is de hele loop. Prompten, kijken, bijschaven, herhalen.",
      "Geen ervaring nodig. Dat is precies de bedoeling. AI doet het zware werk, jouw mensen brengen de ideeën. Iedereen levert iets op, en iedereen is verrast door wat ze maakten.",
    ],
    examplesLabel: "Wat teams echt bouwen",
    examples: [
      "Een quiz die de teamlunch-discussie eindelijk beslecht",
      "Een naamgenerator voor het nieuwe project",
      "Een spelletje met je collega's als de personages",
      "Een tool die dat ene irritante klusje in je eigen werk oplost",
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
      "Ferry staat zo'n 40 keer per jaar op podia over de hele wereld, voor teams bij GlaxoSmithKline, Unilever, VodafoneZiggo en de Rijksoverheid. Zijn missie: mensen laten wérken mét AI in plaats van ertegen.",
      "Zijn kracht is dat hij techniek simpel maakt en een zaal moeiteloos meekrijgt. Scherp, grappig, nul jargon, en oprecht blij als een team dat zichzelf “niet technisch” noemt ineens iets bouwt waar het trots op is. Wat elke keer weer gebeurt.",
      "Kortom: precies wie je in de zaal wil als je team voor het eerst iets echts bouwt met AI.",
    ],
    caption: "Ferry, in zijn element",
  },
  how: {
    heading: "Hoe de dag werkt",
    sub: "Kom met het hele team, of splits in kleine groepjes. We vormen het rond jullie.",
    steps: [
      { title: "Splits in groepjes", text: "Kleine teams van een paar mensen. Mix afdelingen, mix de mensen die nooit samenwerken." },
      { title: "We bouwen iets echts", text: "Een paar uur begeleid bouwen met AI. We zijn de hele tijd in de zaal om het vaart te geven." },
      { title: "Show-and-tell", text: "Elk groepje demonstreert wat ze maakten. Verwacht verrassingen, applaus en een paar gelukkige ongelukjes." },
    ],
  },
  where: {
    heading: "Waar het gebeurt",
    sub: "Bij jullie of bij ons. Allebei top.",
    yours: {
      title: "Bij jullie op kantoor",
      text: "We brengen de sessie naar jullie toe, waar dan ook. Je team heeft alleen een ruimte, wat laptops en een beetje wifi nodig.",
      imageAlt: "Jullie kantoor, waar dan ook.",
    },
    ours: {
      title: "Op ons kantoor in Rotterdam",
      text: "In het iconische Groothandelsgebouw, middenin het centrum. Even een andere omgeving, zonder gedoe: wij regelen de ruimte.",
      buildingAlt: "Het Groothandelsgebouw in Rotterdam, waar ons kantoor zit.",
    },
  },
  pricing: {
    eyebrow: "Prijs",
    heading: "Eén heldere prijs. Kies je groep.",
    sub: "Een dagdeel van zo'n drie uur, host en begeleiding inbegrepen. Je ziet de prijs vóór je beslist, geen salesgesprek nodig.",
    popularLabel: "Meest gekozen",
    peopleWord: "personen",
    approx: "≈",
    perPerson: "p.p.",
    atWord: "bij",
    tiers: [
      { name: "Klein team", tagline: "Een hecht, hands-on clubje." },
      { name: "Heel team", tagline: "De sweet spot voor de meeste teams." },
      { name: "Grote groep", tagline: "De hele afdeling, voordeligst per persoon." },
    ],
    includes: [
      "Ferry als host, de hele sessie",
      "Alle AI-tools, klaar voor gebruik",
      "Bij jullie of op ons kantoor in Rotterdam",
    ],
    overflow: "Meer dan 20? Dat regelen we samen, en per persoon wordt het meestal nóg voordeliger.",
    quote: "Prijs op maat per groep",
    cta: "Neem je team mee",
    note: "Eén vaste prijs voor de groep. Hoe groter je team, hoe lager het per persoon uitkomt.",
  },
  form: {
    heading: "Neem je team mee",
    sub: "Vertel ons kort iets over je groep, dan komen we terug met een datum en een exacte prijs, meestal binnen één werkdag.",
    name: "Je naam",
    email: "Werk-e-mail",
    company: "Bedrijf",
    groupSize: "Hoe groot is je groep?",
    groupOptions: ["4 tot 8", "9 tot 15", "16 tot 20", "Meer dan 20"],
    location: "Waar wil je het?",
    locationOptions: ["Op ons kantoor in Rotterdam", "Bij ons op kantoor", "Weet ik nog niet"],
    timing: "Bijv. eind mei, of “nog flexibel”",
    timingOptions: ["Dit kwartaal", "Volgend kwartaal", "Nog flexibel"],
    message: "Nog iets dat we moeten weten? (optioneel)",
    submit: "Versturen",
    sending: "Versturen…",
    privacy: "Een echt mens leest dit en reageert. Door te versturen ga je akkoord met ons",
    steps: {
      back: "Terug",
      next: "Volgende",
      groupSizeQ: "Hoe groot is je team?",
      nameQ: "Om te beginnen: wat mogen we je noemen?",
      locationQ: "Waar wil je het houden?",
      timingQ: "Wanneer ongeveer?",
      timingHelp: "Een grove indicatie is prima, de exacte datum prikken we samen.",
      contactQ: "Waar kunnen we je bereiken?",
      contactHelp: "We komen terug met een datum en bevestigen de prijs, meestal binnen één werkdag.",
    },
    success: {
      title: "Gelukt. Dit wordt leuk.",
      body: "We hebben je aanvraag en een mens, Ferry of Jonathan, komt terug met een datum en een exacte prijs, meestal binnen één werkdag.",
    },
  },
};
