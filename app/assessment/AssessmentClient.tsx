"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import QuestionStep from "@/components/assessment/QuestionStep";
import ResultsView from "@/components/assessment/ResultsView";
import {
  assessmentQuestions,
  calculateScores,
  SkillArea,
} from "@/data/assessmentQuestions";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Phase = "welcome" | "questions" | "email" | "results";

export default function AssessmentClient() {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [email, setEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [scores, setScores] = useState<{
    skillScores: Record<SkillArea, number>;
    overallScore: number;
  } | null>(null);
  const [reportSent, setReportSent] = useState(false);

  const handleAnswer = useCallback(
    (value: number) => {
      const q = assessmentQuestions[currentQ];
      const newAnswers = { ...answers, [q.id]: value };
      setAnswers(newAnswers);

      setTimeout(() => {
        if (currentQ < assessmentQuestions.length - 1) {
          setCurrentQ((prev) => prev + 1);
        } else {
          setPhase("email");
        }
      }, 300);
    },
    [currentQ, answers]
  );

  const handleBack = () => {
    if (currentQ > 0) setCurrentQ((prev) => prev - 1);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailLoading(true);
    setEmailError("");

    try {
      const result = calculateScores(answers);
      setScores(result);

      const supabase = createSupabaseBrowserClient();
      const submissionId = crypto.randomUUID();

      await supabase.from("assessment_submissions" as never).insert({
        id: submissionId,
        email: trimmed,
        scores: result.skillScores,
        answers,
      } as never);

      const formSubmissionId = crypto.randomUUID();
      await supabase.from("form_submissions" as never).insert({
        id: formSubmissionId,
        form_type: "assessment",
        data: {
          email: trimmed,
          overallScore: result.overallScore,
          skillScores: result.skillScores,
        },
      } as never);

      await supabase.functions.invoke("notify-slack", {
        body: {
          form_type: "assessment",
          data: {
            email: trimmed,
            overallScore: result.overallScore,
            ...Object.fromEntries(
              Object.entries(result.skillScores).map(([k, v]) => [k, `${v}%`])
            ),
          },
        },
      });

      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "assessment-results",
          recipientEmail: trimmed,
          idempotencyKey: `assessment-${submissionId}`,
          templateData: {
            overallScore: result.overallScore,
            skillScores: result.skillScores,
          },
        },
      });

      setPhase("results");
    } catch {
      setEmailError("Something went wrong. Please try again.");
    } finally {
      setEmailLoading(false);
    }
  };

  const handleSendReport = () => {
    if (!scores || reportSent) return;
    setReportSent(true);
  };

  return (
    <>
      <Navbar variant="light" />
      <main className="min-h-screen">
        {phase === "welcome" && (
          <section className="bg-secondary pt-28 md:pt-40 pb-16 md:pb-24">
            <div className="container max-w-3xl text-center">
              <span className="inline-block text-accent font-heading font-bold text-caption uppercase tracking-widest mb-4">
                Self-Assessment
              </span>
              <h1 className="text-hero md:text-hero-lg text-foreground mb-6">
                How human-ready <span className="text-accent">are you?</span>
              </h1>
              <p className="text-body-lg text-muted-foreground max-w-xl mx-auto mb-4">
                17 questions. 5 minutes. A score across the four skills that define
                whether organizations thrive or just survive in the age of AI.
              </p>
              <p className="text-sm text-muted-foreground/60 mb-10">
                No sign-up needed to start. You&apos;ll enter your email to see your results.
              </p>
              <Button
                onClick={() => setPhase("questions")}
                className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-10 h-14 text-lg"
              >
                Start the assessment →
              </Button>
              <p className="text-xs text-muted-foreground/50 mt-6">
                Based on the Brand Humanizing framework developed across 50+ organizations.
              </p>
            </div>
          </section>
        )}

        {phase === "questions" && (
          <section className="bg-secondary pt-28 md:pt-36 pb-16 md:pb-24">
            <div className="container">
              <QuestionStep
                question={assessmentQuestions[currentQ]}
                selectedValue={answers[assessmentQuestions[currentQ].id]}
                onSelect={handleAnswer}
                currentIndex={currentQ}
                totalQuestions={assessmentQuestions.length}
              />
              {currentQ > 0 && (
                <div className="max-w-2xl mx-auto mt-6">
                  <button
                    onClick={handleBack}
                    className="text-sm text-muted-foreground hover:text-foreground font-heading font-medium transition-colors"
                  >
                    ← Previous question
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {phase === "email" && (
          <section className="bg-secondary pt-28 md:pt-40 pb-16 md:pb-24">
            <div className="container max-w-md text-center">
              <div className="bg-card rounded-2xl shadow-[0_4px_24px_rgba(18,21,46,0.08)] p-8 md:p-10">
                <span className="text-4xl mb-4 block">🎉</span>
                <h2 className="font-heading font-bold text-2xl text-foreground mb-3">
                  You&apos;re done!
                </h2>
                <p className="text-muted-foreground mb-6">
                  Enter your email to see your Brand Humanizer Score, radar chart, and personalized recommendations.
                </p>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="rounded-full h-12 px-5 border border-foreground/10 bg-foreground/5 text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-accent text-center"
                  />
                  {emailError && (
                    <p className="text-sm text-destructive">{emailError}</p>
                  )}
                  <Button
                    type="submit"
                    disabled={emailLoading}
                    className="w-full rounded-full bg-accent text-accent-foreground hover:bg-soft-coral font-heading font-semibold h-12"
                  >
                    {emailLoading ? "Calculating your score..." : "Show my results"}
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground/50 mt-4">
                  We&apos;ll also send you the full report. No spam. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </section>
        )}

        {phase === "results" && scores && (
          <section className="bg-secondary pt-28 md:pt-36 pb-16 md:pb-24">
            <div className="container">
              <ResultsView
                skillScores={scores.skillScores}
                overallScore={scores.overallScore}
                onSendReport={handleSendReport}
                reportSent={reportSent}
              />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
