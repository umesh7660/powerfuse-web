import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { P as PageHeader } from "./PageHeader-D-FhfjCH.js";
import { u as useAuth, a as useData } from "./store-pMakjgCj.js";
import { C as Card } from "./card-RGlIzTYo.js";
import { B as Button } from "./button-BC9oXVxV.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-RrXKMtST.js";
import { isToday, format } from "date-fns";
import { LogIn, LogOut, MapPin } from "lucide-react";
import { toast } from "sonner";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "framer-motion";
import "zustand";
import "zustand/middleware";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-select";
function AttendancePage() {
  const user = useAuth((s) => s.user);
  const {
    employees,
    sites,
    attendance,
    checkIn,
    checkOut
  } = useData();
  const currentEmployee = employees[0];
  const [selectedSite, setSelectedSite] = useState(sites[0]?.id ?? "");
  const myOpen = useMemo(() => attendance.find((a) => a.employeeId === currentEmployee?.id && !a.checkOut), [attendance, currentEmployee]);
  const todayRecords = attendance.filter((a) => isToday(new Date(a.checkIn)));
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Attendance", description: `Signed in as ${user?.name} · acting on behalf of ${currentEmployee?.name}.` }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "lg:col-span-2 p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Current status" }),
            /* @__PURE__ */ jsxs("div", { className: "mt-1 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: `h-2.5 w-2.5 rounded-full ${myOpen ? "bg-success animate-pulse" : "bg-muted-foreground/40"}` }),
              /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold", children: myOpen ? "Checked in" : "Off duty" })
            ] }),
            myOpen && /* @__PURE__ */ jsxs("div", { className: "mt-1 text-sm text-muted-foreground", children: [
              "At ",
              myOpen.siteName,
              " · since ",
              format(new Date(myOpen.checkIn), "p")
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: !myOpen ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs(Select, { value: selectedSite, onValueChange: setSelectedSite, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "w-56", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsx(SelectContent, { children: sites.map((s) => /* @__PURE__ */ jsx(SelectItem, { value: s.id, children: s.name }, s.id)) })
            ] }),
            /* @__PURE__ */ jsxs(Button, { onClick: () => {
              if (!currentEmployee || !selectedSite) return;
              checkIn(currentEmployee.id, selectedSite);
              toast.success("Checked in");
            }, children: [
              /* @__PURE__ */ jsx(LogIn, { className: "h-4 w-4 mr-1.5" }),
              " Check in"
            ] })
          ] }) : /* @__PURE__ */ jsxs(Button, { variant: "secondary", onClick: () => {
            checkOut(myOpen.id);
            toast.success("Checked out");
          }, children: [
            /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4 mr-1.5" }),
            " Check out"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-md border border-dashed border-border bg-muted/30 p-4 text-xs text-muted-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }),
          "GPS location capture is mocked in this demo. Production will validate against site geofence radius."
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Today's stats" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsx(Stat, { label: "Checked in", value: todayRecords.length }),
          /* @__PURE__ */ jsx(Stat, { label: "Active", value: todayRecords.filter((r) => !r.checkOut).length }),
          /* @__PURE__ */ jsx(Stat, { label: "Completed", value: todayRecords.filter((r) => r.checkOut).length })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "p-3", children: [
      /* @__PURE__ */ jsx("div", { className: "px-2 py-2 text-sm font-semibold", children: "Attendance history" }),
      /* @__PURE__ */ jsx("div", { className: "rounded-md border border-border overflow-hidden", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Employee" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Site" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Check-in" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Check-out" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: attendance.map((a) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: a.employeeName }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-muted-foreground", children: a.siteName }),
          /* @__PURE__ */ jsx(TableCell, { className: "tabular-nums", children: format(new Date(a.checkIn), "MMM d, p") }),
          /* @__PURE__ */ jsx(TableCell, { className: "tabular-nums text-muted-foreground", children: a.checkOut ? format(new Date(a.checkOut), "MMM d, p") : "—" }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: a.checkOut ? "" : "bg-success/15 text-success", children: a.checkOut ? "Completed" : "Active" }) })
        ] }, a.id)) })
      ] }) })
    ] })
  ] });
}
function Stat({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-md border border-border bg-card p-3", children: [
    /* @__PURE__ */ jsx("div", { className: "text-xl font-semibold tabular-nums", children: value }),
    /* @__PURE__ */ jsx("div", { className: "text-[11px] text-muted-foreground", children: label })
  ] });
}
export {
  AttendancePage as component
};
