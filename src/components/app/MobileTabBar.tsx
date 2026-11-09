import { NavLink } from 'react-router-dom';
import { APP_NAV_ITEMS } from '@/data/appNavigation';
import { useAppData } from '@/context/AppDataContext';
import { cx } from '@/lib/utils';

const MOBILE_ITEMS = APP_NAV_ITEMS.filter((item) => item.label !== 'Settings');

export function MobileTabBar() {
  const { unreadCount } = useAppData();

  return (
    <nav
      aria-label="Application"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-graphite-800 bg-graphite-900/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-6">
        {MOBILE_ITEMS.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cx(
                  'relative flex flex-col items-center gap-1 rounded-md py-3 text-[10px] font-medium transition-colors duration-200',
                  isActive ? 'text-primary-300' : 'text-graphite-500 hover:text-graphite-200',
                )
              }
            >
              <item.icon className="h-5 w-5" aria-hidden="true" />
              <span>{item.shortLabel ?? item.label}</span>
              {item.to === '/app/notifications' && unreadCount > 0 && (
                <span className="absolute right-3 top-2.5 h-2 w-2 rounded-full bg-primary-400" />
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
