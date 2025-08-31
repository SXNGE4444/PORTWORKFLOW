
import React, { useState, useCallback } from 'react';
import { User, UserRole } from './types';
import { MOCK_USERS } from './constants';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = useCallback((role: UserRole) => {
    const user = MOCK_USERS.find(u => u.role === role);
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-navy text-lightest-slate">
      <Sidebar userRole={currentUser.role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={currentUser} onLogout={handleLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-navy p-4 md:p-8">
          <Dashboard user={currentUser} />
        </main>
      </div>
    </div>
  );
};

export default App;
