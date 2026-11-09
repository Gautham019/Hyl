import type { ReactNode } from 'react';

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, className = '', children }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-20 px-5 py-24 sm:px-8 lg:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
