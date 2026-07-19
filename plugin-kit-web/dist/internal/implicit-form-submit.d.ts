/** Dispatched on the schema <form>; SchemaFormEngine calls handleSubmit(). */
declare const PK_IMPLICIT_SUBMIT_EVENT = "pk-implicit-submit";
type ImplicitSubmitHost = HTMLElement & {
    form: HTMLFormElement | null;
    disabled?: boolean;
    readonly?: boolean;
};
declare const shouldRequestFormSubmitOnEnter: (event: KeyboardEvent, inputType: string | null | undefined) => boolean;
/**
 * Call from a shadow `<input>` keydown handler on a form-associated host.
 * Returns true when submit was requested.
 */
declare const requestAssociatedFormSubmitOnEnter: (host: ImplicitSubmitHost, event: KeyboardEvent, inputType?: string | null) => boolean;
export { PK_IMPLICIT_SUBMIT_EVENT, requestAssociatedFormSubmitOnEnter, shouldRequestFormSubmitOnEnter, };
//# sourceMappingURL=implicit-form-submit.d.ts.map