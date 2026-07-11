"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeftRight, DollarSign, Megaphone, Filter } from 'lucide-react';
import { BRAND } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

// ─── Types ───────────────────────────────────────────────────────────────────

type SwapType = "equity" | "cash" | "promo";
type EntityType = "delaware" | "uk";

interface SwapEntry {
  id: string;
  projectA: string;
  projectB: string;
  terms: string;
  date: string;
  type: SwapType;
  entity: EntityType;
  valuation: string;
}

type ActiveType = "all" | SwapType;
type ActiveEntity = "all" | EntityType;

// ─── Mock data ───────────────────────────────────────────────────────────────

const SWAPS: SwapEntry[] = [
  { id: "f1",  projectA: "PromptLayer",     projectB: "EvalKit",         terms: "2.5% equity ↔ 1.8% equity",                          date: "2025-01-14", type: "equity", entity: "delaware", valuation: "$280k / $190k" },
  { id: "f2",  projectA: "Docsmith AI",     projectB: "Notionify",       terms: "$4,200 cash ↔ 3-month newsletter promo",              date: "2025-01-13", type: "cash",   entity: "uk",       valuation: "$95k / $140k" },
  { id: "f3",  projectA: "Threadweave",     projectB: "Clipstack",       terms: "1.0% equity ↔ 1.0% equity",                          date: "2025-01-12", type: "equity", entity: "delaware", valuation: "$440k / $62k" },
  { id: "f4",  projectA: "Formbase",        projectB: "Webhookd",        terms: "$2,800 cash ↔ 60-day promo slot",                    date: "2025-01-11", type: "cash",   entity: "uk",       valuation: "$78k / $55k" },
  { id: "f5",  projectA: "Lensly",          projectB: "Captioncraft",    terms: "2.0% equity ↔ 2.0% equity",                          date: "2025-01-10", type: "equity", entity: "delaware", valuation: "$320k / $310k" },
  { id: "f6",  projectA: "Patchwork",       projectB: "Relaybird",       terms: "Promo: 0.5% per 10K verified impressions, cap 2%",    date: "2025-01-09", type: "promo",  entity: "uk",       valuation: "$180k / $95k" },
  { id: "f7",  projectA: "Stacksync",       projectB: "Pipedream Clone", terms: "3.0% equity ↔ $8,500 cash",                          date: "2025-01-08", type: "equity", entity: "delaware", valuation: "$510k / $220k" },
  { id: "f8",  projectA: "Inkdrop Pro",     projectB: "Noted.so",        terms: "1.5% equity ↔ 1.5% equity",                          date: "2025-01-07", type: "equity", entity: "uk",       valuation: "$130k / $125k" },
  { id: "f9",  projectA: "Cronbase",        projectB: "Alertly",         terms: "$1,200 cash ↔ 30-day homepage feature",              date: "2025-01-06", type: "cash",   entity: "delaware", valuation: "$45k / $38k" },
  { id: "f10", projectA: "Typeblocks",      projectB: "Slatepad",        terms: "2.5% equity ↔ 2.0% equity",                          date: "2025-01-05", type: "equity", entity: "uk",       valuation: "$290k / $240k" },
  { id: "f11", projectA: "Replyfast",       projectB: "Inboxzero AI",    terms: "Promo: 1% per 15K impressions, cap 3%",              date: "2025-01-04", type: "promo",  entity: "delaware", valuation: "$160k / $200k" },
  { id: "f12", projectA: "Gridform",        projectB: "Sheetstack",      terms: "1.0% equity ↔ $3,000 cash",                          date: "2025-01-03", type: "equity", entity: "uk",       valuation: "$88k / $72k" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const TYPE_LABELS: Record<SwapType, string> = {
  equity: "Equity",
  cash: "Cash",
  promo: "Promo",
};

const ENTITY_LABELS: Record<EntityType, string> = {
  delaware: "Delaware LLC",
  uk: "UK Ltd",
};

function typeColor(type: SwapType): string {
  switch (type) {
    case "equity": return "#1F3AA8";
    case "cash":   return "#2D6A4F";
    case "promo":  return "#7A3E1F";
  }
}

function TypeIcon({ type }: { type: SwapType }) {
  const color = typeColor(type);
  const cls = "w-4 h-4 flex-shrink-0";
  if (type === "equity") return <ArrowLeftRight className={cls} style={{ color }} aria-hidden="true" />;
  if (type === "cash")   return <DollarSign    className={cls} style={{ color }} aria-hidden="true" />;
  return                        <Megaphone      className={cls} style={{ color }} aria-hidden="true" />;
}

function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[month - 1]} ${day}, ${year}`;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

interface PillProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function FilterPill({ active, onClick, children }: PillProps) {
  return (
    <button
      onClick={onClick}
      className={`text-[12px] font-mono tracking-wide px-3 py-1.5 rounded-sm transition-colors duration-150 ${
        active
          ? "bg-[#1F3AA8] text-white"
          : "border border-[#16130F]/20 text-[#16130F]/60 hover:text-[#16130F] hover:border-[#16130F]/40"
      }`}
    >
      {children}
    </button>
  );
}

interface SwapRowProps {
  swap: SwapEntry;
}

function SwapRow({ swap }: SwapRowProps) {
  const dotColor = typeColor(swap.type);

  return (
    <motion.div
      variants={fadeInUp}
      className="border-b border-[#16130F]/10 py-6 flex flex-col sm:flex-row sm:items-start gap-4"
    >
      {/* Left: icon + dot */}
      <div className="flex items-center gap-2 sm:w-8 flex-shrink-0 pt-0.5">
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: dotColor }}
          aria-hidden="true"
        />
        <TypeIcon type={swap.type} />
      </div>

      {/* Center: project names + terms + entity */}
      <div className="flex-1 min-w-0">
        <p className="font-mono text-[15px] font-medium text-[#16130F] leading-snug">
          {swap.projectA}
          <span className="mx-2 text-[#16130F]/40">↔</span>
          {swap.projectB}
        </p>
        <p className="font-mono text-[13px] text-[#16130F]/60 mt-1 leading-relaxed">
          {swap.terms}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <span
            className="inline-block font-mono text-[11px] tracking-wide uppercase px-2 py-0.5 rounded-sm"
            style={{
              backgroundColor: `${dotColor}15`,
              color: dotColor,
            }}
          >
            {TYPE_LABELS[swap.type]}
          </span>
          <span className="font-mono text-[11px] text-[#16130F]/40 tracking-wide uppercase">
            {ENTITY_LABELS[swap.entity]}
          </span>
          <span className="font-mono text-[11px] text-[#16130F]/30">
            {swap.valuation}
          </span>
        </div>
      </div>

      {/* Right: date + link */}
      <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 flex-shrink-0">
        <time
          dateTime={swap.date}
          className="font-mono text-[12px] text-[#16130F]/40 whitespace-nowrap"
        >
          {formatDate(swap.date)}
        </time>
        <Link
          href={`/swap-agreements`}
          className="font-mono text-[12px] text-[#1F3AA8] hover:underline underline-offset-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] rounded-sm"
        >
          View details
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function FeedPage() {
  const [activeType, setActiveType] = useState<ActiveType>("all");
  const [activeEntity, setActiveEntity] = useState<ActiveEntity>("all");

  const filtered = useMemo(() => {
    return SWAPS.filter((s) => {
      const typeMatch   = activeType   === "all" || s.type   === activeType;
      const entityMatch = activeEntity === "all" || s.entity === activeEntity;
      return typeMatch && entityMatch;
    });
  }, [activeType, activeEntity]);

  return (
    <div className="bg-[#F5F1EA] min-h-screen">
      {/* ── 1. HERO ── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-20 pb-10 md:pt-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeInUp}
            className="font-mono text-[11px] tracking-widest uppercase text-[#1F3AA8]/70 mb-5"
          >
            Live swap feed
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold tracking-tight text-[#16130F] leading-tight mb-4"
          >
            Every signed swap. Chronological. No ranking.
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-[16px] text-[#16130F]/60 leading-relaxed max-w-[66ch] mt-4"
          >
            This is the complete record of swaps signed on {BRAND.name}. Filter by type, entity, or
            valuation. The feed does not rank projects — it records deals in the order they happened.
          </motion.p>
        </motion.div>
      </section>

      {/* ── 2. FILTER BAR ── */}
      <div className="sticky top-14 z-40 bg-[#F5F1EA] border-b border-[#16130F]/10 py-3">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="flex flex-wrap items-center gap-2">
            {/* Swap type filters */}
            <div className="flex items-center gap-1.5" role="group" aria-label="Filter by swap type">
              <Filter className="w-3.5 h-3.5 text-[#16130F]/30 mr-1" aria-hidden="true" />
              {(["all", "equity", "cash", "promo"] as const).map((t) => (
                <FilterPill
                  key={t}
                  active={activeType === t}
                  onClick={() => setActiveType(t)}
                >
                  {t === "all" ? "All" : TYPE_LABELS[t]}
                </FilterPill>
              ))}
            </div>

            {/* Vertical divider */}
            <div className="w-px h-5 bg-[#16130F]/15 mx-1" aria-hidden="true" />

            {/* Entity filters */}
            <div className="flex items-center gap-1.5" role="group" aria-label="Filter by entity type">
              {(["all", "delaware", "uk"] as const).map((e) => (
                <FilterPill
                  key={e}
                  active={activeEntity === e}
                  onClick={() => setActiveEntity(e)}
                >
                  {e === "all" ? "All entities" : ENTITY_LABELS[e]}
                </FilterPill>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. FEED ── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-10">
        {filtered.length === 0 ? (
          <p className="font-mono text-[13px] text-[#16130F]/40 py-16 text-center">
            No swaps match the current filters.
          </p>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            aria-label="Swap feed"
          >
            {filtered.map((swap) => (
              <SwapRow key={swap.id} swap={swap} />
            ))}
          </motion.div>
        )}

        {/* Load more */}
        <div className="flex flex-col items-center gap-3 mt-12">
          <button
            type="button"
            className="border border-[#16130F]/20 text-[13px] font-mono px-6 py-3 hover:bg-[#16130F]/5 transition-colors duration-150 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8]"
          >
            Load more
          </button>
          <p className="font-mono text-[11px] text-[#16130F]/40">
            Showing {filtered.length} of 118 signed swaps. Updated in real time.
          </p>
        </div>
      </section>
    </div>
  );
}
