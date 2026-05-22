import MarkdownIt from "markdown-it";
//#region src/utils/collections.ts
/**
* Collections utility for managing client-side collections of models
*/
/**
* Generates a unique client-side ID string
* @param {string} [prefix='client'] - Optional prefix for the generated ID
* @returns {string} A unique ID string in the format: prefix_timestamp_randomString
*/
var generateId = (prefix = "client") => {
	return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
/**
* Normalize a collection by adding _id to each item that doesn't have one
* @param {Array} collection - Array of items
* @returns {Array} - Normalized collection with _id on each item
*/
var normalizeCollection = (collection = []) => {
	return collection.map((item) => {
		if (item._id) return item;
		return {
			...item,
			_id: generateId()
		};
	});
};
/**
* Create a new collection item
* @param {Object} itemData - Initial data for the new item
* @returns {Object} - The new item
*/
var createItem = (itemData = {}) => {
	return {
		...itemData,
		_id: generateId()
	};
};
/**
* Duplicate an existing item in a collection
* @param {Array} collection - Current collection
* @param {Object} item - Item to duplicate
* @param {Function} transformCallback - Optional callback to transform the duplicated item
* @returns {Object} - Updated collection with duplicated item
*/
var duplicateItem = (collection = [], item, transformCallback = null) => {
	const duplicatedItem = {
		...item,
		_id: generateId()
	};
	const finalItem = transformCallback ? transformCallback(duplicatedItem) : duplicatedItem;
	return [...collection, finalItem];
};
/**
* Delete a item from a collection
* @param {Array} collection - Current collection
* @param {Object} item - Item to delete
* @returns {Object} - Updated collection without the deleted item
*/
var deleteItem = (collection = [], itemToDelete) => {
	return collection.filter((item) => {
		return item._id !== itemToDelete._id;
	});
};
/**
* Update an item in a collection
* @param {Array} collection - Current collection
* @param {Object} item - Item to update
* @param {Object} updates - Updates to apply to the item
* @returns {Object} - Updated collection with updated item
*/
var updateItem = (collection = [], itemToUpdate, updates) => {
	return collection.map((item) => {
		if (item._id === itemToUpdate._id) return {
			...item,
			...updates,
			_id: item._id
		};
		return item;
	});
};
/**
* Move an item to a new position in a collection
* @param {Array} collection - Current collection
* @param {Object} fromItem - Item to move
* @param {Object} toItem - Item to move to (insert before this item)
* @returns {Array} - Updated collection with moved item
*/
var moveItem = (collection = [], fromItem, toItem) => {
	if (fromItem._id === toItem._id) return collection;
	const fromIndex = collection.findIndex((item) => {
		return item._id === fromItem._id;
	});
	const toIndex = collection.findIndex((item) => {
		return item._id === toItem._id;
	});
	if (fromIndex === -1 || toIndex === -1) return collection;
	const newCollection = [...collection];
	const [movedItem] = newCollection.splice(fromIndex, 1);
	newCollection.splice(toIndex, 0, movedItem);
	return newCollection;
};
/**
* Find an item in a collection by _id
* @param {Array} collection - Collection to search
* @param {string} _id - Client-side ID to find
* @returns {Object|null} - Found model or null
*/
var findItemById = (collection = [], _id) => {
	return collection.find((item) => {
		return item._id === _id;
	}) || null;
};
/**
* Get all items that have server-side IDs (existing items)
* @param {Array} collection - Collection to filter
* @returns {Array} - Items with server-side IDs
*/
var getExistingItems = (collection = []) => {
	return collection.filter((item) => {
		return item.id;
	});
};
/**
* Get all items that don't have server-side IDs (new items)
* @param {Array} collection - Collection to filter
* @returns {Array} - Items without server-side IDs
*/
var getNewItems = (collection = []) => {
	return collection.filter((item) => {
		return !item.id;
	});
};
var findRecursive = (items, predicate, optionsKey = "options") => {
	for (const item of items) {
		if (item[optionsKey] && Array.isArray(item[optionsKey])) {
			const result = findRecursive(item[optionsKey], predicate, optionsKey);
			if (result) return result;
		}
		if (predicate(item)) return item;
	}
	return null;
};
/**
* Creates a deep clone of a value using JSON serialization
* @param {any} value - The value to clone
* @returns {any} A deep clone of the input value, or undefined if input is undefined
*/
var clone = function(value) {
	if (value === void 0) return;
	return JSON.parse(JSON.stringify(value));
};
//#endregion
//#region src/utils/forms.ts
var nl2br = (str) => {
	return str.replace(/\n/g, "<br>");
};
var getErrorHeading = (error) => {
	if (error.response?.statusText) return error.response.statusText;
	if (error.message?.includes("Network Error")) return "Network Error";
	if (error.message?.includes("timeout")) return "Request Timeout";
	return "An error has occurred";
};
var getErrorText = (error) => {
	if (error.response?.data?.message) return error.response.data.message;
	if (error.response?.data?.error) return error.response.data.error;
	if (error.message) return error.message;
	return String(error);
};
var getErrorTrace = (error, maxTraceLines = 5) => {
	const traces = [];
	const file1 = error.response?.data?.file;
	const line1 = error.response?.data?.line;
	if (file1 && line1) traces.push(`${file1}:${line1}`);
	const traceArray = error.response?.data?.trace || [];
	for (let i = 0; i < Math.min(maxTraceLines, traceArray.length); i++) {
		const traceItem = traceArray[i];
		if (traceItem?.file && traceItem?.line) traces.push(`${traceItem.file}:${traceItem.line}`);
	}
	if (error.stack && traces.length === 0) traces.push(error.stack);
	return {
		traces,
		traceAsString: traces.map(nl2br).join("<br>")
	};
};
var getErrorMessage = function(error, maxTraceLines = 5) {
	const { traces, traceAsString } = getErrorTrace(error, maxTraceLines);
	return {
		heading: getErrorHeading(error),
		text: getErrorText(error),
		trace: traceAsString,
		traceAsString,
		traceAsArray: traces
	};
};
//#endregion
//#region src/utils/markdown.ts
/**
* Initialize markdown-it instance with secure defaults and common options
* - HTML is disabled for security
* - Links are auto-detected
* - Typography features like smart quotes are enabled
* - Line breaks are converted to <br> tags
*/
var md = new MarkdownIt({
	html: false,
	linkify: true,
	typographer: true,
	breaks: true
});
/**
* Renders markdown content as block-level HTML
* Includes block elements like headers, paragraphs, lists etc.
*
* @param content - The markdown string to render
* @returns Rendered HTML string, or empty string if no content provided
*/
var renderMarkdown = (content) => {
	if (!content) return "";
	return md.render(content);
};
/**
* Renders markdown content as inline HTML only
* Excludes block-level elements, only processes inline markdown syntax
*
* @param content - The markdown string to render
* @returns Rendered HTML string, or empty string if no content provided
*/
var renderInlineMarkdown = (content) => {
	if (!content) return "";
	return md.renderInline(content);
};
//#endregion
//#region src/utils/promises.ts
/**
* Creates a function that ensures a promise takes at least a minimum amount of time to resolve
*
* @param ms - The minimum time in milliseconds that the promise should take
* @returns A function that wraps a promise or promise-returning function
* @example
* ```ts
* const slowFetch = takeAtLeast(1000)(fetch('https://api.example.com'));
* // Will take at least 1 second even if the fetch is faster
* ```
*/
var takeAtLeast = function(ms) {
	/**
	* Wraps a promise or promise-returning function to ensure minimum execution time
	*
	* @param promiseOrFn - A promise or a function that returns a promise
	* @returns A promise that resolves with the original promise's value after at least `ms` milliseconds
	* @throws Will throw if the original promise rejects
	*/
	return function(promiseOrFn) {
		const promise = typeof promiseOrFn === "function" ? promiseOrFn() : promiseOrFn;
		const delay = new Promise((resolve) => {
			return setTimeout(resolve, ms);
		});
		return Promise.allSettled([promise, delay]).then((results) => {
			const [promiseResult] = results;
			if (promiseResult.status === "rejected") throw promiseResult.reason;
			return promiseResult.value;
		});
	};
};
//#endregion
//#region src/utils/query.ts
var getQueryParam = (key) => {
	return new URLSearchParams(window.location.search).get(key);
};
var setQueryParam = (key, value) => {
	const url = new URL(window.location.href);
	url.searchParams.set(key, value);
	window.history.replaceState({}, "", url.toString());
};
//#endregion
//#region src/utils/string.ts
/**
* Convert a string to a handle format
* @param {string} sourceValue - The source string to convert
* @param {string} handleCasing - The casing format ('camelCase', 'pascal', 'snake', 'kebab')
* @param {boolean} allowNonAlphaStart - Whether to allow non-alphabetic characters at the start
* @returns {string} The generated handle
*/
var generateHandle = function(sourceValue, handleCasing = "camelCase", allowNonAlphaStart = false) {
	let handle = sourceValue.replace("/<(.*?)>/g", "");
	handle = handle.replace(/['"'""\[\]\(\)\{\}:]/g, "");
	handle = handle.toLowerCase();
	handle = window.Craft.asciiString(handle);
	if (!allowNonAlphaStart) handle = handle.replace(/^[^a-z]+/, "");
	const words = window.Craft.filterArray(handle.split(/[^a-z0-9]+/));
	handle = "";
	if (handleCasing === "snake") return words.join("_");
	if (handleCasing === "kebab") return words.join("-");
	for (let i = 0; i < words.length; i++) if (handleCasing !== "pascal" && i === 0) handle += words[i];
	else handle += words[i].charAt(0).toUpperCase() + words[i].substr(1);
	return handle;
};
/**
* Find a unique handle by checking against reserved handles and adding suffixes
* @param {string} baseHandle - The base handle to check
* @param {Array} allReservedHandles - Array of all reserved handles to check against (static + dynamic)
* @returns {string} A unique handle
*/
var findUniqueHandle = (baseHandle, allReservedHandles = []) => {
	if (!baseHandle) return "";
	let handle = baseHandle;
	let counter = 1;
	while (allReservedHandles.includes(handle)) {
		handle = `${baseHandle}${counter}`;
		counter++;
	}
	return handle;
};
//#endregion
export { clone, createItem, deleteItem, duplicateItem, findItemById, findRecursive, findUniqueHandle, generateHandle, generateId, getErrorMessage, getExistingItems, getNewItems, getQueryParam, md, moveItem, normalizeCollection, renderInlineMarkdown, renderMarkdown, setQueryParam, takeAtLeast, updateItem };

//# sourceMappingURL=plugin-kit.es.js.map