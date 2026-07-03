import type { LucideIcon } from "lucide-react";
import {
  FileTextIcon,
  HistoryIcon,
  LanguagesIcon,
  LayoutDashboardIcon,
  MegaphoneIcon,
  SearchCheckIcon,
  SparklesIcon,
  WandSparklesIcon,
} from "lucide-react";

export type AppRouteMeta = {
  label: string;
  parent?: string;
  icon?: LucideIcon;
};

export const appRoutes: Record<string, AppRouteMeta> = {
  "/dashboard": {
    label: "Dashboard",
    icon: LayoutDashboardIcon,
  },
  "/dashboard/product-generator": {
    label: "Product Generator",
    parent: "/dashboard",
    icon: SparklesIcon,
  },
  "/dashboard/rewrite-studio": {
    label: "Rewrite Studio",
    parent: "/dashboard",
    icon: WandSparklesIcon,
  },
  "/dashboard/seo-optimizer": {
    label: "SEO Optimizer",
    parent: "/dashboard",
    icon: SearchCheckIcon,
  },
  "/dashboard/translation-studio": {
    label: "Translation Studio",
    parent: "/dashboard",
    icon: LanguagesIcon,
  },
  "/dashboard/brand-voice": {
    label: "Brand Voice",
    parent: "/dashboard",
    icon: MegaphoneIcon,
  },
  "/dashboard/prompt-templates": {
    label: "Prompt Templates",
    parent: "/dashboard",
    icon: FileTextIcon,
  },
  "/dashboard/history": {
    label: "History",
    parent: "/dashboard",
    icon: HistoryIcon,
  },
};

export function getBreadcrumbs(pathname: string) {
  if (pathname.startsWith("/dashboard/history/")) {
    return [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/dashboard/history", label: "History" },
      { href: pathname, label: "Details" },
    ];
  }

  const current = appRoutes[pathname];

  if (!current) {
    return [{ href: "/dashboard", label: "Dashboard" }];
  }

  const crumbs = [{ href: pathname, label: current.label }];

  if (current.parent) {
    const parent = appRoutes[current.parent];
    if (parent) {
      crumbs.unshift({ href: current.parent, label: parent.label });
    }
  }

  return crumbs;
}

export function resolveRouteContext(pathname: string) {
  const breadcrumbs = getBreadcrumbs(pathname);
  const currentCrumb = breadcrumbs[breadcrumbs.length - 1];
  const routeMeta =
    appRoutes[pathname] ??
    (pathname.startsWith("/dashboard/history/")
      ? appRoutes["/dashboard/history"]
      : appRoutes["/dashboard"]);

  return {
    breadcrumbs,
    current: {
      label: currentCrumb.label,
      href: currentCrumb.href,
      icon: routeMeta?.icon ?? LayoutDashboardIcon,
    },
    parent:
      breadcrumbs.length > 1
        ? breadcrumbs[breadcrumbs.length - 2]
        : routeMeta?.parent
          ? {
              href: routeMeta.parent,
              label: appRoutes[routeMeta.parent]?.label ?? "Dashboard",
            }
          : null,
  };
}

export const workspaceModules = [
  {
    title: "Product Content Generator",
    description:
      "Create SEO titles, descriptions, benefits, tags, alt text, and WooCommerce HTML.",
    href: "/dashboard/product-generator",
    icon: SparklesIcon,
    accent: "from-primary/20 to-chart-2/10",
  },
  {
    title: "Rewrite Studio",
    description:
      "Improve pasted product copy with professional, shorter, sales, and technical modes.",
    href: "/dashboard/rewrite-studio",
    icon: WandSparklesIcon,
    accent: "from-chart-5/20 to-primary/10",
  },
  {
    title: "SEO Optimizer",
    description:
      "Score titles and descriptions, find missing keywords, and generate improved versions.",
    href: "/dashboard/seo-optimizer",
    icon: SearchCheckIcon,
    accent: "from-chart-3/20 to-chart-2/10",
  },
  {
    title: "Translation Studio",
    description:
      "Translate and localize content for Greek, English, German, French, Italian, Spanish, and Polish.",
    href: "/dashboard/translation-studio",
    icon: LanguagesIcon,
    accent: "from-chart-2/20 to-accent/30",
  },
  {
    title: "Prompt Templates",
    description:
      "Start from ready templates for accessories, beauty, fashion, fitness, and more.",
    href: "/dashboard/prompt-templates",
    icon: FileTextIcon,
    accent: "from-chart-4/15 to-chart-3/10",
  },
  {
    title: "Brand Voice",
    description:
      "Control language, tone, style, claims to avoid, and preferred CTA for all AI outputs.",
    href: "/dashboard/brand-voice",
    icon: MegaphoneIcon,
    accent: "from-primary/15 to-chart-5/15",
  },
  {
    title: "History",
    description:
      "Save each generation with input, output, tone, language, model, and compare versions.",
    href: "/dashboard/history",
    icon: HistoryIcon,
    accent: "from-chart-3/15 to-primary/10",
  },
] as const;

export const sidebarNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "AI Tools",
    url: "/dashboard/product-generator",
    icon: SparklesIcon,
    items: [
      {
        title: "Product Generator",
        url: "/dashboard/product-generator",
      },
      {
        title: "Rewrite Studio",
        url: "/dashboard/rewrite-studio",
      },
      {
        title: "SEO Optimizer",
        url: "/dashboard/seo-optimizer",
      },
      {
        title: "Translation Studio",
        url: "/dashboard/translation-studio",
      },
    ],
  },
  {
    title: "Brand Voice",
    url: "/dashboard/brand-voice",
    icon: MegaphoneIcon,
  },
  {
    title: "Prompt Templates",
    url: "/dashboard/prompt-templates",
    icon: FileTextIcon,
  },
  {
    title: "History",
    url: "/dashboard/history",
    icon: HistoryIcon,
  },
];

export const sidebarQuickLinks = [
  {
    title: "Set brand voice",
    url: "/dashboard/brand-voice",
    icon: MegaphoneIcon,
  },
  {
    title: "View history",
    url: "/dashboard/history",
    icon: HistoryIcon,
  },
];
