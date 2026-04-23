import { AssessmentQuestion } from "@/data/assessmentQuestions";

interface QuestionStepProps {
  question: AssessmentQuestion;
  selectedValue: number | undefined;
  onSelect: (value: number) => void;
  currentIndex: number;
  totalQuestions: number;
}

export default function QuestionStep({
  question,
  selectedValue,
  onSelect,
  currentIndex,
  totalQuestions,
}: QuestionStepProps) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span className="font-heading font-semibold">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-8 leading-snug">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, i) => {
          const isSelected = selectedValue === option.value;
          return (
            <button
              key={i}
              onClick={() => onSelect(option.value)}
              className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200 font-medium text-sm md:text-base ${
                isSelected
                  ? "border-accent bg-accent/10 text-foreground shadow-md"
                  : "border-border bg-card hover:border-accent/40 hover:bg-accent/5 text-muted-foreground"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
