const AboutSection = () => {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-section__inner">
        <aside className="about-intro">
          <p className="section-kicker">
            <span />
            Who we are?
          </p>
          <blockquote>
            <strong>The Lazy Studio</strong> was built on a simple belief: digital work should feel
            sharper, smarter, and lighter to make. We blend strategy, design, development, and
            AI-assisted workflows to help brands move with more clarity and less clutter.
          </blockquote>
          <div className="studio-signature" aria-label="The Lazy Studio creative collective">
            <div className="studio-signature__mark">TLS</div>
            <div>
              <p>The Lazy Studio</p>
              <span>AI-first creative collective</span>
            </div>
          </div>
        </aside>

        <div className="about-divider" aria-hidden="true" />

        <div className="about-main">
          <h2 id="about-title">Useful interfaces. Sharp websites. AI that works.</h2>
          <a className="about-cta" href="#contact">
            Let&apos;s get started <span className="link-arrow" aria-hidden="true" />
          </a>

          <div className="about-cards">
            <article className="about-card">
              <span className="about-card__number">01</span>
              <h3>The studio story</h3>
              <p>
                We are lazy about the right things: bloated process, unnecessary meetings, and work
                that does not move the brand forward. The craft stays awake.
              </p>
            </article>
            <article className="about-card">
              <span className="about-card__number">02</span>
              <h3>The target goal</h3>
              <p>
                To help local businesses, startups, and SaaS teams ship digital experiences that
                feel premium, perform clearly, and make AI genuinely useful.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export { AboutSection };
