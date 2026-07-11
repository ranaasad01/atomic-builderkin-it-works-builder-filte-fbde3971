export interface NavLink {
  label: string;
  href: string;
  type: "route" | "anchor";
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  valuation: string;
  swapTerms: string;
  description: string;
  category: string;
  stage: string;
  image: string;
  swapType: "equity" | "cash" | "promo";
  listedAt: string;
}

export interface SwapEntry {
  id: string;
  projectA: string;
  projectB: string;
  terms: string;
  date: string;
  type: "equity" | "cash" | "promo";
}

export const BRAND = {
  name: "builderkin",
  tagline: "Equity swaps for independent builders. Real paperwork. No tokens.",
  email: "hello@builderkin.com",
  contactName: "Mara Osei",
  contactEmail: "mara@builderkin.com",
  url: "https://builderkin.com",
} as const;

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", type: "route" },
  { label: "Projects", href: "/project-detail", type: "route" },
  { label: "Swap Listings", href: "/swap-listing", type: "route" },
  { label: "Agreements", href: "/swap-agreements", type: "route" },
  { label: "About", href: "/about", type: "route" },
  { label: "Feed", href: "/feed", type: "route" },
  { label: "All Projects", href: "/projects", type: "route" },
  { label: "How It Works", href: "/how-it-works", type: "route" },
  { label: "Pricing", href: "/pricing", type: "route" },
  { label: "Legal", href: "/legal", type: "route" },
  { label: "FAQ", href: "/faq", type: "route" },
];

export const footerLinks: NavLink[] = [
  { label: "Home", href: "/", type: "route" },
  { label: "Projects", href: "/project-detail", type: "route" },
  { label: "Swap Listings", href: "/swap-listing", type: "route" },
  { label: "Agreements", href: "/swap-agreements", type: "route" },
  { label: "About", href: "/about", type: "route" },
  { label: "Feed", href: "/feed", type: "route" },
  { label: "All Projects", href: "/projects", type: "route" },
  { label: "How It Works", href: "/how-it-works", type: "route" },
  { label: "Pricing", href: "/pricing", type: "route" },
  { label: "Legal", href: "/legal", type: "route" },
  { label: "FAQ", href: "/faq", type: "route" },
];
