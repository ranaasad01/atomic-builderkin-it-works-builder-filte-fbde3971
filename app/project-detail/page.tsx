"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, FileText, Users, Calendar, DollarSign, GitBranch, CheckCircle, ExternalLink } from 'lucide-react';
import { useTranslations } from "next-intl";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const project = {
  id: "neuraldraft",
  name: "NeuralDraft",
  slug: "neuraldraft",
  valuation: "$42,000",
  swapTerms: "4% equity for 3% equity or $1,680 cash equivalent",
  description:
    "NeuralDraft is an AI writing assistant built for independent researchers and technical bloggers. It combines a fine-tuned language model with a structured outlining engine, letting writers move from rough notes to polished drafts in under 20 minutes. The product has 340 active monthly users, a 68% week-2 retention rate, and $890 MRR from a $9/month subscription. The Delaware LLC was formed in March 2024. The builder is seeking a swap partner with distribution reach in the developer-tools or academic-writing space.",
  builder: "Theo Nakamura",
  builderHandle: "@theonakamura",
  entity: "Delaware LLC",
  formed: "March 2024",
  mrr: "$890",
  users: "340",
  retention: "68%",
  category: "AI Writing",
  stage: "Early Revenue",
  image: "https://cohorte.co/blog/img/67bc256c9c441478e260abd7_PromptLayer.webp",
  swapType: "equity" as const,
  listedAt: "2024-11-14",
};

const swapLineage = [
  {
    id: "swap-001",
    partner: {
      id: "promptlayer",
      name: "PromptLayer",
      valuation: "$38,000",
      description:
        "A prompt versioning and analytics layer for teams shipping LLM-powered products. Tracks prompt performance across model versions.",
      builder: "Sasha Reyes",
      category: "Dev Tools",
      stage: "Early Revenue",
      swapType: "equity" as const,
      image: "https://docubase.mit.edu/wp-content/themes/docubase21/images/share-fb.png",
    },
    terms: "3.5% equity ↔ 3.5% equity",
    date: "2024-09-02",
    status: "signed",
    legalRef: "BK-2024-0041",
  },
  {
    id: "swap-002",
    partner: {
      id: "docubase",
      name: "DocuBase",
      valuation: "$29,500",
      description:
        "Structured knowledge-base builder that turns Notion exports and Markdown repos into searchable, embeddable documentation sites.",
      builder: "Priya Mehta",
      category: "Productivity",
      stage: "Beta",
      swapType: "promo" as const,
      image: "https://www.codester.com/static/uploads/items/000/049/49119/preview/001.jpg",
    },
    terms: "2% equity ↔ newsletter feature (12k subs)",
    date: "2024-10-19",
    status: "signed",
    legalRef: "BK-2024-0067",
  },
];

const swapTypeBadge: Record<string, { label: string; color: string }> = {
  equity: { label: "Equity", color: "bg-[#1F3AA8]/10 text-[#1F3AA8]" },
  cash: { label: "Cash", color: "bg-emerald-50 text-emerald-700" },
  promo: { label: "Promo", color: "bg-amber-50 text-amber-700" },
};

// ─── Animated SVG lineage connector ──────────────────────────────────────────

const lineVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};

const dotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut", delay: 1.1 },
  },
};

