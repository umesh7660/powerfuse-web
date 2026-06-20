import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
import { useData } from "@/lib/store";
import { BarChart3 } from "lucide-react";

export const Route = createFileRoute("/_app/reports")({
  component: ReportsPage,
});

function ReportsPage() {
  const { tasks, employees, assets, maintenance } = useData();
  const totalSpend = maintenance.reduce((a, b) => a + b.cost, 0);

  return (
    <div>
      <PageHeader title="Reports" description="Operational analytics — sample summary." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Summary label="Active workforce" value={employees.filter((e) => e.status === "active").length} />
        <Summary label="Tasks completed" value={tasks.filter((t) => t.status === "done").length} />
        <Summary label="Maintenance spend" value={`₹${totalSpend.toLocaleString()}`} />
      </div>
      <Card className="p-16 text-center">
        <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground/40" />
        <p className="mt-3 text-sm text-muted-foreground">Detailed charts & exports coming soon.</p>
        <p className="text-xs text-muted-foreground/70">Hook in Recharts when wiring real data sources.</p>
      </Card>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string | number }) {
  return (
    <Card className="p-5">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-2 text-3xl font-semibold tabular-nums">{value}</div>
    </Card>
  );
}
