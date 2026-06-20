import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  User, Employee, Site, Attendance, Task, Asset, MaintenanceLog, TaskStatus,
} from "./types";
import {
  seedEmployees, seedSites, seedAttendance, seedTasks, seedAssets, seedMaintenance,
} from "./mock-data";

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
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
            role: "admin",
          },
          token: "mock-jwt-" + Math.random().toString(36).slice(2),
        });
      },
      logout: () => set({ user: null, token: null }),
    }),
    { name: "powerfuse-auth" },
  ),
);

interface DataState {
  employees: Employee[];
  sites: Site[];
  attendance: Attendance[];
  tasks: Task[];
  assets: Asset[];
  maintenance: MaintenanceLog[];
  addEmployee: (e: Omit<Employee, "id">) => void;
  updateEmployee: (id: string, e: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  addSite: (s: Omit<Site, "id">) => void;
  updateSite: (id: string, s: Partial<Site>) => void;
  checkIn: (employeeId: string, siteId: string) => void;
  checkOut: (attendanceId: string) => void;
  addTask: (t: Omit<Task, "id" | "createdAt">) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  updateTask: (id: string, t: Partial<Task>) => void;
  addMaintenance: (m: Omit<MaintenanceLog, "id">) => void;
}

const nextId = (prefix: string, list: { id: string }[]) => {
  const nums = list.map((x) => parseInt(x.id.split("-")[1] || "0", 10));
  const max = nums.length ? Math.max(...nums) : 0;
  return `${prefix}-${String(max + 1).padStart(3, "0")}`;
};

export const useData = create<DataState>()(
  persist(
    (set) => ({
      employees: seedEmployees,
      sites: seedSites,
      attendance: seedAttendance,
      tasks: seedTasks,
      assets: seedAssets,
      maintenance: seedMaintenance,
      addEmployee: (e) =>
        set((s) => ({ employees: [...s.employees, { ...e, id: nextId("E", s.employees) }] })),
      updateEmployee: (id, e) =>
        set((s) => ({ employees: s.employees.map((x) => (x.id === id ? { ...x, ...e } : x)) })),
      deleteEmployee: (id) =>
        set((s) => ({ employees: s.employees.filter((x) => x.id !== id) })),
      addSite: (site) =>
        set((s) => ({ sites: [...s.sites, { ...site, id: nextId("S", s.sites) }] })),
      updateSite: (id, site) =>
        set((s) => ({ sites: s.sites.map((x) => (x.id === id ? { ...x, ...site } : x)) })),
      checkIn: (employeeId, siteId) =>
        set((s) => {
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
                checkIn: new Date().toISOString(),
                lat: site.lat,
                lng: site.lng,
              },
              ...s.attendance,
            ],
          };
        }),
      checkOut: (attendanceId) =>
        set((s) => ({
          attendance: s.attendance.map((a) =>
            a.id === attendanceId ? { ...a, checkOut: new Date().toISOString() } : a,
          ),
        })),
      addTask: (t) =>
        set((s) => ({
          tasks: [...s.tasks, { ...t, id: nextId("T", s.tasks), createdAt: new Date().toISOString() }],
        })),
      updateTaskStatus: (id, status) =>
        set((s) => ({ tasks: s.tasks.map((x) => (x.id === id ? { ...x, status } : x)) })),
      updateTask: (id, t) =>
        set((s) => ({ tasks: s.tasks.map((x) => (x.id === id ? { ...x, ...t } : x)) })),
      addMaintenance: (m) =>
        set((s) => {
          const log = { ...m, id: nextId("M", s.maintenance) };
          return {
            maintenance: [log, ...s.maintenance],
            assets: s.assets.map((a) =>
              a.id === m.assetId && m.type === "corrective" ? { ...a, status: "operational" } : a,
            ),
          };
        }),
    }),
    { name: "powerfuse-data" },
  ),
);
