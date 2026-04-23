export type SkillArea =
  | "ai_automation"
  | "creativity"
  | "human_sciences"
  | "emotional_intelligence";

export const skillLabels: Record<SkillArea, string> = {
  ai_automation: "AI & Automation Intelligence",
  creativity: "Creativity",
  human_sciences: "Human Sciences",
  emotional_intelligence: "Emotional Intelligence & Ethics",
};

export const skillDescriptions: Record<SkillArea, { high: string; mid: string; low: string }> = {
  ai_automation: {
    high: "You have strong fluency in how AI and automation work. Not just as tools, but as forces that reshape how organizations operate. You can separate hype from substance.",
    mid: "You understand the basics of AI and automation but may struggle to connect them to strategic human decisions. Building this skill will help you lead technology conversations with confidence.",
    low: "AI and automation feel abstract or overwhelming to you. This is where most professionals are, and it's the most impactful skill to build first. Start with our Inspiration Session.",
  },
  creativity: {
    high: "You consistently find unexpected connections and original solutions. You see possibilities where others see constraints. This is one of the most AI-resistant skills you can have.",
    mid: "You're creative when given permission, but may default to conventional thinking under pressure. Strengthening this skill means making creativity a reflex, not a luxury.",
    low: "You tend to follow established patterns and proven approaches. In a world where AI can replicate routine thinking, developing your creative capacity is essential for staying relevant.",
  },
  human_sciences: {
    high: "You have a deep understanding of human behaviour: why people do what they do, how they make decisions, and what drives trust. You naturally design for humans, not just for efficiency.",
    mid: "You care about people but may lack formal frameworks for understanding human behaviour at scale. Deepening this skill transforms intuition into strategy.",
    low: "You focus more on systems and processes than on the humans inside them. This is common in technical roles, and it's precisely where Brand Humanizing creates the biggest shift.",
  },
  emotional_intelligence: {
    high: "You navigate complex interpersonal dynamics with ease. You read rooms, manage difficult conversations, and make ethical considerations central to your decisions.",
    mid: "You're emotionally aware but may find it harder to apply that awareness in high-stakes professional contexts. This skill becomes critical as AI takes over the analytical work.",
    low: "Emotional and ethical dimensions of work feel secondary to you. As technology handles more cognitive tasks, this is the skill that will most define human value in organizations.",
  },
};

export interface AssessmentQuestion {
  id: string;
  skill: SkillArea;
  question: string;
  options: { label: string; value: number }[];
}

