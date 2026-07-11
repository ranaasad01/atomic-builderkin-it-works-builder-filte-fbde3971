"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, ArrowRight } from 'lucide-react';
import { BRAND } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { useTranslations } from "next-intl";

const notList = [
  {
    id: "1",
    label: "Not a marketplace",
    body: "We do not take a cut of your deal. We do not intermediate the negotiation. We provide the infrastructure for two builders to find each other and execute a legal agreement.",
  },
  {
    id: "2",
    label: "Not a token platform",
    body: "No crypto, no NFTs, no points systems. Swaps are denominated in equity percentages, cash amounts, or clearly defined promotional commitments. All of it is enforceable in a real court.",
  },
  {
    id: "3",
    label: "Not a community",
    body: "There is no forum, no Discord, no vibe. builderkin is a transactional tool. You come here to do a deal, not to find your tribe.",
  },
  {
    id: "4",
    label: "Not an accelerator",
    body: "We do not advise on your business. We do not take equity in exchange for access. We do not run cohorts or demo days. We are plumbing, not mentorship.",
  },
  {
    id: "5",
    label: "Not a legal firm",
    body: "The agreements on this platform are templates reviewed by qualified solicitors and Delaware-registered attorneys. They are not bespoke legal advice. For complex situations, hire a lawyer.",
  },
];

const philosophyPoints = [
  {
    id: "p1",
    heading: "Transactional by design",
    body: "Every feature on builderkin exists to move a deal from idea to signed document. We deliberately removed anything that does not serve that function. No profiles, no followers, no endorsements.",
  },
  {
    id: "p2",
    heading: "Legal by default",
    body: "A handshake between builders is not a swap. A swap is a signed agreement filed against a legal entity. builderkin only supports swaps that produce a document. If you want an informal arrangement, use email.",
  },
  {
    id: "p3",
    heading: "Legible above clever",
    body: "The agreement templates use plain language wherever the law allows it. A builder should be able to read their own contract. We have removed jargon that does not change the legal meaning.",
  },
];

