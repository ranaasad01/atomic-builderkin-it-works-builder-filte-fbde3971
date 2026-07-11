"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND } from "@/lib/data";
import { ArrowRight, CheckCircle, Clock, FileText, Building2, DollarSign, Users, Shield, ExternalLink, ChevronRight, Star, Activity } from 'lucide-react';
import { useTranslations } from "next-intl";

interface SwapFeedItem {
  id: string;
  projectA: string;
  projectB: string;
  terms: string;
  date: string;
  type: "equity" | "cash" | "promo";
  category: string;
}

const SWAP_FEED: SwapFeedItem[] = [
  {
    id: "sf-001",
    projectA: "ContextCraft",
    projectB: "PromptVault",
    terms: "3% equity ↔ $8,400 cash",
    date: "2025-01-14",
    type: "cash",
    category: "developer-tools",
  },
  {
    id: "sf-002",
    projectA: "TokenLens",
    projectB: "ContextCraft",
    terms: "2% equity ↔ 6-month promo",
    date: "2025-01-10",
    type: "promo",
    category: "developer-tools",
  },
  {
    id: "sf-003",
    projectA: "ContextCraft",
    projectB: "ChainDraft",
    terms: "1.5% equity ↔ 1.5% equity",
    date: "2024-12-28",
    type: "equity",
    category: "developer-tools",
  },
  {
    id: "sf-004",
    projectA: "EmbedFlow",
    projectB: "ContextCraft",
    terms: "4% equity ↔ $11,200 cash",
    date: "2024-12-15",
    type: "cash",
    category: "developer-tools",
  },
  {
    id: "sf-005",
    projectA: "ContextCraft",
    projectB: "SemanticShift",
    terms: "2% equity ↔ newsletter blast (180k)",
    date: "2024-11-30",
    type: "promo",
    category: "developer-tools",
  },
  {
    id: "sf-006",
    projectA: "VectorBridge",
    projectB: "ContextCraft",
    terms: "3.5% equity ↔ $9,800 cash",
    date: "2024-11-12",
    type: "cash",
    category: "developer-tools",
  },
];

const TYPE_COLORS: Record<string, string> = {
  equity: "bg-[#1F3AA8]/10 text-[#1F3AA8] border-[#1F3AA8]/20",
  cash: "bg-emerald-50 text-emerald-700 border-emerald-200",
  promo: "bg-amber-50 text-amber-700 border-amber-200",
};

const TYPE_LABELS: Record<string, string> = {
  equity: "Equity",
  cash: "Cash",
  promo: "Promo",
};

function formatDate(dateStr: string): string {
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const month = months[parseInt(parts[1] ?? "1", 10) - 1] ?? "";
  const day = parseInt(parts[2] ?? "1", 10);
  const year = parts[0] ?? "";
  return `${month} ${day}, ${year}`;
}

