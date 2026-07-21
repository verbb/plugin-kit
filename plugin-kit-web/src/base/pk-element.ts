import { LitElement } from 'lit';

import { adoptStyles } from './styles.js';
import { shadowResetStyles } from './shadow-reset.styles.js';

export type PkElementErrorDetail = {
    tagName: string;
    message: string;
    stack?: string;
};

declare global {
    interface GlobalEventHandlersEventMap {
        'pk-error': CustomEvent<PkElementErrorDetail>;
    }
}

/**
 * Base class for Plugin Kit web components.
 * Open shadow root; Lit adopts constructable stylesheets where supported.
 *
 * `performUpdate` is wrapped so a single control failure degrades inline instead of
 * taking down the whole CP surface (React error boundaries do not see Lit throws).
 */
export class PkElement extends LitElement {
    static override shadowRootOptions: ShadowRootInit = {
        mode: 'open',
        delegatesFocus: true,
    };

    /** When set, subclasses should skip normal render — base shows a minimal error shell. */
    protected pkRenderFailed = false;

    override connectedCallback(): void {
        super.connectedCallback();
        // Host marker for document/shadow peers (e.g. Tailwind preflight). Must not set
        // attributes in the constructor — CE rules forbid that on createElement().
        if (!this.hasAttribute('data-pk')) {
            this.setAttribute('data-pk', '');
        }
    }

    override createRenderRoot(): HTMLElement | DocumentFragment {
        const root = super.createRenderRoot();
        adoptStyles(root as ShadowRoot, [shadowResetStyles], 'pk-shadow-reset');
        return root;
    }

    override performUpdate(): void {
        if (this.pkRenderFailed) {
            return;
        }

        try {
            const result = super.performUpdate();

            // Lit deprecates returning a Promise from performUpdate — handle async render
            // failures without making this override async (avoids dev-mode update-queue bugs).
            // Lit may return void; keep a Promise guard for older async performUpdate paths.
            if ((result as unknown) instanceof Promise) {
                void (result as unknown as Promise<unknown>).catch((error: unknown) => {
                    this.handleRenderFailure(error);
                });
            }
        } catch (error) {
            this.handleRenderFailure(error);
        }
    }

    protected handleRenderFailure(error: unknown): void {
        const err = error instanceof Error ? error : new Error(String(error));
        this.pkRenderFailed = true;

        this.dispatchEvent(
            new CustomEvent<PkElementErrorDetail>('pk-error', {
                detail: {
                    tagName: this.localName || this.tagName.toLowerCase(),
                    message: err.message,
                    stack: err.stack,
                },
                bubbles: true,
                composed: true,
            }),
        );

        // Last-resort inline fallback — plain DOM so we do not recurse through Lit render().
        try {
            const root = this.renderRoot as ShadowRoot | HTMLElement | undefined;

            if (root) {
                root.textContent = '';
                const shell = document.createElement('div');
                shell.setAttribute('part', 'error');
                shell.setAttribute('role', 'alert');
                shell.textContent = 'This control failed to load.';
                root.appendChild(shell);
            }
        } catch {
            /* never throw from the error handler */
        }
    }
}
