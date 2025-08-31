
import React, { useState, useMemo, useCallback } from 'react';
import { User, Task, SOP, TaskStatus, UserRole } from '../types';
import { MOCK_TASKS, MOCK_SOPS, MOCK_USERS } from '../constants';
import TaskCard from './TaskCard';
import SopModal from './SopModal';
import AssignTaskModal from './AssignTaskModal';
import { PlusIcon } from './icons';

interface SupervisorDashboardProps {
  user: User;
}

const SupervisorDashboard: React.FC<SupervisorDashboardProps> = ({ user }) => {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isAssignModalOpen, setAssignModalOpen] = useState(false);

  const teamTasks = useMemo(() => {
    // In a real app, this would be based on team/terminal association
    return tasks
      .filter(task => task.assignedBy === user._id || MOCK_USERS.find(u => u._id === task.assignedTo)?.terminal === user.terminal)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [tasks, user._id, user.terminal]);

  const workers = useMemo(() => {
      return MOCK_USERS.filter(u => u.role === UserRole.PortWorker && u.terminal === user.terminal);
  }, [user.terminal]);

  const selectedSop = useMemo(() => {
    if (!selectedTask) return null;
    return MOCK_SOPS.find(sop => sop._id === selectedTask.sopId) || null;
  }, [selectedTask]);

  const handleTaskSelect = useCallback((task: Task) => {
    setSelectedTask(task);
  }, []);
  
  const handleCloseModal = useCallback(() => {
    setSelectedTask(null);
  }, []);

  const handleUpdateTask = useCallback((updatedTask: Task) => {
    setTasks(prevTasks => prevTasks.map(t => t._id === updatedTask._id ? updatedTask : t));
  }, []);
  
  const handleAssignTask = useCallback((sopId: string, assignedTo: string) => {
      const sop = MOCK_SOPS.find(s => s._id === sopId);
      if(!sop) return;

      const newTask: Task = {
        _id: `task-${Date.now()}`,
        sopId,
        assignedTo,
        assignedBy: user._id,
        status: TaskStatus.Pending,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedSteps: new Array(sop.steps.length).fill(false),
      };
      setTasks(prevTasks => [newTask, ...prevTasks]);
      setAssignModalOpen(false);
  }, [user._id]);


  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-lightest-slate">Team Progress Overview</h2>
        <button
          onClick={() => setAssignModalOpen(true)}
          className="flex items-center bg-green text-navy font-bold py-2 px-4 rounded-md hover:bg-opacity-80 transition-colors duration-200"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Assign New Task
        </button>
      </div>

      {teamTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teamTasks.map(task => (
            <TaskCard key={task._id} task={task} onSelect={handleTaskSelect} showAssignee={true} />
          ))}
        </div>
      ) : (
        <p className="text-slate">No tasks assigned to the team yet.</p>
      )}

      {selectedTask && selectedSop && (
        <SopModal 
            task={selectedTask} 
            sop={selectedSop} 
            onClose={handleCloseModal}
            onUpdateTask={handleUpdateTask}
            isReadOnly={true}
        />
      )}
      
      {isAssignModalOpen && (
        <AssignTaskModal 
            sops={MOCK_SOPS}
            workers={workers}
            onAssign={handleAssignTask}
            onClose={() => setAssignModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SupervisorDashboard;
