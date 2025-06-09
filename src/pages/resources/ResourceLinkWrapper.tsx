import { Link } from "react-router-dom";

type ResourceLinkProps =
  | { to: string; href?: never; children: React.ReactNode; className?: string }
  | { href: string; to?: never; children: React.ReactNode; className?: string };

const ResourceLinkWrapper = ({
  to,
  href,
  children,
  className,
}: ResourceLinkProps) => {
  if (to) {
    return (
      <Link to={to} className={className} target="_blank">
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default ResourceLinkWrapper;
