import { ExternalLink } from 'lucide-react';
import { ProjectThumbnail } from '@/components/projects/ProjectCard';
import { useAppData } from '@/context/AppDataContext';

export function PostProjectPreview({ projectId }: { projectId: string }) {
  const { getProject } = useAppData();
  const project = getProject(projectId);

  if (!project) return null;

  return (
    <div className="mt-4 flex items-center gap-4 rounded-md border border-graphite-800 bg-graphite-950/60 p-3 transition-colors duration-200 hover:border-graphite-700">
      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded border border-graphite-800">
        <ProjectThumbnail project={project} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[11px] uppercase tracking-wider text-primary-300">{project.category}</p>
        <p className="truncate font-display font-semibold text-graphite-50">{project.title}</p>
        <p className="truncate text-xs text-graphite-500">{project.summary}</p>
      </div>
      <a
        href={project.projectUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.title}`}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-graphite-400 transition-colors duration-200 hover:bg-graphite-800 hover:text-primary-300"
      >
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}
