import { jsxs, jsx } from "react/jsx-runtime";
import { useRouterState, Link, useNavigate, Navigate, Outlet } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, LayoutDashboard, Users, MapPin, ClockArrowUp, KanbanSquare, Boxes, Wrench, BarChart3, Settings, ChevronsRight, ChevronsLeft, ChevronRight, Check, Circle, Sun, Monitor, Moon, Search, Command, Bell, User, LogOut } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { c as cn } from "./utils-H80jjgLf.js";
import { u as useAuth } from "./store-pMakjgCj.js";
import { B as Button } from "./button-BC9oXVxV.js";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { A as Avatar, a as AvatarFallback } from "./avatar-BJDbbUeP.js";
import { u as useTheme } from "./router-BZ_3uC9N.js";
import "clsx";
import "tailwind-merge";
import "zustand";
import "zustand/middleware";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-avatar";
import "@tanstack/react-query";
import "sonner";
const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/employees", label: "Employees", icon: Users },
  { to: "/sites", label: "Sites", icon: MapPin },
  { to: "/attendance", label: "Attendance", icon: ClockArrowUp },
  { to: "/tasks", label: "Tasks", icon: KanbanSquare },
  { to: "/assets", label: "Assets", icon: Boxes },
  { to: "/maintenance", label: "Maintenance", icon: Wrench },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings }
];
function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsxs(
    motion.aside,
    {
      animate: { width: collapsed ? 72 : 248 },
      transition: { type: "spring", stiffness: 260, damping: 30 },
      className: "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex overflow-hidden",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex h-16 items-center gap-2.5 px-4 border-b border-sidebar-border", children: [
          /* @__PURE__ */ jsx("div", { className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-glow", children: /* @__PURE__ */ jsx(Zap, { className: "h-4 w-4" }) }),
          !collapsed && /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -4 },
              animate: { opacity: 1, x: 0 },
              className: "min-w-0",
              children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold tracking-tight truncate", children: "PowerFuse" }),
                /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-[0.14em] text-sidebar-foreground/55", children: "Enterprise OS" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("nav", { className: "flex-1 overflow-y-auto px-2.5 py-4 space-y-0.5", children: nav.map((item, i) => {
          const active = pathname === item.to || pathname.startsWith(item.to + "/");
          const Icon = item.icon;
          return /* @__PURE__ */ jsxs(
            Link,
            {
              to: item.to,
              className: cn(
                "group relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors",
                active ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/75 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/60",
                collapsed && "justify-center"
              ),
              title: collapsed ? item.label : void 0,
              children: [
                active && /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    layoutId: "sidebar-active",
                    className: "absolute inset-0 rounded-lg bg-sidebar-accent",
                    transition: { type: "spring", stiffness: 400, damping: 32 }
                  }
                ),
                /* @__PURE__ */ jsx(Icon, { className: cn("relative h-4 w-4 shrink-0", active && "text-primary") }),
                !collapsed && /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { delay: i * 0.015 },
                    className: "relative truncate font-medium",
                    children: item.label
                  }
                )
              ]
            },
            item.to
          );
        }) }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setCollapsed((c) => !c),
            className: "flex items-center gap-2 border-t border-sidebar-border px-4 py-3 text-xs text-sidebar-foreground/65 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground transition-colors",
            children: [
              collapsed ? /* @__PURE__ */ jsx(ChevronsRight, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ChevronsLeft, { className: "h-4 w-4" }),
              !collapsed && /* @__PURE__ */ jsx("span", { children: "Collapse" })
            ]
          }
        )
      ]
    }
  );
}
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const options = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "system", icon: Monitor, label: "System" },
  { value: "dark", icon: Moon, label: "Dark" }
];
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return /* @__PURE__ */ jsx("div", { className: "relative inline-flex items-center rounded-full border border-border bg-muted/60 p-0.5", children: options.map((o) => {
    const Icon = o.icon;
    const active = theme === o.value;
    return /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setTheme(o.value),
        "aria-label": `${o.label} theme`,
        className: cn(
          "relative grid h-7 w-7 place-items-center rounded-full transition-colors",
          active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        ),
        children: [
          active && /* @__PURE__ */ jsx(
            motion.span,
            {
              layoutId: "theme-active",
              className: "absolute inset-0 rounded-full bg-background shadow-soft",
              transition: { type: "spring", stiffness: 500, damping: 35 }
            }
          ),
          /* @__PURE__ */ jsx(Icon, { className: "relative h-3.5 w-3.5" })
        ]
      },
      o.value
    );
  }) });
}
const titleMap = {
  dashboard: "Dashboard",
  employees: "Employees",
  sites: "Sites",
  attendance: "Attendance",
  tasks: "Tasks",
  assets: "Assets",
  maintenance: "Maintenance",
  reports: "Reports",
  settings: "Settings"
};
function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);
  const segments = pathname.split("/").filter(Boolean);
  const initials = (user?.name || "U").split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/60 glass px-4 md:px-6", children: [
    /* @__PURE__ */ jsxs("nav", { className: "flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "font-medium text-foreground/70 hover:text-foreground transition-colors", children: "PowerFuse" }),
      segments.map((seg, i) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 min-w-0", children: [
        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground/40", children: "/" }),
        /* @__PURE__ */ jsx("span", { className: "truncate font-medium text-foreground", children: titleMap[seg] ?? seg })
      ] }, i))
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
      /* @__PURE__ */ jsxs("button", { className: "hidden md:flex h-9 w-72 items-center gap-2 rounded-full border border-border bg-muted/50 px-3.5 text-sm text-muted-foreground hover:bg-muted transition-colors", children: [
        /* @__PURE__ */ jsx(Search, { className: "h-3.5 w-3.5" }),
        /* @__PURE__ */ jsx("span", { className: "flex-1 text-left", children: "Search anything…" }),
        /* @__PURE__ */ jsxs("kbd", { className: "flex items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium", children: [
          /* @__PURE__ */ jsx(Command, { className: "h-2.5 w-2.5" }),
          "K"
        ] })
      ] }),
      /* @__PURE__ */ jsx(ThemeToggle, {}),
      /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", className: "h-9 w-9 rounded-full relative", children: [
        /* @__PURE__ */ jsx(Bell, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary" })
      ] }),
      /* @__PURE__ */ jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx("button", { className: "flex items-center gap-2 rounded-full p-0.5 hover:bg-accent transition-colors", children: /* @__PURE__ */ jsx(Avatar, { className: "h-8 w-8", children: /* @__PURE__ */ jsx(AvatarFallback, { className: "gradient-primary text-primary-foreground text-xs font-semibold", children: initials }) }) }) }),
        /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", className: "w-56 rounded-xl", children: [
          /* @__PURE__ */ jsxs(DropdownMenuLabel, { children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: user?.name }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground font-normal", children: user?.email })
          ] }),
          /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: () => navigate({ to: "/settings" }), children: [
            /* @__PURE__ */ jsx(User, { className: "mr-2 h-4 w-4" }),
            " Profile"
          ] }),
          /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: () => {
            logout();
            navigate({ to: "/login" });
          }, children: [
            /* @__PURE__ */ jsx(LogOut, { className: "mr-2 h-4 w-4" }),
            " Sign out"
          ] })
        ] })
      ] })
    ] })
  ] });
}
function AppLayout() {
  const token = useAuth((s) => s.token);
  const pathname = useRouterState({
    select: (s) => s.location.pathname
  });
  if (!token) return /* @__PURE__ */ jsx(Navigate, { to: "/login" });
  return /* @__PURE__ */ jsxs("div", { "data-theme-root": true, className: "flex min-h-screen w-full bg-background text-foreground", children: [
    /* @__PURE__ */ jsx(Sidebar, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-1 flex-col", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("main", { className: "flex-1 p-4 md:p-6 lg:p-8", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(motion.div, { initial: {
        opacity: 0,
        y: 8,
        filter: "blur(4px)"
      }, animate: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)"
      }, exit: {
        opacity: 0,
        y: -4,
        filter: "blur(4px)"
      }, transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }, children: /* @__PURE__ */ jsx(Outlet, {}) }, pathname) }) })
    ] })
  ] });
}
export {
  AppLayout as component
};
