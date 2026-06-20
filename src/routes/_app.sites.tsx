import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { useData } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { MapPin, Plus, Radio, User } from "lucide-react";
import { toast } from "sonner";
import type { Site } from "@/lib/types";

export const Route = createFileRoute("/_app/sites")({
  component: SitesPage,
});

function SitesPage() {
  const { sites, addSite } = useData();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <PageHeader
        title="Sites"
        description="Operational sites and their geofence configuration."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-1.5" /> Add site</Button>
            </DialogTrigger>
            <SiteDialog onSubmit={(data) => { addSite(data); toast.success("Site added"); setOpen(false); }} />
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {sites.map((s) => (
          <Card key={s.id} className="p-5 hover:border-primary/40 transition-colors">
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{s.id}</span>
                  <span>·</span>
                  <span>{s.city}</span>
                </div>
                <h3 className="mt-1 font-semibold truncate">{s.name}</h3>
              </div>
              <Badge
                variant="secondary"
                className={
                  s.status === "active" ? "bg-success/15 text-success border-success/20"
                  : s.status === "paused" ? "bg-warning/15 text-warning-foreground border-warning/20"
                  : "bg-muted"
                }
              >
                {s.status}
              </Badge>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span className="truncate">{s.address}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Radio className="h-4 w-4 shrink-0" />
                <span>Geofence radius: <span className="text-foreground tabular-nums">{s.radiusM}m</span></span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4 shrink-0" />
                <span>Supervisor: <span className="text-foreground">{s.supervisor}</span></span>
              </div>
            </div>

            <div className="mt-4 rounded-md border border-border bg-muted/40 p-3 text-xs font-mono text-muted-foreground">
              GPS: {s.lat.toFixed(4)}, {s.lng.toFixed(4)}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function SiteDialog({ onSubmit }: { onSubmit: (s: Omit<Site, "id">) => void }) {
  const [form, setForm] = useState<Omit<Site, "id">>({
    name: "", address: "", city: "", lat: 0, lng: 0, radiusM: 200, supervisor: "", status: "active",
  });
  return (
    <DialogContent>
      <DialogHeader><DialogTitle>Add site</DialogTitle></DialogHeader>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-3">
        <Field label="Name"><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
        <Field label="Address"><Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="City"><Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></Field>
          <Field label="Supervisor"><Input value={form.supervisor} onChange={(e) => setForm({ ...form, supervisor: e.target.value })} /></Field>
          <Field label="Latitude"><Input type="number" step="0.0001" value={form.lat} onChange={(e) => setForm({ ...form, lat: parseFloat(e.target.value) })} /></Field>
          <Field label="Longitude"><Input type="number" step="0.0001" value={form.lng} onChange={(e) => setForm({ ...form, lng: parseFloat(e.target.value) })} /></Field>
          <Field label="Radius (m)"><Input type="number" value={form.radiusM} onChange={(e) => setForm({ ...form, radiusM: parseInt(e.target.value, 10) })} /></Field>
        </div>
        <DialogFooter><Button type="submit">Create site</Button></DialogFooter>
      </form>
    </DialogContent>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label className="text-xs">{label}</Label>{children}</div>;
}
