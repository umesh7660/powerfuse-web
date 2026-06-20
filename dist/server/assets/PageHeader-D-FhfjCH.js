import { jsxs, jsx } from "react/jsx-runtime";
import { c as cn } from "./utils-H80jjgLf.js";
import { motion } from "framer-motion";
function PageHeader({ title, description, actions, className }) {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: -8 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      className: cn("grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 mb-7", className),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-semibold tracking-tight text-foreground", children: title }),
          description && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-sm text-muted-foreground", children: description })
        ] }),
        actions && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 shrink-0", children: actions })
      ]
    }
  );
}
export {
  PageHeader as P
};
