
import React, { useState } from 'react';
import { SOP, User } from '../types';
import { XIcon } from './icons';

interface AssignTaskModalProps {
  sops: SOP[];
  workers: User[];
  onClose: () => void;
  onAssign: (sopId: string, assignedTo: string) => void;
}

const AssignTaskModal: React.FC<AssignTaskModalProps> = ({ sops, workers, onClose, onAssign }) => {
  const [selectedSop, setSelectedSop] = useState<string>('');
  const [selectedWorker, setSelectedWorker] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSop && selectedWorker) {
      onAssign(selectedSop, selectedWorker);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-light-navy rounded-lg shadow-2xl w-full max-w-lg">
        <div className="p-6 border-b border-lightest-navy/20 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-lightest-slate">Assign New Task</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-lightest-navy transition-colors">
            <XIcon className="w-6 h-6 text-slate" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="sop-select" className="block text-sm font-medium text-light-slate mb-2">
                Select SOP Template
              </label>
              <select
                id="sop-select"
                value={selectedSop}
                onChange={(e) => setSelectedSop(e.target.value)}
                required
                className="w-full bg-navy border border-lightest-navy/50 text-lightest-slate rounded-md p-2 focus:ring-green focus:border-green"
              >
                <option value="" disabled>Choose an SOP...</option>
                {sops.map((sop) => (
                  <option key={sop._id} value={sop._id}>{sop.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="worker-select" className="block text-sm font-medium text-light-slate mb-2">
                Assign to Worker
              </label>
              <select
                id="worker-select"
                value={selectedWorker}
                onChange={(e) => setSelectedWorker(e.target.value)}
                required
                className="w-full bg-navy border border-lightest-navy/50 text-lightest-slate rounded-md p-2 focus:ring-green focus:border-green"
              >
                <option value="" disabled>Choose a worker...</option>
                {workers.map((worker) => (
                  <option key={worker._id} value={worker._id}>{worker.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-6 border-t border-lightest-navy/20 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-lightest-navy text-lightest-slate font-bold py-2 px-4 rounded-md hover:bg-opacity-80 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedSop || !selectedWorker}
              className="bg-green text-navy font-bold py-2 px-4 rounded-md disabled:bg-lightest-navy disabled:text-slate disabled:cursor-not-allowed hover:bg-opacity-80 transition-colors"
            >
              Assign Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignTaskModal;
