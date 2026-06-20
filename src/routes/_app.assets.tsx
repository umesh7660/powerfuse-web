import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { useData } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Boxes, QrCode, Search, Wrench } from "lucide-react";
import { format } from "date-fns";
import type { Asset } from "@/lib/types";

export const Route = createFileRoute("/_app/assets")({
  component: AssetsPage,
});

const statusStyle: Record<Asset["status"], string> = {
  operational: "bg-success/15 text-success border-success/20",
  maintenance: "bg-warning/15 text-warning-foreground border-warning/20",
  retired: "bg-muted text-muted-foreground",
};

function AssetsPage() {
  const { assets, maintenance } = useData();
  const [q, setQ] = useState("");
  const [active, setActive] = useState<Asset | null>(null);

  const filtered = assets.filter((a) =>
    !q || [a.name, a.id, a.serial, a.siteName, a.category].some((v) => v.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <div>
      <PageHeader title="Assets" description={`${assets.length} assets tracked across sites.`} />

      <Card className="p-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search assets…" className="pl-8 h-9" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Boxes className="mx-auto h-10 w-10 text-muted-foreground/50" />
            <p className="mt-3 text-sm text-muted-foreground">No assets found.</p>
          </div>
        ) : (
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Serial</TableHead>
                  <TableHead>Site</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((a) => {
                  const logCount = maintenance.filter((m) => m.assetId === a.id).length;
                  return (
                    <TableRow key={a.id} className="cursor-pointer" onClick={() => setActive(a)}>
                      <TableCell>
                        <div className="font-medium">{a.name}</div>
                        <div className="text-xs text-muted-foreground">{a.id}</div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{a.category}</TableCell>
                      <TableCell className="font-mono text-xs">{a.serial}</TableCell>
                      <TableCell className="text-muted-foreground">{a.siteName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`capitalize ${statusStyle[a.status]}`}>{a.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right text-xs text-muted-foreground">
                        <Wrench className="inline h-3.5 w-3.5 mr-1" />{logCount}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      <Sheet open={!!active} onOpenChange={(v) => !v && setActive(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {active && (
            <>
              <SheetHeader>
                <div className="text-xs text-muted-foreground">{active.id}</div>
                <SheetTitle>{active.name}</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <Card className="p-4 flex items-center gap-4">
                  <div className="grid h-20 w-20 place-items-center rounded-md bg-foreground text-background">
                    <QrCode className="h-12 w-12" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">QR code</div>
                    <div className="font-mono text-sm font-semibold">{active.qr}</div>
                    <div className="mt-1 text-xs text-muted-foreground">Scan to log maintenance</div>
                  </div>
                </Card>
                <div className="rounded-md border border-border divide-y text-sm">
                  <Row label="Category" value={active.category} />
                  <Row label="Serial" value={active.serial} mono />
                  <Row label="Site" value={active.siteName} />
                  <Row label="Status" value={active.status} cap />
                  <Row label="Purchased" value={format(new Date(active.purchasedAt), "PPP")} />
                </div>
                <div>
                  <div className="text-sm font-semibold mb-2">Maintenance history</div>
                  <ul className="space-y-2">
                    {maintenance.filter((m) => m.assetId === active.id).map((m) => (
                      <li key={m.id} className="rounded-md border border-border p-3 text-sm">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="capitalize">{m.type}</Badge>
                          <span className="text-xs text-muted-foreground">{format(new Date(m.performedAt), "MMM d, yyyy")}</span>
                        </div>
                        <div className="mt-2 text-muted-foreground">{m.notes}</div>
                        <div className="mt-1 text-xs text-muted-foreground">By {m.performedBy} · ₹{m.cost.toLocaleString()}</div>
                      </li>
                    ))}
                    {maintenance.filter((m) => m.assetId === active.id).length === 0 && (
                      <li className="text-xs text-muted-foreground">No maintenance logged.</li>
                    )}
                  </ul>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Row({ label, value, mono, cap }: { label: string; value: string; mono?: boolean; cap?: boolean }) {
  return (
    <div className="flex items-center justify-between px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className={`${mono ? "font-mono text-xs" : ""} ${cap ? "capitalize" : ""}`}>{value}</span>
    </div>
  );
}
