// src/components/auth/SignupForm.tsx
// Same markup and styling; the submit handler now creates a real Supabase user
// (the username travels in the auth metadata and the database trigger turns it
// into a profile row).

import { useState, type FormEvent } from 'react';
import { AlertCircle, ArrowRight, Info } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { TextField } from '@/components/ui/FormFields';
import { isValidEmail, isValidUsername, toUsername } from '@/lib/utils';

type SignupErrors = { name?: string; username?: string; email?: string; password?: string };

export function SignupForm() {
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<SignupErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: SignupErrors = {};
    if (name.trim().length < 2) nextErrors.name = 'Enter your name.';
    if (!isValidUsername(username)) nextErrors.username = 'Use 3-20 letters, numbers or underscores.';
    if (!isValidEmail(email.trim())) nextErrors.email = 'Enter a valid email address.';
    if (password.length < 8) nextErrors.password = 'Password must be at least 8 characters.';
    setErrors(nextErrors);
    setFormError(null);
    setNotice(null);
    if (Object.keys(nextErrors).length > 0) return;

    setPending(true);
    try {
      const result = await signUp({
        name: name.trim(),
        username: username.toLowerCase(),
        email: email.trim(),
        password,
      });

      // With email confirmation enabled there is no session yet: tell the user
      // to click the link. With it disabled, the provider already has a session
      // and SignupPage redirects to /app on its own.
      if (result.needsEmailConfirmation) {
        setNotice(`Account created. We sent a confirmation link to ${email.trim()} — click it to finish signing in.`);
      }
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Could not create the account. Please try again.');
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

      {notice && (
        <div className="flex gap-2.5 rounded-md border border-primary-500/30 bg-primary-500/10 p-3">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" aria-hidden="true" />
          <p className="text-xs leading-normal text-graphite-200" role="status">
            {notice}
          </p>
        </div>
      )}

      <TextField
        label="Full name"
        autoComplete="name"
        placeholder="Ada Lovelace"
        value={name}
        onChange={(event) => setName(event.target.value)}
        error={errors.name}
      />
      <TextField
        label="Username"
        autoComplete="username"
        placeholder="adalovelace"
        value={username}
        onChange={(event) => setUsername(toUsername(event.target.value))}
        error={errors.username}
      />
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
        autoComplete="new-password"
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
        {pending ? 'Creating account…' : 'Create account'}
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </button>
    </form>
  );
}
