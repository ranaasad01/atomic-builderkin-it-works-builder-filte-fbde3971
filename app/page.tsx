"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, X, Zap, Shield, FileText, Activity, ChevronRight } from 'lucide-react';
import { useTranslations } from "next-intl";
import { BRAND } from "@/lib/data";
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const recentSwaps = [
  { id: "s1", projectA: "PromptLayer", projectB: "EvalKit", terms: "2.5% equity ↔ 1.8% equity", date: "2025-01-14", type: "equity" as const },
  { id: "s2", projectA: "Docsmith AI", projectB: "Notionify", terms: "$4,200 cash ↔ 3-month promo", date: "2025-01-13", type: "cash" as const },
  { id: "s3", projectA: "Threadweave", projectB: "Clipstack", terms: "1.0% equity ↔ 1.0% equity", date: "2025-01-12", type: "equity" as const },
];

const featuredProjects = [
  {
    id: "p1",
    name: "PromptLayer",
    valuation: "$280,000",
    swapTerms: "2.5% equity for 2% equity or $6k cash",
    description: "Prompt versioning and analytics for LLM apps. 1,400 active users, $2.1k MRR, growing 18% month-over-month. Seeking a complementary dev-tools project with existing distribution.",
    category: "Dev Tools",
    stage: "Early Revenue",
    swapType: "equity" as const,
    listedAt: "2025-01-10",
  },
  {
    id: "p2",
    name: "EvalKit",
    valuation: "$190,000",
    swapTerms: "1.8% equity for 2% equity or promo deal",
    description: "Automated LLM evaluation harness with 40+ built-in metrics. 620 GitHub stars, 180 paying teams. Looking for a data-pipeline or observability tool to cross-promote to shared audience.",
    category: "AI Infrastructure",
    stage: "Early Revenue",
    swapType: "equity" as const,
    listedAt: "2025-01-09",
  },
  {
    id: "p3",
    name: "Docsmith AI",
    valuation: "$95,000",
    swapTerms: "$4,200 cash for 3-month newsletter promo",
    description: "AI-assisted technical documentation generator. 340 users, $890 MRR. Needs top-of-funnel exposure in the developer newsletter space. Budget available for the right audience fit.",
    category: "Writing Tools",
    stage: "Pre-revenue",
    swapType: "cash" as const,
    listedAt: "2025-01-08",
  },
  {
    id: "p4",
    name: "Threadweave",
    valuation: "$440,000",
    swapTerms: "1.0% equity for 1.0% equity in adjacent SaaS",
    description: "Async team communication layer built on structured threads. 3,200 users, $8.4k MRR. Seeking a productivity or project-management tool to bundle into an indie-stack offering.",
    category: "Productivity",
    stage: "Growth",
    swapType: "equity" as const,
    listedAt: "2025-01-07",
  },
  {
    id: "p5",
    name: "Clipstack",
    valuation: "$62,000",
    swapTerms: "1.0% equity for 1.0% equity or $1.5k promo",
    description: "Clipboard manager with AI-powered snippet tagging and search. 5,800 downloads, 210 paid licenses. Early but sticky. Looking for a macOS utility or developer-tool partner for a joint launch.",
    category: "Utilities",
    stage: "Pre-revenue",
    swapType: "promo" as const,
    listedAt: "2025-01-06",
  },
];

const stats = [
  { value: "312", label: "Swaps signed", unit: "" },
  { value: "$4.2M", label: "Equity exchanged", unit: "" },
  { value: "89", label: "Active projects", unit: "" },
  { value: "100%", label: "Backed by real docs", unit: "" },
];

