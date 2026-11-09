import { useState } from 'react';
import { getInitials, cx } from '@/lib/utils';

type AvatarSize = 'sm' | 'md' | 'lg';

type AvatarProps = {
  name: string;
  src?: string | null;
  size?: AvatarSize;
  className?: string;
};

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-24 w-24 text-2xl',
};

export function Avatar({ name, src, size = 'md', className = '' }: AvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = Boolean(src) && failedSrc !== src;
  const classes = cx(
    'shrink-0 rounded-full ring-1 ring-graphite-700',
    sizeClasses[size],
    className,
  );

  if (showImage && src) {
    return (
      <img
        src={src}
        alt={name}
        loading="lazy"
        onError={() => setFailedSrc(src)}
        className={cx(classes, 'object-cover')}
      />
    );
  }

  return (
    <span
      role="img"
      aria-label={name}
      className={cx(classes, 'flex items-center justify-center bg-primary-500/15 font-display font-semibold text-primary-300')}
    >
      {getInitials(name)}
    </span>
  );
}
