import type { ReactNode } from 'react';
import { cx } from '@/lib/utils';

export function Tag({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded border border-graphite-700 bg-graphite-850 px-2 py-0.5 font-mono text-[11px] text-graphite-300',
        className,
      )}
    >
      {children}
    </span>
  );
}
