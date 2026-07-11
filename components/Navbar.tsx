"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, BRAND } from "@/lib/data";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations();

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (pathname === "/") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      setMenuOpen(false);
    }
  }

  function getHref(href: string, type: string): string {
    if (type === "anchor") {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  }

  return (
    <header className="sticky top-0 z-50 bg-[#F5F1EA] border-b border-[#16130F]/10">
      <nav
        className="max-w-[1200px] mx-auto px-6 md:px-10 h-14 flex items-center justify-between"
        aria-label={t("nav.ariaLabel")}
      >
        <Link
          href="/"
          className="font-mono text-[13px] tracking-widest uppercase text-[#16130F] hover:text-[#1F3AA8] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2 rounded-sm"
          aria-label={t("nav.homeAriaLabel")}
        >
          {t("nav.brand")}
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.slice(1).map((link) => {
            const isActive =
              link.type === "route" && pathname === link.href;
            const resolvedHref = getHref(link.href, link.type);

            return (
              <li key={link.href}>
                {link.type === "anchor" ? (
                  <Link
                    href={resolvedHref}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className={`text-[13px] tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2 rounded-sm ${
                      isActive
                        ? "text-[#1F3AA8] font-medium"
                        : "text-[#16130F]/70 hover:text-[#16130F]"
                    }`}
                  >
                    {t(`nav.${link.label.toLowerCase().replace(/\s+/g, "")}`)}
                  </Link>
                ) : (
                  <Link
                    href={resolvedHref}
                    className={`text-[13px] tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2 rounded-sm ${
                      isActive
                        ? "text-[#1F3AA8] font-medium"
                        : "text-[#16130F]/70 hover:text-[#16130F]"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {t(`nav.${link.label.toLowerCase().replace(/\s+/g, "")}`)}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/swap-listing"
            className="text-[13px] tracking-wide px-4 py-1.5 border border-[#16130F] text-[#16130F] hover:bg-[#16130F] hover:text-[#F5F1EA] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2 rounded-sm"
          >
            {t("nav.listProject")}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-[#16130F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] rounded-sm"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
        >
          <span className="font-mono text-[11px] tracking-widest uppercase">
            {menuOpen ? t("nav.close") : t("nav.menu")}
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-[#16130F]/10 bg-[#F5F1EA]"
          >
            <ul className="px-6 py-4 flex flex-col gap-4" role="list">
              {navLinks.map((link) => {
                const isActive =
                  link.type === "route" && pathname === link.href;
                const resolvedHref = getHref(link.href, link.type);

                return (
                  <li key={link.href}>
                    {link.type === "anchor" ? (
                      <Link
                        href={resolvedHref}
                        onClick={(e) => {
                          handleAnchorClick(e, link.href);
                          setMenuOpen(false);
                        }}
                        className={`block text-[14px] tracking-wide py-1 transition-colors duration-200 ${
                          isActive
                            ? "text-[#1F3AA8] font-medium"
                            : "text-[#16130F]/70 hover:text-[#16130F]"
                        }`}
                      >
                        {t(
                          `nav.${link.label.toLowerCase().replace(/\s+/g, "")}`
                        )}
                      </Link>
                    ) : (
                      <Link
                        href={resolvedHref}
                        onClick={() => setMenuOpen(false)}
                        className={`block text-[14px] tracking-wide py-1 transition-colors duration-200 ${
                          isActive
                            ? "text-[#1F3AA8] font-medium"
                            : "text-[#16130F]/70 hover:text-[#16130F]"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {t(
                          `nav.${link.label.toLowerCase().replace(/\s+/g, "")}`
                        )}
                      </Link>
                    )}
                  </li>
                );
              })}
              <li>
                <Link
                  href="/swap-listing"
                  onClick={() => setMenuOpen(false)}
                  className="block text-[14px] tracking-wide py-1.5 px-4 border border-[#16130F] text-center hover:bg-[#16130F] hover:text-[#F5F1EA] transition-all duration-200 rounded-sm"
                >
                  {t("nav.listProject")}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}