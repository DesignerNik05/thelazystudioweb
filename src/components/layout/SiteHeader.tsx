import type { SiteHeaderProps } from "@/@types";
import { Link } from "react-router-dom";
import { SmartLink } from "@/components/common";
const SiteHeader = ({ activePage = "home" }: SiteHeaderProps) => {
  const isHome = activePage === "home";
  const isServices = activePage === "services";
  const isPortfolio = activePage === "portfolio";
  const isProcess = activePage === "process";
  const isFaq = activePage === "faq";
  const isAbout = activePage === "about";
  const isContact = activePage === "contact";
  const contactHref = isContact ? "#contact-form" : "/contact";

  return (
    <header className="header">
      <Link className="wordmark" to="/" aria-label="The Lazy Studio home">
        The Lazy Studio
      </Link>

      <nav className="nav" aria-label="Primary navigation">
        <SmartLink
          href={isHome ? "#home" : "/"}
          className={isHome ? "nav__link nav__link--active" : "nav__link"}
        >
          Home
        </SmartLink>
        <Link to="/portfolio" className={isPortfolio ? "nav__link nav__link--active" : "nav__link"}>
          Portfolio
        </Link>
        <SmartLink
          href={isHome ? "#services" : "/services"}
          className={isServices ? "nav__link nav__link--active" : "nav__link"}
        >
          Services
        </SmartLink>
        <Link to="/process" className={isProcess ? "nav__link nav__link--active" : "nav__link"}>
          Process
        </Link>
        <Link to="/faq" className={isFaq ? "nav__link nav__link--active" : "nav__link"}>
          FAQs
        </Link>
        <Link
          to="/blog"
          className={activePage === "blog" ? "nav__link nav__link--active" : "nav__link"}
        >
          Blog
        </Link>
        <Link to="/about" className={isAbout ? "nav__link nav__link--active" : "nav__link"}>
          About
        </Link>
        <SmartLink
          href={contactHref}
          className={isContact ? "nav__link nav__link--active" : "nav__link"}
        >
          Contact
        </SmartLink>
      </nav>

      <SmartLink className="header__cta" href={contactHref}>
        Start a project
      </SmartLink>
    </header>
  );
};

export { SiteHeader };
