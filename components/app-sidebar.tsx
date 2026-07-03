"use client";

import type * as React from "react";
import Link from "next/link";
import { StoreIcon } from "lucide-react";

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
import { sidebarNavItems, sidebarQuickLinks } from "@/lib/app-navigation";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: {
    name?: string | null;
    email: string;
  };
};

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-sidebar-border/60">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip="AI Commerce Hub Studio"
              render={<Link href="/dashboard" />}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-sidebar-primary to-chart-2 text-sidebar-primary-foreground shadow-sm">
                <StoreIcon />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">AI Commerce Hub</span>
                <span className="truncate text-xs text-sidebar-foreground/70">
                  Studio workspace
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain label="Workspace" items={sidebarNavItems} />
        <NavMain label="Quick links" items={sidebarQuickLinks} />
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border/60">
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
