import { jsx } from "react/jsx-runtime";
import { Navigate } from "@tanstack/react-router";
import { u as useAuth } from "./store-pMakjgCj.js";
import "zustand";
import "zustand/middleware";
function Index() {
  const token = useAuth((s) => s.token);
  return /* @__PURE__ */ jsx(Navigate, { to: token ? "/dashboard" : "/login" });
}
export {
  Index as component
};
