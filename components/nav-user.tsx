"use client";

import Link from "next/link";
import {
  ChevronsUpDownIcon,
  HistoryIcon,
  LogOutIcon,
  MegaphoneIcon,
  StoreIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    fallback: string;
  };
}) {
  const router = useRouter();
  const { isMobile } = useSidebar();
  const [isPending, setIsPending] = useState(false);

  async function handleSignOut() {
    setIsPending(true);
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="aria-expanded:bg-sidebar-accent"
              />
            }
          >
            <Avatar>
              <AvatarFallback className="bg-sidebar-primary/20 text-sidebar-primary">
                {user.fallback}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs text-sidebar-foreground/70">
                {user.email}
              </span>
            </div>
            <ChevronsUpDownIcon className="ml-auto" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar>
                    <AvatarFallback className="bg-primary/15 text-primary">
                      {user.fallback}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem render={<Link href="/dashboard" />}>
                <StoreIcon />
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem render={<Link href="/dashboard/brand-voice" />}>
                <MegaphoneIcon />
                Brand Voice
              </DropdownMenuItem>
              <DropdownMenuItem render={<Link href="/dashboard/history" />}>
                <HistoryIcon />
                History
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={handleSignOut}
                disabled={isPending}
                variant="destructive"
              >
                <LogOutIcon />
                {isPending ? "Signing out..." : "Log out"}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start border-sidebar-border/70 bg-sidebar-accent/40"
          onClick={handleSignOut}
          disabled={isPending}
        >
          <LogOutIcon data-icon="inline-start" />
          {isPending ? "Signing out..." : "Log out"}
        </Button>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
