// src/context/AuthContext.tsx
// Real Supabase authentication, with the same public API the app already uses
// (AuthProvider / useAuth / session), so no other file has to change shape.
//
// What changed vs the demo version:
//   • signIn(email)            → signIn(email, password)   (async, verified)
//   • signUp({name,username,email}) → signUp({…, password}) (async, creates a real user)
//   • signOut()                → async, ends the server session
//   • session now carries the real profile row (username / display name come
//     from the database, not from the email string)

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { AuthError, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

/**
 * The signed-in user, as the rest of the app expects it.
 * (Name kept as `DemoSession` so existing imports keep working.)
 */
export type DemoSession = {
  userId: string;
  displayName: string;
  username: string;
  email: string;
};

type SignUpInput = {
  name: string;
  username: string;
  email: string;
  password: string;
};

type SignUpResult = {
  /** true when the project requires email confirmation before the first login */
  needsEmailConfirmation: boolean;
};

type AuthValue = {
  session: DemoSession | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (input: SignUpInput) => Promise<SignUpResult>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthValue | null>(null);

function authErrorMessage(error: AuthError): string {
  const message = error.message.toLowerCase();
  if (message.includes('invalid login credentials')) return 'Email or password is incorrect.';
  if (message.includes('email not confirmed')) return 'Please confirm your email address first.';
  if (message.includes('user already registered')) return 'An account with this email already exists.';
  if (message.includes('password should be at least')) return 'Password must be at least 8 characters.';
  if (message.includes('unable to validate email')) return 'Enter a valid email address.';
  if (message.includes('rate limit') || error.status === 429) {
    return 'Too many attempts. Please wait a moment and try again.';
  }
  return error.message;
}

/**
 * Turns a Supabase auth session into the shape the UI consumes, reading the
 * profile row the signup trigger created.
 */
async function buildSession(session: Session | null): Promise<DemoSession | null> {
  if (!session?.user) return null;

  const metadata = (session.user.user_metadata ?? {}) as { username?: string; display_name?: string };

  const { data } = await supabase
    .from('profiles')
    .select('username, display_name')
    .eq('id', session.user.id)
    .maybeSingle();

  const profile = data as { username: string; display_name: string } | null;

  return {
    userId: session.user.id,
    email: session.user.email ?? '',
    username: profile?.username ?? metadata.username ?? '',
    displayName: profile?.display_name ?? metadata.display_name ?? profile?.username ?? 'Developer',
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<DemoSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;

    // Restore an existing session on first paint.
    void (async () => {
      const { data } = await supabase.auth.getSession();
      const next = await buildSession(data.session);
      if (alive) {
        setSession(next);
        setReady(true);
      }
    })();

    // Keep in sync: sign-in, sign-out, token refresh, another tab.
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      void buildSession(nextSession).then((next) => {
        if (alive) setSession(next);
      });
    });

    return () => {
      alive = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(authErrorMessage(error));
    setSession(await buildSession(data.session));
  }, []);

  const signUp = useCallback(async ({ name, username, email, password }: SignUpInput) => {
    const handle = username.toLowerCase();

    // The username is part of the signup payload (the database trigger reads it),
    // so check availability first to give a clear message instead of a silent rename.
    const { data: available, error: availabilityError } = await supabase.rpc('is_username_available', {
      p_username: handle,
    });
    if (availabilityError) throw new Error('Could not check that username. Please try again.');
    if (!available) throw new Error('That username is taken. Please choose another one.');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username: handle, display_name: name },
        emailRedirectTo: `${window.location.origin}/app`,
      },
    });
    if (error) throw new Error(authErrorMessage(error));

    if (data.session) {
      setSession(await buildSession(data.session));
    }

    return { needsEmailConfirmation: !data.session };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
  }, []);

  const value = useMemo<AuthValue>(() => ({ session, signIn, signUp, signOut }), [session, signIn, signUp, signOut]);

  // Wait for the stored session before rendering routes, so a refresh on /app
  // doesn't bounce through /login.
  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-graphite-950">
        <p className="text-sm text-graphite-400">Loading…</p>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
