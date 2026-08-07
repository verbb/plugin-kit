import { PkButtonVariant } from '@verbb/plugin-kit-web/components/button/pk-button.js';
import { ReactNode } from 'react';
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
/**
 * Centered empty / error / success / info surface for full React CP apps.
 * Hosts must register any icons they render (error uses `triangle-exclamation`).
 */
export declare function StatePanel({ variant, icon, title, message, primaryAction, secondaryAction, children, containerClassName, contentClassName, titleClassName, messageClassName, showIcon, }: StatePanelProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=StatePanel.d.ts.map