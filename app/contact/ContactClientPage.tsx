"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { notifyByEmail } from "@/lib/notifyByEmail";
import { ArrowRight, ArrowLeft } from "lucide-react";

type Intent = "session" | "project" | "course" | "question";

const sessionTypes = ["Inspiration Session", "Full-Day Course", "Multi-Day Programme", "Not sure yet (take the assessment)"];
const projectTypes = ["The Audit & Brainstorm", "Brand Humanizing Roadmap", "Organisation-Wide Implementation", "The Handover"];
const teamSizes = ["Under 15", "15–30", "30–100", "100–500", "500+"];
const orgSizes = ["1–50 employees", "50–250", "250–1,000", "1,000–10,000", "10,000+"];
const timelines = ["Within 1 month", "1–3 months", "3–6 months", "No rush, exploring options"];
const foundUsOptions = ["Google", "LinkedIn", "Word of mouth", "Speakers Academy", "Event", "Other"];

const productToSessionType: Record<string, string> = {
  "inspiration-session": "Inspiration Session",
  "work-with-us-inspiration-session": "Inspiration Session",
  "full-day-course": "Full-Day Course",
  "multi-day-programme": "Multi-Day Programme",
  "audit-and-brainstorm": "The Audit & Brainstorm",
  "human-technology-fit-audit": "The Audit & Brainstorm",
  "brand-humanizing-roadmap": "Brand Humanizing Roadmap",
  "organisation-wide-implementation": "Organisation-Wide Implementation",
  "handover": "The Handover",
  "online-course": "Online Course",
  "ai-literacy-certificate": "AI Literacy Certificate",
};

const projectProducts = ["audit-and-brainstorm", "human-technology-fit-audit", "brand-humanizing-roadmap", "organisation-wide-implementation", "handover"];
const courseProducts = ["online-course", "ai-literacy-certificate"];

function ContactForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<1 | 2>(1);
  const [intent, setIntent] = useState<Intent | "">("");
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [projectType, setProjectType] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [timeline, setTimeline] = useState("");
  const [orgSize, setOrgSize] = useState("");
  const [message, setMessage] = useState("");
  const [foundUs, setFoundUs] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const product = searchParams.get("product");
    if (product && productToSessionType[product]) {
      if (projectProducts.includes(product)) {
        setIntent("project");
        setProjectType(productToSessionType[product]);
      } else if (courseProducts.includes(product)) {
        setIntent("course");
      } else {
        setIntent("session");
        setSessionType(productToSessionType[product]);
      }
      setStep(2);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !intent) return;
    setLoading(true);
    try {
      const formData = {
        name: name.trim(),
        email: email.trim(),
        organization: organization.trim() || undefined,
        looking_for:
          intent === "session"
            ? `Session: ${sessionType}`
            : intent === "project"
            ? `Project: ${projectType}`
            : intent === "course"
            ? "Online course or certificate"
            : "General question",
        message: message.trim() || undefined,
        found_us: foundUs || undefined,
        ...(intent === "session" && { session_type: sessionType, team_size: teamSize, timeline }),
        ...(intent === "project" && { project_type: projectType, org_size: orgSize, timeline }),
      };
      const submissionId = crypto.randomUUID();
      const supabase = createSupabaseBrowserClient();
      await supabase.from("form_submissions" as any).insert({ id: submissionId, form_type: "contact", data: formData } as any);
      await supabase.functions.invoke("notify-slack", { body: { form_type: "contact", data: formData } });
      notifyByEmail("contact", formData, submissionId);
      setSubmitted(true);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  const suggestedPage =
    intent === "session"
      ? { label: "See what a session includes", to: "/learning" }
      : intent === "project"
      ? { label: "Read about how we work", to: "/work-with-us" }
      : { label: "Explore the research", to: "/research" };

  return (
    <section className="mb-16 md:mb-20">
      {submitted ? (
        <div className="bg-accent/10 border border-accent/20 rounded-3xl p-8 md:p-12 text-center">
          <span className="text-5xl mb-4 block">✅</span>
          <p className="text-accent font-heading font-semibold text-xl mb-2">
            Thanks, {name.split(" ")[0]}. A human will reply within 24 hours.
          </p>
          <p className="text-muted-foreground mb-6">We mean that.</p>
          <Link href={suggestedPage.to} className="inline-flex items-center gap-2 text-accent font-heading font-semibold hover:underline">
            {suggestedPage.label} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">
                What brings you here?
              </h2>
              <RadioGroup value={intent} onValueChange={(v) => setIntent(v as Intent)} className="space-y-3">
                {[
                  { value: "session", label: "I want to book a learning session", desc: "Inspiration session, workshop, or training for your team" },
                  { value: "project", label: "I want to start a project", desc: "Audit, roadmap, implementation, or customer journey work" },
                  { value: "course", label: "I want the online course or certificate", desc: "Self-paced learning or AI literacy certification" },
                  { value: "question", label: "I have a question", desc: "About the book, research, media, or something else" },
                ].map((opt) => (
                  <Label
                    key={opt.value}
                    htmlFor={opt.value}
                    className={`flex items-start gap-4 rounded-2xl p-5 cursor-pointer transition-all border-2 ${
                      intent === opt.value ? "border-accent bg-accent/5" : "border-foreground/10 bg-white hover:border-foreground/20"
                    }`}
                  >
                    <RadioGroupItem value={opt.value} id={opt.value} className="mt-0.5" />
                    <div>
                      <span className="font-heading font-semibold text-foreground block">{opt.label}</span>
                      <span className="text-sm text-muted-foreground">{opt.desc}</span>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
              <Button
                type="button"
                disabled={!intent}
                onClick={() => setStep(2)}
                className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2"
              >
                Next <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <button type="button" onClick={() => setStep(1)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-2">
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">Tell us a bit more</h2>
              <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required className="rounded-2xl h-12 bg-foreground/5 border-border" />
              <Input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="rounded-2xl h-12 bg-foreground/5 border-border" />
              <Input placeholder="Your organization (optional)" value={organization} onChange={(e) => setOrganization(e.target.value)} className="rounded-2xl h-12 bg-foreground/5 border-border" />

              {intent === "session" && (
                <>
                  <Select value={sessionType} onValueChange={setSessionType}>
                    <SelectTrigger className="rounded-2xl h-12 bg-foreground/5 border-border"><SelectValue placeholder="What type of session?" /></SelectTrigger>
                    <SelectContent>{sessionTypes.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                  </Select>
                  <Select value={teamSize} onValueChange={setTeamSize}>
                    <SelectTrigger className="rounded-2xl h-12 bg-foreground/5 border-border"><SelectValue placeholder="Estimated team size" /></SelectTrigger>
                    <SelectContent>{teamSizes.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                  </Select>
                  <Select value={timeline} onValueChange={setTimeline}>
                    <SelectTrigger className="rounded-2xl h-12 bg-foreground/5 border-border"><SelectValue placeholder="When are you thinking?" /></SelectTrigger>
                    <SelectContent>{timelines.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                  </Select>
                </>
              )}

              {intent === "project" && (
                <>
                  <Select value={projectType} onValueChange={setProjectType}>
                    <SelectTrigger className="rounded-2xl h-12 bg-foreground/5 border-border"><SelectValue placeholder="What type of project?" /></SelectTrigger>
                    <SelectContent>{projectTypes.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                  </Select>
                  <Select value={timeline} onValueChange={setTimeline}>
                    <SelectTrigger className="rounded-2xl h-12 bg-foreground/5 border-border"><SelectValue placeholder="What&apos;s your timeline?" /></SelectTrigger>
                    <SelectContent>{timelines.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                  </Select>
                  <Select value={orgSize} onValueChange={setOrgSize}>
                    <SelectTrigger className="rounded-2xl h-12 bg-foreground/5 border-border"><SelectValue placeholder="Organization size" /></SelectTrigger>
                    <SelectContent>{orgSizes.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                  </Select>
                </>
              )}

              <Textarea
                placeholder={intent === "question" ? "What would you like to know?" : "Anything else we should know? (optional)"}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="rounded-2xl bg-foreground/5 border-border min-h-[120px]"
                required={intent === "question"}
              />
              <Select value={foundUs} onValueChange={setFoundUs}>
                <SelectTrigger className="rounded-2xl h-12 bg-foreground/5 border-border"><SelectValue placeholder="How did you find us? (optional)" /></SelectTrigger>
                <SelectContent>{foundUsOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <Button type="submit" disabled={loading} className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base w-full md:w-auto">
                {loading ? "Sending..." : "Send it"}
              </Button>
            </div>
          )}
        </form>
      )}
    </section>
  );
}

export default function ContactClientPage() {
  return (
    <div className="min-h-screen bg-secondary text-foreground">
      <Navbar variant="light" />
      <main className="container max-w-3xl pb-24 md:pb-32">
        <section className="text-center pt-28 md:pt-36 pb-12 md:pb-16">
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
            <span className="text-7xl" role="img" aria-label="waving hand">👋</span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-4">
            Talk to a human.
          </h1>
          <p className="text-accent font-heading font-semibold text-lg md:text-xl">
            Not a chatbot. Not a form that goes nowhere. An actual person.
          </p>
        </section>

        <section className="border-l-4 border-accent pl-6 md:pl-8 py-2 mb-12 md:mb-16">
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
            No bots. No automated sequences. No CRM-triggered emails pretending to be personal. If you reach out, Ferry or Jonathan reads it and responds. Usually within one business day.
          </p>
        </section>

        <section className="flex justify-center mb-12 md:mb-16">
          <div className="bg-white rounded-2xl shadow-md px-8 py-6 text-center">
            <p className="text-text-light/70 text-xs uppercase tracking-widest font-heading mb-2">Response time</p>
            <p className="text-5xl md:text-6xl font-heading font-bold text-accent">&lt; 24h</p>
            <p className="text-text-light/70 text-sm mt-2">A real human. Always.</p>
          </div>
        </section>

        <Suspense fallback={<div className="h-96 animate-pulse bg-muted rounded-2xl" />}>
          <ContactForm />
        </Suspense>

        <section className="space-y-4 mb-16 md:mb-20">
          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-l-accent">
            <h3 className="font-heading font-bold text-lg text-near-black mb-2">Looking for Ferry as a speaker? 🎤</h3>
            <p className="text-text-light mb-3">Keynotes, event hosting, and conference appearances go through Speakers Academy.</p>
            <a href="https://www.speakersacademy.com/en/request-a-quote/?speaker_id=153966" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">
              Book via Speakers Academy →
            </a>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-l-accent">
            <h3 className="font-heading font-bold text-lg text-near-black mb-2">Direct email ✉️</h3>
            <p className="text-text-light"><a href="mailto:ferry@brandhumanizing.com" className="text-accent hover:underline">ferry@brandhumanizing.com</a></p>
            <p className="text-text-light"><a href="mailto:jonathan@brandhumanizing.com" className="text-accent hover:underline">jonathan@brandhumanizing.com</a></p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-l-accent">
            <h3 className="font-heading font-bold text-lg text-near-black mb-2">Location 📍</h3>
            <p className="text-text-light">Brand Humanizing Institute</p>
            <p className="text-text-light">Rotterdam, The Netherlands</p>
          </div>
        </section>

        <section className="text-center pt-4 pb-8">
          <p className="font-heading text-2xl md:text-3xl font-bold text-accent mb-4">
            Looking forward to hearing from you!
          </p>
          <p className="text-muted-foreground text-lg">
            Or just say hi. That works too. 👋
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
