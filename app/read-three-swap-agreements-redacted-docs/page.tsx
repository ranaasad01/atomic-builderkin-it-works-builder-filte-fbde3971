"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ChevronDown, ChevronRight, Shield, Eye, EyeOff, Download, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { BRAND } from "@/lib/data";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

const agreements = [
  {
    id: "AGR-2024-001",
    title: "Equity Swap Agreement",
    subtitle: "2.5% equity for 2.5% equity",
    parties: {
      partyA: "████████ Labs",
      partyB: "████████ AI",
    },
    date: "2024-11-14",
    jurisdiction: "Delaware LLC",
    type: "equity",
    status: "Signed",
    summary:
      "A bilateral equity exchange between two early-stage AI tooling companies. Each party receives a 2.5% stake in the other's Delaware LLC, with standard drag-along and tag-along provisions. Vesting is tied to a 24-month cliff with monthly vesting thereafter.",
    sections: [
      {
        id: "recitals",
        heading: "RECITALS",
        redacted: false,
        content: `WHEREAS, Party A (\"████████ Labs, LLC\") is a Delaware limited liability company engaged in the development of AI-assisted developer tooling;

WHEREAS, Party B (\"████████ AI, LLC\") is a Delaware limited liability company engaged in the development of natural language processing infrastructure;

WHEREAS, the parties desire to enter into a mutual equity exchange arrangement on the terms and conditions set forth herein;

NOW, THEREFORE, in consideration of the mutual covenants and agreements hereinafter set forth and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the parties agree as follows:`,
      },
      {
        id: "definitions",
        heading: "1. DEFINITIONS",
        redacted: false,
        content: `1.1 "Equity Interest" means a membership interest in a Delaware LLC representing an ownership percentage as set forth in this Agreement.

1.2 "Swap Percentage" means 2.5% of the fully diluted membership interests of each party's respective LLC, as calculated on the Effective Date.

1.3 "Vesting Schedule" means the schedule pursuant to which the Equity Interest vests, as described in Section 4 of this Agreement.

1.4 "Cliff Period" means the initial ██-month period during which no portion of the Equity Interest shall vest.

1.5 "Drag-Along Rights" means the rights described in Section 7.2 of this Agreement.

1.6 "Tag-Along Rights" means the rights described in Section 7.3 of this Agreement.

1.7 "Effective Date" means ████████ ██, 2024, the date on which both parties have executed this Agreement.`,
      },
      {
        id: "exchange",
        heading: "2. EQUITY EXCHANGE",
        redacted: false,
        content: `2.1 Exchange of Interests. Subject to the terms and conditions of this Agreement, on the Effective Date:

(a) Party A hereby grants, assigns, and transfers to Party B a ██% membership interest in Party A (the "Party A Interest"); and

(b) Party B hereby grants, assigns, and transfers to Party A a ██% membership interest in Party B (the "Party B Interest").

2.2 No Cash Consideration. The parties acknowledge that no cash consideration is being exchanged in connection with this Agreement. The sole consideration for each party's grant of an Equity Interest is the other party's reciprocal grant of an Equity Interest.

2.3 Representations as to Capitalization. Each party represents and warrants that, as of the Effective Date, the Swap Percentage accurately reflects ██% of such party's fully diluted membership interests, taking into account all outstanding options, warrants, convertible instruments, and other rights to acquire membership interests.`,
      },
      {
        id: "valuation",
        heading: "3. VALUATION AND ACKNOWLEDGMENT",
        redacted: true,
        redactedNote:
          "Valuation figures and financial projections are redacted in this sample.",
        content: `3.1 Acknowledged Valuations. The parties acknowledge the following pre-money valuations for purposes of this Agreement only, which shall not be binding for any other purpose:

(a) Party A pre-money valuation: $████████

(b) Party B pre-money valuation: $████████

3.2 No Warranty of Value. Neither party makes any representation or warranty as to the accuracy of the valuations set forth in Section 3.1. These valuations are provided solely for reference and do not constitute a guarantee of future value.

3.3 Independent Valuation. Each party acknowledges that it has had the opportunity to obtain independent legal and financial advice regarding the terms of this Agreement and the valuations set forth herein, and has either obtained such advice or knowingly waived the right to do so.`,
      },
      {
        id: "vesting",
        heading: "4. VESTING SCHEDULE",
        redacted: false,
        content: `4.1 Vesting. The Equity Interests granted pursuant to Section 2 shall vest as follows:

(a) Cliff. No portion of either party's Equity Interest shall vest during the initial 24-month period following the Effective Date (the "Cliff Period").

(b) Monthly Vesting. Following the Cliff Period, the Equity Interests shall vest in equal monthly installments over the subsequent 12 months, such that the Equity Interests shall be fully vested 36 months after the Effective Date.

4.2 Acceleration. In the event of a Change of Control (as defined in Section 8.1) of either party, all unvested Equity Interests held by the other party shall immediately vest in full.

4.3 Forfeiture. If either party ceases operations or is dissolved prior to the end of the Cliff Period, the unvested Equity Interest held by the other party shall be forfeited and returned to the issuing party.`,
      },
      {
        id: "governance",
        heading: "5. GOVERNANCE RIGHTS",
        redacted: false,
        content: `5.1 Information Rights. Each party, as a holder of an Equity Interest in the other party, shall be entitled to receive:

(a) Annual unaudited financial statements within 90 days of each fiscal year end;

(b) Quarterly management accounts within 45 days of each quarter end;

(c) Prompt notice of any material adverse change in the business, operations, or financial condition of the issuing party.

5.2 No Board Representation. The Equity Interests granted hereunder do not carry any right to appoint a director, manager, or observer to the board or management committee of either party.

5.3 Voting Rights. The Equity Interests shall carry voting rights only with respect to matters that would materially and adversely affect the rights of the Equity Interest holders as a class, including any amendment to this Agreement.`,
      },
      {
        id: "transfer",
        heading: "6. TRANSFER RESTRICTIONS",
        redacted: false,
        content: `6.1 Lock-Up Period. Neither party may sell, transfer, assign, pledge, hypothecate, or otherwise dispose of any portion of the Equity Interest received hereunder for a period of ██ months following the Effective Date (the "Lock-Up Period"), without the prior written consent of the issuing party.

6.2 Right of First Refusal. Following the Lock-Up Period, if either party (the "Selling Party") desires to transfer any portion of its Equity Interest to a third party, the issuing party shall have a right of first refusal to purchase such Equity Interest at the same price and on the same terms as offered to the third party.

6.3 Permitted Transfers. Notwithstanding the foregoing, either party may transfer its Equity Interest to an affiliate or to a successor entity in connection with a Change of Control, provided that the transferee agrees in writing to be bound by the terms of this Agreement.`,
      },
      {
        id: "signatures",
        heading: "SIGNATURES",
        redacted: true,
        redactedNote: "Signatory names, titles, and dates are redacted.",
        content: `IN WITNESS WHEREOF, the parties have executed this Equity Swap Agreement as of the date first written above.

PARTY A: ████████ Labs, LLC

By: ████████████████████
Name: ████████████████
Title: ████████████████
Date: ████████ ██, 2024

PARTY B: ████████ AI, LLC

By: ████████████████████
Name: ████████████████
Title: ████████████████
Date: ████████ ██, 2024

Witnessed by builderkin platform. Agreement hash: ████████████████████████████████`,
      },
    ],
  },
  {
    id: "AGR-2024-002",
    title: "Cash-for-Equity Swap Agreement",
    subtitle: "$8,000 cash for 1.8% equity stake",
    parties: {
      partyA: "████████ Studio",
      partyB: "████████ Protocol",
    },
    date: "2024-12-03",
    jurisdiction: "UK Ltd",
    type: "cash",
    status: "Signed",
    summary:
      "A cash investment structured as a swap, where Party A provides $8,000 in exchange for a 1.8% equity stake in Party B's UK private limited company. The agreement includes standard anti-dilution provisions and a 12-month vesting cliff.",
    sections: [
      {
        id: "recitals",
        heading: "RECITALS",
        redacted: false,
        content: `WHEREAS, Party A (\"████████ Studio Ltd\") is a private limited company incorporated in England and Wales, engaged in the development of ████████ software tools;

WHEREAS, Party B (\"████████ Protocol Ltd\") is a private limited company incorporated in England and Wales, engaged in the development of ████████ infrastructure;

WHEREAS, Party A desires to invest cash consideration in exchange for an equity stake in Party B, and Party B desires to issue such equity stake on the terms set forth herein;

NOW, THEREFORE, in consideration of the mutual covenants and agreements hereinafter set forth, the parties agree as follows:`,
      },
      {
        id: "investment",
        heading: "1. CASH INVESTMENT",
        redacted: false,
        content: `1.1 Investment Amount. Party A agrees to invest the sum of $████ (the "Investment Amount") in Party B, payable in a single lump sum within 5 business days of the Effective Date.

1.2 Payment Method. The Investment Amount shall be paid by bank transfer to the account designated by Party B in writing prior to the Effective Date.

1.3 Equity Consideration. In consideration for the Investment Amount, Party B agrees to issue to Party A ordinary shares representing ██% of Party B's fully diluted share capital as of the Effective Date (the "Issued Shares").

1.4 Share Certificate. Party B shall issue a share certificate to Party A within 10 business days of receipt of the Investment Amount, evidencing Party A's ownership of the Issued Shares.`,
      },
      {
        id: "valuation",
        heading: "2. VALUATION",
        redacted: true,
        redactedNote:
          "Pre-money valuation and implied share price are redacted.",
        content: `2.1 Pre-Money Valuation. For the purposes of this Agreement, the parties agree that Party B's pre-money valuation is $████████ (the "Agreed Valuation").

2.2 Implied Share Price. Based on the Agreed Valuation and Party B's current issued share capital of ████████ ordinary shares, the implied price per share is $████████.

2.3 No Warranty. Party B makes no representation or warranty as to the accuracy of the Agreed Valuation. The Agreed Valuation is based on Party B's own assessment of its business and prospects and has not been independently verified.`,
      },
      {
        id: "antidilution",
        heading: "3. ANTI-DILUTION PROVISIONS",
        redacted: false,
        content: `3.1 Weighted Average Anti-Dilution. If Party B issues additional shares at a price per share lower than the implied price per share set forth in Section 2.2 (a "Down Round"), Party A's ownership percentage shall be adjusted using a broad-based weighted average anti-dilution formula.

3.2 Excluded Issuances. The anti-dilution provisions of this Section 3 shall not apply to shares issued:

(a) pursuant to any employee share option plan approved by Party B's board of directors;

(b) in connection with any acquisition, merger, or strategic transaction approved by Party B's board of directors;

(c) pursuant to any convertible instrument outstanding as of the Effective Date.

3.3 Notice of Down Round. Party B shall provide Party A with written notice of any proposed Down Round at least 10 business days prior to the closing of such issuance.`,
      },
      {
        id: "representations",
        heading: "4. REPRESENTATIONS AND WARRANTIES",
        redacted: false,
        content: `4.1 Party B Representations. Party B represents and warrants to Party A as of the Effective Date that:

(a) Party B is duly incorporated and validly existing under the laws of England and Wales;

(b) Party B has full power and authority to enter into this Agreement and to issue the Issued Shares;

(c) The Issued Shares, when issued, will be validly issued, fully paid, and non-assessable;

(d) There are no pending or threatened legal proceedings that would materially affect Party B's ability to perform its obligations hereunder.

4.2 Party A Representations. Party A represents and warrants to Party B as of the Effective Date that:

(a) Party A is acquiring the Issued Shares for its own account and not with a view to distribution;

(b) Party A has sufficient knowledge and experience in financial and business matters to evaluate the merits and risks of this investment;

(c) Party A understands that the Issued Shares are not registered under any securities laws and are subject to transfer restrictions.`,
      },
      {
        id: "reporting",
        heading: "5. REPORTING OBLIGATIONS",
        redacted: false,
        content: `5.1 Financial Reporting. Party B shall provide Party A with the following financial information:

(a) Monthly management accounts within 30 days of each month end, for the first 12 months following the Effective Date;

(b) Quarterly management accounts within 45 days of each quarter end, thereafter;

(c) Annual statutory accounts within 6 months of each financial year end.

5.2 Operational Updates. Party B shall provide Party A with a brief written operational update on a quarterly basis, covering key metrics, milestones achieved, and any material developments.

5.3 Access. Party A shall have the right, upon reasonable notice, to inspect Party B's books and records and to meet with Party B's management to discuss Party B's business and financial condition.`,
      },
      {
        id: "signatures",
        heading: "SIGNATURES",
        redacted: true,
        redactedNote: "Signatory names, titles, and dates are redacted.",
        content: `IN WITNESS WHEREOF, the parties have executed this Cash-for-Equity Swap Agreement as of the date first written above.

PARTY A: ████████ Studio Ltd

By: ████████████████████
Name: ████████████████
Title: ████████████████
Date: ████████ ██, 2024

PARTY B: ████████ Protocol Ltd

By: ████████████████████
Name: ████████████████
Title: ████████████████
Date: ████████ ██, 2024

Witnessed by builderkin platform. Agreement hash: ████████████████████████████████`,
      },
    ],
  },
  {
    id: "AGR-2024-003",
    title: "Promotional Swap Agreement",
    subtitle: "6-month cross-promotion for 1% equity",
    parties: {
      partyA: "████████ Growth",
      partyB: "████████ Tools",
    },
    date: "2025-01-08",
    jurisdiction: "Delaware LLC",
    type: "promo",
    status: "Signed",
    summary:
      "A promotional services exchange where Party A provides six months of dedicated marketing and distribution support in exchange for a 1% equity stake in Party B. Deliverables are defined with measurable KPIs and a clawback mechanism if targets are missed.",
    sections: [
      {
        id: "recitals",
        heading: "RECITALS",
        redacted: false,
        content: `WHEREAS, Party A (\"████████ Growth, LLC\") is a Delaware limited liability company with expertise in growth marketing and distribution for early-stage software products;

WHEREAS, Party B (\"████████ Tools, LLC\") is a Delaware limited liability company engaged in the development of ████████ productivity software;

WHEREAS, Party A desires to provide promotional services to Party B in exchange for an equity stake in Party B, and Party B desires to receive such services on the terms set forth herein;

NOW, THEREFORE, in consideration of the mutual covenants and agreements hereinafter set forth, the parties agree as follows:`,
      },
      {
        id: "services",
        heading: "1. PROMOTIONAL SERVICES",
        redacted: false,
        content: `1.1 Scope of Services. During the Service Period (as defined in Section 1.2), Party A shall provide the following promotional services to Party B (the "Services"):

(a) Featured placement in Party A's weekly newsletter (minimum ████████ subscribers) for a period of ██ consecutive weeks;

(b) Dedicated social media promotion across Party A's channels (minimum ████████ combined followers) including at least ██ posts per month;

(c) Co-branded content creation, including a minimum of ██ long-form articles or case studies featuring Party B's product;

(d) Introduction to Party A's network of ████████ potential enterprise customers;

(e) Inclusion in Party A's annual "Tools We Use" report, distributed to ████████ subscribers.

1.2 Service Period. The Services shall be provided for a period of 6 months commencing on the Effective Date (the "Service Period").`,
      },
      {
        id: "kpis",
        heading: "2. KEY PERFORMANCE INDICATORS",
        redacted: false,
        content: `2.1 Minimum KPIs. Party A commits to achieving the following minimum key performance indicators during the Service Period:

(a) Referral Traffic: A minimum of ████████ unique visitors referred to Party B's website from Party A's channels;

(b) Trial Sign-ups: A minimum of ████████ trial sign-ups attributable to Party A's promotional activities;

(c) Newsletter Click-Through Rate: A minimum average click-through rate of ██% on Party B's featured placements in Party A's newsletter.

2.2 Measurement. KPIs shall be measured using mutually agreed tracking tools, with Party B providing Party A with access to relevant analytics dashboards within 5 business days of the Effective Date.

2.3 Reporting. Party A shall provide Party B with a monthly KPI report within 10 business days of each month end during the Service Period.`,
      },
      {
        id: "equity",
        heading: "3. EQUITY CONSIDERATION",
        redacted: false,
        content: `3.1 Equity Grant. In consideration for the Services, Party B agrees to grant Party A a ██% membership interest in Party B (the "Granted Interest"), subject to the vesting and clawback provisions set forth in this Section 3.

3.2 Vesting. The Granted Interest shall vest as follows:

(a) ██% of the Granted Interest shall vest upon completion of the first 3 months of the Service Period, provided that Party A has met the KPIs set forth in Section 2.1 for such period on a pro-rata basis;

(b) The remaining ██% of the Granted Interest shall vest upon completion of the full Service Period, provided that Party A has met the KPIs set forth in Section 2.1 for the full Service Period.

3.3 Clawback. If Party A fails to meet the minimum KPIs set forth in Section 2.1 for any measurement period, Party B shall have the right to claw back a proportionate portion of the vested Granted Interest, calculated as follows: Clawback Percentage = (1 - Actual KPI / Target KPI) × Vested Percentage.`,
      },
      {
        id: "ip",
        heading: "4. INTELLECTUAL PROPERTY",
        redacted: false,
        content: `4.1 Party B IP. All intellectual property rights in Party B's products, services, and materials remain the exclusive property of Party B. Party A is granted a limited, non-exclusive, non-transferable license to use Party B's trademarks and marketing materials solely for the purpose of providing the Services during the Service Period.

4.2 Co-Created Content. Any content co-created by the parties pursuant to Section 1.1(c) shall be jointly owned by the parties, with each party having the right to use such content without accounting to the other party.

4.3 Party A IP. All intellectual property rights in Party A's channels, subscriber lists, and distribution networks remain the exclusive property of Party A. Nothing in this Agreement shall be construed as granting Party B any rights in Party A's intellectual property.`,
      },
      {
        id: "termination",
        heading: "5. TERMINATION",
        redacted: false,
        content: `5.1 Termination for Cause. Either party may terminate this Agreement immediately upon written notice if the other party:

(a) materially breaches this Agreement and fails to cure such breach within 15 business days of receiving written notice thereof;

(b) becomes insolvent, makes an assignment for the benefit of creditors, or has a receiver appointed;

(c) ceases to carry on business.

5.2 Effect of Termination. Upon termination of this Agreement:

(a) Party A's obligation to provide Services shall cease immediately;

(b) Any vested portion of the Granted Interest shall be retained by Party A;

(c) Any unvested portion of the Granted Interest shall be forfeited and returned to Party B;

(d) The clawback provisions of Section 3.3 shall survive termination with respect to any vested Granted Interest.`,
      },
      {
        id: "signatures",
        heading: "SIGNATURES",
        redacted: true,
        redactedNote: "Signatory names, titles, and dates are redacted.",
        content: `IN WITNESS WHEREOF, the parties have executed this Promotional Swap Agreement as of the date first written above.

PARTY A: ████████ Growth, LLC

By: ████████████████████
Name: ████████████████
Title: ████████████████
Date: ████████ ██, 2025

PARTY B: ████████ Tools, LLC

By: ████████████████████
Name: ████████████████
Title: ████████████████
Date: ████████ ██, 2025

Witnessed by builderkin platform. Agreement hash: ████████████████████████████████`,
      },
    ],
  },
];

