import { jsx, jsxs } from "react/jsx-runtime";
import { C as Card } from "./card-RGlIzTYo.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { P as PageHeader } from "./PageHeader-D-FhfjCH.js";
import { useState, useRef, useEffect } from "react";
import { a as useData } from "./store-pMakjgCj.js";
import { Users, MapPin, ClockArrowUp, ListChecks, CheckCircle2, Boxes, TrendingUp, TrendingDown } from "lucide-react";
import { isToday, format } from "date-fns";
import { motion } from "framer-motion";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "zustand";
import "zustand/middleware";
function AnimatedCounter({ value, duration = 900 }) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef(null);
  const fromRef = useRef(0);
  useEffect(() => {
    fromRef.current = display;
    startRef.current = null;
    let raf = 0;
    const tick = (t) => {
      if (startRef.current === null) startRef.current = t;
      const p = Math.min(1, (t - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(fromRef.current + (value - fromRef.current) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return /* @__PURE__ */ jsx("span", { className: "tabular-nums", children: display });
}
function DashboardPage() {
  const {
    employees,
    sites,
    attendance,
    tasks,
    assets
  } = useData();
  const todaysAttendance = attendance.filter((a) => isToday(new Date(a.checkIn)));
  const openTasks = tasks.filter((t) => t.status !== "done");
  const completedTasks = tasks.filter((t) => t.status === "done");
  const kpis = [{
    label: "Total Employees",
    value: employees.length,
    delta: "+2",
    up: true,
    icon: Users,
    tint: "from-blue-500/15 to-blue-500/0",
    iconClass: "text-info"
  }, {
    label: "Active Sites",
    value: sites.filter((s) => s.status === "active").length,
    delta: "+1",
    up: true,
    icon: MapPin,
    tint: "from-indigo-500/15 to-indigo-500/0",
    iconClass: "text-primary"
  }, {
    label: "Today's Attendance",
    value: todaysAttendance.length,
    delta: `${Math.round(todaysAttendance.length / Math.max(employees.length, 1) * 100)}%`,
    up: true,
    icon: ClockArrowUp,
    tint: "from-emerald-500/15 to-emerald-500/0",
    iconClass: "text-success"
  }, {
    label: "Open Tasks",
    value: openTasks.length,
    delta: "-3",
    up: false,
    icon: ListChecks,
    tint: "from-amber-500/15 to-amber-500/0",
    iconClass: "text-warning"
  }, {
    label: "Completed Tasks",
    value: completedTasks.length,
    delta: "+8",
    up: true,
    icon: CheckCircle2,
    tint: "from-emerald-500/15 to-emerald-500/0",
    iconClass: "text-success"
  }, {
    label: "Assets Tracked",
    value: assets.length,
    delta: "+0",
    up: true,
    icon: Boxes,
    tint: "from-violet-500/15 to-violet-500/0",
    iconClass: "text-primary"
  }];
  const recent = [...attendance.slice(0, 3).map((a) => ({
    t: a.checkIn,
    text: `${a.employeeName} checked in at ${a.siteName}`,
    kind: "attendance"
  })), ...tasks.slice(0, 3).map((t) => ({
    t: t.createdAt,
    text: `Task "${t.title}" assigned to ${t.assigneeName}`,
    kind: "task"
  }))].sort((a, b) => +new Date(b.t) - +new Date(a.t)).slice(0, 6);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Dashboard", description: "Operational snapshot across your organization." }),
    /* @__PURE__ */ jsx(motion.div, { initial: "hidden", animate: "show", variants: {
      hidden: {},
      show: {
        transition: {
          staggerChildren: 0.05
        }
      }
    }, className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3", children: kpis.map((k) => {
      const Icon = k.icon;
      return /* @__PURE__ */ jsx(motion.div, { variants: {
        hidden: {
          opacity: 0,
          y: 12
        },
        show: {
          opacity: 1,
          y: 0
        }
      }, transition: {
        type: "spring",
        stiffness: 260,
        damping: 24
      }, children: /* @__PURE__ */ jsxs(Card, { className: "relative overflow-hidden p-5 hover-lift border-border/60", children: [
        /* @__PURE__ */ jsx("div", { className: `pointer-events-none absolute inset-0 bg-gradient-to-br ${k.tint}` }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("div", { className: `grid h-9 w-9 place-items-center rounded-xl bg-background/80 border border-border/60 ${k.iconClass}`, children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "gap-1 rounded-full px-2 text-[10px] font-medium", children: [
            k.up ? /* @__PURE__ */ jsx(TrendingUp, { className: "h-3 w-3 text-success" }) : /* @__PURE__ */ jsx(TrendingDown, { className: "h-3 w-3 text-destructive" }),
            k.delta
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "relative mt-4 text-3xl font-semibold tracking-tight", children: /* @__PURE__ */ jsx(AnimatedCounter, { value: k.value }) }),
        /* @__PURE__ */ jsx("div", { className: "relative mt-0.5 text-xs text-muted-foreground", children: k.label })
      ] }) }, k.label);
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsx(motion.div, { initial: {
        opacity: 0,
        y: 16
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.25,
        type: "spring",
        stiffness: 220,
        damping: 26
      }, className: "lg:col-span-2", children: /* @__PURE__ */ jsxs(Card, { className: "p-6 border-border/60", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold tracking-tight", children: "Task pipeline" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Distribution across statuses" })
          ] }),
          /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "rounded-full", children: [
            tasks.length,
            " total"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: ["todo", "in_progress", "review", "done"].map((s) => {
          const count = tasks.filter((t) => t.status === s).length;
          const pct = Math.round(count / Math.max(tasks.length, 1) * 100);
          const labels = {
            todo: "To do",
            in_progress: "In progress",
            review: "In review",
            done: "Done"
          };
          const colors = {
            todo: "bg-muted-foreground/50",
            in_progress: "bg-info",
            review: "bg-warning",
            done: "bg-success"
          };
          return /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs mb-2", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: labels[s] }),
              /* @__PURE__ */ jsxs("span", { className: "tabular-nums text-muted-foreground", children: [
                count,
                " · ",
                pct,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsx(motion.div, { initial: {
              width: 0
            }, animate: {
              width: `${pct}%`
            }, transition: {
              delay: 0.4,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }, className: `h-full rounded-full ${colors[s]}` }) })
          ] }, s);
        }) })
      ] }) }),
      /* @__PURE__ */ jsx(motion.div, { initial: {
        opacity: 0,
        y: 16
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.3,
        type: "spring",
        stiffness: 220,
        damping: 26
      }, children: /* @__PURE__ */ jsxs(Card, { className: "p-6 border-border/60", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold tracking-tight mb-1", children: "Recent activity" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Latest events from across sites" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-3.5", children: recent.map((r, i) => /* @__PURE__ */ jsxs(motion.li, { initial: {
          opacity: 0,
          x: -6
        }, animate: {
          opacity: 1,
          x: 0
        }, transition: {
          delay: 0.4 + i * 0.05
        }, className: "flex gap-3 text-sm", children: [
          /* @__PURE__ */ jsx("div", { className: `mt-1.5 h-2 w-2 shrink-0 rounded-full ring-4 ${r.kind === "attendance" ? "bg-success ring-success/15" : "bg-info ring-info/15"}` }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("div", { className: "truncate", children: r.text }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: format(new Date(r.t), "MMM d, p") })
          ] })
        ] }, i)) })
      ] }) })
    ] })
  ] });
}
export {
  DashboardPage as component
};
