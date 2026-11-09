import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreatePostForm } from '@/components/feed/CreatePostForm';
import { PostCard } from '@/components/feed/PostCard';
import { DemoBadge } from '@/components/ui/DemoBadge';
import { EmptyState } from '@/components/ui/EmptyState';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { Button } from '@/components/ui/Button';
import { useAppData } from '@/context/AppDataContext';

type FeedTab = 'for-you' | 'following';

const FEED_TABS: { value: FeedTab; label: string }[] = [
  { value: 'for-you', label: 'For you' },
  { value: 'following', label: 'Following' },
];

export function HomePage() {
  const { posts, followingIds } = useAppData();
  const [tab, setTab] = useState<FeedTab>('for-you');

  const sortedPosts = [...posts].sort((a, b) => b.createdAt - a.createdAt);
  const visiblePosts =
    tab === 'following' ? sortedPosts.filter((post) => followingIds.includes(post.authorId)) : sortedPosts;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-3xl font-bold leading-[1.2] tracking-tight text-graphite-50">Home</h1>
        <div className="flex flex-wrap items-center gap-3 rounded-md border border-graphite-800 bg-graphite-900 px-4 py-3 text-sm text-graphite-400">
          <DemoBadge />
          <span>Sample posts and projects are demo data. Posts you publish appear at the top of the feed.</span>
        </div>
      </div>

      <CreatePostForm />

      <div className="flex items-center justify-between gap-4">
        <SegmentedControl label="Feed" options={FEED_TABS} value={tab} onChange={setTab} />
      </div>

      {visiblePosts.length === 0 ? (
        <EmptyState
          title="Nothing here yet"
          description="Follow developers to see their posts and project updates in this feed."
          action={
            <Button href="/app/explore" variant="secondary">
              Find developers
            </Button>
          }
        />
      ) : (
        <div className="flex flex-col gap-5">
          {visiblePosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <p className="text-center text-xs text-graphite-600">
        <Link to="/app/explore" className="hover:text-graphite-400">
          Explore more developers and projects
        </Link>
      </p>
    </div>
  );
}
