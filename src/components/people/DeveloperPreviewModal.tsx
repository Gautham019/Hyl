import { MapPin } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Avatar } from '@/components/people/Avatar';
import { FollowButton } from '@/components/people/FollowButton';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { DemoBadge } from '@/components/ui/DemoBadge';
import { useAppData } from '@/context/AppDataContext';
import { developerProfilePath } from '@/lib/routes';
import { formatCount } from '@/lib/utils';
import type { Developer } from '@/types/social';

type DeveloperPreviewModalProps = {
  developer: Developer;
  onClose: () => void;
};

export function DeveloperPreviewModal({ developer, onClose }: DeveloperPreviewModalProps) {
  const { getFollowCounts } = useAppData();
  const counts = getFollowCounts(developer);

  return (
    <Modal title="Developer preview" onClose={onClose}>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <Avatar name={developer.name} src={developer.avatarUrl} size="lg" className="h-16 w-16" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="truncate font-display text-lg font-semibold text-graphite-50">{developer.name}</p>
              {developer.isDemo && <DemoBadge />}
            </div>
            <p className="text-sm text-graphite-500">@{developer.username}</p>
            {developer.location && (
              <p className="mt-1 flex items-center gap-1 text-xs text-graphite-400">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {developer.location}
              </p>
            )}
          </div>
        </div>

        <p className="text-sm leading-normal text-graphite-300">{developer.bio || 'No bio yet.'}</p>

        <div className="flex gap-6 text-sm">
          <p>
            <span className="font-semibold text-graphite-50">{formatCount(counts.followers)}</span>{' '}
            <span className="text-graphite-400">Followers</span>
          </p>
          <p>
            <span className="font-semibold text-graphite-50">{formatCount(counts.following)}</span>{' '}
            <span className="text-graphite-400">Following</span>
          </p>
        </div>

        {developer.skills.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {developer.skills.map((skill) => (
              <li key={skill}>
                <Tag>{skill}</Tag>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-col gap-3 border-t border-graphite-800 pt-5 sm:flex-row">
          <FollowButton developerId={developer.id} className="h-11 flex-1 px-5 text-sm" />
          <Button href={developerProfilePath(developer.username)} variant="secondary" className="flex-1">
            View full profile
          </Button>
        </div>
      </div>
    </Modal>
  );
}
