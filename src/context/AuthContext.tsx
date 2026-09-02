import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';

export type AuthMode = 'login' | 'signup' | 'forgot';

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
  // Flow 1: Signup with Email + Password + OTP Verification
  signUpWithEmailPassword: (email: string, pass: string, name: string, role?: string) => Promise<{ success: boolean; requiresOtp?: boolean; error?: string }>;
  verifySignUpOtp: (email: string, token: string, name: string, role?: string) => Promise<{ success: boolean; error?: string }>;
  // Flow 2: Direct Login with Email + Password
  signInWithPassword: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  // Flow 3: Forgot Password (Email OTP -> Set New Password)
  sendForgotPasswordOtp: (email: string) => Promise<{ success: boolean; error?: string }>;
  resetPasswordWithOtp: (email: string, token: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  // Flow 4: Google 1-Click OAuth
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
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

        // If on login or signup route, forward to evaluation report
        const hash = window.location.hash;
        if (
          hash === '#login' ||
          hash === '#signup' ||
          hash === '#auth' ||
          hash === '#signin' ||
          hash.includes('access_token') ||
          hash.includes('refresh_token')
        ) {
          window.location.hash = '#evaluation';
        }
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

        if (event === 'SIGNED_IN') {
          const hash = window.location.hash;
          if (
            hash === '#login' ||
            hash === '#signup' ||
            hash === '#auth' ||
            hash === '#signin' ||
            hash.includes('access_token') ||
            hash.includes('refresh_token')
          ) {
            window.location.hash = '#evaluation';
          }
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        localStorage.removeItem('tejas_user');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const openAuth = useCallback((mode: AuthMode = 'login') => {
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
    window.location.hash = '#evaluation';
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

  // ─── 1. Signup: Create account & dispatch OTP ──────────────
  const signUpWithEmailPassword = async (email: string, pass: string, name: string, role = 'Student') => {
    setIsLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
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

      // If user session already created immediately (e.g. email confirmation disabled in Supabase)
      if (data?.session?.user) {
        const u = data.session.user;
        const profile: UserProfile = {
          id: u.id,
          name: name.trim(),
          email: cleanEmail,
          role: role as any,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        };
        setUser(profile);
        localStorage.setItem('tejas_user', JSON.stringify(profile));
        setIsLoading(false);
        closeAuth();
        window.location.hash = '#evaluation';
        return { success: true, requiresOtp: false };
      }

      // Supabase sent verification OTP to user's email
      setIsLoading(false);
      return { success: true, requiresOtp: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || 'Failed to sign up.' };
    }
  };

  // ─── 2. Verify Signup OTP ──────────────────────────────────
  const verifySignUpOtp = async (email: string, token: string, name: string, role = 'Student') => {
    setIsLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      
      // Try verifying with signup type first, fallback to email type
      let verifyResult = await supabase.auth.verifyOtp({
        email: cleanEmail,
        token: token.trim(),
        type: 'signup',
      });

      if (verifyResult.error) {
        verifyResult = await supabase.auth.verifyOtp({
          email: cleanEmail,
          token: token.trim(),
          type: 'email',
        });
      }

      if (verifyResult.error) {
        setIsLoading(false);
        return { success: false, error: verifyResult.error.message };
      }

      const u = verifyResult.data?.user;
      const profile: UserProfile = {
        id: u?.id,
        name: name || u?.user_metadata?.full_name || cleanEmail.split('@')[0],
        email: cleanEmail,
        role: role as any,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      };

      setUser(profile);
      localStorage.setItem('tejas_user', JSON.stringify(profile));
      setIsLoading(false);
      closeAuth();
      window.location.hash = '#evaluation';
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || 'OTP verification failed.' };
    }
  };

  // ─── 3. Sign In with Email + Password ──────────────────────
  const signInWithPassword = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
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
          name: u.user_metadata?.full_name || u.user_metadata?.name || cleanEmail.split('@')[0],
          email: cleanEmail,
          role: (u.user_metadata?.role as any) || 'Student',
          avatar: u.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        };
        setUser(profile);
        localStorage.setItem('tejas_user', JSON.stringify(profile));
        setIsLoading(false);
        closeAuth();
        window.location.hash = '#evaluation';
      }

      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || 'Login failed.' };
    }
  };

  // ─── 4. Forgot Password: Send OTP ──────────────────────────
  const sendForgotPasswordOtp = async (email: string) => {
    setIsLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: `${window.location.origin}${window.location.pathname}#login`,
      });

      setIsLoading(false);
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || 'Failed to send password reset instructions.' };
    }
  };

  // ─── 5. Reset Password: Set New Password ───────────────────
  const resetPasswordWithOtp = async (email: string, token: string, newPassword: string) => {
    setIsLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      // Verify recovery token
      const { error: verifyErr } = await supabase.auth.verifyOtp({
        email: cleanEmail,
        token: token.trim(),
        type: 'recovery',
      });

      if (verifyErr) {
        setIsLoading(false);
        return { success: false, error: verifyErr.message };
      }

      // Update password
      const { error: updateErr } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateErr) {
        setIsLoading(false);
        return { success: false, error: updateErr.message };
      }

      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || 'Failed to update password.' };
    }
  };

  // ─── 6. Google OAuth ───────────────────────────────────────
  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}${window.location.pathname}#evaluation`,
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

      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || 'Google Sign-In failed.' };
    }
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
        signUpWithEmailPassword,
        verifySignUpOtp,
        signInWithPassword,
        sendForgotPasswordOtp,
        resetPasswordWithOtp,
        signInWithGoogle,
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
