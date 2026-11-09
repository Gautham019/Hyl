import { useState } from 'react';
import { CheckCheck } from 'lucide-react';
import { NotificationItem } from '@/components/notifications/NotificationItem';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageHeader } from '@/components/ui/PageHeader';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { useAppData } from '@/context/AppDataContext';
import type { NotificationType } from '@/types/social';

type NotificationFilter = 'all' | NotificationType;

const FILTER_OPTIONS: { value: NotificationFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'follow', label: 'Follows' },
  { value: 'like', label: 'Likes' },
  { value: 'comment', label: 'Comments' },
  { value: 'project', label: 'Projects' },
];

export function NotificationsPage() {
  const { notifications, unreadCount, markAllNotificationsRead } = useAppData();
  const [filter, setFilter] = useState<NotificationFilter>('all');

  const visibleNotifications = notifications
    .filter((notification) => filter === 'all' || notification.type === filter)
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <PageHeader
        title="Notifications"
        description={unreadCount > 0 ? `You have ${unreadCount} unread ${unreadCount === 1 ? 'notification' : 'notifications'}.` : 'You are all caught up.'}
        action={
          <button
            type="button"
            onClick={markAllNotificationsRead}
            disabled={unreadCount === 0}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-graphite-600 px-4 text-sm font-medium text-graphite-200 transition-all duration-200 hover:border-primary-500/60 hover:text-graphite-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <CheckCheck className="h-4 w-4" aria-hidden="true" />
            Mark all as read
          </button>
        }
      />

      <SegmentedControl label="Filter notifications" options={FILTER_OPTIONS} value={filter} onChange={setFilter} />

      {visibleNotifications.length === 0 ? (
        <EmptyState title="No notifications here" description="Activity for this filter will show up here." />
      ) : (
        <ul className="flex flex-col gap-3">
          {visibleNotifications.map((notification) => (
            <li key={notification.id}>
              <NotificationItem notification={notification} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
