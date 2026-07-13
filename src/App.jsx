import { useEffect, useRef, useState } from "react";

const services = [
  {
    title: "UI/UX Design",
    label: "Interfaces humans actually enjoy.",
    description:
      "User flows, wireframes, product screens, prototypes, UX audits, and design systems for websites, SaaS, and mobile products.",
    tags: ["UX Strategy", "Product UI", "Design Systems"],
  },
  {
    title: "Website Design & Development",
    label: "Your whole web presence. Done.",
    description:
      "Modern websites, landing pages, responsive front-end builds, WordPress support, redesigns, and ongoing website care.",
    tags: ["Websites", "Front-end", "Maintenance"],
  },
  {
    title: "Digital Marketing",
    label: "Growth support without the noise.",
    description:
      "SEO foundations, social media creatives, campaign design, paid ad assets, content systems, and performance-minded launch support.",
    tags: ["SEO", "SMO", "Campaigns"],
  },
  {
    title: "AI Products & Workflows",
    label: "AI that does something useful.",
    description:
      "Assistants, workflow automation, AI-enabled websites, internal tools, integrations, and rapid prototypes shaped around real business outcomes.",
    tags: ["AI Tools", "Automation", "Rapid Prototypes"],
  },
  {
    title: "Branding & Identity",
    label: "A sharper visual foundation.",
    description:
      "Logo direction, visual identity, typography, color systems, brand assets, and lightweight guidelines for digital-first brands.",
    tags: ["Identity", "Brand Systems", "Visual Direction"],
  },
  {
    title: "Growth Support",
    label: "Marketing that supports the work.",
    description:
      "SEO foundations, social creatives, campaign design, paid ad assets, content systems, and performance-minded launch support.",
    tags: ["SEO", "Social Design", "Campaigns"],
  },
];

const projects = [
  {
    title: "SaaS dashboard redesign",
    category: "UI/UX Design",
    type: "Concept project",
    description:
      "A cleaner product interface for teams that need faster decisions, sharper flows, and a design system that can actually scale.",
    tags: ["UX Audit", "Product UI", "Design System"],
    visual: "dashboard",
    stats: ["42 screens", "SaaS UI"],
  },
  {
    title: "Local business website",
    category: "Website Design & Development",
    type: "Concept project",
    description:
      "A premium web presence for a growing local brand, built around clear services, stronger trust, and easier enquiries.",
    tags: ["Website", "Responsive", "SEO Base"],
    visual: "website",
  },
  {
    title: "AI workflow console",
    category: "AI Products & Workflows",
    type: "Concept project",
    description:
      "An internal assistant experience for turning scattered tasks into useful, repeatable business workflows.",
    tags: ["AI Assistant", "Automation", "Ops"],
    visual: "ai",
  },
  {
    title: "Launch campaign system",
    category: "Digital Marketing",
    type: "Concept project",
    description:
      "A compact campaign kit that connects landing pages, social creatives, search basics, and performance tracking.",
    tags: ["Campaigns", "Social", "Tracking"],
    visual: "campaign",
  },
];

const testimonials = [
  {
    quote:
      "The Lazy Studio made the whole thing feel lighter. Strategy was clear, the screens were sharp, and the final website felt premium without months of noise.",
    name: "SaaS founder",
    role: "Product redesign",
    initials: "SF",
  },
  {
    quote:
      "They understood what we needed fast: a website that looked serious, explained the offer clearly, and helped customers take the next step.",
    name: "Local business owner",
    role: "Website build",
    initials: "LB",
  },
  {
    quote:
      "The AI workflow ideas were actually useful. Not gimmicks, not demos for the sake of it, just smart systems that saved our team time.",
    name: "Operations lead",
    role: "AI workflow",
    initials: "OL",
  },
  {
    quote:
      "The design direction finally made our product feel as good as the thing we had built. Cleaner, calmer, and much easier to explain.",
    name: "Startup team",
    role: "UI/UX design",
    initials: "ST",
  },
  {
    quote:
      "Fast, thoughtful, and weirdly calm. The work moved quickly, but nothing felt rushed. That balance is rare.",
    name: "Growth partner",
    role: "Launch support",
    initials: "GP",
  },
];

const logoMarks = [
  { name: "Northline", mark: "N", shape: "pill", tone: "red" },
  { name: "Flowbase", mark: "F", shape: "square", tone: "muted" },
  { name: "Kairo", mark: "K", shape: "pill", tone: "white" },
  { name: "Monora", mark: "M", shape: "square", tone: "muted" },
  { name: "Luma Labs", mark: "L", shape: "pill", tone: "red" },
  { name: "Vertex", mark: "V", shape: "square", tone: "white" },
];

