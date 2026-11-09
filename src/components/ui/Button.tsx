import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  withArrow?: boolean;
  className?: string;
};

const baseClasses =
  'group inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-all duration-300 ease-out active:scale-[0.98]';

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-primary-500 text-graphite-950 hover:bg-primary-400 hover:shadow-glow',
  secondary:
    'border border-graphite-600 text-graphite-100 hover:border-primary-500/60 hover:bg-graphite-800/70',
  ghost: 'text-graphite-300 hover:text-graphite-50',
};

export function Button({ href, children, variant = 'primary', withArrow = false, className = '' }: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
  const content = (
    <>
      {children}
      {withArrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (href.startsWith('/')) {
    return (
      <Link to={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}
