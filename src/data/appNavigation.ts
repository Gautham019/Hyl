import { Bell, Compass, FolderKanban, Home, Settings, SquarePen, UserRound, type LucideIcon } from 'lucide-react';

export type AppNavItem = {
  label: string;
  shortLabel?: string;
  to: string;
  icon: LucideIcon;
  end?: boolean;
};

export const APP_NAV_ITEMS: AppNavItem[] = [
  { label: 'Home', to: '/app', icon: Home, end: true },
  { label: 'Explore', to: '/app/explore', icon: Compass },
  { label: 'Projects', to: '/app/projects', icon: FolderKanban },
  { label: 'Create', to: '/app/create', icon: SquarePen },
  { label: 'Notifications', shortLabel: 'Alerts', to: '/app/notifications', icon: Bell },
  { label: 'Profile', to: '/app/profile', icon: UserRound },
  { label: 'Settings', to: '/app/settings', icon: Settings },
];
