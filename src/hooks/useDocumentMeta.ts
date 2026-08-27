import { useEffect } from "react";
import { SITE } from "@/constants/site";
import type { RouteMeta } from "@/constants/seo";

const setMeta = (selector: string, attr: string, key: string, content: string): void => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setCanonical = (href: string): void => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
};

/**
 * Applies a route's title, description, canonical URL, and social tags.
 *
 * Note: this runs on the client. Crawlers that execute JS (Google) see it, but
 * link unfurlers that do not (Slack, WhatsApp, iMessage) read the static tags in
 * index.html instead. Per-route unfurls need prerendering — see CLAUDE.md.
 */
export const useDocumentMeta = ({ title, description }: RouteMeta): void => {
  useEffect(() => {
    document.title = title;
    const url = `${SITE.URL}${window.location.pathname}`;

    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setCanonical(url);
  }, [title, description]);
};
