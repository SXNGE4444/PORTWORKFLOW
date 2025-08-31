
import React from 'react';
import { UserRole } from '../types';
import { ShipIcon } from './icons';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const roles = [UserRole.PortWorker, UserRole.Supervisor];

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-light-navy shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="text-center mb-8">
            <ShipIcon className="w-16 h-16 mx-auto text-green" />
            <h1 className="text-4xl font-bold text-lightest-slate mt-4">PortFlow</h1>
            <p className="text-slate mt-2">Streamlining Port Operations.</p>
          </div>
          <div className="mb-6">
            <label className="block text-light-slate text-sm font-bold mb-2" htmlFor="role-select">
              Select Your Role to Login
            </label>
            <p className="text-xs text-slate mb-4">This is a simulation. No password required.</p>
          </div>
          <div className="flex flex-col space-y-4">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => onLogin(role)}
                className="bg-green text-navy font-bold py-3 px-4 rounded-lg hover:bg-opacity-80 focus:outline-none focus:shadow-outline transition-colors duration-300"
              >
                Login as {role}
              </button>
            ))}
          </div>
           <div className="text-center mt-8">
                <p className="text-xs text-slate">© 2024 PortFlow. All rights reserved.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
