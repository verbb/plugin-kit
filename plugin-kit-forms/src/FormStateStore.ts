import { get, set } from 'lodash-es';

type FormSubscriber = () => void;

export type FormState = {
    values: Record<string, unknown>;
    errors: Record<string, string[]>;
    touched: Set<string>;
    dirty: Set<string>;
};

export class FormStateStore {
    state: FormState;

    private listeners: Set<FormSubscriber> = new Set();

    private initialValues: Record<string, unknown>;

    constructor(initialValues: Record<string, unknown> = {}) {
        this.initialValues = { ...initialValues };
        this.state = {
            values: { ...initialValues },
            errors: {},
            touched: new Set(),
            dirty: new Set(),
        };
    }

    subscribe(listener: FormSubscriber): () => void {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    }

    notify() {
        this.listeners.forEach((listener) => { listener(); });
    }

    getValue(path: string): unknown {
        return get(this.state.values, path);
    }

    setValue(path: string, value: unknown) {
        const nextErrors = { ...this.state.errors };
        if (path in nextErrors) {
            delete nextErrors[path];
        }
        // When replacing an array (e.g. options), clear errors for descendant paths
        // so indices stay in sync after add/remove/reorder
        if (Array.isArray(value)) {
            const descendantPrefix = `${path}.`;
            Object.keys(nextErrors).forEach((key) => {
                if (key.startsWith(descendantPrefix)) {
                    delete nextErrors[key];
                }
            });
        }

        this.state = {
            ...this.state,
            values: (() => {
                const cloneRoot: Record<string, unknown> = Array.isArray(this.state.values)
                    ? ([...this.state.values] as unknown as Record<string, unknown>)
                    : { ...(this.state.values ?? {}) };
                set(cloneRoot, path, value);
                return cloneRoot;
            })(),
            dirty: new Set(this.state.dirty).add(path),
            errors: nextErrors,
        };
        this.notify();
    }

    setValues(values: Record<string, unknown>) {
        this.state = {
            ...this.state,
            values: { ...values },
        };
        this.notify();
    }

    setErrors(errors: Record<string, string[]>) {
        this.state = {
            ...this.state,
            errors: { ...errors },
        };
        this.notify();
    }

    clearErrors() {
        this.state = {
            ...this.state,
            errors: {},
        };
        this.notify();
    }

    setTouched(path: string, touched = true) {
        const currentlyTouched = this.state.touched.has(path);
        if (currentlyTouched === touched) {
            return;
        }

        const nextTouched = new Set(this.state.touched);
        if (touched) {
            nextTouched.add(path);
        } else {
            nextTouched.delete(path);
        }

        this.state = {
            ...this.state,
            touched: nextTouched,
        };
        this.notify();
    }

    reset(values: Record<string, unknown> = this.initialValues) {
        this.initialValues = { ...values };
        this.state = {
            values: { ...values },
            errors: {},
            touched: new Set(),
            dirty: new Set(),
        };
        this.notify();
    }
}
