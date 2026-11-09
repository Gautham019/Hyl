export type Preferences = {
  emailNotifications: boolean;
  commentAlerts: boolean;
  publicProfile: boolean;
  reduceMotion: boolean;
};

export const PREFERENCES_STORAGE_KEY = 'hyl.preferences';

export const DEFAULT_PREFERENCES: Preferences = {
  emailNotifications: true,
  commentAlerts: true,
  publicProfile: true,
  reduceMotion: false,
};
