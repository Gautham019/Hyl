import { cx } from '@/lib/utils';

type SegmentedOption<T extends string> = {
  value: T;
  label: string;
};

type SegmentedControlProps<T extends string> = {
  label: string;
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
  className = '',
}: SegmentedControlProps<T>) {
  return (
    <div role="group" aria-label={label} className={cx('flex flex-wrap gap-1.5', className)}>
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
            className={cx(
              'rounded-md border px-3.5 py-2 text-sm font-medium transition-all duration-200 active:scale-[0.97]',
              isActive
                ? 'border-primary-500/60 bg-primary-500/15 text-primary-200'
                : 'border-graphite-800 bg-graphite-900 text-graphite-400 hover:border-graphite-600 hover:text-graphite-100',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
