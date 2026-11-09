import { useOutletContext } from 'react-router-dom';
import type { Preferences } from '@/data/preferences';

export type AppOutletContext = {
  preferences: Preferences;
  updatePreferences: (patch: Partial<Preferences>) => void;
};

export function useAppPreferences(): AppOutletContext {
  return useOutletContext<AppOutletContext>();
}
