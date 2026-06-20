import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { useData, useAuth } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { format, isToday } from "date-fns";
import { LogIn, LogOut, MapPin } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/attendance")({
  component: AttendancePage,
});

function AttendancePage() {
  const user = useAuth((s) => s.user);
  const { employees, sites, attendance, checkIn, checkOut } = useData();

  // Map current logged-in user to the first employee (mock)
  const currentEmployee = employees[0];
  const [selectedSite, setSelectedSite] = useState(sites[0]?.id ?? "");

  const myOpen = useMemo(
    () => attendance.find((a) => a.employeeId === currentEmployee?.id && !a.checkOut),
    [attendance, currentEmployee],
  );

  const todayRecords = attendance.filter((a) => isToday(new Date(a.checkIn)));

  return (
    <div>
      <PageHeader title="Attendance" description={`Signed in as ${user?.name} · acting on behalf of ${currentEmployee?.name}.`} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Current status</div>
              <div className="mt-1 flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${myOpen ? "bg-success animate-pulse" : "bg-muted-foreground/40"}`} />
                <span className="text-lg font-semibold">{myOpen ? "Checked in" : "Off duty"}</span>
              </div>
              {myOpen && (
                <div className="mt-1 text-sm text-muted-foreground">
                  At {myOpen.siteName} · since {format(new Date(myOpen.checkIn), "p")}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {!myOpen ? (
                <>
                  <Select value={selectedSite} onValueChange={setSelectedSite}>
                    <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {sites.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={() => {
                      if (!currentEmployee || !selectedSite) return;
                      checkIn(currentEmployee.id, selectedSite);
                      toast.success("Checked in");
                    }}
                  >
                    <LogIn className="h-4 w-4 mr-1.5" /> Check in
                  </Button>
                </>
              ) : (
                <Button
                  variant="secondary"
                  onClick={() => { checkOut(myOpen.id); toast.success("Checked out"); }}
                >
                  <LogOut className="h-4 w-4 mr-1.5" /> Check out
                </Button>
              )}
            </div>
          </div>
          <div className="rounded-md border border-dashed border-border bg-muted/30 p-4 text-xs text-muted-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            GPS location capture is mocked in this demo. Production will validate against site geofence radius.
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Today's stats</div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <Stat label="Checked in" value={todayRecords.length} />
            <Stat label="Active" value={todayRecords.filter((r) => !r.checkOut).length} />
            <Stat label="Completed" value={todayRecords.filter((r) => r.checkOut).length} />
          </div>
        </Card>
      </div>

      <Card className="p-3">
        <div className="px-2 py-2 text-sm font-semibold">Attendance history</div>
        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Site</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendance.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{a.employeeName}</TableCell>
                  <TableCell className="text-muted-foreground">{a.siteName}</TableCell>
                  <TableCell className="tabular-nums">{format(new Date(a.checkIn), "MMM d, p")}</TableCell>
                  <TableCell className="tabular-nums text-muted-foreground">
                    {a.checkOut ? format(new Date(a.checkOut), "MMM d, p") : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={a.checkOut ? "" : "bg-success/15 text-success"}>
                      {a.checkOut ? "Completed" : "Active"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-border bg-card p-3">
      <div className="text-xl font-semibold tabular-nums">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}
