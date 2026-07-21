/** Shared date-picker demo helpers for playground sections and date-time picker demo. */

export type DatePickerElement = HTMLElement & {
    value: string;
    withOutsideDays?: boolean;
    isDateDisabled?: (date: Date) => boolean;
};

function kebabToProp(name: string): string {
    return name.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());
}

export function createPkDatePicker(options: {
    value?: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    'with-clear'?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    min?: string;
    max?: string;
    'disable-past'?: boolean;
    'disable-future'?: boolean;
    'disabled-days-of-week'?: string;
    'first-day-of-week'?: string;
    'weekday-format'?: string;
    'with-outside-days'?: boolean;
    mode?: 'single' | 'range' | 'multiple';
    months?: string;
} = {}): DatePickerElement {
    const input = document.createElement('pk-date-picker') as DatePickerElement;

    for (const [key, val] of Object.entries(options)) {
        if (val === true) {
            input.setAttribute(key, '');
        } else if (val === false) {
            const prop = kebabToProp(key);

            if (prop in input) {
                (input as Record<string, unknown>)[prop] = false;
            } else {
                input.setAttribute(key, 'false');
            }
        } else if (val !== undefined) {
            input.setAttribute(key, String(val));
        }
    }

    return input;
}

export function createValueReadout(input: DatePickerElement): HTMLElement {
    const output = document.createElement('div');
    output.className = 'pg-demo-output';
    output.style.fontSize = '11px';
    output.style.color = 'var(--pk-color-gray-500)';

    const sync = (): void => {
        output.innerHTML = `Value: <code>${input.value || '(empty)'}</code>`;
    };

    input.addEventListener('change', sync);
    sync();

    return output;
}

export function createStatefulDemo(
    options: Parameters<typeof createPkDatePicker>[0],
): HTMLElement {
    const stack = document.createElement('div');
    stack.style.display = 'flex';
    stack.style.flexDirection = 'column';
    stack.style.gap = '0.25rem';

    const input = createPkDatePicker(options);
    stack.append(input, createValueReadout(input));

    return stack;
}
