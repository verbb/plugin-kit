/**
 * Collections utility for managing client-side collections of models
 */
/**
 * Generates a unique client-side ID string
 * @param {string} [prefix='client'] - Optional prefix for the generated ID
 * @returns {string} A unique ID string in the format: prefix_timestamp_randomString
 */
export declare const generateId: (prefix?: string) => string;
/**
 * Normalize a collection by adding _id to each item that doesn't have one
 * @param {Array} collection - Array of items
 * @returns {Array} - Normalized collection with _id on each item
 */
export declare const normalizeCollection: (collection?: any[]) => any[];
/**
 * Create a new collection item
 * @param {Object} itemData - Initial data for the new item
 * @returns {Object} - The new item
 */
export declare const createItem: (itemData?: any) => any;
/**
 * Duplicate an existing item in a collection
 * @param {Array} collection - Current collection
 * @param {Object} item - Item to duplicate
 * @param {Function} transformCallback - Optional callback to transform the duplicated item
 * @returns {Object} - Updated collection with duplicated item
 */
export declare const duplicateItem: (collection: any[] | undefined, item: any, transformCallback?: ((item: any) => any) | null) => any[];
/**
 * Delete a item from a collection
 * @param {Array} collection - Current collection
 * @param {Object} item - Item to delete
 * @returns {Object} - Updated collection without the deleted item
 */
export declare const deleteItem: (collection: any[] | undefined, itemToDelete: any) => any[];
/**
 * Update an item in a collection
 * @param {Array} collection - Current collection
 * @param {Object} item - Item to update
 * @param {Object} updates - Updates to apply to the item
 * @returns {Object} - Updated collection with updated item
 */
export declare const updateItem: (collection: any[] | undefined, itemToUpdate: any, updates: any) => any[];
/**
 * Move an item to a new position in a collection
 * @param {Array} collection - Current collection
 * @param {Object} fromItem - Item to move
 * @param {Object} toItem - Item to move to (insert before this item)
 * @returns {Array} - Updated collection with moved item
 */
export declare const moveItem: (collection: any[] | undefined, fromItem: any, toItem: any) => any[];
/**
 * Find an item in a collection by _id
 * @param {Array} collection - Collection to search
 * @param {string} _id - Client-side ID to find
 * @returns {Object|null} - Found model or null
 */
export declare const findItemById: (collection: any[] | undefined, _id: string) => any | null;
/**
 * Get all items that have server-side IDs (existing items)
 * @param {Array} collection - Collection to filter
 * @returns {Array} - Items with server-side IDs
 */
export declare const getExistingItems: (collection?: any[]) => any[];
/**
 * Get all items that don't have server-side IDs (new items)
 * @param {Array} collection - Collection to filter
 * @returns {Array} - Items without server-side IDs
 */
export declare const getNewItems: (collection?: any[]) => any[];
export declare const findRecursive: <T = any>(items: T[], predicate: (item: T) => boolean, optionsKey?: string) => T | null;
/**
 * Creates a deep clone of a value using JSON serialization
 * @param {any} value - The value to clone
 * @returns {any} A deep clone of the input value, or undefined if input is undefined
 */
export declare const clone: <T>(value: T) => T | undefined;
//# sourceMappingURL=collections.d.ts.map