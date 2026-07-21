import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

type ColorInputElement = HTMLElement & { value: string };

function createPkColorInput(options: {
    value?: string;
    size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
    invalid?: boolean;
    readonly?: boolean;
    disabled?: boolean;
} = {}): ColorInputElement {
    const input = document.createElement('pk-color-input') as ColorInputElement;

    if (options.value) {
        input.setAttribute('value', options.value);
    }

    if (options.size) {
        input.setAttribute('size', options.size);
    }

    if (options.invalid) {
        input.setAttribute('invalid', '');
    }

    if (options.readonly) {
        input.setAttribute('readonly', '');
    }

    if (options.disabled) {
        input.setAttribute('disabled', '');
    }

    return input;
}

function createValueReadout(input: ColorInputElement): HTMLElement {
    const output = document.createElement('div');
    output.className = 'pg-demo-output';
    output.style.fontSize = '11px';
    output.style.color = 'var(--pk-color-gray-500)';

    const sync = (): void => {
        output.innerHTML = `Value: <code>${input.getAttribute('value') || '(empty)'}</code>`;
    };

    input.addEventListener('pk-change', (event) => {
        input.setAttribute('value', (event as CustomEvent<{ value: string }>).detail.value);
        sync();
    });

    sync();
    return output;
}

function createStatefulDemo(
    options: Parameters<typeof createPkColorInput>[0],
    { showValue = true }: { showValue?: boolean } = {},
): HTMLElement {
    const stack = document.createElement('div');
    stack.style.display = 'flex';
    stack.style.flexDirection = 'column';
    stack.style.gap = '0.25rem';

    const input = createPkColorInput(options);
    stack.append(input);

    if (showValue) {
        stack.append(createValueReadout(input));
    }

    return stack;
}

/** Web component previews — one function per section id from colorInputPlaygroundSpec. */
export const colorInputWebSectionRenderers: PlaygroundSectionRendererMap = {
    basic(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createStatefulDemo({ value: '#35e533' }));
    },

    resolved(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.style.gap = '1rem';

        for (const demo of [
            { value: '' },
            { value: '#a9' },
            { value: '#9c4' },
            { value: '#35e533' },
            { value: '#35e533', invalid: true },
            { value: '#35e533', disabled: true },
        ]) {
            preview.append(createStatefulDemo(demo));
        }
    },

    sizes(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.style.gap = '0.75rem';

        for (const size of ['xs', 'sm', 'default', 'lg'] as const) {
            const row = document.createElement('div');
            row.style.display = 'flex';
            row.style.alignItems = 'center';
            row.style.gap = '1rem';

            const label = document.createElement('span');
            label.textContent = size;
            label.style.flexShrink = '0';
            label.style.width = '4rem';
            label.style.fontSize = '12px';
            label.style.color = 'var(--pk-color-gray-500)';

            row.append(label, createStatefulDemo({ value: '#35e533', size }));
            preview.append(row);
        }
    },

    states(preview) {
        const row = document.createElement('div');
        row.className = 'pg-card__inner--row';

        row.append(
            createStatefulDemo({ value: '#e64d4c' }, { showValue: false }),
            createPkColorInput({ value: '#ff', invalid: true }),
            createPkColorInput({ value: '#64748b', readonly: true }),
            createPkColorInput({ value: '#64748b', disabled: true }),
        );

        preview.append(row);
    },
};
