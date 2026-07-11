"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, Minus } from 'lucide-react';
import { BRAND } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  label: string;
  items: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    id: "listing",
    label: "Listing & eligibility",
    items: [
      {
        id: "listing-1",
        question: "What counts as a valid project to list?",
        answer:
          "Your project must have a working URL, real users (at least 50 active in the last 30 days), and demonstrable usage — meaning you can show a usage graph, not just a signup count. Pre-launch projects, waitlists, and idea-stage products cannot list. builderkin is for things that already exist and already have people using them.",
      },
      {
        id: "listing-2",
        question: "Can I list a project that is not a software product?",
        answer:
          "No. builderkin is for software-shaped things built by people who could ship them themselves. Physical products, pure content businesses (newsletters, podcasts, YouTube channels), and service businesses are not eligible. If your product has a working URL and users, it probably qualifies. If you are unsure, email us before listing.",
      },
      {
        id: "listing-3",
        question: "Do I need a registered company to list?",
        answer:
          "Yes. Equity swaps require a legal entity — a Delaware LLC or a UK Ltd. You cannot swap equity in a sole proprietorship or an unregistered project. If you do not have an entity yet, you can list for cash or promo swaps while you incorporate. Entity formation typically takes 1–5 business days and costs $50–$200 depending on the service you use.",
      },
      {
        id: "listing-4",
        question: "Can I list multiple projects?",
        answer:
          "Free tier: one active listing at a time. builderkin+ ($19/month): up to five active listings. You can archive a listing and create a new one at any time on the free tier.",
      },
    ],
  },
  {
    id: "swaps",
    label: "Swaps & matching",
    items: [
      {
        id: "swaps-1",
        question: "What types of swaps does builderkin support?",
        answer:
          "Three types. Equity swaps: you give a percentage of your company in exchange for a percentage of another company. Cash swaps: one party pays cash, the other provides equity or promotion. Promotion swaps: milestone-based advisor equity — you earn equity by delivering verified promotional results (impressions, signups, revenue). All three produce a signed legal document.",
      },
      {
        id: "swaps-2",
        question: "How does matching work?",
        answer:
          "There is no algorithm. You browse the feed chronologically, filter by swap type, entity, and valuation band, and send a structured offer when you find a match. The other builder accepts, counters, or declines. builderkin does not suggest matches, does not rank compatibility, and does not send you notifications about projects you did not ask about.",
      },
      {
        id: "swaps-3",
        question: "What happens if a swap falls through after signing?",
        answer:
          "The signed agreement is a legal contract. If one party fails to perform, the other party has contractual remedies — they can pursue the matter in the agreed jurisdiction (Delaware or England and Wales). builderkin records the outcome on both project pages. A builder who defaults on a signed swap receives a permanent negative completion rating on their profile. builderkin does not mediate disputes and is not a party to the agreement.",
      },
      {
        id: "swaps-4",
        question: "Can I swap equity across jurisdictions — Delaware LLC to UK Ltd?",
        answer:
          "Yes. Cross-jurisdictional swaps are supported. The agreement takes 48–72 hours to generate (vs. instant for same-jurisdiction swaps) because it requires review by both a Delaware attorney and a UK solicitor. Both parties should read the cross-jurisdictional agreement carefully — it is longer and more complex than a same-jurisdiction agreement.",
      },
    ],
  },
  {
    id: "escrow",
    label: "Escrow & cash",
    items: [
      {
        id: "escrow-1",
        question: "How does escrow work for cash swaps?",
        answer:
          "Cash flows through Escrow.com, a licensed US escrow service. The buyer deposits cash to Escrow.com. builderkin confirms the agreement is signed. Escrow.com releases funds to the seller. builderkin records the completed swap. builderkin never holds funds at any point.",
      },
      {
        id: "escrow-2",
        question: "What fees are involved in a cash swap?",
        answer:
          "builderkin takes 2% of the transaction value, deducted from the escrow release. Escrow.com charges its own fee — typically 0.89% for wire transfers, higher for credit card payments. Both fees are shown before the buyer deposits. There are no hidden fees.",
      },
      {
        id: "escrow-3",
        question: "What currencies are supported?",
        answer:
          "USD for Delaware LLC swaps. GBP for UK Ltd swaps. Cross-jurisdictional cash swaps default to USD with the GBP equivalent shown at the time of signing. Currency conversion is handled by Escrow.com at the prevailing rate.",
      },
    ],
  },
  {
    id: "records",
    label: "Records & reputation",
    items: [
      {
        id: "records-1",
        question: "How does builderkin record signed agreements?",
        answer:
          "When both parties sign, the executed document is stored on builderkin servers and linked from both project public pages as a swap lineage entry. The entry shows: who holds what, signed when, for what consideration. The record is permanent — it cannot be deleted by either party. If a swap is later unwound by mutual agreement, the unwind is recorded as a separate entry, not a deletion.",
      },
      {
        id: "records-2",
        question: "What is the completion rating system?",
        answer:
          "After every swap, both parties rate each other on a 1–5 scale: did the other party deliver as agreed? Ratings are non-anonymous, tied to the builder builderkin profile, and permanent. A builder with a low completion rating will find it harder to get offers accepted. There is no way to remove a rating once submitted.",
      },
      {
        id: "records-3",
        question: "Is my swap data public?",
        answer:
          "The swap lineage — who holds what in which project — is public by default. The full agreement document is private (visible only to the two parties). The terms summary (percentage, consideration type, date) is public. If you do not want your swap terms visible, builderkin is not the right platform — transparency is the mechanism that makes the reputation system work.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggleItem(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <main className="bg-[#F5F1EA] min-h-screen">
      {/* ── Hero ── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-20 pb-16 md:pt-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeInUp}
            className="font-mono text-[11px] tracking-widest uppercase text-[#16130F]/40 mb-6"
          >
            FAQ
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold tracking-tight text-[#16130F] leading-tight max-w-[22ch]"
          >
            Questions builders actually ask.
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-[16px] text-[#16130F]/60 leading-relaxed max-w-[66ch] mt-4"
          >
            Answers to the most common questions about listing, swapping,
            signing, and what happens when things go wrong.
          </motion.p>
        </motion.div>
      </section>

      {/* ── FAQ Accordion ── */}
      <section className="max-w-[900px] mx-auto px-6 md:px-10 pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {faqCategories.map((category) => (
            <div key={category.id}>
              <motion.p
                variants={fadeInUp}
                className="font-mono text-[11px] tracking-widest uppercase text-[#16130F]/40 mb-4 mt-10"
              >
                {category.label}
              </motion.p>

              {category.items.map((item) => {
                const isOpen = openId === item.id;

                return (
                  <motion.div
                    key={item.id}
                    variants={fadeInUp}
                    className="border-b border-[#16130F]/10"
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isOpen}
                      className="w-full text-left py-5 flex justify-between items-start gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2 rounded-sm"
                    >
                      <span className="text-[15px] font-medium text-[#16130F]">
                        {item.question}
                      </span>
                      <span className="text-[#16130F]/40 flex-shrink-0 mt-0.5">
                        {isOpen ? (
                          <Minus size={16} aria-hidden="true" />
                        ) : (
                          <Plus size={16} aria-hidden="true" />
                        )}
                      </span>
                    </button>

                    {isOpen && (
                      <p className="text-[14px] text-[#16130F]/60 leading-relaxed pb-5 max-w-[66ch]">
                        {item.answer}
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Contact ── */}
      <section className="max-w-[900px] mx-auto px-6 md:px-10 pb-24">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="border border-[#16130F]/15 p-8 rounded-sm"
        >
          <h2 className="text-xl font-bold text-[#16130F]">
            Still have a question?
          </h2>
          <p className="text-[15px] text-[#16130F]/60 leading-relaxed mt-3 max-w-[66ch]">
            Email {BRAND.contactName} directly at {BRAND.contactEmail}. Response
            within one business day. No support ticket system, no chatbot.
          </p>
          <Link
            href={`mailto:${BRAND.contactEmail}`}
            className="bg-[#1F3AA8] text-white font-mono text-[13px] tracking-wide px-6 py-3 inline-block mt-6 hover:bg-[#1F3AA8]/90 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2"
          >
            Email {BRAND.contactName}
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
