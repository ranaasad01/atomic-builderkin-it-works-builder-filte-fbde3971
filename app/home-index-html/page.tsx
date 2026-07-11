"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Check, Sparkles, FileText, Activity, ArrowUpDown, Circle, Star, AlertCircle, ChevronRight } from 'lucide-react';
import { BRAND } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const RECENT_SWAPS = [
  {
    id: "s1",
    projectA: "PromptLayer",
    projectB: "EvalKit",
    terms: "3% equity ↔ 3% equity",
    date: "2025-01-14",
    type: "equity" as const,
  },
  {
    id: "s2",
    projectA: "Threadwise",
    projectB: "Clipnote",
    terms: "$2,400 cash ↔ 2% equity",
    date: "2025-01-13",
    type: "cash" as const,
  },
  {
    id: "s3",
    projectA: "Docsmith",
    projectB: "Formblast",
    terms: "promo cross-post ↔ 1.5% equity",
    date: "2025-01-12",
    type: "promo" as const,
  },
];

const PROJECTS = [
  {
    id: "p1",
    name: "PromptLayer",
    slug: "promptlayer",
    valuation: "$180,000",
    swapTerms: "3% equity for 3% equity",
    description:
      "Middleware that logs, versions, and diffs every LLM prompt your team ships. Integrates with OpenAI, Anthropic, and Mistral in under ten minutes. 340 active teams, $1,200 MRR, growing 18% month-over-month.",
    category: "Dev Tools",
    stage: "Early Revenue",
    image: "https://assets.infineon.com/is/image/infineon/tle5501-eval-shield-top.jpeg",
    swapType: "equity" as const,
    listedAt: "2025-01-10",
  },
  {
    id: "p2",
    name: "EvalKit",
    slug: "evalkit",
    valuation: "$95,000",
    swapTerms: "3% equity for 3% equity",
    description:
      "Open-source evaluation harness for LLM outputs. Runs 40+ built-in metrics, supports custom rubrics, and exports to CSV or Notion. Used by 1,100 developers. Seeking a partner with distribution in the enterprise segment.",
    category: "AI Testing",
    stage: "Pre-revenue",
    image: "https://media.licdn.com/dms/image/v2/D4E0BAQGhcTbDi46oVw/company-logo_200_200/B4EZbUt9PsHIAI-/0/1747325539665/threadwise_ai_logo?e=2147483647&v=beta&t=V0BXNQ4NLmsXGu5PeKjmAuBQhRVeslyZ2-mNCCVXm6Y",
    swapType: "equity" as const,
    listedAt: "2025-01-09",
  },
  {
    id: "p3",
    name: "Threadwise",
    slug: "threadwise",
    valuation: "$240,000",
    swapTerms: "$2,400 cash for 2% equity",
    description:
      "AI-assisted Twitter/X thread composer that learns your voice from past posts. Drafts, schedules, and A/B tests threads automatically. 820 paying subscribers at $9/month. Looking for equity partners with newsletter audiences.",
    category: "Content",
    stage: "Revenue",
    image: "https://docsmith.org/wp-content/uploads/2025/08/Doc-Smith-logo-resized-1200.jpg",
    swapType: "cash" as const,
    listedAt: "2025-01-08",
  },
  {
    id: "p4",
    name: "Docsmith",
    slug: "docsmith",
    valuation: "$310,000",
    swapTerms: "promo cross-post for 1.5% equity",
    description:
      "Converts Notion pages, Google Docs, and Markdown into polished PDF reports with one click. White-label ready. 2,100 users, $4,800 MRR. Seeking a partner with a developer newsletter or YouTube channel above 10k subscribers.",
    category: "Productivity",
    stage: "Revenue",
    image: "https://img.itch.zone/aW1hZ2UvMzI0OTEwLzE5NzUyMDYucG5n/347x500/R8DGFm.png",
    swapType: "promo" as const,
    listedAt: "2025-01-07",
  },
  {
    id: "p5",
    name: "Clipnote",
    slug: "clipnote",
    valuation: "$60,000",
    swapTerms: "2% equity for 2% equity",
    description:
      "Browser extension that clips, tags, and resurfaces web content using a local vector store. No cloud, no subscription, fully private. 4,800 installs, 22% weekly active rate. Wants a swap partner building in the PKM or note-taking space.",
    category: "Productivity",
    stage: "Pre-revenue",
    image: "https://pix4free.org/assets/library/2021-01-19/originals/swap.jpg",
    swapType: "equity" as const,
    listedAt: "2025-01-06",
  },
];

