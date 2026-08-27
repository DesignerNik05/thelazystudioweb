import { useState } from "react";
import { faqItems } from "@/data/faqs";

const FaqSection = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
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
            A few quick answers about working with The Lazy Studio, what we build, and where AI
            actually fits.
          </p>
          <img
            src="/assets/faq-liquid-blob.webp"
            alt="Glossy black abstract liquid form"
            className="faq-visual__blob"
            loading="lazy"
            decoding="async"
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
  );
};

export { FaqSection };
