
export enum UserRole {
  PortWorker = "Port Worker",
  Supervisor = "Supervisor",
  SafetyOfficer = "Safety Officer",
  TerminalManager = "Terminal Manager",
  PortAdministrator = "Port Administrator",
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  terminal: string;
}

export interface SOP {
  _id: string;
  title: string;
  description: string;
  steps: { description: string }[];
  createdBy: string; // User ID
}

export enum TaskStatus {
  Pending = "Pending",
  InProgress = "In Progress",
  Completed = "Completed",
  Blocked = "Blocked",
}

export interface Task {
  _id: string;
  sopId: string;
  assignedTo: string; // User ID
  assignedBy: string; // User ID
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  completedAt?: string | null;
  completedSteps: boolean[];
}
