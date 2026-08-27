import { projects } from "@/data/projects";

const WorkSection = () => {
  const featuredProject = projects[0];

  return (
    <section className="projects-section" id="work" aria-labelledby="projects-title">
      <p className="projects-section__ghost" aria-hidden="true">
        Work
      </p>
      <div className="projects-section__inner">
        <div className="projects-heading">
          <p className="section-kicker">
            <span />
            Projects
          </p>
          <div>
            <h2 id="projects-title">Selected digital work, minus the filler.</h2>
            <p>
              A look at the kind of interfaces, websites, and AI-powered systems The Lazy Studio is
              built to craft.
            </p>
          </div>
          <a className="projects-heading__cta" href="#contact">
            Start yours <span className="link-arrow" aria-hidden="true" />
          </a>
        </div>

        <div className="projects-grid">
          {featuredProject && (
            <article className="project-card project-card--featured">
              <div
                className="project-card__visual project-visual project-visual--dashboard"
                aria-hidden="true"
              >
                <span className="project-visual__glow" />
                <span className="project-visual__panel project-visual__panel--wide" />
                <span className="project-visual__panel project-visual__panel--chart" />
                <span className="project-visual__panel project-visual__panel--side" />
                <span className="project-visual__line project-visual__line--one" />
                <span className="project-visual__line project-visual__line--two" />
                <span className="project-visual__dot" />
              </div>
              <div className="project-card__content">
                <div className="project-card__meta">
                  <span>{featuredProject.category}</span>
                  <span>{featuredProject.type}</span>
                </div>
                <h3>{featuredProject.title}</h3>
                <p>{featuredProject.description}</p>
                <div className="project-card__tags">
                  {featuredProject.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="project-card__stats" aria-label="Project highlights">
                  {featuredProject.stats?.map((stat) => (
                    <strong key={stat}>{stat}</strong>
                  ))}
                </div>
              </div>
            </article>
          )}

          <div className="projects-stack">
            {projects.slice(1).map((project, index) => (
              <article className="project-card project-card--compact" key={project.title}>
                <div
                  className={`project-card__visual project-visual project-visual--${project.visual}`}
                  aria-hidden="true"
                >
                  <span className="project-visual__glow" />
                  <span className="project-visual__panel project-visual__panel--wide" />
                  <span className="project-visual__panel project-visual__panel--chart" />
                  <span className="project-visual__panel project-visual__panel--side" />
                  <span className="project-visual__line project-visual__line--one" />
                  <span className="project-visual__line project-visual__line--two" />
                  <span className="project-visual__dot" />
                </div>
                <div className="project-card__content">
                  <div className="project-card__meta">
                    <span>{project.category}</span>
                    <span>{project.type}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-card__tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <span className="project-card__number" aria-hidden="true">
                  {String(index + 2).padStart(2, "0")}
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { WorkSection };
