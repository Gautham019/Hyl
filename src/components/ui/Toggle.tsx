import { cx } from '@/lib/utils';

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
};

export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cx(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors duration-300',
        checked ? 'border-primary-500 bg-primary-500' : 'border-graphite-600 bg-graphite-800',
      )}
    >
      <span
        className={cx(
          'inline-block h-4 w-4 rounded-full bg-graphite-50 shadow transition-transform duration-300 ease-out',
          checked ? 'translate-x-[22px]' : 'translate-x-1',
        )}
      />
    </button>
  );
}
