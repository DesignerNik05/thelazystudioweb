import { useEffect, useId, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SmartLink } from "@/components/common";
import { PRIMARY_NAV, ctaHref } from "@/constants";
import type { SiteHeaderProps } from "@/@types";

const SiteHeader = ({ activePage = "home" }: SiteHeaderProps) => {
  const isHome = activePage === "home";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();
  const { pathname } = useLocation();

  // Close the menu on navigation, so it never stays open over the new page.
  // Adjusted during render rather than in an effect: this is React's
  // documented pattern for resetting state when a value changes, and it
  // avoids a frame where the menu is open over the page it just left.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setIsMenuOpen(false);
  }

  // Escape closes it, matching what a visitor expects from any overlay menu.
  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const hrefFor = ({ href, homeHash, selfHash }: (typeof PRIMARY_NAV)[number], key: string) => {
    if (selfHash && activePage === key) {
      return selfHash;
    }
    if (homeHash && isHome) {
      return homeHash;
    }
    return href;
  };

  return (
    <header className={isMenuOpen ? "header is-menu-open" : "header"}>
      <div className="header__inner">
        <Link className="wordmark" to="/" aria-label="The Lazy Studio home">
          The Lazy Studio
        </Link>

        <nav className="nav" id={menuId} aria-label="Primary navigation">
          {PRIMARY_NAV.map((item) => (
            <SmartLink
              key={item.key}
              href={hrefFor(item, item.key)}
              className={activePage === item.key ? "nav__link nav__link--active" : "nav__link"}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </SmartLink>
          ))}

          {/* Duplicated inside the menu so mobile visitors still get the CTA. */}
          <SmartLink
            className="header__cta header__cta--in-menu"
            href={ctaHref(activePage)}
            onClick={() => setIsMenuOpen(false)}
          >
            Start a project
          </SmartLink>
        </nav>

        <SmartLink className="header__cta" href={ctaHref(activePage)}>
          Start a project
        </SmartLink>

        <button
          type="button"
          className="header__toggle"
          aria-expanded={isMenuOpen}
          aria-controls={menuId}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
    </header>
  );
};

export { SiteHeader };