function LineageConnector({ reduced }: { reduced: boolean }) {
  if (reduced) {
    return (
      <div className="flex items-center justify-center my-2" aria-hidden="true">
        <div className="h-px w-16 bg-[#7BA99A]/60" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center my-1" aria-hidden="true">
      <svg width="4" height="48" viewBox="0 0 4 48" fill="none" overflow="visible">
        <motion.line
          x1="2" y1="0" x2="2" y2="48"
          stroke="#7BA99A"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        <motion.circle
          cx="2" cy="48" r="3"
          fill="#7BA99A"
          variants={dotVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
      </svg>
    </div>
  );
}

// ─── Mini partner card ────────────────────────────────────────────────────────

interface PartnerCardProps {
  partner: (typeof swapLineage)[0]["partner"];
  terms: string;
  date: string;
  legalRef: string;
  index: number;
}

function PartnerCard({ partner, terms, date, legalRef, index }: PartnerCardProps) {
  const badge = swapTypeBadge[partner.swapType] ?? swapTypeBadge.equity;
  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      whileHover={{ y: -2, boxShadow: "0 8px 24px -8px rgba(22,19,15,0.12)" }}
      transition={{ duration: 0.2 }}
      className="bg-white border border-[#16130F]/8 rounded-xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)]"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-[15px] font-semibold text-[#16130F] tracking-tight">{partner.name}</h3>
          <p className="text-[12px] text-[#16130F]/50 mt-0.5">{partner.builder}</p>
        </div>
        <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${badge.color}`}>
          {badge.label}
        </span>
      </div>
      <p className="text-[13px] text-[#16130F]/65 leading-relaxed mb-4 line-clamp-2">
        {partner.description}
      </p>
      <div className="border-t border-[#16130F]/6 pt-3 space-y-1.5">
        <div className="flex items-center gap-2">
          <GitBranch size={12} className="text-[#7BA99A] shrink-0" />
          <span className="text-[12px] font-mono text-[#16130F]/70">{terms}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={12} className="text-[#16130F]/40 shrink-0" />
          <span className="text-[12px] text-[#16130F]/50">{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <FileText size={12} className="text-[#16130F]/40 shrink-0" />
          <span className="text-[12px] font-mono text-[#16130F]/40">{legalRef}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Stat pill ────────────────────────────────────────────────────────────────

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 px-4 py-3 bg-white border border-[#16130F]/8 rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <span className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40">{label}</span>
      <span className="text-[18px] font-semibold text-[#16130F] tracking-tight">{value}</span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectDetailPage() {
  const t = useTranslations();
  const prefersReduced = useReducedMotion() ?? false;

  const badge = swapTypeBadge[project.swapType] ?? swapTypeBadge.equity;

  return (
    <main className="bg-[#F5F1EA] min-h-screen">
      {/* ── Breadcrumb ── */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-8 pb-0">
        <nav aria-label={t("projectDetail.breadcrumbAriaLabel")} className="flex items-center gap-2 text-[12px] font-mono text-[#16130F]/40">
          <Link href="/" className="hover:text-[#1F3AA8] transition-colors duration-200">{t("projectDetail.breadcrumbHome")}</Link>
          <span>/</span>
          <Link href="/project-detail" className="hover:text-[#1F3AA8] transition-colors duration-200">{t("projectDetail.breadcrumbProjects")}</Link>
          <span>/</span>
          <span className="text-[#16130F]/70">{project.name}</span>
        </nav>
      </div>

      {/* ── Hero / Project header ── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-10 pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 items-start"
        >
          {/* Left: metadata */}
          <div>
            <motion.div variants={fadeIn} className="flex items-center gap-3 mb-4">
              <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full ${badge.color}`}>
                {badge.label} {t("projectDetail.swapBadgeSuffix")}
              </span>
              <span className="text-[11px] font-mono text-[#16130F]/40 tracking-wide uppercase">{project.stage}</span>
              <span className="text-[11px] font-mono text-[#16130F]/40">·</span>
              <span className="text-[11px] font-mono text-[#16130F]/40">{project.category}</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-[40px] md:text-[52px] font-bold text-[#16130F] tracking-tight leading-[1.05] text-balance mb-4"
            >
              {project.name}
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-[15px] text-[#16130F]/65 leading-relaxed max-w-[60ch] mb-8">
              {project.description}
            </motion.p>

            {/* Stats row */}
            <motion.div variants={staggerContainer} className="flex flex-wrap gap-3 mb-8">
              {[
                { label: t("projectDetail.statValuation"), value: project.valuation },
                { label: t("projectDetail.statMRR"), value: project.mrr },
                { label: t("projectDetail.statUsers"), value: project.users },
                { label: t("projectDetail.statRetention"), value: project.retention },
              ].map((s) => (
                <motion.div key={s.label} variants={scaleIn}>
                  <StatPill label={s.label} value={s.value} />
                </motion.div>
              ))}
            </motion.div>

            {/* Metadata grid */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-white border border-[#16130F]/8 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.04)] mb-8"
            >
              <div className="flex items-start gap-3">
                <Users size={15} className="text-[#7BA99A] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-0.5">{t("projectDetail.metaBuilder")}</p>
                  <p className="text-[13px] text-[#16130F]">{project.builder}</p>
                  <p className="text-[12px] font-mono text-[#16130F]/40">{project.builderHandle}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield size={15} className="text-[#7BA99A] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-0.5">{t("projectDetail.metaEntity")}</p>
                  <p className="text-[13px] text-[#16130F]">{project.entity}</p>
                  <p className="text-[12px] font-mono text-[#16130F]/40">{t("projectDetail.metaFormed")} {project.formed}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign size={15} className="text-[#7BA99A] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-0.5">{t("projectDetail.metaSwapTerms")}</p>
                  <p className="text-[13px] text-[#16130F] leading-snug">{project.swapTerms}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar size={15} className="text-[#7BA99A] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-0.5">{t("projectDetail.metaListed")}</p>
                  <p className="text-[13px] text-[#16130F]">{project.listedAt}</p>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeInUp}>
              <Link
                href="/swap-listing"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1F3AA8] text-[#F5F1EA] text-[13px] font-medium tracking-wide rounded-lg hover:bg-[#1a3190] transition-all duration-200 shadow-[0_2px_8px_rgba(31,58,168,0.25)] hover:shadow-[0_4px_16px_rgba(31,58,168,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2"
              >
                {t("projectDetail.ctaPropose")}
                <ArrowRight size={14} />
              </Link>
              <p className="mt-3 text-[12px] text-[#16130F]/40 font-mono">{t("projectDetail.ctaSubtext")}</p>
            </motion.div>
          </div>

          {/* Right: project image */}
          <motion.div variants={scaleIn} className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#16130F]/8 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.14)]">
              <img
                src={project.image}
                alt={t("projectDetail.imageAlt")}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#1F3AA8]/5 to-transparent pointer-events-none" />
            </div>
            <div className="absolute -bottom-3 -right-3 bg-white border border-[#16130F]/8 rounded-xl px-4 py-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-2">
                <CheckCircle size={13} className="text-[#7BA99A]" />
                <span className="text-[12px] font-mono text-[#16130F]/70">{t("projectDetail.verifiedBadge")}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Swap Lineage ── */}
      <section
        className="max-w-[1200px] mx-auto px-6 md:px-10 pb-20"
        aria-labelledby="lineage-heading"
      >
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <GitBranch size={16} className="text-[#7BA99A]" />
            <h2
              id="lineage-heading"
              className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/50"
            >
              {t("projectDetail.lineageHeading")}
            </h2>
          </div>
          <p className="text-[13px] text-[#16130F]/50 leading-relaxed max-w-[55ch]">
            {t("projectDetail.lineageSubtext")}
          </p>
        </motion.div>

        {/* ARIA live region for lineage updates */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          id="lineage-live"
        >
          {t("projectDetail.lineageLiveAnnouncement", { count: swapLineage.length, name: project.name })}
        </div>

        <div className="flex flex-col items-center max-w-[420px]">
          {/* Current project node */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full bg-[#1F3AA8]/5 border-2 border-[#1F3AA8]/20 rounded-xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(31,58,168,0.12)]"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[15px] font-semibold text-[#16130F]">{project.name}</h3>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#1F3AA8]/10 text-[#1F3AA8]">
                {t("projectDetail.lineageCurrentLabel")}
              </span>
            </div>
            <p className="text-[12px] font-mono text-[#16130F]/50">{project.valuation} · {project.entity}</p>
            <p className="text-[12px] text-[#16130F]/50 mt-1">{project.builder}</p>
          </motion.div>

          {/* Lineage items */}
          {swapLineage.map((swap, i) => (
            <div key={swap.id} className="w-full flex flex-col items-center">
              <LineageConnector reduced={prefersReduced} />

              {/* Swap label */}
              <motion.div
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-center gap-2 mb-1 px-3 py-1 bg-white border border-[#7BA99A]/30 rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#7BA99A]" />
                <span className="text-[11px] font-mono text-[#16130F]/60">{swap.terms}</span>
                <span className="text-[11px] font-mono text-[#16130F]/35">· {swap.date}</span>
              </motion.div>

              <LineageConnector reduced={prefersReduced} />

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="w-full"
              >
                <PartnerCard
                  partner={swap.partner}
                  terms={swap.terms}
                  date={swap.date}
                  legalRef={swap.legalRef}
                  index={i}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What this swap means ── */}
      <section className="bg-white border-y border-[#16130F]/8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[1200px] mx-auto px-6 md:px-10 py-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-8"
          >
            {t("projectDetail.swapMeansHeading")}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Shield size={18} className="text-[#7BA99A]" />,
                title: t("projectDetail.swapMeans1Title"),
                body: t("projectDetail.swapMeans1Body"),
              },
              {
                icon: <FileText size={18} className="text-[#7BA99A]" />,
                title: t("projectDetail.swapMeans2Title"),
                body: t("projectDetail.swapMeans2Body"),
              },
              {
                icon: <ExternalLink size={18} className="text-[#7BA99A]" />,
                title: t("projectDetail.swapMeans3Title"),
                body: t("projectDetail.swapMeans3Body"),
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex flex-col gap-3 p-5 border border-[#16130F]/8 rounded-xl bg-[#F5F1EA]/60"
              >
                <div className="w-9 h-9 rounded-lg bg-white border border-[#16130F]/8 flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                  {item.icon}
                </div>
                <h3 className="text-[14px] font-semibold text-[#16130F] tracking-tight">{item.title}</h3>
                <p className="text-[13px] text-[#16130F]/60 leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Propose a swap CTA ── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-20">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative overflow-hidden rounded-2xl bg-[#1F3AA8] px-8 md:px-14 py-12 shadow-[0_8px_32px_-8px_rgba(31,58,168,0.4)]"
        >
          {/* Background texture */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-[11px] font-mono tracking-widest uppercase text-white/50 mb-3">{t("projectDetail.ctaSectionEyebrow")}</p>
              <h2 className="text-[28px] md:text-[34px] font-bold text-white tracking-tight leading-tight text-balance mb-3">
                {t("projectDetail.ctaSectionTitle")}
              </h2>
              <p className="text-[14px] text-white/65 leading-relaxed max-w-[48ch]">
                {t("projectDetail.ctaSectionBody")}
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Link
                href="/swap-listing"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1F3AA8] text-[13px] font-semibold tracking-wide rounded-lg hover:bg-[#F5F1EA] transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F3AA8]"
              >
                {t("projectDetail.ctaSectionButton")}
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/swap-agreements"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white text-[13px] font-medium tracking-wide rounded-lg hover:bg-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F3AA8]"
              >
                {t("projectDetail.ctaSectionSecondary")}
                <FileText size={14} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}