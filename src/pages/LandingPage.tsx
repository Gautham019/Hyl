import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { About } from '@/components/home/About';
import { Features } from '@/components/home/Features';
import { FinalCta } from '@/components/home/FinalCta';
import { Hero } from '@/components/home/Hero';
import { HowItWorks } from '@/components/home/HowItWorks';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-graphite-950 font-sans text-graphite-100 antialiased">
      <SiteHeader />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <About />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
