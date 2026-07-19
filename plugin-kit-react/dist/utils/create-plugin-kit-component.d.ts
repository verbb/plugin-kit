import { EventName, ReactWebComponent } from '@lit/react';
import { default as ReactNamespace } from 'react';
type EventNames = Record<string, EventName | string>;
type Constructor<T> = {
    new (...args: any[]): T;
};
type Options<I extends HTMLElement, E extends EventNames = {}> = {
    react: typeof ReactNamespace;
    tagName: string;
    elementClass: Constructor<I>;
    events?: E;
    displayName?: string;
};
export declare function createPluginKitComponent<I extends HTMLElement, E extends EventNames = {}>(options: Options<I, E>): ReactWebComponent<I, E>;
export {};
//# sourceMappingURL=create-plugin-kit-component.d.ts.map