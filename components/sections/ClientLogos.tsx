const logos = [
  { src: "/assets/logos/atos.png", alt: "Atos", className: "max-h-12 max-w-[160px]" },
  { src: "/assets/logos/vodafone.png", alt: "Vodafone", className: "max-h-12 max-w-[180px]" },
  { src: "/assets/logos/gsk.png", alt: "GlaxoSmithKline", className: "max-h-14 max-w-[180px]" },
  { src: "/assets/logos/toshiba.png", alt: "Toshiba", className: "max-h-12 max-w-[170px]" },
  { src: "/assets/logos/ama.webp", alt: "American Marketing Association", className: "max-h-12 max-w-[180px]" },
  { src: "/assets/logos/ziggo.png", alt: "Ziggo", className: "max-h-12 max-w-[180px]" },
  { src: "/assets/logos/chubb.png", alt: "Chubb Fire & Security", className: "max-h-12 max-w-[160px]" },
  { src: "/assets/logos/asr.png", alt: "a.s.r.", className: "max-h-16 max-w-[160px]" },
  { src: "/assets/logos/uwv.png", alt: "UWV", className: "max-h-14 max-w-[160px]" },
  { src: "/assets/logos/minfin.png", alt: "Ministerie van Financiën", className: "max-h-16 max-w-[140px]" },
  { src: "/assets/logos/eindhoven.png", alt: "Gemeente Eindhoven", className: "max-h-16 max-w-[140px]" },
];

export default function ClientLogos() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm font-medium text-muted-foreground/60 uppercase tracking-widest mb-10">
            Trusted by organizations like
          </p>
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div className="flex animate-marquee w-max gap-4">
              {[...logos, ...logos].map((logo, i) => (
                <div key={`${logo.alt}-${i}`} className="flex-shrink-0 flex items-center justify-center px-8">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    className={`object-contain opacity-50 grayscale transition-opacity duration-300 hover:opacity-80 ${logo.className}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
