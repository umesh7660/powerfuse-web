import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { useData } from "@/lib/store";
import {
  Users, MapPin, ClockArrowUp, ListChecks, CheckCircle2, Boxes, TrendingUp, TrendingDown,
} from "lucide-react";
import { format, isToday } from "date-fns";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_app/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { employees, sites, attendance, tasks, assets } = useData();

  const todaysAttendance = attendance.filter((a) => isToday(new Date(a.checkIn)));
  const openTasks = tasks.filter((t) => t.status !== "done");
  const completedTasks = tasks.filter((t) => t.status === "done");

  const kpis = [
    { label: "Total Employees", value: employees.length, delta: "+2", up: true, icon: Users, tint: "from-blue-500/15 to-blue-500/0", iconClass: "text-info" },
    { label: "Active Sites", value: sites.filter((s) => s.status === "active").length, delta: "+1", up: true, icon: MapPin, tint: "from-indigo-500/15 to-indigo-500/0", iconClass: "text-primary" },
    { label: "Today's Attendance", value: todaysAttendance.length, delta: `${Math.round((todaysAttendance.length / Math.max(employees.length, 1)) * 100)}%`, up: true, icon: ClockArrowUp, tint: "from-emerald-500/15 to-emerald-500/0", iconClass: "text-success" },
    { label: "Open Tasks", value: openTasks.length, delta: "-3", up: false, icon: ListChecks, tint: "from-amber-500/15 to-amber-500/0", iconClass: "text-warning" },
    { label: "Completed Tasks", value: completedTasks.length, delta: "+8", up: true, icon: CheckCircle2, tint: "from-emerald-500/15 to-emerald-500/0", iconClass: "text-success" },
    { label: "Assets Tracked", value: assets.length, delta: "+0", up: true, icon: Boxes, tint: "from-violet-500/15 to-violet-500/0", iconClass: "text-primary" },
  ];

  const recent = [
    ...attendance.slice(0, 3).map((a) => ({
      t: a.checkIn,
      text: `${a.employeeName} checked in at ${a.siteName}`,
      kind: "attendance" as const,
    })),
    ...tasks.slice(0, 3).map((t) => ({
      t: t.createdAt,
      text: `Task "${t.title}" assigned to ${t.assigneeName}`,
      kind: "task" as const,
    })),
  ].sort((a, b) => +new Date(b.t) - +new Date(a.t)).slice(0, 6);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Operational snapshot across your organization."
      />

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3"
      >
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <motion.div
              key={k.label}
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <Card className="relative overflow-hidden p-5 hover-lift border-border/60">
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${k.tint}`} />
                <div className="relative flex items-center justify-between">
                  <div className={`grid h-9 w-9 place-items-center rounded-xl bg-background/80 border border-border/60 ${k.iconClass}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <Badge variant="secondary" className="gap-1 rounded-full px-2 text-[10px] font-medium">
                    {k.up ? <TrendingUp className="h-3 w-3 text-success" /> : <TrendingDown className="h-3 w-3 text-destructive" />}
                    {k.delta}
                  </Badge>
                </div>
                <div className="relative mt-4 text-3xl font-semibold tracking-tight">
                  <AnimatedCounter value={k.value} />
                </div>
                <div className="relative mt-0.5 text-xs text-muted-foreground">{k.label}</div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, type: "spring", stiffness: 220, damping: 26 }}
          className="lg:col-span-2"
        >
          <Card className="p-6 border-border/60">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-semibold tracking-tight">Task pipeline</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Distribution across statuses</p>
              </div>
              <Badge variant="secondary" className="rounded-full">{tasks.length} total</Badge>
            </div>
            <div className="space-y-4">
              {(["todo", "in_progress", "review", "done"] as const).map((s) => {
                const count = tasks.filter((t) => t.status === s).length;
                const pct = Math.round((count / Math.max(tasks.length, 1)) * 100);
                const labels = { todo: "To do", in_progress: "In progress", review: "In review", done: "Done" };
                const colors = { todo: "bg-muted-foreground/50", in_progress: "bg-info", review: "bg-warning", done: "bg-success" };
                return (
                  <div key={s}>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="font-medium">{labels[s]}</span>
                      <span className="tabular-nums text-muted-foreground">{count} · {pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className={`h-full rounded-full ${colors[s]}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 220, damping: 26 }}
        >
          <Card className="p-6 border-border/60">
            <h2 className="text-base font-semibold tracking-tight mb-1">Recent activity</h2>
            <p className="text-xs text-muted-foreground mb-4">Latest events from across sites</p>
            <ul className="space-y-3.5">
              {recent.map((r, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="flex gap-3 text-sm"
                >
                  <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ring-4 ${r.kind === "attendance" ? "bg-success ring-success/15" : "bg-info ring-info/15"}`} />
                  <div className="min-w-0">
                    <div className="truncate">{r.text}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{format(new Date(r.t), "MMM d, p")}</div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
