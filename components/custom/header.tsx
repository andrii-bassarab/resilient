"use client";

import { Logo } from "./logo";
import { ModeToggle } from ".";
import { Separator } from "../ui/separator";
import { NavLink } from "./nav-link";
import { MobileNav } from "./mobile-nav";
import { HeaderTitle } from "./header-title";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logoutIcon from "@/public/logout.png";

export const Header = () => {
  const pathName = usePathname();
  const router = useRouter();

  if (pathName === "/sign-up" || pathName === "/sign-in") {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    router.replace("sign-in");
  };

  return (
    <>
      <div className="flex items-center justify-between p-6 max-w-7xl	mx-auto">
        <div className="sm:flex-1">
          <Logo />
        </div>

        <div className="hidden sm:flex gap-4 flex-1 justify-center items-center">
          <NavLink
            href="/courses"
            className="text-lg hover:text-muted-foreground transition-colors"
          >
            Courses
          </NavLink>

          <Separator orientation="vertical" className="h-4" />

          <NavLink
            href="/services"
            className="text-lg hover:text-muted-foreground transition-colors"
          >
            Services
          </NavLink>
          {localStorage.getItem("role") && (
            <Link
              href="/create-resource"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 py-2 px-4 whitespace-nowrap"
            >
              Create +
            </Link>
          )}
        </div>

        <HeaderTitle />

        <div className="hidden sm:flex gap-4 items-center flex-1 justify-end">
          <ModeToggle />
          <span>{localStorage.getItem("userName") || "Yurii Terletskyy"}</span>
          <Button onClick={handleLogout} variant="outline" className="px-1">
            Logout
          </Button>
        </div>

        <div className="flex sm:hidden">
          <MobileNav />
        </div>
      </div>
      <Separator />
    </>
  );
};