export const assessmentQuestions: AssessmentQuestion[] = [
  // AI & Automation Intelligence (5 questions)
  {
    id: "ai1",
    skill: "ai_automation",
    question: "When your team discusses adopting a new AI tool, what's your first instinct?",
    options: [
      { label: "Let's try it, we can figure out the implications later", value: 2 },
      { label: "What problem does this actually solve for our people?", value: 5 },
      { label: "I usually wait to see what others in our industry do first", value: 1 },
      { label: "I check whether it replaces tasks or creates new possibilities", value: 4 },
    ],
  },
  {
    id: "ai2",
    skill: "ai_automation",
    question: "How well can you explain what AI can and cannot do to a non-technical colleague?",
    options: [
      { label: "Very well, I can separate hype from substance", value: 5 },
      { label: "Reasonably, I know the basics but struggle with nuance", value: 3 },
      { label: "Not really, I'm still figuring it out myself", value: 1 },
      { label: "I can explain specific tools, but not the bigger picture", value: 2 },
    ],
  },
  {
    id: "ai3",
    skill: "ai_automation",
    question: "Your organization is automating a process that currently involves human judgment. What do you focus on?",
    options: [
      { label: "Speed and cost savings", value: 1 },
      { label: "What the freed-up humans could do instead", value: 5 },
      { label: "Whether the automation actually works reliably", value: 3 },
      { label: "How customers or colleagues will experience the change", value: 4 },
    ],
  },
  {
    id: "ai4",
    skill: "ai_automation",
    question: "How often do you critically evaluate whether an AI-generated output is actually good?",
    options: [
      { label: "Almost always, I treat AI output as a first draft", value: 5 },
      { label: "Sometimes, when it seems obviously wrong", value: 3 },
      { label: "Rarely, if the tool generated it, it's probably fine", value: 1 },
      { label: "I don't use AI tools regularly enough to say", value: 2 },
    ],
  },
  {
    id: "ai5",
    skill: "ai_automation",
    question: "Article 4 of the EU AI Act requires organizations to ensure AI literacy. How prepared is your team?",
    options: [
      { label: "We're already working on it systematically", value: 5 },
      { label: "We're aware but haven't started yet", value: 3 },
      { label: "I didn't know about this requirement", value: 1 },
      { label: "We've discussed it but haven't made it a priority", value: 2 },
    ],
  },

  // Creativity (4 questions)
  {
    id: "cr1",
    skill: "creativity",
    question: "When faced with a problem that has no obvious solution, what happens?",
    options: [
      { label: "I get energized, these are the best problems", value: 5 },
      { label: "I look for analogies in other industries or fields", value: 4 },
      { label: "I feel stuck until someone points me in a direction", value: 1 },
      { label: "I research what others have done and adapt their approach", value: 2 },
    ],
  },
  {
    id: "cr2",
    skill: "creativity",
    question: "In meetings, how often do you propose ideas that make people pause and think?",
    options: [
      { label: "Regularly, it's what I'm known for", value: 5 },
      { label: "Occasionally, when I feel safe enough to share", value: 3 },
      { label: "Rarely, I usually build on other people's ideas", value: 2 },
      { label: "Almost never, I focus on execution, not ideation", value: 1 },
    ],
  },
  {
    id: "cr3",
    skill: "creativity",
    question: "How do you react when AI generates a 'good enough' version of something you would normally create?",
    options: [
      { label: "I use it as a starting point and make it distinctly better", value: 5 },
      { label: "I feel a bit threatened, honestly", value: 2 },
      { label: "I use it as-is, saves time", value: 1 },
      { label: "I ask what I can create that AI fundamentally cannot", value: 4 },
    ],
  },
  {
    id: "cr4",
    skill: "creativity",
    question: "How much of your work involves creating something genuinely new versus optimizing what exists?",
    options: [
      { label: "Mostly creating, I seek out novel challenges", value: 5 },
      { label: "A healthy mix of both", value: 4 },
      { label: "Mostly optimizing, and I'm good at it", value: 2 },
      { label: "Almost entirely optimizing or maintaining", value: 1 },
    ],
  },

  // Human Sciences (4 questions)
  {
    id: "hs1",
    skill: "human_sciences",
    question: "When designing a new process, product, or service, how much weight do you give to how humans will actually experience it?",
    options: [
      { label: "It's the starting point of everything I design", value: 5 },
      { label: "I consider it, but efficiency usually wins", value: 2 },
      { label: "I rely on data and testing, not intuition about people", value: 3 },
      { label: "I usually think about it after the technical design is done", value: 1 },
    ],
  },
  {
    id: "hs2",
    skill: "human_sciences",
    question: "Can you name a specific behavioral science principle you've applied at work in the last month?",
    options: [
      { label: "Yes, I use frameworks from psychology or sociology regularly", value: 5 },
      { label: "I know some principles but don't consciously apply them", value: 3 },
      { label: "Not really, I work more from experience than theory", value: 2 },
      { label: "I wouldn't know where to start", value: 1 },
    ],
  },
  {
    id: "hs3",
    skill: "human_sciences",
    question: "How well do you understand why your customers or colleagues behave the way they do?",
    options: [
      { label: "Very well, I invest time in understanding motivations", value: 5 },
      { label: "Reasonably, I notice patterns but don't always dig deeper", value: 3 },
      { label: "I focus more on what they do than why they do it", value: 2 },
      { label: "Not well, people often surprise me", value: 1 },
    ],
  },
  {
    id: "hs4",
    skill: "human_sciences",
    question: "When technology changes how people interact with your organization, what do you track?",
    options: [
      { label: "How it changes the quality of human relationships", value: 5 },
      { label: "Efficiency metrics: speed, cost, volume", value: 1 },
      { label: "Customer satisfaction scores", value: 3 },
      { label: "I don't track this systematically", value: 2 },
    ],
  },

  // Emotional Intelligence & Ethics (4 questions)
  {
    id: "ei1",
    skill: "emotional_intelligence",
    question: "A colleague pushes back on your idea in front of the team. What happens inside you, and what do you do?",
    options: [
      { label: "I feel it, acknowledge it internally, and get curious about their perspective", value: 5 },
      { label: "I defend my position, I don't want to look weak", value: 1 },
      { label: "I go quiet and process it later", value: 2 },
      { label: "I try to find the merit in their pushback, even if it stings", value: 4 },
    ],
  },
  {
    id: "ei2",
    skill: "emotional_intelligence",
    question: "Your organization is about to implement AI in a way that will significantly change people's jobs. What's your first concern?",
    options: [
      { label: "Have we been honest with the people affected?", value: 5 },
      { label: "Will it actually work technically?", value: 1 },
      { label: "What's the legal and compliance exposure?", value: 2 },
      { label: "How do we communicate this without causing panic?", value: 4 },
    ],
  },
  {
    id: "ei3",
    skill: "emotional_intelligence",
    question: "How often do ethical considerations change the direction of a project you're involved in?",
    options: [
      { label: "Regularly, I raise ethical questions proactively", value: 5 },
      { label: "Occasionally, when something feels clearly wrong", value: 3 },
      { label: "Rarely, ethics isn't really part of our process", value: 1 },
      { label: "I think about it but don't usually speak up", value: 2 },
    ],
  },
  {
    id: "ei4",
    skill: "emotional_intelligence",
    question: "When you make a mistake at work, what's your default response?",
    options: [
      { label: "Own it publicly, learn from it, move on", value: 5 },
      { label: "Fix it quietly and hope no one notices", value: 1 },
      { label: "Acknowledge it to my team but focus on the solution", value: 4 },
      { label: "Analyze what went wrong before telling anyone", value: 3 },
    ],
  },
];

