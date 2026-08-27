import { Link } from "react-router-dom";
import { SmartLink } from "@/components/common";
import { SiteFooter, SiteHeader } from "@/components/layout";
import { servicesPageFaqs } from "@/data/faqs";
import {
  serviceAudiences,
  servicePackages,
  servicePageServices,
  supportAddOns,
} from "@/data/services";

const ServicesPage = () => {
  return (
    <main className="site-shell services-page">
      <section className="services-page-hero" aria-labelledby="services-page-title">
        <SiteHeader activePage="services" />
        <img
          className="services-page-hero__image"
          src="/assets/lazy-studio-hero.webp"
          alt="Cinematic red and blue lit creative technologist in a dark studio"
          fetchPriority="high"
        />
        <div className="services-page-hero__shade" />
        <p className="services-page-hero__ghost" aria-hidden="true">
          Services
        </p>
        <div className="services-page-hero__content">
          <p className="section-kicker">
            <span />
            Services
          </p>
          <h1 id="services-page-title">Services that do the useful parts well.</h1>
          <p>
            UI/UX design, sharp websites, digital product systems, and AI-powered workflows for
            teams that want better digital work with less drag.
          </p>
        </div>
      </section>

      <section className="services-breadcrumb-section" aria-label="Breadcrumb">
        <div className="services-breadcrumb-section__inner">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Services</span>
          </nav>
        </div>
      </section>

      <section className="services-overview" aria-labelledby="services-overview-title">
        <div className="services-overview__inner">
          <div className="services-overview__heading">
            <p className="section-kicker">
              <span />
              What we do
            </p>
            <h2 id="services-overview-title">
              Design and development first. Smart support around it.
            </h2>
            <p>
              The core offer is simple: make the interface better, make the website stronger, and
              use AI where it actually improves the work.
            </p>
          </div>

          <div className="service-page-grid">
            {servicePageServices.map((service, index) => (
              <article
                className={`service-page-card service-page-card--${service.tone}`}
                id={service.href.split("/").pop()}
                key={service.title}
              >
                <div className="service-page-card__top">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <small>{service.kicker}</small>
                </div>
                <h3>{service.title}</h3>
                <strong>{service.line}</strong>
                <p>{service.description}</p>
                <div className="service-page-card__tags">
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <SmartLink href={service.href}>
                  Explore service <span className="link-arrow" aria-hidden="true" />
                </SmartLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-breakdown" aria-labelledby="service-breakdown-title">
        <div className="service-breakdown__inner">
          <aside className="service-breakdown__intro">
            <p className="section-kicker">
              <span />
              Service architecture
            </p>
            <h2 id="service-breakdown-title">A clean stack for serious digital work.</h2>
            <p>
              We keep the primary work in focus and place branding, marketing, SEO, ads, and
              maintenance where they belong: supporting the thing people actually use.
            </p>
          </aside>

          <div className="service-breakdown__list">
            {servicePageServices.slice(0, 3).map((service, index) => (
              <article className="service-breakdown-row" key={service.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <SmartLink href={service.href} aria-label={`Open ${service.title}`}>
                  <span className="link-arrow" aria-hidden="true" />
                </SmartLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="addons-section" aria-labelledby="addons-title">
        <div className="addons-section__inner">
          <div>
            <p className="section-kicker">
              <span />
              Add-ons
            </p>
            <h2 id="addons-title">Marketing support, but not the main character.</h2>
          </div>
          <div className="addons-cloud">
            {supportAddOns.map((addon) => (
              <span key={addon}>{addon}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="audience-section" aria-labelledby="audience-title">
        <div className="audience-section__inner">
          <div className="audience-section__heading">
            <p className="section-kicker">
              <span />
              Who it helps
            </p>
            <h2 id="audience-title">Built for businesses that need clarity, not theatre.</h2>
          </div>
          <div className="audience-grid">
            {serviceAudiences.map((audience) => (
              <article key={audience.title}>
                <h3>{audience.title}</h3>
                <p>{audience.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="packages-section" id="packages" aria-labelledby="packages-title">
        <div className="packages-section__inner">
          <div className="packages-heading">
            <p className="section-kicker">
              <span />
              Packages
            </p>
            <h2 id="packages-title">Engagements shaped around the job.</h2>
            <p>
              Pricing depends on scope, but the entry points stay clear: launch something, improve a
              product, or keep a smart studio in your corner.
            </p>
          </div>

          <div className="packages-grid">
            {servicePackages.map((pack, index) => (
              <article
                className={index === 1 ? "package-card package-card--featured" : "package-card"}
                key={pack.name}
              >
                <span className="package-card__number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{pack.name}</h3>
                <strong>{pack.price}</strong>
                <p>{pack.bestFor}</p>
                <ul>
                  {pack.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a href="#contact">
                  Discuss package <span className="link-arrow" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-process" aria-labelledby="service-process-title">
        <div className="service-process__inner">
          <p className="section-kicker">
            <span />
            Process preview
          </p>
          <h2 id="service-process-title">Understand. Design. Build. Improve.</h2>
          <div className="service-process__steps">
            {["Understand", "Design", "Build", "Improve"].map((step, index) => (
              <article key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-faq" aria-labelledby="services-faq-title">
        <div className="services-faq__inner">
          <div className="services-faq__heading">
            <p className="section-kicker">
              <span />
              FAQs
            </p>
            <h2 id="services-faq-title">A few service questions, answered cleanly.</h2>
          </div>
          <div className="services-faq__list">
            {servicesPageFaqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="services-final-cta" aria-labelledby="services-final-title">
        <div className="services-final-cta__inner">
          <p className="section-kicker">
            <span />
            Start here
          </p>
          <h2 id="services-final-title">Need the useful parts handled?</h2>
          <p>
            Tell us what you are trying to launch, fix, or simplify. We will help shape the cleanest
            next move.
          </p>
          <div>
            <a className="button button--primary" href="#contact">
              Start a project
            </a>
            <Link className="button button--secondary" to="/portfolio">
              See portfolio
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter page="services" />
    </main>
  );
};

export { ServicesPage };