const STATS = [
  { label: "Swaps signed", value: "214", unit: "" },
  { label: "Total equity exchanged", value: "$4.2M", unit: "notional" },
  { label: "Active listings", value: "87", unit: "" },
  { label: "Avg. time to match", value: "6.4", unit: "days" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "List your project",
    body: "Describe your project, set your valuation, and specify what you want in return — equity, cash, or promotion. Listings take under five minutes and are reviewed within 24 hours.",
  },
  {
    step: "02",
    title: "Match and negotiate",
    body: "Browse the live feed or receive curated match suggestions. Message counterparties directly. Every conversation is logged so nothing gets lost in email threads.",
  },
  {
    step: "03",
    title: "Sign real paperwork",
    body: "When both sides agree, builderkin generates a Delaware LLC or UK Ltd equity-transfer agreement pre-filled with your terms. Sign via DocuSign. The swap is recorded on your public lineage page.",
  },
];

const NOT_SECTION = [
  "Not a token sale or crypto exchange",
  "Not a co-founder matchmaking service",
  "Not a VC pitch platform",
  "Not a revenue-share network",
  "Not a freelance marketplace",
  "Not a place to sell your whole company",
];

const SWAP_NARRATIVES = [
  {
    title: "PromptLayer × EvalKit",
    body: "Ravi had been building PromptLayer for eight months when he posted his first listing. He wasn't looking for money — he was looking for someone who understood the problem. EvalKit's founder, Priya, had been running evals manually in spreadsheets and knew exactly what PromptLayer solved. They exchanged messages for three days, agreed on a 3-for-3 equity swap, and signed the Delaware LLC amendment on a Tuesday afternoon. Six weeks later, EvalKit's evaluation suite was natively integrated into PromptLayer's dashboard. Neither founder had to give up cash. Neither had to pitch a VC. The paperwork took eleven minutes to generate and another four to sign. Both projects now list each other in their onboarding flows, and the combined referral loop added 140 new signups in the first month alone.",
  },
  {
    title: "Docsmith × Formblast",
    body: "Formblast had 6,000 users and zero marketing budget. Docsmith had a newsletter with 14,000 subscribers and a product that needed a form-builder integration. The swap was obvious once both founders were in the same room — or rather, the same Slack channel. Formblast offered 1.5% equity; Docsmith offered a dedicated newsletter feature and a co-authored blog post. The promo agreement was the first of its kind on builderkin: no cash, no equity dilution on Docsmith's side, just a structured promotional commitment with a 90-day performance clause. If the newsletter feature didn't drive 200 signups, Formblast could claw back 0.5% of the equity. It drove 480. The clause was never triggered. Both founders have since referred three other builders to the platform.",
  },
];

const MECHANISM_STEPS = [
  { icon: "📋", label: "Listing", desc: "Builder posts project + swap terms" },
  { icon: "🔗", label: "Matching", desc: "Feed surfaces compatible counterparties" },
  { icon: "✍️", label: "Signing", desc: "Legal doc generated and e-signed" },
  { icon: "📁", label: "Recorded", desc: "Swap logged to public lineage chain" },
];

const PRICING = [
  {
    tier: "Free",
    price: "$0",
    period: "forever",
    features: [
      "1 active listing",
      "Browse all projects",
      "Message counterparties",
      "Standard agreement templates",
      "Public swap lineage page",
    ],
    cta: "Start free",
    href: "/swap-listing",
    accent: false,
  },
  {
    tier: "builderkin+",
    price: "$19",
    period: "per month",
    features: [
      "Unlimited listings",
      "Priority placement in feed",
      "Custom agreement clauses",
      "Claw-back and milestone terms",
      "Dedicated match suggestions",
      "CSV export of your swap history",
    ],
    cta: "Upgrade to +",
    href: "/swap-listing",
    accent: true,
  },
];