const typeColors: Record<string, string> = {
  equity: "bg-[#1F3AA8]/10 text-[#1F3AA8] border-[#1F3AA8]/20",
  cash: "bg-emerald-50 text-emerald-700 border-emerald-200",
  promo: "bg-amber-50 text-amber-700 border-amber-200",
};

const typeLabels: Record<string, string> = {
  equity: "Equity Swap",
  cash: "Cash for Equity",
  promo: "Promo Swap",
};

function RedactedBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-red-50 border border-red-200 text-red-600 text-[10px] font-mono tracking-wider uppercase">
      <EyeOff size={10} />
      Redacted
    </span>
  );
}

function SectionBlock({
  section,
  index,
}: {
  section: (typeof agreements)[0]["sections"][0];
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      variants={fadeInUp}
      className="border border-[#16130F]/10 rounded-lg overflow-hidden"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 bg-[#F5F1EA] hover:bg-[#EDE9E1] transition-colors duration-200 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-inset"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-[#16130F]/40 tracking-widest w-6 text-right">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-[13px] font-medium text-[#16130F] tracking-wide">
            {section.heading}
          </span>
          {section.redacted && <RedactedBadge />}
        </div>
        <ChevronDown
          size={16}
          className={`text-[#16130F]/40 transition-transform duration-200 flex-shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 py-5 bg-white border-t border-[#16130F]/8">
              {section.redacted && section.redactedNote && (
                <div className="flex items-start gap-2 mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-[12px] text-red-600 leading-relaxed">
                    {section.redactedNote}
                  </p>
                </div>
              )}
              <pre className="font-mono text-[12px] text-[#16130F]/80 leading-relaxed whitespace-pre-wrap break-words">
                {section.content}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function AgreementCard({ agreement, index }: { agreement: typeof agreements[0]; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);
  const t = useTranslations();

  return (
    <motion.article
      variants={fadeInUp}
      className="border border-[#16130F]/10 rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]"
      aria-labelledby={`agreement-title-${agreement.id}`}
    >
      {/* Card header */}
      <div className="px-6 py-5 bg-[#F5F1EA] border-b border-[#16130F]/10">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-8 h-8 rounded-lg bg-[#1F3AA8]/10 flex items-center justify-center flex-shrink-0">
              <FileText size={16} className="text-[#1F3AA8]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-mono text-[11px] text-[#16130F]/40 tracking-widest">
                  {agreement.id}
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm border text-[10px] font-mono tracking-wider uppercase ${typeColors[agreement.type] ?? ""}`}
                >
                  {typeLabels[agreement.type] ?? agreement.type}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono tracking-wider uppercase">
                  <CheckCircle size={10} />
                  {agreement.status}
                </span>
              </div>
              <h2
                id={`agreement-title-${agreement.id}`}
                className="text-[16px] font-semibold text-[#16130F] tracking-tight"
              >
                {agreement.title}
              </h2>
              <p className="text-[13px] text-[#16130F]/60 mt-0.5">
                {agreement.subtitle}
              </p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-[11px] font-mono text-[#16130F]/40 tracking-wide">
              {agreement.jurisdiction}
            </p>
            <p className="text-[12px] font-mono text-[#16130F]/60 mt-0.5">
              {agreement.date}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-[12px] text-[#16130F]/60">
          <span>
            <span className="text-[#16130F]/40 mr-1">Party A:</span>
            {agreement.parties.partyA}
          </span>
          <span className="text-[#16130F]/20">×</span>
          <span>
            <span className="text-[#16130F]/40 mr-1">Party B:</span>
            {agreement.parties.partyB}
          </span>
        </div>

        <p className="mt-3 text-[13px] text-[#16130F]/70 leading-relaxed">
          {agreement.summary}
        </p>

        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 inline-flex items-center gap-1.5 text-[12px] text-[#1F3AA8] hover:text-[#1F3AA8]/80 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] rounded-sm font-medium"
          aria-expanded={expanded}
          aria-controls={`agreement-sections-${agreement.id}`}
        >
          {expanded ? (
            <>
              <EyeOff size={13} />
              Collapse document
            </>
          ) : (
            <>
              <Eye size={13} />
              Read full document
            </>
          )}
        </button>
      </div>

      {/* Sections */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={`agreement-sections-${agreement.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <motion.div
              className="px-6 py-6 bg-white flex flex-col gap-3"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center gap-2 mb-2">
                <Shield size={13} className="text-[#16130F]/40" />
                <p className="text-[11px] font-mono text-[#16130F]/40 tracking-widest uppercase">
                  Document sections — redacted where indicated
                </p>
              </div>
              {agreement.sections.map((section, i) => (
                <SectionBlock key={section.id} section={section} index={i} />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function SwapAgreementsPage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-[#F5F1EA]">
      {/* Page header */}
      <motion.section
        className="max-w-[1200px] mx-auto px-6 md:px-10 pt-16 pb-12"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeInUp}>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[12px] text-[#16130F]/50 hover:text-[#16130F] transition-colors duration-200 mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] rounded-sm"
          >
            <ArrowLeft size={13} />
            Back to home
          </Link>
        </motion.div>

        <motion.div variants={fadeInUp} className="max-w-[640px]">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#1F3AA8]/10 border border-[#1F3AA8]/20 text-[#1F3AA8] text-[11px] font-mono tracking-widest uppercase">
              <FileText size={11} />
              Legal documents
            </span>
          </div>
          <h1 className="text-[32px] md:text-[42px] font-bold text-[#16130F] tracking-tight leading-tight text-balance">
            Three real swap agreements, redacted for privacy
          </h1>
          <p className="mt-4 text-[15px] text-[#16130F]/65 leading-relaxed max-w-[52ch]">
            These are genuine agreements executed through builderkin, with party names, valuations, and signatory details removed. The legal structure, clause language, and mechanism are authentic.
          </p>
        </motion.div>

        {/* Meta strip */}
        <motion.div
          variants={fadeInUp}
          className="mt-8 flex flex-wrap gap-6 text-[12px] font-mono text-[#16130F]/50"
        >
          <span className="flex items-center gap-1.5">
            <CheckCircle size={12} className="text-emerald-500" />
            3 agreements
          </span>
          <span className="flex items-center gap-1.5">
            <Shield size={12} className="text-[#1F3AA8]" />
            Delaware LLC + UK Ltd templates
          </span>
          <span className="flex items-center gap-1.5">
            <Eye size={12} />
            Equity, cash, and promo swap types
          </span>
          <span className="flex items-center gap-1.5">
            <EyeOff size={12} className="text-red-400" />
            Sensitive fields redacted
          </span>
        </motion.div>
      </motion.section>

      {/* Disclaimer banner */}
      <motion.div
        className="max-w-[1200px] mx-auto px-6 md:px-10 mb-10"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <AlertCircle size={15} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-[13px] font-medium text-amber-800 mb-0.5">
              For reference only. Not legal advice.
            </p>
            <p className="text-[12px] text-amber-700 leading-relaxed">
              These documents are provided to illustrate the structure of swap agreements facilitated through builderkin. They do not constitute legal advice. All parties are encouraged to seek independent legal counsel before executing any agreement. Party names, valuations, and identifying information have been redacted.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Agreement list */}
      <section
        className="max-w-[1200px] mx-auto px-6 md:px-10 pb-24"
        aria-label="Swap agreement documents"
        aria-live="polite"
      >
        <motion.div
          className="flex flex-col gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {agreements.map((agreement, i) => (
            <AgreementCard key={agreement.id} agreement={agreement} index={i} />
          ))}
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <motion.section
        className="max-w-[1200px] mx-auto px-6 md:px-10 pb-24"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="border border-[#16130F]/10 rounded-xl p-8 md:p-12 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]">
          <div className="max-w-[480px]">
            <p className="text-[11px] font-mono tracking-widest uppercase text-[#16130F]/40 mb-3">
              Ready to swap?
            </p>
            <h2 className="text-[22px] font-bold text-[#16130F] tracking-tight mb-3">
              Your agreement is generated automatically when both parties sign.
            </h2>
            <p className="text-[13px] text-[#16130F]/65 leading-relaxed mb-6">
              builderkin generates a jurisdiction-appropriate agreement based on your swap type and terms. No lawyers required to get started. You can always bring your own counsel to review before signing.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/swap-listing"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1F3AA8] text-white text-[13px] font-medium rounded-sm hover:bg-[#1a3190] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2"
              >
                List your project
                <ChevronRight size={14} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#16130F] text-[#16130F] text-[13px] font-medium rounded-sm hover:bg-[#16130F] hover:text-[#F5F1EA] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2"
              >
                Talk to {BRAND.contactName}
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}