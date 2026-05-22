import { cn } from '@verbb/plugin-kit-react/utils';

type StatusProps = {
    status?: string;
    label?: string;
    className?: string;
};

const STATUS_CLASSES: Record<string, string> = {
    all: 'bg-[linear-gradient(60deg,#184cef,#e5422b)]',
    on: 'bg-[var(--color-teal-550)]',
    live: 'bg-[var(--color-teal-550)]',
    active: 'bg-[var(--color-teal-550)]',
    enabled: 'bg-[var(--color-teal-550)]',
    off: 'bg-[var(--color-red-600)]',
    suspended: 'bg-[var(--color-red-600)]',
    expired: 'bg-[var(--color-red-600)]',
    warning: 'bg-[var(--color-amber-100)]',
    pending: 'bg-[var(--color-orange-400)]',
    red: 'bg-[var(--color-red-600)]',
    orange: 'bg-[var(--color-orange-400)]',
    amber: 'bg-[var(--color-amber-500)]',
    yellow: 'bg-[var(--color-yellow-500)]',
    lime: 'bg-[var(--color-lime-500)]',
    green: 'bg-[var(--color-green-600)]',
    emerald: 'bg-[var(--color-emerald-500)]',
    teal: 'bg-[var(--color-teal-550)]',
    turquoise: 'bg-[var(--color-teal-550)]',
    cyan: 'bg-[var(--color-cyan-500)]',
    sky: 'bg-[var(--color-sky-500)]',
    blue: 'bg-[var(--color-blue-600)]',
    indigo: 'bg-[var(--color-indigo-500)]',
    violet: 'bg-[var(--color-violet-500)]',
    purple: 'bg-[var(--color-purple-500)]',
    fuchsia: 'bg-[var(--color-fuchsia-500)]',
    pink: 'bg-[var(--color-pink-500)]',
    rose: 'bg-[var(--color-rose-500)]',
    light: 'bg-[var(--color-gray-100)]',
    gray: 'bg-[var(--color-gray-300)]',
    grey: 'bg-[var(--color-gray-300)]',
    white: 'bg-[var(--color-white)]',
    black: 'bg-[var(--color-gray-800)]',
    disabled: 'shadow-[inset_0_0_0_2px_var(--color-gray-500)]',
    inactive: 'shadow-[inset_0_0_0_2px_var(--color-gray-500)]',
};

const Status = ({ status = 'on', label, className }: StatusProps) => {
    const ariaLabel = label || status;
    const statusClass = STATUS_CLASSES[status] || 'bg-[var(--color-gray-300)]';

    return (
        <span
            role="status"
            aria-label={ariaLabel}
            title={label || status}
            className={cn(
                'inline-block size-3 rounded-full',
                'shrink-0',
                statusClass,
                className,
            )}
        />
    );
};

export { Status };
