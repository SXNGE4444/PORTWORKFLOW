
import React from 'react';
import { User, UserRole } from '../types';
import WorkerDashboard from './WorkerDashboard';
import SupervisorDashboard from './SupervisorDashboard';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  switch (user.role) {
    case UserRole.PortWorker:
      return <WorkerDashboard user={user} />;
    case UserRole.Supervisor:
      return <SupervisorDashboard user={user} />;
    // Add cases for other roles here
    default:
      return (
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-lightest-slate">Dashboard Not Available</h2>
          <p className="text-slate mt-2">
            A dashboard for the role "{user.role}" has not been implemented yet.
          </p>
        </div>
      );
  }
};

export default Dashboard;
