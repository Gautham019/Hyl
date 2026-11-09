import { Bookmark, Heart, MessageCircle, UserPlus, type LucideIcon } from 'lucide-react';
import { Avatar } from '@/components/people/Avatar';
import { DemoBadge } from '@/components/ui/DemoBadge';
import { useAppData } from '@/context/AppDataContext';
import { cx, formatRelativeTime } from '@/lib/utils';
import type { AppNotification, NotificationType } from '@/types/social';

const NOTIFICATION_STYLES: Record<NotificationType, { icon: LucideIcon; className: string }> = {
  follow: { icon: UserPlus, className: 'text-primary-300' },
  like: { icon: Heart, className: 'text-error-400' },
  comment: { icon: MessageCircle, className: 'text-secondary-400' },
  project: { icon: Bookmark, className: 'text-accent-300' },
};

export function NotificationItem({ notification }: { notification: AppNotification }) {
  const { getDeveloper, markNotificationRead } = useAppData();
  const actor = getDeveloper(notification.actorId);
  const actorName = actor?.name ?? 'Someone';
  const { icon: Icon, className } = NOTIFICATION_STYLES[notification.type];

  const markRead = () => markNotificationRead(notification.id);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={markRead}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          markRead();
        }
      }}
      className={cx(
        'flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition-colors duration-200 sm:p-5',
        notification.read
          ? 'border-graphite-800 bg-graphite-900 hover:border-graphite-700'
          : 'border-primary-500/30 bg-primary-500/5 hover:border-primary-500/50',
      )}
    >
      <div className="relative shrink-0">
        <Avatar name={actorName} src={actor?.avatarUrl} size="md" />
        <span
          className={cx(
            'absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-graphite-900 ring-1 ring-graphite-700',
            className,
          )}
        >
          <Icon className="h-3 w-3" aria-hidden="true" />
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm leading-normal text-graphite-300">
          <span className="font-semibold text-graphite-50">{actorName}</span> {notification.message}
        </p>
        {notification.preview && (
          <p className="mt-2 line-clamp-2 border-l-2 border-graphite-700 pl-3 text-sm italic text-graphite-400">
            {notification.preview}
          </p>
        )}
        <div className="mt-2 flex items-center gap-2 text-xs text-graphite-500">
          <time dateTime={new Date(notification.createdAt).toISOString()}>
            {formatRelativeTime(notification.createdAt)}
          </time>
          {notification.isDemo && <DemoBadge />}
        </div>
      </div>

      {!notification.read && <span aria-label="Unread" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary-400" />}
    </div>
  );
}
