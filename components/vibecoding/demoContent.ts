// Content for the /vibecoding/demo (EN) and /teamuitje/demo (NL) infotainment
// page. It explains vibecoding by letting you do a little of it: a live
// "prompt -> build" demo, a tongue-in-cheek comparator, and a playable quiz.

type QuizApp = {
  id: string;
  prompt: string;
  kind: "quiz";
  title: string;
  question: string;
  options: string[];
  answer: number;
  answerNote: string;
};
type PongApp = {
  id: string;
  prompt: string;
  kind: "pong";
  title: string;
  hint: string;
  youLabel: string;
  aiLabel: string;
};
type BabyNameApp = {
  id: string;
  prompt: string;
  kind: "babyname";
  title: string;
  generateLabel: string;
  firstNames: string[];
  vibes: string[];
};
export type DemoApp = QuizApp | PongApp | BabyNameApp;

export type DemoContent = {
  lang: "en" | "nl";
  meta: { title: string; description: string };
  langSwitch: { href: string; label: string };
  backHref: string;
  backLabel: string;
  intro: { heading: string; sub: string };
  builder: {
    heading: string;
    sub: string;
    promptLabel: string;
    buildCta: string;
    buildingSteps: string[];
    doneLabel: string;
    idleHint: string;
    resetLabel: string;
    apps: DemoApp[];
  };
  compare: {
    heading: string;
    sub: string;
    colA: string;
    colB: string;
    rows: { label: string; a: string; b: string }[];
    verdict: string;
  };
  quiz: {
    heading: string;
    sub: string;
    startCta: string;
    nextCta: string;
    seeResultCta: string;
    restartCta: string;
    progress: string; // "{n}/{total}"
    questions: { q: string; options: string[]; correct: number; reaction: string }[];
    resultTitle: string; // "... {score}/{total} ..."
    resultNote: string;
  };
  cta: { heading: string; sub: string; button: string; href: string };
};

