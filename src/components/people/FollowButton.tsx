import { cx } from '@/lib/utils';
import { useAppData } from '@/context/AppDataContext';

type FollowButtonProps = {
  developerId: string;
  className?: string;
};

export function FollowButton({ developerId, className = '' }: FollowButtonProps) {
  const { followingIds, toggleFollow } = useAppData();
  const isFollowing = followingIds.includes(developerId);

  return (
    <button
      type="button"
      aria-pressed={isFollowing}
      onClick={() => toggleFollow(developerId)}
      className={cx(
        'group inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-semibold transition-all duration-200 active:scale-[0.97]',
        isFollowing
          ? 'border border-graphite-600 text-graphite-200 hover:border-error-500/60 hover:text-error-400'
          : 'bg-primary-500 text-graphite-950 hover:bg-primary-400 hover:shadow-glow',
        className,
      )}
    >
      {isFollowing ? (
        <>
          <span className="group-hover:hidden">Following</span>
          <span className="hidden group-hover:inline">Unfollow</span>
        </>
      ) : (
        'Follow'
      )}
    </button>
  );
}
