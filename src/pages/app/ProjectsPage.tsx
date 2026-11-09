import { useState } from 'react';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageHeader } from '@/components/ui/PageHeader';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { Button } from '@/components/ui/Button';
import { CATEGORY_FILTERS, type CategoryFilterValue } from '@/data/categories';
import { useAppData } from '@/context/AppDataContext';

type SortOption = 'trending' | 'newest';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'trending', label: 'Trending' },
  { value: 'newest', label: 'Newest' },
];

export function ProjectsPage() {
  const { projects } = useAppData();
  const [category, setCategory] = useState<CategoryFilterValue>('All');
  const [sort, setSort] = useState<SortOption>('trending');

  const visibleProjects = projects
    .filter((project) => category === 'All' || project.category === category)
    .sort((a, b) => (sort === 'trending' ? b.likes - a.likes : b.createdAt - a.createdAt));

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="Projects" description="Browse what developers on HYL are shipping right now." />

      <div className="flex flex-col gap-4">
        <SegmentedControl label="Filter by category" options={CATEGORY_FILTERS.map((value) => ({ value, label: value }))} value={category} onChange={setCategory} />
        <SegmentedControl label="Sort projects" options={SORT_OPTIONS} value={sort} onChange={setSort} />
      </div>

      {visibleProjects.length === 0 ? (
        <EmptyState
          title="No projects in this category yet"
          description="Be the first to publish a project in this category."
          action={
            <Button href="/app/create" variant="secondary">
              Publish a project
            </Button>
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
