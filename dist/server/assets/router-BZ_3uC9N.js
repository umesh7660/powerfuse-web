import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, createContext, useContext } from "react";
import { Toaster as Toaster$1 } from "sonner";
const appCss = "/assets/styles-CZ1dTnMn.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const ThemeContext = createContext(null);
const STORAGE_KEY = "powerfuse-theme";
function getSystem() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function applyTheme(resolved) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
}
function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("system");
  const [resolved, setResolved] = useState("light");
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) ?? "system";
    setThemeState(stored);
  }, []);
  useEffect(() => {
    const r = theme === "system" ? getSystem() : theme;
    setResolved(r);
    applyTheme(r);
    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const onChange = () => {
        const next = mq.matches ? "dark" : "light";
        setResolved(next);
        applyTheme(next);
      };
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }
  }, [theme]);
  const setTheme = (t) => {
    localStorage.setItem(STORAGE_KEY, t);
    setThemeState(t);
  };
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { theme, resolved, setTheme }, children });
}
function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Page not found." }),
    /* @__PURE__ */ jsx("a", { href: "/", className: "mt-6 inline-block rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground", children: "Go home" })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  const router2 = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root" });
  }, [error]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold", children: "Something went wrong" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: error.message }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          router2.invalidate();
          reset();
        },
        className: "mt-6 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground",
        children: "Try again"
      }
    )
  ] }) });
}
const Route$d = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "PowerFuse Enterprise OS" },
      { name: "description", content: "All-in-one operational platform for electrical and infrastructure companies." },
      { property: "og:title", content: "PowerFuse Enterprise OS" },
      { property: "og:description", content: "Field ops, sites, assets, maintenance — unified." }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$d.useRouteContext();
  return /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(Toaster, { position: "top-right", richColors: true })
  ] }) });
}
const $$splitComponentImporter$c = () => import("./login-CwpkYACd.js");
const Route$c = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./forgot-password-BdX66G6C.js");
const Route$b = createFileRoute("/forgot-password")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./_app-DKIYkGpP.js");
const Route$a = createFileRoute("/_app")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./index-C1Cmf2YU.js");
const Route$9 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./_app.tasks-DaxfQ6aA.js");
const Route$8 = createFileRoute("/_app/tasks")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./_app.sites-CGDlcGYg.js");
const Route$7 = createFileRoute("/_app/sites")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./_app.settings-29E6fr-o.js");
const Route$6 = createFileRoute("/_app/settings")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./_app.reports-1GH2vx7V.js");
const Route$5 = createFileRoute("/_app/reports")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./_app.maintenance-BYxtjA-N.js");
const Route$4 = createFileRoute("/_app/maintenance")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./_app.employees-BFv12iCo.js");
const Route$3 = createFileRoute("/_app/employees")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./_app.dashboard-DbeL5G2Z.js");
const Route$2 = createFileRoute("/_app/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./_app.attendance-B3-_LjH2.js");
const Route$1 = createFileRoute("/_app/attendance")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./_app.assets-_X2gTU35.js");
const Route = createFileRoute("/_app/assets")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const LoginRoute = Route$c.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$d
});
const ForgotPasswordRoute = Route$b.update({
  id: "/forgot-password",
  path: "/forgot-password",
  getParentRoute: () => Route$d
});
const AppRoute = Route$a.update({
  id: "/_app",
  getParentRoute: () => Route$d
});
const IndexRoute = Route$9.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$d
});
const AppTasksRoute = Route$8.update({
  id: "/tasks",
  path: "/tasks",
  getParentRoute: () => AppRoute
});
const AppSitesRoute = Route$7.update({
  id: "/sites",
  path: "/sites",
  getParentRoute: () => AppRoute
});
const AppSettingsRoute = Route$6.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AppRoute
});
const AppReportsRoute = Route$5.update({
  id: "/reports",
  path: "/reports",
  getParentRoute: () => AppRoute
});
const AppMaintenanceRoute = Route$4.update({
  id: "/maintenance",
  path: "/maintenance",
  getParentRoute: () => AppRoute
});
const AppEmployeesRoute = Route$3.update({
  id: "/employees",
  path: "/employees",
  getParentRoute: () => AppRoute
});
const AppDashboardRoute = Route$2.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AppRoute
});
const AppAttendanceRoute = Route$1.update({
  id: "/attendance",
  path: "/attendance",
  getParentRoute: () => AppRoute
});
const AppAssetsRoute = Route.update({
  id: "/assets",
  path: "/assets",
  getParentRoute: () => AppRoute
});
const AppRouteChildren = {
  AppAssetsRoute,
  AppAttendanceRoute,
  AppDashboardRoute,
  AppEmployeesRoute,
  AppMaintenanceRoute,
  AppReportsRoute,
  AppSettingsRoute,
  AppSitesRoute,
  AppTasksRoute
};
const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AppRoute: AppRouteWithChildren,
  ForgotPasswordRoute,
  LoginRoute
};
const routeTree = Route$d._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  router as r,
  useTheme as u
};
