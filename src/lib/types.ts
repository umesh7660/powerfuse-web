export type Role = "admin" | "manager" | "supervisor" | "engineer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  department: string;
  site?: string;
  status: "active" | "inactive";
  joinedAt: string;
}

export interface Site {
  id: string;
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  radiusM: number;
  supervisor: string;
  status: "active" | "paused" | "closed";
}

export interface Attendance {
  id: string;
  employeeId: string;
  employeeName: string;
  siteId: string;
  siteName: string;
  checkIn: string;
  checkOut?: string;
  lat?: number;
  lng?: number;
}

export type TaskStatus = "todo" | "in_progress" | "review" | "done";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string;
  assigneeName: string;
  siteId?: string;
  siteName?: string;
  dueDate: string;
  createdAt: string;
}

export interface Asset {
  id: string;
  name: string;
  category: string;
  serial: string;
  qr: string;
  siteId: string;
  siteName: string;
  status: "operational" | "maintenance" | "retired";
  purchasedAt: string;
}

export interface MaintenanceLog {
  id: string;
  assetId: string;
  assetName: string;
  type: "preventive" | "corrective" | "inspection";
  performedBy: string;
  notes: string;
  cost: number;
  performedAt: string;
}
