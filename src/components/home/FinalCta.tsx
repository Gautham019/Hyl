import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SIGNUP_HREF } from '@/data/siteContent';

export function FinalCta() {
  return (
    <Section className="border-t border-graphite-800/70">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-graphite-800 bg-graphite-900 px-6 py-16 text-center sm:px-12 lg:py-20">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary-500/70 to-transparent" />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-[1.2] tracking-tight text-graphite-50 sm:text-4xl lg:text-5xl">
              Build something worth sharing.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-normal text-graphite-400 sm:text-lg">
              Your next project, your next collaborator and your next opportunity start with a single profile.
            </p>
            <div className="mt-10 flex justify-center">
              <Button href={SIGNUP_HREF} withArrow>
                Get started with HYL
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
