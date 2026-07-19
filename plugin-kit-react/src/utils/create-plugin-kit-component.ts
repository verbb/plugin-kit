/**
 * React 19-aware wrapper around `@lit/react` createComponent.
 *
 * `@lit/react` keeps CE properties off JSX and assigns them in `useLayoutEffect`.
 * React 19 can set custom-element properties from JSX natively; when that path is
 * used, props (e.g. `variant`) apply on first paint. Events still go through the
 * layout-effect listener map from `@lit/react`.
 *
 * For React < 19, delegates unchanged to `@lit/react`.
 */
import {
    createComponent,
    type EventName,
    type ReactWebComponent,
} from '@lit/react';
import type ReactNamespace from 'react';

type EventNames = Record<string, EventName | string>;

type Constructor<T> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
};

type Options<I extends HTMLElement, E extends EventNames = {}> = {
    react: typeof ReactNamespace;
    tagName: string;
    elementClass: Constructor<I>;
    events?: E;
    displayName?: string;
};

const reservedReactProperties = new Set([
    'children',
    'localName',
    'ref',
    'style',
    'className',
]);

const listenedEvents = new WeakMap<Element, Map<string, EventListenerObject>>();

function addOrUpdateEventListener(node: Element, event: string, listener: EventListener | undefined) {
    let events = listenedEvents.get(node);

    if (events === undefined) {
        listenedEvents.set(node, (events = new Map()));
    }

    let handler = events.get(event);

    if (listener !== undefined) {
        if (handler === undefined) {
            events.set(event, (handler = { handleEvent: listener }));
            node.addEventListener(event, handler);
        } else {
            handler.handleEvent = listener;
        }
    } else if (handler !== undefined) {
        events.delete(event);
        node.removeEventListener(event, handler);
    }
}

function setProperty(
    node: Element,
    name: string,
    value: unknown,
    old: unknown,
    events: Record<string, string> | undefined,
) {
    const event = events?.[name];

    if (event !== undefined) {
        if (value !== old) {
            addOrUpdateEventListener(node, event, value as EventListener | undefined);
        }
        return;
    }

    (node as unknown as Record<string, unknown>)[name] = value;

    if ((value === undefined || value === null) && name in HTMLElement.prototype) {
        node.removeAttribute(name);
    }
}

function reactMajor(react: typeof ReactNamespace): number {
    const version = react.version ?? '0';
    return Number.parseInt(version, 10) || 0;
}

export function createPluginKitComponent<
    I extends HTMLElement,
    E extends EventNames = {},
>(options: Options<I, E>): ReactWebComponent<I, E> {
    const { react: React, tagName, elementClass, events, displayName } = options;

    // Pre-19: keep upstream behavior (imperative property assignment only).
    if (reactMajor(React) < 19) {
        return createComponent(options);
    }

    const eventProps = new Set(Object.keys(events ?? {}));

    const ReactComponent = React.forwardRef((props: Record<string, unknown>, ref: ReactNamespace.Ref<I>) => {
        const prevElemPropsRef = React.useRef(new Map<string, unknown>());
        const elementRef = React.useRef<I | null>(null);
        const reactProps: Record<string, unknown> = {};
        // Events only — element properties go through JSX for React 19.
        const elementProps: Record<string, unknown> = {};

        for (const [k, v] of Object.entries(props)) {
            if (reservedReactProperties.has(k)) {
                reactProps[k === 'className' ? 'class' : k] = v;
                continue;
            }

            if (eventProps.has(k)) {
                elementProps[k] = v;
                continue;
            }

            // React 19: pass CE props (and attributes) to createElement so the
            // reconciler sets properties on the custom element.
            reactProps[k] = v;
        }

        React.useLayoutEffect(() => {
            if (elementRef.current === null) {
                return;
            }

            const newElemProps = new Map<string, unknown>();

            for (const key of Object.keys(elementProps)) {
                setProperty(
                    elementRef.current,
                    key,
                    props[key],
                    prevElemPropsRef.current.get(key),
                    events as Record<string, string> | undefined,
                );
                prevElemPropsRef.current.delete(key);
                newElemProps.set(key, props[key]);
            }

            for (const [key, value] of prevElemPropsRef.current) {
                setProperty(
                    elementRef.current,
                    key,
                    undefined,
                    value,
                    events as Record<string, string> | undefined,
                );
            }

            prevElemPropsRef.current = newElemProps;
        });

        React.useLayoutEffect(() => {
            elementRef.current?.removeAttribute('defer-hydration');
        }, []);

        return React.createElement(tagName, {
            ...reactProps,
            suppressHydrationWarning: true,
            ref: React.useCallback(
                (node: I | null) => {
                    elementRef.current = node;

                    if (typeof ref === 'function') {
                        ref(node);
                    } else if (ref !== null && ref !== undefined) {
                        (ref as ReactNamespace.MutableRefObject<I | null>).current = node;
                    }
                },
                [ref],
            ),
        });
    });

    ReactComponent.displayName = displayName ?? elementClass.name;

    return ReactComponent as ReactWebComponent<I, E>;
}
