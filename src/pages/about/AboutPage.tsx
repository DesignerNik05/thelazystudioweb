import { Link } from "react-router-dom";
import { SiteFooter, SiteHeader } from "@/components/layout";
import { aboutBeliefs, aboutClientTypes, aboutRoles, aboutStats } from "@/data/about";

const AboutPage = () => {
  return (
    <main className="site-shell about-page">
      <section className="about-page-hero" aria-labelledby="about-page-title">
        <SiteHeader activePage="about" />
        <img
          className="about-page-hero__image"
          src="/assets/lazy-studio-hero.webp"
          alt="Cinematic red and blue lit creative technologist in a dark studio"
          fetchPriority="high"
        />
        <div className="about-page-hero__shade" />
        <p className="about-page-hero__ghost" aria-hidden="true">
          About
        </p>
        <div className="about-page-hero__content">
          <p className="section-kicker">
            <span />
            About us
          </p>
          <h1 id="about-page-title">A smarter kind of studio.</h1>
          <p>
            The Lazy Studio is an AI-first boutique design and development collective for useful
            interfaces, sharp websites, and cleaner digital workflows.
          </p>
        </div>
      </section>

      <section className="about-breadcrumb-section" aria-label="Breadcrumb">
        <div className="about-breadcrumb-section__inner">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>About</span>
          </nav>
        </div>
      </section>

      <section className="about-story-section" aria-labelledby="about-story-title">
        <div className="about-story-section__inner">
          <aside className="about-story-intro">
            <p className="section-kicker">
              <span />
              The idea
            </p>
            <h2 id="about-story-title">We are lazy. Our work is not.</h2>
            <p>
              The studio exists for businesses that want the quality of a sharp agency without the
              theatre around it. Less noise, cleaner thinking, better execution.
            </p>
          </aside>

          <div className="about-story-panel">
            <blockquote>
              We combine strategy, design, development, and modern AI workflows to help teams make
              digital work that feels premium, useful, and easier to move forward.
            </blockquote>

            <div className="about-stat-grid">
              {aboutStats.map((stat) => (
                <article key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                  <p>{stat.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-beliefs-section" aria-labelledby="about-beliefs-title">
        <div className="about-beliefs-section__inner">
          <div className="about-section-heading">
            <p className="section-kicker">
              <span />
              What we believe
            </p>
            <h2 id="about-beliefs-title">
              Good digital work should feel obvious after it is done.
            </h2>
          </div>

          <div className="about-beliefs-grid">
            {aboutBeliefs.map((belief, index) => (
              <article key={belief.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{belief.title}</h3>
                <p>{belief.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-collective-section" aria-labelledby="about-collective-title">
        <div className="about-collective-section__inner">
          <figure className="about-collective-visual">
            <img
              src="/assets/marquee-consultant.webp"
              alt="Creative strategist in a dark studio workspace"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <span>Collective mode</span>
              <strong>Strategy, design, code, AI, and launch support under one calm roof.</strong>
            </figcaption>
          </figure>

          <div className="about-collective-copy">
            <p className="section-kicker">
              <span />
              Collective, not solo act
            </p>
            <h2 id="about-collective-title">
              Built like a compact studio. Run like a focused product team.
            </h2>
            <p>
              The Lazy Studio brings together the skills most digital projects actually need: UX,
              interface design, websites, front-end thinking, AI workflow design, visual systems,
              and launch support.
            </p>
            <div className="about-role-cloud">
              {aboutRoles.map((role) => (
                <span key={role}>{role}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-clients-section" aria-labelledby="about-clients-title">
        <div className="about-clients-section__inner">
          <div className="about-section-heading">
            <p className="section-kicker">
              <span />
              Who we help
            </p>
            <h2 id="about-clients-title">
              Approachable for small teams. Polished enough for serious ones.
            </h2>
          </div>

          <div className="about-clients-grid">
            {aboutClientTypes.map((client) => (
              <article key={client.title}>
                <h3>{client.title}</h3>
                <p>{client.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-final-cta about-final-cta" aria-labelledby="about-final-title">
        <div className="services-final-cta__inner">
          <p className="section-kicker">
            <span />
            Work less. Mean more.
          </p>
          <h2 id="about-final-title">Have something worth making simpler?</h2>
          <p>
            Bring the goal, the rough edges, and the messy context. We will help shape it into a
            sharper interface, website, workflow, or launch system.
          </p>
          <div>
            <a className="button button--primary" href="#contact">
              Start a project
            </a>
            <Link className="button button--secondary" to="/services">
              View services
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter page="about" />
    </main>
  );
};

export { AboutPage };
