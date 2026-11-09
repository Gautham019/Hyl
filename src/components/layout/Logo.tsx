import { Code2 } from 'lucide-react';

type LogoProps = {
  className?: string;
};

export function Logo({ className = '' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-500 text-graphite-950">
        <Code2 className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
      </span>
      <span className="font-display text-xl font-bold tracking-tight text-graphite-50">HYL</span>
    </span>
  );
}
