import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { P as PageHeader } from "./PageHeader-D-FhfjCH.js";
import { a as useData } from "./store-pMakjgCj.js";
import { C as Card } from "./card-RGlIzTYo.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { I as Input } from "./input-C0QjszdI.js";
import { S as Sheet, a as SheetContent, b as SheetHeader, c as SheetTitle } from "./sheet-B03VuLCM.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-RrXKMtST.js";
import { Search, Boxes, Wrench, QrCode } from "lucide-react";
import { format } from "date-fns";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "framer-motion";
import "zustand";
import "zustand/middleware";
import "class-variance-authority";
import "@radix-ui/react-dialog";
const statusStyle = {
  operational: "bg-success/15 text-success border-success/20",
  maintenance: "bg-warning/15 text-warning-foreground border-warning/20",
  retired: "bg-muted text-muted-foreground"
};
function AssetsPage() {
  const {
    assets,
    maintenance
  } = useData();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(null);
  const filtered = assets.filter((a) => !q || [a.name, a.id, a.serial, a.siteName, a.category].some((v) => v.toLowerCase().includes(q.toLowerCase())));
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Assets", description: `${assets.length} assets tracked across sites.` }),
    /* @__PURE__ */ jsxs(Card, { className: "p-3", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 mb-3", children: /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsx(Input, { placeholder: "Search assets…", className: "pl-8 h-9", value: q, onChange: (e) => setQ(e.target.value) })
      ] }) }),
      filtered.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "py-16 text-center", children: [
        /* @__PURE__ */ jsx(Boxes, { className: "mx-auto h-10 w-10 text-muted-foreground/50" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "No assets found." })
      ] }) : /* @__PURE__ */ jsx("div", { className: "rounded-md border border-border overflow-hidden", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Asset" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Category" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Serial" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Site" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsx(TableHead, {})
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: filtered.map((a) => {
          const logCount = maintenance.filter((m) => m.assetId === a.id).length;
          return /* @__PURE__ */ jsxs(TableRow, { className: "cursor-pointer", onClick: () => setActive(a), children: [
            /* @__PURE__ */ jsxs(TableCell, { children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: a.name }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: a.id })
            ] }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-muted-foreground", children: a.category }),
            /* @__PURE__ */ jsx(TableCell, { className: "font-mono text-xs", children: a.serial }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-muted-foreground", children: a.siteName }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: "outline", className: `capitalize ${statusStyle[a.status]}`, children: a.status }) }),
            /* @__PURE__ */ jsxs(TableCell, { className: "text-right text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsx(Wrench, { className: "inline h-3.5 w-3.5 mr-1" }),
              logCount
            ] })
          ] }, a.id);
        }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Sheet, { open: !!active, onOpenChange: (v) => !v && setActive(null), children: /* @__PURE__ */ jsx(SheetContent, { className: "w-full sm:max-w-lg overflow-y-auto", children: active && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(SheetHeader, { children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: active.id }),
        /* @__PURE__ */ jsx(SheetTitle, { children: active.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-4", children: [
        /* @__PURE__ */ jsxs(Card, { className: "p-4 flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "grid h-20 w-20 place-items-center rounded-md bg-foreground text-background", children: /* @__PURE__ */ jsx(QrCode, { className: "h-12 w-12" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "QR code" }),
            /* @__PURE__ */ jsx("div", { className: "font-mono text-sm font-semibold", children: active.qr }),
            /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: "Scan to log maintenance" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-md border border-border divide-y text-sm", children: [
          /* @__PURE__ */ jsx(Row, { label: "Category", value: active.category }),
          /* @__PURE__ */ jsx(Row, { label: "Serial", value: active.serial, mono: true }),
          /* @__PURE__ */ jsx(Row, { label: "Site", value: active.siteName }),
          /* @__PURE__ */ jsx(Row, { label: "Status", value: active.status, cap: true }),
          /* @__PURE__ */ jsx(Row, { label: "Purchased", value: format(new Date(active.purchasedAt), "PPP") })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold mb-2", children: "Maintenance history" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
            maintenance.filter((m) => m.assetId === active.id).map((m) => /* @__PURE__ */ jsxs("li", { className: "rounded-md border border-border p-3 text-sm", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "capitalize", children: m.type }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: format(new Date(m.performedAt), "MMM d, yyyy") })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-2 text-muted-foreground", children: m.notes }),
              /* @__PURE__ */ jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
                "By ",
                m.performedBy,
                " · ₹",
                m.cost.toLocaleString()
              ] })
            ] }, m.id)),
            maintenance.filter((m) => m.assetId === active.id).length === 0 && /* @__PURE__ */ jsx("li", { className: "text-xs text-muted-foreground", children: "No maintenance logged." })
          ] })
        ] })
      ] })
    ] }) }) })
  ] });
}
function Row({
  label,
  value,
  mono,
  cap
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-3 py-2", children: [
    /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("span", { className: `${mono ? "font-mono text-xs" : ""} ${cap ? "capitalize" : ""}`, children: value })
  ] });
}
export {
  AssetsPage as component
};
