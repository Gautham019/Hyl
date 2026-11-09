import type { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-3xl font-bold leading-[1.2] tracking-tight text-graphite-50">{title}</h1>
        {description && <p className="mt-2 text-sm leading-normal text-graphite-400">{description}</p>}
      </div>
      {action}
    </div>
  );
}
