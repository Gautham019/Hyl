import { FeatureCard } from '@/components/home/FeatureCard';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FEATURES } from '@/data/siteContent';

export function Features() {
  return (
    <Section id="explore" className="border-t border-graphite-800/70">
      <Reveal>
        <SectionHeader
          eyebrow="Features"
          title="Everything you need to be seen."
          description="The tools to present your work, your identity and your ideas in one place."
        />
      </Reveal>

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature, index) => (
          <Reveal key={feature.title} delay={index * 100}>
            <FeatureCard {...feature} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
