"use client";

import { motion } from "framer-motion";
import { Download, FileText, Shield, AlertCircle } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer } from "@/lib/motion";

const agreements = [
  {
    id: "AGR-2024-001",
    title: "Equity Swap Agreement",
    subtitle: "Delaware LLC — Membership Interest Exchange",
    type: "equity",
    jurisdiction: "Delaware, United States",
    date: "Executed: [DATE REDACTED] 2024",
    parties: ["[PARTY A] LLC", "[PARTY B] LLC"],
    clauses: [
      {
        number: "1.",
        heading: "Definitions",
        text: `For the purposes of this Agreement, the following terms shall have the meanings ascribed to them herein:\n\n(a) "Membership Interest" means a fractional ownership interest in a Delaware Limited Liability Company as defined under the Delaware Limited Liability Company Act, 6 Del. C. § 18-101 et seq.\n\n(b) "Swap Consideration" means the exchange of [■■■]% membership interest in [PARTY A] LLC for [■■■]% membership interest in [PARTY B] LLC, as further described in Section 3 hereof.\n\n(c) "Effective Date" means the date upon which both parties have executed this Agreement and all conditions precedent set forth in Section 5 have been satisfied.\n\n(d) "Platform" means the builderkin exchange platform through which this transaction was initiated and recorded.`,
      },
      {
        number: "2.",
        heading: "Representations and Warranties",
        text: `Each party represents and warrants to the other, as of the Effective Date:\n\n(a) It is a limited liability company duly organized, validly existing, and in good standing under the laws of the State of Delaware.\n\n(b) It has full power and authority to execute, deliver, and perform its obligations under this Agreement.\n\n(c) The execution and delivery of this Agreement have been duly authorized by all necessary action of its members and managers.\n\n(d) The Membership Interest being transferred is free and clear of all liens, encumbrances, pledges, security interests, and restrictions on transfer, except as set forth in the applicable Operating Agreement.\n\n(e) The transferring party is the sole legal and beneficial owner of the Membership Interest being transferred hereunder.`,
      },
      {
        number: "3.",
        heading: "Exchange of Membership Interests",
        text: `3.1 Subject to the terms and conditions of this Agreement, [PARTY A] LLC hereby transfers and assigns to [PARTY B] LLC a [■■■]% membership interest in [PARTY A] LLC (the "Party A Interest"), and [PARTY B] LLC hereby transfers and assigns to [PARTY A] LLC a [■■■]% membership interest in [PARTY B] LLC (the "Party B Interest").\n\n3.2 The parties acknowledge that the Party A Interest has been valued at approximately $[■■■,■■■] and the Party B Interest has been valued at approximately $[■■■,■■■] based on the most recent independent valuations provided to the Platform.\n\n3.3 Each party acknowledges that this exchange is intended to be a simultaneous, reciprocal transfer and that neither party shall be obligated to complete its transfer unless the other party simultaneously completes its corresponding transfer.`,
      },
      {
        number: "4.",
        heading: "Operating Agreement Amendments",
        text: `4.1 Each party shall, within five (5) business days of the Effective Date, amend its respective Operating Agreement to reflect the new membership structure resulting from this exchange.\n\n4.2 The amended Operating Agreements shall include provisions addressing: (i) the rights and obligations of the new member; (ii) transfer restrictions applicable to the exchanged interests; (iii) tag-along and drag-along rights; and (iv) information rights, including the right to receive quarterly financial statements.\n\n4.3 Each party shall provide the other with a copy of its amended Operating Agreement within ten (10) business days of the Effective Date.`,
      },
      {
        number: "5.",
        heading: "Conditions Precedent",
        text: `The obligations of each party to consummate the transactions contemplated by this Agreement are subject to the satisfaction of the following conditions:\n\n(a) All representations and warranties of the other party shall be true and correct in all material respects as of the Effective Date.\n\n(b) No governmental authority shall have enacted any law or issued any order that prohibits or makes illegal the consummation of the transactions contemplated hereby.\n\n(c) Each party shall have received a copy of the other party's current Operating Agreement, certified as true and complete by an authorized manager.\n\n(d) The Platform shall have confirmed receipt and recording of this Agreement in its immutable transaction ledger.`,
      },
      {
        number: "6.",
        heading: "Governing Law and Dispute Resolution",
        text: `6.1 This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of laws principles.\n\n6.2 Any dispute arising out of or relating to this Agreement shall be resolved by binding arbitration administered by JAMS pursuant to its Comprehensive Arbitration Rules and Procedures, with the arbitration to be held in [CITY REDACTED], Delaware.\n\n6.3 The prevailing party in any arbitration or litigation shall be entitled to recover its reasonable attorneys' fees and costs from the non-prevailing party.`,
      },
    ],
    footer:
      "Names, amounts, and identifying details redacted. Structure is authentic. This excerpt is provided for illustrative purposes only and does not constitute legal advice.",
  },
  {
    id: "AGR-2024-002",
    title: "Cash Swap Agreement",
    subtitle: "UK Private Limited Company — Escrow-Routed Payment Exchange",
    type: "cash",
    jurisdiction: "England and Wales",
    date: "Executed: [DATE REDACTED] 2024",
    parties: ["[COMPANY A] Ltd", "[COMPANY B] Ltd"],
    clauses: [
      {
        number: "1.",
        heading: "Interpretation",
        text: `In this Agreement, unless the context otherwise requires:\n\n"Companies Act" means the Companies Act 2006 (as amended from time to time).\n\n"Escrow Agent" means Escrow.com, Inc., a Delaware corporation, acting as independent escrow agent pursuant to the Escrow Instructions attached hereto as Schedule 1.\n\n"Escrow Account" means the segregated client account maintained by the Escrow Agent for the purpose of holding the Cash Consideration pending satisfaction of the Release Conditions.\n\n"Cash Consideration" means the sum of £[■■■,■■■] payable by [COMPANY A] Ltd to [COMPANY B] Ltd in exchange for the promotional and licensing rights described in Schedule 2.\n\n"Release Conditions" means the conditions set out in Clause 4.3 of this Agreement, upon satisfaction of which the Escrow Agent shall release the Cash Consideration to [COMPANY B] Ltd.`,
      },
      {
        number: "2.",
        heading: "Escrow Arrangement",
        text: `2.1 Within three (3) business days of the Effective Date, [COMPANY A] Ltd shall deposit the Cash Consideration into the Escrow Account maintained by Escrow.com, Inc. pursuant to the Escrow Instructions.\n\n2.2 The parties hereby instruct the Escrow Agent to hold the Cash Consideration in the Escrow Account and to release such funds only in accordance with the Release Conditions set out in Clause 4.3 or upon receipt of a joint written instruction signed by authorised representatives of both parties.\n\n2.3 The Escrow Agent's fees, as set out in the Escrow Instructions, shall be borne equally by the parties. Each party shall pay its share of such fees directly to the Escrow Agent within five (5) business days of receiving an invoice therefor.\n\n2.4 The parties acknowledge that Escrow.com routing reference [■■■■■■■■] has been assigned to this transaction and shall be referenced in all communications with the Escrow Agent.`,
      },
      {
        number: "3.",
        heading: "Deliverables and Milestones",
        text: `3.1 [COMPANY B] Ltd shall deliver the following to [COMPANY A] Ltd in accordance with the milestone schedule set out in Schedule 3:\n\n(a) Milestone 1: Integration documentation and API credentials — within [■■] days of the Effective Date. Payment release: [■■]% of Cash Consideration.\n\n(b) Milestone 2: Live integration confirmed by [COMPANY A] Ltd's technical team — within [■■] days of Milestone 1 completion. Payment release: [■■]% of Cash Consideration.\n\n(c) Milestone 3: First [■■,■■■] active users attributed to the integration — within [■■] days of Milestone 2 completion. Payment release: remaining [■■]% of Cash Consideration.\n\n3.2 Each milestone shall be deemed complete upon written confirmation from [COMPANY A] Ltd's designated technical representative, which confirmation shall not be unreasonably withheld or delayed.`,
      },
      {
        number: "4.",
        heading: "Release Conditions and Dispute Mechanism",
        text: `4.1 Upon satisfaction of each milestone as described in Clause 3.1, [COMPANY A] Ltd shall, within two (2) business days, deliver a Release Notice to the Escrow Agent and [COMPANY B] Ltd authorising release of the corresponding portion of the Cash Consideration.\n\n4.2 If [COMPANY A] Ltd fails to deliver a Release Notice within five (5) business days of a milestone being satisfied, [COMPANY B] Ltd may deliver a Deemed Completion Notice to the Escrow Agent, which shall trigger a ten (10) business day dispute resolution window.\n\n4.3 In the event of a dispute regarding milestone completion, the parties shall submit the matter to an independent technical expert appointed by mutual agreement, or failing agreement within five (5) business days, appointed by the President of the British Computer Society. The expert's determination shall be final and binding.`,
      },
      {
        number: "5.",
        heading: "Intellectual Property",
        text: `5.1 Nothing in this Agreement shall operate to transfer ownership of any intellectual property rights from either party to the other. Each party retains all intellectual property rights in its own products, services, and technology.\n\n5.2 [COMPANY B] Ltd hereby grants to [COMPANY A] Ltd a non-exclusive, non-transferable, royalty-free licence to use [COMPANY B] Ltd's trademarks and branding solely for the purpose of promoting the integration described in Schedule 2, subject to [COMPANY B] Ltd's brand guidelines as updated from time to time.\n\n5.3 Any jointly developed materials arising from the collaboration described in Schedule 2 shall be owned jointly by the parties in equal shares, with each party having the right to exploit such materials without accounting to the other.`,
      },
      {
        number: "6.",
        heading: "Governing Law",
        text: `6.1 This Agreement and any dispute or claim (including non-contractual disputes or claims) arising out of or in connection with it or its subject matter or formation shall be governed by and construed in accordance with the law of England and Wales.\n\n6.2 Each party irrevocably agrees that the courts of England and Wales shall have exclusive jurisdiction to settle any dispute or claim (including non-contractual disputes or claims) arising out of or in connection with this Agreement or its subject matter or formation.\n\n6.3 The parties agree that the United Nations Convention on Contracts for the International Sale of Goods shall not apply to this Agreement.`,
      },
    ],
    footer:
      "Names, amounts, and identifying details redacted. Structure is authentic. This excerpt is provided for illustrative purposes only and does not constitute legal advice.",
  },
  {
    id: "AGR-2024-003",
    title: "Promotional Swap Agreement",
    subtitle: "Cross-Promotion and Audience Exchange — Independent Builders",
    type: "promo",
    jurisdiction: "Platform-governed (builderkin standard terms)",
    date: "Executed: [DATE REDACTED] 2024",
    parties: ["[BUILDER A]", "[BUILDER B]"],
    clauses: [
      {
        number: "1.",
        heading: "Purpose and Scope",
        text: `1.1 This Promotional Swap Agreement (the "Agreement") sets out the terms on which [BUILDER A] and [BUILDER B] (together, the "Builders") agree to promote each other's products to their respective audiences during the Promotion Period.\n\n1.2 The parties enter into this Agreement as independent contractors. Nothing in this Agreement shall create or be deemed to create a partnership, joint venture, agency, or employment relationship between the parties.\n\n1.3 The Promotion Period shall commence on the Effective Date and continue for [■■] days, unless earlier terminated in accordance with Clause 7 of this Agreement.\n\n1.4 Each Builder acknowledges that the other Builder's audience data, engagement metrics, and product information shared pursuant to this Agreement constitute confidential information and shall be treated in accordance with Clause 6.`,
      },
      {
        number: "2.",
        heading: "Promotional Obligations — [BUILDER A]",
        text: `During the Promotion Period, [BUILDER A] shall:\n\n(a) Publish a minimum of [■■] dedicated newsletter issues to [BUILDER A]'s subscriber list of approximately [■■,■■■] subscribers, each issue to feature [BUILDER B]'s product as the primary subject with a minimum word count of [■■■] words.\n\n(b) Post a minimum of [■■] social media posts across [BUILDER A]'s accounts on [PLATFORM REDACTED] and [PLATFORM REDACTED], each post to include a direct link to [BUILDER B]'s product landing page.\n\n(c) Feature [BUILDER B]'s product in the "Tools I Use" section of [BUILDER A]'s website for the duration of the Promotion Period.\n\n(d) Provide [BUILDER B] with a unique tracking link and report click-through and conversion data on a weekly basis during the Promotion Period.\n\n(e) Ensure all promotional content is clearly labelled as a partnership in compliance with applicable advertising standards and FTC guidelines.`,
      },
      {
        number: "3.",
        heading: "Promotional Obligations — [BUILDER B]",
        text: `During the Promotion Period, [BUILDER B] shall:\n\n(a) Publish a minimum of [■■] dedicated newsletter issues to [BUILDER B]'s subscriber list of approximately [■■,■■■] subscribers, each issue to feature [BUILDER A]'s product as the primary subject with a minimum word count of [■■■] words.\n\n(b) Post a minimum of [■■] social media posts across [BUILDER B]'s accounts on [PLATFORM REDACTED] and [PLATFORM REDACTED], each post to include a direct link to [BUILDER A]'s product landing page.\n\n(c) Feature [BUILDER A]'s product in the "Recommended" section of [BUILDER B]'s onboarding email sequence, which is sent to all new users during the Promotion Period.\n\n(d) Provide [BUILDER A] with a unique tracking link and report click-through and conversion data on a weekly basis during the Promotion Period.\n\n(e) Ensure all promotional content is clearly labelled as a partnership in compliance with applicable advertising standards and ASA guidelines.`,
      },
      {
        number: "4.",
        heading: "Performance Benchmarks and Remedies",
        text: `4.1 The parties agree to the following minimum performance benchmarks for the Promotion Period:\n\n(a) [BUILDER A] shall deliver a minimum of [■■,■■■] unique impressions across all promotional activities.\n\n(b) [BUILDER B] shall deliver a minimum of [■■,■■■] unique impressions across all promotional activities.\n\n4.2 If either party fails to meet its minimum performance benchmark by the end of the Promotion Period, the non-defaulting party may elect one of the following remedies:\n\n(a) Require the defaulting party to extend the Promotion Period by [■■] days at no additional cost; or\n\n(b) Require the defaulting party to provide a cash payment of $[■■■] per [■,■■■] impressions shortfall, up to a maximum of $[■,■■■].\n\n4.3 The parties shall submit performance data to the Platform within five (5) business days of the end of the Promotion Period for independent verification.`,
      },
      {
        number: "5.",
        heading: "Content Approval",
        text: `5.1 Each Builder shall submit all promotional content to the other Builder for approval at least [■■] business days prior to publication. Approval shall not be unreasonably withheld or delayed.\n\n5.2 If a Builder fails to respond to a content approval request within [■■] business days, the content shall be deemed approved.\n\n5.3 Each Builder retains the right to request reasonable amendments to promotional content that:\n\n(a) Contains factually inaccurate statements about the reviewing Builder's product;\n\n(b) Uses the reviewing Builder's trademarks in a manner inconsistent with its brand guidelines; or\n\n(c) Makes comparative claims that the reviewing Builder reasonably considers misleading.\n\n5.4 The parties agree that creative direction, tone, and format decisions rest solely with the promoting Builder, provided the content meets the minimum requirements set out in Clauses 2 and 3.`,
      },
      {
        number: "6.",
        heading: "Confidentiality and Data",
        text: `6.1 Each party agrees to keep confidential all non-public information received from the other party in connection with this Agreement, including but not limited to subscriber counts, open rates, conversion rates, revenue figures, and product roadmap information.\n\n6.2 Confidential information may only be disclosed to employees, contractors, or advisors who have a need to know such information for the purposes of this Agreement and who are bound by confidentiality obligations no less restrictive than those set out herein.\n\n6.3 The confidentiality obligations in this Clause 6 shall survive termination of this Agreement for a period of two (2) years.\n\n6.4 Neither party shall use the other party's audience data for any purpose other than the performance of its obligations under this Agreement, and each party shall comply with all applicable data protection legislation, including the UK GDPR and, where applicable, the EU GDPR.`,
      },
      {
        number: "7.",
        heading: "Term and Termination",
        text: `7.1 This Agreement shall commence on the Effective Date and continue until the end of the Promotion Period, unless earlier terminated in accordance with this Clause 7.\n\n7.2 Either party may terminate this Agreement immediately on written notice if the other party:\n\n(a) Commits a material breach of this Agreement and fails to remedy such breach within ten (10) business days of receiving written notice specifying the breach;\n\n(b) Becomes insolvent, enters administration, or makes any arrangement with its creditors; or\n\n(c) Engages in conduct that, in the reasonable opinion of the terminating party, is likely to bring the terminating party's brand into disrepute.\n\n7.3 On termination, each party shall immediately cease all promotional activities relating to the other party's product and remove all promotional content from its channels within five (5) business days.`,
      },
    ],
    footer:
      "Names, amounts, and identifying details redacted. Structure is authentic. This excerpt is provided for illustrative purposes only and does not constitute legal advice.",
  },
];

