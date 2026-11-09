import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type DemoSession = {
  displayName: string;
  username: string;
  email: string;
};

type SignUpInput = {
  name: string;
  username: string;
  email: string;
};

type AuthValue = {
  session: DemoSession | null;
  signIn: (email: string) => void;
  signUp: (input: SignUpInput) => void;
  signOut: () => void;
};

const STORAGE_KEY = 'hyl.demo-session';

const AuthContext = createContext<AuthValue | null>(null);

function readStoredSession(): DemoSession | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<DemoSession>;
    if (typeof parsed.displayName === 'string' && typeof parsed.username === 'string' && typeof parsed.email === 'string') {
      return { displayName: parsed.displayName, username: parsed.username, email: parsed.email };
    }
    return null;
  } catch {
    return null;
  }
}

function writeStoredSession(session: DemoSession | null) {
  if (session) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } else {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

function displayNameFromEmail(email: string): string {
  const local = email.split('@')[0].replace(/[._-]+/g, ' ').trim();
  return local.replace(/\b\w/g, (letter) => letter.toUpperCase()) || 'Developer';
}

function usernameFromEmail(email: string): string {
  return email.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 20) || 'developer';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<DemoSession | null>(readStoredSession);

  const value = useMemo<AuthValue>(() => {
    const persist = (next: DemoSession | null) => {
      writeStoredSession(next);
      setSession(next);
    };

    return {
      session,
      // Demo only: credentials are not verified or stored. Replace with Supabase auth later.
      signIn: (email) =>
        persist({ displayName: displayNameFromEmail(email), username: usernameFromEmail(email), email }),
      signUp: ({ name, username, email }) => persist({ displayName: name, username, email }),
      signOut: () => persist(null),
    };
  }, [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
