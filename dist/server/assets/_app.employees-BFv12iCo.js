import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { P as PageHeader } from "./PageHeader-D-FhfjCH.js";
import { a as useData } from "./store-pMakjgCj.js";
import { B as Button } from "./button-BC9oXVxV.js";
import { I as Input } from "./input-C0QjszdI.js";
import { C as Card } from "./card-RGlIzTYo.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-RrXKMtST.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogFooter } from "./dialog-DjVQhB97.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.js";
import { Plus, Search, Pencil, Trash2, Users } from "lucide-react";
import { A as Avatar, a as AvatarFallback } from "./avatar-BJDbbUeP.js";
import { toast } from "sonner";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "framer-motion";
import "zustand";
import "zustand/middleware";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-dialog";
import "@radix-ui/react-label";
import "@radix-ui/react-select";
import "@radix-ui/react-avatar";
const roles = ["admin", "manager", "supervisor", "engineer"];
function EmployeesPage() {
  const {
    employees,
    sites,
    addEmployee,
    updateEmployee,
    deleteEmployee
  } = useData();
  const [q, setQ] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const filtered = employees.filter((e) => {
    const matchQ = !q || [e.name, e.email, e.id, e.department].some((v) => v.toLowerCase().includes(q.toLowerCase()));
    const matchRole = roleFilter === "all" || e.role === roleFilter;
    return matchQ && matchRole;
  });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Employees", description: `${employees.length} people across ${new Set(employees.map((e) => e.department)).size} departments.`, actions: /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: (v) => {
      setOpen(v);
      if (!v) setEditing(null);
    }, children: [
      /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-1.5" }),
        " Add employee"
      ] }) }),
      /* @__PURE__ */ jsx(EmployeeDialog, { employee: editing, sites, onSubmit: (data) => {
        if (editing) {
          updateEmployee(editing.id, data);
          toast.success("Employee updated");
        } else {
          addEmployee(data);
          toast.success("Employee added");
        }
        setOpen(false);
        setEditing(null);
      } })
    ] }) }),
    /* @__PURE__ */ jsxs(Card, { className: "p-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-w-[220px]", children: [
          /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsx(Input, { placeholder: "Search by name, email, ID…", className: "pl-8 h-9", value: q, onChange: (e) => setQ(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs(Select, { value: roleFilter, onValueChange: setRoleFilter, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-44 h-9", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Role" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All roles" }),
            roles.map((r) => /* @__PURE__ */ jsx(SelectItem, { value: r, className: "capitalize", children: r }, r))
          ] })
        ] })
      ] }),
      filtered.length === 0 ? /* @__PURE__ */ jsx(EmptyState, {}) : /* @__PURE__ */ jsx("div", { className: "rounded-md border border-border overflow-hidden", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Employee" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Role" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Department" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Site" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: filtered.map((e) => {
          const initials = e.name.split(" ").map((p) => p[0]).slice(0, 2).join("");
          const site = sites.find((s) => s.id === e.site);
          return /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(Avatar, { className: "h-8 w-8", children: /* @__PURE__ */ jsx(AvatarFallback, { className: "text-xs bg-secondary", children: initials }) }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx("div", { className: "font-medium truncate", children: e.name }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground truncate", children: e.email })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "capitalize", children: e.role }),
            /* @__PURE__ */ jsx(TableCell, { children: e.department }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-muted-foreground", children: site?.name ?? "—" }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: e.status === "active" ? "default" : "secondary", className: "capitalize", children: e.status }) }),
            /* @__PURE__ */ jsxs(TableCell, { className: "text-right", children: [
              /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8", onClick: () => {
                setEditing(e);
                setOpen(true);
              }, children: /* @__PURE__ */ jsx(Pencil, { className: "h-3.5 w-3.5" }) }),
              /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8 text-destructive", onClick: () => {
                if (confirm("Remove this employee?")) {
                  deleteEmployee(e.id);
                  toast.success("Employee removed");
                }
              }, children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" }) })
            ] })
          ] }, e.id);
        }) })
      ] }) })
    ] })
  ] });
}
function EmptyState() {
  return /* @__PURE__ */ jsxs("div", { className: "py-16 text-center", children: [
    /* @__PURE__ */ jsx(Users, { className: "mx-auto h-10 w-10 text-muted-foreground/50" }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "No employees match the current filters." })
  ] });
}
function EmployeeDialog({
  employee,
  sites,
  onSubmit
}) {
  const [form, setForm] = useState(() => ({
    name: employee?.name ?? "",
    email: employee?.email ?? "",
    phone: employee?.phone ?? "",
    role: employee?.role ?? "engineer",
    department: employee?.department ?? "Field Ops",
    site: employee?.site,
    status: employee?.status ?? "active",
    joinedAt: employee?.joinedAt ?? (/* @__PURE__ */ new Date()).toISOString()
  }));
  return /* @__PURE__ */ jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: employee ? "Edit employee" : "Add employee" }) }),
    /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      onSubmit(form);
    }, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsx(Field, { label: "Full name", children: /* @__PURE__ */ jsx(Input, { required: true, value: form.name, onChange: (e) => setForm({
          ...form,
          name: e.target.value
        }) }) }),
        /* @__PURE__ */ jsx(Field, { label: "Email", children: /* @__PURE__ */ jsx(Input, { type: "email", required: true, value: form.email, onChange: (e) => setForm({
          ...form,
          email: e.target.value
        }) }) }),
        /* @__PURE__ */ jsx(Field, { label: "Phone", children: /* @__PURE__ */ jsx(Input, { value: form.phone, onChange: (e) => setForm({
          ...form,
          phone: e.target.value
        }) }) }),
        /* @__PURE__ */ jsx(Field, { label: "Department", children: /* @__PURE__ */ jsx(Input, { value: form.department, onChange: (e) => setForm({
          ...form,
          department: e.target.value
        }) }) }),
        /* @__PURE__ */ jsx(Field, { label: "Role", children: /* @__PURE__ */ jsxs(Select, { value: form.role, onValueChange: (v) => setForm({
          ...form,
          role: v
        }), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsx(SelectContent, { children: roles.map((r) => /* @__PURE__ */ jsx(SelectItem, { value: r, className: "capitalize", children: r }, r)) })
        ] }) }),
        /* @__PURE__ */ jsx(Field, { label: "Site", children: /* @__PURE__ */ jsxs(Select, { value: form.site ?? "none", onValueChange: (v) => setForm({
          ...form,
          site: v === "none" ? void 0 : v
        }), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "none", children: "Unassigned" }),
            sites.map((s) => /* @__PURE__ */ jsx(SelectItem, { value: s.id, children: s.name }, s.id))
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { type: "submit", children: employee ? "Save changes" : "Create employee" }) })
    ] })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsx(Label, { className: "text-xs", children: label }),
    children
  ] });
}
export {
  EmployeesPage as component
};
