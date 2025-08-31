
import { User, SOP, Task, UserRole, TaskStatus } from './types';

export const MOCK_USERS: User[] = [
  { _id: 'user-1', name: 'John Doe', email: 'john.doe@port.com', role: UserRole.PortWorker, terminal: 'A' },
  { _id: 'user-2', name: 'Jane Smith', email: 'jane.smith@port.com', role: UserRole.PortWorker, terminal: 'A' },
  { _id: 'user-3', name: 'Mike Ross', email: 'mike.ross@port.com', role: UserRole.Supervisor, terminal: 'A' },
  { _id: 'user-4', name: 'Sarah Connor', email: 's.connor@port.com', role: UserRole.SafetyOfficer, terminal: 'A' },
];

export const MOCK_SOPS: SOP[] = [
  {
    _id: 'sop-1',
    title: 'Container Loading Procedure',
    description: 'Standard procedure for loading a 20ft container onto a vessel.',
    steps: [
      { description: 'Inspect container for damages.' },
      { description: 'Verify container seal and number.' },
      { description: 'Position spreader over the container.' },
      { description: 'Lock twistlocks securely.' },
      { description: 'Lift container slowly, check for balance.' },
      { description: 'Move container to designated bay on vessel.' },
      { description: 'Unlock twistlocks and retract spreader.' },
    ],
    createdBy: 'user-3',
  },
  {
    _id: 'sop-2',
    title: 'Warehouse Safety Check',
    description: 'Daily safety checklist for warehouse operations.',
    steps: [
      { description: 'Check fire extinguishers are accessible.' },
      { description: 'Ensure emergency exits are clear.' },
      { description: 'Inspect forklift for any fluid leaks.' },
      { description: 'Verify all workers are wearing PPE.' },
      { description: 'Check that all pallets are stacked securely.' },
    ],
    createdBy: 'user-4',
  },
  {
    _id: 'sop-3',
    title: 'Vessel Mooring Operation',
    description: 'Procedure for safely mooring a vessel to the quay.',
    steps:
    [
        { description: 'Confirm communication with vessel master.' },
        { description: 'Prepare mooring lines on the quay.' },
        { description: 'Receive heaving lines from the vessel.' },
        { description: 'Attach heaving lines to mooring lines.' },
        { description: 'Secure mooring lines to bollards in the correct sequence.' },
        { description: 'Confirm vessel is secure with vessel master.' },
    ],
    createdBy: 'user-3',
  }
];

export const MOCK_TASKS: Task[] = [
  {
    _id: 'task-1',
    sopId: 'sop-1',
    assignedTo: 'user-1',
    assignedBy: 'user-3',
    status: TaskStatus.InProgress,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    completedAt: null,
    completedSteps: [true, true, false, false, false, false, false],
  },
  {
    _id: 'task-2',
    sopId: 'sop-2',
    assignedTo: 'user-2',
    assignedBy: 'user-3',
    status: TaskStatus.Pending,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    completedAt: null,
    completedSteps: [false, false, false, false, false],
  },
  {
    _id: 'task-3',
    sopId: 'sop-3',
    assignedTo: 'user-1',
    assignedBy: 'user-3',
    status: TaskStatus.Pending,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    completedAt: null,
    completedSteps: [false, false, false, false, false, false],
  },
  {
    _id: 'task-4',
    sopId: 'sop-1',
    assignedTo: 'user-2',
    assignedBy: 'user-3',
    status: TaskStatus.Completed,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    completedSteps: [true, true, true, true, true, true, true],
  },
];
