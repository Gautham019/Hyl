import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar } from '@/components/people/Avatar';
import { FollowButton } from '@/components/people/FollowButton';
import { ProjectThumbnail } from '@/components/projects/ProjectCard';
import { cardClass } from '@/components/ui/styles';
import { useAppData } from '@/context/AppDataContext';
import { developerProfilePath } from '@/lib/routes';
import { formatCount } from '@/lib/utils';

export function RightSidebar() {
  const { developers, followingIds, currentUser, projects } = useAppData();

  const suggested = developers
    .filter((developer) => developer.id !== currentUser.id && !followingIds.includes(developer.id))
    .slice(0, 3);
  const trending = [...projects].sort((a, b) => b.likes - a.likes).slice(0, 3);

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-24 flex flex-col gap-6">
        <section className={`${cardClass} p-5`}>
          <h2 className="font-display text-base font-semibold text-graphite-50">Suggested developers</h2>
          {suggested.length === 0 ? (
            <p className="mt-4 text-sm text-graphite-500">You are following everyone we suggest right now.</p>
          ) : (
            <ul className="mt-4 flex flex-col gap-4">
              {suggested.map((developer) => (
                <li key={developer.id} className="flex items-center gap-3">
                  <Avatar name={developer.name} src={developer.avatarUrl} size="sm" />
                  <div className="min-w-0 flex-1">
                    <Link
                      to={developerProfilePath(developer.username)}
                      className="block truncate text-sm font-medium text-graphite-100 transition-colors hover:text-primary-300"
                    >
                      {developer.name}
                    </Link>
                    <p className="truncate text-xs text-graphite-500">@{developer.username}</p>
                  </div>
                  <FollowButton developerId={developer.id} className="h-8 px-3 text-xs" />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={`${cardClass} p-5`}>
          <h2 className="font-display text-base font-semibold text-graphite-50">Trending projects</h2>
          <ul className="mt-4 flex flex-col gap-4">
            {trending.map((project) => (
              <li key={project.id}>
                <Link to="/app/projects" className="group flex items-center gap-3">
                  <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded border border-graphite-800">
                    <ProjectThumbnail project={project} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-graphite-100 transition-colors group-hover:text-primary-300">
                      {project.title}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-graphite-500">
                      <Heart className="h-3 w-3" aria-hidden="true" />
                      {formatCount(project.likes)}
                      <span className="mx-1 text-graphite-700">·</span>
                      {project.category}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="px-1 text-xs leading-normal text-graphite-600">
          Sample developers and projects are demo data.
        </p>
      </div>
    </aside>
  );
}
