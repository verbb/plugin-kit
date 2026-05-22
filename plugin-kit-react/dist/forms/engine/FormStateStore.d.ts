type FormSubscriber = () => void;
export type FormState = {
    values: Record<string, unknown>;
    errors: Record<string, string[]>;
    touched: Set<string>;
    dirty: Set<string>;
};
export declare class FormStateStore {
    state: FormState;
    private listeners;
    private initialValues;
    constructor(initialValues?: Record<string, unknown>);
    subscribe(listener: FormSubscriber): () => void;
    notify(): void;
    getValue(path: string): unknown;
    setValue(path: string, value: unknown): void;
    setValues(values: Record<string, unknown>): void;
    setErrors(errors: Record<string, string[]>): void;
    clearErrors(): void;
    setTouched(path: string, touched?: boolean): void;
    reset(values?: Record<string, unknown>): void;
}
export {};
//# sourceMappingURL=FormStateStore.d.ts.map