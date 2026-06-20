import { jsx, jsxs } from "react/jsx-runtime";
import { P as PageHeader } from "./PageHeader-D-FhfjCH.js";
import { u as useAuth } from "./store-pMakjgCj.js";
import { C as Card } from "./card-RGlIzTYo.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { B as Button } from "./button-BC9oXVxV.js";
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { c as cn } from "./utils-H80jjgLf.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-BJDbbUeP.js";
import { toast } from "sonner";
import "framer-motion";
import "zustand";
import "zustand/middleware";
import "@radix-ui/react-label";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-avatar";
const Switch = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SwitchPrimitives.Root,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsx(
      SwitchPrimitives.Thumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = SwitchPrimitives.Root.displayName;
function SettingsPage() {
  const user = useAuth((s) => s.user);
  const initials = (user?.name || "U").split(" ").map((p) => p[0]).slice(0, 2).join("");
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Settings", description: "Profile and workspace preferences." }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxs(Card, { className: "lg:col-span-2 p-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold mb-4", children: "Profile" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
          /* @__PURE__ */ jsx(Avatar, { className: "h-16 w-16", children: /* @__PURE__ */ jsx(AvatarFallback, { className: "bg-primary text-primary-foreground", children: initials }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-semibold", children: user?.name }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground capitalize", children: user?.role })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
          e.preventDefault();
          toast.success("Profile updated");
        }, className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Name" }),
            /* @__PURE__ */ jsx(Input, { defaultValue: user?.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Email" }),
            /* @__PURE__ */ jsx(Input, { defaultValue: user?.email })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsx(Button, { type: "submit", children: "Save changes" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "p-6 space-y-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold", children: "Preferences" }),
        /* @__PURE__ */ jsx(Row, { label: "Email notifications", defaultChecked: true }),
        /* @__PURE__ */ jsx(Row, { label: "Slack alerts for urgent tasks" }),
        /* @__PURE__ */ jsx(Row, { label: "Weekly ops digest", defaultChecked: true }),
        /* @__PURE__ */ jsx(Row, { label: "Dark mode (preview)" })
      ] })
    ] })
  ] });
}
function Row({
  label,
  defaultChecked
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsx("span", { className: "text-sm", children: label }),
    /* @__PURE__ */ jsx(Switch, { defaultChecked })
  ] });
}
export {
  SettingsPage as component
};
