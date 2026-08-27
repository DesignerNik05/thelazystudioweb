import type { FaqFilter } from "@/@types";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SiteFooter, SiteHeader } from "@/components/layout";
import { FAQPageAccordionItem } from "./components";
import { faqPageCategories, faqPageGroups, featuredFaqs } from "@/data/faqs";

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState<FaqFilter>("All");
  const [openQuestion, setOpenQuestion] = useState<string | null>("featured-0");
  const visibleGroups =
    activeCategory === "All"
      ? faqPageGroups
      : faqPageGroups.filter((group) => group.category === activeCategory);

  return (
    <main className="site-shell faq-page">
      <section className="faq-page-hero" aria-labelledby="faq-page-title">
        <SiteHeader activePage="faq" />
        <img
          className="faq-page-hero__image"
          src="/assets/lazy-studio-hero.webp"
          alt="Cinematic red and blue lit creative technologist in a dark studio"
          fetchPriority="high"
        />
        <div className="faq-page-hero__shade" />
        <p className="faq-page-hero__ghost" aria-hidden="true">
          FAQs
        </p>
        <div className="faq-page-hero__content">
          <p className="section-kicker">
            <span />
            FAQs
          </p>
          <h1 id="faq-page-title">Questions, minus the runaround.</h1>
          <p>
            Clear answers about services, process, pricing, AI workflows, websites, launch support,
            and working with The Lazy Studio.
          </p>
        </div>
      </section>

      <section className="faq-breadcrumb-section" aria-label="Breadcrumb">
        <div className="faq-breadcrumb-section__inner">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>FAQs</span>
          </nav>
        </div>
      </section>

      <section className="faq-category-section" aria-labelledby="faq-category-title">
        <div className="faq-category-section__inner">
          <div className="faq-page-heading">
            <p className="section-kicker">
              <span />
              Find your answer
            </p>
            <h2 id="faq-category-title">Pick the thing you are wondering about.</h2>
          </div>

          <div className="faq-category-row" aria-label="FAQ categories">
            {faqPageCategories.map((category) => (
              <button
                type="button"
                className={activeCategory === category ? "is-active" : ""}
                aria-pressed={activeCategory === category}
                onClick={() => {
                  const nextGroup =
                    category === "All"
                      ? faqPageGroups[0]
                      : faqPageGroups.find((group) => group.category === category);

                  setActiveCategory(category);
                  setOpenQuestion(nextGroup ? `${nextGroup.category}-0` : null);
                  window.requestAnimationFrame(() => {
                    document.getElementById("faq-groups")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  });
                }}
                key={category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-featured-section" aria-labelledby="faq-featured-title">
        <div className="faq-featured-section__inner">
          <aside className="faq-featured-intro">
            <p className="section-kicker">
              <span />
              Start here
            </p>
            <h2 id="faq-featured-title">The questions most people ask first.</h2>
            <p>
              If you only skim one section, make it this one. It covers the shape of the studio,
              what we make, how AI fits, and how pricing starts.
            </p>
          </aside>

          <div className="faq-page-list">
            {featuredFaqs.map((item, index) => (
              <FAQPageAccordionItem
                item={item}
                itemKey={`featured-${index}`}
                index={index}
                openQuestion={openQuestion}
                setOpenQuestion={setOpenQuestion}
                key={item.question}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="faq-groups-section" id="faq-groups" aria-labelledby="faq-groups-title">
        <div className="faq-groups-section__inner">
          <div className="faq-page-heading">
            <p className="section-kicker">
              <span />
              Details
            </p>
            <h2 id="faq-groups-title">More answers, grouped by topic.</h2>
          </div>

          <div className="faq-group-stack">
            {visibleGroups.map((group) => (
              <section
                className="faq-group"
                aria-labelledby={`faq-group-${group.category}`}
                key={group.category}
              >
                <div className="faq-group__intro">
                  <span>{group.category}</span>
                  <h3 id={`faq-group-${group.category}`}>{group.title}</h3>
                  <p>{group.description}</p>
                </div>
                <div className="faq-page-list">
                  {group.items.map((item, index) => (
                    <FAQPageAccordionItem
                      item={item}
                      itemKey={`${group.category}-${index}`}
                      index={index}
                      openQuestion={openQuestion}
                      setOpenQuestion={setOpenQuestion}
                      key={item.question}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="services-final-cta faq-final-cta" aria-labelledby="faq-final-title">
        <div className="services-final-cta__inner">
          <p className="section-kicker">
            <span />
            Still curious?
          </p>
          <h2 id="faq-final-title">Still got questions? Good.</h2>
          <p>
            Send the messy context. We will help you find the clean next step, even if the first
            step is just making sense of the brief.
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

      <SiteFooter page="faq" />
    </main>
  );
};

export { FAQPage };
