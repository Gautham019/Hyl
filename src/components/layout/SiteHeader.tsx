import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { Button } from '@/components/ui/Button';
import { LOGIN_HREF, NAV_LINKS, SIGNUP_HREF } from '@/data/siteContent';

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? 'border-b border-graphite-800 bg-graphite-950/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <a href="#top" onClick={closeMenu} aria-label="HYL home">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-graphite-300 transition-colors duration-200 hover:text-graphite-50"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <Button href={LOGIN_HREF} variant="ghost" className="px-4 py-2">
            Log in
          </Button>
          <Button href={SIGNUP_HREF} className="px-4 py-2">
            Get started
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-graphite-700 text-graphite-100 transition-colors duration-200 hover:border-primary-500/60 md:hidden"
        >
          {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-graphite-800 bg-graphite-950/95 backdrop-blur-md transition-all duration-300 ease-out md:hidden ${
          isMenuOpen ? 'max-h-96 border-b opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-5 py-4 sm:px-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              className="rounded-md px-3 py-3 text-base font-medium text-graphite-200 transition-colors duration-200 hover:bg-graphite-850 hover:text-graphite-50"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Button href={LOGIN_HREF} variant="secondary" className="w-full">
              Log in
            </Button>
            <Button href={SIGNUP_HREF} className="w-full">
              Get started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
