import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PostCard } from '@/components/feed/PostCard';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { useAppData } from '@/context/AppDataContext';

type ProfileTab = 'projects' | 'posts';

export function ProfilePage() {
  const { username } = useParams();
  const { developers, currentUser, projects, posts, getFollowCounts } = useAppData();
  const [tab, setTab] = useState<ProfileTab>('projects');

  const developer = username ? developers.find((candidate) => candidate.username === username) : currentUser;

  if (!developer) {
    return (
      <EmptyState
        title="Developer not found"
        description="This profile does not exist or may have changed its username."
        action={
          <Button href="/app/explore" variant="secondary">
            Explore developers
          </Button>
        }
      />
    );
  }

  const isOwn = developer.id === currentUser.id;
  const counts = getFollowCounts(developer);
  const authoredProjects = projects.filter((project) => project.authorId === developer.id);
  const authoredPosts = posts
    .filter((post) => post.authorId === developer.id)
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
      <ProfileHeader developer={developer} isOwn={isOwn} followers={counts.followers} following={counts.following} />

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-lg font-semibold text-graphite-50">Skills and technologies</h2>
        {developer.skills.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {developer.skills.map((skill) => (
              <li key={skill}>
                <Tag>{skill}</Tag>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-graphite-500">
            {isOwn ? 'Add your skills in settings to show them here.' : 'No skills listed yet.'}
          </p>
        )}
      </section>

      <SegmentedControl
        label="Profile content"
        options={[
          { value: 'projects', label: `Projects (${authoredProjects.length})` },
          { value: 'posts', label: `Posts (${authoredPosts.length})` },
        ]}
        value={tab}
        onChange={setTab}
      />

      {tab === 'projects' ? (
        authoredProjects.length === 0 ? (
          <EmptyState title="No projects yet" description="Published projects will appear on this profile." />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {authoredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )
      ) : authoredPosts.length === 0 ? (
        <EmptyState title="No posts yet" description="Posts and updates will appear on this profile." />
      ) : (
        <div className="flex flex-col gap-5">
          {authoredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
