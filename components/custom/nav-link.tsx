"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  className: string;
  href: string;
  children: React.ReactNode;
  activeClassName?: string;
}

export const NavLink = ({
  className,
  href,
  children,
  activeClassName = "text-primary",
}: NavLinkProps) => {
  const pathname = usePathname();

  const isActive = pathname === `/${href}`;

  return (
    <Link
      className={cn(className, { [activeClassName]: isActive })}
      href={href}
    >
      {children}
    </Link>
  );
};
