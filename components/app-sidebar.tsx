"use client";

import type * as React from "react";

import {
  BotIcon,
  FileTextIcon,
  LanguagesIcon,
  LayoutDashboardIcon,
  MegaphoneIcon,
  SearchCheckIcon,
  StoreIcon,
  WandSparklesIcon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: {
    name?: string | null;
    email: string;
  };
};

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "AI Tools",
    url: "/dashboard",
    icon: BotIcon,
    items: [
      {
        title: "Product Content Generator",
        url: "/dashboard",
      },
      {
        title: "Rewrite Studio",
        url: "/dashboard",
      },
      {
        title: "SEO Optimizer",
        url: "/dashboard",
      },
      {
        title: "Translation Studio",
        url: "/dashboard",
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
    url: "/dashboard",
    icon: FileTextIcon,
  },
  {
    title: "History",
    url: "/dashboard",
    icon: SearchCheckIcon,
  },
];

const upcomingItems = [
  {
    title: "Languages",
    url: "/dashboard",
    icon: LanguagesIcon,
  },
  {
    title: "WooCommerce HTML",
    url: "/dashboard",
    icon: WandSparklesIcon,
  },
];

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="AI Commerce Hub">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <StoreIcon />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">AI Commerce Hub</span>
                <span className="truncate text-xs">Product content suite</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain label="Workspace" items={navItems} />
        <NavMain label="Coming next" items={upcomingItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user.name || "Commerce user",
            email: user.email,
            fallback: user.email.slice(0, 2).toUpperCase(),
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
