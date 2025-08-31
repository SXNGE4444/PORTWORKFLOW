
import React, { useState, useEffect } from 'react';
import { Task, SOP, TaskStatus } from '../types';
import { XIcon } from './icons';

interface SopModalProps {
  task: Task;
  sop: SOP;
  onClose: () => void;
  onUpdateTask: (updatedTask: Task) => void;
  isReadOnly?: boolean;
}

const SopModal: React.FC<SopModalProps> = ({ task, sop, onClose, onUpdateTask, isReadOnly = false }) => {
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(task.completedSteps);

  useEffect(() => {
    setCompletedSteps(task.completedSteps);
  }, [task]);

  const handleStepToggle = (index: number) => {
    if (isReadOnly) return;

    const newCompletedSteps = [...completedSteps];
    newCompletedSteps[index] = !newCompletedSteps[index];
    setCompletedSteps(newCompletedSteps);

    const isNowInProgress = newCompletedSteps.some(Boolean) && task.status === TaskStatus.Pending;
    onUpdateTask({ 
        ...task, 
        completedSteps: newCompletedSteps, 
        status: isNowInProgress ? TaskStatus.InProgress : task.status,
        updatedAt: new Date().toISOString()
    });
  };

  const handleCompleteTask = () => {
    if (isReadOnly) return;
    onUpdateTask({
      ...task,
      completedSteps,
      status: TaskStatus.Completed,
      completedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    onClose();
  };
  
  const allStepsCompleted = completedSteps.every(Boolean);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-light-navy rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-lightest-navy/20 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold text-lightest-slate">{sop.title}</h3>
            <p className="text-sm text-slate mt-1">{sop.description}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-lightest-navy transition-colors">
            <XIcon className="w-6 h-6 text-slate" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <ul className="space-y-4">
            {sop.steps.map((step, index) => (
              <li key={index} className="flex items-start">
                <input
                  type="checkbox"
                  id={`step-${index}`}
                  checked={completedSteps[index]}
                  onChange={() => handleStepToggle(index)}
                  disabled={isReadOnly}
                  className="mt-1 h-5 w-5 rounded bg-navy border-slate text-green focus:ring-green disabled:opacity-50"
                />
                <label htmlFor={`step-${index}`} className={`ml-3 text-light-slate ${completedSteps[index] ? 'line-through' : ''} ${isReadOnly ? 'cursor-default' : 'cursor-pointer'}`}>
                  {step.description}
                </label>
              </li>
            ))}
          </ul>
        </div>
        
        {!isReadOnly && (
            <div className="p-6 border-t border-lightest-navy/20 mt-auto">
            <button
                onClick={handleCompleteTask}
                disabled={!allStepsCompleted || task.status === TaskStatus.Completed}
                className="w-full bg-green text-navy font-bold py-3 px-4 rounded-md disabled:bg-lightest-navy disabled:text-slate disabled:cursor-not-allowed hover:bg-opacity-80 transition-colors"
            >
                {task.status === TaskStatus.Completed ? 'Task Already Completed' : 'Mark Task as Complete'}
            </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default SopModal;
