import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cx } from '@/lib/utils';
import { inputClass, labelClass } from '@/components/ui/styles';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function TextField({ label, error, className = '', ...inputProps }: TextFieldProps) {
  const inputId = useId();
  const errorId = `${inputId}-error`;

  return (
    <div>
      <label htmlFor={inputId} className={labelClass}>
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cx(inputClass, error && 'border-error-500/70 focus:border-error-500 focus:ring-error-500/30', className)}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className="mt-2 text-xs text-error-400">
          {error}
        </p>
      )}
    </div>
  );
}

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export function TextAreaField({ label, error, hint, className = '', ...textareaProps }: TextAreaFieldProps) {
  const fieldId = useId();
  const errorId = `${fieldId}-error`;

  return (
    <div>
      <label htmlFor={fieldId} className={labelClass}>
        {label}
      </label>
      <textarea
        id={fieldId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cx(
          'min-h-[120px] w-full resize-y rounded-md border border-graphite-700 bg-graphite-950 px-3.5 py-3 text-sm leading-normal text-graphite-100 placeholder:text-graphite-500 transition-colors duration-200 hover:border-graphite-600 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30',
          error && 'border-error-500/70 focus:border-error-500 focus:ring-error-500/30',
          className,
        )}
        {...textareaProps}
      />
      {error ? (
        <p id={errorId} className="mt-2 text-xs text-error-400">
          {error}
        </p>
      ) : (
        hint && <p className="mt-2 text-xs text-graphite-500">{hint}</p>
      )}
    </div>
  );
}
