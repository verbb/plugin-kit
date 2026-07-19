import type { PkButtonSize, PkButtonVariant } from '@verbb/plugin-kit-web/components/button/pk-button.js';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'pk-button': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
                variant?: PkButtonVariant;
                size?: PkButtonSize;
                loading?: boolean;
                disabled?: boolean;
                type?: 'button' | 'submit' | 'reset';
            };
        }
    }
}
