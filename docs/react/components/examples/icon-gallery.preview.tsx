import { useState } from 'react';
import { icons } from '@verbb/plugin-kit-icons';
import { Icon } from '@verbb/plugin-kit-react/components';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const camelToKebab = (value: string): string => {
    return value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};

/** Canonical kebab-case names from the bundled set — same source as the Web gallery. */
const galleryNames = Object.keys(icons)
    .map(camelToKebab)
    .sort();

function IconGalleryTile({ name }: { name: string }) {
    const [copied, setCopied] = useState(false);

    const copy = () => {
        void navigator.clipboard?.writeText(`<Icon icon="${name}" />`);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1000);
    };

    return (
        <button
            type="button"
            data-icon-name={name}
            title={`Copy <Icon icon="${name}" />`}
            data-copied={copied ? '' : undefined}
            onClick={copy}
        >
            <Icon icon={name} style={{ fontSize: 22 }} aria-hidden="true" />
            <code>{copied ? 'Copied!' : name}</code>
        </button>
    );
}

// #region example
export function IconGalleryExample() {
    return (
        <div data-pk-icon-gallery>
            {galleryNames.map((name) => (
                <IconGalleryTile key={name} name={name} />
            ))}
        </div>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Gallery',
    title: 'Bundled icon gallery',
    language: 'tsx',
    source: true,
    // Short snippet in the code panel — the live preview lists every bundled icon.
    code: '<Icon icon="plus" />',
    render: () => <IconGalleryExample />,
};

export default preview;
