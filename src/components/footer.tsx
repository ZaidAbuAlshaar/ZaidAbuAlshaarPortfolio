import Link from "next/link";
import { Github, Linkedin, Twitter, ArrowUp } from "lucide-react";
import { siteConfig } from "@/content/site";
import type { Locale } from "@/i18n";
import type { Dictionary } from "@/i18n/types";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link
              href={`/${locale}`}
              className="text-lg font-bold gradient-text"
            >
              {siteConfig.name[locale]}
            </Link>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              {siteConfig.description[locale]}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold mb-3">
              {locale === "ar" ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${locale}/portfolio`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {dict.nav.portfolio}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {dict.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-3">{dict.contact.info.social}</h3>
            <div className="flex gap-3">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-primary/20 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-primary/20 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-primary/20 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {siteConfig.name[locale]}.{" "}
            {dict.footer.copyright}
          </p>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              {dict.footer.builtWith}
            </p>
            <a
              href="#top"
              className="p-2 rounded-lg bg-secondary hover:bg-primary/20 hover:text-primary transition-colors"
              aria-label={dict.common.backToTop}
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
