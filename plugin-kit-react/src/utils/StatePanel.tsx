import { Button } from '../components/Button.js';
import { Icon } from '../components/Icon.js';
import type { PkButtonVariant } from '@verbb/plugin-kit-web/components/button/pk-button.js';
import type { CSSProperties, ReactNode } from 'react';

import { cn } from './cn.js';

export type StatePanelAction = {
    label: string;
    onClick: () => void;
    variant?: PkButtonVariant;
};

export type StatePanelVariant = 'empty' | 'error' | 'success' | 'info';

export type StatePanelProps = {
    variant?: StatePanelVariant;
    icon?: string | null;
    title?: string | null;
    message?: string | null;
    primaryAction?: StatePanelAction | null;
    secondaryAction?: StatePanelAction | null;
    children?: ReactNode;
    containerClassName?: string;
    contentClassName?: string;
    titleClassName?: string;
    messageClassName?: string;
    showIcon?: boolean;
};

// Icon chrome uses token CSS variables (not Tailwind utilities) so host apps that
// don't `@source` this package still get the rounded badge + muted glyph.
const ICON_SHELL_STYLE: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2.5rem',
    height: '2.5rem',
    marginBottom: '0.75rem',
    borderRadius: '10px',
};

const ICON_GLYPH_STYLE: CSSProperties = {
    width: '1.25rem',
    height: '1.25rem',
    fontSize: '1.25rem',
};

const VARIANT_CONFIG: Record<
    StatePanelVariant,
    {
        icon: string;
        iconColor: string;
        iconContainerBackground: string;
        titleClassName: string;
        messageClassName: string;
    }
> = {
    empty: {
        icon: 'empty-set',
        iconColor: 'var(--pk-color-slate-500)',
        // Match prior `bg-slate-200/55` against the already-alpha slate-200 token.
        iconContainerBackground: 'color-mix(in srgb, var(--pk-color-slate-200) 55%, transparent)',
        titleClassName: 'text-base font-medium text-gray-900',
        messageClassName: 'text-sm text-gray-500',
    },
    error: {
        icon: 'triangle-exclamation',
        iconColor: 'var(--pk-color-rose-600)',
        iconContainerBackground: 'color-mix(in srgb, var(--pk-color-rose-500) 12%, transparent)',
        titleClassName: 'text-base font-medium text-gray-900',
        messageClassName: 'text-sm text-gray-500',
    },
    success: {
        icon: 'circle-check',
        iconColor: 'var(--pk-color-emerald-600)',
        iconContainerBackground: 'var(--pk-color-slate-100)',
        titleClassName: 'text-base font-medium text-gray-900',
        messageClassName: 'text-sm text-gray-500',
    },
    info: {
        icon: 'circle-info',
        iconColor: 'var(--pk-color-sky-600)',
        iconContainerBackground: 'var(--pk-color-slate-100)',
        titleClassName: 'text-base font-medium text-gray-900',
        messageClassName: 'text-sm text-gray-500',
    },
};

/**
 * Centered empty / error / success / info surface for full React CP apps.
 * Hosts must register any icons they render (error uses `triangle-exclamation`).
 */
export function StatePanel({
    variant = 'empty',
    icon = null,
    title = null,
    message = null,
    primaryAction = null,
    secondaryAction = null,
    children = null,
    containerClassName = 'flex flex-1 items-center justify-center py-12',
    contentClassName = 'flex w-[90%] max-w-[560px] flex-col items-center text-center',
    titleClassName = '',
    messageClassName = '',
    showIcon = true,
}: StatePanelProps) {
    const config = VARIANT_CONFIG[variant] || VARIANT_CONFIG.empty;
    const resolvedIcon = icon || config.icon;

    return (
        <div className={containerClassName}>
            <div className={contentClassName}>
                {showIcon && resolvedIcon ? (
                    <div
                        style={{
                            ...ICON_SHELL_STYLE,
                            backgroundColor: config.iconContainerBackground,
                        }}
                    >
                        <Icon
                            icon={resolvedIcon}
                            style={{
                                ...ICON_GLYPH_STYLE,
                                color: config.iconColor,
                            }}
                        />
                    </div>
                ) : null}

                {title ? <h2 className={cn('mb-2', config.titleClassName, titleClassName)}>{title}</h2> : null}

                {message ? (
                    <p className={cn('mb-4 max-w-[560px]', config.messageClassName, messageClassName)}>{message}</p>
                ) : null}

                {children}

                {primaryAction || secondaryAction ? (
                    <div className="mt-2 flex items-center justify-center gap-2">
                        {secondaryAction?.label && secondaryAction?.onClick ? (
                            <Button type="button" variant={secondaryAction.variant || 'secondary'} onClick={secondaryAction.onClick}>
                                {secondaryAction.label}
                            </Button>
                        ) : null}

                        {primaryAction?.label && primaryAction?.onClick ? (
                            <Button type="button" variant={primaryAction.variant || 'primary'} onClick={primaryAction.onClick}>
                                {primaryAction.label}
                            </Button>
                        ) : null}
                    </div>
                ) : null}
            </div>
        </div>
    );
}
