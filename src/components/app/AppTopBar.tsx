import { useState, type FormEvent } from 'react';
import { Bell, Search, Settings } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Logo } from '@/components/layout/Logo';
import { Avatar } from '@/components/people/Avatar';
import { useAppData } from '@/context/AppDataContext';
import { cx } from '@/lib/utils';

export function AppTopBar() {
  const { currentUser, unreadCount } = useAppData();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/app/explore?q=${encodeURIComponent(trimmed)}` : '/app/explore');
  };

  return (
    <header className="sticky top-0 z-20 border-b border-graphite-800 bg-graphite-950/85 backdrop-blur-md">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/app" aria-label="HYL home" className="lg:hidden">
          <Logo />
        </Link>

        <form onSubmit={handleSearch} role="search" className="relative hidden max-w-md flex-1 md:block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite-500" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search developers and projects"
            aria-label="Search developers and projects"
            className="h-10 w-full rounded-md border border-graphite-700 bg-graphite-900 pl-10 pr-4 text-sm text-graphite-100 placeholder:text-graphite-500 transition-colors duration-200 hover:border-graphite-600 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          />
        </form>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/app/settings"
            aria-label="Settings"
            className="flex h-10 w-10 items-center justify-center rounded-md text-graphite-400 transition-colors duration-200 hover:bg-graphite-850 hover:text-graphite-50 md:hidden"
          >
            <Settings className="h-5 w-5" aria-hidden="true" />
          </Link>

          <NavLink
            to="/app/notifications"
            aria-label={unreadCount > 0 ? `Notifications, ${unreadCount} unread` : 'Notifications'}
            className={({ isActive }) =>
              cx(
                'relative flex h-10 w-10 items-center justify-center rounded-md transition-colors duration-200 hover:bg-graphite-850 hover:text-graphite-50',
                isActive ? 'text-primary-300' : 'text-graphite-400',
              )
            }
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
            {unreadCount > 0 && (
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary-400 ring-2 ring-graphite-950" />
            )}
          </NavLink>

          <Link to="/app/profile" aria-label="Your profile" className="rounded-full transition-transform duration-200 hover:scale-105">
            <Avatar name={currentUser.name} size="sm" />
          </Link>
        </div>
      </div>
    </header>
  );
}
