import { AppHeader } from "@/components/app/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { requireSession } from "@/lib/session";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireSession();

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar
          user={{
            name: session.user.name,
            email: session.user.email,
          }}
        />
        <SidebarInset className="app-workspace">
          <AppHeader
            user={{
              name: session.user.name,
              email: session.user.email,
            }}
          />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