const swapNarratives = [
  {
    id: "n1",
    title: "PromptLayer × EvalKit",
    date: "January 2025",
    body: "Arjun had been building PromptLayer for eight months when he posted his first swap listing. He wasn't looking for investors — he wanted a technical co-promoter who understood the LLM tooling space. Priya, who runs EvalKit, saw the listing on a Tuesday afternoon and sent a message within the hour. They spent two weeks on calls, shared cap tables under NDA, and agreed on a 2.5% for 1.8% equity swap structured as a Delaware LLC interest assignment. The paperwork took four days. Both founders say the swap gave them something a cash deal never could: genuine skin in each other's outcomes. Arjun now routes evaluation questions to EvalKit's docs. Priya's onboarding flow links to PromptLayer for teams that want prompt versioning. Neither paid a broker. The signed agreement sits in both their data rooms.",
  },
  {
    id: "n2",
    title: "Docsmith AI × The Compiler Newsletter",
    date: "December 2024",
    body: "Lena had $4,200 set aside for marketing but no idea where to spend it. She'd tried paid search and gotten nothing. A friend mentioned builderkin. She listed Docsmith AI with a cash-for-promo offer and received three responses in five days. The Compiler Newsletter, a weekly digest for backend engineers with 22,000 subscribers, proposed a three-month dedicated slot plus a co-authored tutorial. The deal was structured as a services agreement with a performance clause: if open rates on Docsmith mentions fell below 28%, Lena could claw back the final month's payment. They signed via DocuSign. Docsmith's trial signups rose 340% in the first month. Lena has since listed a second swap — this time offering equity.",
  },
];

const howItWorksSteps = [
  {
    step: "01",
    title: "List your project",
    description: "Describe your project, set a valuation, and specify what you want in return — equity percentage, cash amount, or a promotion deal. Listings are reviewed within 24 hours.",
    detail: "You control what you share. Cap table details stay private until both parties agree to proceed.",
  },
  {
    step: "02",
    title: "Match and negotiate",
    description: "Browse incoming interest or reach out to projects you want to swap with. Use the built-in term sheet builder to draft initial terms before any legal paperwork begins.",
    detail: "All messages are logged and timestamped. No side-channel confusion.",
  },
  {
    step: "03",
    title: "Sign real documents",
    description: "Once terms are agreed, builderkin generates a jurisdiction-appropriate agreement — Delaware LLC interest assignment or UK Ltd share transfer — pre-filled with your negotiated terms.",
    detail: "Both parties sign via DocuSign. The executed document is stored in your builderkin data room.",
  },
];

