import { ComponentProps, useCallback, useEffect, useRef } from 'react';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/pro-solid-svg-icons';

import { cn, getPortalClassName, getPortalContainer } from '@verbb/plugin-kit-react/utils';
import { useTranslation } from '@verbb/plugin-kit-react/hooks';

function Dialog({
    ...props
}: ComponentProps<typeof DialogPrimitive.Root>) {
    return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}
function DialogTrigger({
    ...props
}: ComponentProps<typeof DialogPrimitive.Trigger>) {
    return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}
function DialogPortal({
    ...props
}: ComponentProps<typeof DialogPrimitive.Portal>) {
    return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}
function DialogClose({
    ...props
}: ComponentProps<typeof DialogPrimitive.Close>) {
    return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
    className,
    ...props
}: ComponentProps<typeof DialogPrimitive.Backdrop>) {
    return (
        <DialogPrimitive.Backdrop
            data-slot="dialog-overlay"
            forceRender
            className={cn(
                // Reset
                'fixed isolate z-50 inset-0',

                // Ensure we play well with Craft's modals
                // 'z-[99]',

                // Theme
                'bg-gray-900/20',

                // State
                'data-[open]:animate-in data-[closed]:animate-out',
                'data-[closed]:fade-out-0 data-[open]:fade-in-0',

                // "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",

                className,
            )}
            onPointerDown={(event) => {
                const { target } = event;

                // If we've got a Garnish modal open, allow that to take focus. Includes the shade and the modal content.
                if (target instanceof HTMLElement && target.classList.contains('modal-shade')) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                // If we've got a Garnish modal open, allow that to take focus. Includes the shade and the modal content.
                if (target instanceof HTMLElement && target.closest('.modal')) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            }}
            {...props}
        />
    );
};

function DialogContent({
    className,
    children,
    showCloseButton = false,
    autoFocusFirstInput = true,
    portalClassName,
    portalContainer,
    ...props
}: ComponentProps<typeof DialogPrimitive.Popup> & {
    showCloseButton?: boolean
    autoFocusFirstInput?: boolean
    portalClassName?: string
    portalContainer?: HTMLElement | ShadowRoot | null
}) {
    const resolvedPortalClassName = getPortalClassName(portalClassName);
    const resolvedPortalContainer = getPortalContainer(portalContainer);
    const t = useTranslation();
    const contentRef = useRef<HTMLDivElement | null>(null);

    const findFirstInput = useCallback((root: HTMLElement): HTMLElement | null => {
        const focusSelector = [
            'input:not([type="hidden"]):not([disabled])',
            'textarea:not([disabled])',
            'select:not([disabled])',
        ].join(', ');

        return root.querySelector<HTMLElement>(focusSelector);
    }, []);

    const focusFirstInput = useCallback((root: HTMLElement): boolean => {
        const candidate = findFirstInput(root);

        if (!candidate) {
            return false;
        }

        // Do not autofocus a pre-populated input/textarea, and do not
        // fall through to later fields.
        if (candidate instanceof HTMLInputElement || candidate instanceof HTMLTextAreaElement) {
            if (candidate.value.length > 0) {
                return true;
            }
        }

        candidate.focus?.();

        // Place a caret for text-like inputs so users can type immediately.
        if (candidate instanceof HTMLInputElement || candidate instanceof HTMLTextAreaElement) {
            const cursorPosition = candidate.value.length;

            window.setTimeout(() => {
                candidate.setSelectionRange?.(cursorPosition, cursorPosition);
            }, 0);
        }

        return true;
    }, [findFirstInput]);

    useEffect(() => {
        if (!autoFocusFirstInput) {
            return;
        }

        const root = contentRef.current;

        if (!root) {
            return;
        }

        let attemptCount = 0;
        const maxAttempts = 10;

        const attemptFocus = () => {
            const activeElement = document.activeElement as HTMLElement | null;

            // Stop once an input inside this dialog is already focused.
            if (activeElement && root.contains(activeElement)) {
                if (activeElement.matches('input, textarea, select')) {
                    return;
                }
            }

            if (focusFirstInput(root)) {
                return;
            }

            attemptCount += 1;

            if (attemptCount < maxAttempts) {
                window.setTimeout(attemptFocus, 50);
            }
        };

        // Defer one frame to allow lazy schema hydration to mount fields.
        const frame = window.requestAnimationFrame(attemptFocus);

        return () => {
            window.cancelAnimationFrame(frame);
        };
    }, [autoFocusFirstInput, children, focusFirstInput]);

    return (
        <DialogPortal
            data-slot="dialog-portal"
            className={resolvedPortalClassName}
            container={resolvedPortalContainer}
        >
            <DialogOverlay data-slot="dialog-overlay" />

            <DialogPrimitive.Popup
                data-slot="dialog-content"
                ref={contentRef}
                initialFocus={() => {
                    if (!autoFocusFirstInput) {
                        return false;
                    }

                    const root = contentRef.current;

                    if (!root) {
                        return true;
                    }

                    return !focusFirstInput(root);
                }}
                className={cn(
                    // Reset
                    'fixed z-50 left-[50%] top-[50%] w-full max-w-5xl',
                    'flex flex-col',

                    // Ensure we play well with Craft's modals; nested dialogs stack above parent
                    // 'z-[99] data-[nested]:z-[100]',

                    // Theme
                    'bg-white',
                    'rounded-lg',
                    'shadow-modal',

                    // Transform
                    'translate-x-[-50%] translate-y-[-50%]',

                    // State Animations
                    'data-[open]:animate-in data-[closed]:animate-out',
                    'data-[closed]:fade-out-0 data-[open]:fade-in-0',
                    'data-[closed]:zoom-out-95 data-[open]:zoom-in-95',

                    className,
                )}
                {...props}
            >
                {showCloseButton && (
                    <DialogPrimitive.Close
                        data-slot="dialog-close"
                        className={cn(
                            // Reset
                            'absolute right-4 top-4 rounded-sm cursor-pointer',

                            // Theme
                            'opacity-70 ring-offset-background transition-opacity',

                            // State
                            'hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none',
                            'data-[open]:bg-blue-500 data-[open]:text-white',
                        )}
                    >
                        <FontAwesomeIcon icon={faXmark} className="size-4.5" />
                        <span className="sr-only">{t('Close')}</span>
                    </DialogPrimitive.Close>
                )}
                {children}
            </DialogPrimitive.Popup>
        </DialogPortal>
    );
};

