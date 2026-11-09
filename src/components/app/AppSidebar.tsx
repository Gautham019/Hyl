import { NavLink } from 'react-router-dom';
import { Logo } from '@/components/layout/Logo';
import { Avatar } from '@/components/people/Avatar';
import { APP_NAV_ITEMS } from '@/data/appNavigation';
import { useAppData } from '@/context/AppDataContext';
import { cx } from '@/lib/utils';

export function AppSidebar() {
  const { currentUser, unreadCount } = useAppData();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-graphite-800 bg-graphite-900 lg:flex">
      <div className="flex h-16 items-center px-6">
        <NavLink to="/app" aria-label="HYL home">
          <Logo />
        </NavLink>
      </div>

      <nav aria-label="Application" className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-1">
          {APP_NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cx(
                    'group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-200',
                    isActive
                      ? 'bg-primary-500/10 text-primary-200'
                      : 'text-graphite-400 hover:bg-graphite-850 hover:text-graphite-100',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      aria-hidden="true"
                      className={cx(
                        'absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary-500 transition-opacity duration-200',
                        isActive ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span>{item.label}</span>
                    {item.to === '/app/notifications' && unreadCount > 0 && (
                      <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary-500 px-1.5 text-[11px] font-semibold text-graphite-950">
                        {unreadCount}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-graphite-800 p-3">
        <NavLink
          to="/app/profile"
          className="flex items-center gap-3 rounded-md p-2.5 transition-colors duration-200 hover:bg-graphite-850"
        >
          <Avatar name={currentUser.name} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-graphite-100">{currentUser.name}</p>
            <p className="truncate text-xs text-graphite-500">@{currentUser.username}</p>
          </div>
        </NavLink>
      </div>
    </aside>
  );
}
