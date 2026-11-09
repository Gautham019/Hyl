import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { STEPS } from '@/data/siteContent';

export function HowItWorks() {
  return (
    <Section className="border-t border-graphite-800/70">
      <Reveal>
        <SectionHeader eyebrow="How it works" title="Three simple steps." />
      </Reveal>

      <div className="relative mt-16">
        <div
          aria-hidden="true"
          className="absolute bottom-5 left-5 top-5 w-px bg-graphite-700 md:bottom-auto md:left-0 md:right-0 md:top-5 md:h-px md:w-auto"
        />
        <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, index) => (
            <li key={step.title} className="relative pl-16 md:pl-0 md:pt-16">
              <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-md border border-primary-500/40 bg-graphite-950 font-mono text-sm font-medium text-primary-400">
                {String(index + 1).padStart(2, '0')}
              </span>
              <Reveal delay={index * 150}>
                <p className="pt-2 font-display text-2xl font-semibold leading-[1.2] text-graphite-50">{step.title}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
