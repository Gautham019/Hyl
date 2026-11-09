import type { ReactNode } from 'react';

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
};

export function SectionHeader({ eyebrow, title, description, align = 'left' }: SectionHeaderProps) {
  const alignment = align === 'center' ? 'mx-auto text-center' : '';

  return (
    <div className={`max-w-2xl ${alignment}`}>
      <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary-400">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl font-bold leading-[1.2] tracking-tight text-graphite-50 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-normal text-graphite-400 sm:text-lg">{description}</p>
      )}
    </div>
  );
}
