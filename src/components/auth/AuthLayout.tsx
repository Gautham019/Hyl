import type { ReactNode } from 'react';
import { Info } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { Link } from 'react-router-dom';

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
};

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-graphite-950 px-5 py-16">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <Link to="/" aria-label="Back to HYL home" className="relative mb-10">
        <Logo />
      </Link>

      <div className="relative w-full max-w-md rounded-xl border border-graphite-800 bg-graphite-900 p-6 shadow-card sm:p-8 animate-slide-up">
        <h1 className="font-display text-2xl font-bold leading-[1.2] text-graphite-50">{title}</h1>
        <p className="mt-2 text-sm leading-normal text-graphite-400">{subtitle}</p>

        <div className="mt-6 flex gap-3 rounded-md border border-primary-500/25 bg-primary-500/5 p-3.5">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" aria-hidden="true" />
          <p className="text-xs leading-normal text-graphite-300">
            Demo mode: sign-in is simulated on this device. Credentials are not verified or stored on a server.
          </p>
        </div>

        <div className="mt-6">{children}</div>
      </div>

      <div className="relative mt-8 text-sm text-graphite-400">{footer}</div>
    </div>
  );
}
