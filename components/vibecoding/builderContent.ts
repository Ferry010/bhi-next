// Content for the inline "try it" builder on the landing pages: a live
// "prompt -> build" demo that produces a genuinely interactive mini-app
// (a playable Pong, a working name generator, a clickable office quiz).

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

export type BuilderContent = {
  heading: string;
  sub: string;
  promptLabel: string;
  buildCta: string;
  buildingSteps: string[];
  doneLabel: string;
  idleHint: string;
  apps: DemoApp[];
};

export const builderEn: BuilderContent = {
  heading: "Type a prompt, watch it build",
  sub: "This is vibecoding. Type what you want in plain language, pick one below, build it, and actually play with it.",
  promptLabel: "Pick a prompt",
  buildCta: "Build it",
  buildingSteps: ["Reading your prompt", "Writing the code", "Putting it on screen"],
  doneLabel: "AI built this",
  idleHint: "Pick a prompt and press build.",
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
};

export const builderNl: BuilderContent = {
  heading: "Typ een opdracht, kijk hoe het bouwt",
  sub: "Dit is vibecoding. Typ in gewone taal wat je wil, kies er hieronder een, bouw 'm, en speel er echt mee.",
  promptLabel: "Kies een opdracht",
  buildCta: "Bouw het",
  buildingSteps: ["Ik lees je opdracht", "Ik schrijf de code", "Ik zet het op het scherm"],
  doneLabel: "AI heeft dit gebouwd",
  idleHint: "Kies een opdracht en druk op bouwen.",
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
};
