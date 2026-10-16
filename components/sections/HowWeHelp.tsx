import Ladder from "@/components/Ladder";

// The whole offer in one glance: four levels, lightest to deepest. Everyone
// steps in somewhere; /start helps the ones who can't tell where.
export default function HowWeHelp() {
  return (
    <section id="how-we-help" className="bg-cream section-padding">
      <div className="container max-w-6xl">
        <div className="text-center mb-10 md:mb-14 max-w-2xl mx-auto">
          <h2 className="text-display md:text-display-lg text-foreground">Four levels. Step in where you are.</h2>
          <p className="text-body-lg text-muted-foreground mt-4">
            From a book you read this weekend to a team that runs it without us. Most organisations climb one level at a
            time.
          </p>
        </div>
        <Ladder />
      </div>
    </section>
  );
}
