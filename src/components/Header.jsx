import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Мои долги</h1>
          <p className="text-sm text-gray-600">Торговый: {user?.name}</p>
        </div>
        <button
          onClick={logout}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Выйти
        </button>
      </div>
    </header>
  );
};

export default Header;