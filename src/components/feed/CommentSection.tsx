import { useState, type FormEvent } from 'react';
import { Send } from 'lucide-react';
import { Avatar } from '@/components/people/Avatar';
import { inputClass } from '@/components/ui/styles';
import { useAppData } from '@/context/AppDataContext';
import { formatRelativeTime } from '@/lib/utils';
import type { Post } from '@/types/social';

const MAX_COMMENT_LENGTH = 280;

export function CommentSection({ post }: { post: Post }) {
  const { currentUser, getDeveloper, addComment } = useAppData();
  const [draft, setDraft] = useState('');
  const trimmed = draft.trim();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!trimmed) return;
    addComment(post.id, trimmed);
    setDraft('');
  };

  return (
    <div className="mt-5 border-t border-graphite-800 pt-5">
      {post.comments.length === 0 ? (
        <p className="text-sm text-graphite-500">No comments yet. Start the conversation.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {post.comments.map((comment) => {
            const author = getDeveloper(comment.authorId);
            const authorName = author?.name ?? 'Unknown developer';
            return (
              <li key={comment.id} className="flex gap-3">
                <Avatar name={authorName} src={author?.avatarUrl} size="sm" />
                <div className="min-w-0 flex-1 rounded-md bg-graphite-850 px-3.5 py-2.5">
                  <p className="text-xs text-graphite-400">
                    <span className="font-medium text-graphite-100">{authorName}</span>
                    <span className="mx-1.5 text-graphite-600">/</span>
                    <time dateTime={new Date(comment.createdAt).toISOString()}>
                      {formatRelativeTime(comment.createdAt)}
                    </time>
                  </p>
                  <p className="mt-1 text-sm leading-normal text-graphite-200">{comment.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-3">
        <Avatar name={currentUser.name} src={currentUser.avatarUrl} size="sm" />
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          maxLength={MAX_COMMENT_LENGTH}
          aria-label="Write a comment"
          placeholder="Write a comment"
          className={`${inputClass} h-10`}
        />
        <button
          type="submit"
          disabled={!trimmed}
          aria-label="Send comment"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary-500 text-graphite-950 transition-all duration-200 hover:bg-primary-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
