import {
    buildCraftTextareaComparisonHtml,
    createComparisonLayout,
    createInputStateCell,
    createStateMatrixRow,
    textareaFieldStates,
} from '../../../catalog/data/comparison.js';
import { textareaPlaygroundSections } from '../../../catalog/data/meta-textarea.js';
import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

import {
    createPkInputGroup,
    createPkInputGroupAddon,
    createPkInputGroupButton,
    createPkInputGroupText,
    createPkInputGroupTextarea,
    createPkTextarea,
} from '../../dom.js';

/** Syncs the character-count readout after the textarea section mounts. */
export function initTextareaCharacterCount(root: HTMLElement): void {
    const textarea = root.querySelector<HTMLElement>('#textarea-char-count');
    const counter = root.querySelector<HTMLElement>('#textarea-char-count-value');

    if (!textarea || !counter || textarea.dataset.initialized) {
        return;
    }

    const maxLength = Number(textarea.getAttribute('max-length'))
        || textareaPlaygroundSections.characterCount.maxLength;

    const sync = (value?: string) => {
        const text = value ?? textarea.getAttribute('value') ?? '';
        counter.textContent = `${text.length}/${maxLength}`;
    };

    textarea.addEventListener('pk-input', (event) => {
        sync((event as CustomEvent<{ value: string }>).detail.value);
    });
    sync();
    textarea.dataset.initialized = 'true';
}

/** Web component previews — one function per section id from textareaPlaygroundSpec. */
export const textareaWebSectionRenderers: PlaygroundSectionRendererMap = {
    craftComparison(preview) {
        const pkRows = document.createElement('div');
        pkRows.className = 'cmp-rows';

        pkRows.append(
            createStateMatrixRow(
                'Field states',
                textareaFieldStates.map(({ label, placeholder, invalid, disabled, focus }) => createInputStateCell(
                    createPkTextarea({
                        placeholder,
                        invalid,
                        disabled,
                        state: focus ? 'focus-visible' : undefined,
                        style: { width: '9rem' },
                    }),
                    label,
                )),
                'stack',
            ),
        );

        const craftRows = document.createElement('div');
        craftRows.innerHTML = buildCraftTextareaComparisonHtml();

        preview.append(createComparisonLayout(pkRows, craftRows));
    },

    basicUsage(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createPkTextarea({ placeholder: textareaPlaygroundSections.basicUsage.placeholder }));
    },

    sizes(preview) {
        preview.classList.add('pg-demo-stack', 'pg-demo-narrow');
        preview.append(
            createPkTextarea({ placeholder: 'Default', size: 'default' }),
            createPkTextarea({ placeholder: 'Small', size: 'sm' }),
        );
    },

    widths(preview) {
        const { fullWidthPlaceholder, fixedWidthPlaceholder } = textareaPlaygroundSections.widths;
        preview.classList.add('pg-demo-stack');

        const fullWidth = document.createElement('div');
        fullWidth.className = 'pg-demo-narrow';
        fullWidth.append(createPkTextarea({ placeholder: fullWidthPlaceholder }));

        preview.append(
            fullWidth,
            createPkTextarea({
                placeholder: fixedWidthPlaceholder,
                style: { width: '320px' },
            }),
        );
    },

    validation(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createPkTextarea({
            placeholder: textareaPlaygroundSections.validation.placeholder,
            invalid: true,
        }));
    },

    disabled(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createPkTextarea({
            placeholder: textareaPlaygroundSections.disabled.placeholder,
            disabled: true,
        }));
    },

    resize(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createPkTextarea({ value: textareaPlaygroundSections.resize.value }));
    },

    characterCount(preview) {
        const { defaultValue, maxLength } = textareaPlaygroundSections.characterCount;
        const field = document.createElement('div');
        field.className = 'pg-field-stack pg-demo-narrow';
        field.append(
            createPkTextarea({
                id: 'textarea-char-count',
                value: defaultValue,
                maxLength,
            }),
        );

        const counter = document.createElement('p');
        counter.id = 'textarea-char-count-value';
        counter.className = 'pg-char-count';
        field.append(counter);
        preview.append(field);
    },

    inputGroup(preview) {
        const { placeholder, headerLabel, footerCount, footerAction } = textareaPlaygroundSections.inputGroup;
        preview.classList.add('pg-demo-stack', 'pg-demo-narrow');

        const withHeader = createPkInputGroup();
        withHeader.append(
            createPkInputGroupAddon({ align: 'block-start' }, createPkInputGroupText(headerLabel)),
            createPkInputGroupTextarea({ placeholder, rows: 4 }),
        );

        const withFooter = createPkInputGroup();
        const footer = document.createElement('div');
        footer.className = 'pg-input-group-block-footer';
        footer.append(
            createPkInputGroupText(footerCount),
            createPkInputGroupButton(footerAction),
        );
        withFooter.append(
            createPkInputGroupTextarea({ placeholder, rows: 4 }),
            createPkInputGroupAddon({ align: 'block-end' }, footer),
        );

        preview.append(withHeader, withFooter);
    },
};
