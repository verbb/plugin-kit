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
export { clone, createItem, deleteItem, duplicateItem, findItemById, findRecursive, generateId, getExistingItems, getNewItems, moveItem, normalizeCollection, updateItem };

//# sourceMappingURL=collections.js.map