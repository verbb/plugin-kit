/**
 * Build props that only forward `true` boolean values to @lit/react wrappers.
 *
 * Form-associated custom elements reflect boolean properties to attributes.
 * Passing e.g. `disabled={undefined}` through createComponent can leave `disabled=""`
 * on the element instead of clearing it. Omitting the prop preserves the CE default.
 */
export declare function trueBooleanProps<K extends string>(keys: readonly K[], values: Partial<Record<K, boolean | undefined>>): Partial<Record<K, true>>;
//# sourceMappingURL=lit-react-booleans.d.ts.map