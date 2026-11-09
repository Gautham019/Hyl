import { useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: SignupErrors = {};
    if (name.trim().length < 2) nextErrors.name = 'Enter your name.';
    if (!isValidUsername(username)) nextErrors.username = 'Use 3-20 letters, numbers or underscores.';
    if (!isValidEmail(email.trim())) nextErrors.email = 'Enter a valid email address.';
    if (password.length < 8) nextErrors.password = 'Password must be at least 8 characters.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      signUp({ name: name.trim(), username: username.toLowerCase(), email: email.trim() });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
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
        className="group mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary-500 text-sm font-semibold text-graphite-950 transition-all duration-300 hover:bg-primary-400 hover:shadow-glow active:scale-[0.99]"
      >
        Create account
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </button>
    </form>
  );
}
