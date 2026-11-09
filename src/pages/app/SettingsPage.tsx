import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AccountPreferences } from '@/components/settings/AccountPreferences';
import { AppearanceSettings } from '@/components/settings/AppearanceSettings';
import { EditProfileForm } from '@/components/settings/EditProfileForm';
import { SettingsSection } from '@/components/settings/SettingsSection';
import { PageHeader } from '@/components/ui/PageHeader';
import { secondaryButtonClass } from '@/components/ui/styles';
import { useAuth } from '@/context/AuthContext';
import { useAppPreferences } from '@/context/AppOutletContext';

export function SettingsPage() {
  const { preferences, updatePreferences } = useAppPreferences();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/', { replace: true });
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <PageHeader title="Settings" description="Manage how you appear on HYL and how it behaves for you." />

      <SettingsSection title="Edit profile" description="How other developers see you on HYL.">
        <EditProfileForm />
      </SettingsSection>

      <SettingsSection title="Account preferences" description="Control notifications and who can see your activity.">
        <AccountPreferences preferences={preferences} onChange={updatePreferences} />
      </SettingsSection>

      <SettingsSection title="Appearance" description="Adjust how the interface looks and moves.">
        <AppearanceSettings preferences={preferences} onChange={updatePreferences} />
      </SettingsSection>

      <SettingsSection title="Session" description="Sign out of HYL on this device.">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-graphite-400">You will return to the landing page after logging out.</p>
          <button type="button" onClick={handleLogout} className={`${secondaryButtonClass} gap-2 sm:w-auto`}>
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Log out
          </button>
        </div>
      </SettingsSection>
    </div>
  );
}
