import {
    buildCraftInputComparisonHtml,
    createComparisonLayout,
    createInputStateCell,
    createStateMatrixRow,
    inputFieldStates,
    inputMatrixSizes,
} from '../../../catalog/data/comparison.js';
import { inputPlaygroundSections } from '../../../catalog/data/meta-input.js';
import { playgroundIconSearch } from '../../../catalog/data/icons.js';
import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

import {
    createPkInput,
    createPkInputGroup,
    createPkInputGroupAddon,
    createPkInputGroupButton,
    createPkInputGroupInput,
    createPkInputGroupText,
} from '../../dom.js';

function appendIconAddon(addon: HTMLElement, iconHtml: string): void {
    const template = document.createElement('template');
    template.innerHTML = iconHtml.trim();
    const icon = template.content.firstElementChild;

    if (icon) {
        icon.setAttribute('aria-hidden', 'true');
        addon.append(icon);
    }
}

/** Web component previews — one function per section id from inputPlaygroundSpec. */
export const inputWebSectionRenderers: PlaygroundSectionRendererMap = {
    craftComparison(preview) {
        const pkRows = document.createElement('div');
        pkRows.className = 'cmp-rows';

        pkRows.append(
            createStateMatrixRow(
                'Field states',
                inputFieldStates.map(({ label, placeholder, invalid, disabled, focus }) => createInputStateCell(
                    createPkInput({
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
        craftRows.innerHTML = buildCraftInputComparisonHtml();

        preview.append(createComparisonLayout(pkRows, craftRows));
    },

    basicUsage(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createPkInput({ placeholder: inputPlaygroundSections.basicUsage.placeholder }));
    },

    sizes(preview) {
        const stack = document.createElement('div');
        stack.className = 'pg-demo-stack pg-demo-narrow';
        stack.append(
            ...inputMatrixSizes.map(({ label, size }) => createPkInput({ placeholder: label, size })),
        );
        preview.append(stack);
    },

    widths(preview) {
        const stack = document.createElement('div');
        stack.className = 'pg-demo-stack';
        const fullWrap = document.createElement('div');
        fullWrap.className = 'pg-demo-narrow';
        fullWrap.append(createPkInput({ placeholder: inputPlaygroundSections.widths.fullWidthPlaceholder }));
        stack.append(
            fullWrap,
            createPkInput({
                placeholder: inputPlaygroundSections.widths.fixedWidthPlaceholder,
                style: { width: '320px' },
            }),
        );
        preview.append(stack);
    },

    inputGroup(preview) {
        const stack = document.createElement('div');
        stack.className = 'pg-demo-stack pg-demo-narrow';

        const searchGroup = createPkInputGroup();
        const searchAddon = createPkInputGroupAddon();
        appendIconAddon(searchAddon, playgroundIconSearch);
        searchGroup.append(
            createPkInputGroupInput({ placeholder: inputPlaygroundSections.inputGroupIcon.placeholder }),
            searchAddon,
        );

        stack.append(searchGroup);
        preview.append(stack);
    },

    inputGroupIcon(preview) {
        const stack = document.createElement('div');
        stack.className = 'pg-demo-stack pg-demo-narrow';
        const { placeholder } = inputPlaygroundSections.inputGroupIcon;

        const startIcon = createPkInputGroup();
        const startAddon = createPkInputGroupAddon();
        appendIconAddon(startAddon, playgroundIconSearch);
        startIcon.append(
            createPkInputGroupInput({ placeholder }),
            startAddon,
        );

        const endIcon = createPkInputGroup();
        const endAddon = createPkInputGroupAddon({ align: 'inline-end' });
        appendIconAddon(endAddon, playgroundIconSearch);
        endIcon.append(
            createPkInputGroupInput({ placeholder }),
            endAddon,
        );

        stack.append(startIcon, endIcon);
        preview.append(stack);
    },

    inputGroupText(preview) {
        const stack = document.createElement('div');
        stack.className = 'pg-demo-stack pg-demo-narrow';
        const {
            currencyPlaceholder,
            urlPlaceholder,
            emailPlaceholder,
            charsLeft,
        } = inputPlaygroundSections.inputGroupText;

        const currency = createPkInputGroup();
        currency.append(
            createPkInputGroupInput({ placeholder: currencyPlaceholder }),
            createPkInputGroupAddon({ align: 'inline-start' }, createPkInputGroupText('$')),
            createPkInputGroupAddon({ align: 'inline-end' }, createPkInputGroupText('USD')),
        );

        const url = createPkInputGroup();
        url.append(
            createPkInputGroupInput({ placeholder: urlPlaceholder }),
            createPkInputGroupAddon({ align: 'inline-start' }, createPkInputGroupText('https://')),
            createPkInputGroupAddon({ align: 'inline-end' }, createPkInputGroupText('.com')),
        );

        const email = createPkInputGroup();
        email.append(
            createPkInputGroupInput({ placeholder: emailPlaceholder, type: 'email' }),
            createPkInputGroupAddon({ align: 'inline-end' }, createPkInputGroupText('@company.com')),
        );

        const chars = createPkInputGroup();
        chars.append(
            createPkInputGroupInput({ placeholder: 'Bio' }),
            createPkInputGroupAddon({ align: 'inline-end' }, createPkInputGroupText(charsLeft)),
        );

        stack.append(currency, url, email, chars);
        preview.append(stack);
    },

    inputGroupButton(preview) {
        preview.classList.add('pg-demo-narrow');
        const { urlPlaceholder, buttonLabel } = inputPlaygroundSections.inputGroupButton;

        const urlSearch = createPkInputGroup();
        urlSearch.append(
            createPkInputGroupInput({ placeholder: urlPlaceholder }),
            createPkInputGroupAddon({ align: 'inline-start' }, createPkInputGroupText('https://')),
            createPkInputGroupAddon({ align: 'inline-end' }, createPkInputGroupButton(buttonLabel)),
        );

        preview.append(urlSearch);
    },

    validation(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createPkInput({
            placeholder: inputPlaygroundSections.validation.placeholder,
            invalid: true,
        }));
    },

    disabled(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createPkInput({
            placeholder: inputPlaygroundSections.disabled.placeholder,
            disabled: true,
        }));
    },
};
