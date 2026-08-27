import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/layout";

const HeroSection = () => {
  return (
    <section className="hero" id="home" aria-label="The Lazy Studio homepage hero">
      <img
        className="hero__image"
        src="/assets/lazy-studio-hero.webp"
        alt="A cinematic red and blue lit creative technologist in a dark studio"
        fetchPriority="high"
      />
      <div className="hero__shade" />
      <div className="hero__red-glow" />

      <SiteHeader activePage="home" />

      <div className="hero__content">
        <p className="hero__eyebrow">AI-first design and development collective</p>
        <h1>
          Work less.
          <span>Mean more.</span>
        </h1>
        <p className="hero__copy">
          Premium UI/UX, websites, digital products, and useful AI workflows. Human-crafted work
          with less unnecessary overhead.
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href="#contact">
            Start a project
          </a>
          <Link className="button button--secondary" to="/portfolio">
            See portfolio
          </Link>
        </div>
      </div>

      <p className="hero__giant" aria-hidden="true">
        Lazy
      </p>
    </section>
  );
};

export { HeroSection };