export interface SkillRecommendation {
  skill: SkillArea;
  recommendation: string;
  link: string;
  linkLabel: string;
}

export function getRecommendations(scores: Record<SkillArea, number>): SkillRecommendation[] {
  const sorted = (Object.entries(scores) as [SkillArea, number][]).sort((a, b) => a[1] - b[1]);
  const weakest = sorted.slice(0, 3);

  const recMap: Record<SkillArea, SkillRecommendation> = {
    ai_automation: {
      skill: "ai_automation",
      recommendation: "Build your AI literacy through our framework. Understand what technology can do so you can focus on what humans should do.",
      link: "/learning/ai-literacy-certificate",
      linkLabel: "Get AI Literacy Certified →",
    },
    creativity: {
      skill: "creativity",
      recommendation: "Strengthen your creative capacity, the skill AI cannot replicate. Our full-day course helps teams make creativity a reflex, not a luxury.",
      link: "/learning/full-day-course",
      linkLabel: "See the Full-Day Course →",
    },
    human_sciences: {
      skill: "human_sciences",
      recommendation: "Deepen your understanding of human behavior: why people do what they do. This turns intuition into strategy.",
      link: "/learning/inspiration-session",
      linkLabel: "Start with an Inspiration Session →",
    },
    emotional_intelligence: {
      skill: "emotional_intelligence",
      recommendation: "Invest in emotional intelligence and ethical awareness. As AI handles more cognitive tasks, this defines human value.",
      link: "/learning/multi-day-programme",
      linkLabel: "Explore the Multi-Day Programme →",
    },
  };

  return weakest.map(([skill]) => recMap[skill]);
}

export function calculateScores(answers: Record<string, number>): {
  skillScores: Record<SkillArea, number>;
  overallScore: number;
} {
  const skills: SkillArea[] = ["ai_automation", "creativity", "human_sciences", "emotional_intelligence"];
  const skillScores = {} as Record<SkillArea, number>;

  for (const skill of skills) {
    const questions = assessmentQuestions.filter((q) => q.skill === skill);
    const maxPossible = questions.length * 5;
    const actual = questions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
    skillScores[skill] = Math.round((actual / maxPossible) * 100);
  }

  const overallScore = Math.round(
    skills.reduce((sum, s) => sum + skillScores[s], 0) / skills.length
  );

  return { skillScores, overallScore };
}
