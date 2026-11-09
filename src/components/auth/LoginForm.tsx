// src/components/auth/LoginForm.tsx
// Same markup and styling; the submit handler now talks to Supabase and
// surfaces server errors (wrong password, unconfirmed email, rate limit).

import { useState, type FormEvent } from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { TextField } from '@/components/ui/FormFields';
import { isValidEmail } from '@/lib/utils';

type LoginErrors = { email?: string; password?: string };

export function LoginForm() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: LoginErrors = {};
    if (!isValidEmail(email.trim())) nextErrors.email = 'Enter a valid email address.';
    if (password.length < 8) nextErrors.password = 'Password must be at least 8 characters.';
    setErrors(nextErrors);
    setFormError(null);
    if (Object.keys(nextErrors).length > 0) return;

    setPending(true);
    try {
      await signIn(email.trim(), password);
      // On success the provider updates `session`, and LoginPage redirects to /app.
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Could not sign in. Please try again.');
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {formError && (
        <div className="flex gap-2.5 rounded-md border border-error-500/40 bg-error-500/10 p-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-error-400" aria-hidden="true" />
          <p className="text-xs leading-normal text-graphite-200" role="alert">
            {formError}
          </p>
        </div>
      )}

      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="At least 8 characters"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={errors.password}
      />
      <button
        type="submit"
        disabled={pending}
        className="group mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary-500 text-sm font-semibold text-graphite-950 transition-all duration-300 hover:bg-primary-400 hover:shadow-glow active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-primary-500 disabled:hover:shadow-none"
      >
        {pending ? 'Logging in…' : 'Log in'}
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </button>
    </form>
  );
}
