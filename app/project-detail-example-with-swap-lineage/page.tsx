"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Clock, FileText, GitBranch, Star, Activity, Circle } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

// ─── Inline mock data ────────────────────────────────────────────────────────

interface SwapNode {
  id: string;
  projectA: string;
  projectB: string;
  terms: string;
  date: string;
  type: "equity" | "cash" | "promo";
  status: "signed" | "pending" | "completed";
  legalEntity: string;
}

interface ProjectDetail {
  id: string;
  name: string;
  slug: string;
  valuation: string;
  stage: string;
  category: string;
  description: string;
  longDescription: string;
  swapTerms: string;
  swapType: "equity" | "cash" | "promo";
  listedAt: string;
  builder: string;
  builderTitle: string;
  legalEntity: string;
  jurisdiction: string;
  swapHistory: SwapNode[];
  metrics: { label: string; value: string }[];
}

const PROJECT: ProjectDetail = {
  id: "proj-001",
  name: "Draftly",
  slug: "draftly",
  valuation: "$180,000",
  stage: "Beta",
  category: "Writing Tools",
  description:
    "AI-assisted long-form writing environment for independent journalists and researchers. Structured document mode, citation tracking, and export to DOCX/PDF.",
  longDescription:
    "Draftly started as a personal tool for a freelance journalist who was tired of losing context across 40-tab research sessions. The core insight: most AI writing tools optimize for speed, not depth. Draftly inverts that. It keeps a persistent knowledge graph of your sources, lets you annotate claims with evidence, and surfaces contradictions before you publish. The beta has 340 active users, 60% of whom pay $12/month. Revenue is $2,100 MRR and growing 18% month-over-month. The founder is looking for a swap partner in the developer-tools or productivity space — specifically someone who can offer distribution to technical writers or a complementary audience.",
  swapTerms: "3% equity for 4% equity in a complementary tool",
  swapType: "equity",
  listedAt: "2024-11-14",
  builder: "Priya Nair",
  builderTitle: "Founder, Draftly",
  legalEntity: "Draftly Ltd",
  jurisdiction: "UK Ltd",
  swapHistory: [
    {
      id: "swap-001",
      projectA: "Draftly",
      projectB: "Notepath",
      terms: "2% equity ↔ 2% equity",
      date: "2024-08-03",
      type: "equity",
      status: "completed",
      legalEntity: "UK Ltd / Delaware LLC",
    },
    {
      id: "swap-002",
      projectA: "Draftly",
      projectB: "Clipstack",
      terms: "$1,200 cash ↔ 1.5% equity",
      date: "2024-09-21",
      type: "cash",
      status: "completed",
      legalEntity: "UK Ltd / UK Ltd",
    },
    {
      id: "swap-003",
      projectA: "Draftly",
      projectB: "Researchr",
      terms: "Newsletter cross-promo (90 days)",
      date: "2024-10-30",
      type: "promo",
      status: "signed",
      legalEntity: "UK Ltd / Delaware LLC",
    },
    {
      id: "swap-004",
      projectA: "Draftly",
      projectB: "Markdownly",
      terms: "3% equity ↔ 4% equity",
      date: "2024-11-14",
      type: "equity",
      status: "pending",
      legalEntity: "UK Ltd / Delaware LLC",
    },
  ],
  metrics: [
    { label: "MRR", value: "$2,100" },
    { label: "Active users", value: "340" },
    { label: "MoM growth", value: "18%" },
    { label: "Paying ratio", value: "60%" },
    { label: "Swaps completed", value: "2" },
    { label: "Swaps pending", value: "1" },
  ],
};

const RELATED_PROJECTS = [
  {
    id: "proj-002",
    name: "Notepath",
    valuation: "$95,000",
    stage: "Live",
    category: "Note-taking",
    swapTerms: "2% equity ↔ 2% equity",
    swapType: "equity" as const,
    description:
      "Networked note-taking for researchers. Bi-directional links, LaTeX support, and a graph view that actually helps you think.",
    swapStatus: "completed",
  },
  {
    id: "proj-003",
    name: "Clipstack",
    valuation: "$60,000",
    stage: "Live",
    category: "Productivity",
    swapTerms: "$1,200 cash ↔ 1.5% equity",
    swapType: "cash" as const,
    description:
      "Clipboard manager with AI tagging. Saves everything you copy, surfaces it when you need it, and never sends data to the cloud.",
    swapStatus: "completed",
  },
  {
    id: "proj-004",
    name: "Researchr",
    valuation: "$130,000",
    stage: "Beta",
    category: "Research Tools",
    swapTerms: "Newsletter cross-promo (90 days)",
    swapType: "promo" as const,
    description:
      "Academic paper discovery and annotation tool. Pulls from Semantic Scholar, lets you highlight and tag, exports to Zotero.",
    swapStatus: "signed",
  },
];

