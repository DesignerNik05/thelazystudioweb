import { Link } from "react-router-dom";
import { SiteFooter, SiteHeader } from "@/components/layout";
import { processPageFaqs } from "@/data/faqs";
import {
  aiWorkflowItems,
  collaborationItems,
  processDeliverables,
  processInputs,
  processPrinciples,
  processSteps,
} from "@/data/process";

const ProcessPage = () => {
  return (
    <main className="site-shell process-page">
      <section className="process-page-hero" aria-labelledby="process-page-title">
        <SiteHeader activePage="process" />
        <img
          className="process-page-hero__image"
          src="/assets/lazy-studio-hero.png"
          alt="Cinematic red and blue lit creative technologist in a dark studio"
        />
        <div className="process-page-hero__shade" />
        <p className="process-page-hero__ghost" aria-hidden="true">
          Process
        </p>
        <div className="process-page-hero__content">
          <p className="section-kicker">
            <span />
            Process
          </p>
          <h1 id="process-page-title">Less process. Better progress.</h1>
          <p>
            A lean, AI-first way to move from messy brief to useful interface, sharp website,
            smarter workflow, and cleaner launch.
          </p>
        </div>
      </section>

      <section className="process-breadcrumb-section" aria-label="Breadcrumb">
        <div className="process-breadcrumb-section__inner">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Process</span>
          </nav>
        </div>
      </section>

      <section className="process-philosophy" aria-labelledby="process-philosophy-title">
        <div className="process-philosophy__inner">
          <div className="process-section-heading">
            <p className="section-kicker">
              <span />
              Philosophy
            </p>
            <h2 id="process-philosophy-title">We remove the extra, not the thinking.</h2>
            <p>
              The Lazy Studio keeps collaboration light and decisions sharp. Fewer handoffs, clearer
              checkpoints, and enough structure to make the work feel calm instead of chaotic.
            </p>
          </div>

          <div className="process-principles-grid">
            {processPrinciples.map((principle, index) => (
              <article key={principle.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="process-timeline-section" aria-labelledby="process-timeline-title">
        <div className="process-timeline-section__inner">
          <aside className="process-timeline-intro">
            <p className="section-kicker">
              <span />
              Timeline
            </p>
            <h2 id="process-timeline-title">Six moves. No theatre.</h2>
            <p>
              Every project is different, but the rhythm stays simple: understand the problem, shape
              the path, make the thing, and improve it with useful intelligence.
            </p>
          </aside>

          <div className="process-timeline-list">
            {processSteps.map((step, index) => (
              <article key={step.title}>
                <span className="process-timeline-list__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <small>{step.label}</small>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <div className="process-chip-row">
                    {step.deliverables.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="process-ai-section" aria-labelledby="process-ai-title">
        <div className="process-ai-section__inner">
          <div>
            <p className="section-kicker">
              <span />
              AI-first workflow
            </p>
            <h2 id="process-ai-title">AI assists. Humans decide.</h2>
          </div>
          <div className="process-ai-panel">
            <p>
              We use AI to move faster through the boring, repetitive, or exploratory parts of the
              work. The final direction still comes from strategy, taste, and what the user actually
              needs.
            </p>
            <div className="process-ai-grid">
              {aiWorkflowItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="process-collaboration-section"
        aria-labelledby="process-collaboration-title"
      >
        <div className="process-collaboration-section__inner">
          <div className="process-section-heading">
            <p className="section-kicker">
              <span />
              Collaboration
            </p>
            <h2 id="process-collaboration-title">How the work should feel.</h2>
            <p>
              Approachable for small businesses, serious enough for startups, and clear enough that
              nobody has to pretend complexity is progress.
            </p>
          </div>

          <div className="process-collaboration-grid">
            {collaborationItems.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="process-deliverables-section"
        aria-labelledby="process-deliverables-title"
      >
        <div className="process-deliverables-section__inner">
          <div className="process-section-heading">
            <p className="section-kicker">
              <span />
              What you get
            </p>
            <h2 id="process-deliverables-title">Useful outputs, grouped by the job.</h2>
          </div>

          <div className="process-deliverables-grid">
            {processDeliverables.map((group) => (
              <article key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="process-inputs-section" aria-labelledby="process-inputs-title">
        <div className="process-inputs-section__inner">
          <div>
            <p className="section-kicker">
              <span />
              What we need
            </p>
            <h2 id="process-inputs-title">No 90-page brief required.</h2>
            <p>
              A clear conversation is a good start. These details simply help us move faster once
              the project begins.
            </p>
          </div>
          <div className="process-inputs-list">
            {processInputs.map((input) => (
              <span key={input}>{input}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="services-faq process-faq-section" aria-labelledby="process-faq-title">
        <div className="services-faq__inner">
          <div className="services-faq__heading">
            <p className="section-kicker">
              <span />
              FAQs
            </p>
            <h2 id="process-faq-title">Process questions, answered without ceremony.</h2>
          </div>
          <div className="services-faq__list">
            {processPageFaqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        className="services-final-cta process-final-cta"
        aria-labelledby="process-final-title"
      >
        <div className="services-final-cta__inner">
          <p className="section-kicker">
            <span />
            Start here
          </p>
          <h2 id="process-final-title">Ready to make the work lighter?</h2>
          <p>
            Bring the goal, the constraints, and the messy parts. We will help shape the cleanest
            route from idea to launch.
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

      <SiteFooter page="process" />
    </main>
  );
};

export { ProcessPage };
