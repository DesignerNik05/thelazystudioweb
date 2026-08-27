import type { SiteFooterProps } from "@/@types";
import { Link } from "react-router-dom";
import { SmartLink } from "@/components/common";
const SiteFooter = ({ page = "home" }: SiteFooterProps) => {
  return (
    <section className="contact-video-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-video__smoke" aria-hidden="true" />
      <div className="contact-video__grid" aria-hidden="true" />

      <div className="contact-video__inner">
        <aside className="contact-video__brand" aria-label="The Lazy Studio footer mark">
          <div className="contact-video__badge">
            <svg viewBox="0 0 220 220" aria-hidden="true">
              <defs>
                <path
                  id={`footer-badge-path-${page}`}
                  d="M110 18a92 92 0 1 1 0 184a92 92 0 1 1 0-184"
                />
              </defs>
              <text>
                <textPath href={`#footer-badge-path-${page}`} startOffset="0%">
                  THE LAZY STUDIO • AI FIRST COLLECTIVE •
                </textPath>
              </text>
            </svg>
            <span>TLS</span>
          </div>
          <small>© All Rights Reserved 2026</small>
        </aside>

        <div className="contact-video__main">
          <div className="contact-video__contact">
            <p>Contact us</p>
            <SmartLink href={page === "contact" ? "#contact-form" : "/contact#contact-form"}>
              Book a call
            </SmartLink>
            <a href="mailto:hello@thelazystudio.com">hello@thelazystudio.com</a>
          </div>

          <form className="newsletter-form" aria-label="Newsletter signup">
            <label htmlFor={`newsletter-email-${page}`}>Newsletter</label>
            <p>Useful notes on design, websites, AI workflows, and working less loudly.</p>
            <div>
              <input id={`newsletter-email-${page}`} type="email" placeholder="Email address" />
              <button type="button">Subscribe</button>
            </div>
          </form>

          <h2 id="contact-title">
            Say Hello<span aria-hidden="true">!</span>
          </h2>
        </div>

        <nav className="contact-video__links" aria-label="Footer navigation">
          <SmartLink href={page === "home" ? "#home" : "/"}>Home</SmartLink>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/blog">Blogs</Link>
          <Link to="/about">About us</Link>
          <SmartLink href={page === "contact" ? "#contact-form" : "/contact"}>Contact</SmartLink>
        </nav>
      </div>
    </section>
  );
};

export { SiteFooter };
