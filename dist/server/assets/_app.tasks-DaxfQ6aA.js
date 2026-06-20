import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { P as PageHeader } from "./PageHeader-D-FhfjCH.js";
import { a as useData } from "./store-pMakjgCj.js";
import { C as Card } from "./card-RGlIzTYo.js";
import { B as Button } from "./button-BC9oXVxV.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { I as Input } from "./input-C0QjszdI.js";
import { T as Textarea } from "./textarea-DSyJ1nlY.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogFooter } from "./dialog-DjVQhB97.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.js";
import { S as Sheet, a as SheetContent, b as SheetHeader, c as SheetTitle } from "./sheet-B03VuLCM.js";
import { Plus, User, MapPin, Calendar } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "framer-motion";
import "zustand";
import "zustand/middleware";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
import "@radix-ui/react-dialog";
import "@radix-ui/react-select";
const columns = [{
  id: "todo",
  label: "To do",
  accent: "bg-muted-foreground/40"
}, {
  id: "in_progress",
  label: "In progress",
  accent: "bg-info"
}, {
  id: "review",
  label: "Review",
  accent: "bg-warning"
}, {
  id: "done",
  label: "Done",
  accent: "bg-success"
}];
const priorityColor = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-info/15 text-info border-info/20",
  high: "bg-warning/15 text-warning-foreground border-warning/20",
  urgent: "bg-destructive/15 text-destructive border-destructive/30"
};
function TasksPage() {
  const {
    tasks,
    employees,
    sites,
    addTask,
    updateTaskStatus
  } = useData();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [dragId, setDragId] = useState(null);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Tasks", description: "Plan, assign and track field work across sites.", actions: /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-1.5" }),
        " New task"
      ] }) }),
      /* @__PURE__ */ jsx(TaskDialog, { employees, sites, onSubmit: (data) => {
        addTask(data);
        setOpen(false);
        toast.success("Task created");
      } })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4", children: columns.map((col) => {
      const colTasks = tasks.filter((t) => t.status === col.id);
      return /* @__PURE__ */ jsxs("div", { onDragOver: (e) => e.preventDefault(), onDrop: () => {
        if (dragId) {
          updateTaskStatus(dragId, col.id);
          setDragId(null);
          toast.success(`Moved to ${col.label}`);
        }
      }, className: "rounded-lg border border-border bg-muted/30 p-3 min-h-[60vh]", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between px-1 mb-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: `h-2 w-2 rounded-full ${col.accent}` }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: col.label }),
          /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "text-[10px] h-5", children: colTasks.length })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          colTasks.map((t) => /* @__PURE__ */ jsxs(Card, { draggable: true, onDragStart: () => setDragId(t.id), onClick: () => setActive(t), className: "p-3 cursor-pointer hover:border-primary/40 hover:shadow-sm transition-all", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-[10px] text-muted-foreground", children: [
              /* @__PURE__ */ jsx("span", { children: t.id }),
              /* @__PURE__ */ jsx(Badge, { variant: "outline", className: `capitalize text-[10px] h-5 ${priorityColor[t.priority]}`, children: t.priority })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-1.5 text-sm font-medium leading-snug", children: t.title }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsx("span", { className: "truncate", children: t.assigneeName }),
              /* @__PURE__ */ jsx("span", { className: "tabular-nums", children: format(new Date(t.dueDate), "MMM d") })
            ] })
          ] }, t.id)),
          colTasks.length === 0 && /* @__PURE__ */ jsx("div", { className: "rounded-md border border-dashed border-border py-8 text-center text-xs text-muted-foreground", children: "No tasks" })
        ] })
      ] }, col.id);
    }) }),
    /* @__PURE__ */ jsx(Sheet, { open: !!active, onOpenChange: (v) => !v && setActive(null), children: /* @__PURE__ */ jsx(SheetContent, { className: "w-full sm:max-w-lg overflow-y-auto", children: active && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(SheetHeader, { children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: active.id }),
        /* @__PURE__ */ jsx(SheetTitle, { className: "text-xl", children: active.title })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsx(Badge, { variant: "outline", className: `capitalize ${priorityColor[active.priority]}`, children: active.priority }),
          /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "capitalize", children: active.status.replace("_", " ") })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: active.description }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-md border border-border divide-y", children: [
          /* @__PURE__ */ jsx(Meta, { icon: User, label: "Assignee", value: active.assigneeName }),
          /* @__PURE__ */ jsx(Meta, { icon: MapPin, label: "Site", value: active.siteName ?? "—" }),
          /* @__PURE__ */ jsx(Meta, { icon: Calendar, label: "Due", value: format(new Date(active.dueDate), "PPP") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Update status" }),
          /* @__PURE__ */ jsxs(Select, { value: active.status, onValueChange: (v) => {
            updateTaskStatus(active.id, v);
            setActive({
              ...active,
              status: v
            });
          }, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsx(SelectContent, { children: columns.map((c) => /* @__PURE__ */ jsx(SelectItem, { value: c.id, children: c.label }, c.id)) })
          ] })
        ] })
      ] })
    ] }) }) })
  ] });
}
function Meta({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-3 py-2.5 text-sm", children: [
    /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4 text-muted-foreground" }),
    /* @__PURE__ */ jsx("span", { className: "text-muted-foreground w-20", children: label }),
    /* @__PURE__ */ jsx("span", { className: "font-medium", children: value })
  ] });
}
function TaskDialog({
  employees,
  sites,
  onSubmit
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    assigneeId: employees[0]?.id ?? "",
    assigneeName: employees[0]?.name ?? "",
    siteId: sites[0]?.id,
    siteName: sites[0]?.name,
    dueDate: new Date(Date.now() + 7 * 864e5).toISOString()
  });
  return /* @__PURE__ */ jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "New task" }) }),
    /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      onSubmit(form);
    }, className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Title" }),
        /* @__PURE__ */ jsx(Input, { required: true, value: form.title, onChange: (e) => setForm({
          ...form,
          title: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Description" }),
        /* @__PURE__ */ jsx(Textarea, { rows: 3, value: form.description, onChange: (e) => setForm({
          ...form,
          description: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Assignee" }),
          /* @__PURE__ */ jsxs(Select, { value: form.assigneeId, onValueChange: (v) => {
            const emp = employees.find((e) => e.id === v);
            setForm({
              ...form,
              assigneeId: v,
              assigneeName: emp?.name ?? ""
            });
          }, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsx(SelectContent, { children: employees.map((e) => /* @__PURE__ */ jsx(SelectItem, { value: e.id, children: e.name }, e.id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Site" }),
          /* @__PURE__ */ jsxs(Select, { value: form.siteId ?? "", onValueChange: (v) => {
            const s = sites.find((x) => x.id === v);
            setForm({
              ...form,
              siteId: v,
              siteName: s?.name
            });
          }, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsx(SelectContent, { children: sites.map((s) => /* @__PURE__ */ jsx(SelectItem, { value: s.id, children: s.name }, s.id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Priority" }),
          /* @__PURE__ */ jsxs(Select, { value: form.priority, onValueChange: (v) => setForm({
            ...form,
            priority: v
          }), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsx(SelectContent, { children: ["low", "medium", "high", "urgent"].map((p) => /* @__PURE__ */ jsx(SelectItem, { value: p, className: "capitalize", children: p }, p)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Due date" }),
          /* @__PURE__ */ jsx(Input, { type: "date", value: form.dueDate.slice(0, 10), onChange: (e) => setForm({
            ...form,
            dueDate: new Date(e.target.value).toISOString()
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { type: "submit", children: "Create task" }) })
    ] })
  ] });
}
export {
  TasksPage as component
};
