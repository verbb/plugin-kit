import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClipboard } from '@fortawesome/pro-solid-svg-icons';

import { Button } from './Button';
import { cn } from '@verbb/plugin-kit-react/utils';

export async function copyToClipboardWithMeta(value) {
    await navigator.clipboard.writeText(value);
}

export function CopyButton({
    value,
    className,
    variant = 'transparent',
    ...props
}: {
    value: string;
    className?: string;
    src?: string;
    variant?: 'link' | 'none' | 'default' | 'primary' | 'secondary' | 'dashed' | 'outline' | 'transparent' | 'ghost';
    event?: Event;
}) {
    const [hasCopied, setHasCopied] = useState(false);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setHasCopied(false);
        }, 2000);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [hasCopied]);

    return (
        <Button
            size="icon"
            variant={variant}
            className={cn(
                className,
            )}
            onClick={() => {
                copyToClipboardWithMeta(value);

                setHasCopied(true);
            }}
            {...props}
        >
            <span className="sr-only">Copy</span>
            {hasCopied ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faClipboard} />}
        </Button>
    );
}
