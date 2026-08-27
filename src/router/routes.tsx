import { lazy, Suspense } from "react";
import type { ComponentType } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useDocumentMeta } from "@/hooks";
import { SEO, NOT_FOUND_META } from "@/constants";
import { ROUTES, ROUTE_ALIASES } from "./paths";

// Route-level pages are code-split — see .claude/rules/structure.md.
type PageModule = Record<string, ComponentType>;

const named = (loader: () => Promise<PageModule>, key: string) =>
  lazy(() => loader().then((m) => ({ default: m[key] as ComponentType })));

const HomePage = named(() => import("@/pages/home"), "HomePage");
const PortfolioPage = named(() => import("@/pages/portfolio"), "PortfolioPage");
const ServicesPage = named(() => import("@/pages/services"), "ServicesPage");
const ProcessPage = named(() => import("@/pages/process"), "ProcessPage");
const FAQPage = named(() => import("@/pages/faq"), "FAQPage");
const BlogListingPage = named(() => import("@/pages/blog"), "BlogListingPage");
const AboutPage = named(() => import("@/pages/about"), "AboutPage");
const ContactPage = named(() => import("@/pages/contact"), "ContactPage");
const NotFoundPage = named(() => import("@/pages/not-found"), "NotFoundPage");

/**
 * Applies the current route's title and social tags. Rendered once, inside the
 * router, so metadata is driven by the route rather than repeated in every page.
 */
const DocumentMeta = () => {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, "") || "/";
  const exact = SEO[path];
  // Sub-paths (/portfolio/some-project) inherit their section's metadata.
  const prefixed = Object.keys(SEO).find((r) => r !== "/" && path.startsWith(`${r}/`));
  useDocumentMeta(exact ?? (prefixed ? SEO[prefixed]! : NOT_FOUND_META));
  return null;
};

/** Holds the page background while a lazy chunk loads, so there is no flash. */
const PageFallback = () => <div className="page-fallback" aria-busy="true" />;

const AppRoutes = () => {
  return (
    <>
      <DocumentMeta />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.PORTFOLIO} element={<PortfolioPage />} />
          <Route path={`${ROUTES.PORTFOLIO}/*`} element={<PortfolioPage />} />
          <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
          <Route path={`${ROUTES.SERVICES}/*`} element={<ServicesPage />} />
          <Route path={ROUTES.PROCESS} element={<ProcessPage />} />
          <Route path={ROUTES.FAQ} element={<FAQPage />} />
          <Route path={ROUTES.BLOG} element={<BlogListingPage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.CONTACT} element={<ContactPage />} />

          {ROUTE_ALIASES.map(({ from, to }) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export { AppRoutes };