function DialogHeader({
    className,
    showCloseButton = true,
    children,
    ...props
}: ComponentProps<'div'> & {
    showCloseButton?: boolean
}) {
    const t = useTranslation();

    return (
        <div
            data-slot="dialog-header"
            className={cn(
                // Reset
                'relative flex flex-col space-y-1.5',
                'text-left',
                'rounded-t-lg',
                'gap-1',

                // Theme
                'bg-[#f3f7fb] py-4 px-4',
                'border-b border-b-gray-150',

                className,
            )}
            {...props}
        >
            {showCloseButton && (
                <DialogPrimitive.Close
                    data-slot="dialog-close"
                    className={cn(
                        // Reset
                        'absolute right-4 top-[50%] translate-y-[-50%] rounded-sm cursor-pointer',

                        // Theme
                        'opacity-70 ring-offset-background transition-opacity',

                        // State
                        'hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none',
                        'data-[open]:bg-blue-500 data-[open]:text-white',
                    )}
                >
                    <FontAwesomeIcon icon={faXmark} className="size-4.5" />
                    <span className="sr-only">{t('Close')}</span>
                </DialogPrimitive.Close>
            )}
            {children}
        </div>
    );
};

function DialogFooter({ className, ...props }: ComponentProps<'div'>) {
    return (
        <div
            data-slot="dialog-footer"
            className={cn(
                // Reset
                'flex flex-row justify-end',
                'rounded-b-lg',

                // Theme
                'bg-[#e4edf6] py-[10px] px-4',
                'border-t border-t-gray-150',

                className,
            )}
            {...props}
        />
    );
};

function DialogTitle({
    className,
    ...props
}: ComponentProps<typeof DialogPrimitive.Title>) {
    return (
        <DialogPrimitive.Title
            data-slot="dialog-title"
            className={cn(
                // Reset
                'text-[15px] font-semibold leading-none m-0',

                className,
            )}
            {...props}
        />
    );
};

function DialogDescription({
    className,
    ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
    return (
        <DialogPrimitive.Description
            data-slot="dialog-description"
            className={cn(
                // Reset
                'text-xs text-gray-500',

                className,
            )}
            {...props}
        />
    );
};

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
};
