import Link from "next/link";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ModeToggle, NavLink } from ".";
import { Separator } from "../ui/separator";

export const MobileNav = () => {
  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <HamburgerMenuIcon height={24} width={24} />
      </DrawerTrigger>

      <DrawerPortal>
        <DrawerOverlay className="fixed inset-0 bg-black/40" />
        <DrawerContent className="h-full w-3/4 fixed bottom-0 right-0 left-1/4 px-6">
          <div className="flex flex-col items-start gap-4 mt-6">
            <NavLink
              href="courses"
              className="text-lg hover:text-muted-foreground transition-colors"
            >
              Courses
            </NavLink>

            <NavLink
              href="services"
              className="text-lg hover:text-muted-foreground transition-colors"
            >
              Services
            </NavLink>

            <Link
              href="/create-resource"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 py-2 px-4 whitespace-nowrap"
            >
              Create +
            </Link>
          </div>

          <Separator className="my-6" />

          <div className="flex gap-4 items-center">
            <ModeToggle />
            <span>
              {localStorage.getItem("userName") || "Yurii Terletskyy"}
            </span>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};
