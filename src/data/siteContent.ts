import { Compass, FolderKanban, MessagesSquare, UserRound, type LucideIcon } from 'lucide-react';

export type NavLink = {
  label: string;
  href: string;
};

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type Step = {
  title: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#top' },
  { label: 'Explore', href: '#explore' },
  { label: 'About', href: '#about' },
];

export const LOGIN_HREF = '/login';

export const SIGNUP_HREF = '/signup';

export const CONTACT_EMAIL = 'hello@hyl.dev';

export const FEATURES: Feature[] = [
  {
    icon: FolderKanban,
    title: 'Project Showcase',
    description: 'Share what you build.',
  },
  {
    icon: UserRound,
    title: 'Developer Profiles',
    description: 'Build your identity.',
  },
  {
    icon: MessagesSquare,
    title: 'Community Feed',
    description: 'Share ideas and discoveries.',
  },
  {
    icon: Compass,
    title: 'Discover Developers',
    description: 'Connect with creators.',
  },
];

export const STEPS: Step[] = [
  { title: 'Create your developer profile.' },
  { title: 'Showcase your projects.' },
  { title: 'Connect with the community.' },
];
