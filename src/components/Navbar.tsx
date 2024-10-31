import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Menu, User, LogOut, Home, Apple, MessageSquare, Camera } from 'lucide-react';

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Apple className="h-8 w-8 text-green-600" />
              <span className="font-bold text-xl text-gray-800">NutriAI</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/" className="nav-link">
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
                <Link to="/nutrition-plan" className="nav-link">
                  <Apple className="h-5 w-5" />
                  <span>My Plan</span>
                </Link>
                <Link to="/food-analysis" className="nav-link">
                  <Camera className="h-5 w-5" />
                  <span>Analysis</span>
                </Link>
                <Link to="/chat" className="nav-link">
                  <MessageSquare className="h-5 w-5" />
                  <span>Chat</span>
                </Link>
                <button onClick={handleLogout} className="nav-link text-red-600">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="nav-link">
                <User className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};