// ─── Variant helpers ─────────────────────────────────────────────────────────

const lineVariant: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const pulseVariant: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// ─── Sub-components (inline) ─────────────────────────────────────────────────

function SwapTypeBadge({ type }: { type: "equity" | "cash" | "promo" }) {
  const styles = {
    equity: "bg-[#1F3AA8]/10 text-[#1F3AA8] border-[#1F3AA8]/20",
    cash: "bg-emerald-50 text-emerald-700 border-emerald-200",
    promo: "bg-amber-50 text-amber-700 border-amber-200",
  };
  const labels = { equity: "Equity", cash: "Cash", promo: "Promo" };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase border rounded-sm ${styles[type]}`}
    >
      {labels[type]}
    </span>
  );
}

function StatusDot({ status }: { status: "signed" | "pending" | "completed" }) {
  const styles = {
    completed: "bg-emerald-500",
    signed: "bg-[#1F3AA8]",
    pending: "bg-amber-400",
  };
  const labels = { completed: "Completed", signed: "Signed", pending: "Pending" };
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-1.5 h-1.5 rounded-full ${styles[status]}`} />
      <span className="text-[11px] font-mono text-[#16130F]/50 tracking-wide">
        {labels[status]}
      </span>
    </span>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="bg-white border border-[#16130F]/8 rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)]"
    >
      <p className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-1">
        {label}
      </p>
      <p className="text-2xl font-semibold text-[#16130F] tracking-tight">{value}</p>
    </motion.div>
  );
}

// ─── Swap Lineage Diagram ────────────────────────────────────────────────────

