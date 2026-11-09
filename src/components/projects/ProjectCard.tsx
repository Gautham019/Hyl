import { ExternalLink, Heart, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar } from '@/components/people/Avatar';
import { DemoBadge } from '@/components/ui/DemoBadge';
import { Tag } from '@/components/ui/Tag';
import { useAppData } from '@/context/AppDataContext';
import { developerProfilePath } from '@/lib/routes';
import { formatCount } from '@/lib/utils';
import type { Project } from '@/types/social';

type ProjectCardProps = {
  project: Project;
};

export function ProjectThumbnail({ project }: { project: Pick<Project, 'title' | 'thumbnailUrl'> }) {
  if (project.thumbnailUrl) {
    return (
      <img
        src={project.thumbnailUrl}
        alt={`${project.title} preview`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-graphite-850">
      <div className="absolute inset-0 bg-grid opacity-70" />
      <Code2 className="relative h-8 w-8 text-primary-400/70" aria-hidden="true" />
    </div>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { getDeveloper } = useAppData();
  const author = getDeveloper(project.authorId);

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-graphite-800 bg-graphite-900 transition-all duration-300 hover:-translate-y-1 hover:border-primary-500/50 hover:shadow-glow">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-graphite-800">
        <ProjectThumbnail project={project} />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-primary-300">
            {project.category}
          </span>
          {project.isDemo && <DemoBadge />}
        </div>

        <h3 className="font-display text-lg font-semibold text-graphite-50">{project.title}</h3>
        <p className="line-clamp-2 text-sm leading-normal text-graphite-400">{project.summary}</p>

        <ul className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((technology) => (
            <li key={technology}>
              <Tag>{technology}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-graphite-800 pt-4">
          {author ? (
            <Link
              to={developerProfilePath(author.username)}
              className="flex min-w-0 items-center gap-2 text-sm text-graphite-300 transition-colors hover:text-graphite-50"
            >
              <Avatar name={author.name} src={author.avatarUrl} size="sm" />
              <span className="truncate">{author.name}</span>
            </Link>
          ) : (
            <span className="text-sm text-graphite-500">Unknown developer</span>
          )}

          <div className="flex shrink-0 items-center gap-3 text-xs text-graphite-400">
            <span className="flex items-center gap-1" aria-label={`${project.likes} likes`}>
              <Heart className="h-3.5 w-3.5" aria-hidden="true" />
              {formatCount(project.likes)}
            </span>
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-medium text-primary-400 transition-colors hover:text-primary-300"
            >
              View
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
