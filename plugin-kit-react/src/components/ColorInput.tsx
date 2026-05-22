import { useEffect, useMemo, useState } from 'react';
import { Input } from '@verbb/plugin-kit-react/components';
import { cn } from '@verbb/plugin-kit-react/utils';

const DEFAULT_COLOR = '#000000';
type ColorInputSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';

const SIZE_CLASSES: Record<ColorInputSize, {
    wrapper: string;
    swatch: string;
    hash: string;
    input: string;
}> = {
    xs: {
        wrapper: 'min-w-[80px]',
        swatch: 'left-1.5 size-3.5',
        hash: 'left-6 text-[10px]',
        input: 'h-[24px]! pl-8! pr-2!',
    },
    sm: {
        wrapper: 'min-w-[88px]',
        swatch: 'left-1.5 size-4',
        hash: 'left-6.5 text-[11px]',
        input: 'h-[26px]! pl-9! pr-2.5!',
    },
    default: {
        wrapper: 'min-w-[98px]',
        swatch: 'left-1.5 size-5',
        hash: 'left-8 text-xs',
        input: 'h-[30px]! pl-11! pr-3!',
    },
    lg: {
        wrapper: 'min-w-[108px]',
        swatch: 'left-2 size-5',
        hash: 'left-8.5 text-[13px]',
        input: 'h-[34px]! pl-12! pr-3!',
    },
    xl: {
        wrapper: 'min-w-[118px]',
        swatch: 'left-2 size-6',
        hash: 'left-10 text-sm',
        input: 'h-[38px]! pl-[52px]! pr-3.5!',
    },
};

const FIT_CELL_INPUT_WIDTH: Record<ColorInputSize, string> = {
    xs: 'w-[72px]',
    sm: 'w-[78px]',
    default: 'w-[86px]',
    lg: 'w-[94px]',
    xl: 'w-[104px]',
};

const sanitizeHex = (value: string) => {
    return String(value || '')
        .replace(/^#/, '')
        .replace(/[^0-9a-fA-F]/g, '')
        .slice(0, 6)
        .toLowerCase();
};

const isCompleteHex = (value: string) => {
    return value.length === 3 || value.length === 6;
};

const expandShortHex = (value: string) => {
    if (value.length !== 3) {
        return value;
    }

    return value.split('').map((char) => { return `${char}${char}`; }).join('');
};

export function ColorInput({
    value,
    onValueChange,
    onBlur,
    className,
    size = 'default',
    fitCell = false,
    disabled = false,
    isInvalid = false,
    ...props
}: {
    value?: string;
    onValueChange?: (value: string) => void;
    onBlur?: () => void;
    className?: string;
    size?: ColorInputSize;
    fitCell?: boolean;
    disabled?: boolean;
    isInvalid?: boolean;
    [x: string]: unknown;
}) {
    const [hexValue, setHexValue] = useState(() => {
        return sanitizeHex(String(value || ''));
    });

    useEffect(() => {
        const normalized = sanitizeHex(String(value || ''));
        if (normalized !== hexValue) {
            setHexValue(normalized);
        }
    }, [hexValue, value]);

    const pickerValue = useMemo(() => {
        if (hexValue.length === 6) {
            return `#${hexValue}`;
        }

        if (hexValue.length === 3) {
            return `#${expandShortHex(hexValue)}`;
        }

        return DEFAULT_COLOR;
    }, [hexValue]);
    const isPreviewTransparent = !isCompleteHex(hexValue);

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextHex = sanitizeHex(event.target.value);
        setHexValue(nextHex);

        if (nextHex.length === 0) {
            onValueChange?.('');
            return;
        }

        onValueChange?.(`#${nextHex}`);
    };

    const handleColorPickerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const normalized = sanitizeHex(event.target.value);
        setHexValue(normalized);
        onValueChange?.(`#${normalized}`);
    };
    const sizeClasses = SIZE_CLASSES[size] || SIZE_CLASSES.default;
    const fitCellWidthClass = FIT_CELL_INPUT_WIDTH[size] || FIT_CELL_INPUT_WIDTH.default;

    return (
        <div className={cn(
            'relative inline-block',
            fitCell ? 'w-auto min-w-0 max-w-full' : sizeClasses.wrapper,
            className,
        )}>
            <div className={cn(
                'absolute top-1/2 z-10 -translate-y-1/2 rounded-sm',
                fitCell ? 'left-2 size-4' : sizeClasses.swatch,
                disabled && 'opacity-50',
            )}>
                <div
                    className="absolute inset-0 rounded-sm shadow-[inset_0_0_0_1px_rgba(0,0,0,.15)]"
                    style={isPreviewTransparent ? {
                        backgroundColor: '#fff',
                        backgroundImage: `
                            linear-gradient(45deg, #d1d5db 25%, transparent 25%),
                            linear-gradient(-45deg, #d1d5db 25%, transparent 25%),
                            linear-gradient(45deg, transparent 75%, #d1d5db 75%),
                            linear-gradient(-45deg, transparent 75%, #d1d5db 75%)
                        `,
                        backgroundSize: '8px 8px',
                        backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
                    } : { backgroundColor: pickerValue }}
                />

                <input
                    type="color"
                    className="absolute inset-0 m-0 size-full cursor-pointer border-0 p-0 opacity-0 [appearance:none] [-webkit-appearance:none]"
                    value={pickerValue}
                    onChange={handleColorPickerChange}
                    disabled={disabled}
                    aria-label="Color picker"
                    style={{
                        width: '100%',
                        height: '100%',
                        minWidth: 0,
                        minHeight: 0,
                        background: 'transparent',
                    }}
                />
            </div>

            <div
                className={cn(
                    'pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 font-mono text-gray-300',
                    fitCell ? 'left-7 text-[11px]' : sizeClasses.hash,
                )}
                aria-hidden="true"
            >
                #
            </div>

            <Input
                type="text"
                size={size}
                value={hexValue}
                onChange={handleTextChange}
                onBlur={onBlur}
                disabled={disabled}
                aria-invalid={isInvalid}
                autoComplete="off"
                maxLength={6}
                className={cn(
                    'font-mono text-[12px]',
                    fitCell
                        ? ['max-w-full h-full rounded-none! border-none! bg-transparent! pl-9! pr-2! focus-visible:shadow-none focus-visible:inset-ring-1 focus-visible:inset-ring-gray-200', fitCellWidthClass]
                        : ['rounded-sm!', sizeClasses.input],
                )}
                {...props}
            />
        </div>
    );
}
