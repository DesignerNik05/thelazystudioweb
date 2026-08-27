import { testimonials } from "@/data/testimonials";

const TestimonialsSection = () => {
  return (
    <section
      className="testimonials-section"
      id="testimonials"
      aria-labelledby="testimonials-title"
    >
      <div className="testimonials-heading">
        <p className="testimonials-kicker">
          <span />
          What clients say about us?
        </p>
        <h2 id="testimonials-title">
          We’re here for the teams who want sharper work with less drag.
        </h2>
      </div>

      <div className="testimonials-carousel" aria-label="Client testimonials carousel">
        <div className="testimonials-track">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <article
              className="testimonial-card"
              aria-hidden={index >= testimonials.length}
              key={`${testimonial.name}-${index}`}
            >
              <p>{testimonial.quote}</p>
              <div className="testimonial-author">
                <span className="testimonial-author__avatar">{testimonial.initials}</span>
                <span>
                  <strong>{testimonial.name}</strong>
                  <small>{testimonial.role}</small>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export { TestimonialsSection };
