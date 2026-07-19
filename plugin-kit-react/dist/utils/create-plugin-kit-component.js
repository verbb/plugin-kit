import { createComponent } from "@lit/react";
//#region src/utils/create-plugin-kit-component.ts
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
var reservedReactProperties = new Set([
	"children",
	"localName",
	"ref",
	"style",
	"className"
]);
var listenedEvents = /* @__PURE__ */ new WeakMap();
function addOrUpdateEventListener(node, event, listener) {
	let events = listenedEvents.get(node);
	if (events === void 0) listenedEvents.set(node, events = /* @__PURE__ */ new Map());
	let handler = events.get(event);
	if (listener !== void 0) if (handler === void 0) {
		events.set(event, handler = { handleEvent: listener });
		node.addEventListener(event, handler);
	} else handler.handleEvent = listener;
	else if (handler !== void 0) {
		events.delete(event);
		node.removeEventListener(event, handler);
	}
}
function setProperty(node, name, value, old, events) {
	const event = events?.[name];
	if (event !== void 0) {
		if (value !== old) addOrUpdateEventListener(node, event, value);
		return;
	}
	node[name] = value;
	if ((value === void 0 || value === null) && name in HTMLElement.prototype) node.removeAttribute(name);
}
function reactMajor(react) {
	const version = react.version ?? "0";
	return Number.parseInt(version, 10) || 0;
}
function createPluginKitComponent(options) {
	const { react: React, tagName, elementClass, events, displayName } = options;
	if (reactMajor(React) < 19) return createComponent(options);
	const eventProps = new Set(Object.keys(events ?? {}));
	const ReactComponent = React.forwardRef((props, ref) => {
		const prevElemPropsRef = React.useRef(/* @__PURE__ */ new Map());
		const elementRef = React.useRef(null);
		const reactProps = {};
		const elementProps = {};
		for (const [k, v] of Object.entries(props)) {
			if (reservedReactProperties.has(k)) {
				reactProps[k === "className" ? "class" : k] = v;
				continue;
			}
			if (eventProps.has(k)) {
				elementProps[k] = v;
				continue;
			}
			reactProps[k] = v;
		}
		React.useLayoutEffect(() => {
			if (elementRef.current === null) return;
			const newElemProps = /* @__PURE__ */ new Map();
			for (const key of Object.keys(elementProps)) {
				setProperty(elementRef.current, key, props[key], prevElemPropsRef.current.get(key), events);
				prevElemPropsRef.current.delete(key);
				newElemProps.set(key, props[key]);
			}
			for (const [key, value] of prevElemPropsRef.current) setProperty(elementRef.current, key, void 0, value, events);
			prevElemPropsRef.current = newElemProps;
		});
		React.useLayoutEffect(() => {
			elementRef.current?.removeAttribute("defer-hydration");
		}, []);
		return React.createElement(tagName, {
			...reactProps,
			suppressHydrationWarning: true,
			ref: React.useCallback((node) => {
				elementRef.current = node;
				if (typeof ref === "function") ref(node);
				else if (ref !== null && ref !== void 0) ref.current = node;
			}, [ref])
		});
	});
	ReactComponent.displayName = displayName ?? elementClass.name;
	return ReactComponent;
}
//#endregion
export { createPluginKitComponent };

//# sourceMappingURL=create-plugin-kit-component.js.map