function SwapLineage({ swaps }: { swaps: SwapNode[] }) {
  return (
    <div className="relative">
      {/* Central project node */}
      <div className="flex flex-col items-center mb-10">
        <motion.div
          variants={pulseVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-16 h-16 rounded-full bg-[#1F3AA8] flex items-center justify-center shadow-[0_0_0_6px_rgba(31,58,168,0.12)]"
        >
          <span className="text-white font-mono text-[11px] tracking-widest uppercase font-semibold">
            D
          </span>
        </motion.div>
        <p className="mt-2 text-[13px] font-semibold text-[#16130F] tracking-tight">
          Draftly
        </p>
        <p className="text-[11px] text-[#16130F]/40 font-mono">Hub project</p>
      </div>

      {/* Swap nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {swaps.map((swap, i) => {
          const partner =
            swap.projectA === "Draftly" ? swap.projectB : swap.projectA;
          const delay = i * 0.12;
          return (
            <motion.div
              key={swap.id}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay }}
              className="relative"
            >
              {/* Connector line (decorative, vertical on mobile) */}
              <div className="flex flex-col items-center">
                <motion.div
                  variants={lineVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  style={{ originX: 0.5 }}
                  className="w-px h-8 bg-gradient-to-b from-[#1F3AA8]/40 to-[#1F3AA8]/10 mb-3"
                />
                <motion.div
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  className="w-full bg-white border border-[#16130F]/8 rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_16px_-6px_rgba(0,0,0,0.1)] cursor-default"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-[13px] font-semibold text-[#16130F]">
                      {partner}
                    </p>
                    <SwapTypeBadge type={swap.type} />
                  </div>
                  <p className="text-[11px] font-mono text-[#16130F]/60 mb-3 leading-relaxed">
                    {swap.terms}
                  </p>
                  <div className="flex items-center justify-between">
                    <StatusDot status={swap.status} />
                    <span className="text-[10px] font-mono text-[#16130F]/30">
                      {swap.date}
                    </span>
                  </div>
                  <p className="mt-2 text-[10px] font-mono text-[#16130F]/30 tracking-wide">
                    {swap.legalEntity}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Related project card ────────────────────────────────────────────────────

function RelatedCard({
  project,
}: {
  project: (typeof RELATED_PROJECTS)[number];
}) {
  const statusColors = {
    completed: "text-emerald-600",
    signed: "text-[#1F3AA8]",
    pending: "text-amber-600",
  };
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="bg-white border border-[#16130F]/8 rounded-xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_16px_-6px_rgba(0,0,0,0.08)] flex flex-col gap-3"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[14px] font-semibold text-[#16130F]">
            {project.name}
          </p>
          <p className="text-[11px] text-[#16130F]/40 font-mono mt-0.5">
            {project.category} · {project.stage}
          </p>
        </div>
        <SwapTypeBadge type={project.swapType} />
      </div>
      <p className="text-[12px] text-[#16130F]/60 leading-relaxed">
        {project.description}
      </p>
      <div className="flex items-center justify-between pt-1 border-t border-[#16130F]/6">
        <span className="text-[11px] font-mono text-[#16130F]/40">
          {project.valuation}
        </span>
        <span
          className={`text-[11px] font-mono font-medium ${
            statusColors[project.swapStatus as keyof typeof statusColors] ??
            "text-[#16130F]/40"
          }`}
        >
          {project.swapStatus}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ProjectDetailExamplePage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-[#F5F1EA]">
      {/* ── Breadcrumb ── */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-8 pb-2">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-2 text-[12px] font-mono text-[#16130F]/40"
        >
          <Link
            href="/project-detail"
            className="hover:text-[#1F3AA8] transition-colors duration-200 flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" />
            {t("projectDetail.backToProjects")}
          </Link>
          <span>/</span>
          <span className="text-[#16130F]/60">{PROJECT.name}</span>
        </motion.div>
      </div>

      {/* ── Hero header ── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Left: project info */}
          <motion.div
            className="lg:col-span-2"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-4">
              <SwapTypeBadge type={PROJECT.swapType} />
              <span className="text-[11px] font-mono text-[#16130F]/40 tracking-wide">
                {PROJECT.jurisdiction}
              </span>
              <span className="text-[11px] font-mono text-[#16130F]/40">·</span>
              <span className="text-[11px] font-mono text-[#16130F]/40">
                {PROJECT.category}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-[#16130F] tracking-tight text-balance mb-4"
            >
              {PROJECT.name}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-[15px] text-[#16130F]/70 leading-relaxed max-w-[60ch] mb-6"
            >
              {PROJECT.description}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#1F3AA8]/10 flex items-center justify-center">
                  <span className="text-[10px] font-mono font-bold text-[#1F3AA8]">
                    {PROJECT.builder.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-[#16130F]">
                    {PROJECT.builder}
                  </p>
                  <p className="text-[10px] font-mono text-[#16130F]/40">
                    {PROJECT.builderTitle}
                  </p>
                </div>
              </div>
              <span className="text-[#16130F]/20">|</span>
              <span className="text-[11px] font-mono text-[#16130F]/40">
                {t("projectDetail.listed")} {PROJECT.listedAt}
              </span>
            </motion.div>
          </motion.div>

          {/* Right: swap terms card */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="bg-white border border-[#16130F]/8 rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] h-fit"
          >
            <p className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-4">
              {t("projectDetail.swapOffer")}
            </p>
            <p className="text-[15px] font-semibold text-[#16130F] mb-1">
              {PROJECT.swapTerms}
            </p>
            <p className="text-[12px] text-[#16130F]/50 mb-5">
              {PROJECT.legalEntity} · {PROJECT.jurisdiction}
            </p>
            <div className="border-t border-[#16130F]/6 pt-4 mb-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[12px] text-[#16130F]/50">
                  {t("projectDetail.valuation")}
                </span>
                <span className="text-[13px] font-semibold text-[#16130F]">
                  {PROJECT.valuation}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[12px] text-[#16130F]/50">
                  {t("projectDetail.stage")}
                </span>
                <span className="text-[12px] font-mono text-[#16130F]/70">
                  {PROJECT.stage}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-[#16130F]/50">
                  {t("projectDetail.swaps")}
                </span>
                <span className="text-[12px] font-mono text-[#16130F]/70">
                  {PROJECT.swapHistory.length} {t("projectDetail.total")}
                </span>
              </div>
            </div>
            <Link
              href="/swap-listing"
              className="block w-full text-center text-[13px] font-medium tracking-wide px-4 py-2.5 bg-[#1F3AA8] text-white hover:bg-[#1a2f8a] transition-all duration-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2"
            >
              {t("projectDetail.proposeSwap")}
            </Link>
            <p className="mt-3 text-[10px] font-mono text-[#16130F]/30 text-center leading-relaxed">
              {t("projectDetail.legalNote")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Metrics ── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-14">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {PROJECT.metrics.map((m) => (
            <MetricCard key={m.label} label={m.label} value={m.value} />
          ))}
        </motion.div>
      </section>

      {/* ── Long description ── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <motion.div
            className="lg:col-span-2"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <h2 className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-4">
              {t("projectDetail.aboutProject")}
            </h2>
            <p className="text-[14px] text-[#16130F]/75 leading-[1.8] text-pretty">
              {PROJECT.longDescription}
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="bg-white border border-[#16130F]/8 rounded-xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)] h-fit"
          >
            <h3 className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-4">
              {t("projectDetail.legalStructure")}
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: t("projectDetail.entity"), value: PROJECT.legalEntity },
                { label: t("projectDetail.jurisdiction"), value: PROJECT.jurisdiction },
                {
                  label: t("projectDetail.swapDocs"),
                  value: t("projectDetail.swapDocsValue"),
                },
                {
                  label: t("projectDetail.escrow"),
                  value: t("projectDetail.escrowValue"),
                },
              ].map((row) => (
                <li
                  key={row.label}
                  className="flex items-start justify-between gap-4 text-[12px]"
                >
                  <span className="text-[#16130F]/40 font-mono">{row.label}</span>
                  <span className="text-[#16130F]/80 text-right">{row.value}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-4 border-t border-[#16130F]/6">
              <Link
                href="/swap-agreements"
                className="flex items-center gap-2 text-[12px] text-[#1F3AA8] hover:text-[#1a2f8a] transition-colors duration-200 font-medium"
              >
                <FileText className="w-3.5 h-3.5" />
                {t("projectDetail.viewSampleAgreements")}
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Swap Lineage ── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-16">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <GitBranch className="w-4 h-4 text-[#1F3AA8]" />
            <h2 className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40">
              {t("projectDetail.swapLineage")}
            </h2>
          </div>
          <p className="text-[13px] text-[#16130F]/50 max-w-[55ch]">
            {t("projectDetail.swapLineageDesc")}
          </p>
        </motion.div>

        <div className="bg-white border border-[#16130F]/8 rounded-2xl p-6 md:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]">
          <SwapLineage swaps={PROJECT.swapHistory} />
        </div>
      </section>

      {/* ── Swap history table ── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-16">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-4 h-4 text-[#1F3AA8]" />
            <h2 className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40">
              {t("projectDetail.swapHistory")}
            </h2>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-white border border-[#16130F]/8 rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]"
          aria-live="polite"
          aria-label={t("projectDetail.swapHistoryAriaLabel")}
        >
          {/* Table header */}
          <div className="grid grid-cols-[1fr_1fr_1.5fr_auto_auto] gap-4 px-6 py-3 border-b border-[#16130F]/6 bg-[#F5F1EA]/60">
            {[
              t("projectDetail.colPartner"),
              t("projectDetail.colType"),
              t("projectDetail.colTerms"),
              t("projectDetail.colDate"),
              t("projectDetail.colStatus"),
            ].map((col) => (
              <span
                key={col}
                className="text-[10px] font-mono tracking-widest uppercase text-[#16130F]/40"
              >
                {col}
              </span>
            ))}
          </div>

          {/* Rows */}
          {PROJECT.swapHistory.map((swap) => {
            const partner =
              swap.projectA === "Draftly" ? swap.projectB : swap.projectA;
            return (
              <motion.div
                key={swap.id}
                variants={fadeInUp}
                className="grid grid-cols-[1fr_1fr_1.5fr_auto_auto] gap-4 px-6 py-4 border-b border-[#16130F]/4 last:border-0 hover:bg-[#F5F1EA]/40 transition-colors duration-150"
              >
                <span className="text-[13px] font-medium text-[#16130F]">
                  {partner}
                </span>
                <span>
                  <SwapTypeBadge type={swap.type} />
                </span>
                <span className="text-[12px] font-mono text-[#16130F]/60">
                  {swap.terms}
                </span>
                <span className="text-[11px] font-mono text-[#16130F]/40">
                  {swap.date}
                </span>
                <span>
                  <StatusDot status={swap.status} />
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ── Related / swapped projects ── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-20">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-4 h-4 text-[#1F3AA8]" />
            <h2 className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40">
              {t("projectDetail.swappedWith")}
            </h2>
          </div>
          <p className="text-[13px] text-[#16130F]/50">
            {t("projectDetail.swappedWithDesc")}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {RELATED_PROJECTS.map((p) => (
            <RelatedCard key={p.id} project={p} />
          ))}
        </motion.div>
      </section>

      {/* ── CTA strip ── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-24">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-[#1F3AA8] rounded-2xl px-8 py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_4px_24px_-4px_rgba(31,58,168,0.35)]"
        >
          <div>
            <p className="text-[11px] font-mono tracking-widest uppercase text-white/50 mb-2">
              {t("projectDetail.ctaEyebrow")}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight text-balance">
              {t("projectDetail.ctaHeading")}
            </h2>
            <p className="mt-2 text-[14px] text-white/70 max-w-[50ch]">
              {t("projectDetail.ctaSubtext")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/swap-listing"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#1F3AA8] text-[13px] font-semibold tracking-wide rounded-lg hover:bg-white/90 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F3AA8]"
            >
              {t("projectDetail.ctaButton")}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/swap-agreements"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/30 text-white text-[13px] font-medium tracking-wide rounded-lg hover:bg-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F3AA8]"
            >
              <FileText className="w-4 h-4" />
              {t("projectDetail.ctaSecondary")}
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}