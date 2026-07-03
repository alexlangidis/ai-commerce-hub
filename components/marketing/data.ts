import type { LucideIcon } from "lucide-react";
import {
  ArrowLeftRightIcon,
  BotIcon,
  HistoryIcon,
  LanguagesIcon,
  LayoutDashboardIcon,
  MegaphoneIcon,
  SearchCheckIcon,
  SparklesIcon,
  TagIcon,
  WandSparklesIcon,
} from "lucide-react";

export const navLinks: {
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
}[] = [
  {
    label: "Features",
    href: "#features",
    icon: SparklesIcon,
    description: "AI tools for product content",
  },
  {
    label: "Workflow",
    href: "#workflow",
    icon: BotIcon,
    description: "Four steps to publish-ready copy",
  },
  {
    label: "Compare",
    href: "#compare",
    icon: ArrowLeftRightIcon,
    description: "Before & after optimization",
  },
  {
    label: "Dashboard",
    href: "#dashboard",
    icon: LayoutDashboardIcon,
    description: "Your content workspace",
  },
  {
    label: "Pricing",
    href: "#pricing",
    icon: TagIcon,
    description: "Plans that scale with you",
  },
];

export const features: {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
}[] = [
  {
    title: "AI Product Generator",
    description:
      "Generate titles, descriptions, bullet benefits, tags, and WooCommerce-ready HTML from a few product notes.",
    icon: SparklesIcon,
    accent: "from-primary/20 to-chart-2/10",
  },
  {
    title: "Rewrite Studio",
    description:
      "Refine copy for luxury, technical, sales, or shorter formats without losing your product facts.",
    icon: WandSparklesIcon,
    accent: "from-chart-5/20 to-primary/10",
  },
  {
    title: "SEO Optimizer",
    description:
      "Score listings, spot missing keywords, and regenerate search-friendly titles and meta descriptions.",
    icon: SearchCheckIcon,
    accent: "from-chart-3/20 to-chart-2/10",
  },
  {
    title: "Translation Studio",
    description:
      "Localize product content for Greek, English, German, French, Italian, Spanish, and Polish in one workflow.",
    icon: LanguagesIcon,
    accent: "from-chart-2/20 to-accent/30",
  },
  {
    title: "Brand Voice",
    description:
      "Set tone, style, language, and claims to avoid once — every tool inherits the same voice automatically.",
    icon: MegaphoneIcon,
    accent: "from-primary/15 to-chart-5/15",
  },
  {
    title: "Version History",
    description:
      "Save every generation with inputs, outputs, and model metadata. Compare versions side by side.",
    icon: HistoryIcon,
    accent: "from-chart-4/15 to-chart-3/10",
  },
];

export const workflowSteps = [
  {
    step: "01",
    title: "Add product context",
    description: "Paste specs, notes, or rough copy. Pick a template for your category.",
  },
  {
    step: "02",
    title: "Generate with AI",
    description:
      "Product Generator drafts SEO titles, descriptions, benefits, and store-ready HTML.",
  },
  {
    step: "03",
    title: "Apply brand voice",
    description:
      "Your tone, language, and CTA preferences shape every rewrite and translation.",
  },
  {
    step: "04",
    title: "Publish & iterate",
    description:
      "Export optimized content, track versions, and refine with Rewrite or SEO tools.",
  },
];

export const beforeContent = {
  label: "Before",
  score: 42,
  title: "Blue running shoes",
  body: "Good shoes for running. Comfortable and nice color. Buy now.",
};

export const afterContent = {
  label: "After AI optimization",
  score: 91,
  title: "Ultralight Performance Running Shoes — Responsive Cushioning",
  body: "Engineered mesh upper keeps feet cool on long runs. Responsive midsole returns energy mile after mile. Secure heel lock for race-day confidence.",
};

export const pricingPlans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "For solo sellers testing AI-assisted listings.",
    features: [
      "500 generations / month",
      "Product Generator",
      "Rewrite Studio",
      "Email support",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$79",
    period: "/month",
    description: "For growing stores scaling content across catalogs.",
    features: [
      "5,000 generations / month",
      "All AI tools included",
      "Brand Voice profiles",
      "Version history & compare",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For teams with custom workflows and volume needs.",
    features: [
      "Unlimited workspaces",
      "SSO & audit logs",
      "Dedicated success manager",
      "Custom templates",
    ],
    highlighted: false,
  },
];

export const heroStats = [
  { label: "Avg. SEO score lift", value: "+38%" },
  { label: "Languages supported", value: "7" },
  { label: "Time saved per SKU", value: "12 min" },
];

export const dashboardModules = [
  { label: "Product Generator", active: true },
  { label: "Rewrite Studio", active: false },
  { label: "SEO Optimizer", active: false },
  { label: "Translation", active: false },
];

export const brandIcon = BotIcon;
