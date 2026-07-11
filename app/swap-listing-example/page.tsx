"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Clock, FileText, Info, Search, Sparkles, Star, User } from 'lucide-react';
import { BRAND } from "@/lib/data";
import {
  fadeIn,
  fadeInUp,
  scaleIn,
  slideInLeft,
  slideInRight,
  staggerContainer,
} from "@/lib/motion";
import { useTranslations } from "next-intl";

// ─── Mock data ────────────────────────────────────────────────────────────────

const SWAP_TYPES = ["All", "Equity", "Cash", "Promo"] as const;
type SwapTypeFilter = (typeof SWAP_TYPES)[number];

interface SwapListing {
  id: string;
  projectName: string;
  builderHandle: string;
  category: string;
  stage: string;
  valuation: string;
  seeking: string;
  offering: string;
  swapType: "equity" | "cash" | "promo";
  description: string;
  postedDaysAgo: number;
  responseTime: string;
  swapsCompleted: number;
  verified: boolean;
  tags: string[];
}

const SWAP_LISTINGS: SwapListing[] = [
  {
    id: "sl-001",
    projectName: "Promptbase Studio",
    builderHandle: "@tobiasrenn",
    category: "AI Tooling",
    stage: "Beta",
    valuation: "$180,000",
    seeking: "2% equity in a distribution-heavy project",
    offering: "3% equity in Promptbase Studio",
    swapType: "equity",
    description:
      "Promptbase Studio is a no-code prompt engineering environment with 1,400 active beta users. We have strong retention (68% D30) but limited reach. Looking to swap equity with a builder who has an established newsletter or community of developers.",
    postedDaysAgo: 2,
    responseTime: "Usually within 4 hours",
    swapsCompleted: 1,
    verified: true,
    tags: ["prompt-engineering", "no-code", "developer-tools"],
  },
  {
    id: "sl-002",
    projectName: "Legalblocks",
    builderHandle: "@mara_osei",
    category: "Legal Tech",
    stage: "Live",
    valuation: "$320,000",
    seeking: "$4,000 cash for 6-month runway extension",
    offering: "1.5% equity in Legalblocks",
    swapType: "cash",
    description:
      "Legalblocks auto-generates Delaware LLC operating agreements and UK Ltd articles from a short intake form. 340 paying customers at $29/month. Seeking a cash injection to fund a paralegal review layer before Series A conversations begin.",
    postedDaysAgo: 5,
    responseTime: "Usually within 24 hours",
    swapsCompleted: 3,
    verified: true,
    tags: ["legal-automation", "delaware-llc", "uk-ltd", "b2b"],
  },
  {
    id: "sl-003",
    projectName: "Clipforge",
    builderHandle: "@devika_nair",
    category: "Video AI",
    stage: "Early Access",
    valuation: "$95,000",
    seeking: "Promotion to 5k+ developer audience",
    offering: "Lifetime Pro access + 2% equity",
    swapType: "promo",
    description:
      "Clipforge turns long-form YouTube videos into short-form clips with AI-generated captions and B-roll suggestions. 220 early access users, 4.6-star average rating. Looking for a builder with a developer-focused newsletter or podcast to co-announce our public launch.",
    postedDaysAgo: 1,
    responseTime: "Usually within 2 hours",
    swapsCompleted: 0,
    verified: false,
    tags: ["video-ai", "content-creation", "short-form"],
  },
  {
    id: "sl-004",
    projectName: "Runbook.ai",
    builderHandle: "@felix_strand",
    category: "DevOps",
    stage: "Live",
    valuation: "$510,000",
    seeking: "3% equity in a complementary SaaS",
    offering: "2.5% equity in Runbook.ai",
    swapType: "equity",
    description:
      "Runbook.ai converts Notion docs and Confluence pages into executable runbooks with Slack-native incident triggers. 78 paying teams, $14k MRR. Seeking equity in a monitoring or observability tool to create a tighter integration story for enterprise buyers.",
    postedDaysAgo: 8,
    responseTime: "Usually within 12 hours",
    swapsCompleted: 2,
    verified: true,
    tags: ["devops", "incident-management", "slack", "enterprise"],
  },
  {
    id: "sl-005",
    projectName: "Formweave",
    builderHandle: "@priya_chandran",
    category: "No-Code",
    stage: "Beta",
    valuation: "$140,000",
    seeking: "$2,500 cash for design sprint",
    offering: "2% equity in Formweave",
    swapType: "cash",
    description:
      "Formweave is a conditional-logic form builder that outputs to Airtable, Notion, and Google Sheets simultaneously. 890 beta signups, 210 active users. Need cash to hire a contract designer for a UI overhaul before the Product Hunt launch scheduled for next quarter.",
    postedDaysAgo: 3,
    responseTime: "Usually within 8 hours",
    swapsCompleted: 1,
    verified: true,
    tags: ["forms", "no-code", "airtable", "notion"],
  },
  {
    id: "sl-006",
    projectName: "Ghostwriter CLI",
    builderHandle: "@sam_okafor",
    category: "Developer Tools",
    stage: "Public",
    valuation: "$60,000",
    seeking: "Promotion to technical audience",
    offering: "Sponsored mention + 1% equity",
    swapType: "promo",
    description:
      "Ghostwriter CLI is an open-source tool that generates commit messages, PR descriptions, and changelogs from git diffs using local LLMs. 3,200 GitHub stars, 180 weekly active users. Looking for a builder with a dev-focused newsletter to feature us in an issue.",
    postedDaysAgo: 0,
    responseTime: "Usually within 1 hour",
    swapsCompleted: 0,
    verified: false,
    tags: ["cli", "open-source", "git", "llm"],
  },
];

