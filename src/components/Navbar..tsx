"use client";

import React, { useEffect, useState } from "react";
import Container from "./Container";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import ProfileButton from "./ProfileButton";
import { useTheme } from "next-themes";
import MenuButton from "./MenuButton";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

type Props = {};

export const routes = [
  {
    href: "/profile",
    label: "Profile",
  },
  {
    href: "/login",
    label: "Login",
  },
  {
    href: "/signup",
    label: "Sign Up",
  },
];

const Navbar = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const [yValue, setYValue] = useState(0);
  const [toHide, setToHide] = useState(false);

  useEffect(() => {
    const showHeaderOnScrollUp = () => {
      if (yValue >= window.scrollY) {
        setToHide(false);
      } else {
        setToHide(true);
      }
      setYValue(window.scrollY);
    };

    window.addEventListener("scroll", showHeaderOnScrollUp);

    return () => {
      window.removeEventListener("scroll", showHeaderOnScrollUp);
    };
  }, [yValue]);

  return (
    <div
      className={
        "fixed top-0 left-0 right-0 flex px-1 sm:px-4 border-b z-[1] bg-background/50 backdrop-filter-blur " +
        (toHide && "  h-0 hidden ")
      }
    >
      <Container>
        <div className="px-1 sm:px-2 lg:px-4 flex h-12 sm:h-12 md:h-14 items-center justify-between w-full">
          <div className="flex space-x-2">
            <MenuButton />
            <Logo />
          </div>
          <nav className=" flex items-center space-x-4   text-lg">
            {routes.map((route) => (
              <NavbarItem
                key={route.label}
                link={route.href}
                label={route.label}
              />
            ))}

            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              className=" rounded-full"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-6 w-6 hidden dark:block text-muted-foreground  transition-all  " />
              <Moon className="h-6 w-6 block dark:hidden text-muted-foreground transition-all " />
            </Button>
            <ProfileButton />
          </nav>
        </div>
      </Container>
    </div>
  );
};

function NavbarItem({
  link,
  label,
  clickCallback,
}: {
  link: string;
  label: string;
  clickCallback?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <div className="relative hidden sm:flex items-center">
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full justify-start text-lg text-muted-foreground hover:text-foreground",
          isActive && "text-foreground"
        )}
        onClick={() => {
          if (clickCallback) clickCallback();
        }}
      >
        {label}
      </Link>
      {isActive && (
        <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block" />
      )}
    </div>
  );
}

export default Navbar;
