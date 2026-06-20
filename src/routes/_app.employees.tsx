import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { useData } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Trash2, Pencil, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import type { Employee, Role } from "@/lib/types";

export const Route = createFileRoute("/_app/employees")({
  component: EmployeesPage,
});

const roles: Role[] = ["admin", "manager", "supervisor", "engineer"];

function EmployeesPage() {
  const { employees, sites, addEmployee, updateEmployee, deleteEmployee } = useData();
  const [q, setQ] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);

  const filtered = employees.filter((e) => {
    const matchQ = !q || [e.name, e.email, e.id, e.department].some((v) => v.toLowerCase().includes(q.toLowerCase()));
    const matchRole = roleFilter === "all" || e.role === roleFilter;
    return matchQ && matchRole;
  });

  return (
    <div>
      <PageHeader
        title="Employees"
        description={`${employees.length} people across ${new Set(employees.map((e) => e.department)).size} departments.`}
        actions={
          <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setEditing(null); }}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-1.5" /> Add employee</Button>
            </DialogTrigger>
            <EmployeeDialog
              employee={editing}
              sites={sites}
              onSubmit={(data) => {
                if (editing) {
                  updateEmployee(editing.id, data);
                  toast.success("Employee updated");
                } else {
                  addEmployee(data);
                  toast.success("Employee added");
                }
                setOpen(false);
                setEditing(null);
              }}
            />
          </Dialog>
        }
      />

      <Card className="p-3">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by name, email, ID…" className="pl-8 h-9" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-44 h-9"><SelectValue placeholder="Role" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All roles</SelectItem>
              {roles.map((r) => <SelectItem key={r} value={r} className="capitalize">{r}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Site</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((e) => {
                  const initials = e.name.split(" ").map((p) => p[0]).slice(0, 2).join("");
                  const site = sites.find((s) => s.id === e.site);
                  return (
                    <TableRow key={e.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs bg-secondary">{initials}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <div className="font-medium truncate">{e.name}</div>
                            <div className="text-xs text-muted-foreground truncate">{e.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">{e.role}</TableCell>
                      <TableCell>{e.department}</TableCell>
                      <TableCell className="text-muted-foreground">{site?.name ?? "—"}</TableCell>
                      <TableCell>
                        <Badge variant={e.status === "active" ? "default" : "secondary"} className="capitalize">{e.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => { setEditing(e); setOpen(true); }}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive"
                          onClick={() => { if (confirm("Remove this employee?")) { deleteEmployee(e.id); toast.success("Employee removed"); } }}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="py-16 text-center">
      <Users className="mx-auto h-10 w-10 text-muted-foreground/50" />
      <p className="mt-3 text-sm text-muted-foreground">No employees match the current filters.</p>
    </div>
  );
}

function EmployeeDialog({ employee, sites, onSubmit }: {
  employee: Employee | null;
  sites: { id: string; name: string }[];
  onSubmit: (e: Omit<Employee, "id">) => void;
}) {
  const [form, setForm] = useState<Omit<Employee, "id">>(() => ({
    name: employee?.name ?? "",
    email: employee?.email ?? "",
    phone: employee?.phone ?? "",
    role: employee?.role ?? "engineer",
    department: employee?.department ?? "Field Ops",
    site: employee?.site,
    status: employee?.status ?? "active",
    joinedAt: employee?.joinedAt ?? new Date().toISOString(),
  }));

  return (
    <DialogContent>
      <DialogHeader><DialogTitle>{employee ? "Edit employee" : "Add employee"}</DialogTitle></DialogHeader>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Full name"><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
          <Field label="Email"><Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
          <Field label="Phone"><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
          <Field label="Department"><Input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} /></Field>
          <Field label="Role">
            <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v as Role })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{roles.map((r) => <SelectItem key={r} value={r} className="capitalize">{r}</SelectItem>)}</SelectContent>
            </Select>
          </Field>
          <Field label="Site">
            <Select value={form.site ?? "none"} onValueChange={(v) => setForm({ ...form, site: v === "none" ? undefined : v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Unassigned</SelectItem>
                {sites.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
        </div>
        <DialogFooter><Button type="submit">{employee ? "Save changes" : "Create employee"}</Button></DialogFooter>
      </form>
    </DialogContent>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label className="text-xs">{label}</Label>{children}</div>;
}
