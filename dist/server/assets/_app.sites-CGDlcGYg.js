import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { P as PageHeader } from "./PageHeader-D-FhfjCH.js";
import { a as useData } from "./store-pMakjgCj.js";
import { C as Card } from "./card-RGlIzTYo.js";
import { B as Button } from "./button-BC9oXVxV.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogFooter } from "./dialog-DjVQhB97.js";
import { Plus, MapPin, Radio, User } from "lucide-react";
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
function SitesPage() {
  const {
    sites,
    addSite
  } = useData();
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Sites", description: "Operational sites and their geofence configuration.", actions: /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-1.5" }),
        " Add site"
      ] }) }),
      /* @__PURE__ */ jsx(SiteDialog, { onSubmit: (data) => {
        addSite(data);
        toast.success("Site added");
        setOpen(false);
      } })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4", children: sites.map((s) => /* @__PURE__ */ jsxs(Card, { className: "p-5 hover:border-primary/40 transition-colors", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsx("span", { children: s.id }),
            /* @__PURE__ */ jsx("span", { children: "·" }),
            /* @__PURE__ */ jsx("span", { children: s.city })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "mt-1 font-semibold truncate", children: s.name })
        ] }),
        /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: s.status === "active" ? "bg-success/15 text-success border-success/20" : s.status === "paused" ? "bg-warning/15 text-warning-foreground border-warning/20" : "bg-muted", children: s.status })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-2 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsx("span", { className: "truncate", children: s.address })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsx(Radio, { className: "h-4 w-4 shrink-0" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Geofence radius: ",
            /* @__PURE__ */ jsxs("span", { className: "text-foreground tabular-nums", children: [
              s.radiusM,
              "m"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsx(User, { className: "h-4 w-4 shrink-0" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Supervisor: ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground", children: s.supervisor })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-md border border-border bg-muted/40 p-3 text-xs font-mono text-muted-foreground", children: [
        "GPS: ",
        s.lat.toFixed(4),
        ", ",
        s.lng.toFixed(4)
      ] })
    ] }, s.id)) })
  ] });
}
function SiteDialog({
  onSubmit
}) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    lat: 0,
    lng: 0,
    radiusM: 200,
    supervisor: "",
    status: "active"
  });
  return /* @__PURE__ */ jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Add site" }) }),
    /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      onSubmit(form);
    }, className: "space-y-3", children: [
      /* @__PURE__ */ jsx(Field, { label: "Name", children: /* @__PURE__ */ jsx(Input, { required: true, value: form.name, onChange: (e) => setForm({
        ...form,
        name: e.target.value
      }) }) }),
      /* @__PURE__ */ jsx(Field, { label: "Address", children: /* @__PURE__ */ jsx(Input, { value: form.address, onChange: (e) => setForm({
        ...form,
        address: e.target.value
      }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsx(Field, { label: "City", children: /* @__PURE__ */ jsx(Input, { value: form.city, onChange: (e) => setForm({
          ...form,
          city: e.target.value
        }) }) }),
        /* @__PURE__ */ jsx(Field, { label: "Supervisor", children: /* @__PURE__ */ jsx(Input, { value: form.supervisor, onChange: (e) => setForm({
          ...form,
          supervisor: e.target.value
        }) }) }),
        /* @__PURE__ */ jsx(Field, { label: "Latitude", children: /* @__PURE__ */ jsx(Input, { type: "number", step: "0.0001", value: form.lat, onChange: (e) => setForm({
          ...form,
          lat: parseFloat(e.target.value)
        }) }) }),
        /* @__PURE__ */ jsx(Field, { label: "Longitude", children: /* @__PURE__ */ jsx(Input, { type: "number", step: "0.0001", value: form.lng, onChange: (e) => setForm({
          ...form,
          lng: parseFloat(e.target.value)
        }) }) }),
        /* @__PURE__ */ jsx(Field, { label: "Radius (m)", children: /* @__PURE__ */ jsx(Input, { type: "number", value: form.radiusM, onChange: (e) => setForm({
          ...form,
          radiusM: parseInt(e.target.value, 10)
        }) }) })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { type: "submit", children: "Create site" }) })
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
  SitesPage as component
};
