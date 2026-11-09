import { Eye, GitBranch, Heart, MessageCircle, FolderKanban } from 'lucide-react';

const CODE_LINES = [
  { indent: 0, parts: [['keyword', 'const '], ['property', 'developer'], ['plain', ' = {']] },
  { indent: 1, parts: [['property', 'role'], ['plain', ': '], ['string', "'Builder'"], ['plain', ',']] },
  { indent: 1, parts: [['property', 'focus'], ['plain', ': ['], ['string', "'Interfaces'"], ['plain', ', '], ['string', "'Open source'"], ['plain', '],']] },
  { indent: 1, parts: [['property', 'shipping'], ['plain', ': '], ['keyword', 'true'], ['plain', ',']] },
  { indent: 1, parts: [['property', 'openTo'], ['plain', ': '], ['string', "'Collaboration'"], ['plain', ',']] },
  { indent: 0, parts: [['plain', '};']] },
] as const;

const TOKEN_CLASSES: Record<string, string> = {
  keyword: 'text-accent-400',
  property: 'text-graphite-100',
  string: 'text-secondary-400',
  plain: 'text-graphite-400',
};

export function ProjectShowcase() {
  return (
    <div className="relative mx-auto h-[460px] w-full max-w-[560px] sm:h-[520px]" aria-hidden="true">
      <div className="absolute left-0 top-12 w-[84%] overflow-hidden rounded-xl border border-graphite-700 bg-graphite-900 shadow-card animate-float">
        <div className="flex items-center gap-2 border-b border-graphite-800 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-error-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-success-500/80" />
          <span className="ml-3 font-mono text-xs text-graphite-500">profile.ts</span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-[1.7] sm:text-sm">
          <code>
            {CODE_LINES.map((line, index) => (
              <div key={index} style={{ paddingLeft: `${line.indent * 1.25}rem` }}>
                {line.parts.map(([type, text], partIndex) => (
                  <span key={partIndex} className={TOKEN_CLASSES[type]}>
                    {text}
                  </span>
                ))}
              </div>
            ))}
          </code>
        </pre>
      </div>

      <div
        className="absolute right-0 top-0 w-[58%] rounded-xl border border-primary-500/30 bg-graphite-850 p-5 shadow-card animate-float"
        style={{ animationDelay: '-2s' }}
      >
        <div className="flex items-center justify-between">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-500/15 text-primary-400">
            <FolderKanban className="h-4 w-4" />
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-success-500/10 px-2.5 py-1 text-[11px] font-medium text-success-400">
            <span className="h-1.5 w-1.5 rounded-full bg-success-400 animate-pulse-dot" />
            Live
          </span>
        </div>
        <h3 className="mt-4 font-display text-base font-semibold text-graphite-50">Pulse Board</h3>
        <p className="mt-1.5 text-xs leading-normal text-graphite-400">A real-time tracker for small build teams.</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {['React', 'TypeScript', 'Tailwind'].map((tag) => (
            <span key={tag} className="rounded border border-graphite-700 px-2 py-0.5 font-mono text-[11px] text-graphite-300">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-6 right-2 w-[66%] rounded-xl border border-graphite-700 bg-graphite-850/95 p-4 shadow-card animate-float sm:right-4"
        style={{ animationDelay: '-4s' }}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-500/20 font-display text-xs font-bold text-secondary-300">
            MK
          </span>
          <p className="text-xs font-medium text-graphite-200">Left feedback on your project</p>
        </div>
        <p className="mt-3 text-xs leading-normal text-graphite-400">
          Clean architecture. The component split makes this easy to extend.
        </p>
        <div className="mt-3 flex items-center gap-4 text-graphite-500">
          <Heart className="h-3.5 w-3.5" />
          <MessageCircle className="h-3.5 w-3.5" />
          <Eye className="h-3.5 w-3.5" />
          <GitBranch className="ml-auto h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}
