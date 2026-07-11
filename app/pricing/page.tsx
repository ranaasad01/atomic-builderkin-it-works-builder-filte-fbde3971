"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, X } from 'lucide-react';
import { BRAND } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const FREE_FEATURES = [
  "List one project",
  "Swap equity (0% fee)",
  "Browse all listings",
  "Sign agreements via builderkin templates",
  "Public swap lineage record",
  "Basic project page",
];

const PLUS_FEATURES = [
  "Everything in Free",
  "Verified builder badge",
  "Priority feed placement",
  "Custom doc templates (Delaware + UK)",
  "Integrated Escrow.com routing",
  "Up to 5 active listings",
  "Swap analytics dashboard",
  "Direct message matched builders",
];

interface MatrixRow {
  feature: string;
  free: string | boolean;
  plus: string | boolean;
}

const MATRIX_ROWS: MatrixRow[] = [
  { feature: "List projects", free: "1", plus: "Up to 5" },
  { feature: "Equity swap fee", free: "0%", plus: "0%" },
  { feature: "Cash swap fee", free: "2%", plus: "2%" },
  { feature: "Browse listings", free: true, plus: true },
  { feature: "Agreement templates", free: "Standard", plus: "Custom" },
  { feature: "Escrow.com routing", free: false, plus: true },
  { feature: "Verified badge", free: false, plus: true },
  { feature: "Priority feed placement", free: false, plus: true },
  { feature: "Swap analytics", free: false, plus: true },
  { feature: "Direct messaging", free: false, plus: true },
];

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "Is the 2% fee on the full transaction value?",
    answer:
      "Yes. If a cash swap is $5,000, builderkin takes $100. The fee is deducted before funds are released from escrow. Equity swaps are always free.",
  },
  {
    id: "faq-2",
    question: "What counts as a cash swap?",
    answer:
      "Any swap where one party pays the other in currency — USD or GBP. Promotion swaps with a cash component are treated as cash swaps for the portion that is cash.",
  },
  {
    id: "faq-3",
    question: "Can I downgrade from builderkin+?",
    answer:
      "Yes, at any time. Your existing listings and signed agreements remain on your profile. You revert to the free tier limits immediately.",
  },
  {
    id: "faq-4",
    question: "Do I need builderkin+ to sign agreements?",
    answer:
      "No. Agreement generation and signing is available on the free tier. builderkin+ gives you custom templates and Escrow.com routing, not access to the core function.",
  },
  {
    id: "faq-5",
    question: "Is there a trial period for builderkin+?",
    answer:
      "No trial. The free tier is fully functional. If you want to test the platform, list a project for free and complete a swap before upgrading.",
  },
];

function MatrixCell({ value }: { value: string | boolean }) {
  if (value === true) {
    return <Check size={15} className="text-[#1F3AA8] mx-auto" aria-label="Included" />;
  }
  if (value === false) {
    return <X size={15} className="text-[#16130F]/30 mx-auto" aria-label="Not included" />;
  }
  return <span>{value}</span>;
}

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <dl>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="border-b border-[#16130F]/10 py-4">
            <dt>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="w-full flex justify-between items-center text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] rounded-sm"
                aria-expanded={isOpen}
              >
                <span className="text-[15px] font-medium text-[#16130F] pr-4">
                  {item.question}
                </span>
                <span
                  className="font-mono text-[18px] text-[#16130F]/40 flex-shrink-0 leading-none select-none"
                  aria-hidden="true"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </dt>
            {isOpen && (
              <dd className="text-[14px] text-[#16130F]/60 leading-relaxed mt-3 pr-8">
                {item.answer}
              </dd>
            )}
          </div>
        );
      })}
    </dl>
  );
}

