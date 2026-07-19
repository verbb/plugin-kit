import {
    DISCOVERY_COMPLETE_EVENT,
    FOUCE_TIMEOUT_MS,
    startLoader,
} from './utilities/autoloader.js';

export * from './plugin-kit.js';

startLoader();

Promise.race([
    new Promise<void>((resolve) => document.addEventListener(DISCOVERY_COMPLETE_EVENT, () => resolve(), { once: true })),
    new Promise<void>((resolve) => setTimeout(resolve, FOUCE_TIMEOUT_MS)),
]).then(() => {
    document.querySelectorAll('.pk-cloak').forEach((el) => el.classList.remove('pk-cloak'));
});
