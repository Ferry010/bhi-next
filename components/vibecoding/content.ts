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
  about: { heading: string; body: string[]; caption: string };
  how: { heading: string; sub: string; steps: { title: string; text: string }[] };
  where: {
    heading: string;
    sub: string;
    yours: { title: string; text: string; imageAlt: string };
    ours: { title: string; text: string; buildingAlt: string };
  };
  why: { heading: string; sub: string; items: { title: string; text: string }[] };
  pricing: {
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
      "No escape room. In a couple of hours your team builds real things with AI. At your place or ours in Rotterdam. Bring your team.",
  },
  hero: {
    title: "Skip the escape room. ",
    titleAccent: "Build something real.",
    sub: "A couple of hours, your team, a few laptops. By the end everyone has built something with AI that didn't exist that morning. No experience needed.",
    cta: "Bring your team",
    note: "Groups of 4 to 20 · at your place or ours in Rotterdam",
  },
  not: {
    heading: "Not another escape room.",
    sub: "You know the usual outings. This is the one your team still brings up on Monday.",
    notLabel: "Not",
    items: [
      { label: "an escape room", text: "Solved once, forgotten by lunch. Here you take home something you built yourself." },
      { label: "bowling", text: "Fun for an hour. After this, your team knows it can build with AI. That sticks around longer." },
      { label: "a survival weekend", text: "Cold, muddy, and nobody really wanted it. We stay inside. With coffee." },
    ],
    punch: "You laugh a lot, and you walk out with something that works. Try that at the bowling alley.",
  },
  what: {
    heading: "So, what is vibecoding?",
    body: [
      "Your team spends a couple of hours building real things with AI. Apps, tools, little games. Useful, useless, usually both at once.",
      "How it works: you type what you want in plain language. “Build a quiz that picks our next team lunch.” The AI writes the code and puts a working thing on screen. Not right? You tell it what to change. Prompt, look, tweak. That is the whole thing.",
      "Nobody needs to know how to code. The AI does the heavy lifting, your people decide what it should become. And everyone is surprised by what comes out of their own hands.",
    ],
    examplesLabel: "What teams actually build",
    examples: [
      "A quiz that settles the team-lunch debate for good",
      "A name generator for the project that still has no name",
      "A little game with your colleagues as the characters",
      "A tool that removes that one annoying task from your week",
    ],
    points: [
      { title: "AI does the typing", text: "You say what you want, the AI builds it. Your team thinks, not about semicolons." },
      { title: "Actually fun", text: "Fast, messy, hands-on. The way making things is supposed to feel." },
      { title: "Everyone ships", text: "By the end every group has something that works to show off. Bragging included." },
    ],
  },
  about: {
    heading: "Meet Ferry, in the room all day",
    body: [
      "Ferry is on a stage about 40 times a year, in front of teams at GlaxoSmithKline, Unilever, VodafoneZiggo and the Dutch government. Always the same point: get people working with AI instead of against it.",
      "He makes the tech feel small and the room feel loose. Sharp, funny, zero jargon. At his best when a team that calls itself “not technical” suddenly builds something it is proud of. Which happens every time.",
      "He is exactly who you want there when your team builds its first real thing with AI.",
    ],
    caption: "Ferry, doing his favourite thing",
  },
  how: {
    heading: "How the day works",
    sub: "Come as one team or split into groups. We shape it around you.",
    steps: [
      { title: "Split into groups", text: "Small teams of a few people. Put the ones who never work together in the same group." },
      { title: "We build something real", text: "A couple of hours building with AI, us right next to you keeping the pace. No theory, straight to making." },
      { title: "Show and tell", text: "Every group shows what it made. Expect surprises, applause, and a few happy accidents." },
    ],
  },
  where: {
    heading: "Where it happens",
    sub: "Your place or ours. Both are great.",
    yours: {
      title: "At your place",
      text: "We come to you, wherever you are. You need a room, some laptops and a bit of wifi. That is it.",
      imageAlt: "Your office, wherever that is.",
    },
    ours: {
      title: "At our Rotterdam office",
      text: "In the Groothandelsgebouw, right in the city centre. Different walls, different energy. We sort the room.",
      buildingAlt: "The Groothandelsgebouw in Rotterdam, home to our office.",
    },
  },
  why: {
    heading: "More than a fun outing",
    sub: "You go home with the laughs and something that sticks.",
    items: [
      { title: "Fun and real skills", text: "A day of laughing, and your team picks up AI skills it can already use on Monday." },
      { title: "Everything is included", text: "We sort the tokens and licenses for Claude, Cursor, Replit and the rest. No surprises on the invoice." },
      { title: "Useful by Monday", text: "What your team builds and figures out, it uses in real work the very next week." },
      { title: "One great host, all day", text: "Ferry, 40+ AI stages a year. He keeps it light, sharp and jargon-free." },
    ],
  },
  pricing: {
    heading: "One clear price. Pick your group.",
    sub: "A half-day of about three hours, host and facilitation included. You see the price right away. No sales call.",
    popularLabel: "Most chosen",
    peopleWord: "people",
    approx: "≈",
    perPerson: "per person",
    atWord: "at",
    tiers: [
      { name: "Small team", tagline: "A tight crew, all hands on deck." },
      { name: "Full team", tagline: "The sweet spot for most teams." },
      { name: "Big group", tagline: "The whole department. Best value per head." },
    ],
    includes: [
      "Ferry hosting the whole session",
      "All AI tools, licenses and tokens included",
      "At your place or ours in Rotterdam",
    ],
    overflow: "More than 20? We'll sort it out together, and per person it usually only gets better.",
    quote: "Custom quote per group",
    cta: "Bring your team",
    note: "One flat price for the group. The bigger your team, the less it is per person.",
  },
  form: {
    heading: "Bring your team",
    sub: "Tell us a bit about your group. We come back with a date and the price, usually within one working day.",
    name: "Your name",
    email: "Work email",
    company: "Company",
    groupSize: "How big is your group?",
    groupOptions: ["4 to 8", "9 to 15", "16 to 20", "More than 20"],
    location: "Where would you like it?",
    locationOptions: ["At Brand Humanizing in Rotterdam", "At our own office", "Not sure yet"],
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
      nameQ: "What's your name?",
      locationQ: "Where would you like to host it?",
      timingQ: "Roughly when?",
      timingHelp: "A ballpark is fine. We lock the exact date together.",
      contactQ: "Where can we reach you?",
      contactHelp: "We come back with a date and the price, usually within one working day.",
    },
    success: {
      title: "Got it.",
      body: "Ferry or Jonathan will come back to you personally with a date and the price, usually within one working day.",
    },
  },
};

