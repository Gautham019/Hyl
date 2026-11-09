import { useState, type FormEvent } from 'react';
import { Avatar } from '@/components/people/Avatar';
import { primaryButtonClass, cardClass } from '@/components/ui/styles';
import { useAppData } from '@/context/AppDataContext';
import { cx } from '@/lib/utils';

export const MAX_POST_LENGTH = 500;

export function CreatePostForm({ onPublished }: { onPublished?: () => void }) {
  const { currentUser, addPost } = useAppData();
  const [body, setBody] = useState('');
  const trimmed = body.trim();
  const isOverLimit = body.length > MAX_POST_LENGTH;
  const isValid = trimmed.length > 0 && !isOverLimit;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) return;
    addPost(trimmed, null);
    setBody('');
    onPublished?.();
  };

  return (
    <form onSubmit={handleSubmit} className={cx(cardClass, 'p-5 sm:p-6')}>
      <div className="flex gap-4">
        <Avatar name={currentUser.name} src={currentUser.avatarUrl} size="md" />
        <div className="min-w-0 flex-1">
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows={3}
            aria-label="Write a post"
            placeholder="Share an update, an idea or a discovery..."
            className="w-full resize-none bg-transparent text-[15px] leading-normal text-graphite-100 placeholder:text-graphite-500 focus:outline-none"
          />
          <div className="mt-3 flex items-center justify-between gap-4 border-t border-graphite-800 pt-4">
            <span className={cx('font-mono text-xs', isOverLimit ? 'text-error-400' : 'text-graphite-500')}>
              {body.length}/{MAX_POST_LENGTH}
            </span>
            <button type="submit" disabled={!isValid} className={cx(primaryButtonClass, 'h-10 px-5')}>
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