const typeConfig = {
  equity: {
    label: "Equity Swap",
    color: "text-[#1F3AA8]",
    bg: "bg-[#1F3AA8]/8",
    border: "border-[#1F3AA8]/20",
    dot: "bg-[#1F3AA8]",
  },
  cash: {
    label: "Cash Swap",
    color: "text-[#2A7A4B]",
    bg: "bg-[#2A7A4B]/8",
    border: "border-[#2A7A4B]/20",
    dot: "bg-[#2A7A4B]",
  },
  promo: {
    label: "Promo Swap",
    color: "text-[#8B4513]",
    bg: "bg-[#8B4513]/8",
    border: "border-[#8B4513]/20",
    dot: "bg-[#8B4513]",
  },
};

function RedactionMark() {
  return (
    <span
      className="inline-block bg-[#16130F]/12 text-[#16130F]/40 font-mono text-[11px] px-1 rounded-sm select-none"
      aria-label="redacted"
    >
      [■■■]
    </span>
  );
}

function ClauseBlock({
  number,
  heading,
  text,
}: {
  number: string;
  heading: string;
  text: string;
}) {
  const parts = text.split(/(\[■■[■,■]*\])/g);

  return (
    <motion.div
      variants={fadeInUp}
      className="border-t border-[#16130F]/8 pt-6 pb-2"
    >
      <div className="flex gap-4">
        <span className="font-mono text-[12px] text-[#16130F]/35 shrink-0 mt-0.5 w-6">
          {number}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-mono text-[12px] tracking-widest uppercase text-[#16130F]/50 mb-3">
            {heading}
          </h3>
          <p className="font-mono text-[12.5px] leading-[1.85] text-[#16130F]/75 whitespace-pre-line">
            {parts.map((part, i) => {
              if (part.match(/^\[■■[■,■]*\]$/)) {
                return <RedactionMark key={i} />;
              }
              return <span key={i}>{part}</span>;
            })}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function AgreementCard({ agreement }: { agreement: (typeof agreements)[0] }) {
  const cfg = typeConfig[agreement.type as keyof typeof typeConfig];

  return (
    <motion.article
      variants={fadeInUp}
      className="bg-white border border-[#16130F]/10 rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_32px_-8px_rgba(0,0,0,0.08)] overflow-hidden"
      aria-labelledby={`agreement-title-${agreement.id}`}
    >
      {/* Document header */}
      <div className="border-b border-[#16130F]/10 px-8 py-6 bg-[#FAFAF8]">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <span
                className={`inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-sm border ${cfg.bg} ${cfg.border} ${cfg.color}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                {cfg.label}
              </span>
              <span className="font-mono text-[10px] text-[#16130F]/35 tracking-wide">
                {agreement.id}
              </span>
            </div>
            <h2
              id={`agreement-title-${agreement.id}`}
              className="font-mono text-[15px] font-semibold text-[#16130F] tracking-tight mb-1"
            >
              {agreement.title}
            </h2>
            <p className="font-mono text-[12px] text-[#16130F]/55">
              {agreement.subtitle}
            </p>
          </div>
          <button
            className="shrink-0 flex items-center gap-2 font-mono text-[11px] tracking-wide text-[#16130F]/60 border border-[#16130F]/20 px-3 py-2 rounded-sm hover:bg-[#16130F] hover:text-[#F5F1EA] hover:border-[#16130F] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] focus-visible:ring-offset-2"
            aria-label={`Download ${agreement.title} as PDF`}
            onClick={() => {}}
          >
            <Download size={12} />
            Download PDF
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <p className="font-mono text-[10px] tracking-widest uppercase text-[#16130F]/30 mb-1">
              Jurisdiction
            </p>
            <p className="font-mono text-[11px] text-[#16130F]/65">
              {agreement.jurisdiction}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-widest uppercase text-[#16130F]/30 mb-1">
              Parties
            </p>
            <p className="font-mono text-[11px] text-[#16130F]/65">
              {agreement.parties.join(" / ")}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-widest uppercase text-[#16130F]/30 mb-1">
              Date
            </p>
            <p className="font-mono text-[11px] text-[#16130F]/65">
              {agreement.date}
            </p>
          </div>
        </div>
      </div>

      {/* Clauses */}
      <motion.div
        className="px-8 py-6 space-y-0"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {agreement.clauses.map((clause) => (
          <ClauseBlock
            key={clause.number}
            number={clause.number}
            heading={clause.heading}
            text={clause.text}
          />
        ))}
      </motion.div>

      {/* Footer note */}
      <div className="border-t border-[#16130F]/8 px-8 py-4 bg-[#FAFAF8]">
        <div className="flex items-start gap-2.5">
          <AlertCircle
            size={13}
            className="text-[#16130F]/35 shrink-0 mt-0.5"
          />
          <p className="font-mono text-[11px] text-[#16130F]/45 leading-relaxed italic">
            {agreement.footer}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function SwapAgreementsPage() {
  return (
    <main className="min-h-screen bg-[#F5F1EA]">
      {/* Page header */}
      <section className="border-b border-[#16130F]/10 bg-[#F5F1EA]">
        <motion.div
          className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-20"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeIn} className="mb-6">
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#16130F]/40 border border-[#16130F]/15 px-2.5 py-1 rounded-sm">
              Legal Documents
            </span>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="font-mono text-[28px] md:text-[36px] font-semibold text-[#16130F] tracking-tight leading-tight mb-4 max-w-[22ch]"
          >
            Sample Swap Agreements
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="font-mono text-[13px] text-[#16130F]/60 leading-relaxed max-w-[58ch]"
          >
            Three real agreement structures used on builderkin, with all
            identifying information redacted. Equity, cash, and promotional
            swaps each follow distinct legal frameworks. These excerpts show
            what you sign before a swap is recorded.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-8 flex flex-wrap gap-6"
          >
            {[
              { icon: Shield, label: "Delaware LLC / UK Ltd structures" },
              { icon: FileText, label: "Clause-level redaction only" },
              { icon: AlertCircle, label: "Not legal advice" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 font-mono text-[11px] text-[#16130F]/50"
              >
                <Icon size={12} className="text-[#16130F]/35" />
                {label}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Index / jump links */}
      <section className="border-b border-[#16130F]/10 bg-white/60">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-4">
          <nav aria-label="Agreement index">
            <ol className="flex flex-wrap gap-x-8 gap-y-2" role="list">
              {agreements.map((agr, i) => {
                const cfg = typeConfig[agr.type as keyof typeof typeConfig];
                return (
                  <li key={agr.id}>
                    <a
                      href={`#${agr.id}`}
                      className={`font-mono text-[11px] tracking-wide flex items-center gap-1.5 ${cfg.color} hover:opacity-70 transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3AA8] rounded-sm`}
                    >
                      <span className="text-[#16130F]/30">{i + 1}.</span>
                      {agr.title}
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </section>

      {/* Agreements */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <motion.div
          className="space-y-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {agreements.map((agreement) => (
            <div key={agreement.id} id={agreement.id}>
              <AgreementCard agreement={agreement} />
            </div>
          ))}
        </motion.div>
      </section>

      {/* Bottom note */}
      <section className="border-t border-[#16130F]/10 bg-white/40">
        <motion.div
          className="max-w-[1200px] mx-auto px-6 md:px-10 py-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <div className="max-w-[640px]">
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#16130F]/35 mb-3">
              A note on these documents
            </p>
            <p className="font-mono text-[12.5px] text-[#16130F]/60 leading-[1.85]">
              Every swap on builderkin is executed against a real legal
              agreement drafted by qualified attorneys. The structures shown
              here are the actual frameworks in use. Redactions cover only
              party names, monetary amounts, dates, and geographic identifiers.
              Clause structure, numbering, and legal language are unmodified.
              builderkin does not provide legal advice. Builders are encouraged
              to have agreements reviewed by independent counsel before signing.
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}