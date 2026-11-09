import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function About() {
  return (
    <Section id="about" className="border-t border-graphite-800/70">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal>
          <SectionHeader
            eyebrow="About"
            title={
              <>
                Built for the people who <span className="text-primary-400">make things.</span>
              </>
            }
          />
        </Reveal>

        <Reveal delay={150} className="flex flex-col justify-center gap-6 text-base leading-normal text-graphite-300 sm:text-lg">
          <p>
            HYL is a home for developers, programmers, students and creators who are proud of what they build. We
            believe great work deserves an audience, and that the right community helps every builder grow.
          </p>
          <p className="text-graphite-400">
            Share your projects, tell the story behind them, and find the people who will push your ideas further.
          </p>
          <div className="h-px w-16 bg-primary-500" />
        </Reveal>
      </div>
    </Section>
  );
}
