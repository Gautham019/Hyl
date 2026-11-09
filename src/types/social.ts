export const PROJECT_CATEGORIES = ['Web', 'AI', 'Mobile', 'Developer Tools', 'Design', 'Data'] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type Developer = {
  id: string;
  name: string;
  username: string;
  avatarUrl: string | null;
  bio: string;
  location: string;
  skills: string[];
  followers: number;
  following: number;
  isDemo: boolean;
};

export type Project = {
  id: string;
  authorId: string;
  title: string;
  summary: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  thumbnailUrl: string | null;
  projectUrl: string;
  likes: number;
  featured: boolean;
  createdAt: number;
  isDemo: boolean;
};

export type Comment = {
  id: string;
  authorId: string;
  body: string;
  createdAt: number;
};

export type Post = {
  id: string;
  authorId: string;
  body: string;
  projectId: string | null;
  likes: number;
  comments: Comment[];
  createdAt: number;
  isDemo: boolean;
};

export type NotificationType = 'follow' | 'like' | 'comment' | 'project';

export type AppNotification = {
  id: string;
  type: NotificationType;
  actorId: string;
  message: string;
  preview: string | null;
  createdAt: number;
  read: boolean;
  isDemo: boolean;
};
