import { PreferenceRow } from '@/components/settings/PreferenceRow';
import type { Preferences } from '@/data/preferences';

type AccountPreferencesProps = {
  preferences: Preferences;
  onChange: (patch: Partial<Preferences>) => void;
};

export function AccountPreferences({ preferences, onChange }: AccountPreferencesProps) {
  return (
    <div className="divide-y divide-graphite-800">
      <PreferenceRow
        title="Email notifications"
        description="Receive a summary of follows, likes and comments by email."
        checked={preferences.emailNotifications}
        onChange={(checked) => onChange({ emailNotifications: checked })}
      />
      <PreferenceRow
        title="Comment alerts"
        description="Get notified straight away when someone comments on your posts."
        checked={preferences.commentAlerts}
        onChange={(checked) => onChange({ commentAlerts: checked })}
      />
      <PreferenceRow
        title="Public profile"
        description="Let anyone on HYL view your projects and posts."
        checked={preferences.publicProfile}
        onChange={(checked) => onChange({ publicProfile: checked })}
      />
    </div>
  );
}
