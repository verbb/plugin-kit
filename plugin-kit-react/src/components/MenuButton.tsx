import type React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';

import { Button, buttonVariants } from './Button.jsx';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './DropdownMenu.jsx';

import { cn } from '@verbb/plugin-kit-react/utils';
import { useTranslation } from '@verbb/plugin-kit-react/hooks';

const menuMainButtonVariants = cva('!rounded-r-none', {
    variants: {
        split: {
            split: null,
            none: '!border-r-0',
        },
    },
    defaultVariants: {
        split: 'none',
    },
});

const menuTriggerVariants = cva('!rounded-l-none !border-l-0', {
    variants: {
        size: {
            xs: 'px-1.5 py-[3px]',
            sm: 'px-1.5 py-[5px]',
            default: 'px-1.5 py-[7px]',
            lg: 'px-2 py-[9px]',
            xl: 'px-2.5 py-[10px]',
        },
        split: {
            split: '-ml-px',
            none: 'ml-[1px]',
        },
    },
    defaultVariants: {
        size: 'default',
        split: 'none',
    },
});

const menuTriggerIconVariants = cva('', {
    variants: {
        size: {
            xs: 'size-2.5',
            sm: 'size-3',
            default: 'size-3',
            lg: 'size-3.5',
            xl: 'size-4',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

type MenuButtonVariant = VariantProps<typeof buttonVariants>['variant'];
type MenuButtonSize = VariantProps<typeof menuTriggerVariants>['size'];

type MenuMainAction = {
    label?: React.ReactNode;
    icon?: React.ReactNode;
    iconPosition?: 'start' | 'end' | 'overlay';
    iconClassName?: string;
    labelClassName?: string;
    onClick?: () => void;
};

type MenuActionItem = {
    label: React.ReactNode;
    icon?: React.ReactNode;
    variant?: 'default' | 'destructive';
    onClick?: () => void;
};

type MenuSeparatorItem = {
    type: 'separator';
};

type MenuItem = MenuActionItem | MenuSeparatorItem;

type MenuButtonProps = React.ComponentProps<'div'> & {
    mainAction?: MenuMainAction;
    menuItems?: MenuItem[];
    variant?: MenuButtonVariant;
    size?: MenuButtonSize;
    loading?: boolean;
    disabled?: boolean;
    defaultOpen?: boolean;
    modal?: boolean;
};

export const MenuButton = ({
    mainAction,
    menuItems = [],
    variant = 'default',
    size = 'default',
    loading = false,
    disabled = false,
    className = '',
    defaultOpen = false,
    modal = true,
    ...props
}: MenuButtonProps) => {
    const t = useTranslation();
    const hasSplitBorder = variant === 'outline' || variant === 'dashed';
    const splitBorderVariant = hasSplitBorder ? 'split' : 'none';

    const triggerClass = menuTriggerVariants({ size, split: splitBorderVariant });
    const mainButtonClass = menuMainButtonVariants({ split: splitBorderVariant });

    const handleMainAction = () => {
        mainAction?.onClick?.();
    };

    const renderMenuItems = () => {
        return menuItems.map((item, index) => {
            if ('type' in item && item.type === 'separator') {
                return <DropdownMenuSeparator key={`separator-${index}`} />;
            }

            const actionItem = item as MenuActionItem;

            return (
                <DropdownMenuItem
                    key={index}
                    onClick={() => { actionItem.onClick?.(); }}
                    variant={actionItem.variant}
                >
                    {actionItem.icon && (
                        <span className={cn('mr-2')}>{actionItem.icon}</span>
                    )}
                    {actionItem.label}
                </DropdownMenuItem>
            );
        });
    };

    return (
        <div className={cn('inline-flex', className)} {...props}>
            <Button
                variant={variant}
                size={size}
                loading={loading}
                disabled={disabled}
                onClick={handleMainAction}
                className={mainButtonClass}
            >
                <span className={cn(
                    'inline-flex items-center',
                    mainAction?.icon && mainAction?.label && mainAction?.iconPosition !== 'overlay' ? 'gap-2' : '',
                    mainAction?.iconPosition === 'overlay' ? 'relative' : '',
                )}>
                    {mainAction?.icon ? (
                        <span className={cn(
                            mainAction?.iconPosition === 'overlay'
                                ? 'absolute inset-0 flex items-center justify-center pointer-events-none'
                                : '',
                            mainAction?.iconClassName || '',
                        )}>{mainAction.icon}</span>
                    ) : null}
                    {mainAction?.label ? (
                        <span className={mainAction?.labelClassName || ''}>{mainAction.label}</span>
                    ) : null}
                </span>
            </Button>

            <DropdownMenu size={size} defaultOpen={defaultOpen} modal={modal}>
                <DropdownMenuTrigger
                    disabled={disabled}
                    render={(
                        <Button
                            variant={variant}
                            size="none"
                            disabled={disabled}
                            className={triggerClass}
                            aria-label={t('Open menu')}
                        />
                    )}
                >
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={cn(
                            menuTriggerIconVariants({ size }),
                            'transition-transform data-[popup-open]:rotate-180',
                        )}
                    />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    {renderMenuItems()}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
