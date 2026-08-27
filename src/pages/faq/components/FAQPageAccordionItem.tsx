import type { FaqAccordionItemProps } from "@/@types";
const FAQPageAccordionItem = ({
  item,
  itemKey,
  index,
  openQuestion,
  setOpenQuestion,
}: FaqAccordionItemProps) => {
  const isOpen = openQuestion === itemKey;
  const answerId = `faq-page-answer-${itemKey}`;

  return (
    <article className={isOpen ? "faq-page-item is-open" : "faq-page-item"}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={answerId}
        onClick={() => setOpenQuestion(isOpen ? null : itemKey)}
      >
        <span className="faq-page-item__index">{String(index + 1).padStart(2, "0")}</span>
        <span className="faq-page-item__question">{item.question}</span>
        <span className="faq-page-item__toggle" aria-hidden="true" />
      </button>
      <div className="faq-page-item__answer" id={answerId} aria-hidden={!isOpen}>
        <p>{item.answer}</p>
      </div>
    </article>
  );
};

export { FAQPageAccordionItem };
