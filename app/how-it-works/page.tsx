"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileText, Users, CheckCircle, Circle } from 'lucide-react';
import { BRAND } from "@/lib/data";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

const steps = [
  {
    id: "step-1",
    number: "01",
    label: "List",
    heading: "List with structured terms",
    body: "Post your project with real metrics — MRR, active users, retention rate. These are visible to anyone browsing the feed. Name the piece you are offering and what you are asking for. Terms are typed objects, not free text: equity percentage, cash amount, or promotion commitment. A listing takes under ten minutes if your numbers are ready.",
    mockLabel: "[ Project listing form — structured fields ]",
  },
  {
    id: "step-2",
    number: "02",
    label: "Match",
    heading: "Match on the terms, not the vibes",
    body: "The feed shows offers, not products. Filters are financial: what is on offer, what is asked, valuation band, sector, jurisdiction. No ranking algorithm. No leaderboard. Chronological with filters. When you find a match, you send a structured offer — not a message, an offer with specific terms attached. The other builder accepts, counters, or declines.",
    mockLabel: "[ Feed with filter controls — equity / cash / promo ]",
  },
  {
    id: "step-3",
    number: "03",
    label: "Sign",
    heading: "Sign on builderkin, execute off builderkin",
    body: "For equity swaps, builderkin generates a cross-shareholding agreement between your two companies — Delaware LLC or UK Ltd, your choice, both templates lawyer-reviewed. For promotion swaps, a milestone-based advisor equity agreement: 0.5% per 10K verified impressions, or whatever you agreed. Both parties sign. The executed document is recorded on each project public page. Enforcement is contractual. Jurisdiction is the party choice. builderkin takes 2% on cash swaps, 0% on equity.",
    mockLabel: "[ Agreement preview — cross-shareholding template ]",
  },
  {
    id: "step-4",
    number: "04",
    label: "Recorded",
    heading: "Recorded permanently on your project page",
    body: "Every signed swap appears on both projects public pages as a swap lineage entry: who holds what, signed when, for what consideration. Reputation is enforced by public completion ratings after every swap — did the promoter deliver as agreed? Ratings are tied to the builder builderkin profile, non-anonymous, permanent. There is no way to delete a completed swap record.",
    mockLabel: "[ Swap lineage — public record view ]",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="bg-[#F5F1EA] min-h-screen">
      {/* ── 1. HERO ── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-20 pb-16 md:pt-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeInUp}
            className="font-mono text-[11px] tracking-widest uppercase text-[#1F3AA8]/70 mb-6"
          >
            How it works
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold tracking-tight text-[#16130F] leading-tight max-w-[20ch]"
          >
            List. Match. Sign. Recorded.
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-[16px] text-[#16130F]/60 leading-relaxed max-w-[66ch] mt-4"
          >
            builderkin turns a swap idea into a signed legal document in four
            steps. No intermediaries. No brokers. Two builders, two companies,
            one agreement.
          </motion.p>
        </motion.div>
      </section>

      {/* ── 2. FOUR STEPS ── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {steps.map((step, index) => (
            <motion.div key={step.id} variants={fadeInUp}>
              {/* Step block */}
              <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-8 md:gap-16 items-start">
                {/* Left: number + label + heading + body */}
                <div>
                  {/* Decorative large number */}
                  <div
                    aria-hidden="true"
                    className="font-mono text-[80px] font-bold text-[#16130F]/[0.06] leading-none select-none -ml-1"
                  >
                    {step.number}
                  </div>

                  <p className="font-mono text-[11px] tracking-widest uppercase text-[#1F3AA8]/70 mt-2">
                    Step {step.number} — {step.label}
                  </p>

                  <h2 className="text-2xl font-bold text-[#16130F] mt-2">
                    {step.heading}
                  </h2>

                  <p className="text-[15px] text-[#16130F]/60 leading-relaxed max-w-[60ch] mt-3">
                    {step.body}
                  </p>
                </div>

                {/* Right: mock interface placeholder */}
                <div className="bg-[#16130F]/5 border border-[#16130F]/10 rounded-sm h-48 flex items-center justify-center">
                  <span className="font-mono text-[12px] text-[#16130F]/30 text-center px-4">
                    {step.mockLabel}
                  </span>
                </div>
              </div>

              {/* Divider + arrow between steps (not after last) */}
              {index < steps.length - 1 && (
                <div className="flex flex-col items-start gap-3">
                  <div className="w-full border-b border-[#16130F]/10" />
                  <div className="flex items-center gap-2 pb-2">
                    <ArrowRight
                      size={14}
                      className="text-[#1F3AA8]/50"
                      aria-hidden="true"
                    />
                    <span className="font-mono text-[11px] tracking-widest uppercase text-[#16130F]/30">
                      Next step
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── 3. WORKED EXAMPLE ── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-16">
        <div className="border-t border-[#16130F]/10 pt-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.p
              variants={fadeInUp}
              className="font-mono text-[11px] tracking-widest uppercase text-[#1F3AA8]/70 mb-4"
            >
              Worked example
            </motion.p>

            <motion.h2
              variants={fadeInUp}
              className="text-2xl font-bold text-[#16130F] mb-6"
            >
              Lensly ↔ Captioncraft: a real equity swap
            </motion.h2>

            <motion.div
              variants={scaleIn}
              className="border border-[#16130F]/15 bg-white/30 p-8 rounded-sm"
            >
              <p className="text-[15px] text-[#16130F]/70 leading-relaxed mb-5">
                Priya (London) built Lensly — an AI photo-editing tool for
                product photographers. 890 paying users, £3,200 MRR, growing
                12% month-over-month. She listed a 2% equity stake in Lensly
                (UK Ltd) and asked for 2% equity in a complementary creative
                tool.
              </p>

              <p className="text-[15px] text-[#16130F]/70 leading-relaxed mb-5">
                Marco (Austin) built Captioncraft — AI-generated social captions
                for e-commerce brands. 1,100 paying users, $4,100 MRR. He found
                Lensly on the feed, filtered by UK Ltd equity swaps in the
                creative tools sector.
              </p>

              <p className="text-[15px] text-[#16130F]/70 leading-relaxed mb-5">
                Marco sent a structured offer: 2% of Captioncraft (Delaware LLC)
                for 2% of Lensly (UK Ltd). Priya accepted. builderkin generated
                a cross-jurisdictional cross-shareholding agreement — UK Ltd to
                Delaware LLC, reviewed by a UK solicitor and a Delaware attorney.
              </p>

              <p className="text-[15px] text-[#16130F]/70 leading-relaxed">
                Both parties signed within 48 hours. The agreement was recorded
                on both project pages. In the 90 days after signing, Captioncraft
                was featured in Lensly onboarding emails to 890 users. Lensly was
                featured in Captioncraft social posts reaching 14,000 followers.
                Lensly MRR grew from £3,200 to £4,100. Captioncraft MRR grew
                from $4,100 to $5,300.
              </p>

              {/* Swap terms block */}
              <div className="mt-8 font-mono text-[13px] bg-[#16130F]/5 p-4 rounded-sm leading-relaxed text-[#16130F]/70">
                <p>Swap ID: BK-2025-0047</p>
                <p>Priya R. (London) — 2.0% of Lensly Ltd (UK)</p>
                <p>Marco V. (Austin) — 2.0% of Captioncraft LLC (Delaware)</p>
                <p>
                  Signed: 2025-01-10 · Cross-jurisdictional cross-shareholding
                </p>
                <p>Status: Executed · Both parties rated 5/5</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. CTA ── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-24">
        <div className="border-t border-[#16130F]/10 pt-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-bold text-[#16130F] mb-3"
            >
              Ready to list your project?
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-[15px] text-[#16130F]/60 mb-8"
            >
              Free to list. Free to swap equity. 2% on cash swaps.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/swap-listing"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1F3AA8] text-white text-[13px] tracking-wide rounded-sm hover:bg-[#1F3AA8]/90 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2"
              >
                List your project
                <ArrowRight size={14} aria-hidden="true" />
              </Link>

              <Link
                href="/read-three-swap-agreements-redacted-docs"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#16130F] text-[#16130F] text-[13px] tracking-wide rounded-sm hover:bg-[#16130F]/5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2"
              >
                Read sample agreements
                <FileText size={14} aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
