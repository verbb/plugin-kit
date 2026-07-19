import { useState, type CSSProperties } from 'react';
import {
    iconColorSwatches,
    iconCommonNames,
    iconGalleryNames,
    iconSizeScale,
} from '@verbb/plugin-kit-playground';

import { Button } from '@verbb/plugin-kit-react/components';
import { DropdownItem } from '@verbb/plugin-kit-react/components';
import { DropdownMenu } from '@verbb/plugin-kit-react/components';
import { Icon } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';
import { CodeBlock, gridStyle } from './shared/sectionHelpers.js';

const captionStyle: CSSProperties = { fontSize: 12, color: '#6b7280' };

function IconTile({ name }: { name: string }) {
    const [copied, setCopied] = useState(false);

    const copy = () => {
        void navigator.clipboard?.writeText(`<pk-icon icon="${name}"></pk-icon>`);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1000);
    };

    return (
        <button
            type="button"
            title={`Copy <pk-icon icon="${name}">`}
            onClick={copy}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                padding: '16px 8px',
                border: '1px solid #e5e7eb',
                borderRadius: 10,
                background: '#fff',
                cursor: 'pointer',
                font: 'inherit',
                color: '#374151',
            }}
        >
            <Icon icon={name} style={{ fontSize: 22 }} />
            <code
                style={{
                    fontSize: 11.5,
                    color: copied ? '#10b981' : '#6b7280',
                    wordBreak: 'break-word',
                    textAlign: 'center',
                }}
            >
                {copied ? 'Copied!' : name}
            </code>
        </button>
    );
}

/** React previews — one function per section id from iconPlaygroundSpec. */
export const iconReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    common: () => (
        <>
            <div style={gridStyle(110)}>
                {iconCommonNames.map((name) => (
                    <IconTile key={name} name={name} />
                ))}
            </div>
            <CodeBlock>{'<Icon icon="plus" />'}</CodeBlock>
        </>
    ),

    sizing: () => (
        <>
            <div className="cmp-row-items" style={{ alignItems: 'flex-end', gap: 24 }}>
                {iconSizeScale.map(({ label, size }) => (
                    <div
                        key={size}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
                    >
                        <Icon icon="gear" style={{ fontSize: size }} />
                        <span style={captionStyle}>{label}</span>
                    </div>
                ))}
            </div>
            <CodeBlock>{'<Icon icon="gear" style={{ fontSize: 32 }} />'}</CodeBlock>
        </>
    ),

    color: () => (
        <>
            <div className="cmp-row-items" style={{ gap: 24 }}>
                {iconColorSwatches.map(({ label, color }) => (
                    <div
                        key={label}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
                    >
                        <Icon icon="triangle-exclamation" style={{ fontSize: 26, color }} />
                        <span style={captionStyle}>{label}</span>
                    </div>
                ))}
            </div>
            <CodeBlock>{'<Icon icon="triangle-exclamation" style={{ color: "#ef4444" }} />'}</CodeBlock>
        </>
    ),

    inContext: () => (
        <>
            <div className="cmp-row-items" style={{ gap: 16, alignItems: 'center' }}>
                <Button variant="dashed">
                    <Icon slot="start" icon="plus" />
                    Add a link
                </Button>
                <Button variant="transparent" aria-label="Settings">
                    <Icon slot="start" icon="gear" />
                </Button>
                <DropdownMenu placement="bottom-start">
                    <Button slot="trigger" withCaret>Actions</Button>
                    <DropdownItem value="edit">
                        <Icon slot="prefix" icon="pen" />
                        Edit
                    </DropdownItem>
                    <DropdownItem value="duplicate">
                        <Icon slot="prefix" icon="copy" />
                        Duplicate
                    </DropdownItem>
                    <DropdownItem value="delete" destructive>
                        <Icon slot="prefix" icon="trash" />
                        Delete
                    </DropdownItem>
                </DropdownMenu>
            </div>
            <CodeBlock>{'<Button variant="dashed">\n  <Icon slot="start" icon="plus" />\n  Add a link\n</Button>'}</CodeBlock>
        </>
    ),

    accessibility: () => (
        <>
            <p style={{ display: 'flex', alignItems: 'center', gap: 10, margin: 0 }}>
                <Icon icon="check" style={{ fontSize: 18, color: '#10b981' }} />
                Decorative — hidden from screen readers (default).
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '12px 0 0' }}>
                <Icon icon="trash" label="Delete" style={{ fontSize: 18, color: '#ef4444' }} />
                Meaningful — exposed as an image titled “Delete”.
            </p>
            <CodeBlock>{'<Icon icon="trash" label="Delete" />'}</CodeBlock>
        </>
    ),

    gallery: () => (
        <div style={gridStyle(120)}>
            {iconGalleryNames.map((name) => (
                <IconTile key={name} name={name} />
            ))}
        </div>
    ),
};
