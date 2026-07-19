import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

type CalendarElement = HTMLElement & {
    value: string;
    withOutsideDays?: boolean;
};

function kebabToProp(name: string): string {
    return name.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());
}

function createPkCalendar(options: Record<string, string | boolean | undefined> = {}): CalendarElement {
    const picker = document.createElement('pk-calendar') as CalendarElement;

    for (const [key, val] of Object.entries(options)) {
        if (val === true) {
            picker.setAttribute(key, '');
        } else if (val === false) {
            const prop = kebabToProp(key);

            if (prop in picker) {
                (picker as Record<string, unknown>)[prop] = false;
            } else {
                picker.setAttribute(key, 'false');
            }
        } else if (val !== undefined) {
            picker.setAttribute(key, String(val));
        }
    }

    return picker;
}

function createValueReadout(picker: CalendarElement): HTMLElement {
    const output = document.createElement('div');
    output.className = 'pg-demo-output';
    output.style.fontSize = '11px';
    output.style.color = 'var(--pk-color-gray-500)';

    const sync = (): void => {
        output.innerHTML = `Value: <code>${picker.value || '(empty)'}</code>`;
    };

    picker.addEventListener('change', sync);
    sync();

    return output;
}

function createLabeledDemo(
    caption: string,
    options: Record<string, string | boolean | undefined> = {},
): HTMLElement {
    const stack = document.createElement('div');
    stack.style.display = 'flex';
    stack.style.flexDirection = 'column';
    stack.style.gap = '0.25rem';

    const label = document.createElement('div');
    label.className = 'pg-spinner-size-label';
    label.textContent = caption;

    const picker = createPkCalendar(options);
    stack.append(label, picker, createValueReadout(picker));

    return stack;
}

function appendCalendarDemo(
    preview: HTMLElement,
    options: Record<string, string | boolean | undefined>,
): void {
    const picker = createPkCalendar(options);
    preview.append(picker, createValueReadout(picker));
}

/** Web component previews — one function per section id from calendarPlaygroundSpec. */
export const calendarWebSectionRenderers: PlaygroundSectionRendererMap = {
    basic(preview) {
        preview.classList.add('pg-demo-narrow');
        appendCalendarDemo(preview, { value: '2026-05-11' });
    },

    constraints(preview) {
        preview.classList.add('pg-demo-narrow');
        appendCalendarDemo(preview, {
            value: '2026-05-15',
            min: '2026-05-08',
            max: '2026-05-22',
        });
    },

    range(preview) {
        preview.classList.add('pg-demo-narrow');
        appendCalendarDemo(preview, {
            mode: 'range',
            value: '2026-05-11/2026-05-18',
        });
    },

    dualMonth(preview) {
        preview.style.overflowX = 'auto';
        appendCalendarDemo(preview, {
            mode: 'range',
            months: '2',
            value: '2026-05-11/2026-05-25',
        });
    },

    weekNumbers(preview) {
        preview.classList.add('pg-demo-narrow');
        appendCalendarDemo(preview, {
            value: '2026-05-11',
            'with-week-numbers': true,
        });
    },

    viewStepper(preview) {
        preview.classList.add('pg-demo-narrow');

        const hint = document.createElement('p');
        hint.style.fontSize = '11px';
        hint.style.color = 'var(--pk-color-gray-500)';
        hint.style.margin = '0';
        hint.textContent = 'Click the month/year title to step into month and year views.';

        preview.append(hint);
        appendCalendarDemo(preview, { value: '2026-05-11' });
    },

    disablePastFuture(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.style.gap = '1rem';
        preview.style.display = 'flex';
        preview.style.flexDirection = 'column';

        preview.append(
            createLabeledDemo('disable-past — today is 15 May 2026', {
                today: '2026-05-15',
                value: '2026-05-20',
                'disable-past': true,
            }),
            createLabeledDemo('disable-future — today is 15 May 2026', {
                today: '2026-05-15',
                value: '2026-05-10',
                'disable-future': true,
            }),
        );
    },

    disabledDaysOfWeek(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.append(createLabeledDemo('disabled-days-of-week="sat sun"', {
            value: '2026-05-16',
            'disabled-days-of-week': 'sat sun',
        }));
    },

    firstDayOfWeek(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.style.gap = '1rem';
        preview.style.display = 'flex';
        preview.style.flexDirection = 'column';

        preview.append(
            createLabeledDemo('first-day-of-week="auto" (locale default)', {
                value: '2026-05-11',
            }),
            createLabeledDemo('first-day-of-week="mon"', {
                value: '2026-05-11',
                'first-day-of-week': 'mon',
            }),
        );
    },

    weekdayFormat(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.style.gap = '1rem';
        preview.style.display = 'flex';
        preview.style.flexDirection = 'column';

        preview.append(
            createLabeledDemo('weekday-format="narrow" (default)', {
                value: '2026-05-11',
                'weekday-format': 'narrow',
            }),
            createLabeledDemo('weekday-format="short"', {
                value: '2026-05-11',
                'weekday-format': 'short',
            }),
            createLabeledDemo('weekday-format="long"', {
                value: '2026-05-11',
                'weekday-format': 'long',
            }),
        );
    },

    outsideDays(preview) {
        preview.classList.add('pg-demo-narrow');
        preview.style.gap = '1rem';
        preview.style.display = 'flex';
        preview.style.flexDirection = 'column';

        preview.append(
            createLabeledDemo('with-outside-days (default)', {
                value: '2026-05-11',
                'with-outside-days': true,
            }),
            createLabeledDemo('without outside days', {
                value: '2026-05-11',
                'with-outside-days': false,
            }),
        );
    },
};
