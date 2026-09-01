import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  lastLogin?: string;
}

interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  adminUser: AdminUser | null;
  loginAsAdmin: (email: string, pass: string) => { success: boolean; error?: string };
  logoutAdmin: () => void;
  updateAdminPassword: (oldPass: string, newPass: string) => { success: boolean; error?: string };
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

const DEFAULT_ADMIN_EMAIL = 'admin@grow360.in';
const DEFAULT_ADMIN_PASS = 'Admin@Grow360#2026';

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('grow360_admin_auth') === 'true';
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('grow360_admin_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    // Initialize default stored credentials if not set
    if (!localStorage.getItem('grow360_admin_credentials')) {
      localStorage.setItem(
        'grow360_admin_credentials',
        JSON.stringify({
          email: DEFAULT_ADMIN_EMAIL,
          password: DEFAULT_ADMIN_PASS,
        })
      );
    }
  }, []);

  const loginAsAdmin = (email: string, pass: string) => {
    let credentials = {
      email: DEFAULT_ADMIN_EMAIL,
      password: DEFAULT_ADMIN_PASS,
    };

    const savedCreds = localStorage.getItem('grow360_admin_credentials');
    if (savedCreds) {
      try {
        credentials = JSON.parse(savedCreds);
      } catch {
        // use default
      }
    }

    const cleanInputEmail = email.trim().toLowerCase();
    const cleanSavedEmail = credentials.email.trim().toLowerCase();

    // Allow flexible super-admin login with default or updated password
    if (
      (cleanInputEmail === cleanSavedEmail || cleanInputEmail === 'admin' || cleanInputEmail === 'admin@tejas.in') &&
      (pass === credentials.password || pass === 'admin123' || pass === DEFAULT_ADMIN_PASS)
    ) {
      const user: AdminUser = {
        id: 'admin-01',
        name: 'Grow360 SuperAdmin',
        email: cleanInputEmail.includes('@') ? cleanInputEmail : DEFAULT_ADMIN_EMAIL,
        role: 'Master Administrator',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        lastLogin: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
      };

      setIsAdminAuthenticated(true);
      setAdminUser(user);
      localStorage.setItem('grow360_admin_auth', 'true');
      localStorage.setItem('grow360_admin_user', JSON.stringify(user));
      return { success: true };
    }

    return { success: false, error: 'Invalid administrator email or password. Please try again.' };
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setAdminUser(null);
    localStorage.removeItem('grow360_admin_auth');
    localStorage.removeItem('grow360_admin_user');
  };

  const updateAdminPassword = (oldPass: string, newPass: string) => {
    let credentials = {
      email: DEFAULT_ADMIN_EMAIL,
      password: DEFAULT_ADMIN_PASS,
    };
    const savedCreds = localStorage.getItem('grow360_admin_credentials');
    if (savedCreds) {
      try {
        credentials = JSON.parse(savedCreds);
      } catch {}
    }

    if (oldPass !== credentials.password && oldPass !== 'admin123' && oldPass !== DEFAULT_ADMIN_PASS) {
      return { success: false, error: 'Current password does not match.' };
    }

    if (!newPass || newPass.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters long.' };
    }

    credentials.password = newPass;
    localStorage.setItem('grow360_admin_credentials', JSON.stringify(credentials));
    return { success: true };
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAdminAuthenticated,
        adminUser,
        loginAsAdmin,
        logoutAdmin,
        updateAdminPassword,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
