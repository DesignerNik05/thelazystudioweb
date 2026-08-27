const ProcessSection = () => {
  return (
    <section className="creativity-section" id="process" aria-labelledby="creativity-title">
      <div className="creativity-dots" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="orb-scene" aria-hidden="true">
        <div className="orb-ring orb-ring--back" />
        <div className="orb-core" />
        <div className="orb-ring orb-ring--front" />
        <div className="orb-moon" />
      </div>
      <div className="creativity-content">
        <h2 id="creativity-title">Effortless creativity for meaningful work.</h2>
        <p>
          We remove the heavy process, keep the thinking sharp, and use AI where it helps ideas move
          from brief to launch with less drag.
        </p>
        <a href="#contact">Start with a smarter workflow</a>
      </div>
    </section>
  );
};

export { ProcessSection };
