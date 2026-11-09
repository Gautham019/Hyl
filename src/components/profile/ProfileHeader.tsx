import { MapPin } from 'lucide-react';
import { Avatar } from '@/components/people/Avatar';
import { FollowButton } from '@/components/people/FollowButton';
import { Button } from '@/components/ui/Button';
import { DemoBadge } from '@/components/ui/DemoBadge';
import { cardClass } from '@/components/ui/styles';
import { formatCount } from '@/lib/utils';
import type { Developer } from '@/types/social';

type ProfileHeaderProps = {
  developer: Developer;
  isOwn: boolean;
  followers: number;
  following: number;
};

export function ProfileHeader({ developer, isOwn, followers, following }: ProfileHeaderProps) {
  return (
    <section className={`${cardClass} overflow-hidden`}>
      <div className="h-28 border-b border-graphite-800 bg-graphite-850 bg-grid" />

      <div className="px-5 pb-6 sm:px-8">
        <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Avatar name={developer.name} src={developer.avatarUrl} size="lg" className="ring-4 ring-graphite-900" />
          <div>
            {isOwn ? (
              <Button href="/app/settings" variant="secondary">
                Edit profile
              </Button>
            ) : (
              <FollowButton developerId={developer.id} className="h-11 px-6 text-sm" />
            )}
          </div>
        </div>

        <div className="mt-5">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-2xl font-bold text-graphite-50">{developer.name}</h1>
            {developer.isDemo && <DemoBadge />}
          </div>
          <p className="text-sm text-graphite-500">@{developer.username}</p>
          {developer.location && (
            <p className="mt-2 flex items-center gap-1.5 text-sm text-graphite-400">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {developer.location}
            </p>
          )}
          <p className="mt-4 max-w-2xl text-sm leading-normal text-graphite-300">
            {developer.bio || (isOwn ? 'Add a short bio in settings to tell people what you build.' : 'No bio yet.')}
          </p>
        </div>

        <div className="mt-6 flex gap-8 border-t border-graphite-800 pt-5 text-sm">
          <p>
            <span className="font-semibold text-graphite-50">{formatCount(followers)}</span>{' '}
            <span className="text-graphite-400">Followers</span>
          </p>
          <p>
            <span className="font-semibold text-graphite-50">{formatCount(following)}</span>{' '}
            <span className="text-graphite-400">Following</span>
          </p>
        </div>
      </div>
    </section>
  );
}
