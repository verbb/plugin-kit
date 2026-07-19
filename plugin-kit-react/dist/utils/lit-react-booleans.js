//#region src/utils/lit-react-booleans.ts
/**
* Build props that only forward `true` boolean values to @lit/react wrappers.
*
* Form-associated custom elements reflect boolean properties to attributes.
* Passing e.g. `disabled={undefined}` through createComponent can leave `disabled=""`
* on the element instead of clearing it. Omitting the prop preserves the CE default.
*/
function trueBooleanProps(keys, values) {
	const props = {};
	for (const key of keys) if (values[key] === true) props[key] = true;
	return props;
}
//#endregion
export { trueBooleanProps };

//# sourceMappingURL=lit-react-booleans.js.map