"use client";

import Link from "next/link";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  SkillArea,
  skillLabels,
  skillDescriptions,
  getRecommendations,
} from "@/data/assessmentQuestions";

interface ResultsViewProps {
  skillScores: Record<SkillArea, number>;
  overallScore: number;
  onSendReport: () => void;
  reportSent: boolean;
}

function getLevel(score: number): "high" | "mid" | "low" {
  if (score >= 70) return "high";
  if (score >= 40) return "mid";
  return "low";
}

export default function ResultsView({
  skillScores,
  overallScore,
  onSendReport,
  reportSent,
}: ResultsViewProps) {
  const chartData = (Object.entries(skillScores) as [SkillArea, number][]).map(
    ([skill, score]) => ({
      skill: skillLabels[skill].split(" & ")[0].split(" ").slice(0, 2).join(" "),
      fullName: skillLabels[skill],
      score,
    })
  );

  const recommendations = getRecommendations(skillScores);

  const linkedInText = encodeURIComponent(
    `I just took the Brand Humanizer Self-Assessment and scored ${overallScore}/100. Curious where you stand on the four skills every future-proof organisation needs?\n\nhttps://brandhumanizing.com/assessment`
  );
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    "https://brandhumanizing.com/assessment"
  )}&summary=${linkedInText}`;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <p className="text-accent font-heading font-bold text-caption uppercase tracking-widest mb-2">
          Your Brand Humanizer Score
        </p>
        <div className="inline-flex items-baseline gap-1">
          <span className="font-heading font-bold text-7xl md:text-8xl text-foreground">
            {overallScore}
          </span>
          <span className="text-2xl text-muted-foreground font-heading">/100</span>
        </div>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto">
          {overallScore >= 70
            ? "You're already thinking like a Brand Humanizer. Now go deeper."
            : overallScore >= 40
            ? "You're on the path. There are clear areas where growth will create outsized impact."
            : "Honest scores are the best starting point. Every Brand Humanizer started here."}
        </p>
      </div>

      <div className="bg-card rounded-2xl shadow-[0_4px_24px_rgba(18,21,46,0.08)] p-6 md:p-10 mb-8">
        <h3 className="font-heading font-bold text-lg text-foreground mb-4 text-center">
          Your Skill Profile
        </h3>
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart data={chartData} outerRadius="75%">
            <PolarGrid stroke="hsl(220, 20%, 90%)" />
            <PolarAngleAxis
              dataKey="skill"
              tick={{ fontSize: 12, fill: "hsl(220, 9%, 42%)" }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: "hsl(220, 9%, 42%)" }}
            />
            <Radar
              name="Score"
              dataKey="score"
              stroke="hsl(21, 100%, 58%)"
              fill="hsl(21, 100%, 58%)"
              fillOpacity={0.25}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4 mb-10">
        {(Object.entries(skillScores) as [SkillArea, number][]).map(
          ([skill, score]) => {
            const level = getLevel(score);
            return (
              <div
                key={skill}
                className="bg-card rounded-2xl shadow-[0_4px_24px_rgba(18,21,46,0.08)] p-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-heading font-bold text-foreground">
                    {skillLabels[skill]}
                  </h4>
                  <span
                    className={`text-sm font-heading font-bold px-3 py-1 rounded-full ${
                      level === "high"
                        ? "bg-green-100 text-green-700"
                        : level === "mid"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {score}%
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full mb-3">
                  <div
                    className="h-full rounded-full transition-all duration-700 bg-accent"
                    style={{ width: `${score}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {skillDescriptions[skill][level]}
                </p>
              </div>
            );
          }
        )}
      </div>

      <div className="bg-cream rounded-2xl p-6 md:p-8 mb-10">
        <h3 className="font-heading font-bold text-lg text-foreground mb-4">
          🎯 Your top 3 growth areas
        </h3>
        <div className="space-y-4">
          {recommendations.map((rec, i) => (
            <div key={rec.skill} className="flex gap-4">
              <span className="text-accent font-heading font-bold text-lg shrink-0 w-6">
                {i + 1}.
              </span>
              <div>
                <p className="text-foreground font-medium mb-1">
                  {skillLabels[rec.skill]}
                </p>
                <p className="text-sm text-muted-foreground mb-1">
                  {rec.recommendation}
                </p>
                <Link
                  href={rec.link}
                  className="text-sm text-accent font-semibold hover:underline"
                >
                  {rec.linkLabel}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
          <Button className="rounded-full bg-[#0077B5] text-white hover:bg-[#006097] font-heading font-semibold px-6 h-12 w-full sm:w-auto">
            Share on LinkedIn
          </Button>
        </a>
        <Button
          onClick={onSendReport}
          disabled={reportSent}
          variant="outline"
          className="rounded-full border-[1.5px] border-foreground/20 text-foreground hover:border-accent font-heading font-semibold px-6 h-12"
        >
          {reportSent ? "Report sent ✓" : "Send full report to my email"}
        </Button>
      </div>

      <div className="text-center space-y-2">
        <p className="text-muted-foreground text-sm">Ready to go deeper?</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/learning">
            <Button variant="ghost" className="text-accent font-heading font-semibold hover:bg-accent/10">
              Explore our sessions →
            </Button>
          </Link>
          <Link href="/the-method">
            <Button variant="ghost" className="text-accent font-heading font-semibold hover:bg-accent/10">
              Learn the method →
            </Button>
          </Link>
          <Link href="/book">
            <Button variant="ghost" className="text-accent font-heading font-semibold hover:bg-accent/10">
              Read the book →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
