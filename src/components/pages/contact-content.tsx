"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SectionReveal } from "@/components/section-reveal";
import { siteConfig } from "@/content/site";
import type { Locale } from "@/i18n";
import type { Dictionary } from "@/i18n/types";

interface ContactPageContentProps {
  locale: Locale;
  dict: Dictionary;
}

export function ContactPageContent({
  locale,
  dict,
}: ContactPageContentProps) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: form submission logic would go here
    alert(dict.contact.form.success);
    setFormState({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <PageHeader
        title={dict.contact.title}
        subtitle={dict.contact.subtitle}
        description={dict.contact.description}
      />

      <section className="pb-24 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <SectionReveal className="lg:col-span-2">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      {dict.contact.info.email}
                    </h3>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      {dict.contact.info.phone}
                    </h3>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      {dict.contact.info.location}
                    </h3>
                    <p className="text-muted-foreground">
                      {siteConfig.location[locale]}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="font-semibold mb-3">
                    {dict.contact.info.social}
                  </h3>
                  <div className="flex gap-3">
                    <a
                      href={siteConfig.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-secondary hover:bg-primary/20 hover:text-primary transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href={siteConfig.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-secondary hover:bg-primary/20 hover:text-primary transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href={siteConfig.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-secondary hover:bg-primary/20 hover:text-primary transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Contact form */}
            <SectionReveal className="lg:col-span-3">
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6 p-8 rounded-xl border border-border bg-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      {dict.contact.form.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      {dict.contact.form.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                  >
                    {dict.contact.form.subject}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formState.subject}
                    onChange={(e) =>
                      setFormState({ ...formState, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    {dict.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-gold text-white font-medium hover:opacity-90 transition-opacity"
                >
                  <Send className="h-4 w-4" />
                  {dict.contact.form.send}
                </button>
              </motion.form>
            </SectionReveal>
          </div>
        </div>
      </section>
    </>
  );
}
