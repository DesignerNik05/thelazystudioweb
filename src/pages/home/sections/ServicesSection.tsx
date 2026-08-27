import { useCarousel } from "@/hooks";
import { services } from "@/data/services";

const ServicesSection = () => {
  const { carouselRef, loopedItems, activeIndex, getRealIndex, goPrev, goNext, pointerHandlers } =
    useCarousel(services);

  return (
    <section className="services-section" id="services" aria-labelledby="services-title">
      <div className="services-section__inner">
        <div className="services-heading">
          <p className="section-kicker">
            <span />
            Our Services
          </p>
          <h2 id="services-title">Design, build, and smarter workflows. Without the theatre.</h2>
          <p>
            We lead with product design and websites, then use AI where it actually improves speed,
            clarity, or operations.
          </p>
        </div>

        <div className="services-carousel-wrap">
          <div className="services-carousel" ref={carouselRef} {...pointerHandlers}>
            {loopedItems.map((service, index) => {
              const realIndex = getRealIndex(index);

              return (
                <article
                  className="service-card service-card--slide"
                  key={`${service.title}-${index}`}
                >
                  <span className="service-card__number">
                    {String(realIndex + 1).padStart(2, "0")}
                  </span>
                  <p className="service-card__label">{service.label}</p>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-card__tags" aria-label={`${service.title} includes`}>
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="services-controls" aria-label="Services carousel controls">
            <button type="button" aria-label="Previous service" onClick={goPrev}>
              ←
            </button>
            <div className="services-progress" aria-hidden="true">
              {services.map((service, index) => (
                <span className={index === activeIndex ? "is-active" : ""} key={service.title} />
              ))}
            </div>
            <button type="button" aria-label="Next service" onClick={goNext}>
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ServicesSection };