const blogPosts = [
  {
    title: "Why your website should do less, better",
    date: "July 13, 2026",
    datetime: "2026-07-13",
    excerpt:
      "The strongest websites do not shout at visitors. They guide the right people toward the right action with less friction.",
    image: "/assets/lazy-studio-hero.png",
    alt: "Cinematic red and blue lit creative technologist in a dark studio",
    featured: true,
  },
  {
    title: "A useful UX audit before the redesign sprint",
    date: "June 28, 2026",
    datetime: "2026-06-28",
    excerpt:
      "Before changing the visuals, find the leaks: unclear flows, weak hierarchy, missing trust, and decisions that make users work too hard.",
    image: "/assets/marquee-consultant.png",
    alt: "Creative consultant reviewing digital campaign work",
  },
  {
    title: "AI workflows that are actually worth building",
    date: "June 10, 2026",
    datetime: "2026-06-10",
    excerpt:
      "Good AI systems remove repetitive work, clarify decisions, and give teams time back. The trick is starting with the workflow, not the tool.",
    image: "/assets/marquee-strategist.png",
    alt: "Creative strategist in a neon-lit studio",
  },
];

const faqItems = [
  {
    question: "What kind of projects do you take on?",
    answer:
      "We focus on UI/UX design, websites, SaaS interfaces, AI-powered workflows, and digital systems for local businesses, startups, and growing teams.",
  },
  {
    question: "Can you design and build the full website?",
    answer:
      "Yes. We can handle strategy, interface design, responsive development, launch support, and post-launch maintenance so the whole web presence stays coherent.",
  },
  {
    question: "How do you use AI in the process?",
    answer:
      "AI helps us move faster through research, prototyping, automation, content structure, and workflow ideas. The taste, decisions, and final craft stay human.",
  },
  {
    question: "Do you also handle marketing, SEO, and ads?",
    answer:
      "Yes, as supporting services. We can help with SEO foundations, campaign creatives, social content, paid ad assets, and performance tracking around the core website or product work.",
  },
];

