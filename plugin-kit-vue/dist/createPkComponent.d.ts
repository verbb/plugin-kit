/**
 * Minimal Vue facade over a registered `<pk-*>` custom element.
 * Props and listeners pass through; default slot children are distributed with slot attributes.
 */
export declare function createPkComponent(options: {
    name: string;
    tagName: string;
}): import('vue').DefineComponent<{}, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
/** Turn `pk-date-picker` → `PkDatePicker` for consistent facade names. */
export declare function pkTagToComponentName(tagName: string): string;
/** Batch-create pass-through facades for a tag → export name map. */
export declare function createPkComponentFamily(family: Record<string, string>): Record<string, import('vue').DefineComponent<{}, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>>;
//# sourceMappingURL=createPkComponent.d.ts.map