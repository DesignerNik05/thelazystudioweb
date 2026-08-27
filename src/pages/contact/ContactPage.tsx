import type { ChangeEvent, FormEvent } from "react";
import { contactSchema, ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants";
import { ENV, isContactConfigured } from "@/config";

type FormStatus = "idle" | "sending" | "sent" | "error";
import { Link } from "react-router-dom";
import { SmartLink } from "@/components/common";
import { useState } from "react";
import { SiteFooter, SiteHeader } from "@/components/layout";
import {
  contactDetails,
  contactProjectTypes,
  contactSteps,
  initialContactForm,
} from "@/data/contact";

const ContactPage = () => {
  const [formData, setFormData] = useState(initialContactForm);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const isSending = formStatus === "sending";

  const updateField = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const target = event.target;
    // `checked` only exists on <input>; everything else contributes its value.
    const value =
      target instanceof HTMLInputElement && target.type === "checkbox"
        ? target.checked
        : target.value;

    if (formStatus === "sent" || formStatus === "error") {
      setFormStatus("idle");
      setFormError(null);
    }

    setFormData((current) => ({
      ...current,
      [target.name]: value,
    }));
  };

  const chooseProjectType = (projectType: string) => {
    if (formStatus === "sent" || formStatus === "error") {
      setFormStatus("idle");
      setFormError(null);
    }

    setFormData((current) => ({
      ...current,
      projectType,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    // Same schema the API validates against, so the two can never disagree.
    const parsed = contactSchema.safeParse(formData);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      setFormError(first ? first.message : ERROR_MESSAGES.GENERIC);
      setFormStatus("error");
      return;
    }

    // No endpoint configured yet — say so rather than pretending to send.
    if (!isContactConfigured()) {
      setFormError(ERROR_MESSAGES.SUBMIT_FAILED);
      setFormStatus("error");
      return;
    }

    setFormStatus("sending");

    try {
      const response = await fetch(ENV.CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          // Web3Forms requires its public key in the body; Formspree ignores it.
          ...(ENV.CONTACT_ACCESS_KEY ? { access_key: ENV.CONTACT_ACCESS_KEY } : {}),
          _subject: `New enquiry — ${parsed.data.name}`,
        }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        setFormError(body?.error ?? ERROR_MESSAGES.SUBMIT_FAILED);
        setFormStatus("error");
        return;
      }

      setFormStatus("sent");
      setFormData({ ...initialContactForm });
    } catch {
      // Network failure, offline, blocked request — never claim it was sent.
      setFormError(ERROR_MESSAGES.SUBMIT_FAILED);
      setFormStatus("error");
    }
  };

  return (
    <main className="site-shell contact-page">
      <section className="contact-page-hero" aria-labelledby="contact-page-title">
        <SiteHeader activePage="contact" />
        <img
          className="contact-page-hero__image"
          src="/assets/lazy-studio-hero.webp"
          alt="Cinematic red and blue lit creative technologist in a dark studio"
          fetchPriority="high"
        />
        <div className="contact-page-hero__shade" />
        <p className="contact-page-hero__ghost" aria-hidden="true">
          Contact
        </p>
        <div className="contact-page-hero__content">
          <p className="section-kicker">
            <span />
            Contact
          </p>
          <h1 id="contact-page-title">Let’s make the work lighter.</h1>
          <p>
            Send the brief, the idea, the rough notes, or the thing that feels too tangled. We will
            help shape the cleanest next move.
          </p>
        </div>
      </section>

      <section className="contact-breadcrumb-section" aria-label="Breadcrumb">
        <div className="contact-breadcrumb-section__inner">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Contact</span>
          </nav>
        </div>
      </section>

      <section
        className="contact-main-section"
        id="contact-form"
        aria-labelledby="contact-form-title"
      >
        <div className="contact-main-section__inner">
          <aside className="contact-intro-panel">
            <p className="section-kicker">
              <span />
              Start here
            </p>
            <h2 id="contact-form-title">Bring the messy context.</h2>
            <p>
              You do not need a perfect brief. Tell us what you are trying to launch, fix, redesign,
              automate, or finally make easier to explain.
            </p>

            <div className="contact-detail-list">
              {contactDetails.map((detail) => (
                <article key={detail.label}>
                  <span>{detail.label}</span>
                  {detail.href ? (
                    <SmartLink href={detail.href}>{detail.value}</SmartLink>
                  ) : (
                    <strong>{detail.value}</strong>
                  )}
                </article>
              ))}
            </div>

            <div className="contact-fit-card">
              <span>Good fit if</span>
              <p>
                You need UI/UX, a website, product design, useful AI workflows, or a calmer digital
                partner around the work.
              </p>
            </div>
          </aside>

          <div className="contact-form-card">
            <div className="contact-form-card__heading">
              <h2>Tell us what you need.</h2>
              <p>Pick a direction, add the useful details, and keep it human.</p>
            </div>

            <div className="contact-project-chips" aria-label="Project type shortcuts">
              {contactProjectTypes.map((projectType) => (
                <button
                  type="button"
                  className={formData.projectType === projectType ? "is-selected" : ""}
                  aria-pressed={formData.projectType === projectType}
                  onClick={() => chooseProjectType(projectType)}
                  key={projectType}
                >
                  {projectType}
                </button>
              ))}
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form__row">
                <label>
                  <span>Name</span>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={updateField}
                    placeholder="Your name"
                    required
                  />
                </label>
                <label>
                  <span>Email</span>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={updateField}
                    placeholder="you@company.com"
                    required
                  />
                </label>
              </div>

              <label>
                <span>Company / brand</span>
                <input
                  name="company"
                  value={formData.company}
                  onChange={updateField}
                  placeholder="The name on the door, or the one in progress"
                />
              </label>

              <div className="contact-form__row">
                <label>
                  <span>Project type</span>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={updateField}
                    required
                  >
                    <option value="">Choose one</option>
                    {contactProjectTypes.map((projectType) => (
                      <option value={projectType} key={projectType}>
                        {projectType}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Budget range</span>
                  <select name="budget" value={formData.budget} onChange={updateField}>
                    <option value="">Not sure yet</option>
                    <option value="Starter">Starter project</option>
                    <option value="Focused sprint">Focused sprint</option>
                    <option value="Full build">Full website / product build</option>
                    <option value="Monthly support">Monthly support</option>
                  </select>
                </label>
              </div>

              <label>
                <span>Timeline</span>
                <select name="timeline" value={formData.timeline} onChange={updateField}>
                  <option value="">Flexible</option>
                  <option value="Soon">Soon, but sane</option>
                  <option value="4-8 weeks">4-8 weeks</option>
                  <option value="This quarter">This quarter</option>
                  <option value="Ongoing">Ongoing support</option>
                </select>
              </label>

              <label>
                <span>Project context</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={updateField}
                  placeholder="What are you trying to make, fix, launch, or simplify?"
                  rows={7}
                  required
                />
              </label>

              <label className="contact-form__checkbox">
                <input
                  name="needsBriefHelp"
                  type="checkbox"
                  checked={formData.needsBriefHelp}
                  onChange={updateField}
                />
                <span>I am not sure yet. Help me shape the brief.</span>
              </label>

              <div className="contact-form__footer">
                <button className="button button--primary" type="submit" disabled={isSending}>
                  {isSending ? "Sending..." : "Send enquiry"}
                </button>
                <p
                  aria-live="polite"
                  className={
                    formStatus === "error"
                      ? "contact-form__status is-error"
                      : "contact-form__status"
                  }
                >
                  {formStatus === "sent"
                    ? SUCCESS_MESSAGES.MESSAGE_SENT
                    : formStatus === "error"
                      ? formError
                      : "No pressure, no pitch theatre. Just enough context to start properly."}
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="contact-steps-section" aria-labelledby="contact-steps-title">
        <div className="contact-steps-section__inner">
          <div className="contact-section-heading">
            <p className="section-kicker">
              <span />
              What happens next
            </p>
            <h2 id="contact-steps-title">Three moves. No dramatic intake ritual.</h2>
          </div>

          <div className="contact-steps-grid">
            {contactSteps.map((step, index) => (
              <article key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter page="contact" />
    </main>
  );
};

export { ContactPage };
