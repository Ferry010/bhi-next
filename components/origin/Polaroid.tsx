// A photo in a classic polaroid frame with a handwritten caption underneath.
// Used across the origin-story tour. Plain <img> (varied aspect ratios) so we
// never crop a wide shot like the founding line to a square.
type PolaroidProps = {
  src: string;
  alt: string;
  caption: string;
  /** Degrees of tilt, for the scattered-on-a-table feel. */
  rotate?: number;
  className?: string;
  /** Tailwind width classes; override per placement. */
  widthClass?: string;
};

export default function Polaroid({
  src,
  alt,
  caption,
  rotate = 0,
  className = "",
  widthClass = "w-56 sm:w-64 md:w-72",
}: PolaroidProps) {
  return (
    <figure
      className={`bg-white px-2.5 pt-2.5 pb-1 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.65)] ring-1 ring-black/5 ${widthClass} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <img src={src} alt={alt} loading="lazy" className="block w-full h-auto object-cover" />
      <figcaption className="font-handwritten text-foreground/80 text-center text-xl md:text-2xl leading-tight px-1 py-2.5">
        {caption}
      </figcaption>
    </figure>
  );
}
