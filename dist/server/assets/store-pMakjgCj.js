import { create } from "zustand";
import { persist } from "zustand/middleware";
const today = /* @__PURE__ */ new Date();
const iso = (d) => d.toISOString();
const daysAgo = (n) => {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return iso(d);
};
const daysAhead = (n) => {
  const d = new Date(today);
  d.setDate(d.getDate() + n);
  return iso(d);
};
const seedEmployees = [
  { id: "E-001", name: "Arjun Mehta", email: "arjun@powerfuse.io", phone: "+91 98100 11221", role: "engineer", department: "Field Ops", site: "S-001", status: "active", joinedAt: daysAgo(420) },
  { id: "E-002", name: "Priya Sharma", email: "priya@powerfuse.io", phone: "+91 98100 11222", role: "supervisor", department: "Field Ops", site: "S-001", status: "active", joinedAt: daysAgo(610) },
  { id: "E-003", name: "Rahul Verma", email: "rahul@powerfuse.io", phone: "+91 98100 11223", role: "engineer", department: "Maintenance", site: "S-002", status: "active", joinedAt: daysAgo(190) },
  { id: "E-004", name: "Neha Kapoor", email: "neha@powerfuse.io", phone: "+91 98100 11224", role: "manager", department: "Operations", status: "active", joinedAt: daysAgo(1100) },
  { id: "E-005", name: "Sandeep Singh", email: "sandeep@powerfuse.io", phone: "+91 98100 11225", role: "engineer", department: "Field Ops", site: "S-003", status: "active", joinedAt: daysAgo(80) },
  { id: "E-006", name: "Kavita Iyer", email: "kavita@powerfuse.io", phone: "+91 98100 11226", role: "supervisor", department: "QA", site: "S-002", status: "inactive", joinedAt: daysAgo(900) }
];
const seedSites = [
  { id: "S-001", name: "Sector 62 Substation", address: "Plot 14, Sector 62", city: "Noida", lat: 28.628, lng: 77.3649, radiusM: 200, supervisor: "Priya Sharma", status: "active" },
  { id: "S-002", name: "Whitefield Grid Yard", address: "EPIP Zone, Whitefield", city: "Bengaluru", lat: 12.9698, lng: 77.75, radiusM: 350, supervisor: "Kavita Iyer", status: "active" },
  { id: "S-003", name: "Bandra Distribution Hub", address: "Linking Road", city: "Mumbai", lat: 19.0596, lng: 72.8295, radiusM: 150, supervisor: "Sandeep Singh", status: "paused" },
  { id: "S-004", name: "Hinjewadi Transformer Bay", address: "Phase 2, Hinjewadi", city: "Pune", lat: 18.5912, lng: 73.7389, radiusM: 250, supervisor: "—", status: "active" }
];
const seedAttendance = [
  { id: "A-001", employeeId: "E-001", employeeName: "Arjun Mehta", siteId: "S-001", siteName: "Sector 62 Substation", checkIn: daysAgo(0).replace(/T.*/, "T08:54:00.000Z"), lat: 28.628, lng: 77.3649 },
  { id: "A-002", employeeId: "E-002", employeeName: "Priya Sharma", siteId: "S-001", siteName: "Sector 62 Substation", checkIn: daysAgo(0).replace(/T.*/, "T08:12:00.000Z"), checkOut: daysAgo(0).replace(/T.*/, "T17:40:00.000Z") },
  { id: "A-003", employeeId: "E-003", employeeName: "Rahul Verma", siteId: "S-002", siteName: "Whitefield Grid Yard", checkIn: daysAgo(1).replace(/T.*/, "T09:02:00.000Z"), checkOut: daysAgo(1).replace(/T.*/, "T18:10:00.000Z") },
  { id: "A-004", employeeId: "E-005", employeeName: "Sandeep Singh", siteId: "S-003", siteName: "Bandra Distribution Hub", checkIn: daysAgo(0).replace(/T.*/, "T08:30:00.000Z") }
];
const seedTasks = [
  { id: "T-1001", title: "Inspect 11kV breaker panel", description: "Routine inspection of breaker panel #4 on bay B.", status: "todo", priority: "high", assigneeId: "E-001", assigneeName: "Arjun Mehta", siteId: "S-001", siteName: "Sector 62 Substation", dueDate: daysAhead(2), createdAt: daysAgo(1) },
  { id: "T-1002", title: "Replace blown fuse — Feeder 3", description: "Emergency replacement reported by site supervisor.", status: "in_progress", priority: "urgent", assigneeId: "E-003", assigneeName: "Rahul Verma", siteId: "S-002", siteName: "Whitefield Grid Yard", dueDate: daysAhead(0), createdAt: daysAgo(0) },
  { id: "T-1003", title: "Transformer oil sampling", description: "Quarterly oil sample collection and lab dispatch.", status: "in_progress", priority: "medium", assigneeId: "E-005", assigneeName: "Sandeep Singh", siteId: "S-004", siteName: "Hinjewadi Transformer Bay", dueDate: daysAhead(5), createdAt: daysAgo(3) },
  { id: "T-1004", title: "Submit safety audit report", description: "Compile findings from Sept audit.", status: "review", priority: "medium", assigneeId: "E-002", assigneeName: "Priya Sharma", siteId: "S-001", siteName: "Sector 62 Substation", dueDate: daysAhead(1), createdAt: daysAgo(6) },
  { id: "T-1005", title: "Calibrate digital multimeters", description: "Annual calibration of field MM kit.", status: "done", priority: "low", assigneeId: "E-001", assigneeName: "Arjun Mehta", dueDate: daysAgo(2), createdAt: daysAgo(10) },
  { id: "T-1006", title: "Site geofence verification", description: "Re-verify GPS perimeter for Bandra hub.", status: "todo", priority: "low", assigneeId: "E-005", assigneeName: "Sandeep Singh", siteId: "S-003", siteName: "Bandra Distribution Hub", dueDate: daysAhead(7), createdAt: daysAgo(0) }
];
const seedAssets = [
  { id: "AS-001", name: "ABB Vacuum Breaker 11kV", category: "Switchgear", serial: "ABB-VB-11K-0421", qr: "PF-AS-001", siteId: "S-001", siteName: "Sector 62 Substation", status: "operational", purchasedAt: daysAgo(800) },
  { id: "AS-002", name: "Siemens Distribution Transformer 500kVA", category: "Transformer", serial: "SIE-DT-500-1102", qr: "PF-AS-002", siteId: "S-002", siteName: "Whitefield Grid Yard", status: "operational", purchasedAt: daysAgo(1500) },
  { id: "AS-003", name: "Schneider RMU", category: "Switchgear", serial: "SCH-RMU-0099", qr: "PF-AS-003", siteId: "S-003", siteName: "Bandra Distribution Hub", status: "maintenance", purchasedAt: daysAgo(620) },
  { id: "AS-004", name: "Fluke 87V Multimeter", category: "Tools", serial: "FLK-87V-7781", qr: "PF-AS-004", siteId: "S-001", siteName: "Sector 62 Substation", status: "operational", purchasedAt: daysAgo(220) },
  { id: "AS-005", name: "Crompton DG Set 250kVA", category: "Generator", serial: "CR-DG-250-3340", qr: "PF-AS-005", siteId: "S-004", siteName: "Hinjewadi Transformer Bay", status: "operational", purchasedAt: daysAgo(1900) }
];
const seedMaintenance = [
  { id: "M-001", assetId: "AS-002", assetName: "Siemens Distribution Transformer 500kVA", type: "preventive", performedBy: "Rahul Verma", notes: "Oil filtration and bushing cleaning completed.", cost: 18500, performedAt: daysAgo(14) },
  { id: "M-002", assetId: "AS-003", assetName: "Schneider RMU", type: "corrective", performedBy: "Sandeep Singh", notes: "Replaced faulty CT and tightened bus connections.", cost: 42e3, performedAt: daysAgo(3) },
  { id: "M-003", assetId: "AS-001", assetName: "ABB Vacuum Breaker 11kV", type: "inspection", performedBy: "Arjun Mehta", notes: "Thermography scan, no hotspots.", cost: 0, performedAt: daysAgo(30) },
  { id: "M-004", assetId: "AS-005", assetName: "Crompton DG Set 250kVA", type: "preventive", performedBy: "Sandeep Singh", notes: "Oil + filter change, load test pass.", cost: 9800, performedAt: daysAgo(45) }
];
const useAuth = create()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: async (email) => {
        await new Promise((r) => setTimeout(r, 400));
        set({
          user: {
            id: "U-001",
            name: email.split("@")[0].replace(/\b\w/g, (c) => c.toUpperCase()) || "Admin",
            email,
            role: "admin"
          },
          token: "mock-jwt-" + Math.random().toString(36).slice(2)
        });
      },
      logout: () => set({ user: null, token: null })
    }),
    { name: "powerfuse-auth" }
  )
);
const nextId = (prefix, list) => {
  const nums = list.map((x) => parseInt(x.id.split("-")[1] || "0", 10));
  const max = nums.length ? Math.max(...nums) : 0;
  return `${prefix}-${String(max + 1).padStart(3, "0")}`;
};
const useData = create()(
  persist(
    (set) => ({
      employees: seedEmployees,
      sites: seedSites,
      attendance: seedAttendance,
      tasks: seedTasks,
      assets: seedAssets,
      maintenance: seedMaintenance,
      addEmployee: (e) => set((s) => ({ employees: [...s.employees, { ...e, id: nextId("E", s.employees) }] })),
      updateEmployee: (id, e) => set((s) => ({ employees: s.employees.map((x) => x.id === id ? { ...x, ...e } : x) })),
      deleteEmployee: (id) => set((s) => ({ employees: s.employees.filter((x) => x.id !== id) })),
      addSite: (site) => set((s) => ({ sites: [...s.sites, { ...site, id: nextId("S", s.sites) }] })),
      updateSite: (id, site) => set((s) => ({ sites: s.sites.map((x) => x.id === id ? { ...x, ...site } : x) })),
      checkIn: (employeeId, siteId) => set((s) => {
        const emp = s.employees.find((e) => e.id === employeeId);
        const site = s.sites.find((x) => x.id === siteId);
        if (!emp || !site) return s;
        return {
          attendance: [
            {
              id: nextId("A", s.attendance),
              employeeId,
              employeeName: emp.name,
              siteId,
              siteName: site.name,
              checkIn: (/* @__PURE__ */ new Date()).toISOString(),
              lat: site.lat,
              lng: site.lng
            },
            ...s.attendance
          ]
        };
      }),
      checkOut: (attendanceId) => set((s) => ({
        attendance: s.attendance.map(
          (a) => a.id === attendanceId ? { ...a, checkOut: (/* @__PURE__ */ new Date()).toISOString() } : a
        )
      })),
      addTask: (t) => set((s) => ({
        tasks: [...s.tasks, { ...t, id: nextId("T", s.tasks), createdAt: (/* @__PURE__ */ new Date()).toISOString() }]
      })),
      updateTaskStatus: (id, status) => set((s) => ({ tasks: s.tasks.map((x) => x.id === id ? { ...x, status } : x) })),
      updateTask: (id, t) => set((s) => ({ tasks: s.tasks.map((x) => x.id === id ? { ...x, ...t } : x) })),
      addMaintenance: (m) => set((s) => {
        const log = { ...m, id: nextId("M", s.maintenance) };
        return {
          maintenance: [log, ...s.maintenance],
          assets: s.assets.map(
            (a) => a.id === m.assetId && m.type === "corrective" ? { ...a, status: "operational" } : a
          )
        };
      })
    }),
    { name: "powerfuse-data" }
  )
);
export {
  useData as a,
  useAuth as u
};
