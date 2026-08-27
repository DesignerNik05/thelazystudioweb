import type { SmartLinkProps } from "@/@types";
import { Link } from "react-router-dom";

/**
 * Renders a client-side <Link> for internal paths ("/contact") and a plain <a>
 * for anything else — hashes ("#contact-form"), mailto:, tel:, and external URLs.
 *
 * Use this wherever the href is data-driven or can be either kind. For a href
 * that is always an internal path, import Link directly.
 */
const SmartLink = ({ href, children, ...rest }: SmartLinkProps) => {
  const isInternalPath = typeof href === "string" && href.startsWith("/");

  if (isInternalPath) {
    return (
      <Link to={href} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
};

export { SmartLink };
