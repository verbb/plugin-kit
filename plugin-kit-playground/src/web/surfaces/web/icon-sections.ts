import {
    iconColorSwatches,
    iconCommonNames,
    iconGalleryNames,
    iconSizeScale,
} from '../../../catalog/data/meta-icon.js';
import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

import {
    createPkButton,
    createPkDropdownItem,
    createPkDropdownMenu,
} from '../../dom.js';

function createPkIcon(name: string, options: { label?: string; style?: string } = {}): HTMLElement {
    const icon = document.createElement('pk-icon');
    icon.setAttribute('name', name);

    if (options.label) {
        icon.setAttribute('label', options.label);
    }

    if (options.style) {
        icon.setAttribute('style', options.style);
    }

    return icon;
}

function createCodeBlock(code: string): HTMLElement {
    const pre = document.createElement('pre');
    pre.setAttribute('style', [
        'margin: 12px 0 0',
        'padding: 12px 14px',
        'background: #0f172a',
        'color: #e2e8f0',
        'border-radius: 8px',
        'font-size: 12.5px',
        'line-height: 1.6',
        'overflow: auto',
    ].join(';'));

    const el = document.createElement('code');
    el.textContent = code;
    pre.append(el);

    return pre;
}

function createIconTile(name: string): HTMLElement {
    const tile = document.createElement('button');
    tile.type = 'button';
    tile.title = `Copy <pk-icon name="${name}">`;
    tile.setAttribute('style', [
        'display: flex',
        'flex-direction: column',
        'align-items: center',
        'justify-content: center',
        'gap: 10px',
        'padding: 16px 8px',
        'border: 1px solid #e5e7eb',
        'border-radius: 10px',
        'background: #fff',
        'cursor: pointer',
        'font: inherit',
        'color: #374151',
        'transition: border-color 0.15s, box-shadow 0.15s',
    ].join(';'));

    tile.append(createPkIcon(name, { style: 'font-size: 22px' }));

    const label = document.createElement('code');
    label.textContent = name;
    label.setAttribute('style', 'font-size: 11.5px; color: #6b7280; word-break: break-word; text-align: center;');
    tile.append(label);

    tile.addEventListener('mouseenter', () => {
        tile.style.borderColor = '#94a3b8';
        tile.style.boxShadow = '0 1px 2px rgba(15, 23, 42, 0.08)';
    });
    tile.addEventListener('mouseleave', () => {
        tile.style.borderColor = '#e5e7eb';
        tile.style.boxShadow = 'none';
    });

    tile.addEventListener('click', () => {
        const snippet = `<pk-icon name="${name}"></pk-icon>`;
        void navigator.clipboard?.writeText(snippet);

        const previous = label.textContent;
        label.textContent = 'Copied!';
        label.style.color = '#10b981';

        window.setTimeout(() => {
            label.textContent = previous;
            label.style.color = '#6b7280';
        }, 1000);
    });

    return tile;
}

function createGrid(minWidth: number): HTMLElement {
    const grid = document.createElement('div');
    grid.setAttribute('style', [
        'display: grid',
        `grid-template-columns: repeat(auto-fill, minmax(${minWidth}px, 1fr))`,
        'gap: 12px',
        'width: 100%',
    ].join(';'));

    return grid;
}

/** Web component previews — one function per section id from iconPlaygroundSpec. */
export const iconWebSectionRenderers: PlaygroundSectionRendererMap = {
    common(preview) {
        const grid = createGrid(110);

        for (const name of iconCommonNames) {
            grid.append(createIconTile(name));
        }

        preview.append(grid, createCodeBlock('<pk-icon name="plus"></pk-icon>'));
    },

    sizing(preview) {
        const row = document.createElement('div');
        row.className = 'cmp-row-items';
        row.setAttribute('style', 'align-items: flex-end; gap: 24px;');

        for (const { label, size } of iconSizeScale) {
            const item = document.createElement('div');
            item.setAttribute('style', 'display: flex; flex-direction: column; align-items: center; gap: 8px;');
            item.append(createPkIcon('gear', { style: `font-size: ${size}px` }));

            const caption = document.createElement('span');
            caption.textContent = label;
            caption.setAttribute('style', 'font-size: 12px; color: #6b7280;');
            item.append(caption);

            row.append(item);
        }

        preview.append(row, createCodeBlock('<pk-icon name="gear" style="font-size: 32px"></pk-icon>'));
    },

    color(preview) {
        const row = document.createElement('div');
        row.className = 'cmp-row-items';
        row.setAttribute('style', 'gap: 24px;');

        for (const { label, color } of iconColorSwatches) {
            const item = document.createElement('div');
            item.setAttribute('style', 'display: flex; flex-direction: column; align-items: center; gap: 8px;');
            item.append(createPkIcon('triangle-exclamation', { style: `font-size: 26px; color: ${color}` }));

            const caption = document.createElement('span');
            caption.textContent = label;
            caption.setAttribute('style', 'font-size: 12px; color: #6b7280;');
            item.append(caption);

            row.append(item);
        }

        preview.append(row, createCodeBlock('<pk-icon name="triangle-exclamation" style="color: #ef4444"></pk-icon>'));
    },

    inContext(preview) {
        const row = document.createElement('div');
        row.className = 'cmp-row-items';
        row.setAttribute('style', 'gap: 16px; align-items: center;');

        row.append(createPkButton({
            label: 'Add a link',
            variant: 'dashed',
            startSlot: '<pk-icon name="plus"></pk-icon>',
        }));

        row.append(createPkButton({
            variant: 'transparent',
            ariaLabel: 'Settings',
            startSlot: '<pk-icon name="gear"></pk-icon>',
        }));

        const menu = createPkDropdownMenu(
            createPkButton({
                label: 'Actions',
                variant: 'default',
                withCaret: true,
            }),
            createPkDropdownItem({ label: 'Edit', prefixIcon: '<pk-icon name="pen"></pk-icon>' }),
            createPkDropdownItem({ label: 'Duplicate', prefixIcon: '<pk-icon name="copy"></pk-icon>' }),
            createPkDropdownItem({ label: 'Delete', destructive: true, prefixIcon: '<pk-icon name="trash"></pk-icon>' }),
        );
        menu.setAttribute('placement', 'bottom-start');
        row.append(menu);

        preview.append(row, createCodeBlock(
            [
                '<pk-button variant="dashed">',
                '  <pk-icon slot="start" name="plus"></pk-icon>',
                '  Add a link',
                '</pk-button>',
            ].join('\n'),
        ));
    },

    accessibility(preview) {
        const decorative = document.createElement('p');
        decorative.setAttribute('style', 'display: flex; align-items: center; gap: 10px; margin: 0;');
        decorative.append(createPkIcon('check', { style: 'font-size: 18px; color: #10b981' }));
        decorative.append(document.createTextNode('Decorative — hidden from screen readers (default).'));

        const labelled = document.createElement('p');
        labelled.setAttribute('style', 'display: flex; align-items: center; gap: 10px; margin: 12px 0 0;');
        labelled.append(createPkIcon('trash', { label: 'Delete', style: 'font-size: 18px; color: #ef4444' }));
        labelled.append(document.createTextNode('Meaningful — exposed as an image titled “Delete”.'));

        preview.append(decorative, labelled, createCodeBlock('<pk-icon name="trash" label="Delete"></pk-icon>'));
    },

    gallery(preview) {
        const grid = createGrid(120);

        for (const name of iconGalleryNames) {
            grid.append(createIconTile(name));
        }

        preview.append(grid);
    },
};
