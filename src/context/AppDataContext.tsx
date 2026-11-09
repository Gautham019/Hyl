import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { CURRENT_USER_ID, DEMO_DEVELOPERS } from '@/data/demo/developers';
import { DEMO_PROJECTS } from '@/data/demo/projects';
import { DEMO_NOTIFICATIONS, DEMO_POSTS } from '@/data/demo/posts';
import type { DemoSession } from '@/context/AuthContext';
import type { AppNotification, Comment, Developer, Post, Project, ProjectCategory } from '@/types/social';

export type ProfileDraft = {
  name: string;
  username: string;
  bio: string;
  location: string;
  skills: string[];
};

export type ProjectDraft = {
  title: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  projectUrl: string;
};

type AppDataValue = {
  currentUser: Developer;
  updateProfile: (draft: ProfileDraft) => void;
  developers: Developer[];
  getDeveloper: (id: string) => Developer | undefined;
  getFollowCounts: (developer: Developer) => { followers: number; following: number };
  followingIds: string[];
  toggleFollow: (developerId: string) => void;
  projects: Project[];
  getProject: (id: string) => Project | undefined;
  addProject: (draft: ProjectDraft) => void;
  posts: Post[];
  addPost: (body: string, projectId: string | null) => void;
  likedPostIds: string[];
  toggleLike: (postId: string) => void;
  bookmarkedPostIds: string[];
  toggleBookmark: (postId: string) => void;
  addComment: (postId: string, body: string) => void;
  notifications: AppNotification[];
  unreadCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
};

const AppDataContext = createContext<AppDataValue | null>(null);

function createId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function createCurrentUser(session: DemoSession): Developer {
  return {
    id: CURRENT_USER_ID,
    name: session.displayName,
    username: session.username,
    avatarUrl: null,
    bio: '',
    location: '',
    skills: [],
    followers: 0,
    following: 0,
    isDemo: false,
  };
}

type AppDataProviderProps = {
  session: DemoSession;
  children: ReactNode;
};

export function AppDataProvider({ session, children }: AppDataProviderProps) {
  const [currentUser, setCurrentUser] = useState<Developer>(() => createCurrentUser(session));
  const [projects, setProjects] = useState<Project[]>(DEMO_PROJECTS);
  const [posts, setPosts] = useState<Post[]>(DEMO_POSTS);
  const [likedPostIds, setLikedPostIds] = useState<string[]>([]);
  const [bookmarkedPostIds, setBookmarkedPostIds] = useState<string[]>([]);
  const [followingIds, setFollowingIds] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>(DEMO_NOTIFICATIONS);

  const developers = useMemo(() => [currentUser, ...DEMO_DEVELOPERS], [currentUser]);

  const updateProfile = useCallback((draft: ProfileDraft) => {
    setCurrentUser((previous) => ({ ...previous, ...draft }));
  }, []);

  const getDeveloper = useCallback((id: string) => developers.find((developer) => developer.id === id), [developers]);

  const getFollowCounts = useCallback(
    (developer: Developer) => ({
      followers: developer.followers + (followingIds.includes(developer.id) ? 1 : 0),
      following: developer.id === CURRENT_USER_ID ? followingIds.length : developer.following,
    }),
    [followingIds],
  );

  const toggleFollow = useCallback((developerId: string) => {
    setFollowingIds((previous) =>
      previous.includes(developerId) ? previous.filter((id) => id !== developerId) : [...previous, developerId],
    );
  }, []);

  const getProject = useCallback((id: string) => projects.find((project) => project.id === id), [projects]);

  const addProject = useCallback(
    (draft: ProjectDraft) => {
      const project: Project = {
        id: createId('project'),
        authorId: CURRENT_USER_ID,
        title: draft.title,
        summary: draft.description,
        description: draft.description,
        category: draft.category,
        technologies: draft.technologies,
        thumbnailUrl: null,
        projectUrl: draft.projectUrl,
        likes: 0,
        featured: false,
        createdAt: Date.now(),
        isDemo: false,
      };
      setProjects((previous) => [project, ...previous]);
    },
    [],
  );

  const addPost = useCallback((body: string, projectId: string | null) => {
    const post: Post = {
      id: createId('post'),
      authorId: CURRENT_USER_ID,
      body,
      projectId,
      likes: 0,
      comments: [],
      createdAt: Date.now(),
      isDemo: false,
    };
    setPosts((previous) => [post, ...previous]);
  }, []);

  const toggleLike = useCallback((postId: string) => {
    const isLiked = likedPostIds.includes(postId);
    setLikedPostIds((previous) =>
      isLiked ? previous.filter((id) => id !== postId) : [...previous, postId],
    );
    setPosts((previous) =>
      previous.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + (isLiked ? -1 : 1) } : post,
      ),
    );
  }, [likedPostIds]);

  const toggleBookmark = useCallback((postId: string) => {
    setBookmarkedPostIds((previous) =>
      previous.includes(postId) ? previous.filter((id) => id !== postId) : [...previous, postId],
    );
  }, []);

  const addComment = useCallback((postId: string, body: string) => {
    const comment: Comment = { id: createId('comment'), authorId: CURRENT_USER_ID, body, createdAt: Date.now() };
    setPosts((previous) =>
      previous.map((post) => (post.id === postId ? { ...post, comments: [...post.comments, comment] } : post)),
    );
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((previous) =>
      previous.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    );
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((previous) => previous.map((notification) => ({ ...notification, read: true })));
  }, []);

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const value = useMemo<AppDataValue>(
    () => ({
      currentUser,
      updateProfile,
      developers,
      getDeveloper,
      getFollowCounts,
      followingIds,
      toggleFollow,
      projects,
      getProject,
      addProject,
      posts,
      addPost,
      likedPostIds,
      toggleLike,
      bookmarkedPostIds,
      toggleBookmark,
      addComment,
      notifications,
      unreadCount,
      markNotificationRead,
      markAllNotificationsRead,
    }),
    [
      currentUser,
      updateProfile,
      developers,
      getDeveloper,
      getFollowCounts,
      followingIds,
      toggleFollow,
      projects,
      getProject,
      addProject,
      posts,
      addPost,
      likedPostIds,
      toggleLike,
      bookmarkedPostIds,
      toggleBookmark,
      addComment,
      notifications,
      unreadCount,
      markNotificationRead,
      markAllNotificationsRead,
    ],
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData(): AppDataValue {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used inside AppDataProvider');
  }
  return context;
}
