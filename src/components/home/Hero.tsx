import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { ProjectShowcase } from '@/components/home/ProjectShowcase';
import { SIGNUP_HREF } from '@/data/siteContent';

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pb-24 pt-32 sm:px-8 sm:pt-36 lg:pb-32 lg:pt-40"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -right-40 top-20 h-[480px] w-[480px] rounded-full bg-primary-500/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-graphite-700 bg-graphite-900/80 px-3.5 py-1.5 font-mono text-xs text-graphite-300">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400 animate-pulse-dot" />
              Build. Share. Connect.
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.1] tracking-tight text-graphite-50 sm:text-6xl lg:text-7xl">
              Your work deserves to be <span className="text-primary-400">seen.</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-base leading-normal text-graphite-400 sm:text-lg">
              A community built for developers to showcase projects, share ideas, discover talent and grow together.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="#explore" withArrow>
                Explore HYL
              </Button>
              <Button href={SIGNUP_HREF} variant="secondary">
                Join the community
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={250}>
          <ProjectShowcase />
        </Reveal>
      </div>
    </section>
  );
}
