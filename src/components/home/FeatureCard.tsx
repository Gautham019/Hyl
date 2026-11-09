import type { Feature } from '@/data/siteContent';

type FeatureCardProps = Feature;

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <article className="group relative h-full rounded-lg border border-graphite-800 bg-graphite-900 p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary-500/50 hover:bg-graphite-850 hover:shadow-glow">
      <span className="flex h-11 w-11 items-center justify-center rounded-md border border-primary-500/20 bg-primary-500/10 text-primary-400 transition-colors duration-300 group-hover:border-primary-500/50 group-hover:bg-primary-500/20">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-6 font-display text-xl font-semibold text-graphite-50">{title}</h3>
      <p className="mt-2 text-sm leading-normal text-graphite-400">{description}</p>
    </article>
  );
}
