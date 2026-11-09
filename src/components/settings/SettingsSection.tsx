import type { ReactNode } from 'react';
import { cx } from '@/lib/utils';

type SettingsSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
};

export function SettingsSection({ title, description, children, className }: SettingsSectionProps) {
  return (
    <section className={cx('rounded-lg border border-graphite-800 bg-graphite-900 p-5 sm:p-6', className)}>
      <div className="mb-6 border-b border-graphite-800 pb-5">
        <h2 className="font-display text-lg font-semibold text-graphite-50">{title}</h2>
        <p className="mt-1 text-sm leading-normal text-graphite-400">{description}</p>
      </div>
      {children}
    </section>
  );
}
