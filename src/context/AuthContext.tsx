import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type AuthMode = 'login' | 'signup';

export interface UserProfile {
  name: string;
  email: string;
  role: 'Student' | 'Mentor' | 'Placement Officer';
  avatar?: string;
}

interface AuthContextValue {
  isAuthOpen: boolean;
  authMode: AuthMode;
  user: UserProfile | null;
  openAuth: (mode?: AuthMode) => void;
  closeAuth: () => void;
  setAuthMode: (mode: AuthMode) => void;
  login: (profile: UserProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('signup');
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('tejas_user');
    return saved ? JSON.parse(saved) : null;
  });

  const openAuth = useCallback((mode: AuthMode = 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeAuth = useCallback(() => {
    setIsAuthOpen(false);
    document.body.style.overflow = '';
  }, []);

  const login = useCallback((profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem('tejas_user', JSON.stringify(profile));
    closeAuth();
    window.location.hash = '#dashboard';
  }, [closeAuth]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('tejas_user');
    window.location.hash = '';
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthOpen,
        authMode,
        user,
        openAuth,
        closeAuth,
        setAuthMode,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
