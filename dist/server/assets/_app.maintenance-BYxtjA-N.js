import { jsxs, jsx } from "react/jsx-runtime";
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
import { Plus, Wrench } from "lucide-react";
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
const typeAccent = {
  preventive: "bg-info",
  corrective: "bg-destructive",
  inspection: "bg-success"
};
function MaintenancePage() {
  const {
    assets,
    maintenance,
    addMaintenance
  } = useData();
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Maintenance", description: "Timeline of preventive, corrective and inspection logs.", actions: /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-1.5" }),
        " Add log"
      ] }) }),
      /* @__PURE__ */ jsx(MaintenanceDialog, { assets, onSubmit: (data) => {
        addMaintenance(data);
        setOpen(false);
        toast.success("Maintenance logged");
      } })
    ] }) }),
    /* @__PURE__ */ jsx(Card, { className: "p-6", children: maintenance.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "py-16 text-center", children: [
      /* @__PURE__ */ jsx(Wrench, { className: "mx-auto h-10 w-10 text-muted-foreground/50" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "No maintenance records yet." })
    ] }) : /* @__PURE__ */ jsx("ol", { className: "relative border-l border-border ml-3 space-y-6", children: maintenance.map((m) => /* @__PURE__ */ jsxs("li", { className: "ml-6", children: [
      /* @__PURE__ */ jsx("span", { className: `absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full ring-4 ring-background ${typeAccent[m.type]}` }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "capitalize", children: m.type }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: m.assetName }),
        /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "· ",
          format(new Date(m.performedAt), "PPP")
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-sm text-muted-foreground", children: m.notes }),
      /* @__PURE__ */ jsxs("div", { className: "mt-2 text-xs text-muted-foreground", children: [
        "Performed by ",
        /* @__PURE__ */ jsx("span", { className: "text-foreground", children: m.performedBy }),
        " ·",
        " ",
        "Cost ",
        /* @__PURE__ */ jsxs("span", { className: "text-foreground tabular-nums", children: [
          "₹",
          m.cost.toLocaleString()
        ] })
      ] })
    ] }, m.id)) }) })
  ] });
}
function MaintenanceDialog({
  assets,
  onSubmit
}) {
  const [form, setForm] = useState({
    assetId: assets[0]?.id ?? "",
    assetName: assets[0]?.name ?? "",
    type: "preventive",
    performedBy: "",
    notes: "",
    cost: 0,
    performedAt: (/* @__PURE__ */ new Date()).toISOString()
  });
  return /* @__PURE__ */ jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Add maintenance log" }) }),
    /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      onSubmit(form);
    }, className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Asset" }),
        /* @__PURE__ */ jsxs(Select, { value: form.assetId, onValueChange: (v) => {
          const a = assets.find((x) => x.id === v);
          setForm({
            ...form,
            assetId: v,
            assetName: a?.name ?? ""
          });
        }, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsx(SelectContent, { children: assets.map((a) => /* @__PURE__ */ jsx(SelectItem, { value: a.id, children: a.name }, a.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Type" }),
          /* @__PURE__ */ jsxs(Select, { value: form.type, onValueChange: (v) => setForm({
            ...form,
            type: v
          }), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "preventive", children: "Preventive" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "corrective", children: "Corrective" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "inspection", children: "Inspection" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Performed by" }),
          /* @__PURE__ */ jsx(Input, { required: true, value: form.performedBy, onChange: (e) => setForm({
            ...form,
            performedBy: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Cost (₹)" }),
          /* @__PURE__ */ jsx(Input, { type: "number", value: form.cost, onChange: (e) => setForm({
            ...form,
            cost: parseInt(e.target.value || "0", 10)
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Date" }),
          /* @__PURE__ */ jsx(Input, { type: "date", value: form.performedAt.slice(0, 10), onChange: (e) => setForm({
            ...form,
            performedAt: new Date(e.target.value).toISOString()
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Notes" }),
        /* @__PURE__ */ jsx(Textarea, { rows: 3, value: form.notes, onChange: (e) => setForm({
          ...form,
          notes: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { type: "submit", children: "Log maintenance" }) })
    ] })
  ] });
}
export {
  MaintenancePage as component
};
