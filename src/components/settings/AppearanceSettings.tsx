import { PreferenceRow } from '@/components/settings/PreferenceRow';
import type { Preferences } from '@/data/preferences';

type AppearanceSettingsProps = {
  preferences: Preferences;
  onChange: (patch: Partial<Preferences>) => void;
};

export function AppearanceSettings({ preferences, onChange }: AppearanceSettingsProps) {
  return (
    <div className="divide-y divide-graphite-800">
      <div className="flex items-center justify-between gap-6 pb-4">
        <div>
          <p className="text-sm font-medium text-graphite-100">Theme</p>
          <p className="mt-1 text-sm text-graphite-400">HYL uses the graphite dark theme across the whole app.</p>
        </div>
        <span className="shrink-0 rounded-md border border-graphite-700 bg-graphite-850 px-3 py-1.5 text-xs font-medium text-graphite-300">
          Graphite dark
        </span>
      </div>
      <PreferenceRow
        title="Reduce motion"
        description="Minimize animations and transitions across HYL."
        checked={preferences.reduceMotion}
        onChange={(checked) => onChange({ reduceMotion: checked })}
      />
    </div>
  );
}
