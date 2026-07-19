import type { CSSProperties, ReactNode } from 'react';

export function slugify(label: string): string {
    return label.replace(/\s+/g, '-').toLowerCase();
}

export function DemoValueReadout({ value, prefix = 'Value' }: { value: string; prefix?: string }) {
    return (
        <div
            className="pg-demo-output"
            style={{ fontSize: '11px', color: 'var(--pk-color-gray-500)' }}
        >
            {prefix}: <code>{value || '(empty)'}</code>
        </div>
    );
}

export function ComparisonRow({ heading, children, layout = 'row' }: {
    heading: string;
    children: ReactNode;
    layout?: 'row' | 'stack';
}) {
    return (
        <div className="cmp-row">
            <h3 className="cmp-row-heading">{heading}</h3>
            <div className={layout === 'stack' ? 'cmp-row-items cmp-row-items--state-matrix' : 'cmp-row-items'}>
                {children}
            </div>
        </div>
    );
}

export function StateMatrixCell({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div className="cmp-state-cell">
            {children}
            <span className="cmp-state-cell__label">{label}</span>
        </div>
    );
}

export const codeBlockStyle: CSSProperties = {
    margin: '12px 0 0',
    padding: '12px 14px',
    background: '#0f172a',
    color: '#e2e8f0',
    borderRadius: 8,
    fontSize: 12.5,
    lineHeight: 1.6,
    overflow: 'auto',
};

export function CodeBlock({ children }: { children: string }) {
    return (
        <pre style={codeBlockStyle}>
            <code>{children}</code>
        </pre>
    );
}

export function gridStyle(minWidth: number): CSSProperties {
    return {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}px, 1fr))`,
        gap: 12,
        width: '100%',
    };
}
