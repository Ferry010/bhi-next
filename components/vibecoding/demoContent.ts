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
type GraderApp = {
  id: string;
  prompt: string;
  kind: "grader";
  title: string;
  subject: string;
  scores: { score: string; reason: string }[];
  rebuildLabel: string;
};
type NameApp = {
  id: string;
  prompt: string;
  kind: "namegen";
  title: string;
  names: string[];
  rebuildLabel: string;
};
export type DemoApp = QuizApp | GraderApp | NameApp;

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
    sub: "On the day you type what you want in plain language. Here are three to try.",
    promptLabel: "Pick a prompt",
    buildCta: "Build it",
    buildingSteps: ["Reading your prompt", "Writing the code", "Putting it on screen"],
    doneLabel: "AI built this",
    idleHint: "Pick a prompt and press build.",
    resetLabel: "Start over",
    apps: [
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
      {
        id: "grader",
        prompt: "Build a tool that grades our meetings",
        kind: "grader",
        title: "Meeting Score",
        subject: "Weekly standup",
        scores: [
          { score: "4.5", reason: "Ran 55 minutes. Could have been an email." },
          { score: "8.0", reason: "Everyone left on time. Rare." },
          { score: "2.0", reason: "Heard 'just quickly' three times." },
          { score: "6.5", reason: "Fine. Nobody fell asleep." },
        ],
        rebuildLabel: "Grade again",
      },
      {
        id: "namegen",
        prompt: "Come up with a name for our new project",
        kind: "namegen",
        title: "Name Generator",
        names: ["Project Sunflower", "Operation Stroopwafel", "Mission Afternoon-Slump", "The Big No-Idea", "Project Friday-Drinks"],
        rebuildLabel: "Generate",
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
    sub: "Op de dag typ je in gewone taal wat je wil. Hier zijn er drie om te proberen.",
    promptLabel: "Kies een opdracht",
    buildCta: "Bouw het",
    buildingSteps: ["Ik lees je opdracht", "Ik schrijf de code", "Ik zet het op het scherm"],
    doneLabel: "AI heeft dit gebouwd",
    idleHint: "Kies een opdracht en druk op bouwen.",
    resetLabel: "Opnieuw",
    apps: [
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
      {
        id: "grader",
        prompt: "Bouw een tool die onze meetings een cijfer geeft",
        kind: "grader",
        title: "Meetingcijfer",
        subject: "Wekelijkse standup",
        scores: [
          { score: "4,5", reason: "Duurde 55 minuten. Had een mail kunnen zijn." },
          { score: "8,0", reason: "Iedereen op tijd weg. Zeldzaam." },
          { score: "2,0", reason: "Drie keer 'even kort' gehoord." },
          { score: "6,5", reason: "Prima. Niemand viel in slaap." },
        ],
        rebuildLabel: "Beoordeel opnieuw",
      },
      {
        id: "namegen",
        prompt: "Verzin een naam voor ons nieuwe project",
        kind: "namegen",
        title: "Naamgenerator",
        names: ["Project Zonnebloem", "Operatie Stroopwafel", "Missie Middagdip", "Het Grote Geen-Idee", "Project Vrijmibo"],
        rebuildLabel: "Genereer",
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
