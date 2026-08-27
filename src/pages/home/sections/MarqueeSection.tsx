import { useMarquee } from "@/hooks";

const MarqueeSection = () => {
  const marqueeRef = useMarquee<HTMLElement>();

  return (
    <section
      className="scroll-marquee-section"
      id="motion"
      ref={marqueeRef}
      aria-label="The Lazy Studio capabilities in motion"
    >
      <div className="scroll-marquee scroll-marquee--top">
        <span>Crafting sharp websites</span>
        <img
          src="/assets/marquee-strategist.webp"
          alt="Creative strategist in a neon-lit studio"
          loading="lazy"
          decoding="async"
        />
        <span>and digital systems</span>
        <img
          src="/assets/marquee-consultant.webp"
          alt="Creative consultant in a modern campaign workspace"
          loading="lazy"
          decoding="async"
        />
        <span>that feel effortless</span>
      </div>
      <div className="scroll-marquee scroll-marquee--bottom">
        <span>Designing the best interfaces</span>
        <img
          src="/assets/marquee-consultant.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
        <span>for brands that move</span>
        <img
          src="/assets/marquee-strategist.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
        <span>without the noise</span>
      </div>
    </section>
  );
};

export { MarqueeSection };
