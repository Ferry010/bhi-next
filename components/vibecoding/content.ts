// ─────────────────────────────────────────────────────────────────────────────
// Pricing. One flat price for the whole team up to 20 people, and a custom price
// for 21+. Two options, not three: a yes/no, not a "which one do I pick?".
// Change the number in one place here. Set pricingIsSet = false to fall back to
// a clean "custom quote" line while a price is being reconsidered.
// ─────────────────────────────────────────────────────────────────────────────
export const VIBECODING_PRICE = { amount: 3450, maxPeople: 20 };
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
    priceLine: string;
    cta: string;
    demoCta: string;
    phone: { appName: string; userMessage: string; attachment: string; aiReply: string; status: string };
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
  agenda: { heading: string; sub: string; items: { time: string; label: string }[] };
  where: {
    heading: string;
    sub: string;
    yours: { title: string; text: string; imageAlt: string };
    ours: { title: string; text: string; buildingAlt: string };
  };
  why: { heading: string; sub: string; items: { title: string; text: string }[] };
  midCta: string;
  thanks: { heading: string; body: string; gameIntro: string; back: string };
  chat: { heading: string; sub: string; messages: { name: string; text: string; side: "left" | "right" }[] };
  pricing: {
    heading: string;
    sub: string;
    upTitle: string;
    unitLabel: string;
    includes: string[];
    cta: string;
    customTitle: string;
    quote: string;
    customSub: string;
    customCta: string;
    note: string;
    scarcity: string;
  };
  form: {
    heading: string;
    sub: string;
    name: string;
    email: string;
    phone: string;
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
    title: "The team day you'll still be talking about weeks later. ",
    titleAccent: "Vibecoding.",
    promise: "What's that? Vibecoding: building something cool together with AI.",
    sub: "An app, a page, a silly little tool. As long as it's fun to make.",
    forEveryone: "Fun for everyone, from sales and HR to operations. No AI experience needed.",
    priceLine: "Half a day, {price} for your whole team (up to 20 people).",
    cta: "Bring your team",
    demoCta: "Vibecoding? What's that?",
    phone: {
      appName: "AI Builder",
      userMessage: "Build a 2D version of Connect Four",
      attachment: "",
      aiReply: "On it, building now.",
      status: "Building…",
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
    sub: "Everyone joins in: brainstorming, prompting and building together. This is a real team in action during one of our sessions.",
    photos: [
      { src: "/assets/vibecoding/session-hosting.jpg", alt: "Ferry hosting an AI session for a team.", caption: "A short intro, then it's over to you." },
      { src: "/assets/vibecoding/session-building.jpg", alt: "A team working on the assignment during the session.", caption: "Brainstorm as a team, then build." },
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
  agenda: {
    heading: "What the day looks like",
    sub: "An example of a morning. We shape it around your team and pace.",
    items: [
      { time: "09:15", label: "Walk-in with coffee, tea and sandwiches" },
      { time: "09:30", label: "Intro and a bit of theory on vibecoding" },
      { time: "10:00", label: "Brainstorm per group: what will you build?" },
      { time: "10:30", label: "Coffee break" },
      { time: "10:45", label: "Build your tool" },
      { time: "12:15", label: "Final demos and wrap-up" },
      { time: "12:30", label: "Lunch" },
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
  midCta: "Pretty fun, right? That's the whole afternoon.",
  thanks: {
    heading: "Got it. Your request is in.",
    body: "Ferry or Jonathan comes back to you personally with a date and a price, usually within one working day. No sales script, just a short chat about your team.",
    gameIntro: "While you wait: build something yourself. This is exactly what your team does on the day.",
    back: "Back to the team day",
  },
  chat: {
    heading: "Still chatting about it",
    sub: "Two colleagues, the day after their team day.",
    messages: [
      { name: "Debby", side: "left", text: "What did you all build?" },
      { name: "Ismael", side: "right", text: "An app to plan our lunches together" },
      { name: "Debby", side: "left", text: "Nice, does it work for the walking group too?" },
      { name: "Ismael", side: "right", text: "Yep! You can invite colleagues and set the walking pace. You?" },
      { name: "Debby", side: "left", text: "A Pong game with a leaderboard. Loser buys lunch for the whole team 😂" },
    ],
  },
  pricing: {
    heading: "One price. For your whole team.",
    sub: "Half a day, with Ferry hosting, everything included. You see the price right away, no sales call.",
    upTitle: "Up to 20 people",
    unitLabel: "for your whole team",
    includes: [
      "Ferry hosting all day",
      "All the AI tools, licenses and tokens",
      "Coffee, tea and snacks (lunch depending on timing)",
      "A published app you take home",
      "At your place or ours in Rotterdam",
    ],
    cta: "Bring your team",
    customTitle: "More than 20 people",
    quote: "Custom price",
    customSub: "Bigger group? We tune the price to your numbers. Same day, everything included.",
    customCta: "Get your price",
    note: "No small print. This is the price.",
    scarcity: "Ferry hosts these days himself, and his calendar fills up. Only a few spots a month, so book ahead.",
  },
  form: {
    heading: "Bring your team",
    sub: "Tell us a bit about your group. We come back with a date and the price, usually within one working day.",
    name: "Your name",
    email: "Work email",
    phone: "Phone number",
    company: "Company",
    groupSize: "How big is your group?",
    groupOptions: ["Up to 20 people", "More than 20 people"],
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
    title: "De teamdag waar je weken later nog over napraat. ",
    titleAccent: "Vibecoden.",
    promise: "Wat zeg je? Vibecoden: samen iets tofs bouwen met AI.",
    sub: "Een app, een pagina, een grappige tool. Als het maar leuk is om te maken.",
    forEveryone: "Leuk voor iedereen, van sales en HR tot operations. Geen ervaring met AI nodig.",
    priceLine: "Een dagdeel, {price} voor je hele team (tot 20 personen).",
    cta: "Neem je team mee",
    demoCta: "Vibecoding? Wat is dat?",
    phone: {
      appName: "AI Bouwer",
      userMessage: "Bouw een 2D-versie van 4 op een rij",
      attachment: "",
      aiReply: "Top, ik bouw 'm nu.",
      status: "Aan het bouwen…",
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
    sub: "Iedereen doet mee: samen brainstormen, prompten en bouwen. Dit is een echt team in actie tijdens een van onze sessies.",
    photos: [
      { src: "/assets/vibecoding/session-hosting.jpg", alt: "Ferry aan het woord tijdens een AI-sessie met een team.", caption: "Kort intro, daarna zijn jullie aan zet." },
      { src: "/assets/vibecoding/session-building.jpg", alt: "Een team aan de slag met de opdracht tijdens de sessie.", caption: "In teamverband brainstormen en daarna bouwen." },
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
  agenda: {
    heading: "Zo ziet de dag eruit",
    sub: "Een voorbeeld van een ochtend. We passen het aan op jullie team en tempo.",
    items: [
      { time: "09:15", label: "Inloop met koffie, thee en broodjes" },
      { time: "09:30", label: "Introductie en een beetje theorie over vibecoden" },
      { time: "10:00", label: "Brainstormen per groep: wat gaan jullie bouwen?" },
      { time: "10:30", label: "Koffiepauze" },
      { time: "10:45", label: "Bouwen van je tool" },
      { time: "12:15", label: "Eindpresentaties en afronding" },
      { time: "12:30", label: "Lunch" },
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
  midCta: "Best leuk, toch? Zo voelt de hele middag.",
  thanks: {
    heading: "Gelukt. We hebben je aanvraag.",
    body: "Ferry of Jonathan komt persoonlijk bij je terug met een datum en een prijs, meestal binnen een werkdag. Geen salespraatje, gewoon even kort over jullie team.",
    gameIntro: "Terwijl je wacht: bouw zelf even iets. Precies wat je team op de dag ook doet.",
    back: "Terug naar de teamdag",
  },
  chat: {
    heading: "Nog even napraten",
    sub: "Twee collega's, de dag na hun teamdag.",
    messages: [
      { name: "Debby", side: "left", text: "Wat hebben jullie gebouwd?" },
      { name: "Ismael", side: "right", text: "Een app waarin we samen lunches kunnen plannen" },
      { name: "Debby", side: "left", text: "Gezellig, ook voor het wandelgroepje?" },
      { name: "Ismael", side: "right", text: "Yes! Je kunt collega's makkelijk uitnodigen en afspreken welk tempo je loopt. Jullie?" },
      { name: "Debby", side: "left", text: "Een pong-spelletje met een klassement. Verliezer trakteert de hele afdeling 😂" },
    ],
  },
  pricing: {
    heading: "Eén prijs. Voor je hele team.",
    sub: "Een dagdeel, met Ferry als host, alles inbegrepen. Je ziet de prijs meteen, geen salesgesprek.",
    upTitle: "Tot 20 personen",
    unitLabel: "voor je hele team",
    includes: [
      "Ferry als host, de hele dag",
      "Alle AI-tools, licenties en tokens",
      "Koffie, thee en hapjes (lunch afhankelijk van tijdstip)",
      "Een gepubliceerde app die je meeneemt",
      "Bij jullie of bij ons in Rotterdam",
    ],
    cta: "Neem je team mee",
    customTitle: "Meer dan 20 personen",
    quote: "Prijs op maat",
    customSub: "Grotere groep? We stemmen de prijs af op jullie aantal. Zelfde dag, alles erbij.",
    customCta: "Vraag je prijs op",
    note: "Geen addertjes. Dit is de prijs.",
    scarcity: "Ferry host deze dagen zelf en zijn agenda zit vol. Een paar plekken per maand, dus plan op tijd.",
  },
  form: {
    heading: "Neem je team mee",
    sub: "Vertel kort iets over je groep. We komen terug met een datum en de prijs, meestal binnen een werkdag.",
    name: "Je naam",
    email: "Werk-e-mail",
    phone: "Telefoonnummer",
    company: "Bedrijf",
    groupSize: "Hoe groot is je groep?",
    groupOptions: ["Tot 20 personen", "Meer dan 20 personen"],
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
