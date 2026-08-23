/**
 * Canonical Craft CP connect bundle — icons, WCs, and document CSS.
 *
 * `pk-connect.css` is document-scoped (row layout + field modal lift + error dialog).
 * Lit `:host` rules in `pk-connect.styles.ts` mirror row layout as a bundled fallback.
 *
 * Consumer plugins add a thin Vite entry:
 * `import { registerCpConnectKit } from '@verbb/plugin-kit-web/connect/register-cp-connect.js';`
 * `void registerCpConnectKit();`
 */
import '@verbb/plugin-kit-web/plugin-kit.css';
import '@verbb/plugin-kit-web/styles/connect/pk-connect.css';

import { PkButton } from '../components/button/pk-button.js';
import { PkConnect } from '../components/connect/pk-connect.js';
import { PkConnectOauth } from '../components/connect/pk-connect-oauth.js';
import { PkDialog } from '../components/dialog/pk-dialog.js';
import { PkIcon } from '../components/icon/pk-icon.js';
import { PkStatus } from '../components/status/pk-status.js';

import {
    chevronRight,
    registerIcons,
    triangleExclamation,
    xmark,
} from '@verbb/plugin-kit-icons';

const CP_CONNECT_CTORS = [PkButton, PkConnect, PkConnectOauth, PkDialog, PkIcon, PkStatus] as const;

const CP_CONNECT_TAGS = [
    'pk-icon',
    'pk-button',
    'pk-connect',
    'pk-connect-oauth',
    'pk-dialog',
    'pk-status',
] as const;

/** Register connect row WCs + CSS for Craft CP source/integration edit screens. */
export async function registerCpConnectKit(): Promise<void> {
    registerIcons({
        chevronRight,
        triangleExclamation,
        xmark,
    });

    for (const Ctor of CP_CONNECT_CTORS) {
        if (typeof Ctor !== 'function') {
            throw new Error('Plugin Kit connect constructor missing from bundle');
        }
    }

    await Promise.all(CP_CONNECT_TAGS.map((tag) => customElements.whenDefined(tag)));
}
