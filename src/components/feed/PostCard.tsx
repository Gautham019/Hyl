import { useState } from 'react';
import { Bookmark, Heart, MessageCircle, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar } from '@/components/people/Avatar';
import { CommentSection } from '@/components/feed/CommentSection';
import { PostProjectPreview } from '@/components/feed/PostProjectPreview';
import { DemoBadge } from '@/components/ui/DemoBadge';
import { cardClass } from '@/components/ui/styles';
import { useAppData } from '@/context/AppDataContext';
import { developerProfilePath } from '@/lib/routes';
import { cx, formatCount, formatRelativeTime } from '@/lib/utils';
import type { Post } from '@/types/social';

type PostActionProps = {
  icon: LucideIcon;
  label: string;
  count?: number;
  isActive: boolean;
  activeClassName: string;
  onClick: () => void;
};

function PostAction({ icon: Icon, label, count, isActive, activeClassName, onClick }: PostActionProps) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onClick}
      className={cx(
        'flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium transition-all duration-200 active:scale-95',
        isActive ? activeClassName : 'text-graphite-400 hover:bg-graphite-850 hover:text-graphite-100',
      )}
    >
      <Icon className={cx('h-4 w-4 transition-transform duration-200', isActive && 'fill-current')} aria-hidden="true" />
      <span>{label}</span>
      {count !== undefined && <span className="tabular-nums text-xs text-graphite-500">{formatCount(count)}</span>}
    </button>
  );
}

export function PostCard({ post }: { post: Post }) {
  const { getDeveloper, likedPostIds, toggleLike, bookmarkedPostIds, toggleBookmark } = useAppData();
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const author = getDeveloper(post.authorId);
  const authorName = author?.name ?? 'Unknown developer';
  const isLiked = likedPostIds.includes(post.id);
  const isSaved = bookmarkedPostIds.includes(post.id);

  return (
    <article className={cx(cardClass, 'p-5 transition-colors duration-300 hover:border-graphite-700 sm:p-6')}>
      <header className="flex items-start gap-3">
        {author ? (
          <Link to={developerProfilePath(author.username)} className="rounded-full transition-transform duration-200 hover:scale-105">
            <Avatar name={authorName} src={author.avatarUrl} size="md" />
          </Link>
        ) : (
          <Avatar name={authorName} size="md" />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {author ? (
              <Link to={developerProfilePath(author.username)} className="font-semibold text-graphite-50 hover:text-primary-300">
                {authorName}
              </Link>
            ) : (
              <span className="font-semibold text-graphite-50">{authorName}</span>
            )}
            {post.isDemo && <DemoBadge />}
          </div>
          <p className="text-xs text-graphite-500">
            {author && <span>@{author.username} · </span>}
            <time dateTime={new Date(post.createdAt).toISOString()}>{formatRelativeTime(post.createdAt)}</time>
          </p>
        </div>
      </header>

      <p className="mt-4 whitespace-pre-line text-[15px] leading-normal text-graphite-200">{post.body}</p>

      {post.projectId && <PostProjectPreview projectId={post.projectId} />}

      <div className="mt-5 flex items-center gap-1 border-t border-graphite-800 pt-3">
        <PostAction
          icon={Heart}
          label="Like"
          count={post.likes}
          isActive={isLiked}
          activeClassName="bg-error-500/10 text-error-400"
          onClick={() => toggleLike(post.id)}
        />
        <PostAction
          icon={MessageCircle}
          label="Comment"
          count={post.comments.length}
          isActive={isCommentsOpen}
          activeClassName="bg-primary-500/10 text-primary-300"
          onClick={() => setIsCommentsOpen((open) => !open)}
        />
        <div className="ml-auto">
          <PostAction
            icon={Bookmark}
            label={isSaved ? 'Saved' : 'Save'}
            isActive={isSaved}
            activeClassName="bg-primary-500/10 text-primary-300"
            onClick={() => toggleBookmark(post.id)}
          />
        </div>
      </div>

      {isCommentsOpen && <CommentSection post={post} />}
    </article>
  );
}
