"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Globe } from "lucide-react";
import type { Locale } from "@/i18n";
import type { Dictionary } from "@/i18n/types";

interface LanguageSwitcherProps {
  locale: Locale;
  dict: Dictionary;
}

export function LanguageSwitcher({ locale, dict }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const targetLocale = locale === "en" ? "ar" : "en";
  const targetPath = pathname.replace(`/${locale}`, `/${targetLocale}`);

  return (
    <Link
      href={targetPath}
      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-sm font-medium"
      aria-label={`Switch to ${targetLocale === "ar" ? "Arabic" : "English"}`}
    >
      <Globe className="h-4 w-4" />
      <span>{dict.common.language}</span>
    </Link>
  );
}
