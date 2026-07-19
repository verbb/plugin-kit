import { COMPONENT_MODULE_PATHS } from '../component-registry.js';
import { getBasePath } from './base-path.js';

const PK_PREFIX = 'pk-';
const DISCOVERY_EVENT = 'pk-discovery-complete';

const observer = new MutationObserver((mutations) => {
    for (const { addedNodes } of mutations) {
        for (const node of addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                void discover(node as Element);
            }
        }
    }
});

export function startLoader(): void {
    void discover(document.documentElement);
    observer.observe(document.documentElement, { subtree: true, childList: true });
}

export function stopLoader(): void {
    observer.disconnect();
}

export async function discover(root: Document | Element = document): Promise<void> {
    const rootTagName = root instanceof Element ? root.tagName.toLowerCase() : '';
    const rootIsPluginKitComponent = rootTagName.startsWith(PK_PREFIX);
    const tags = [...root.querySelectorAll(':not(:defined)')]
        .map((el) => el.tagName.toLowerCase())
        .filter((tag) => tag.startsWith(PK_PREFIX));

    if (rootIsPluginKitComponent && !customElements.get(rootTagName)) {
        tags.push(rootTagName);
    }

    const preloadSelectors = root.querySelectorAll('[data-pk-preload]');
    const preloadRoots =
        root instanceof Element && root.hasAttribute('data-pk-preload')
            ? [root, ...preloadSelectors]
            : preloadSelectors;

    for (const el of preloadRoots) {
        tags.push(
            ...el
                .getAttribute('data-pk-preload')!
                .split(/\s+/)
                .filter((tag) => tag.startsWith(PK_PREFIX)),
        );
    }

    const tagsToRegister = [...new Set(tags)];
    const imports = await Promise.allSettled(tagsToRegister.map((tagName) => register(tagName)));

    for (const imp of imports) {
        if (imp.status === 'rejected') {
            console.warn(imp.reason);
        }
    }

    await new Promise(requestAnimationFrame);

    root.dispatchEvent(
        new CustomEvent(DISCOVERY_EVENT, {
            bubbles: false,
            cancelable: false,
            composed: true,
        }),
    );
}

function register(tagName: string): Promise<void> {
    if (customElements.get(tagName)) {
        return Promise.resolve();
    }

    const modulePath = COMPONENT_MODULE_PATHS[tagName];

    if (!modulePath) {
        return Promise.reject(new Error(`Unable to autoload <${tagName}> — no module path registered`));
    }

    const path = getBasePath(modulePath);

    return import(/* @vite-ignore */ path).then(() => undefined);
}

let turboTimeout = 2000;

/** Prevent FOUCE when navigating with Turbo (Hotwire). */
export function preventTurboFouce(timeout = 2000): void {
    turboTimeout = timeout;
    document.addEventListener('turbo:before-render', handleTurboRender);
}

async function handleTurboRender(event: Event): Promise<void> {
    const turboEvent = event as CustomEvent<{ newBody: Element; resume: () => void }>;
    const newBody = turboEvent.detail.newBody;

    turboEvent.preventDefault();

    try {
        await Promise.race([
            discover(newBody),
            new Promise<void>((resolve) => setTimeout(resolve, turboTimeout)),
        ]);
    } finally {
        turboEvent.detail.resume();
    }
}

export const FOUCE_TIMEOUT_MS = 2000;
export const DISCOVERY_COMPLETE_EVENT = DISCOVERY_EVENT;
