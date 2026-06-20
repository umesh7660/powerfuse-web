import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { C as Card } from "./card-RGlIzTYo.js";
import { I as Input } from "./input-C0QjszdI.js";
import { B as Button } from "./button-BC9oXVxV.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { Zap, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen grid place-items-center p-6 bg-background", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md p-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
      /* @__PURE__ */ jsx("div", { className: "grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx(Zap, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsx("div", { className: "font-semibold", children: "PowerFuse" })
    ] }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Reset your password" }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "We'll send a reset link to your work email." }),
    /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      toast.success("If that email exists, a reset link was sent.");
    }, className: "mt-6 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsx(Input, { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", children: "Send reset link" })
    ] }),
    /* @__PURE__ */ jsxs(Link, { to: "/login", className: "mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground", children: [
      /* @__PURE__ */ jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
      " Back to sign in"
    ] })
  ] }) });
}
export {
  ForgotPasswordPage as component
};
