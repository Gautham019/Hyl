import type { ReactNode } from 'react';
import { Inbox } from 'lucide-react';

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-graphite-700 px-6 py-14 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-md border border-graphite-700 bg-graphite-900 text-graphite-400">
        <Inbox className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-display text-lg font-semibold text-graphite-100">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-normal text-graphite-400">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
