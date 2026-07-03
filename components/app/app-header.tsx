"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ComponentProps } from "react";
import {
  ChevronRightIcon,
  ChevronsUpDownIcon,
  ExternalLinkIcon,
  HistoryIcon,
  LogOutIcon,
  MegaphoneIcon,
  MoreHorizontalIcon,
  StoreIcon,
} from "lucide-react";

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
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { resolveRouteContext } from "@/lib/app-navigation";
import { cn } from "@/lib/utils";

type AppHeaderProps = {
  user: {
    name?: string | null;
    email: string;
  };
};

function HeaderIconButton({
  label,
  children,
  className,
  ...props
}: ComponentProps<typeof Button> & { label: string }) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            className={cn("size-8 shrink-0 text-muted-foreground", className)}
            aria-label={label}
            {...props}
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent side="bottom">{label}</TooltipContent>
    </Tooltip>
  );
}

function UserMenu({
  user,
  displayName,
  fallback,
  isSigningOut,
  onSignOut,
}: {
  user: AppHeaderProps["user"];
  displayName: string;
  fallback: string;
  isSigningOut: boolean;
  onSignOut: () => void;
}) {
  const { isMobile } = useSidebar();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="app-header-user-chip h-9 max-w-[11rem] gap-2 rounded-full border-border/70 bg-card/90 py-1 pl-1 pr-2.5 shadow-sm hover:bg-card aria-expanded:border-primary/20 aria-expanded:bg-muted/60"
            aria-label="Open account menu"
          />
        }
      >
        <Avatar className="size-7 shrink-0 ring-2 ring-background">
          <AvatarFallback className="bg-gradient-to-br from-primary to-chart-2 text-[11px] font-semibold text-primary-foreground">
            {fallback}
          </AvatarFallback>
        </Avatar>
        <span className="hidden min-w-0 flex-1 truncate text-sm font-medium md:inline">
          {displayName}
        </span>
        <ChevronsUpDownIcon className="hidden size-3.5 shrink-0 text-muted-foreground md:block" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side={isMobile ? "bottom" : "bottom"}
        className="w-56"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-2 py-2">
              <Avatar className="size-8">
                <AvatarFallback className="bg-primary/15 text-primary">
                  {fallback}
                </AvatarFallback>
              </Avatar>
              <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{displayName}</span>
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
            onClick={onSignOut}
            disabled={isSigningOut}
            variant="destructive"
          >
            <LogOutIcon />
            {isSigningOut ? "Signing out..." : "Log out"}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AppHeader({ user }: AppHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { current, parent } = resolveRouteContext(pathname);
  const displayName = user.name || "Commerce user";
  const fallback = user.email.slice(0, 2).toUpperCase();
  const CurrentIcon = current.icon;

  async function handleSignOut() {
    setIsSigningOut(true);
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="app-header-bar sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b px-3 sm:gap-3 sm:px-4 md:px-6">
      <SidebarTrigger className="size-8 shrink-0" />

      <nav
        aria-label="Current page"
        className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2"
      >
        {parent ? (
          <>
            <Link
              href={parent.href}
              className="hidden max-w-[7rem] truncate text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline sm:max-w-none"
            >
              {parent.label}
            </Link>
            <ChevronRightIcon className="hidden size-3.5 shrink-0 text-muted-foreground/50 sm:block" />
          </>
        ) : null}

        <div className="flex min-w-0 items-center gap-2">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary sm:size-8 sm:rounded-lg">
            <CurrentIcon className="size-3.5 sm:size-4" />
          </span>
          <span className="truncate text-sm font-semibold tracking-tight sm:text-[0.9375rem]">
            {current.label}
          </span>
        </div>
      </nav>

      <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
        <div className="hidden items-center sm:flex sm:gap-0.5">
          <HeaderIconButton
            label="Generation history"
            nativeButton={false}
            render={<Link href="/dashboard/history" />}
          >
            <HistoryIcon className="size-4" />
          </HeaderIconButton>
          <HeaderIconButton
            label="Open marketing site"
            nativeButton={false}
            render={
              <Link href="/" target="_blank" rel="noreferrer">
                <ExternalLinkIcon className="size-4" />
              </Link>
            }
          />
        </div>

        <ThemeToggle className="size-8" />

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="size-8 sm:hidden"
                aria-label="More actions"
              />
            }
          >
            <MoreHorizontalIcon className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuItem render={<Link href="/dashboard/history" />}>
                <HistoryIcon />
                History
              </DropdownMenuItem>
              <DropdownMenuItem
                render={
                  <Link href="/" target="_blank" rel="noreferrer">
                    <ExternalLinkIcon />
                    Marketing site
                  </Link>
                }
              />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <UserMenu
          user={user}
          displayName={displayName}
          fallback={fallback}
          isSigningOut={isSigningOut}
          onSignOut={handleSignOut}
        />
      </div>
    </header>
  );
}
