
import React from 'react';
import { UserRole } from '../types';
import { ShipIcon, CheckSquareIcon, UsersIcon, AlertTriangleIcon } from './icons';

interface SidebarProps {
  userRole: UserRole;
}

const NavLink: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <a href="#" className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
    active 
      ? 'bg-green text-navy' 
      : 'text-light-slate hover:bg-lightest-navy hover:text-lightest-slate'
  }`}>
    {icon}
    <span className="ml-3">{label}</span>
  </a>
);

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const commonLinks = [
    { icon: <CheckSquareIcon className="w-5 h-5" />, label: 'My Tasks', roles: [UserRole.PortWorker], active: true },
    { icon: <AlertTriangleIcon className="w-5 h-5" />, label: 'Report Incident', roles: [UserRole.PortWorker, UserRole.Supervisor] },
  ];
  
  const supervisorLinks = [
    { icon: <UsersIcon className="w-5 h-5" />, label: 'Team Progress', roles: [UserRole.Supervisor], active: true },
  ];

  const getLinks = () => {
    switch (userRole) {
      case UserRole.PortWorker:
        return commonLinks.filter(link => link.roles.includes(UserRole.PortWorker));
      case UserRole.Supervisor:
        return [
            ...supervisorLinks.filter(link => link.roles.includes(UserRole.Supervisor)),
            ...commonLinks.filter(link => link.roles.includes(UserRole.Supervisor))
        ];
      default:
        return [];
    }
  };
  
  const links = getLinks();

  return (
    <aside className="w-64 bg-light-navy flex-shrink-0 p-4 border-r border-lightest-navy/20 flex flex-col">
        <div className="flex items-center mb-8 px-2">
            <ShipIcon className="w-10 h-10 text-green" />
            <span className="ml-3 text-2xl font-bold text-lightest-slate">PortFlow</span>
        </div>
      <nav className="flex-1 flex flex-col space-y-2">
        {links.map(link => (
          <NavLink key={link.label} icon={link.icon} label={link.label} active={link.active} />
        ))}
      </nav>
      <div className="mt-auto text-center text-xs text-slate">
        <p>&copy; 2024 PortFlow</p>
      </div>
    </aside>
  );
};

export default Sidebar;
