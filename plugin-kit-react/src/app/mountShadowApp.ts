/**
 * Re-export the framework-agnostic helper from `@verbb/plugin-kit-web`.
 * Prefer importing from `@verbb/plugin-kit-react` / `/utils` in app code.
 */
export {
    mountShadowApp,
    type MountShadowAppOptions,
    type ShadowAppMount,
} from '@verbb/plugin-kit-web/plugin-kit';
