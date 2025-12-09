import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Role } from '../types';
import { DEFAULT_ADMIN_CREDENTIALS } from '../constants';

interface AuthContextType {
  currentUser: User | null;
  users: User[]; // List of all users (for Master)
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addUser: (user: User) => boolean;
  deleteUser: (username: string) => boolean;
  changePassword: (username: string, newPass: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Load users from localStorage on mount
  useEffect(() => {
    const savedUsers = localStorage.getItem('altra_admin_users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      // Seed with default admin if no users exist
      const initialUsers = [{ 
        username: DEFAULT_ADMIN_CREDENTIALS.username, 
        password: DEFAULT_ADMIN_CREDENTIALS.password, 
        role: DEFAULT_ADMIN_CREDENTIALS.role as Role 
      }];
      setUsers(initialUsers);
      localStorage.setItem('altra_admin_users', JSON.stringify(initialUsers));
    }
  }, []);

  // Save users whenever they change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('altra_admin_users', JSON.stringify(users));
    }
  }, [users]);

  const login = (username: string, password: string): boolean => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addUser = (newUser: User): boolean => {
    if (users.some(u => u.username === newUser.username)) {
      return false; // User exists
    }
    setUsers(prev => [...prev, newUser]);
    return true;
  };

  const deleteUser = (username: string): boolean => {
    if (username === currentUser?.username) return false; // Cannot delete yourself
    if (username === 'admin') return false; // Cannot delete hardcoded root admin username (safety)
    
    setUsers(prev => prev.filter(u => u.username !== username));
    return true;
  };

  const changePassword = (username: string, newPass: string): boolean => {
    setUsers(prev => prev.map(u => {
      if (u.username === username) {
        return { ...u, password: newPass };
      }
      return u;
    }));
    
    // If updating current user, update session state too
    if (currentUser?.username === username) {
      setCurrentUser(prev => prev ? { ...prev, password: newPass } : null);
    }
    return true;
  };

  return (
    <AuthContext.Provider value={{ currentUser, users, login, logout, addUser, deleteUser, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};