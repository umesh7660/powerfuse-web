import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/store";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const token = useAuth((s) => s.token);
  return <Navigate to={token ? "/dashboard" : "/login"} />;
}
