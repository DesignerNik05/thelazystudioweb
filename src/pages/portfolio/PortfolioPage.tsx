import type { PortfolioFilter } from "@/@types";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ProjectVisual, SmartLink } from "@/components/common";
import { SiteFooter, SiteHeader } from "@/components/layout";
import { portfolioFilters, portfolioProjects } from "@/data/projects";
import { servicePageServices } from "@/data/services";

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>("All");
  const featuredProject =
    portfolioProjects.find((project) => project.featured) ?? portfolioProjects[0];
  const filteredProjects = portfolioProjects.filter((project) => {
    const matchesFilter = activeFilter === "All" || project.category === activeFilter;

    return !project.featured && matchesFilter;
  });

  return (
    <main className="site-shell portfolio-page">
      <section className="portfolio-page-hero" aria-labelledby="portfolio-page-title">
        <SiteHeader activePage="portfolio" />
        <img
          className="portfolio-page-hero__image"
          src="/assets/lazy-studio-hero.png"
          alt="Cinematic red and blue lit creative technologist in a dark studio"
        />
        <div className="portfolio-page-hero__shade" />
        <p className="portfolio-page-hero__ghost" aria-hidden="true">
          Portfolio
        </p>
        <div className="portfolio-page-hero__content">
          <p className="section-kicker">
            <span />
            Portfolio
          </p>
          <h1 id="portfolio-page-title">Selected work, minus the filler.</h1>
          <p>
            Interfaces, websites, AI workflows, and digital systems shaped for clarity, usefulness,
            and a little less noise.
          </p>
        </div>
      </section>

      <section className="portfolio-breadcrumb-section" aria-label="Breadcrumb">
        <div className="portfolio-breadcrumb-section__inner">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Portfolio</span>
          </nav>
        </div>
      </section>

      <section className="portfolio-featured-section" aria-labelledby="portfolio-featured-title">
        <div className="portfolio-featured-section__inner">
          <div className="portfolio-featured-heading">
            <p className="section-kicker">
              <span />
              Featured project
            </p>
            <h2 id="portfolio-featured-title">
              A closer look at the kind of digital work we make.
            </h2>
          </div>

          {featuredProject && (
            <article className="portfolio-feature-card">
              <ProjectVisual
                visual={featuredProject.visual}
                className="portfolio-feature-card__visual"
              />
              <div className="portfolio-feature-card__content">
                <div className="portfolio-card__meta">
                  <span>{featuredProject.service}</span>
                  <span>{featuredProject.type}</span>
                </div>
                <h3>{featuredProject.title}</h3>
                <p>{featuredProject.description}</p>
                <div className="portfolio-card__tags">
                  {featuredProject.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="portfolio-card__stats">
                  {featuredProject.stats.map((stat) => (
                    <strong key={stat}>{stat}</strong>
                  ))}
                </div>
                <SmartLink href={featuredProject.href}>
                  View case study <span className="link-arrow" aria-hidden="true" />
                </SmartLink>
              </div>
            </article>
          )}
        </div>
      </section>

      <section className="portfolio-grid-section" aria-labelledby="portfolio-grid-title">
        <div className="portfolio-grid-section__inner">
          <div className="portfolio-grid-heading">
            <div>
              <p className="section-kicker">
                <span />
                Project archive
              </p>
              <h2 id="portfolio-grid-title">Browse by the kind of problem being solved.</h2>
            </div>
            <div className="portfolio-filter-row" aria-label="Portfolio filters">
              {portfolioFilters.map((filter) => (
                <button
                  type="button"
                  className={activeFilter === filter ? "is-active" : ""}
                  onClick={() => setActiveFilter(filter)}
                  key={filter}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="portfolio-project-grid">
            {filteredProjects.map((project, index) => (
              <article className="portfolio-project-card" key={project.title}>
                <ProjectVisual visual={project.visual} className="portfolio-project-card__visual" />
                <div className="portfolio-project-card__content">
                  <div className="portfolio-card__meta">
                    <span>{project.service}</span>
                    <span>{project.type}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="portfolio-card__tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <SmartLink href={project.href}>
                    View case study <span className="link-arrow" aria-hidden="true" />
                  </SmartLink>
                </div>
                <span className="portfolio-project-card__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio-note-section" aria-label="Concept project note">
        <div className="portfolio-note-section__inner">
          <strong>Concept projects, clearly labelled.</strong>
          <p>
            Some projects are concept builds created to show how we think, design, and solve. Real
            client work will be added as the studio grows.
          </p>
        </div>
      </section>

      <section
        className="portfolio-capabilities-section"
        aria-labelledby="portfolio-capabilities-title"
      >
        <div className="portfolio-capabilities-section__inner">
          <div className="portfolio-capabilities-heading">
            <p className="section-kicker">
              <span />
              Capabilities in the work
            </p>
            <h2 id="portfolio-capabilities-title">The portfolio points back to the real offer.</h2>
          </div>
          <div className="portfolio-capabilities-grid">
            {servicePageServices.slice(0, 5).map((service) => (
              <SmartLink href={service.href} key={service.title}>
                <span>{service.kicker}</span>
                <strong>{service.title}</strong>
              </SmartLink>
            ))}
          </div>
        </div>
      </section>

      <section
        className="services-final-cta portfolio-final-cta"
        aria-labelledby="portfolio-final-title"
      >
        <div className="services-final-cta__inner">
          <p className="section-kicker">
            <span />
            Start here
          </p>
          <h2 id="portfolio-final-title">Have something worth making simpler?</h2>
          <p>
            Bring the messy brief. We will help turn it into a sharper interface, website, workflow,
            or launch system.
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

      <SiteFooter page="portfolio" />
    </main>
  );
};

export { PortfolioPage };
