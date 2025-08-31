
import React from 'react';
import { Task, TaskStatus } from '../types';
import { MOCK_SOPS, MOCK_USERS } from '../constants';

interface TaskCardProps {
  task: Task;
  onSelect: (task: Task) => void;
  showAssignee?: boolean;
}

const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.Completed:
      return 'bg-green text-navy';
    case TaskStatus.InProgress:
      return 'bg-blue-500 text-white';
    case TaskStatus.Pending:
      return 'bg-yellow-500 text-black';
    case TaskStatus.Blocked:
      return 'bg-red-500 text-white';
    default:
      return 'bg-slate-700 text-slate-300';
  }
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onSelect, showAssignee = false }) => {
  const sop = MOCK_SOPS.find(s => s._id === task.sopId);
  const assignee = showAssignee ? MOCK_USERS.find(u => u._id === task.assignedTo) : null;
  const progress = Math.round((task.completedSteps.filter(Boolean).length / task.completedSteps.length) * 100);

  return (
    <div 
      onClick={() => onSelect(task)}
      className="bg-light-navy rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-2xl hover:ring-2 hover:ring-green transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-start mb-2">
            <h4 className="text-lg font-bold text-lightest-slate pr-2">{sop?.title || 'Unknown SOP'}</h4>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
                {task.status}
            </span>
        </div>
        <p className="text-sm text-slate mb-4 line-clamp-2">{sop?.description}</p>
        {showAssignee && assignee && (
             <p className="text-xs text-light-slate mb-2">Assigned to: <span className="font-semibold">{assignee.name}</span></p>
        )}
      </div>

      <div>
        <div className="w-full bg-lightest-navy/30 rounded-full h-2.5 mb-1">
          <div className="bg-green h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-xs text-slate text-right">{progress}% complete</p>
      </div>
    </div>
  );
};

export default TaskCard;