export default function PricingPage() {
  return (
    <main className="bg-[#F5F1EA] min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-20 pb-16 md:pt-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-[66ch]"
        >
          <motion.p
            variants={fadeInUp}
            className="font-mono text-[11px] tracking-widest uppercase text-[#16130F]/40 mb-6"
          >
            Pricing
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="text-[2.4rem] md:text-[3.2rem] font-bold leading-[1.15] tracking-tight text-[#16130F] text-balance mb-8"
          >
            Free to swap equity. 2% on cash. $19/month for the rest.
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-[1.05rem] leading-relaxed text-[#16130F]/70 text-pretty"
          >
            {BRAND.name} charges nothing to list a project, nothing to swap
            equity, and 2% on cash transactions. The paid tier adds tools that
            make the process faster and more credible.
          </motion.p>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="border-t border-[#16130F]/10" />
      </div>

      {/* 2. PRICING CARDS SECTION */}
      <section className="py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto px-6 md:px-10 pb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Free card */}
          <motion.div
            variants={fadeInUp}
            className="border border-[#16130F]/15 bg-white/40 p-8 rounded-sm flex flex-col"
          >
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#16130F]/40 mb-4">
              Free
            </p>
            <div className="mb-2">
              <span className="text-5xl font-bold text-[#16130F]">$0</span>
            </div>
            <p className="text-[13px] text-[#16130F]/50 mb-8">Always. No credit card.</p>

            <ul className="flex flex-col gap-3 flex-1" role="list">
              {FREE_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check
                    size={15}
                    className="text-[#16130F]/70 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-[14px] text-[#16130F]/70 leading-snug">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/swap-listing"
              className="border border-[#16130F] text-[#16130F] text-[13px] font-mono tracking-wide px-6 py-3 hover:bg-[#16130F] hover:text-[#F5F1EA] transition-colors w-full text-center block mt-6 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2"
            >
              List your project
            </Link>
          </motion.div>

          {/* builderkin+ card */}
          <motion.div
            variants={fadeInUp}
            className="border border-[#1F3AA8] bg-[#1F3AA8]/5 p-8 rounded-sm flex flex-col"
          >
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#1F3AA8] mb-4">
              builderkin+
            </p>
            <div className="mb-2 flex items-baseline gap-1">
              <span className="text-5xl font-bold text-[#16130F]">$19</span>
              <span className="text-xl text-[#16130F]/50">/month</span>
            </div>
            <p className="text-[13px] text-[#16130F]/50 mb-8">Cancel any time.</p>

            <ul className="flex flex-col gap-3 flex-1" role="list">
              {PLUS_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check
                    size={15}
                    className="text-[#1F3AA8] flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-[14px] text-[#16130F]/80 leading-snug">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/swap-listing"
              className="bg-[#1F3AA8] text-white text-[13px] font-mono tracking-wide px-6 py-3 hover:bg-[#1F3AA8]/90 transition-colors w-full text-center block mt-6 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2"
            >
              Start builderkin+
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="max-w-[900px] mx-auto px-6 md:px-10">
        <div className="border-t border-[#16130F]/10" />
      </div>

      {/* 3. FEATURE MATRIX SECTION */}
      <section className="max-w-[900px] mx-auto px-6 md:px-10 py-16 pb-16">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <h2 className="text-xl font-bold text-[#16130F] mb-6">
            Full feature comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#16130F]/10">
                  <th className="py-3 px-4 text-left font-mono text-[11px] tracking-widest uppercase text-[#16130F]/40 w-1/2">
                    Feature
                  </th>
                  <th className="py-3 px-4 text-center font-mono text-[11px] tracking-widest uppercase text-[#16130F]/40 w-1/4">
                    Free
                  </th>
                  <th className="py-3 px-4 text-center font-mono text-[11px] tracking-widest uppercase text-[#1F3AA8] w-1/4">
                    builderkin+
                  </th>
                </tr>
              </thead>
              <tbody>
                {MATRIX_ROWS.map((row) => (
                  <tr
                    key={row.feature}
                    className="border-b border-[#16130F]/10 hover:bg-[#16130F]/[0.02] transition-colors"
                  >
                    <td className="py-3 px-4 text-[13px] text-[#16130F]/80">
                      {row.feature}
                    </td>
                    <td className="py-3 px-4 text-[13px] text-[#16130F]/60 text-center">
                      <MatrixCell value={row.free} />
                    </td>
                    <td className="py-3 px-4 text-[13px] text-[#16130F]/60 text-center">
                      <MatrixCell value={row.plus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="max-w-[900px] mx-auto px-6 md:px-10">
        <div className="border-t border-[#16130F]/10" />
      </div>

      {/* 4. FAQ SECTION */}
      <section className="max-w-[900px] mx-auto px-6 md:px-10 py-16 pb-24">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <h2 className="text-xl font-bold text-[#16130F] mb-8">
            Common questions
          </h2>

          <FaqAccordion items={FAQ_ITEMS} />

          {/* Bottom CTA */}
          <div className="mt-16 pt-12 border-t border-[#16130F]/10">
            <p className="text-[13px] font-mono text-[#16130F]/40 tracking-wide uppercase mb-2">
              Still have questions?
            </p>
            <p className="text-[15px] text-[#16130F]/70 mb-4">
              Write to{" "}
              <a
                href={`mailto:${BRAND.contactEmail}`}
                className="text-[#1F3AA8] underline underline-offset-2 hover:text-[#1F3AA8]/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] rounded-sm"
              >
                {BRAND.contactName}
              </a>
              . One person, one inbox, real answers.
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
