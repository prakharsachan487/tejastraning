import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';

export type AuthMode = 'login' | 'signup';

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  role: 'Student' | 'Mentor' | 'Placement Officer';
  avatar?: string;
}

interface AuthContextValue {
  isAuthOpen: boolean;
  authMode: AuthMode;
  user: UserProfile | null;
  isLoading: boolean;
  openAuth: (mode?: AuthMode) => void;
  closeAuth: () => void;
  setAuthMode: (mode: AuthMode) => void;
  login: (profile: UserProfile) => void;
  logout: () => Promise<void>;
  sendEmailOtp: (email: string) => Promise<{ success: boolean; error?: string }>;
  verifyEmailOtp: (email: string, token: string, role?: string, name?: string) => Promise<{ success: boolean; error?: string }>;
  signInWithPassword: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithPassword: (email: string, password: string, name: string, role?: string) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  demoLogin: (role?: 'Student' | 'Mentor' | 'Placement Officer') => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('signup');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('tejas_user');
    return saved ? JSON.parse(saved) : null;
  });

  // ─── Listen for Supabase Auth State Changes ─────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const u = session.user;
        const profile: UserProfile = {
          id: u.id,
          name: u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split('@')[0] || 'User',
          email: u.email || '',
          role: (u.user_metadata?.role as any) || 'Student',
          avatar: u.user_metadata?.avatar_url || u.user_metadata?.picture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        };
        setUser(profile);
        localStorage.setItem('tejas_user', JSON.stringify(profile));
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const u = session.user;
        const profile: UserProfile = {
          id: u.id,
          name: u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split('@')[0] || 'User',
          email: u.email || '',
          role: (u.user_metadata?.role as any) || 'Student',
          avatar: u.user_metadata?.avatar_url || u.user_metadata?.picture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        };
        setUser(profile);
        localStorage.setItem('tejas_user', JSON.stringify(profile));
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        localStorage.removeItem('tejas_user');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

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

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
    } catch {}
    setUser(null);
    localStorage.removeItem('tejas_user');
    setIsLoading(false);
    window.location.hash = '';
  }, []);

  // ─── 1. Password Sign In ────────────────────────────────────
  const signInWithPassword = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: pass,
      });

      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }

      if (data?.user) {
        const u = data.user;
        const profile: UserProfile = {
          id: u.id,
          name: u.user_metadata?.full_name || u.user_metadata?.name || email.split('@')[0],
          email: u.email || email,
          role: (u.user_metadata?.role as any) || 'Student',
          avatar: u.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        };
        setUser(profile);
        localStorage.setItem('tejas_user', JSON.stringify(profile));
        closeAuth();
        window.location.hash = '#dashboard';
      }

      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || 'Login failed.' };
    }
  };

  // ─── 2. Password Sign Up ────────────────────────────────────
  const signUpWithPassword = async (email: string, pass: string, name: string, role = 'Student') => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password: pass,
        options: {
          data: {
            full_name: name.trim(),
            role,
          },
        },
      });

      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }

      if (data?.user) {
        const u = data.user;
        const profile: UserProfile = {
          id: u.id,
          name: name.trim(),
          email: u.email || email,
          role: role as any,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        };
        setUser(profile);
        localStorage.setItem('tejas_user', JSON.stringify(profile));
        closeAuth();
        window.location.hash = '#dashboard';
      }

      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || 'Sign up failed.' };
    }
  };

  // ─── 3. Send Email OTP ──────────────────────────────────────
  const sendEmailOtp = async (email: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: {
          shouldCreateUser: true,
        },
      });

      setIsLoading(false);
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || 'Failed to send OTP code.' };
    }
  };

  // ─── 4. Verify Email OTP ────────────────────────────────────
  const verifyEmailOtp = async (email: string, token: string, role = 'Student', name?: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email.trim().toLowerCase(),
        token: token.trim(),
        type: 'email',
      });

      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }

      if (data?.user) {
        const u = data.user;
        const displayName = name || u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split('@')[0] || 'Student User';
        
        if (name || role) {
          await supabase.auth.updateUser({
            data: { full_name: displayName, role },
          });
        }

        const profile: UserProfile = {
          id: u.id,
          name: displayName,
          email: u.email || email,
          role: role as any,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        };

        setUser(profile);
        localStorage.setItem('tejas_user', JSON.stringify(profile));
        closeAuth();
        window.location.hash = '#dashboard';
      }

      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || 'OTP verification failed.' };
    }
  };

  // ─── 5. Google OAuth ────────────────────────────────────────
  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}${window.location.pathname}`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }

      if (data?.url) {
        window.location.href = data.url;
      }

      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || 'Google Sign-In failed.' };
    }
  };

  // ─── 6. Instant Demo Login (For Dev & Instant Testing) ──────
  const demoLogin = (selectedRole: 'Student' | 'Mentor' | 'Placement Officer' = 'Student') => {
    const demoProfiles: Record<string, UserProfile> = {
      Student: {
        id: 'demo-student-1',
        name: 'Aryan Sharma',
        email: 'aryan.sharma@parul.edu.in',
        role: 'Student',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      },
      Mentor: {
        id: 'demo-mentor-1',
        name: 'Dr. Vivek Menon',
        email: 'v.menon@grow360.in',
        role: 'Mentor',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      },
      'Placement Officer': {
        id: 'demo-tpo-1',
        name: 'Prof. R. K. Saxena',
        email: 'tpo.director@institution.ac.in',
        role: 'Placement Officer',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      },
    };

    const profile = demoProfiles[selectedRole] || demoProfiles.Student;
    setUser(profile);
    localStorage.setItem('tejas_user', JSON.stringify(profile));
    closeAuth();
    window.location.hash = '#dashboard';
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthOpen,
        authMode,
        user,
        isLoading,
        openAuth,
        closeAuth,
        setAuthMode,
        login,
        logout,
        sendEmailOtp,
        verifyEmailOtp,
        signInWithPassword,
        signUpWithPassword,
        signInWithGoogle,
        demoLogin,
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