export default function SwapListingPage() {
  const t = useTranslations();
  const [activeFilter, setActiveFilter] = useState<"all" | "equity" | "cash" | "promo">("all");
  const [ctaEmail, setCtaEmail] = useState("");
  const [ctaSubmitted, setCtaSubmitted] = useState(false);

  const filteredFeed = SWAP_FEED.filter(
    (item) => activeFilter === "all" || item.type === activeFilter
  );

  function handleCtaSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (ctaEmail.trim()) {
      setCtaSubmitted(true);
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F1EA]">
      {/* Page header */}
      <motion.section
        className="border-b border-[#16130F]/10 bg-[#F5F1EA]"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-12 md:py-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={fadeInUp}
              className="font-mono text-[11px] tracking-widest uppercase text-[#16130F]/40 mb-3"
            >
              {t("swapListing.eyebrow")}
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-semibold tracking-tight text-[#16130F] text-balance leading-tight"
            >
              {t("swapListing.title")}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mt-3 text-[15px] text-[#16130F]/60 leading-relaxed max-w-[52ch]"
            >
              {t("swapListing.subtitle")}
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Main content: listing doc + sidebar */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 lg:gap-14 items-start">

          {/* LEFT: Listing document */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* Document header */}
            <motion.div
              variants={fadeInUp}
              className="bg-white border border-[#16130F]/8 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] overflow-hidden"
            >
              {/* Doc top bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#16130F]/8 bg-[#F5F1EA]/60">
                <div className="flex items-center gap-2.5">
                  <FileText size={14} className="text-[#1F3AA8]" />
                  <span className="font-mono text-[11px] tracking-widest uppercase text-[#16130F]/50">
                    {t("swapListing.docLabel")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-mono text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {t("swapListing.statusActive")}
                  </span>
                </div>
              </div>

              {/* Document body */}
              <div className="px-6 md:px-8 py-8 space-y-8">

                {/* Project identity */}
                <motion.div variants={fadeInUp}>
                  <p className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-4">
                    {t("swapListing.sectionProject")}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FieldBlock
                      label={t("swapListing.fieldProjectName")}
                      value="ContextCraft"
                      highlight
                    />
                    <FieldBlock
                      label={t("swapListing.fieldBuilder")}
                      value="Priya Nair"
                    />
                    <FieldBlock
                      label={t("swapListing.fieldCategory")}
                      value="Developer Tools / LLM Infrastructure"
                    />
                    <FieldBlock
                      label={t("swapListing.fieldStage")}
                      value="Private Beta — 340 active users"
                    />
                  </div>
                </motion.div>

                <Divider />

                {/* Entity & legal */}
                <motion.div variants={fadeInUp}>
                  <p className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-4">
                    {t("swapListing.sectionLegal")}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FieldBlock
                      label={t("swapListing.fieldEntityType")}
                      value="UK Ltd (Companies House)"
                      icon={<Building2 size={13} className="text-[#1F3AA8]" />}
                    />
                    <FieldBlock
                      label={t("swapListing.fieldRegistration")}
                      value="Registered No. 15882341"
                    />
                    <FieldBlock
                      label={t("swapListing.fieldJurisdiction")}
                      value="England and Wales"
                    />
                    <FieldBlock
                      label={t("swapListing.fieldShareClass")}
                      value="Ordinary Shares (non-voting)"
                    />
                  </div>
                  <div className="mt-4 p-3.5 rounded-lg bg-[#1F3AA8]/5 border border-[#1F3AA8]/15 flex items-start gap-2.5">
                    <Shield size={13} className="text-[#1F3AA8] mt-0.5 shrink-0" />
                    <p className="text-[12px] text-[#16130F]/70 leading-relaxed">
                      {t("swapListing.legalNote")}
                    </p>
                  </div>
                </motion.div>

                <Divider />

                {/* Valuation */}
                <motion.div variants={fadeInUp}>
                  <p className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-4">
                    {t("swapListing.sectionValuation")}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-1 p-4 rounded-xl bg-[#16130F] text-[#F5F1EA]">
                      <p className="text-[11px] font-mono tracking-widest uppercase text-[#F5F1EA]/50 mb-1">
                        {t("swapListing.fieldValuation")}
                      </p>
                      <p className="text-2xl font-semibold tracking-tight">$28,000</p>
                      <p className="text-[11px] text-[#F5F1EA]/50 mt-1">
                        {t("swapListing.valuationBasis")}
                      </p>
                    </div>
                    <FieldBlock
                      label={t("swapListing.fieldRevenue")}
                      value="$1,100 MRR (growing)"
                      icon={<DollarSign size={13} className="text-emerald-600" />}
                    />
                    <FieldBlock
                      label={t("swapListing.fieldMultiple")}
                      value="25.5× ARR"
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FieldBlock
                      label={t("swapListing.fieldLastRound")}
                      value="Pre-seed, self-funded"
                    />
                    <FieldBlock
                      label={t("swapListing.fieldCapTable")}
                      value="Founder 100% (pre-swap)"
                    />
                  </div>
                </motion.div>

                <Divider />

                {/* Swap offer */}
                <motion.div variants={fadeInUp}>
                  <p className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-4">
                    {t("swapListing.sectionOffer")}
                  </p>
                  <div className="p-5 rounded-xl border-2 border-[#1F3AA8]/30 bg-[#1F3AA8]/4">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-[#1F3AA8] flex items-center justify-center shrink-0">
                        <ArrowRight size={14} className="text-white" />
                      </div>
                      <div>
                        <p className="text-[15px] font-semibold text-[#16130F] tracking-tight">
                          {t("swapListing.offerHeadline")}
                        </p>
                        <p className="text-[13px] text-[#16130F]/60 mt-0.5">
                          {t("swapListing.offerSubline")}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-lg bg-white border border-[#16130F]/8">
                        <p className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-1.5">
                          {t("swapListing.optionA")}
                        </p>
                        <p className="text-[14px] font-semibold text-[#16130F]">$8,400 cash</p>
                        <p className="text-[12px] text-[#16130F]/50 mt-0.5">
                          {t("swapListing.optionACash")}
                        </p>
                      </div>
                      <div className="p-3.5 rounded-lg bg-white border border-[#16130F]/8">
                        <p className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-1.5">
                          {t("swapListing.optionB")}
                        </p>
                        <p className="text-[14px] font-semibold text-[#16130F]">
                          {t("swapListing.optionBPromo")}
                        </p>
                        <p className="text-[12px] text-[#16130F]/50 mt-0.5">
                          {t("swapListing.optionBDetail")}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <Divider />

                {/* What they want */}
                <motion.div variants={fadeInUp}>
                  <p className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-4">
                    {t("swapListing.sectionWants")}
                  </p>
                  <div className="space-y-3">
                    <WantItem
                      icon={<Users size={13} />}
                      title={t("swapListing.want1Title")}
                      desc={t("swapListing.want1Desc")}
                    />
                    <WantItem
                      icon={<Activity size={13} />}
                      title={t("swapListing.want2Title")}
                      desc={t("swapListing.want2Desc")}
                    />
                    <WantItem
                      icon={<Star size={13} />}
                      title={t("swapListing.want3Title")}
                      desc={t("swapListing.want3Desc")}
                    />
                  </div>
                </motion.div>

                <Divider />

                {/* Timeline */}
                <motion.div variants={fadeInUp}>
                  <p className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-4">
                    {t("swapListing.sectionTimeline")}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FieldBlock
                      label={t("swapListing.fieldListedOn")}
                      value="14 Jan 2025"
                      icon={<Clock size={13} className="text-[#16130F]/40" />}
                    />
                    <FieldBlock
                      label={t("swapListing.fieldExpires")}
                      value="14 Apr 2025 (90 days)"
                    />
                    <FieldBlock
                      label={t("swapListing.fieldSigningWindow")}
                      value="14 days from match"
                    />
                  </div>
                  <div className="mt-4">
                    <FieldBlock
                      label={t("swapListing.fieldNegotiation")}
                      value={t("swapListing.fieldNegotiationValue")}
                    />
                  </div>
                </motion.div>

                <Divider />

                {/* Escrow routing */}
                <motion.div variants={fadeInUp}>
                  <p className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-4">
                    {t("swapListing.sectionEscrow")}
                  </p>
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                    <div className="flex items-start gap-3">
                      <Shield size={14} className="text-amber-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[13px] font-semibold text-amber-900 mb-1">
                          {t("swapListing.escrowTitle")}
                        </p>
                        <p className="text-[12px] text-amber-800 leading-relaxed">
                          {t("swapListing.escrowBody")}
                        </p>
                        <a
                          href="https://www.escrow.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-2 text-[12px] font-mono text-amber-700 hover:text-amber-900 transition-colors duration-200"
                        >
                          escrow.com
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <Divider />

                {/* Project description */}
                <motion.div variants={fadeInUp}>
                  <p className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-4">
                    {t("swapListing.sectionAboutProject")}
                  </p>
                  <p className="text-[14px] text-[#16130F]/80 leading-relaxed">
                    {t("swapListing.projectDesc")}
                  </p>
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <StatPill label={t("swapListing.stat1Label")} value="340" />
                    <StatPill label={t("swapListing.stat2Label")} value="$1.1k" />
                    <StatPill label={t("swapListing.stat3Label")} value="6" />
                    <StatPill label={t("swapListing.stat4Label")} value="4.8★" />
                  </div>
                </motion.div>

              </div>
            </motion.div>

            {/* CTA: Submit your own listing */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 p-6 md:p-8 rounded-xl bg-[#16130F] text-[#F5F1EA]"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <p className="text-[11px] font-mono tracking-widest uppercase text-[#F5F1EA]/40 mb-2">
                    {t("swapListing.ctaEyebrow")}
                  </p>
                  <h2 className="text-xl font-semibold tracking-tight text-balance">
                    {t("swapListing.ctaTitle")}
                  </h2>
                  <p className="mt-2 text-[13px] text-[#F5F1EA]/60 leading-relaxed max-w-[44ch]">
                    {t("swapListing.ctaBody")}
                  </p>
                </div>
                {ctaSubmitted ? (
                  <div className="flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30 shrink-0">
                    <CheckCircle size={15} className="text-emerald-400" />
                    <span className="text-[13px] text-emerald-300 font-mono">
                      {t("swapListing.ctaSuccess")}
                    </span>
                  </div>
                ) : (
                  <form
                    onSubmit={handleCtaSubmit}
                    className="flex flex-col sm:flex-row gap-2 shrink-0"
                  >
                    <input
                      type="email"
                      value={ctaEmail}
                      onChange={(e) => setCtaEmail(e.target.value)}
                      placeholder={t("swapListing.ctaPlaceholder")}
                      required
                      className="px-4 py-2.5 rounded-lg bg-white/10 border border-white/15 text-[13px] text-[#F5F1EA] placeholder-[#F5F1EA]/30 focus:outline-none focus:ring-2 focus:ring-[#1F3AA8] focus:border-transparent transition-all duration-200 min-w-[220px]"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-lg bg-[#1F3AA8] text-white text-[13px] font-medium hover:bg-[#1a31a0] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#16130F] whitespace-nowrap flex items-center gap-1.5"
                    >
                      {t("swapListing.ctaButton")}
                      <ChevronRight size={13} />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Swap feed sidebar */}
          <motion.aside
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="lg:sticky lg:top-20"
            aria-label={t("swapListing.sidebarAriaLabel")}
            aria-live="polite"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-white border border-[#16130F]/8 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] overflow-hidden"
            >
              {/* Sidebar header */}
              <div className="px-5 py-4 border-b border-[#16130F]/8 bg-[#F5F1EA]/60">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Activity size={13} className="text-[#1F3AA8]" />
                    <span className="font-mono text-[11px] tracking-widest uppercase text-[#16130F]/50">
                      {t("swapListing.sidebarTitle")}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#16130F]/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {t("swapListing.sidebarLive")}
                  </span>
                </div>
                {/* Filter pills */}
                <div className="flex flex-wrap gap-1.5" role="group" aria-label={t("swapListing.filterAriaLabel")}>
                  {(["all", "equity", "cash", "promo"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wide border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] ${
                        activeFilter === f
                          ? "bg-[#16130F] text-[#F5F1EA] border-[#16130F]"
                          : "bg-transparent text-[#16130F]/50 border-[#16130F]/15 hover:border-[#16130F]/30 hover:text-[#16130F]"
                      }`}
                      aria-pressed={activeFilter === f}
                    >
                      {f === "all" ? t("swapListing.filterAll") : TYPE_LABELS[f]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feed items */}
              <div className="divide-y divide-[#16130F]/6">
                {filteredFeed.length === 0 ? (
                  <div className="px-5 py-8 text-center">
                    <p className="text-[13px] text-[#16130F]/40 font-mono">
                      {t("swapListing.feedEmpty")}
                    </p>
                  </div>
                ) : (
                  filteredFeed.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      variants={fadeInUp}
                      custom={idx}
                      className="px-5 py-4 hover:bg-[#F5F1EA]/60 transition-colors duration-200"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-semibold text-[#16130F] truncate">
                            {item.projectA}
                            <span className="font-normal text-[#16130F]/40 mx-1">↔</span>
                            {item.projectB}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-mono border ${
                            TYPE_COLORS[item.type] ?? ""
                          }`}
                        >
                          {TYPE_LABELS[item.type] ?? item.type}
                        </span>
                      </div>
                      <p className="font-mono text-[11px] text-[#16130F]/60 mb-1">
                        {item.terms}
                      </p>
                      <p className="text-[11px] text-[#16130F]/35 font-mono">
                        {formatDate(item.date)}
                      </p>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Sidebar footer */}
              <div className="px-5 py-4 border-t border-[#16130F]/8 bg-[#F5F1EA]/40">
                <p className="text-[11px] text-[#16130F]/40 font-mono mb-3">
                  {t("swapListing.sidebarFooterNote")}
                </p>
                <Link
                  href="/swap-agreements"
                  className="inline-flex items-center gap-1.5 text-[12px] text-[#1F3AA8] hover:text-[#16130F] transition-colors duration-200 font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] rounded-sm"
                >
                  {t("swapListing.sidebarViewAgreements")}
                  <ArrowRight size={11} />
                </Link>
              </div>
            </motion.div>

            {/* Quick stats card */}
            <motion.div
              variants={scaleIn}
              className="mt-4 p-5 bg-white border border-[#16130F]/8 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.06)]"
            >
              <p className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-4">
                {t("swapListing.statsTitle")}
              </p>
              <div className="space-y-3">
                <StatRow label={t("swapListing.statSwapsLabel")} value="6" />
                <StatRow label={t("swapListing.statVolumeLabel")} value="$37.8k" />
                <StatRow label={t("swapListing.statPartnersLabel")} value="5" />
                <StatRow label={t("swapListing.statAvgLabel")} value="$6.3k" />
              </div>
            </motion.div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}

/* ── Inline sub-components ── */

function FieldBlock({
  label,
  value,
  icon,
  highlight,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`p-3.5 rounded-lg border ${
        highlight
          ? "bg-[#1F3AA8]/5 border-[#1F3AA8]/20"
          : "bg-[#F5F1EA]/60 border-[#16130F]/8"
      }`}
    >
      <p className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-1">
        {label}
      </p>
      <div className="flex items-center gap-1.5">
        {icon}
        <p
          className={`text-[13px] font-medium ${
            highlight ? "text-[#1F3AA8]" : "text-[#16130F]"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function WantItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      whileHover={{ x: 2 }}
      transition={{ duration: 0.15 }}
      className="flex items-start gap-3 p-3.5 rounded-lg bg-[#F5F1EA]/60 border border-[#16130F]/8"
    >
      <div className="w-6 h-6 rounded-full bg-[#16130F]/8 flex items-center justify-center shrink-0 mt-0.5 text-[#16130F]/60">
        {icon}
      </div>
      <div>
        <p className="text-[13px] font-semibold text-[#16130F]">{title}</p>
        <p className="text-[12px] text-[#16130F]/55 mt-0.5 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg bg-[#F5F1EA]/80 border border-[#16130F]/8 text-center">
      <p className="text-[15px] font-semibold text-[#16130F]">{value}</p>
      <p className="text-[11px] text-[#16130F]/45 mt-0.5 font-mono">{label}</p>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-[12px] text-[#16130F]/55">{label}</p>
      <p className="text-[13px] font-semibold text-[#16130F] font-mono">{value}</p>
    </div>
  );
}

function Divider() {
  return <div className="border-t border-[#16130F]/6" />;
}