const STEPS = [
  {
    number: "01",
    title: "Create your listing",
    body: "Describe your project, set your valuation, and specify exactly what you are offering and what you want in return. Equity percentage, cash amount, or promotion scope.",
  },
  {
    number: "02",
    title: "Get matched",
    body: "Builders browse the live feed and send swap requests. You review their project, valuation, and track record before accepting. No cold outreach from strangers.",
  },
  {
    number: "03",
    title: "Sign real paperwork",
    body: "Once both parties agree, builderkin generates a Delaware LLC or UK Ltd equity transfer agreement. Both builders sign via DocuSign. The swap is recorded on the public ledger.",
  },
];

const SWAP_TYPE_COLORS: Record<string, string> = {
  equity: "bg-[#1F3AA8]/10 text-[#1F3AA8] border-[#1F3AA8]/20",
  cash: "bg-emerald-50 text-emerald-700 border-emerald-200",
  promo: "bg-amber-50 text-amber-700 border-amber-200",
};

const SWAP_TYPE_LABELS: Record<string, string> = {
  equity: "Equity Swap",
  cash: "Cash for Equity",
  promo: "Promo Deal",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SwapCard({ listing, index }: { listing: SwapListing; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      variants={fadeInUp}
      custom={index}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="bg-white border border-[#16130F]/8 rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_12px_32px_-8px_rgba(0,0,0,0.12)] transition-shadow duration-300"
      aria-label={`Swap listing: ${listing.projectName}`}
    >
      {/* Card header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-mono tracking-wide px-2 py-0.5 rounded-full border ${SWAP_TYPE_COLORS[listing.swapType]}`}
              >
                {SWAP_TYPE_LABELS[listing.swapType] ?? listing.swapType}
              </span>
              {listing.verified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono tracking-wide px-2 py-0.5 rounded-full bg-[#16130F]/5 text-[#16130F]/60 border border-[#16130F]/10">
                  <Check size={10} />
                  Verified
                </span>
              )}
            </div>
            <h3 className="text-[17px] font-semibold text-[#16130F] tracking-tight leading-snug">
              {listing.projectName}
            </h3>
            <p className="text-[12px] font-mono text-[#16130F]/40 mt-0.5">
              {listing.builderHandle} &middot; {listing.category} &middot;{" "}
              {listing.stage}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[13px] font-mono text-[#16130F]/50 mb-0.5">
              Valuation
            </p>
            <p className="text-[16px] font-semibold text-[#16130F] font-mono">
              {listing.valuation}
            </p>
          </div>
        </div>

        {/* Swap terms */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-[#F5F1EA] rounded-lg p-3">
            <p className="text-[10px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-1">
              Offering
            </p>
            <p className="text-[13px] text-[#16130F] leading-snug">
              {listing.offering}
            </p>
          </div>
          <div className="bg-[#1F3AA8]/5 rounded-lg p-3">
            <p className="text-[10px] font-mono tracking-widest uppercase text-[#1F3AA8]/50 mb-1">
              Seeking
            </p>
            <p className="text-[13px] text-[#16130F] leading-snug">
              {listing.seeking}
            </p>
          </div>
        </div>
      </div>

      {/* Expandable description */}
      <div className="px-6 pb-2">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1.5 text-[12px] text-[#16130F]/50 hover:text-[#16130F] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] rounded-sm"
          aria-expanded={expanded}
        >
          <Info size={12} />
          {expanded ? "Hide details" : "Show project details"}
          <ChevronDown
            size={12}
            className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </button>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mt-3 mb-2"
          >
            <p className="text-[13px] text-[#16130F]/70 leading-relaxed">
              {listing.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {(listing.tags ?? []).map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-2 py-0.5 bg-[#16130F]/5 text-[#16130F]/50 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Card footer */}
      <div className="px-6 py-4 border-t border-[#16130F]/6 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4 text-[12px] text-[#16130F]/40 font-mono">
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {listing.postedDaysAgo === 0
              ? "Today"
              : listing.postedDaysAgo === 1
                ? "Yesterday"
                : `${listing.postedDaysAgo}d ago`}
          </span>
          <span className="flex items-center gap-1">
            <Star size={11} />
            {listing.swapsCompleted} swap
            {listing.swapsCompleted !== 1 ? "s" : ""} completed
          </span>
          <span className="hidden sm:flex items-center gap-1">
            <User size={11} />
            {listing.responseTime}
          </span>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/swap-listing"
            className="inline-flex items-center gap-1.5 text-[12px] font-mono tracking-wide px-4 py-1.5 bg-[#16130F] text-[#F5F1EA] rounded-sm hover:bg-[#1F3AA8] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2"
          >
            Request swap
            <ArrowRight size={12} />
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SwapListingExamplePage() {
  const t = useTranslations();
  const [activeFilter, setActiveFilter] = useState<SwapTypeFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = SWAP_LISTINGS.filter((l) => {
    const matchesType =
      activeFilter === "All" ||
      l.swapType === activeFilter.toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      q === "" ||
      l.projectName.toLowerCase().includes(q) ||
      l.category.toLowerCase().includes(q) ||
      l.builderHandle.toLowerCase().includes(q) ||
      (l.tags ?? []).some((tag) => tag.includes(q));
    return matchesType && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#F5F1EA]">
      {/* ── Page header ── */}
      <section className="border-b border-[#16130F]/10 bg-[#F5F1EA]">
        <motion.div
          className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-20"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeIn}
            className="text-[11px] font-mono tracking-widest uppercase text-[#1F3AA8] mb-3"
          >
            Live swap feed
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-[36px] md:text-[52px] font-bold text-[#16130F] tracking-tight leading-[1.1] text-balance max-w-[18ch]"
          >
            Open swap listings
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-[16px] text-[#16130F]/60 leading-relaxed max-w-[52ch]"
          >
            Independent builders offering equity, cash, and promotion deals.
            Every listing leads to a real signed agreement. Browse, filter, and
            send a swap request directly.
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={staggerContainer}
            className="mt-10 flex flex-wrap gap-8"
          >
            {[
              { label: "Active listings", value: "47" },
              { label: "Swaps signed this month", value: "12" },
              { label: "Total equity exchanged", value: "$2.1M" },
            ].map((stat) => (
              <motion.div key={stat.label} variants={scaleIn}>
                <p className="text-[28px] font-bold font-mono text-[#16130F] tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[12px] text-[#16130F]/50 mt-0.5">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── How listing works ── */}
      <section className="border-b border-[#16130F]/10">
        <motion.div
          className="max-w-[1200px] mx-auto px-6 md:px-10 py-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p
            variants={fadeIn}
            className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-8"
          >
            How a listing becomes a signed swap
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0 relative">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                variants={i % 2 === 0 ? slideInLeft : slideInRight}
                className="relative flex gap-5 md:flex-col md:gap-4 pb-8 md:pb-0 md:pr-8 last:pb-0"
              >
                {/* Connector line (desktop) */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-4 left-[calc(100%-16px)] w-8 h-px bg-[#16130F]/15" />
                )}
                {/* Connector line (mobile) */}
                {i < STEPS.length - 1 && (
                  <div className="md:hidden absolute left-4 top-10 w-px h-[calc(100%-16px)] bg-[#16130F]/15" />
                )}
                <div className="shrink-0 w-8 h-8 rounded-full bg-[#1F3AA8]/10 border border-[#1F3AA8]/20 flex items-center justify-center">
                  <span className="text-[11px] font-mono text-[#1F3AA8] font-semibold">
                    {step.number}
                  </span>
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#16130F] tracking-tight mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-[#16130F]/60 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Filters + search ── */}
      <section className="sticky top-14 z-30 bg-[#F5F1EA]/95 backdrop-blur-sm border-b border-[#16130F]/10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#16130F]/40"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, categories…"
              className="w-full pl-8 pr-3 py-1.5 text-[13px] bg-white border border-[#16130F]/12 rounded-sm text-[#16130F] placeholder:text-[#16130F]/30 focus:outline-none focus:ring-2 focus:ring-[#1F3AA8] focus:border-transparent transition-all duration-200"
              aria-label="Search swap listings"
            />
          </div>

          {/* Type filters */}
          <div
            className="flex items-center gap-1.5"
            role="group"
            aria-label="Filter by swap type"
          >
            {SWAP_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`text-[12px] font-mono tracking-wide px-3 py-1.5 rounded-sm border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] ${
                  activeFilter === type
                    ? "bg-[#16130F] text-[#F5F1EA] border-[#16130F]"
                    : "bg-transparent text-[#16130F]/60 border-[#16130F]/20 hover:border-[#16130F]/50 hover:text-[#16130F]"
                }`}
                aria-pressed={activeFilter === type}
              >
                {type}
              </button>
            ))}
          </div>

          <p className="text-[12px] font-mono text-[#16130F]/40 sm:ml-auto">
            {filtered.length} listing{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      {/* ── Listings grid ── */}
      <section
        className="max-w-[1200px] mx-auto px-6 md:px-10 py-12"
        aria-live="polite"
        aria-label="Swap listings"
      >
        {filtered.length === 0 ? (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-center py-20"
          >
            <p className="text-[15px] text-[#16130F]/50">
              No listings match your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("All");
              }}
              className="mt-4 text-[13px] text-[#1F3AA8] underline underline-offset-2 hover:no-underline transition-all duration-200"
            >
              Clear filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-5"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filtered.map((listing, i) => (
              <SwapCard key={listing.id} listing={listing} index={i} />
            ))}
          </motion.div>
        )}
      </section>

      {/* ── Post your own listing CTA ── */}
      <section className="border-t border-[#16130F]/10">
        <motion.div
          className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div variants={slideInLeft}>
              <p className="text-[11px] font-mono tracking-widest uppercase text-[#1F3AA8] mb-3">
                List your project
              </p>
              <h2 className="text-[28px] md:text-[36px] font-bold text-[#16130F] tracking-tight leading-tight text-balance">
                Ready to swap? Post your listing in under five minutes.
              </h2>
              <p className="mt-4 text-[14px] text-[#16130F]/60 leading-relaxed">
                Free tier lets you post one active listing and receive up to
                three swap requests per month. Upgrade to builderkin+ for
                unlimited listings, priority matching, and expedited agreement
                generation.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/swap-listing"
                    className="inline-flex items-center gap-2 text-[13px] font-mono tracking-wide px-5 py-2.5 bg-[#1F3AA8] text-white rounded-sm hover:bg-[#16130F] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2"
                  >
                    <Sparkles size={13} />
                    Post a listing
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/swap-agreements"
                    className="inline-flex items-center gap-2 text-[13px] font-mono tracking-wide px-5 py-2.5 border border-[#16130F]/20 text-[#16130F] rounded-sm hover:border-[#16130F] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2"
                  >
                    <FileText size={13} />
                    Read sample agreements
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Feature checklist */}
            <motion.div variants={slideInRight}>
              <div className="bg-white border border-[#16130F]/8 rounded-xl p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]">
                <p className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-5">
                  What you get with every listing
                </p>
                <ul className="flex flex-col gap-3.5" role="list">
                  {[
                    "Public listing on the live swap feed",
                    "Inbound swap requests from verified builders",
                    "Auto-generated Delaware LLC or UK Ltd agreement",
                    "DocuSign integration for both parties",
                    "Swap recorded on the public builderkin ledger",
                    "Dispute resolution via our legal partner network",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-[#1F3AA8]/10 border border-[#1F3AA8]/20 flex items-center justify-center">
                        <Check size={9} className="text-[#1F3AA8]" />
                      </span>
                      <span className="text-[13px] text-[#16130F]/70 leading-snug">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Legal note ── */}
      <section className="border-t border-[#16130F]/10 bg-[#16130F]/3">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-8">
          <p className="text-[12px] text-[#16130F]/40 leading-relaxed max-w-[80ch]">
            <span className="font-mono font-semibold text-[#16130F]/60">
              Legal note.
            </span>{" "}
            builderkin facilitates introductions and provides agreement
            templates. We are not a law firm and do not provide legal advice.
            All swap agreements are between the two parties named in the
            document. Review all agreements with your own counsel before
            signing. Valuations are self-reported and unaudited.
          </p>
        </div>
      </section>
    </main>
  );
}