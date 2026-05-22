import {
    createContext, useContext, useId, type ComponentProps, type ReactNode,
} from 'react';
import { Label, Markdown } from '@verbb/plugin-kit-react/components';
import { Slot } from '@verbb/plugin-kit-react/components/Slot';
import { cn } from '@verbb/plugin-kit-react/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAsterisk, faTriangleExclamation } from '@fortawesome/pro-solid-svg-icons';
import { useTranslation } from '@verbb/plugin-kit-react/hooks';

type FieldContextValue = {
    id: string;
    name: string;
    errors: string[];
};

const FieldContext = createContext<FieldContextValue | null>(null);
const InlineFieldErrorVisibilityContext = createContext<boolean>(true);

const useFieldContext = () => {
    const context = useContext(FieldContext);
    if (!context) {
        throw new Error('Field components must be used within <FieldRoot>.');
    }
    return context;
};

type FieldRootProps = ComponentProps<'div'> & {
    name: string;
    errors?: string[];
};

const FieldRoot = ({
    name, errors = [], className, ...props
}: FieldRootProps) => {
    const id = useId();
    return (
        <FieldContext.Provider value={{ id, name, errors }}>
            <div
                data-slot="field"
                className={cn('space-y-1.5', className)}
                {...props}
            />
        </FieldContext.Provider>
    );
};

const FieldHeader = ({ className, ...props }: ComponentProps<'div'>) => {
    return (
        <div data-slot="field-header" className={cn(className)} {...props} />
    );
};

const FieldLabel = ({ className, ...props }: ComponentProps<typeof Label>) => {
    const { id, errors } = useFieldContext();
    return (
        <Label
            data-slot="field-label"
            htmlFor={`${id}-control`}
            data-error={errors.length > 0}
            className={cn('text-sm font-bold', className)}
            {...props}
        />
    );
};

const FieldInstructions = ({ className, children, ...props }: ComponentProps<'p'>) => {
    const { id } = useFieldContext();
    const content = typeof children === 'string' ? children : null;

    const baseProps = {
        'data-slot': 'field-instructions',
        id: `${id}-description`,
        className: cn('text-sm text-gray-500', className),
    };

    if (content !== null) {
        return (
            <Markdown
                content={content}
                inline
                as="p"
                {...baseProps}
            />
        );
    }

    return (
        <p {...baseProps} {...props}>
            {children}
        </p>
    );
};

type FieldControlProps = Omit<ComponentProps<typeof Slot>, 'className'> & {
    className?: string;
};

const FieldControl = ({ className, ...props }: FieldControlProps) => {
    const { id, errors } = useFieldContext();
    const isInvalid = errors.length > 0;

    return (
        <Slot
            data-slot="field-control"
            id={`${id}-control`}
            aria-invalid={isInvalid}
            aria-describedby={`${id}-description ${id}-errors`}
            aria-errormessage={isInvalid ? `${id}-errors` : undefined}
            className={cn(className)}
            {...props}
        />
    );
};

const FieldErrors = ({ className, ...props }: ComponentProps<'ul'>) => {
    const { id, errors } = useFieldContext();
    if (!errors.length) {
        return null;
    }
    return (
        <ul
            data-slot="field-errors"
            id={`${id}-errors`}
            className={cn('list-[square] text-error', className)}
            style={{ marginBlockStart: '5px', paddingInlineStart: '20px' }}
            {...props}
        >
            {errors.map((message, index) => {
                return (
                    <li key={index}>
                        <Markdown content={message} inline />
                    </li>
                );
            })}
        </ul>
    );
};

type FieldLayoutProps = ComponentProps<'div'> & {
    name: string;
    label?: string;
    instructions?: string;
    headerEnd?: ReactNode;
    required?: boolean;
    warning?: string;
    errors?: string[];
    withControl?: boolean;
    showInlineErrors?: boolean;
};

const FieldLayout = ({
    name,
    label,
    instructions,
    headerEnd,
    required,
    warning,
    errors = [],
    withControl = true,
    showInlineErrors,
    className,
    children,
    ...props
}: FieldLayoutProps) => {
    const t = useTranslation();
    const contextShowInlineErrors = useContext(InlineFieldErrorVisibilityContext);
    const shouldShowInlineErrors = showInlineErrors ?? contextShowInlineErrors;

    return (
        <FieldRoot name={name} errors={errors} className={className} {...props}>
            {(label || instructions || headerEnd) ? (
                <FieldHeader className={cn(
                    headerEnd ? 'flex items-start justify-between gap-3' : 'space-y-0.5',
                )}>
                    <div className="min-w-0 space-y-0.5">
                        {label && (
                            <FieldLabel className="flex items-center gap-1">
                                {label}
                                {required && (
                                    <>
                                        <span className="sr-only">{t('Required')}</span>
                                        <span className="text-rose-600" aria-hidden="true">
                                            <FontAwesomeIcon icon={faAsterisk} className="size-[10px]" />
                                        </span>
                                    </>
                                )}
                            </FieldLabel>
                        )}
                        {instructions && (
                            <FieldInstructions>{instructions}</FieldInstructions>
                        )}
                    </div>

                    {headerEnd && (
                        <div className="shrink-0">
                            {headerEnd}
                        </div>
                    )}
                </FieldHeader>
            ) : null}

            {withControl ? (
                <FieldControl>{children}</FieldControl>
            ) : (
                children
            )}

            {shouldShowInlineErrors && <FieldErrors />}

            {warning && (
                <div className="flex min-w-0 items-start gap-1 text-sm text-warning">
                    <FontAwesomeIcon icon={faTriangleExclamation} className="mt-[0.3em] size-3 shrink-0" />

                    <Markdown
                        className="min-w-0"
                        content={warning}
                        inline
                        as="p"
                    />
                </div>
            )}
        </FieldRoot>
    );
};

export {
    FieldRoot,
    FieldHeader,
    FieldLabel,
    FieldInstructions,
    FieldControl,
    FieldErrors,
    FieldLayout,
    InlineFieldErrorVisibilityContext,
    useFieldContext,
};