// ─── Swap type badge ──────────────────────────────────────────────────────────

function SwapBadge({ type }: { type: "equity" | "cash" | "promo" }) {
  const map = {
    equity: "bg-[#1F3AA8]/10 text-[#1F3AA8]",
    cash: "bg-emerald-50 text-emerald-700",
    promo: "bg-amber-50 text-amber-700",
  };
  return (
    <span
      className={`inline-block font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-sm ${map[type]}`}
    >
      {type}
    </span>
  );
}

// ─── Animated swap lineage line ───────────────────────────────────────────────

const lineVariant: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4, delay: 2 },
  },
};

function LiveSwapLine({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#1F3AA8] origin-left z-10 pointer-events-none"
          variants={lineVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  wide,
}: {
  project: (typeof PROJECTS)[0];
  wide?: boolean;
}) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`group relative bg-white border border-[#16130F]/8 rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_20px_-6px_rgba(0,0,0,0.08)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_12px_32px_-8px_rgba(0,0,0,0.14)] transition-shadow duration-300 ${wide ? "md:col-span-2" : ""}`}
    >
      <div className="aspect-[16/7] overflow-hidden bg-[#F5F1EA]">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3 className="font-mono text-[15px] font-semibold text-[#16130F] tracking-tight">
              {project.name}
            </h3>
            <p className="text-[11px] text-[#16130F]/40 font-mono tracking-wide mt-0.5">
              {project.category} · {project.stage}
            </p>
          </div>
          <SwapBadge type={project.swapType} />
        </div>
        <p className="text-[13px] text-[#16130F]/65 leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-[#16130F]/6">
          <div>
            <p className="text-[11px] font-mono text-[#16130F]/40 tracking-wide uppercase">
              Valuation
            </p>
            <p className="text-[14px] font-mono font-semibold text-[#16130F]">
              {project.valuation}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-mono text-[#16130F]/40 tracking-wide uppercase">
              Offering
            </p>
            <p className="text-[12px] font-mono text-[#1F3AA8]">
              {project.swapTerms}
            </p>
          </div>
        </div>
      </div>
      <Link
        href={`/project-detail`}
        className="absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-inset rounded-xl"
        aria-label={`View ${project.name}`}
      />
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();
  const [activeLine, setActiveLine] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const lineTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    // Cycle through swap line animations
    let idx = 0;
    function showNext() {
      setActiveLine(RECENT_SWAPS[idx]?.id ?? null);
      lineTimerRef.current = setTimeout(() => {
        setActiveLine(null);
        lineTimerRef.current = setTimeout(() => {
          idx = (idx + 1) % RECENT_SWAPS.length;
          showNext();
        }, 800);
      }, 2000);
    }
    const initial = setTimeout(showNext, 1200);
    return () => {
      clearTimeout(initial);
      if (lineTimerRef.current) clearTimeout(lineTimerRef.current);
    };
  }, []);

  return (
    <main className="bg-[#F5F1EA] text-[#16130F]">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_420px] gap-16 items-start">
          {/* Left */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={fadeInUp}
              className="font-mono text-[11px] tracking-widest uppercase text-[#1F3AA8] mb-5"
            >
              {t("hero.eyebrow")}
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="text-[42px] md:text-[56px] font-semibold leading-[1.08] tracking-tight text-balance text-[#16130F] mb-6"
            >
              {t("hero.headline")}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-[17px] text-[#16130F]/60 leading-relaxed max-w-[52ch] mb-10"
            >
              {t("hero.subheadline")}
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href="/swap-listing"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#16130F] text-[#F5F1EA] text-[13px] tracking-wide rounded-sm hover:bg-[#1F3AA8] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2"
              >
                {t("hero.cta")}
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/swap-agreements"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#16130F]/20 text-[#16130F] text-[13px] tracking-wide rounded-sm hover:border-[#16130F]/50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2"
              >
                {t("hero.secondaryCta")}
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — live swap feed */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            <div className="bg-white border border-[#16130F]/8 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#16130F]/6">
                <span className="font-mono text-[11px] tracking-widest uppercase text-[#16130F]/40">
                  {t("hero.feedLabel")}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[10px] text-emerald-600 tracking-wide">
                    {t("hero.feedLive")}
                  </span>
                </span>
              </div>
              <ul
                className="divide-y divide-[#16130F]/5"
                aria-live="polite"
                aria-label={t("hero.feedAriaLabel")}
              >
                {RECENT_SWAPS.map((swap) => (
                  <li key={swap.id} className="px-4 py-3.5">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-mono text-[12px] text-[#16130F] leading-snug">
                        <span className="font-semibold">{swap.projectA}</span>
                        <span className="text-[#16130F]/30 mx-1.5">×</span>
                        <span className="font-semibold">{swap.projectB}</span>
                      </p>
                      <SwapBadge type={swap.type} />
                    </div>
                    <p className="font-mono text-[11px] text-[#16130F]/50">
                      {swap.terms}
                    </p>
                    <p className="font-mono text-[10px] text-[#16130F]/30 mt-0.5">
                      {mounted ? swap.date : ""}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-3 border-t border-[#16130F]/6">
                <Link
                  href="/swap-listing"
                  className="font-mono text-[11px] text-[#1F3AA8] hover:underline tracking-wide flex items-center gap-1"
                >
                  {t("hero.feedViewAll")}
                  <ChevronRight size={11} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="border-y border-[#16130F]/8 bg-white">
        <motion.div
          className="max-w-[1200px] mx-auto px-6 md:px-10 py-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <motion.div key={stat.label} variants={fadeInUp}>
                <p className="font-mono text-[32px] md:text-[40px] font-semibold text-[#16130F] tracking-tight leading-none">
                  {stat.value}
                  {stat.unit && (
                    <span className="text-[14px] font-normal text-[#16130F]/40 ml-1.5">
                      {stat.unit}
                    </span>
                  )}
                </p>
                <p className="text-[12px] text-[#16130F]/50 mt-2 tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Project grid ─────────────────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div
            variants={fadeInUp}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <p className="font-mono text-[11px] tracking-widest uppercase text-[#1F3AA8] mb-3">
                {t("projects.eyebrow")}
              </p>
              <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-[#16130F]">
                {t("projects.heading")}
              </h2>
            </div>
            <Link
              href="/project-detail"
              className="hidden md:inline-flex items-center gap-1.5 text-[13px] text-[#16130F]/50 hover:text-[#16130F] transition-colors duration-200"
            >
              {t("projects.viewAll")}
              <ArrowRight size={13} />
            </Link>
          </motion.div>

          {/* Asymmetric grid: 2-col top row, then 3-col */}
          <div className="relative">
            {/* Animated lineage line between first two cards */}
            <div className="hidden md:block absolute top-[140px] left-[calc(50%-1px)] w-[calc(50%-40px)] h-[1px] overflow-visible pointer-events-none z-10">
              <LiveSwapLine active={activeLine === "s1"} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              {PROJECTS.slice(0, 2).map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PROJECTS.slice(2).map((p, i) => (
                <ProjectCard key={p.id} project={p} wide={i === 0} />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Proof / narratives ───────────────────────────────────────────── */}
      <section className="bg-white border-y border-[#16130F]/8">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="mb-16">
              <p className="font-mono text-[11px] tracking-widest uppercase text-[#1F3AA8] mb-3">
                {t("proof.eyebrow")}
              </p>
              <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-[#16130F] max-w-[22ch]">
                {t("proof.heading")}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {SWAP_NARRATIVES.map((n, i) => (
                <motion.div
                  key={n.title}
                  variants={i === 0 ? slideInLeft : slideInRight}
                  className="bg-[#F5F1EA] rounded-xl p-8 border border-[#16130F]/6"
                >
                  <div className="flex items-center gap-2 mb-5">
                    <Star size={13} className="text-[#1F3AA8]" />
                    <p className="font-mono text-[12px] font-semibold text-[#16130F] tracking-wide">
                      {n.title}
                    </p>
                  </div>
                  <p className="text-[14px] text-[#16130F]/70 leading-relaxed">
                    {n.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="max-w-[1200px] mx-auto px-6 md:px-10 py-24 md:py-32"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeInUp} className="mb-16">
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#1F3AA8] mb-3">
              {t("how.eyebrow")}
            </p>
            <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-[#16130F]">
              {t("how.heading")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {HOW_IT_WORKS.map((step) => (
              <motion.div key={step.step} variants={fadeInUp}>
                <p className="font-mono text-[11px] tracking-widest text-[#1F3AA8]/60 mb-4">
                  {step.step}
                </p>
                <h3 className="text-[18px] font-semibold text-[#16130F] mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[14px] text-[#16130F]/60 leading-relaxed">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Mechanism diagram */}
          <motion.div
            variants={scaleIn}
            className="bg-white border border-[#16130F]/8 rounded-xl p-8 md:p-12 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]"
          >
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#16130F]/40 mb-8 text-center">
              {t("how.diagramLabel")}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-0">
              {MECHANISM_STEPS.map((step, i) => (
                <div
                  key={step.label}
                  className="flex flex-col md:flex-row items-center"
                >
                  <div className="flex flex-col items-center text-center px-6 py-4">
                    <span className="text-[28px] mb-2">{step.icon}</span>
                    <p className="font-mono text-[12px] font-semibold text-[#16130F] tracking-wide">
                      {step.label}
                    </p>
                    <p className="text-[11px] text-[#16130F]/45 mt-1 max-w-[14ch]">
                      {step.desc}
                    </p>
                  </div>
                  {i < MECHANISM_STEPS.length - 1 && (
                    <div className="flex items-center justify-center my-2 md:my-0">
                      <ArrowRight
                        size={14}
                        className="text-[#1F3AA8]/40 rotate-90 md:rotate-0"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── What builderkin is NOT ───────────────────────────────────────── */}
      <section className="bg-[#16130F] text-[#F5F1EA]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="mb-12">
              <p className="font-mono text-[11px] tracking-widest uppercase text-[#F5F1EA]/30 mb-3">
                {t("not.eyebrow")}
              </p>
              <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-[#F5F1EA]">
                {t("not.heading")}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {NOT_SECTION.map((item) => (
                <motion.div
                  key={item}
                  variants={fadeInUp}
                  className="flex items-center gap-3 py-4 border-b border-[#F5F1EA]/8"
                >
                  <AlertCircle
                    size={14}
                    className="text-[#F5F1EA]/25 flex-shrink-0"
                  />
                  <p className="text-[14px] text-[#F5F1EA]/60">{item}</p>
                </motion.div>
              ))}
            </div>

            <motion.p
              variants={fadeInUp}
              className="mt-12 text-[15px] text-[#F5F1EA]/50 leading-relaxed max-w-[60ch]"
            >
              {t("not.clarification")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Under the hood ───────────────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={slideInLeft}>
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#1F3AA8] mb-3">
              {t("hood.eyebrow")}
            </p>
            <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-[#16130F] mb-6">
              {t("hood.heading")}
            </h2>
            <p className="text-[15px] text-[#16130F]/60 leading-relaxed mb-6">
              {t("hood.body1")}
            </p>
            <p className="text-[15px] text-[#16130F]/60 leading-relaxed mb-8">
              {t("hood.body2")}
            </p>
            <Link
              href="/swap-agreements"
              className="inline-flex items-center gap-2 text-[13px] text-[#1F3AA8] hover:underline font-mono tracking-wide"
            >
              {t("hood.link")}
              <ArrowRight size={13} />
            </Link>
          </motion.div>

          <motion.div variants={slideInRight}>
            <div className="bg-white border border-[#16130F]/8 rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]">
              {/* Mock agreement preview */}
              <div className="bg-[#16130F] px-5 py-3 flex items-center gap-2">
                <FileText size={13} className="text-[#F5F1EA]/50" />
                <span className="font-mono text-[11px] text-[#F5F1EA]/50 tracking-wide">
                  {t("hood.docTitle")}
                </span>
              </div>
              <div className="p-6 font-mono text-[11px] text-[#16130F]/60 leading-relaxed space-y-3">
                <p className="text-[#16130F]/30">
                  {t("hood.docLine1")}
                </p>
                <p>
                  <span className="text-[#16130F]/30">{t("hood.docParty1Label")}</span>{" "}
                  {t("hood.docParty1Value")}
                </p>
                <p>
                  <span className="text-[#16130F]/30">{t("hood.docParty2Label")}</span>{" "}
                  {t("hood.docParty2Value")}
                </p>
                <p>
                  <span className="text-[#16130F]/30">{t("hood.docTransferLabel")}</span>{" "}
                  {t("hood.docTransferValue")}
                </p>
                <p>
                  <span className="text-[#16130F]/30">{t("hood.docConsidLabel")}</span>{" "}
                  {t("hood.docConsidValue")}
                </p>
                <div className="border-t border-[#16130F]/8 pt-3 mt-3">
                  <p className="text-[#16130F]/20 italic">{t("hood.docRedacted")}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <section
        id="pricing"
        className="bg-white border-t border-[#16130F]/8"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <p className="font-mono text-[11px] tracking-widest uppercase text-[#1F3AA8] mb-3">
                {t("pricing.eyebrow")}
              </p>
              <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-[#16130F]">
                {t("pricing.heading")}
              </h2>
              <p className="text-[15px] text-[#16130F]/50 mt-4 max-w-[44ch] mx-auto leading-relaxed">
                {t("pricing.subheading")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[760px] mx-auto">
              {PRICING.map((plan) => (
                <motion.div
                  key={plan.tier}
                  variants={scaleIn}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`rounded-xl p-8 border ${
                    plan.accent
                      ? "bg-[#16130F] border-[#16130F] shadow-[0_4px_6px_rgba(0,0,0,0.08),0_16px_40px_-8px_rgba(0,0,0,0.20)]"
                      : "bg-[#F5F1EA] border-[#16130F]/8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_20px_-6px_rgba(0,0,0,0.08)]"
                  }`}
                >
                  <p
                    className={`font-mono text-[11px] tracking-widest uppercase mb-4 ${plan.accent ? "text-[#F5F1EA]/40" : "text-[#16130F]/40"}`}
                  >
                    {plan.tier}
                  </p>
                  <div className="flex items-baseline gap-1.5 mb-6">
                    <span
                      className={`text-[40px] font-semibold tracking-tight leading-none ${plan.accent ? "text-[#F5F1EA]" : "text-[#16130F]"}`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-[13px] ${plan.accent ? "text-[#F5F1EA]/40" : "text-[#16130F]/40"}`}
                    >
                      {plan.period}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check
                          size={13}
                          className={`mt-0.5 flex-shrink-0 ${plan.accent ? "text-[#F5F1EA]/50" : "text-[#1F3AA8]"}`}
                        />
                        <span
                          className={`text-[13px] leading-snug ${plan.accent ? "text-[#F5F1EA]/70" : "text-[#16130F]/65"}`}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.href}
                    className={`block text-center py-3 px-6 text-[13px] tracking-wide rounded-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2 ${
                      plan.accent
                        ? "bg-[#F5F1EA] text-[#16130F] hover:bg-white"
                        : "bg-[#16130F] text-[#F5F1EA] hover:bg-[#1F3AA8]"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-[#1F3AA8] rounded-2xl px-10 py-16 md:py-20 text-center relative overflow-hidden"
        >
          {/* Subtle radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
          <p className="font-mono text-[11px] tracking-widest uppercase text-white/40 mb-4">
            {t("cta.eyebrow")}
          </p>
          <h2 className="text-[32px] md:text-[44px] font-semibold tracking-tight text-white mb-5 text-balance">
            {t("cta.heading")}
          </h2>
          <p className="text-[16px] text-white/60 leading-relaxed max-w-[48ch] mx-auto mb-10">
            {t("cta.body")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/swap-listing"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#16130F] text-[13px] tracking-wide rounded-sm hover:bg-[#F5F1EA] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F3AA8]"
            >
              {t("cta.primary")}
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/25 text-white text-[13px] tracking-wide rounded-sm hover:border-white/50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F3AA8]"
            >
              {t("cta.secondary")}
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}