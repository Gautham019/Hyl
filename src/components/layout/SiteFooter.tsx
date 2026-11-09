import { Logo } from '@/components/layout/Logo';
import { CONTACT_EMAIL } from '@/data/siteContent';

const FOOTER_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#explore' },
  { label: 'Contact', href: `mailto:${CONTACT_EMAIL}` },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-graphite-800 bg-graphite-950 px-5 py-14 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <a href="#top" aria-label="HYL home">
            <Logo />
          </a>
          <p className="mt-4 text-sm leading-normal text-graphite-400">
            Your work deserves to be seen. Build. Share. Connect.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex items-center gap-8">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-graphite-300 transition-colors duration-200 hover:text-primary-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-graphite-800 pt-6 text-xs text-graphite-400 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {year} HYL. All rights reserved.</p>
        <p>Built for developers, programmers, students and creators.</p>
      </div>
    </footer>
  );
}
