// Content for the inline "try it" builder on the landing pages: a live
// "prompt -> build" demo that produces a genuinely interactive mini-app
// (a playable Pong, a working name generator, a clickable office quiz).

type QuizApp = {
  id: string;
  prompt: string;
  kind: "quiz";
  title: string;
  questions: { question: string; options: string[]; answer: number; answerNote: string }[];
  restartLabel: string;
  doneNote: string;
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
export type DemoApp = QuizApp | PongApp;

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
      id: "quiz",
      prompt: "Make a quiz about our office",
      kind: "quiz",
      title: "Office Quiz",
      restartLabel: "Play again",
      doneNote: "This is the kind of thing your team builds itself on the day.",
      questions: [
        {
          question: "Who always leaves the dishwasher open?",
          options: ["Sanne", "Mark", "Nobody admits it"],
          answer: 1,
          answerNote: "Mark. It's always Mark.",
        },
        {
          question: "What's the status of the office printer?",
          options: ["Working fine", "Paper jam", "Nobody knows"],
          answer: 1,
          answerNote: "Paper jam. Always a paper jam.",
        },
        {
          question: "When does a 10:00 meeting actually start?",
          options: ["10:00", "10:05", "10:15, after coffee"],
          answer: 2,
          answerNote: "10:15. Coffee first, obviously.",
        },
      ],
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
      id: "quiz",
      prompt: "Maak een quiz over ons kantoor",
      kind: "quiz",
      title: "Kantoorquiz",
      restartLabel: "Speel opnieuw",
      doneNote: "Precies zo'n ding dat je team op de dag zelf bouwt.",
      questions: [
        {
          question: "Wie laat de vaatwasser altijd openstaan?",
          options: ["Sanne", "Mark", "Niemand geeft het toe"],
          answer: 1,
          answerNote: "Mark. Het is altijd Mark.",
        },
        {
          question: "Wat is de status van de printer?",
          options: ["Werkt prima", "Papierstoring", "Niemand weet het"],
          answer: 1,
          answerNote: "Papierstoring. Altijd papierstoring.",
        },
        {
          question: "Hoe laat begint een meeting van 10:00 echt?",
          options: ["10:00", "10:05", "10:15, na de koffie"],
          answer: 2,
          answerNote: "10:15. Eerst koffie, natuurlijk.",
        },
      ],
    },
  ],
};
