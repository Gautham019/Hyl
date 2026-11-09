import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { DeveloperCard } from '@/components/people/DeveloperCard';
import { DeveloperPreviewModal } from '@/components/people/DeveloperPreviewModal';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageHeader } from '@/components/ui/PageHeader';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { inputClass } from '@/components/ui/styles';
import { CATEGORY_FILTERS, type CategoryFilterValue } from '@/data/categories';
import { useAppData } from '@/context/AppDataContext';
import type { Developer } from '@/types/social';

export function ExplorePage() {
  const { projects, developers, currentUser } = useAppData();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const [category, setCategory] = useState<CategoryFilterValue>('All');
  const [previewDeveloper, setPreviewDeveloper] = useState<Developer | null>(null);

  const normalizedQuery = query.trim().toLowerCase();
  const matches = (text: string) => text.toLowerCase().includes(normalizedQuery);

  const filteredProjects = projects.filter(
    (project) =>
      (category === 'All' || project.category === category) &&
      (!normalizedQuery ||
        matches(project.title) ||
        matches(project.summary) ||
        matches(project.category) ||
        project.technologies.some(matches)),
  );

  const featured = filteredProjects.filter((project) => project.featured);
  const trending = [...filteredProjects].sort((a, b) => b.likes - a.likes).slice(0, 4);
  const discoverableDevelopers = developers.filter(
    (developer) =>
      developer.id !== currentUser.id &&
      (!normalizedQuery ||
        matches(developer.name) ||
        matches(developer.username) ||
        matches(developer.bio) ||
        developer.skills.some(matches)),
  );
  const hasResults = filteredProjects.length > 0 || discoverableDevelopers.length > 0;

  const handleQueryChange = (value: string) => {
    setSearchParams(value ? { q: value } : {}, { replace: true });
  };

  return (
    <div className="flex flex-col gap-10">
      <PageHeader title="Explore" description="Discover developers and the projects they are shipping." />

      <div className="flex flex-col gap-5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite-500" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => handleQueryChange(event.target.value)}
            placeholder="Search developers, projects or skills"
            aria-label="Search developers and projects"
            className={`${inputClass} h-12 pl-10`}
          />
        </div>
        <SegmentedControl label="Filter by category" options={CATEGORY_FILTERS.map((value) => ({ value, label: value }))} value={category} onChange={setCategory} />
      </div>

      {!hasResults && (
        <EmptyState
          title="No matches yet"
          description="Try another keyword or clear the category filter to see more of the community."
          action={
            <Link to="/app/explore" className="text-sm font-semibold text-primary-300 hover:text-primary-200">
              Clear search
            </Link>
          }
        />
      )}

      {featured.length > 0 && (
        <section className="flex flex-col gap-5">
          <h2 className="font-display text-xl font-semibold text-graphite-50">Featured projects</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {trending.length > 0 && (
        <section className="flex flex-col gap-5">
          <h2 className="font-display text-xl font-semibold text-graphite-50">Trending projects</h2>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {trending.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {discoverableDevelopers.length > 0 && (
        <section className="flex flex-col gap-5">
          <h2 className="font-display text-xl font-semibold text-graphite-50">Developers</h2>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {discoverableDevelopers.map((developer) => (
              <DeveloperCard key={developer.id} developer={developer} onPreview={setPreviewDeveloper} />
            ))}
          </div>
        </section>
      )}

      {previewDeveloper && (
        <DeveloperPreviewModal developer={previewDeveloper} onClose={() => setPreviewDeveloper(null)} />
      )}
    </div>
  );
}
