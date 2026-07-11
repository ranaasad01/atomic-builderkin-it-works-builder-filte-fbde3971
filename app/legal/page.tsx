"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, Shield, ExternalLink } from 'lucide-react';
import { BRAND } from "@/lib/data";
import { fadeInUp, fadeIn, staggerContainer } from "@/lib/motion";

const documentLinks = [
  {
    id: "doc-1",
    title: "Delaware LLC cross-shareholding agreement (redacted)",
    subtitle: "Lawyer-reviewed template · PDF excerpt",
    href: "/read-three-swap-agreements-redacted-docs",
  },
  {
    id: "doc-2",
    title: "UK Ltd share transfer agreement (redacted)",
    subtitle: "Solicitor-reviewed template · PDF excerpt",
    href: "/read-three-swap-agreements-redacted-docs",
  },
  {
    id: "doc-3",
    title: "Milestone-based advisor equity agreement (redacted)",
    subtitle: "Lawyer-reviewed template · PDF excerpt",
    href: "/read-three-swap-agreements-redacted-docs",
  },
];

export default function LegalPage() {
  return (
    <main className="bg-[#F5F1EA] min-h-screen">
      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-20 pb-16 md:pt-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeIn}
            className="font-mono text-[11px] tracking-widest uppercase text-[#1F3AA8]/70 mb-6"
          >
            Legal &amp; structure
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold tracking-tight text-[#16130F] leading-tight max-w-[22ch] mb-4"
          >
            Old-fashioned equity in registered companies. No tokens.
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-[16px] text-[#16130F]/60 leading-relaxed max-w-[66ch] mt-4"
          >
            Every swap on builderkin is a real corporate action between real
            companies, signed on real paper. This page explains how the legal
            structure works, what documents are generated, and what builderkin
            is and is not responsible for.
          </motion.p>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="border-t border-[#16130F]/10" />
      </div>

      {/* ── 2. STRUCTURE EXPLAINER ──────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-16 pt-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Two-column: Delaware + UK */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left — Delaware LLC */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-xl font-bold text-[#16130F] mb-4">
                Delaware LLC swaps
              </h2>
              <div className="text-[15px] text-[#16130F]/60 leading-relaxed space-y-4">
                <p>
                  A Delaware LLC equity swap is structured as a
                  cross-shareholding agreement between two limited liability
                  companies. Each party grants the other a membership interest
                  in their LLC. The agreement specifies the percentage, the
                  consideration (what is given in return), and the
                  representations each party makes about their company.
                </p>
                <p>
                  The template used on builderkin was reviewed by a
                  Delaware-registered attorney. It covers: membership interest
                  transfer, representations and warranties, governing law
                  (Delaware), dispute resolution (AAA arbitration, Delaware
                  seat), and the mechanics of how the interest is recorded in
                  each company operating agreement.
                </p>
                <p>
                  builderkin generates the agreement. The parties sign it.
                  builderkin does not sign, does not hold any interest, and is
                  not a party to the agreement. The signed document is stored on
                  builderkin servers and linked from both project pages — it is
                  not filed with any government body (LLC operating agreement
                  amendments are private documents).
                </p>
              </div>
            </motion.div>

            {/* Right — UK Ltd */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-xl font-bold text-[#16130F] mb-4">
                UK Ltd swaps
              </h2>
              <div className="text-[15px] text-[#16130F]/60 leading-relaxed space-y-4">
                <p>
                  A UK Ltd equity swap is structured as a share transfer between
                  two private limited companies. Each party transfers a small
                  number of shares (or issues new shares) to the other. The
                  agreement specifies the number of shares, the class, the
                  consideration, and the representations.
                </p>
                <p>
                  The template was reviewed by a UK solicitor. It covers: share
                  transfer mechanics, Companies House filing obligations (a
                  confirmation statement update is required within 14 days of a
                  share transfer — the builder is responsible for filing this),
                  governing law (England and Wales), and dispute resolution
                  (LCIA arbitration, London seat).
                </p>
                <p>
                  Important: UK Ltd share transfers have a statutory filing
                  requirement. builderkin generates the agreement and reminds
                  both parties of the Companies House obligation, but does not
                  file on their behalf. Builders using UK Ltd swaps are
                  responsible for their own compliance.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Cross-jurisdictional swaps */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 pt-10 border-t border-[#16130F]/10"
          >
            <h2 className="text-xl font-bold text-[#16130F] mb-4">
              Cross-jurisdictional swaps (Delaware LLC &#8596; UK Ltd)
            </h2>
            <p className="text-[15px] text-[#16130F]/60 leading-relaxed max-w-[72ch]">
              When one party is a Delaware LLC and the other is a UK Ltd,
              builderkin generates a cross-jurisdictional agreement reviewed by
              both a Delaware attorney and a UK solicitor. The governing law
              clause specifies which jurisdiction applies to which party
              obligations. These agreements are more complex — both parties
              should read them carefully before signing. A cross-jurisdictional
              swap takes 48–72 hours to generate (vs. same-jurisdiction swaps
              which generate instantly).
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="border-t border-[#16130F]/10" />
      </div>

      {/* ── 3. CASH ROUTING & ESCROW ────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-16 pt-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
            <Shield
              size={18}
              className="text-[#1F3AA8] flex-shrink-0"
              aria-hidden="true"
            />
            <h2 className="text-xl font-bold text-[#16130F]">
              Cash routing via Escrow.com
            </h2>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="text-[15px] text-[#16130F]/60 leading-relaxed space-y-4 max-w-[72ch]"
          >
            <p>
              For cash swaps, builderkin routes funds through Escrow.com — a
              licensed escrow service regulated in the United States. builderkin
              never holds funds. The flow is: buyer deposits cash to Escrow.com
              &rarr; builderkin confirms agreement is signed &rarr; Escrow.com
              releases funds to seller &rarr; builderkin records the completed
              swap.
            </p>
            <p>
              The 2% builderkin fee is deducted from the escrow release.
              Escrow.com charges its own fee (typically 0.89% for wire
              transfers, higher for credit card). Both fees are shown before the
              buyer deposits.
            </p>
            <p>
              builderkin+ subscribers get integrated Escrow.com routing — the
              escrow transaction is created automatically when both parties sign.
              Free tier builders can use Escrow.com directly and record the
              completed swap manually.
            </p>
          </motion.div>

          {/* Callout box */}
          <motion.div
            variants={fadeInUp}
            className="border border-[#16130F]/15 bg-[#16130F]/5 p-6 rounded-sm mt-6 max-w-[72ch]"
          >
            <p className="text-[14px] text-[#16130F]/70 leading-relaxed">
              builderkin is a document generator and directory, not a broker or
              exchange. We do not provide investment advice, do not intermediate
              negotiations, and do not take positions in any project. If you are
              unsure whether a swap is appropriate for your situation, consult a
              qualified attorney before signing.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="border-t border-[#16130F]/10" />
      </div>

      {/* ── 4. LINKS & CTA ──────────────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-24 pt-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-xl font-bold text-[#16130F] mb-8"
          >
            Read the actual documents
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
          >
            {documentLinks.map((doc) => (
              <motion.div key={doc.id} variants={fadeInUp}>
                <Link
                  href={doc.href}
                  className="flex items-start gap-4 border border-[#16130F]/15 p-5 rounded-sm hover:border-[#1F3AA8]/40 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2 group block"
                >
                  <FileText
                    size={18}
                    className="text-[#16130F]/40 group-hover:text-[#1F3AA8] transition-colors duration-200 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-[14px] font-medium text-[#16130F] leading-snug mb-1">
                      {doc.title}
                    </p>
                    <p className="text-[12px] text-[#16130F]/50">
                      {doc.subtitle}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-[13px] text-[#16130F]/60"
          >
            Questions about the legal structure? Email{" "}
            <span className="text-[#16130F]/80 font-medium">
              {BRAND.contactName}
            </span>{" "}
            at{" "}
            <a
              href={`mailto:${BRAND.contactEmail}`}
              className="text-[#1F3AA8] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] rounded-sm"
            >
              {BRAND.contactEmail}
            </a>
            .
          </motion.p>
        </motion.div>
      </section>
    </main>
  );
}
