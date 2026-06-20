import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { useData } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, Wrench } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import type { MaintenanceLog } from "@/lib/types";

export const Route = createFileRoute("/_app/maintenance")({
  component: MaintenancePage,
});

const typeAccent: Record<MaintenanceLog["type"], string> = {
  preventive: "bg-info",
  corrective: "bg-destructive",
  inspection: "bg-success",
};

function MaintenancePage() {
  const { assets, maintenance, addMaintenance } = useData();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <PageHeader
        title="Maintenance"
        description="Timeline of preventive, corrective and inspection logs."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-1.5" /> Add log</Button>
            </DialogTrigger>
            <MaintenanceDialog
              assets={assets}
              onSubmit={(data) => { addMaintenance(data); setOpen(false); toast.success("Maintenance logged"); }}
            />
          </Dialog>
        }
      />

      <Card className="p-6">
        {maintenance.length === 0 ? (
          <div className="py-16 text-center">
            <Wrench className="mx-auto h-10 w-10 text-muted-foreground/50" />
            <p className="mt-3 text-sm text-muted-foreground">No maintenance records yet.</p>
          </div>
        ) : (
          <ol className="relative border-l border-border ml-3 space-y-6">
            {maintenance.map((m) => (
              <li key={m.id} className="ml-6">
                <span className={`absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full ring-4 ring-background ${typeAccent[m.type]}`} />
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="capitalize">{m.type}</Badge>
                  <span className="text-sm font-semibold">{m.assetName}</span>
                  <span className="text-xs text-muted-foreground">· {format(new Date(m.performedAt), "PPP")}</span>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{m.notes}</p>
                <div className="mt-2 text-xs text-muted-foreground">
                  Performed by <span className="text-foreground">{m.performedBy}</span> ·{" "}
                  Cost <span className="text-foreground tabular-nums">₹{m.cost.toLocaleString()}</span>
                </div>
              </li>
            ))}
          </ol>
        )}
      </Card>
    </div>
  );
}

function MaintenanceDialog({ assets, onSubmit }: {
  assets: { id: string; name: string }[];
  onSubmit: (m: Omit<MaintenanceLog, "id">) => void;
}) {
  const [form, setForm] = useState<Omit<MaintenanceLog, "id">>({
    assetId: assets[0]?.id ?? "", assetName: assets[0]?.name ?? "",
    type: "preventive", performedBy: "", notes: "", cost: 0,
    performedAt: new Date().toISOString(),
  });
  return (
    <DialogContent>
      <DialogHeader><DialogTitle>Add maintenance log</DialogTitle></DialogHeader>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-3">
        <div className="space-y-1.5">
          <Label className="text-xs">Asset</Label>
          <Select
            value={form.assetId}
            onValueChange={(v) => {
              const a = assets.find((x) => x.id === v);
              setForm({ ...form, assetId: v, assetName: a?.name ?? "" });
            }}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{assets.map((a) => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Type</Label>
            <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as MaintenanceLog["type"] })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="preventive">Preventive</SelectItem>
                <SelectItem value="corrective">Corrective</SelectItem>
                <SelectItem value="inspection">Inspection</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Performed by</Label>
            <Input required value={form.performedBy} onChange={(e) => setForm({ ...form, performedBy: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Cost (₹)</Label>
            <Input type="number" value={form.cost} onChange={(e) => setForm({ ...form, cost: parseInt(e.target.value || "0", 10) })} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Date</Label>
            <Input type="date" value={form.performedAt.slice(0, 10)}
              onChange={(e) => setForm({ ...form, performedAt: new Date(e.target.value).toISOString() })} />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Notes</Label>
          <Textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        </div>
        <DialogFooter><Button type="submit">Log maintenance</Button></DialogFooter>
      </form>
    </DialogContent>
  );
}
