"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { footerLinks, BRAND } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function Footer() {
  const pathname = usePathname();

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
    }
  }

  function getHref(href: string, type: string): string {
    if (type === "anchor") {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  }

  return (
    <footer className="border-t border-[#16130F]/10 bg-[#F5F1EA] mt-24">
      <motion.div
        className="max-w-[1200px] mx-auto px-6 md:px-10 py-16"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="md:col-span-1">
            <Link
              href="/"
              className="font-mono text-[13px] tracking-widest uppercase text-[#16130F] hover:text-[#1F3AA8] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] rounded-sm"
            >
              {BRAND.name}
            </Link>
            <p className="mt-4 text-[13px] text-[#16130F]/60 leading-relaxed max-w-[28ch]">
              {BRAND.tagline}
            </p>
            <p className="mt-6 text-[12px] font-mono text-[#16130F]/40 tracking-wide">
              No tokens. No smart contracts. Real paperwork.
            </p>
          </motion.div>

          {/* Navigation column */}
          <motion.div variants={fadeInUp}>
            <p className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-4">
              Navigate
            </p>
            <ul className="flex flex-col gap-2.5" role="list">
              {footerLinks.map((link) => {
                const resolvedHref = getHref(link.href, link.type);
                const isActive =
                  link.type === "route" && pathname === link.href;

                return (
                  <li key={link.href}>
                    {link.type === "anchor" ? (
                      <Link
                        href={resolvedHref}
                        onClick={(e) => handleAnchorClick(e, link.href)}
                        className="text-[13px] text-[#16130F]/60 hover:text-[#16130F] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] rounded-sm"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <Link
                        href={resolvedHref}
                        className={`text-[13px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] rounded-sm ${
                          isActive
                            ? "text-[#1F3AA8]"
                            : "text-[#16130F]/60 hover:text-[#16130F]"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Legal / contact column */}
          <motion.div variants={fadeInUp}>
            <p className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-4">
              Contact
            </p>
            <p className="text-[13px] text-[#16130F]/60 leading-relaxed">
              {BRAND.contactName}
            </p>
            <a
              href={`mailto:${BRAND.contactEmail}`}
              className="text-[13px] text-[#1F3AA8] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] rounded-sm"
            >
              {BRAND.contactEmail}
            </a>
            <p className="mt-8 text-[11px] font-mono text-[#16130F]/30 tracking-wide">
              US (Delaware LLC) &amp; UK (Ltd) · Day one
            </p>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeInUp}
          className="mt-16 pt-8 border-t border-[#16130F]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <p className="text-[11px] font-mono text-[#16130F]/30 tracking-wide">
            &copy; {new Date().getFullYear()} {BRAND.name}. Not a broker. Not an exchange.
          </p>
          <p className="text-[11px] font-mono text-[#16130F]/30 tracking-wide">
            2% on cash swaps &middot; 0% on equity swaps
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
