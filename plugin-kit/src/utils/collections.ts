/**
 * Collections utility for managing client-side collections of models
 */

/**
 * Generates a unique client-side ID string
 * @param {string} [prefix='client'] - Optional prefix for the generated ID
 * @returns {string} A unique ID string in the format: prefix_timestamp_randomString
 */
export const generateId = (prefix = 'client'): string => {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Normalize a collection by adding _id to each item that doesn't have one
 * @param {Array} collection - Array of items
 * @returns {Array} - Normalized collection with _id on each item
 */
export const normalizeCollection = (collection: any[] = []): any[] => {
    return collection.map((item) => {
        // If item already has _id, keep it (for client-side created items)
        if (item._id) {
            return item;
        }

        // Generate a client-side internal ID for server-side items
        return {
            ...item,
            _id: generateId(),
        };
    });
};

/**
 * Create a new collection item
 * @param {Object} itemData - Initial data for the new item
 * @returns {Object} - The new item
 */
export const createItem = (itemData: any = {}): any => {
    return {
        ...itemData,
        _id: generateId(),
    };
};

/**
 * Duplicate an existing item in a collection
 * @param {Array} collection - Current collection
 * @param {Object} item - Item to duplicate
 * @param {Function} transformCallback - Optional callback to transform the duplicated item
 * @returns {Object} - Updated collection with duplicated item
 */
export const duplicateItem = (collection: any[] = [], item: any, transformCallback: ((item: any) => any) | null = null): any[] => {
    // Create base duplicated item
    const duplicatedItem = {
        ...item,
        // Generate new client-side ID
        _id: generateId(),
    };

    // Apply custom transformation if provided
    const finalItem = transformCallback ? transformCallback(duplicatedItem) : duplicatedItem;

    return [...collection, finalItem];
};

/**
 * Delete a item from a collection
 * @param {Array} collection - Current collection
 * @param {Object} item - Item to delete
 * @returns {Object} - Updated collection without the deleted item
 */
export const deleteItem = (collection: any[] = [], itemToDelete: any): any[] => {
    return collection.filter((item) => { return item._id !== itemToDelete._id; });
};

/**
 * Update an item in a collection
 * @param {Array} collection - Current collection
 * @param {Object} item - Item to update
 * @param {Object} updates - Updates to apply to the item
 * @returns {Object} - Updated collection with updated item
 */
export const updateItem = (collection: any[] = [], itemToUpdate: any, updates: any): any[] => {
    return collection.map((item) => {
        if (item._id === itemToUpdate._id) {
            return {
                ...item,
                ...updates,
                // Preserve the _id
                _id: item._id,
            };
        }
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
export const moveItem = (collection: any[] = [], fromItem: any, toItem: any): any[] => {
    if (fromItem._id === toItem._id) {
        return collection;
    }

    const fromIndex = collection.findIndex((item) => { return item._id === fromItem._id; });
    const toIndex = collection.findIndex((item) => { return item._id === toItem._id; });

    if (fromIndex === -1 || toIndex === -1) {
        return collection;
    }

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
export const findItemById = (collection: any[] = [], _id: string): any | null => {
    return collection.find((item) => { return item._id === _id; }) || null;
};

/**
 * Get all items that have server-side IDs (existing items)
 * @param {Array} collection - Collection to filter
 * @returns {Array} - Items with server-side IDs
 */
export const getExistingItems = (collection: any[] = []): any[] => {
    return collection.filter((item) => { return item.id; });
};

/**
 * Get all items that don't have server-side IDs (new items)
 * @param {Array} collection - Collection to filter
 * @returns {Array} - Items without server-side IDs
 */
export const getNewItems = (collection: any[] = []): any[] => {
    return collection.filter((item) => { return !item.id; });
};

export const findRecursive = <T = any>(items: T[], predicate: (item: T) => boolean, optionsKey = 'options'): T | null => {
    for (const item of items) {
        // If this item has nested options, search recursively
        if ((item as any)[optionsKey] && Array.isArray((item as any)[optionsKey])) {
            const result = findRecursive((item as any)[optionsKey], predicate, optionsKey);

            if (result) {
                return result;
            }
        }

        // Check if this item matches the predicate
        if (predicate(item)) {
            return item;
        }
    }

    return null;
};

/**
 * Creates a deep clone of a value using JSON serialization
 * @param {any} value - The value to clone
 * @returns {any} A deep clone of the input value, or undefined if input is undefined
 */
export const clone = function <T>(value: T): T | undefined {
    if (value === undefined) {
        return undefined;
    }

    return JSON.parse(JSON.stringify(value));
};
