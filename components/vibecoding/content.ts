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
    promise: string;
    sub: string;
    forEveryone: string;
    cta: string;
    demoCta: string;
    facts: string[];
    phone: { badge: string; appTitle: string; question: string; options: string[]; answerIndex: number; footer: string };
  };
  not: {
    heading: string;
    sub: string;
    notLabel: string;
    items: { label: string; text: string }[];
    punch: string;
  };
  proof: { heading: string; sub: string; photos: { src: string; alt: string; caption: string }[] };
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
    title: "No escape room. ",
    titleAccent: "Build something cool together with AI.",
    promise: "Build a working AI tool together in one afternoon. No coding.",
    sub: "For one afternoon you make things together you would never normally make. A quiz about your own office, a game where you take each other on, a tool that grades your meetings. What will you build together?",
    forEveryone: "Fun for everyone, from sales and HR to operations. No AI experience needed.",
    cta: "Bring your team",
    demoCta: "See it in action",
    facts: ["One afternoon, ~3 hours", "Groups of 4 to 20", "At your place or in Rotterdam"],
    phone: {
      badge: "Built during the outing",
      appTitle: "Office Quiz",
      question: "Who always leaves the dishwasher open?",
      options: ["Sanne", "Mark", "Nobody admits it"],
      answerIndex: 1,
      footer: "Next question",
    },
  },
  not: {
    heading: "Not another escape room.",
    sub: "You know the usual outings. This is the one your team still brings up on Monday.",
    notLabel: "Not",
    items: [
      { label: "an escape room", text: "We do challenge your brain, but you can go to the toilet or head home whenever you want, without cracking a code first." },
      { label: "bowling", text: "As nice as bowling is, you spend most of it waiting. With us you are busy the whole session (and you get to keep your own shoes on)." },
      { label: "a survival afternoon", text: "The work week is already a survival trip. This afternoon you don't roll through mud or haul logs. At the office, in a chair, with coffee." },
    ],
    punch: "You laugh a lot, and you go home with something that works. Something you built yourself.",
  },
  proof: {
    heading: "Not a sit-back afternoon",
    sub: "Everyone joins in: brainstorming, prompting and building together. This is a real team in action during a session at Dyade × VISMA.",
    photos: [
      { src: "/assets/vibecoding/session-hosting.jpg", alt: "Ferry hosting an AI session for a team.", caption: "A short intro, then it's over to you." },
      { src: "/assets/vibecoding/session-building.jpg", alt: "A team working on the assignment during the session.", caption: "Working towards the best prompt. The winner takes the prompt award." },
    ],
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
      "An app that takes over that one boring task at work",
      "A website for the team's biggest inside joke",
      "An AI that roasts your colleagues, with love",
      "A machine that settles where Friday drinks happen",
    ],
    points: [
      { title: "You suggest, AI codes", text: "You describe in plain English what you want to build and how it should look. The AI tool builds the whole thing and writes the code." },
      { title: "Fun (and addictive)", text: "It is fast, creative and often seriously addictive. Before you know it you are building one app after another. In this session we start with one." },
      { title: "Everyone ships", text: "By the end of the day, every group has something that works to show, and to be proud of. What you make goes online and comes home or to work with you." },
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
    heading: "This is how it works",
    sub: "You come in with your whole team and we split into small groups.",
    steps: [
      { title: "We make small groups", text: "Small teams of a few people. Put the ones who never usually work together side by side, that is where the new conversations start." },
      { title: "We build something real", text: "We use AI tools to build something that works and that you can hold. Whatever you make during the day, you take home or to work with you." },
      { title: "Learning from each other", text: "After building, each group shows the app, website or tool they made. Those are the moments where jokes and compliments take turns." },
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
    sub: "You go home with a good day, and with something that sticks.",
    items: [
      { title: "Fun and real skills", text: "You have a fun day with your team, and along the way everyone learns to work with AI. Skills that stay useful for a long time, whether you are technical or not." },
      { title: "Everything is included", text: "We sort the tokens and licenses for tools like Claude, Cursor and Replit. You install nothing and pay nothing extra afterwards." },
      { title: "You use it on Monday", text: "What your team discovers doesn't vanish after the drinks. The next week you just use it in real work, or you keep building yourself." },
      { title: "You're not on your own", text: "Ferry is with you the whole session. When you get stuck he helps you through, and he makes sure every group leaves with something good." },
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
    title: "Geen escape room, maar ",
    titleAccent: "samen iets tofs bouwen met AI.",
    promise: "Bouw in één middag samen een werkende AI-tool. Zonder te programmeren.",
    sub: "Een middag lang maken jullie samen dingen die je normaal nooit zou maken. Een quiz over je eigen kantoor, een spel waarin je het tegen elkaar opneemt, een tool die je meetings een cijfer geeft. Wat bouwen jullie samen?",
    forEveryone: "Leuk voor iedereen, van sales en HR tot operations. Geen ervaring met AI nodig.",
    cta: "Neem je team mee",
    demoCta: "Zie het in actie",
    facts: ["Eén middag, ± 3 uur", "Groepen van 4 tot 20", "Bij jullie of in Rotterdam"],
    phone: {
      badge: "Gebouwd tijdens het uitje",
      appTitle: "Kantoorquiz",
      question: "Wie laat de vaatwasser altijd openstaan?",
      options: ["Sanne", "Mark", "Niemand geeft het toe"],
      answerIndex: 1,
      footer: "Volgende vraag",
    },
  },
  not: {
    heading: "Niet wéér een escape room.",
    sub: "De standaard uitjes ken je. Dit is er een waar je team maandag nog over doorgaat.",
    notLabel: "Geen",
    items: [
      { label: "escape room", text: "We dagen je wél mentaal uit, maar je kunt gewoon gaan plassen of naar huis wanneer je wilt, zonder eerst de code te moeten kraken." },
      { label: "bowlen", text: "Hoe gezellig bowlen ook is, het grootste deel breng je wachtend door. Bij ons ben je de volledige sessie bezig (en je mag je eigen schoenen aanhouden)." },
      { label: "survivalmiddag", text: "De werkweek op zichzelf is al een overlevingsslag. Deze middag hoef je niet door de modder te rollen of met hout te sjouwen. Op kantoor, in een stoel mét koffie." },
    ],
    punch: "Je lacht wat af, en je gaat naar huis met iets dat werkt. Iets dat je zelf hebt gemaakt.",
  },
  proof: {
    heading: "Geen passieve middag",
    sub: "Iedereen doet mee: samen brainstormen, prompten en bouwen. Dit is een echt team in actie tijdens een sessie bij Dyade × VISMA.",
    photos: [
      { src: "/assets/vibecoding/session-hosting.jpg", alt: "Ferry aan het woord tijdens een AI-sessie met een team.", caption: "Kort intro, daarna zijn jullie aan zet." },
      { src: "/assets/vibecoding/session-building.jpg", alt: "Een team aan de slag met de opdracht tijdens de sessie.", caption: "Samen naar de beste prompt. De winnaar pakt de prompt award." },
    ],
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
      "Een app die die ene saaie taak op je werk overneemt",
      "Een website voor de grootste inside-joke van het team",
      "Een AI die je collega's roast, met liefde",
      "Een keuzemachine voor de vrijdagmiddagborrel",
    ],
    points: [
      { title: "Jij suggereert, AI codeert", text: "Jij geeft in normaal Nederlands aan wat je wilt bouwen en hoe het eruit moet zien. De AI-tool bouwt het volledig en schrijft de code." },
      { title: "Leuk (en verslavend)", text: "Het is snel, creatief en vaak enorm verslavend. Voor je het weet bouw je de ene app na de andere. In deze sessie starten we met eentje." },
      { title: "Iedereen levert iets op", text: "Aan het eind van dit uitje heeft elk groepje iets werkends om te laten zien, en om trots op te zijn. Wat je maakt staat online en kun je mee naar huis of werk nemen." },
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
    heading: "Dit is hoe het werkt",
    sub: "Je komt met je hele team en we delen op in kleine groepen.",
    steps: [
      { title: "We maken kleine groepjes", text: "Kleine teams van een paar mensen. Zet bij voorkeur de mensen bij elkaar die anders nooit samenwerken, dat zorgt voor nieuwe gesprekken." },
      { title: "We bouwen iets echts", text: "We werken met AI-tools om iets werkends en tastbaars te bouwen. Wat je tijdens de teamdag maakt, neem je letterlijk mee naar huis of werk." },
      { title: "Van elkaar leren", text: "Na het bouwen deelt elke groep de app, website of tool die ze bouwden. Dat zijn de momenten waar grapjes en complimenten elkaar afwisselen." },
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
    sub: "Je gaat naar huis met een leuke dag, én met iets dat blijft hangen.",
    items: [
      { title: "Lol én vaardigheden", text: "Je hebt een dag plezier met je team, en ondertussen leert iedereen werken met AI. Vaardigheden waar je nog lang wat aan hebt, of je nu technisch bent of niet." },
      { title: "Alles zit in de prijs", text: "De tokens en licenties voor tools als Claude, Cursor en Replit regelen wij. Jij hoeft niets te installeren en betaalt achteraf niets bij." },
      { title: "Maandag pas je het toe", text: "Wat je team ontdekt, verdwijnt niet na de borrel. De week erna gebruik je het gewoon in je echte werk, of je bouwt zelf verder." },
      { title: "Je staat er niet alleen voor", text: "Ferry loopt de hele sessie mee. Loop je vast, dan helpt hij je verder, en hij zorgt dat elk groepje met iets moois de deur uit gaat." },
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
