import { logoMarks } from "@/data/testimonials";

const LogosSection = () => {
  return (
    <section className="logos-section" aria-label="Selected brand marks carousel">
      <div className="logos-track">
        {[...logoMarks, ...logoMarks].map((logo, index) => (
          <div
            className={`logo-card logo-card--${logo.shape} logo-card--${logo.tone}`}
            aria-hidden={index >= logoMarks.length}
            key={`${logo.name}-${index}`}
          >
            <span className="logo-card__mark">{logo.mark}</span>
            <span className="logo-card__name">{logo.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export { LogosSection };
