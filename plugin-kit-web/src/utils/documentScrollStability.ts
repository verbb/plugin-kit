/**
 * @deprecated No-op. Permanent `html { scrollbar-gutter: stable }` was removed —
 * it reserved an empty scrollbar strip on every Craft CP page. Overlay scroll lock
 * compensates only while locked (see a11y/scroll-lock.ts).
 */
export const ensureDocumentScrollStability = (): void => {
    // Intentionally empty — kept so older configurePluginKitWeb call sites stay safe.
};