const notList = [
  "Not a token sale or crypto exchange",
  "Not a broker-dealer or registered investment adviser",
  "Not a marketplace for majority stakes or control transfers",
  "Not a replacement for a lawyer on complex deals",
  "Not a platform for projects with external VC funding",
  "Not escrow — cash transfers happen directly between parties",
];

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "For builders exploring their first swap.",
    features: [
      "1 active listing",
      "Unlimited browsing",
      "Standard term sheet templates",
      "Community support",
      "Swap feed access",
    ],
    cta: "Start free",
    href: "/swap-listing",
    accent: false,
  },
  {
    name: "builderkin+",
    price: "$19",
    period: "/month",
    description: "For active builders running multiple swaps.",
    features: [
      "Unlimited listings",
      "Priority matching",
      "All document templates (Delaware + UK Ltd)",
      "Data room with version history",
      "Direct message with any builder",
      "Swap lineage tracking",
      "Email support within 24h",
    ],
    cta: "Get builderkin+",
    href: "/swap-listing",
    accent: true,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const swapTypeColors: Record<string, string> = {
  equity: "bg-[#1F3AA8]/10 text-[#1F3AA8]",
  cash: "bg-emerald-50 text-emerald-700",
  promo: "bg-amber-50 text-amber-700",
};

function SwapTypePill({ type }: { type: string }) {
  return (
    <span className={`inline-block font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-sm ${swapTypeColors[type] ?? "bg-gray-100 text-gray-600"}`}>
      {type}
    </span>
  );
}

function ProjectCard({ project, index }: { project: typeof featuredProjects[0]; index: number }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={shouldReduceMotion ? fadeIn : fadeInUp}
      whileHover={shouldReduceMotion ? {} : { y: -3, transition: { duration: 0.2 } }}
      className="group bg-white border border-[#16130F]/8 rounded-xl p-6 flex flex-col gap-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_12px_32px_-8px_rgba(0,0,0,0.12)] transition-shadow duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[15px] font-semibold text-[#16130F] tracking-tight">{project.name}</h3>
          <p className="text-[11px] font-mono text-[#16130F]/40 mt-0.5 tracking-wide uppercase">{project.category} · {project.stage}</p>
        </div>
        <SwapTypePill type={project.swapType} />
      </div>

      <p className="text-[13px] text-[#16130F]/65 leading-relaxed flex-1">{project.description}</p>

      <div className="border-t border-[#16130F]/6 pt-4 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#16130F]/40 uppercase tracking-wide">Valuation</span>
          <span className="text-[13px] font-mono font-medium text-[#16130F]">{project.valuation}</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <span className="text-[11px] font-mono text-[#16130F]/40 uppercase tracking-wide shrink-0">Offering</span>
          <span className="text-[12px] font-mono text-[#1F3AA8] text-right leading-snug">{project.swapTerms}</span>
        </div>
      </div>

      <Link
        href="/project-detail"
        className="mt-1 inline-flex items-center gap-1.5 text-[12px] font-mono text-[#16130F]/50 hover:text-[#1F3AA8] transition-colors duration-200 group-hover:text-[#1F3AA8]"
      >
        View project <ChevronRight size={12} />
      </Link>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();
  const shouldReduceMotion = useReducedMotion();

  const animProps = (variants: Variants) =>
    shouldReduceMotion
      ? { initial: "visible" as const, animate: "visible" as const }
      : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, margin: "-80px" } as const };

  return (
    <main className="bg-[#F5F1EA] text-[#16130F]">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
        {/* Subtle radial glow */}
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
          <div className="w-[800px] h-[500px] rounded-full bg-[#1F3AA8]/5 blur-[120px] translate-y-[-30%]" />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 items-start">

            {/* Left: headline + CTA */}
            <motion.div
              variants={staggerContainer}
              {...animProps(staggerContainer)}
              className="flex flex-col gap-6"
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-block font-mono text-[11px] tracking-widest uppercase text-[#1F3AA8] border border-[#1F3AA8]/30 px-3 py-1 rounded-full mb-5">
                  {t("hero.eyebrow")}
                </span>
                <h1 className="text-[42px] md:text-[56px] font-bold tracking-tight leading-[1.08] text-balance text-[#16130F]">
                  {t("hero.headline")}
                </h1>
              </motion.div>

              <motion.p variants={fadeInUp} className="text-[17px] text-[#16130F]/65 leading-relaxed max-w-[52ch] text-pretty">
                {t("hero.subheadline")}
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/swap-listing"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#16130F] text-[#F5F1EA] text-[13px] font-medium tracking-wide rounded-lg hover:bg-[#1F3AA8] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2"
                >
                  {t("hero.ctaPrimary")} <ArrowRight size={14} />
                </Link>
                <Link
                  href="/swap-agreements"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#16130F]/20 text-[#16130F] text-[13px] font-medium tracking-wide rounded-lg hover:border-[#16130F]/50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2"
                >
                  {t("hero.ctaSecondary")}
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-8 pt-4 border-t border-[#16130F]/8 mt-2">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-0.5">
                    <span className="font-mono text-[22px] font-bold text-[#16130F] tracking-tight">{stat.value}</span>
                    <span className="text-[11px] text-[#16130F]/50 tracking-wide">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: live swap feed */}
            <motion.div
              variants={slideInRight}
              {...animProps(slideInRight)}
              className="lg:sticky lg:top-20"
            >
              <div className="bg-white border border-[#16130F]/8 rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#16130F]/6">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="font-mono text-[11px] tracking-widest uppercase text-[#16130F]/50">
                      {t("feed.title")}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#16130F]/30">{t("feed.live")}</span>
                </div>

                <ul
                  className="divide-y divide-[#16130F]/5"
                  aria-live="polite"
                  aria-label={t("feed.ariaLabel")}
                  role="list"
                >
                  {recentSwaps.map((swap, i) => (
                    <motion.li
                      key={swap.id}
                      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15, duration: 0.4, ease: "easeOut" }}
                      className="px-4 py-3.5 flex flex-col gap-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[12px] font-medium text-[#16130F]">
                          {swap.projectA} <span className="text-[#16130F]/30 mx-1">×</span> {swap.projectB}
                        </span>
                        <SwapTypePill type={swap.type} />
                      </div>
                      <span className="font-mono text-[11px] text-[#1F3AA8]">{swap.terms}</span>
                      <span className="font-mono text-[10px] text-[#16130F]/35">{swap.date}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="px-4 py-3 border-t border-[#16130F]/6">
                  <Link
                    href="/swap-listing"
                    className="font-mono text-[11px] tracking-wide text-[#16130F]/50 hover:text-[#1F3AA8] transition-colors duration-200 flex items-center gap-1"
                  >
                    {t("feed.viewAll")} <ChevronRight size={11} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ─────────────────────────────────────────────── */}
      <section id="projects" className="py-24 md:py-32 border-t border-[#16130F]/8">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <motion.div
            variants={staggerContainer}
            {...animProps(staggerContainer)}
            className="flex flex-col gap-3 mb-14"
          >
            <motion.p variants={fadeInUp} className="font-mono text-[11px] tracking-widest uppercase text-[#16130F]/40">
              {t("projects.eyebrow")}
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-[32px] md:text-[40px] font-bold tracking-tight text-balance">
              {t("projects.heading")}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[15px] text-[#16130F]/60 leading-relaxed max-w-[56ch] text-pretty">
              {t("projects.subheading")}
            </motion.p>
          </motion.div>

          {/* Asymmetric grid: 1 wide + 2 narrow on first row, then 3 equal */}
          <motion.div
            variants={staggerContainer}
            {...animProps(staggerContainer)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {/* First card spans 2 cols on lg */}
            <div className="lg:col-span-2">
              <ProjectCard project={featuredProjects[0]} index={0} />
            </div>
            <ProjectCard project={featuredProjects[1]} index={1} />
            <ProjectCard project={featuredProjects[2]} index={2} />
            <ProjectCard project={featuredProjects[3]} index={3} />
            <ProjectCard project={featuredProjects[4]} index={4} />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            {...animProps(fadeInUp)}
            className="mt-10 flex justify-center"
          >
            <Link
              href="/project-detail"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#16130F]/20 text-[#16130F] text-[13px] font-medium tracking-wide rounded-lg hover:border-[#16130F]/50 hover:bg-white transition-all duration-200"
            >
              {t("projects.viewAll")} <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 md:py-32 bg-white border-t border-[#16130F]/8">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <motion.div
            variants={staggerContainer}
            {...animProps(staggerContainer)}
            className="flex flex-col gap-3 mb-16"
          >
            <motion.p variants={fadeInUp} className="font-mono text-[11px] tracking-widest uppercase text-[#16130F]/40">
              {t("how.eyebrow")}
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-[32px] md:text-[40px] font-bold tracking-tight text-balance">
              {t("how.heading")}
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {howItWorksSteps.map((step, i) => (
              <motion.div
                key={step.step}
                variants={fadeInUp}
                {...animProps(fadeInUp)}
                style={{ transitionDelay: `${i * 0.1}s` }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] tracking-widest text-[#1F3AA8] border border-[#1F3AA8]/30 px-2 py-0.5 rounded-sm">
                    {step.step}
                  </span>
                  <div className="flex-1 h-px bg-[#16130F]/8" />
                </div>
                <h3 className="text-[18px] font-semibold tracking-tight">{step.title}</h3>
                <p className="text-[14px] text-[#16130F]/65 leading-relaxed">{step.description}</p>
                <p className="text-[12px] font-mono text-[#16130F]/40 leading-relaxed border-l-2 border-[#1F3AA8]/30 pl-3">
                  {step.detail}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Mechanism diagram */}
          <motion.div
            variants={scaleIn}
            {...animProps(scaleIn)}
            className="mt-20 bg-[#F5F1EA] border border-[#16130F]/8 rounded-xl p-8 md:p-12"
          >
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#16130F]/40 mb-8 text-center">
              {t("how.diagramLabel")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-0">
              {["Listing", "Matching", "Signing", "Recorded"].map((node, i, arr) => (
                <div key={node} className="flex items-center gap-3">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white border border-[#16130F]/12 flex items-center justify-center shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
                      {i === 0 && <FileText size={16} className="text-[#1F3AA8]" />}
                      {i === 1 && <Activity size={16} className="text-[#1F3AA8]" />}
                      {i === 2 && <Shield size={16} className="text-[#1F3AA8]" />}
                      {i === 3 && <Zap size={16} className="text-[#1F3AA8]" />}
                    </div>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[#16130F]/50">{node}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="hidden md:flex items-center mx-2">
                      <div className="w-12 h-px bg-[#1F3AA8]/30" />
                      <ChevronRight size={12} className="text-[#1F3AA8]/50 -ml-1" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Proof / Narratives ───────────────────────────────────────────── */}
      <section id="proof" className="py-24 md:py-32 border-t border-[#16130F]/8">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <motion.div
            variants={staggerContainer}
            {...animProps(staggerContainer)}
            className="flex flex-col gap-3 mb-16"
          >
            <motion.p variants={fadeInUp} className="font-mono text-[11px] tracking-widest uppercase text-[#16130F]/40">
              {t("proof.eyebrow")}
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-[32px] md:text-[40px] font-bold tracking-tight text-balance">
              {t("proof.heading")}
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {swapNarratives.map((narrative, i) => (
              <motion.div
                key={narrative.id}
                variants={i === 0 ? slideInLeft : slideInRight}
                {...animProps(i === 0 ? slideInLeft : slideInRight)}
                className="bg-white border border-[#16130F]/8 rounded-xl p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <h3 className="text-[16px] font-semibold tracking-tight">{narrative.title}</h3>
                    <p className="font-mono text-[11px] text-[#16130F]/40 mt-1">{narrative.date}</p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] tracking-widest uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-sm">
                    {t("proof.signedBadge")}
                  </span>
                </div>
                <p className="text-[13px] text-[#16130F]/65 leading-[1.75]">{narrative.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What builderkin is NOT ───────────────────────────────────────── */}
      <section id="not" className="py-24 md:py-32 bg-[#16130F] text-[#F5F1EA] border-t border-[#16130F]/8">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-start">
            <motion.div
              variants={staggerContainer}
              {...animProps(staggerContainer)}
              className="flex flex-col gap-4"
            >
              <motion.p variants={fadeInUp} className="font-mono text-[11px] tracking-widest uppercase text-[#F5F1EA]/40">
                {t("not.eyebrow")}
              </motion.p>
              <motion.h2 variants={fadeInUp} className="text-[32px] md:text-[40px] font-bold tracking-tight text-balance text-[#F5F1EA]">
                {t("not.heading")}
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-[15px] text-[#F5F1EA]/55 leading-relaxed max-w-[48ch] text-pretty">
                {t("not.body")}
              </motion.p>
            </motion.div>

            <motion.ul
              variants={staggerContainer}
              {...animProps(staggerContainer)}
              className="flex flex-col gap-3"
              role="list"
            >
              {notList.map((item) => (
                <motion.li
                  key={item}
                  variants={fadeInUp}
                  className="flex items-start gap-3 py-3 border-b border-[#F5F1EA]/8 last:border-0"
                >
                  <X size={14} className="shrink-0 mt-0.5 text-[#F5F1EA]/30" />
                  <span className="text-[14px] text-[#F5F1EA]/70 leading-snug">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 md:py-32 border-t border-[#16130F]/8">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <motion.div
            variants={staggerContainer}
            {...animProps(staggerContainer)}
            className="flex flex-col gap-3 mb-16 text-center items-center"
          >
            <motion.p variants={fadeInUp} className="font-mono text-[11px] tracking-widest uppercase text-[#16130F]/40">
              {t("pricing.eyebrow")}
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-[32px] md:text-[40px] font-bold tracking-tight text-balance">
              {t("pricing.heading")}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[15px] text-[#16130F]/60 leading-relaxed max-w-[48ch] text-pretty">
              {t("pricing.subheading")}
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            {...animProps(staggerContainer)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[760px] mx-auto"
          >
            {pricingTiers.map((tier) => (
              <motion.div
                key={tier.name}
                variants={scaleIn}
                whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
                className={`rounded-xl p-8 flex flex-col gap-6 border ${
                  tier.accent
                    ? "bg-[#16130F] text-[#F5F1EA] border-[#16130F]"
                    : "bg-white text-[#16130F] border-[#16130F]/10"
                } shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]`}
              >
                <div className="flex flex-col gap-1">
                  <span className={`font-mono text-[11px] tracking-widest uppercase ${tier.accent ? "text-[#F5F1EA]/50" : "text-[#16130F]/40"}`}>
                    {tier.name}
                  </span>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-[36px] font-bold tracking-tight">{tier.price}</span>
                    {tier.period && (
                      <span className={`text-[14px] ${tier.accent ? "text-[#F5F1EA]/50" : "text-[#16130F]/40"}`}>{tier.period}</span>
                    )}
                  </div>
                  <p className={`text-[13px] leading-relaxed mt-1 ${tier.accent ? "text-[#F5F1EA]/60" : "text-[#16130F]/55"}`}>
                    {tier.description}
                  </p>
                </div>

                <ul className="flex flex-col gap-2.5" role="list">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check size={13} className={`shrink-0 mt-0.5 ${tier.accent ? "text-emerald-400" : "text-[#1F3AA8]"}`} />
                      <span className={`text-[13px] leading-snug ${tier.accent ? "text-[#F5F1EA]/75" : "text-[#16130F]/65"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.href}
                  className={`mt-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-[13px] font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2 ${
                    tier.accent
                      ? "bg-[#F5F1EA] text-[#16130F] hover:bg-white"
                      : "bg-[#16130F] text-[#F5F1EA] hover:bg-[#1F3AA8]"
                  }`}
                >
                  {tier.cta} <ArrowRight size={13} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 md:py-32 bg-white border-t border-[#16130F]/8">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <motion.div
            variants={staggerContainer}
            {...animProps(staggerContainer)}
            className="max-w-[640px] mx-auto text-center flex flex-col items-center gap-6"
          >
            <motion.p variants={fadeInUp} className="font-mono text-[11px] tracking-widest uppercase text-[#16130F]/40">
              {t("cta.eyebrow")}
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-[32px] md:text-[44px] font-bold tracking-tight text-balance">
              {t("cta.heading")}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[15px] text-[#16130F]/60 leading-relaxed text-pretty">
              {t("cta.body")}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/swap-listing"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#16130F] text-[#F5F1EA] text-[13px] font-medium tracking-wide rounded-lg hover:bg-[#1F3AA8] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2"
              >
                {t("cta.primary")} <ArrowRight size={14} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#16130F]/20 text-[#16130F] text-[13px] font-medium tracking-wide rounded-lg hover:border-[#16130F]/50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2"
              >
                {t("cta.secondary")}
              </Link>
            </motion.div>
            <motion.p variants={fadeInUp} className="font-mono text-[12px] text-[#16130F]/35 mt-2">
              {t("cta.contact")}{" "}
              <a
                href={`mailto:${BRAND.email}`}
                className="text-[#1F3AA8] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] rounded-sm"
              >
                {BRAND.email}
              </a>
            </motion.p>
          </motion.div>
        </div>
      </section>

    </main>
  );
}