export const demoEn: DemoContent = {
  lang: "en",
  meta: {
    title: "Try Vibecoding | See what your team would build",
    description:
      "A tiny taste of vibecoding: type a prompt, watch it build, and play with what comes out. This is what your team does on the day, in miniature.",
  },
  langSwitch: { href: "/teamuitje/demo", label: "Nederlands" },
  backHref: "/vibecoding",
  backLabel: "Back to the team day",
  intro: {
    heading: "Vibecoding, explained by doing it",
    sub: "No lecture. Pick a prompt, hit build, and watch something appear. This is how the team day feels, just smaller.",
  },
  builder: {
    heading: "Type a prompt, watch it build",
    sub: "On the day you type what you want in plain language. Pick one, build it, and actually play with it.",
    promptLabel: "Pick a prompt",
    buildCta: "Build it",
    buildingSteps: ["Reading your prompt", "Writing the code", "Putting it on screen"],
    doneLabel: "AI built this",
    idleHint: "Pick a prompt and press build.",
    resetLabel: "Start over",
    apps: [
      {
        id: "pong",
        prompt: "Build a Pong game",
        kind: "pong",
        title: "Pong",
        hint: "Move your mouse (or finger) to play. First to make the AI miss wins.",
        youLabel: "You",
        aiLabel: "AI",
      },
      {
        id: "babyname",
        prompt: "Make a baby name generator",
        kind: "babyname",
        title: "Baby Name Generator",
        generateLabel: "Generate a name",
        firstNames: ["Fenna", "Bram", "Sofie", "Mees", "Julia", "Daan", "Nova", "Luca", "Evi", "Sam", "Milo", "Liv", "Boaz", "Roos", "Guus"],
        vibes: [
          "future CEO of Friday drinks",
          "runs on chaos and coffee",
          "will definitely become a project lead",
          "was prompting in the womb",
          "already calls themselves a digital native",
          "leaves the dishwasher open, guaranteed",
          "wins every pub quiz",
          "schedules meetings that could've been emails",
          "always brings cake",
          "knows where the good stroopwafels are",
        ],
      },
      {
        id: "quiz",
        prompt: "Make a quiz about our office",
        kind: "quiz",
        title: "Office Quiz",
        question: "Who always leaves the dishwasher open?",
        options: ["Sanne", "Mark", "Nobody admits it"],
        answer: 1,
        answerNote: "Mark. It's always Mark.",
      },
    ],
  },
  compare: {
    heading: "Vibecoding vs. a regular outing",
    sub: "We tried to be fair. We really did.",
    colA: "A regular outing",
    colB: "Vibecoding",
    rows: [
      { label: "Waiting for your turn", a: "Quite a bit", b: "None" },
      { label: "What you take home", a: "A keychain, maybe", b: "Something you built" },
      { label: "Keep your own shoes on", a: "No (bowling)", b: "Always" },
      { label: "Do you learn anything", a: "Not really", b: "Accidentally, yes" },
      { label: "Chance of mud", a: "Present", b: "Zero" },
    ],
    verdict: "Vibecoding wins. We didn't rig it. Promise.",
  },
  quiz: {
    heading: "Now you play",
    sub: "The kind of quiz a team builds here in twenty minutes. No wrong answers, only offices.",
    startCta: "Start the quiz",
    nextCta: "Next",
    seeResultCta: "See result",
    restartCta: "Play again",
    progress: "{n}/{total}",
    questions: [
      {
        q: "What's the ideal meeting length?",
        options: ["60 minutes", "30 minutes", "Could have been an email", "As long as the coffee is warm"],
        correct: 2,
        reaction: "Correct. It could almost always have been an email.",
      },
      {
        q: "Who eats the last cookie from the tin?",
        options: ["The intern", "The manager", "Nobody, but it's gone", "Mark"],
        correct: 3,
        reaction: "Of course. Mark again.",
      },
      {
        q: "What does 'I'll pick it up' really mean?",
        options: ["It happens today", "It never happens", "It's on a sticky note", "All of them, at once"],
        correct: 3,
        reaction: "Right. Schrödinger's action item.",
      },
    ],
    resultTitle: "You got {score}/{total}.",
    resultNote: "Honestly, this is exactly the kind of thing your team builds itself on the day.",
  },
  cta: {
    heading: "Ready to build the real thing?",
    sub: "That was a taste. On the team day everyone builds their own, and takes it home.",
    button: "Bring your team",
    href: "/vibecoding#book",
  },
};

