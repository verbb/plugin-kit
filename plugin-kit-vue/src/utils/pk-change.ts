/** Read `{ checked }` from a `pk-change` event dispatched by boolean controls. */
export function readPkCheckedDetail(event: Event): boolean {
    return Boolean((event as CustomEvent<{ checked?: boolean }>).detail?.checked);
}

/** Read `{ value }` from a `pk-change` event dispatched by value controls. */
export function readPkValueDetail(event: Event): string {
    return (event as CustomEvent<{ value?: string }>).detail?.value ?? '';
}
