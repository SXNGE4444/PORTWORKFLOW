
import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-light-navy shadow-md p-4 flex justify-between items-center z-10 border-b border-lightest-navy/20">
      <div>
        <h1 className="text-xl font-bold text-lightest-slate">Welcome to PortFlow</h1>
        <p className="text-sm text-slate">Terminal {user.terminal}</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="font-semibold text-lightest-slate">{user.name}</p>
          <p className="text-xs text-slate">{user.role}</p>
        </div>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
