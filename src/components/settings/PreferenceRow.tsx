import { Toggle } from '@/components/ui/Toggle';

type PreferenceRowProps = {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function PreferenceRow({ title, description, checked, onChange }: PreferenceRowProps) {
  return (
    <div className="flex items-center justify-between gap-6 py-4 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-graphite-100">{title}</p>
        <p className="mt-1 text-sm leading-normal text-graphite-400">{description}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} label={title} />
    </div>
  );
}
