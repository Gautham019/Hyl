import { Link } from 'react-router-dom';
import { Avatar } from '@/components/people/Avatar';
import { FollowButton } from '@/components/people/FollowButton';
import { Tag } from '@/components/ui/Tag';
import { cardClass } from '@/components/ui/styles';
import { developerProfilePath } from '@/lib/routes';
import type { Developer } from '@/types/social';

type DeveloperCardProps = {
  developer: Developer;
  onPreview: (developer: Developer) => void;
};

export function DeveloperCard({ developer, onPreview }: DeveloperCardProps) {
  return (
    <article className={`${cardClass} flex flex-col gap-4 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-graphite-700`}>
      <div className="flex items-center gap-3">
        <Link to={developerProfilePath(developer.username)} className="rounded-full transition-transform duration-200 hover:scale-105">
          <Avatar name={developer.name} src={developer.avatarUrl} size="lg" className="h-12 w-12" />
        </Link>
        <div className="min-w-0">
          <Link
            to={developerProfilePath(developer.username)}
            className="block truncate font-display font-semibold text-graphite-50 transition-colors hover:text-primary-300"
          >
            {developer.name}
          </Link>
          <p className="truncate text-sm text-graphite-500">@{developer.username}</p>
        </div>
      </div>

      <p className="line-clamp-2 text-sm leading-normal text-graphite-400">
        {developer.bio || 'No bio yet.'}
      </p>

      <ul className="flex flex-wrap gap-1.5">
        {developer.skills.slice(0, 3).map((skill) => (
          <li key={skill}>
            <Tag>{skill}</Tag>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={() => onPreview(developer)}
          className="inline-flex h-9 flex-1 items-center justify-center rounded-md border border-graphite-700 text-sm font-medium text-graphite-200 transition-colors duration-200 hover:border-graphite-500 hover:text-graphite-50"
        >
          Preview
        </button>
        <FollowButton developerId={developer.id} className="flex-1" />
      </div>
    </article>
  );
}
