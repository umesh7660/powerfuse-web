import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { useData } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { Plus, Calendar, MapPin, User } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import type { Task, TaskPriority, TaskStatus } from "@/lib/types";

export const Route = createFileRoute("/_app/tasks")({
  component: TasksPage,
});

const columns: { id: TaskStatus; label: string; accent: string }[] = [
  { id: "todo", label: "To do", accent: "bg-muted-foreground/40" },
  { id: "in_progress", label: "In progress", accent: "bg-info" },
  { id: "review", label: "Review", accent: "bg-warning" },
  { id: "done", label: "Done", accent: "bg-success" },
];

const priorityColor: Record<TaskPriority, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-info/15 text-info border-info/20",
  high: "bg-warning/15 text-warning-foreground border-warning/20",
  urgent: "bg-destructive/15 text-destructive border-destructive/30",
};

function TasksPage() {
  const { tasks, employees, sites, addTask, updateTaskStatus } = useData();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Task | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);

  return (
    <div>
      <PageHeader
        title="Tasks"
        description="Plan, assign and track field work across sites."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-1.5" /> New task</Button>
            </DialogTrigger>
            <TaskDialog
              employees={employees}
              sites={sites}
              onSubmit={(data) => { addTask(data); setOpen(false); toast.success("Task created"); }}
            />
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);
          return (
            <div
              key={col.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragId) {
                  updateTaskStatus(dragId, col.id);
                  setDragId(null);
                  toast.success(`Moved to ${col.label}`);
                }
              }}
              className="rounded-lg border border-border bg-muted/30 p-3 min-h-[60vh]"
            >
              <div className="flex items-center justify-between px-1 mb-3">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${col.accent}`} />
                  <span className="text-sm font-semibold">{col.label}</span>
                  <Badge variant="secondary" className="text-[10px] h-5">{colTasks.length}</Badge>
                </div>
              </div>
              <div className="space-y-2">
                {colTasks.map((t) => (
                  <Card
                    key={t.id}
                    draggable
                    onDragStart={() => setDragId(t.id)}
                    onClick={() => setActive(t)}
                    className="p-3 cursor-pointer hover:border-primary/40 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>{t.id}</span>
                      <Badge variant="outline" className={`capitalize text-[10px] h-5 ${priorityColor[t.priority]}`}>
                        {t.priority}
                      </Badge>
                    </div>
                    <div className="mt-1.5 text-sm font-medium leading-snug">{t.title}</div>
                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="truncate">{t.assigneeName}</span>
                      <span className="tabular-nums">{format(new Date(t.dueDate), "MMM d")}</span>
                    </div>
                  </Card>
                ))}
                {colTasks.length === 0 && (
                  <div className="rounded-md border border-dashed border-border py-8 text-center text-xs text-muted-foreground">
                    No tasks
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Sheet open={!!active} onOpenChange={(v) => !v && setActive(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {active && (
            <>
              <SheetHeader>
                <div className="text-xs text-muted-foreground">{active.id}</div>
                <SheetTitle className="text-xl">{active.title}</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className={`capitalize ${priorityColor[active.priority]}`}>{active.priority}</Badge>
                  <Badge variant="secondary" className="capitalize">{active.status.replace("_", " ")}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{active.description}</p>
                <div className="rounded-md border border-border divide-y">
                  <Meta icon={User} label="Assignee" value={active.assigneeName} />
                  <Meta icon={MapPin} label="Site" value={active.siteName ?? "—"} />
                  <Meta icon={Calendar} label="Due" value={format(new Date(active.dueDate), "PPP")} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Update status</Label>
                  <Select
                    value={active.status}
                    onValueChange={(v) => { updateTaskStatus(active.id, v as TaskStatus); setActive({ ...active, status: v as TaskStatus }); }}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {columns.map((c) => <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Meta({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 text-sm">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="text-muted-foreground w-20">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function TaskDialog({ employees, sites, onSubmit }: {
  employees: { id: string; name: string }[];
  sites: { id: string; name: string }[];
  onSubmit: (t: Omit<Task, "id" | "createdAt">) => void;
}) {
  const [form, setForm] = useState<Omit<Task, "id" | "createdAt">>({
    title: "", description: "", status: "todo", priority: "medium",
    assigneeId: employees[0]?.id ?? "", assigneeName: employees[0]?.name ?? "",
    siteId: sites[0]?.id, siteName: sites[0]?.name,
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString(),
  });
  return (
    <DialogContent>
      <DialogHeader><DialogTitle>New task</DialogTitle></DialogHeader>
      <form
        onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}
        className="space-y-3"
      >
        <div className="space-y-1.5">
          <Label className="text-xs">Title</Label>
          <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Description</Label>
          <Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Assignee</Label>
            <Select
              value={form.assigneeId}
              onValueChange={(v) => {
                const emp = employees.find((e) => e.id === v);
                setForm({ ...form, assigneeId: v, assigneeName: emp?.name ?? "" });
              }}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{employees.map((e) => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Site</Label>
            <Select
              value={form.siteId ?? ""}
              onValueChange={(v) => {
                const s = sites.find((x) => x.id === v);
                setForm({ ...form, siteId: v, siteName: s?.name });
              }}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{sites.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Priority</Label>
            <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v as TaskPriority })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {(["low", "medium", "high", "urgent"] as TaskPriority[]).map((p) =>
                  <SelectItem key={p} value={p} className="capitalize">{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Due date</Label>
            <Input
              type="date"
              value={form.dueDate.slice(0, 10)}
              onChange={(e) => setForm({ ...form, dueDate: new Date(e.target.value).toISOString() })}
            />
          </div>
        </div>
        <DialogFooter><Button type="submit">Create task</Button></DialogFooter>
      </form>
    </DialogContent>
  );
}
