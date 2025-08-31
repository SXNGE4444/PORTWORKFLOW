
import React, { useState, useMemo, useCallback } from 'react';
import { User, Task, SOP, TaskStatus } from '../types';
import { MOCK_TASKS, MOCK_SOPS } from '../constants';
import TaskCard from './TaskCard';
import SopModal from './SopModal';

interface WorkerDashboardProps {
  user: User;
}

const WorkerDashboard: React.FC<WorkerDashboardProps> = ({ user }) => {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const userTasks = useMemo(() => {
    return tasks
      .filter(task => task.assignedTo === user._id)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }, [tasks, user._id]);
  
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
    // In a real app, this would also make an API call
  }, []);

  const pendingTasks = userTasks.filter(t => t.status === TaskStatus.Pending || t.status === TaskStatus.InProgress);
  const completedTasks = userTasks.filter(t => t.status === TaskStatus.Completed);


  return (
    <div>
      <h2 className="text-3xl font-bold text-lightest-slate mb-6">My Assigned Tasks</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-light-slate mb-4">Pending & In Progress</h3>
        {pendingTasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingTasks.map(task => (
                    <TaskCard key={task._id} task={task} onSelect={handleTaskSelect} />
                ))}
            </div>
        ) : (
            <p className="text-slate">No pending tasks. Great job!</p>
        )}
      </div>

       <div>
        <h3 className="text-xl font-semibold text-light-slate mb-4">Completed</h3>
        {completedTasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedTasks.map(task => (
                    <TaskCard key={task._id} task={task} onSelect={handleTaskSelect} />
                ))}
            </div>
        ) : (
            <p className="text-slate">No tasks completed yet.</p>
        )}
      </div>

      {selectedTask && selectedSop && (
        <SopModal 
            task={selectedTask} 
            sop={selectedSop} 
            onClose={handleCloseModal}
            onUpdateTask={handleUpdateTask}
        />
      )}
    </div>
  );
};

export default WorkerDashboard;
