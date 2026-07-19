/**
 * No-build loader entry for `pk-icon`.
 * Registers the full curated set so Twig markup works without a bundler opt-in list.
 * Bundler consumers should import `pk-icon` / `components/icon.js` and register only what they use.
 */
import '@verbb/plugin-kit-icons/all.js';
import './pk-icon.js';
