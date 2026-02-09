"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n";
import type { Dictionary } from "@/i18n/types";

interface NavbarProps {
  locale: Locale;
  dict: Dictionary;
}

const navLinks = (locale: Locale, dict: Dictionary) => [
  { href: `/${locale}`, label: dict.nav.home },
  { href: `/${locale}/services`, label: dict.nav.services },
  { href: `/${locale}/portfolio`, label: dict.nav.portfolio },
  { href: `/${locale}/about`, label: dict.nav.about },
  { href: `/${locale}/achievements`, label: dict.nav.achievements },
  { href: `/${locale}/contact`, label: dict.nav.contact },
];

export function Navbar({ locale, dict }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = navLinks(locale, dict);

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass">
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center justify-between">
          <Link
            href={`/${locale}`}
            className="text-lg font-bold gradient-text"
          >
            {siteConfig.name[locale]}
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== `/${locale}` && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher locale={locale} dict={dict} />
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg bg-secondary"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pb-4 space-y-1">
                {links.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== `/${locale}` &&
                      pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
