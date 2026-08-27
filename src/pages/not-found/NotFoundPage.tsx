import { Link } from "react-router-dom";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { ROUTES } from "@/router/paths";

const NotFoundPage = () => {
  return (
    <main className="site-shell not-found-page">
      <section className="not-found" aria-labelledby="not-found-title">
        <SiteHeader activePage="none" />

        <p className="not-found__ghost" aria-hidden="true">
          404
        </p>

        <div className="not-found__content">
          <p className="section-kicker">
            <span />
            Page not found
          </p>

          <h1 id="not-found-title">This page took the day off.</h1>

          <p className="not-found__lead">
            The link is broken or the page has moved. The good stuff is one click away.
          </p>

          <div className="not-found__actions">
            <Link className="button button--primary" to={ROUTES.HOME}>
              Back to home
            </Link>
            <Link className="button button--secondary" to={ROUTES.PORTFOLIO}>
              See portfolio
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter page="not-found" />
    </main>
  );
};

export { NotFoundPage };
