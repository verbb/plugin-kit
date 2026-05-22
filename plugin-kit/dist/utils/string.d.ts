/**
 * Convert a string to a handle format
 * @param {string} sourceValue - The source string to convert
 * @param {string} handleCasing - The casing format ('camelCase', 'pascal', 'snake', 'kebab')
 * @param {boolean} allowNonAlphaStart - Whether to allow non-alphabetic characters at the start
 * @returns {string} The generated handle
 */
export declare const generateHandle: (sourceValue: string, handleCasing?: string, allowNonAlphaStart?: boolean) => string;
/**
 * Find a unique handle by checking against reserved handles and adding suffixes
 * @param {string} baseHandle - The base handle to check
 * @param {Array} allReservedHandles - Array of all reserved handles to check against (static + dynamic)
 * @returns {string} A unique handle
 */
export declare const findUniqueHandle: (baseHandle: string, allReservedHandles?: string[]) => string;
//# sourceMappingURL=string.d.ts.map