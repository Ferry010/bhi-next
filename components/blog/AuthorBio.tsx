import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Linkedin, Mail, ExternalLink } from "lucide-react";

export default function AuthorBio() {
  return (
    <div className="border border-border rounded-2xl p-6 md:p-8 mt-12 bg-secondary">
      <div className="flex flex-col sm:flex-row gap-5">
        <Avatar className="w-20 h-20 shrink-0">
          <AvatarImage src="/assets/ferry.jpg" alt="Ferry Hoes" />
          <AvatarFallback>FH</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-heading font-bold text-foreground text-lg mb-3">About the author</h3>
          <p className="text-muted-foreground leading-relaxed">
            Ferry Hoes is the co-author of{" "}
            <a href="/the-method" className="text-accent hover:underline">Brand Humanizing</a>{" "}
            and founder of the{" "}
            <a href="https://aigeletterdheid.academy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              AI Literacy Academy (AIGA)
            </a>
            . He helps organizations build the bridge between human talent and technology, not as a project, but as a strategy.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <a href="https://www.linkedin.com/in/ferryhoes/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline font-heading font-semibold">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href="mailto:ferry@brandhumanizing.com" className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline font-heading font-semibold">
              <Mail className="w-4 h-4" /> ferry@brandhumanizing.com
            </a>
            <a href="https://www.speakersacademy.com/en/request-a-quote/?speaker_id=153966" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline font-heading font-semibold">
              <ExternalLink className="w-4 h-4" /> Book a keynote
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
