import { jsxs, jsx } from "react/jsx-runtime";
import { P as PageHeader } from "./PageHeader-D-FhfjCH.js";
import { C as Card } from "./card-RGlIzTYo.js";
import { a as useData } from "./store-pMakjgCj.js";
import { BarChart3 } from "lucide-react";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "framer-motion";
import "react";
import "zustand";
import "zustand/middleware";
function ReportsPage() {
  const {
    tasks,
    employees,
    assets,
    maintenance
  } = useData();
  const totalSpend = maintenance.reduce((a, b) => a + b.cost, 0);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Reports", description: "Operational analytics — sample summary." }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4", children: [
      /* @__PURE__ */ jsx(Summary, { label: "Active workforce", value: employees.filter((e) => e.status === "active").length }),
      /* @__PURE__ */ jsx(Summary, { label: "Tasks completed", value: tasks.filter((t) => t.status === "done").length }),
      /* @__PURE__ */ jsx(Summary, { label: "Maintenance spend", value: `₹${totalSpend.toLocaleString()}` })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "p-16 text-center", children: [
      /* @__PURE__ */ jsx(BarChart3, { className: "mx-auto h-12 w-12 text-muted-foreground/40" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Detailed charts & exports coming soon." }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground/70", children: "Hook in Recharts when wiring real data sources." })
    ] })
  ] });
}
function Summary({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
    /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("div", { className: "mt-2 text-3xl font-semibold tabular-nums", children: value })
  ] });
}
export {
  ReportsPage as component
};
