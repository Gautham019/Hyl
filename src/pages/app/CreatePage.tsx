import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreatePostForm } from '@/components/feed/CreatePostForm';
import { ProjectPublishForm } from '@/components/projects/ProjectPublishForm';
import { PageHeader } from '@/components/ui/PageHeader';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { cardClass } from '@/components/ui/styles';

type CreateMode = 'post' | 'project';

const CREATE_MODES: { value: CreateMode; label: string }[] = [
  { value: 'post', label: 'Share a post' },
  { value: 'project', label: 'Publish a project' },
];

export function CreatePage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<CreateMode>('post');

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <PageHeader title="Create" description="Share a quick update or publish a project for the community." />

      <SegmentedControl label="What do you want to create" options={CREATE_MODES} value={mode} onChange={setMode} />

      {mode === 'post' ? (
        <CreatePostForm onPublished={() => navigate('/app')} />
      ) : (
        <section className={`${cardClass} p-5 sm:p-8`}>
          <ProjectPublishForm onPublished={() => navigate('/app/projects')} />
        </section>
      )}
    </div>
  );
}