export const demoNl: DemoContent = {
  lang: "nl",
  meta: {
    title: "Probeer vibecoding | Zie wat je team zou bouwen",
    description:
      "Een klein voorproefje van vibecoding: typ een opdracht, kijk hoe het gebouwd wordt en speel met wat eruit komt. Dit is wat je team op de dag doet, in het klein.",
  },
  langSwitch: { href: "/vibecoding/demo", label: "English" },
  backHref: "/teamuitje",
  backLabel: "Terug naar het teamuitje",
  intro: {
    heading: "Vibecoding, uitgelegd door het te doen",
    sub: "Geen college. Kies een opdracht, druk op bouwen, en kijk wat er verschijnt. Zo voelt de teamdag, maar dan kleiner.",
  },
  builder: {
    heading: "Typ een opdracht, kijk hoe het bouwt",
    sub: "Op de dag typ je in gewone taal wat je wil. Kies er een, bouw 'm, en speel er echt mee.",
    promptLabel: "Kies een opdracht",
    buildCta: "Bouw het",
    buildingSteps: ["Ik lees je opdracht", "Ik schrijf de code", "Ik zet het op het scherm"],
    doneLabel: "AI heeft dit gebouwd",
    idleHint: "Kies een opdracht en druk op bouwen.",
    resetLabel: "Opnieuw",
    apps: [
      {
        id: "pong",
        prompt: "Bouw een Pong-game",
        kind: "pong",
        title: "Pong",
        hint: "Beweeg je muis (of vinger) om te spelen. Laat de AI missen en je scoort.",
        youLabel: "Jij",
        aiLabel: "AI",
      },
      {
        id: "babyname",
        prompt: "Maak een babynaam-generator",
        kind: "babyname",
        title: "Babynaam-generator",
        generateLabel: "Genereer een naam",
        firstNames: ["Fenna", "Bram", "Sofie", "Mees", "Julia", "Daan", "Noor", "Luca", "Evi", "Sam", "Nova", "Guus", "Liv", "Boaz", "Roos"],
        vibes: [
          "toekomstig CEO van de vrijmibo",
          "draait op chaos en koffie",
          "wordt vast projectleider",
          "promptte al in de buik",
          "noemt zich nu al digitaal native",
          "laat de vaatwasser open, gegarandeerd",
          "wint elke pubquiz",
          "plant meetings die een mail hadden kunnen zijn",
          "brengt altijd taart mee",
          "weet precies waar de goede stroopwafels staan",
        ],
      },
      {
        id: "quiz",
        prompt: "Maak een quiz over ons kantoor",
        kind: "quiz",
        title: "Kantoorquiz",
        question: "Wie laat de vaatwasser altijd openstaan?",
        options: ["Sanne", "Mark", "Niemand geeft het toe"],
        answer: 1,
        answerNote: "Mark. Het is altijd Mark.",
      },
    ],
  },
  compare: {
    heading: "Vibecoding vs. een gewoon uitje",
    sub: "We hebben geprobeerd eerlijk te zijn. Echt waar.",
    colA: "Een gewoon uitje",
    colB: "Vibecoding",
    rows: [
      { label: "Wachten op je beurt", a: "Best veel", b: "Nul" },
      { label: "Wat neem je mee naar huis", a: "Een sleutelhanger, misschien", b: "Iets dat je zelf bouwde" },
      { label: "Eigen schoenen aanhouden", a: "Nee (bowlen)", b: "Altijd" },
      { label: "Leer je er iets van", a: "Niet echt", b: "Toevallig wel" },
      { label: "Kans op modder", a: "Aanwezig", b: "Nul" },
    ],
    verdict: "Vibecoding wint. We hebben niet vals gespeeld. Beloofd.",
  },
  quiz: {
    heading: "Nu jij",
    sub: "Precies zo'n quiz die een team hier in twintig minuten bouwt. Geen foute antwoorden, alleen kantoren.",
    startCta: "Start de quiz",
    nextCta: "Volgende",
    seeResultCta: "Bekijk resultaat",
    restartCta: "Speel opnieuw",
    progress: "{n}/{total}",
    questions: [
      {
        q: "Wat is de ideale lengte van een meeting?",
        options: ["60 minuten", "30 minuten", "Had een mail kunnen zijn", "Zolang de koffie warm is"],
        correct: 2,
        reaction: "Correct. Het had bijna altijd een mail kunnen zijn.",
      },
      {
        q: "Wie eet het laatste koekje uit de trommel?",
        options: ["De stagiair", "De manager", "Niemand, maar hij is wel weg", "Mark"],
        correct: 3,
        reaction: "Natuurlijk. Weer Mark.",
      },
      {
        q: "Wat betekent 'ik pak het even op' echt?",
        options: ["Het gebeurt vandaag", "Het gebeurt nooit", "Het staat op een post-it", "Alle drie, tegelijk"],
        correct: 3,
        reaction: "Klopt. Schrödingers actiepunt.",
      },
    ],
    resultTitle: "Je had {score}/{total} goed.",
    resultNote: "Maar eerlijk, dit is precies zo'n ding dat je team op de dag zelf bouwt.",
  },
  cta: {
    heading: "Klaar om het echt te bouwen?",
    sub: "Dit was een voorproefje. Op de teamdag bouwt iedereen zijn eigen versie, en neemt die mee naar huis.",
    button: "Neem je team mee",
    href: "/teamuitje#book",
  },
};
