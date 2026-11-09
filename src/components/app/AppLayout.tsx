import { useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/components/app/AppSidebar';
import { AppTopBar } from '@/components/app/AppTopBar';
import { MobileTabBar } from '@/components/app/MobileTabBar';
import { RightSidebar } from '@/components/app/RightSidebar';
import { usePersistentState } from '@/hooks/usePersistentState';
import { DEFAULT_PREFERENCES, PREFERENCES_STORAGE_KEY, type Preferences } from '@/data/preferences';
import type { AppOutletContext } from '@/context/AppOutletContext';

export function AppLayout() {
  const [preferences, setPreferences] = usePersistentState<Preferences>(PREFERENCES_STORAGE_KEY, DEFAULT_PREFERENCES);

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', preferences.reduceMotion);
  }, [preferences.reduceMotion]);

  const updatePreferences = useCallback(
    (patch: Partial<Preferences>) => setPreferences((previous) => ({ ...previous, ...patch })),
    [setPreferences],
  );

  const outletContext: AppOutletContext = { preferences, updatePreferences };

  return (
    <div className="min-h-screen bg-graphite-950 text-graphite-100">
      <AppSidebar />
      <div className="lg:pl-64">
        <AppTopBar />
        <div className="mx-auto grid max-w-[1400px] gap-8 px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-16 xl:grid-cols-[minmax(0,1fr)_300px]">
          <main className="min-w-0">
            <Outlet context={outletContext} />
          </main>
          <RightSidebar />
        </div>
      </div>
      <MobileTabBar />
    </div>
  );
}