export default function AboutPage() {
  const t = useTranslations();

  return (
    <main className="bg-[#F5F1EA] min-h-screen">
      {/* Hero / Origin */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-20 pb-16 md:pt-28 md:pb-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-[66ch]"
        >
          <motion.p
            variants={fadeIn}
            className="font-mono text-[11px] tracking-widest uppercase text-[#1F3AA8]/70 mb-6"
          >
            {t("about.eyebrow")}
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="text-[2.4rem] md:text-[3.2rem] font-serif leading-[1.15] tracking-tight text-[#16130F] text-balance mb-8"
          >
            {t("about.heading")}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-[1.05rem] leading-relaxed text-[#16130F]/70 text-pretty"
          >
            {t("about.originPara1")}
          </motion.p>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="border-t border-[#16130F]/10" />
      </div>

      {/* Origin story continued */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-[52ch]"
          >
            <p className="text-[0.95rem] leading-relaxed text-[#16130F]/70 mb-6 text-pretty">
              {t("about.originPara2")}
            </p>
            <p className="text-[0.95rem] leading-relaxed text-[#16130F]/70 text-pretty">
              {t("about.originPara3")}
            </p>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="bg-[#16130F]/[0.03] border border-[#16130F]/8 rounded-xl p-8 md:p-10"
          >
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#16130F]/40 mb-5">
              {t("about.originQuoteLabel")}
            </p>
            <blockquote className="text-[1.1rem] font-serif leading-relaxed text-[#16130F] italic text-balance">
              {t("about.originQuote")}
            </blockquote>
            <p className="mt-5 text-[12px] font-mono text-[#16130F]/40 tracking-wide">
              {t("about.originQuoteAttrib")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="border-t border-[#16130F]/10" />
      </div>

      {/* Philosophy */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="font-mono text-[11px] tracking-widest uppercase text-[#1F3AA8]/70 mb-3">
            {t("about.philosophyEyebrow")}
          </p>
          <h2 className="text-[1.8rem] md:text-[2.2rem] font-serif leading-tight tracking-tight text-[#16130F] text-balance max-w-[44ch]">
            {t("about.philosophyHeading")}
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {philosophyPoints.map((point) => (
            <motion.div
              key={point.id}
              variants={fadeInUp}
              className="flex flex-col gap-3"
            >
              <div className="w-6 h-px bg-[#1F3AA8]" />
              <h3 className="text-[0.9rem] font-mono tracking-wide text-[#16130F] uppercase">
                {point.heading}
              </h3>
              <p className="text-[0.88rem] leading-relaxed text-[#16130F]/60 text-pretty">
                {point.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="border-t border-[#16130F]/10" />
      </div>

      {/* What we are not */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="font-mono text-[11px] tracking-widest uppercase text-[#1F3AA8]/70 mb-3">
            {t("about.notEyebrow")}
          </p>
          <h2 className="text-[1.8rem] md:text-[2.2rem] font-serif leading-tight tracking-tight text-[#16130F] text-balance max-w-[44ch]">
            {t("about.notHeading")}
          </h2>
          <p className="mt-4 text-[0.95rem] text-[#16130F]/60 leading-relaxed max-w-[52ch] text-pretty">
            {t("about.notSubheading")}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-0"
        >
          {notList.map((item, idx) => (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12 py-7 border-b border-[#16130F]/8 last:border-b-0"
            >
              <div className="flex items-start gap-3">
                <span className="font-mono text-[11px] text-[#16130F]/30 mt-0.5 select-none">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[0.82rem] font-mono tracking-wide uppercase text-[#16130F]/80">
                  {item.label}
                </h3>
              </div>
              <p className="text-[0.9rem] leading-relaxed text-[#16130F]/60 max-w-[58ch] text-pretty">
                {item.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="border-t border-[#16130F]/10" />
      </div>

      {/* Contact */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#1F3AA8]/70 mb-3">
              {t("about.contactEyebrow")}
            </p>
            <h2 className="text-[1.8rem] md:text-[2.2rem] font-serif leading-tight tracking-tight text-[#16130F] text-balance mb-6">
              {t("about.contactHeading")}
            </h2>
            <p className="text-[0.95rem] leading-relaxed text-[#16130F]/60 max-w-[48ch] text-pretty">
              {t("about.contactBody")}
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-6"
          >
            <div className="bg-[#16130F]/[0.03] border border-[#16130F]/8 rounded-xl p-8">
              <p className="font-mono text-[11px] tracking-widest uppercase text-[#16130F]/40 mb-5">
                {t("about.contactCardLabel")}
              </p>

              <div className="flex flex-col gap-1 mb-6">
                <p className="text-[1.05rem] font-serif text-[#16130F]">
                  {BRAND.contactName}
                </p>
                <p className="text-[0.82rem] font-mono text-[#16130F]/50 tracking-wide">
                  {t("about.contactRole")}
                </p>
              </div>

              <motion.a
                href={`mailto:${BRAND.contactEmail}`}
                className="inline-flex items-center gap-2.5 text-[0.88rem] font-mono text-[#1F3AA8] hover:text-[#16130F] transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2 rounded-sm"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                <Mail className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                <span>{BRAND.contactEmail}</span>
                <ArrowRight
                  className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  aria-hidden="true"
                />
              </motion.a>
            </div>

            <div className="bg-[#16130F]/[0.03] border border-[#16130F]/8 rounded-xl p-8">
              <p className="font-mono text-[11px] tracking-widest uppercase text-[#16130F]/40 mb-4">
                {t("about.generalContactLabel")}
              </p>
              <motion.a
                href={`mailto:${BRAND.email}`}
                className="inline-flex items-center gap-2.5 text-[0.88rem] font-mono text-[#1F3AA8] hover:text-[#16130F] transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2 rounded-sm"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                <Mail className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                <span>{BRAND.email}</span>
                <ArrowRight
                  className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  aria-hidden="true"
                />
              </motion.a>
              <p className="mt-3 text-[0.82rem] text-[#16130F]/50 leading-relaxed">
                {t("about.generalContactNote")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA strip */}
      <section className="border-t border-[#16130F]/10 bg-[#16130F]">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[1200px] mx-auto px-6 md:px-10 py-14 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <div>
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#F5F1EA]/40 mb-2">
              {t("about.ctaEyebrow")}
            </p>
            <p className="text-[1.3rem] font-serif text-[#F5F1EA] leading-snug text-balance max-w-[44ch]">
              {t("about.ctaHeading")}
            </p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              href="/swap-listing"
              className="inline-flex items-center gap-2 text-[0.82rem] font-mono tracking-wide px-5 py-2.5 bg-[#1F3AA8] text-[#F5F1EA] hover:bg-[#1a3090] transition-colors duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F1EA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#16130F]"
            >
              {t("about.ctaButton")}
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
            <Link
              href="/swap-agreements"
              className="text-[0.82rem] font-mono tracking-wide text-[#F5F1EA]/50 hover:text-[#F5F1EA] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F1EA] rounded-sm"
            >
              {t("about.ctaSecondary")}
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}