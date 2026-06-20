import { useRouterState, useNavigate, Link } from "@tanstack/react-router";
import { Bell, LogOut, Search, User as UserIcon, Command } from "lucide-react";
import { useAuth } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const titleMap: Record<string, string> = {
  dashboard: "Dashboard",
  employees: "Employees",
  sites: "Sites",
  attendance: "Attendance",
  tasks: "Tasks",
  assets: "Assets",
  maintenance: "Maintenance",
  reports: "Reports",
  settings: "Settings",
};

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);

  const segments = pathname.split("/").filter(Boolean);

  const initials = (user?.name || "U")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/60 glass px-4 md:px-6">
      <nav className="flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground">
        <Link to="/dashboard" className="font-medium text-foreground/70 hover:text-foreground transition-colors">PowerFuse</Link>
        {segments.map((seg, i) => (
          <span key={i} className="flex items-center gap-1.5 min-w-0">
            <span className="text-muted-foreground/40">/</span>
            <span className="truncate font-medium text-foreground">{titleMap[seg] ?? seg}</span>
          </span>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <button className="hidden md:flex h-9 w-72 items-center gap-2 rounded-full border border-border bg-muted/50 px-3.5 text-sm text-muted-foreground hover:bg-muted transition-colors">
          <Search className="h-3.5 w-3.5" />
          <span className="flex-1 text-left">Search anything…</span>
          <kbd className="flex items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium">
            <Command className="h-2.5 w-2.5" />K
          </kbd>
        </button>

        <ThemeToggle />

        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full p-0.5 hover:bg-accent transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="gradient-primary text-primary-foreground text-xs font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl">
            <DropdownMenuLabel>
              <div className="text-sm font-medium">{user?.name}</div>
              <div className="text-xs text-muted-foreground font-normal">{user?.email}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate({ to: "/settings" })}>
              <UserIcon className="mr-2 h-4 w-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => { logout(); navigate({ to: "/login" }); }}>
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