export function App() {
  const carouselRef = useRef(null);
  const marqueeRef = useRef(null);
  const dragState = useRef({ isDragging: false, startX: 0, scrollLeft: 0, didDrag: false });
  const virtualIndexRef = useRef(3);
  const normalizeTimer = useRef(null);
  const animationFrame = useRef(null);
  const pauseAutoUntil = useRef(0);
  const [activeService, setActiveService] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const loopedServices = [
    ...services.slice(-3),
    ...services,
    ...services.slice(0, 3),
  ];

  useEffect(() => {
    if (!window.location.hash) {
      return;
    }

    window.requestAnimationFrame(() => {
      document.querySelector(window.location.hash)?.scrollIntoView();
    });
  }, []);

  const getCarouselStep = () => {
    const carousel = carouselRef.current;
    const card = carousel?.querySelector(".service-card");

    if (!carousel || !card) {
      return null;
    }

    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap || "0");
    return card.offsetWidth + gap;
  };

  const getRealIndex = (virtualIndex) =>
    ((virtualIndex - 3) % services.length + services.length) % services.length;

  const normalizeLoopPosition = () => {
    const carousel = carouselRef.current;
    const step = getCarouselStep();

    if (!carousel || !step) {
      return;
    }

    let virtualIndex = virtualIndexRef.current;

    if (virtualIndex >= services.length + 3) {
      virtualIndex -= services.length;
    }

    if (virtualIndex < 3) {
      virtualIndex += services.length;
    }

    if (virtualIndex !== virtualIndexRef.current) {
      virtualIndexRef.current = virtualIndex;
      carousel.scrollTo({ left: virtualIndex * step, behavior: "auto" });
    }
  };

  const animateCarouselTo = (targetLeft, duration = 3600) => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    window.cancelAnimationFrame(animationFrame.current);
    const startLeft = carousel.scrollLeft;
    const distance = targetLeft - startLeft;
    const startTime = performance.now();
    const originalSnap = carousel.style.scrollSnapType;
    carousel.style.scrollSnapType = "none";

    const easeInOutCubic = (progress) =>
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    const tick = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      carousel.scrollLeft = startLeft + distance * easeInOutCubic(progress);

      if (progress < 1) {
        animationFrame.current = window.requestAnimationFrame(tick);
        return;
      }

      carousel.style.scrollSnapType = originalSnap;
    };

    animationFrame.current = window.requestAnimationFrame(tick);
  };

  const scrollToVirtualService = (virtualIndex, behavior = "smooth") => {
    const carousel = carouselRef.current;
    const step = getCarouselStep();

    if (!carousel || !step) {
      return;
    }

    window.clearTimeout(normalizeTimer.current);
    virtualIndexRef.current = virtualIndex;
    setActiveService(getRealIndex(virtualIndex));

    if (behavior === "smooth") {
      animateCarouselTo(virtualIndex * step);
    } else {
      carousel.scrollTo({ left: virtualIndex * step, behavior: "auto" });
    }

    normalizeTimer.current = window.setTimeout(normalizeLoopPosition, behavior === "smooth" ? 3700 : 0);
  };

  const scrollToService = (index) => {
    pauseAutoUntil.current = Date.now() + 6000;
    const realIndex = ((index % services.length) + services.length) % services.length;
    scrollToVirtualService(realIndex + 3);
  };

  useEffect(() => {
    const initializeCarousel = () => {
      const step = getCarouselStep();

      if (step && carouselRef.current) {
        carouselRef.current.scrollLeft = virtualIndexRef.current * step;
      }
    };

    window.requestAnimationFrame(initializeCarousel);
    window.addEventListener("resize", initializeCarousel);

    return () => window.removeEventListener("resize", initializeCarousel);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (Date.now() < pauseAutoUntil.current || dragState.current.isDragging) {
        return;
      }

      scrollToVirtualService(virtualIndexRef.current + 1);
    }, 11800);

    return () => {
      window.clearInterval(interval);
      window.cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  const handlePointerDown = (event) => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    dragState.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: carousel.scrollLeft,
      didDrag: false,
    };
    pauseAutoUntil.current = Date.now() + 7000;
    window.cancelAnimationFrame(animationFrame.current);
    carousel.style.scrollSnapType = "none";
    carousel.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const carousel = carouselRef.current;

    if (!carousel || !dragState.current.isDragging) {
      return;
    }

    const delta = event.clientX - dragState.current.startX;
    dragState.current.didDrag = Math.abs(delta) > 4;
    carousel.scrollLeft = dragState.current.scrollLeft - delta;
  };

  const handlePointerUp = (event) => {
    const carousel = carouselRef.current;
    const card = carousel?.querySelector(".service-card");

    if (!carousel || !card) {
      return;
    }

    dragState.current.isDragging = false;
    carousel.style.scrollSnapType = "";
    carousel.releasePointerCapture?.(event.pointerId);
    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap || "0");
    const index = Math.round(carousel.scrollLeft / (card.offsetWidth + gap));
    pauseAutoUntil.current = Date.now() + 7000;
    scrollToVirtualService(index);
  };

  useEffect(() => {
    const section = marqueeRef.current;

    if (!section) {
      return undefined;
    }

    let frame = 0;

    const updateMarquee = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const total = rect.height + viewport;
      const progress = Math.min(Math.max((viewport - rect.top) / total, 0), 1);
      section.style.setProperty("--marquee-progress", progress.toFixed(4));
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateMarquee);
    };

    updateMarquee();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <main className="site-shell">
      <section className="hero" id="home" aria-label="The Lazy Studio homepage hero">
        <img
          className="hero__image"
          src="/assets/lazy-studio-hero.png"
          alt="A cinematic red and blue lit creative technologist in a dark studio"
        />
        <div className="hero__shade" />
        <div className="hero__red-glow" />

        <header className="header">
          <a className="wordmark" href="/" aria-label="The Lazy Studio home">
            The Lazy Studio
          </a>

          <nav className="nav" aria-label="Primary navigation">
            <a href="#home" className="nav__link nav__link--active">
              Home
            </a>
            <a href="#work" className="nav__link">
              Work
            </a>
            <a href="#services" className="nav__link">
              Services
            </a>
            <a href="#process" className="nav__link">
              Process
            </a>
            <a href="#faqs" className="nav__link">
              FAQs
            </a>
            <a href="#blog" className="nav__link">
              Blog
            </a>
            <a href="#about" className="nav__link">
              About
            </a>
            <a href="#contact" className="nav__link">
              Contact
            </a>
          </nav>

          <a className="header__cta" href="#contact">
            Start a project
          </a>
        </header>

        <div className="hero__content">
          <p className="hero__eyebrow">AI-first design and development collective</p>
          <h1>
            Work less.
            <span>Mean more.</span>
          </h1>
          <p className="hero__copy">
            Premium UI/UX, websites, digital products, and useful AI workflows.
            Human-crafted work with less unnecessary overhead.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#contact">
              Start a project
            </a>
            <a className="button button--secondary" href="#work">
              See the work
            </a>
          </div>
        </div>

        <p className="hero__giant" aria-hidden="true">
          Lazy
        </p>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title">
        <div className="about-section__inner">
          <aside className="about-intro">
            <p className="section-kicker">
              <span />
              Who we are?
            </p>
            <blockquote>
              <strong>The Lazy Studio</strong> was built on a simple belief:
              digital work should feel sharper, smarter, and lighter to make.
              We blend strategy, design, development, and AI-assisted workflows
              to help brands move with more clarity and less clutter.
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
              Let's get started <span aria-hidden="true">&nearr;</span>
            </a>

            <div className="about-cards">
              <article className="about-card">
                <span className="about-card__number">01</span>
                <h3>The studio story</h3>
                <p>
                  We are lazy about the right things: bloated process,
                  unnecessary meetings, and work that does not move the brand
                  forward. The craft stays awake.
                </p>
              </article>
              <article className="about-card">
                <span className="about-card__number">02</span>
                <h3>The target goal</h3>
                <p>
                  To help local businesses, startups, and SaaS teams ship
                  digital experiences that feel premium, perform clearly, and
                  make AI genuinely useful.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section" id="services" aria-labelledby="services-title">
        <div className="services-section__inner">
          <div className="services-heading">
            <p className="section-kicker">
              <span />
              Our Services
            </p>
            <h2 id="services-title">Design, build, and smarter workflows. Without the theatre.</h2>
            <p>
              We lead with product design and websites, then use AI where it
              actually improves speed, clarity, or operations.
            </p>
          </div>

          <div className="services-carousel-wrap">
            <div
              className="services-carousel"
              ref={carouselRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {loopedServices.map((service, index) => {
                const realIndex = getRealIndex(index);

                return (
                <article className="service-card service-card--slide" key={`${service.title}-${index}`}>
                <span className="service-card__number">{String(realIndex + 1).padStart(2, "0")}</span>
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
              <button
                type="button"
                aria-label="Previous service"
                onClick={() => {
                  pauseAutoUntil.current = Date.now() + 9000;
                  scrollToVirtualService(virtualIndexRef.current - 1);
                }}
              >
                ←
              </button>
              <div className="services-progress" aria-hidden="true">
                {services.map((service, index) => (
                  <span
                    className={index === activeService ? "is-active" : ""}
                    key={service.title}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next service"
                onClick={() => {
                  pauseAutoUntil.current = Date.now() + 9000;
                  scrollToVirtualService(virtualIndexRef.current + 1);
                }}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

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
            We remove the heavy process, keep the thinking sharp, and use AI
            where it helps ideas move from brief to launch with less drag.
          </p>
          <a href="#contact">Start with a smarter workflow</a>
        </div>
      </section>

      <section className="scroll-marquee-section" id="motion" ref={marqueeRef} aria-label="The Lazy Studio capabilities in motion">
        <div className="scroll-marquee scroll-marquee--top">
          <span>Crafting sharp websites</span>
          <img src="/assets/marquee-strategist.png" alt="Creative strategist in a neon-lit studio" />
          <span>and digital systems</span>
          <img src="/assets/marquee-consultant.png" alt="Creative consultant in a modern campaign workspace" />
          <span>that feel effortless</span>
        </div>
        <div className="scroll-marquee scroll-marquee--bottom">
          <span>Designing the best interfaces</span>
          <img src="/assets/marquee-consultant.png" alt="" aria-hidden="true" />
          <span>for brands that move</span>
          <img src="/assets/marquee-strategist.png" alt="" aria-hidden="true" />
          <span>without the noise</span>
        </div>
      </section>

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
                A look at the kind of interfaces, websites, and AI-powered
                systems The Lazy Studio is built to craft.
              </p>
            </div>
            <a className="projects-heading__cta" href="#contact">
              Start yours <span aria-hidden="true">&nearr;</span>
            </a>
          </div>

          <div className="projects-grid">
            <article className="project-card project-card--featured">
              <div className="project-card__visual project-visual project-visual--dashboard" aria-hidden="true">
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
                  <span>{projects[0].category}</span>
                  <span>{projects[0].type}</span>
                </div>
                <h3>{projects[0].title}</h3>
                <p>{projects[0].description}</p>
                <div className="project-card__tags">
                  {projects[0].tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="project-card__stats" aria-label="Project highlights">
                  {projects[0].stats.map((stat) => (
                    <strong key={stat}>{stat}</strong>
                  ))}
                </div>
              </div>
            </article>

            <div className="projects-stack">
              {projects.slice(1).map((project, index) => (
                <article className="project-card project-card--compact" key={project.title}>
                  <div className={`project-card__visual project-visual project-visual--${project.visual}`} aria-hidden="true">
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

      <section className="faq-section" id="faqs" aria-labelledby="faq-title">
        <p className="faq-section__ghost" aria-hidden="true">
          FAQ
        </p>
        <div className="faq-section__inner">
          <aside className="faq-visual" aria-label="Frequently asked questions introduction">
            <p className="section-kicker">
              <span />
              FAQs
            </p>
            <h2 id="faq-title">Questions before we get pleasantly productive.</h2>
            <p>
              A few quick answers about working with The Lazy Studio, what we
              build, and where AI actually fits.
            </p>
            <img
              src="/assets/faq-liquid-blob.png"
              alt="Glossy black abstract liquid form"
              className="faq-visual__blob"
            />
          </aside>

          <div className="faq-list">
            {faqItems.map((item, index) => {
              const isOpen = activeFaq === index;
              const answerId = `faq-answer-${index}`;

              return (
                <article className={isOpen ? "faq-item is-open" : "faq-item"} key={item.question}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                  >
                    <span className="faq-item__index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="faq-item__question">{item.question}</span>
                    <span className="faq-item__toggle" aria-hidden="true" />
                  </button>
                  <div className="faq-item__answer" id={answerId} aria-hidden={!isOpen}>
                    <p>{item.answer}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="testimonials-section" id="testimonials" aria-labelledby="testimonials-title">
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

      <section className="blog-section" id="blog" aria-labelledby="blog-title">
        <div className="blog-section__inner">
          <div className="blog-heading">
            <h2 id="blog-title">Latest Blogs</h2>
            <a className="blog-heading__cta" href="#blog">
              More blogs <span aria-hidden="true">&nearr;</span>
            </a>
          </div>

          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article
                className={post.featured ? "blog-card blog-card--featured" : "blog-card"}
                key={post.title}
              >
                <div className="blog-card__media">
                  <img src={post.image} alt={post.alt} />
                </div>
                <div className="blog-card__content">
                  <time dateTime={post.datetime}>{post.date}</time>
                  <h3>{post.title}</h3>
                  {!post.featured && <p>{post.excerpt}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

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

      <section className="contact-video-section" id="contact" aria-labelledby="contact-title">
        <div className="contact-video__smoke" aria-hidden="true" />
        <div className="contact-video__grid" aria-hidden="true" />

        <div className="contact-video__inner">
          <aside className="contact-video__brand" aria-label="The Lazy Studio footer mark">
            <div className="contact-video__badge">
              <svg viewBox="0 0 220 220" aria-hidden="true">
                <defs>
                  <path
                    id="footer-badge-path"
                    d="M110 18a92 92 0 1 1 0 184a92 92 0 1 1 0-184"
                  />
                </defs>
                <text>
                  <textPath href="#footer-badge-path" startOffset="0%">
                    THE LAZY STUDIO • AI FIRST COLLECTIVE •
                  </textPath>
                </text>
              </svg>
              <span>TLS</span>
            </div>
            <small>All rights reserved 2026</small>
          </aside>

          <div className="contact-video__main">
            <div className="contact-video__contact">
              <p>Contact us</p>
              <a href="#contact">Book a call</a>
              <a href="mailto:hello@thelazystudio.com">hello@thelazystudio.com</a>
            </div>

            <form className="newsletter-form" aria-label="Newsletter signup">
              <label htmlFor="newsletter-email">Newsletter</label>
              <p>Useful notes on design, websites, AI workflows, and working less loudly.</p>
              <div>
                <input id="newsletter-email" type="email" placeholder="Email address" />
                <button type="button">Subscribe</button>
              </div>
            </form>

            <h2 id="contact-title">
              Say Hello<span aria-hidden="true">!</span>
            </h2>
          </div>

          <nav className="contact-video__links" aria-label="Footer navigation">
            <a href="#home">Home</a>
            <a href="#work">Portfolio</a>
            <a href="#blog">Blogs</a>
            <a href="#about">About us</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </section>
    </main>
  );
}
