"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Filter, ArrowUpDown } from 'lucide-react';
import { BRAND } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

// ─── Types ───────────────────────────────────────────────────────────────────

type SwapType = "equity" | "cash" | "promo";
type EntityType = "delaware" | "uk";
type SortKey = "date" | "valuation-high" | "valuation-low";

interface Project {
  id: string;
  name: string;
  valuation: string;
  valuationNum: number;
  swapTerms: string;
  description: string;
  category: string;
  swapType: SwapType;
  entity: EntityType;
  listedAt: string;
  swapActive: boolean;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const ALL_PROJECTS: Project[] = [
  {
    id: "p1",
    name: "PromptLayer",
    valuation: "$280,000",
    valuationNum: 280000,
    swapTerms: "2.5% equity for 2% equity or $6k cash",
    description:
      "Prompt versioning and analytics for LLM apps. 1,400 active users, $2.1k MRR, growing 18% month-over-month.",
    category: "Dev Tools",
    swapType: "equity",
    entity: "delaware",
    listedAt: "2025-01-10",
    swapActive: true,
  },
  {
    id: "p2",
    name: "EvalKit",
    valuation: "$190,000",
    valuationNum: 190000,
    swapTerms: "1.8% equity for 2% equity or promo deal",
    description:
      "Automated LLM evaluation harness with 40+ built-in metrics. 620 GitHub stars, 180 paying teams.",
    category: "AI Infrastructure",
    swapType: "equity",
    entity: "delaware",
    listedAt: "2025-01-09",
    swapActive: false,
  },
  {
    id: "p3",
    name: "Docsmith AI",
    valuation: "$95,000",
    valuationNum: 95000,
    swapTerms: "$4,200 cash for 3-month newsletter promo",
    description:
      "AI-assisted technical documentation generator. 340 users, $890 MRR.",
    category: "Writing Tools",
    swapType: "cash",
    entity: "uk",
    listedAt: "2025-01-08",
    swapActive: false,
  },
  {
    id: "p4",
    name: "Threadweave",
    valuation: "$440,000",
    valuationNum: 440000,
    swapTerms: "1.0% equity for 1.0% equity in adjacent SaaS",
    description:
      "Async team communication layer built on structured threads. 3,200 users, $8.4k MRR.",
    category: "Productivity",
    swapType: "equity",
    entity: "delaware",
    listedAt: "2025-01-07",
    swapActive: true,
  },
  {
    id: "p5",
    name: "Clipstack",
    valuation: "$62,000",
    valuationNum: 62000,
    swapTerms: "1.0% equity for 1.0% equity or $1.5k promo",
    description:
      "Clipboard manager with AI-powered snippet tagging and search. 5,800 downloads, 210 paid licenses.",
    category: "Utilities",
    swapType: "equity",
    entity: "uk",
    listedAt: "2025-01-06",
    swapActive: false,
  },
  {
    id: "p6",
    name: "Lensly",
    valuation: "$320,000",
    valuationNum: 320000,
    swapTerms: "2.0% equity for 2.0% equity in creative tools",
    description:
      "AI photo-editing tool for product photographers. 890 paying users, \u00a33,200 MRR, growing 12% MoM.",
    category: "Creative Tools",
    swapType: "equity",
    entity: "uk",
    listedAt: "2025-01-05",
    swapActive: true,
  },
  {
    id: "p7",
    name: "Formbase",
    valuation: "$78,000",
    valuationNum: 78000,
    swapTerms: "$2,800 cash for 60-day promo slot",
    description:
      "Form builder with conditional logic and webhook routing. 520 users, $1.1k MRR.",
    category: "Dev Tools",
    swapType: "cash",
    entity: "uk",
    listedAt: "2025-01-04",
    swapActive: false,
  },
  {
    id: "p8",
    name: "Stacksync",
    valuation: "$510,000",
    valuationNum: 510000,
    swapTerms: "3.0% equity for $8,500 cash or 3% equity",
    description:
      "Two-way sync engine for SaaS data. 280 paying teams, $11.2k MRR. Profitable.",
    category: "Infrastructure",
    swapType: "equity",
    entity: "delaware",
    listedAt: "2025-01-03",
    swapActive: true,
  },
  {
    id: "p9",
    name: "Inkdrop Pro",
    valuation: "$130,000",
    valuationNum: 130000,
    swapTerms: "1.5% equity for 1.5% equity in note-taking or PKM",
    description:
      "Markdown note-taking app with end-to-end encryption. 2,100 paying users, \u00a32,800 MRR.",
    category: "Productivity",
    swapType: "equity",
    entity: "uk",
    listedAt: "2025-01-02",
    swapActive: false,
  },
  {
    id: "p10",
    name: "Cronbase",
    valuation: "$45,000",
    valuationNum: 45000,
    swapTerms: "$1,200 cash for 30-day homepage feature",
    description:
      "Cron job monitoring with Slack and email alerts. 310 users, $480 MRR.",
    category: "Dev Tools",
    swapType: "cash",
    entity: "delaware",
    listedAt: "2025-01-01",
    swapActive: false,
  },
  {
    id: "p11",
    name: "Patchwork",
    valuation: "$180,000",
    valuationNum: 180000,
    swapTerms: "Promo: 0.5% per 10K verified impressions, cap 2%",
    description:
      "Visual changelog tool for SaaS products. 740 users, $2.3k MRR. Seeking newsletter or community distribution.",
    category: "Marketing Tools",
    swapType: "promo",
    entity: "uk",
    listedAt: "2024-12-31",
    swapActive: false,
  },
  {
    id: "p12",
    name: "Replyfast",
    valuation: "$160,000",
    valuationNum: 160000,
    swapTerms: "Promo: 1% per 15K impressions, cap 3%",
    description:
      "AI email reply assistant for customer support teams. 390 paying seats, $3.1k MRR.",
    category: "AI Tools",
    swapType: "promo",
    entity: "delaware",
    listedAt: "2024-12-30",
    swapActive: false,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const SWAP_TYPE_STYLES: Record<SwapType, string> = {
  equity: "text-[#1F3AA8] bg-[#1F3AA8]/10",
  cash: "text-emerald-700 bg-emerald-50",
  promo: "text-[#7A3E1F] bg-[#7A3E1F]/10",
};

function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[month - 1]} ${day}, ${year}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`font-mono text-[12px] tracking-wide px-3 py-1 rounded-sm transition-colors duration-150 ${
        active
          ? "bg-[#1F3AA8] text-white"
          : "border border-[#16130F]/20 text-[#16130F]/60 hover:border-[#16130F]/40 hover:text-[#16130F]"
      }`}
    >
      {label}
    </button>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/project-detail`} className="block group">
      <div className="border border-[#16130F]/15 bg-white/30 p-6 rounded-sm hover:border-[#1F3AA8]/40 transition-colors cursor-pointer h-full">
        {/* Swap type badge */}
        <span
          className={`inline-block font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-sm ${
            SWAP_TYPE_STYLES[project.swapType]
          }`}
        >
          {project.swapType}
        </span>

        {/* Project name */}
        <h3 className="text-[18px] font-bold text-[#16130F] mt-3 leading-snug">
          {project.name}
        </h3>

        {/* Valuation */}
        <p className="font-mono text-[13px] text-[#16130F]/50 mt-1">
          {project.valuation}
        </p>

        {/* Description */}
        <p className="text-[13px] text-[#16130F]/60 leading-relaxed mt-3 line-clamp-3">
          {project.description}
        </p>

        {/* Swap terms */}
        <div className="font-mono text-[12px] text-[#16130F]/70 bg-[#16130F]/5 px-3 py-2 rounded-sm mt-4">
          {project.swapTerms}
        </div>

        {/* Entity + date */}
        <div className="flex justify-between items-center font-mono text-[11px] text-[#16130F]/40 mt-4">
          <span>
            {project.entity === "delaware" ? "Delaware LLC" : "UK Ltd"}
          </span>
          <span>Listed {formatDate(project.listedAt)}</span>
        </div>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [activeType, setActiveType] = useState<"all" | SwapType>("all");
  const [activeEntity, setActiveEntity] = useState<"all" | EntityType>("all");
  const [sortBy, setSortBy] = useState<SortKey>("date");

  const filteredProjects = useMemo(() => {
    let result = [...ALL_PROJECTS];

    if (activeType !== "all") {
      result = result.filter((p) => p.swapType === activeType);
    }
    if (activeEntity !== "all") {
      result = result.filter((p) => p.entity === activeEntity);
    }

    if (sortBy === "date") {
      result.sort((a, b) => b.listedAt.localeCompare(a.listedAt));
    } else if (sortBy === "valuation-high") {
      result.sort((a, b) => b.valuationNum - a.valuationNum);
    } else if (sortBy === "valuation-low") {
      result.sort((a, b) => a.valuationNum - b.valuationNum);
    }

    return result;
  }, [activeType, activeEntity, sortBy]);

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
            className="font-mono text-[11px] tracking-widest uppercase text-[#1F3AA8]/70 mb-4"
          >
            All projects
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold tracking-tight text-[#16130F] leading-tight"
          >
            Projects listed for swap.
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-[16px] text-[#16130F]/60 leading-relaxed max-w-[66ch] mt-4"
          >
            47 projects currently listed. Each has a working URL, real users,
            and demonstrable usage. Browse by swap type, valuation, or entity.
            No ranking — sorted by date listed by default.
          </motion.p>
        </motion.div>
      </section>

      {/* ── 2. FILTER / SORT BAR ── */}
      <div className="sticky top-14 z-40 bg-[#F5F1EA] border-b border-[#16130F]/10 py-3">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="flex flex-wrap items-center gap-3">
            {/* Swap type filters */}
            <div className="flex items-center gap-1.5">
              <Filter className="w-3 h-3 text-[#16130F]/30" />
              <span className="font-mono text-[11px] tracking-widest uppercase text-[#16130F]/30 mr-1">
                Type
              </span>
              {(["all", "equity", "cash", "promo"] as const).map((t) => (
                <FilterPill
                  key={t}
                  label={t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
                  active={activeType === t}
                  onClick={() => setActiveType(t)}
                />
              ))}
            </div>

            <div className="w-px h-4 bg-[#16130F]/15 hidden sm:block" />

            {/* Entity filters */}
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[11px] tracking-widest uppercase text-[#16130F]/30 mr-1">
                Entity
              </span>
              {(["all", "delaware", "uk"] as const).map((e) => (
                <FilterPill
                  key={e}
                  label={
                    e === "all"
                      ? "All"
                      : e === "delaware"
                      ? "Delaware"
                      : "UK Ltd"
                  }
                  active={activeEntity === e}
                  onClick={() =>
                    setActiveEntity(e as "all" | EntityType)
                  }
                />
              ))}
            </div>

            <div className="w-px h-4 bg-[#16130F]/15 hidden sm:block" />

            {/* Sort */}
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3 h-3 text-[#16130F]/30" />
              <span className="font-mono text-[11px] tracking-widest uppercase text-[#16130F]/30 mr-1">
                Sort
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="font-mono text-[12px] tracking-wide text-[#16130F]/60 bg-transparent border border-[#16130F]/20 rounded-sm px-2 py-1 focus:outline-none focus:border-[#1F3AA8]/40 cursor-pointer"
              >
                <option value="date">Date listed</option>
                <option value="valuation-high">Valuation high–low</option>
                <option value="valuation-low">Valuation low–high</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. PROJECT GRID ── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 pb-24">
        {filteredProjects.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-mono text-[13px] text-[#16130F]/40">
              No projects match the current filters.
            </p>
            <button
              onClick={() => {
                setActiveType("all");
                setActiveEntity("all");
              }}
              className="mt-4 font-mono text-[12px] text-[#1F3AA8] underline underline-offset-2"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                className={project.swapActive ? "md:col-span-2" : "md:col-span-1"}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Footer row */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <p className="font-mono text-[12px] text-[#16130F]/40">
            Showing {filteredProjects.length} of 47 listed projects.
          </p>
          <button
            className="font-mono text-[12px] tracking-wide px-6 py-2.5 border border-[#16130F]/20 text-[#16130F]/60 hover:border-[#1F3AA8]/40 hover:text-[#1F3AA8] rounded-sm transition-colors duration-150"
          >
            Load more
          </button>
        </div>
      </section>
    </div>
  );
}
