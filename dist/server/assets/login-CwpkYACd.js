import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Navigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { u as useAuth } from "./store-pMakjgCj.js";
import { B as Button } from "./button-BC9oXVxV.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { C as Card } from "./card-RGlIzTYo.js";
import { Zap, Loader2 } from "lucide-react";
import { toast } from "sonner";
import "zustand";
import "zustand/middleware";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
function LoginPage() {
  const token = useAuth((s) => s.token);
  const login = useAuth((s) => s.login);
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@powerfuse.io");
  const [password, setPassword] = useState("demo1234");
  const [loading, setLoading] = useState(false);
  if (token) return /* @__PURE__ */ jsx(Navigate, { to: "/dashboard" });
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back");
      navigate({
        to: "/dashboard"
      });
    } catch {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen grid lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex flex-col justify-between bg-sidebar text-sidebar-foreground p-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx(Zap, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold", children: "PowerFuse" }),
          /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-wider opacity-60", children: "Enterprise OS" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 max-w-md", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold leading-tight", children: "Operate sites, teams and assets in one place." }),
        /* @__PURE__ */ jsx("p", { className: "text-sm opacity-75", children: "Built for electrical and infrastructure operators. Attendance, tasks, assets and maintenance — orchestrated end to end." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-xs opacity-50", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " PowerFuse Systems"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center p-6", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md p-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:hidden mb-6 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx(Zap, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsx("div", { className: "font-semibold", children: "PowerFuse" })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Sign in" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Use the prefilled demo credentials to explore." }),
      /* @__PURE__ */ jsxs("form", { onSubmit, className: "mt-6 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsx(Input, { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
            /* @__PURE__ */ jsx(Link, { to: "/forgot-password", className: "text-xs text-muted-foreground hover:text-foreground", children: "Forgot password?" })
          ] }),
          /* @__PURE__ */ jsx(Input, { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true })
        ] }),
        /* @__PURE__ */ jsxs(Button, { type: "submit", className: "w-full", disabled: loading, children: [
          loading && /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
          "Sign in"
        ] })
      ] })
    ] }) })
  ] });
}
export {
  LoginPage as component
};