export const nl: VibeContent = {
  lang: "nl",
  langSwitch: { href: "/vibecoding", label: "English" },
  meta: {
    title: "Vibecoding | Het teamuitje waar je écht iets bouwt",
    description:
      "Geen escape room. In een paar uur bouwt je team echte dingen met AI. Bij jullie of bij ons in Rotterdam. Neem je team mee.",
  },
  hero: {
    title: "Sla de escape room over. ",
    titleAccent: "Bouw samen iets echts.",
    sub: "Een paar uur, je team, een paar laptops. Aan het eind heeft iedereen iets met AI gebouwd dat er 's ochtends nog niet was. Geen ervaring nodig.",
    cta: "Neem je team mee",
    note: "Groepen van 4 tot 20 · bij jullie of bij ons in Rotterdam",
  },
  not: {
    heading: "Niet wéér een escape room.",
    sub: "De standaard uitjes ken je. Dit is er een waar je team maandag nog over doorgaat.",
    notLabel: "Geen",
    items: [
      { label: "escape room", text: "Eén keer opgelost, meteen weer vergeten. Hier neem je iets mee naar huis dat je zelf hebt gebouwd." },
      { label: "bowlen", text: "Leuk voor een uurtje. Hierna weet je team dat het zelf iets kan bouwen met AI. Dat blijft langer hangen." },
      { label: "survivalweekend", text: "Koud, modderig, en niemand die het echt wilde. Wij blijven binnen. Met koffie." },
    ],
    punch: "Je lacht je rot, en je loopt naar buiten met iets dat werkt. Probeer dat maar eens bij het bowlen.",
  },
  what: {
    heading: "Wat is vibecoding?",
    body: [
      "Je team bouwt een paar uur lang echte dingen met AI. Apps, tools, spelletjes. Nuttig, nutteloos, meestal allebei tegelijk.",
      "Hoe het werkt: je typt in gewone taal wat je wil. “Bouw een quiz die onze volgende teamlunch kiest.” De AI schrijft de code en zet er een werkend ding neer. Niet goed? Je zegt gewoon wat er anders moet. Prompten, kijken, bijschaven. Dat is het.",
      "Niemand hoeft te kunnen programmeren. De AI doet het zware werk, jouw mensen bedenken wat het moet worden. En iedereen is verbaasd over wat er uit hun eigen handen komt.",
    ],
    examplesLabel: "Wat teams zoal bouwen",
    examples: [
      "Een quiz die de teamlunch-discussie voorgoed beslecht",
      "Een naamgenerator voor het project dat nog geen naam heeft",
      "Een spelletje met je collega's in de hoofdrol",
      "Een tool die dat ene irritante klusje uit je week haalt",
    ],
    points: [
      { title: "AI doet het typewerk", text: "Jij zegt wat je wil, de AI bouwt het. Jouw team denkt na, niet over puntkomma's." },
      { title: "Gewoon leuk", text: "Snel, rommelig, hands-on. Precies zoals maken hoort te voelen." },
      { title: "Iedereen levert iets op", text: "Aan het eind heeft elk groepje iets werkends om te laten zien. Opscheppen inbegrepen." },
    ],
  },
  about: {
    heading: "Dit is Ferry, de hele dag in de zaal",
    body: [
      "Ferry staat zo'n 40 keer per jaar op een podium, van teams bij GlaxoSmithKline, Unilever en VodafoneZiggo tot de Rijksoverheid. Altijd hetzelfde punt: mensen laten wérken mét AI in plaats van ertegen.",
      "Hij maakt de techniek klein en de zaal los. Scherp, grappig, nul jargon. Op zijn best als een team dat zichzelf “niet technisch” noemt ineens iets bouwt waar het trots op is. Wat elke keer gebeurt.",
      "Precies wie je erbij wil als je team voor het eerst iets echts bouwt met AI.",
    ],
    caption: "Ferry, in zijn element",
  },
  how: {
    heading: "Hoe de dag werkt",
    sub: "Kom met het hele team of splits in groepjes. We vormen het rond jullie.",
    steps: [
      { title: "Splits in groepjes", text: "Kleine teams van een paar mensen. Zet de mensen bij elkaar die anders nooit samenwerken." },
      { title: "We bouwen iets echts", text: "Een paar uur bouwen met AI, wij ernaast om het vaart te houden. Geen theorie, meteen maken." },
      { title: "Show-and-tell", text: "Elk groepje laat zien wat het maakte. Verwacht verrassingen, applaus, en een paar gelukkige ongelukjes." },
    ],
  },
  where: {
    heading: "Waar het gebeurt",
    sub: "Bij jullie of bij ons. Allebei prima.",
    yours: {
      title: "Bij jullie op kantoor",
      text: "Wij komen naar jullie toe, waar dan ook. Je hebt een ruimte, wat laptops en een beetje wifi nodig. Meer niet.",
      imageAlt: "Jullie kantoor, waar dan ook.",
    },
    ours: {
      title: "Op ons kantoor in Rotterdam",
      text: "In het Groothandelsgebouw, middenin het centrum. Andere muren, andere energie. De ruimte regelen wij.",
      buildingAlt: "Het Groothandelsgebouw in Rotterdam, waar ons kantoor zit.",
    },
  },
  why: {
    heading: "Meer dan een leuk uitje",
    sub: "Je gaat naar huis met de lol én iets dat blijft hangen.",
    items: [
      { title: "Plezier én skills", text: "Een dag lachen, en je team pikt en passant AI-vaardigheden op waar het maandag al iets aan heeft." },
      { title: "Alles zit in de prijs", text: "De tokens en licenties voor Claude, Cursor, Replit en de rest regelen wij. Geen verrassingen op de factuur." },
      { title: "Maandag al bruikbaar", text: "Wat je team bouwt en ontdekt, gebruikt het de week erna gewoon in het echte werk." },
      { title: "Eén top-host, de hele dag", text: "Ferry, 40+ podia per jaar over AI. Hij houdt het licht, scherp en zonder jargon." },
    ],
  },
  pricing: {
    heading: "Eén heldere prijs. Kies je groep.",
    sub: "Een dagdeel van zo'n drie uur, host en begeleiding erbij. Je ziet de prijs meteen. Geen salesgesprek.",
    popularLabel: "Meest gekozen",
    peopleWord: "personen",
    approx: "≈",
    perPerson: "p.p.",
    atWord: "bij",
    tiers: [
      { name: "Klein team", tagline: "Hecht clubje, alle handen aan de knoppen." },
      { name: "Heel team", tagline: "De sweet spot voor de meeste teams." },
      { name: "Grote groep", tagline: "De hele afdeling. Per persoon het voordeligst." },
    ],
    includes: [
      "Ferry als host, de hele sessie",
      "Alle AI-tools, licenties én tokens inbegrepen",
      "Bij jullie of bij ons in Rotterdam",
    ],
    overflow: "Meer dan 20? Dat regelen we samen, en per persoon wordt het meestal alleen maar gunstiger.",
    quote: "Prijs op maat per groep",
    cta: "Neem je team mee",
    note: "Eén vaste prijs voor de groep. Hoe groter je team, hoe minder het per persoon is.",
  },
  form: {
    heading: "Neem je team mee",
    sub: "Vertel kort iets over je groep. We komen terug met een datum en de prijs, meestal binnen een werkdag.",
    name: "Je naam",
    email: "Werk-e-mail",
    company: "Bedrijf",
    groupSize: "Hoe groot is je groep?",
    groupOptions: ["4 tot 8", "9 tot 15", "16 tot 20", "Meer dan 20"],
    location: "Waar wil je het?",
    locationOptions: ["Bij Brand Humanizing in Rotterdam", "Op onze eigen locatie", "Weet ik nog niet"],
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
      nameQ: "Wat is je naam?",
      locationQ: "Waar wil je het houden?",
      timingQ: "Wanneer ongeveer?",
      timingHelp: "Grove indicatie is prima. De exacte datum prikken we samen.",
      contactQ: "Waar kunnen we je bereiken?",
      contactHelp: "We komen terug met een datum en de prijs, meestal binnen een werkdag.",
    },
    success: {
      title: "Genoteerd.",
      body: "Ferry of Jonathan komt persoonlijk bij je terug met een datum en de prijs, meestal binnen een werkdag.",
    },
  },
};
