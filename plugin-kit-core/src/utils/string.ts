/**
 * Convert a string to a handle format
 * @param {string} sourceValue - The source string to convert
 * @param {string} handleCasing - The casing format ('camelCase', 'pascal', 'snake', 'kebab')
 * @param {boolean} allowNonAlphaStart - Whether to allow non-alphabetic characters at the start
 * @returns {string} The generated handle
 */
export const generateHandle = function(sourceValue: string, handleCasing: string = 'camelCase', allowNonAlphaStart: boolean = false): string {
    // Remove HTML tags
    let handle = sourceValue.replace('/<(.*?)>/g', '');

    // Remove inner-word punctuation

    handle = handle.replace(/['"'""\[\]\(\)\{\}:]/g, '');

    // Make it lowercase
    handle = handle.toLowerCase();

    // Convert extended ASCII characters to basic ASCII
    handle = (window as any).Craft.asciiString(handle);

    if (!allowNonAlphaStart) {
        // Handle must start with a letter
        handle = handle.replace(/^[^a-z]+/, '');
    }

    // Get the "words"
    const words = (window as any).Craft.filterArray(handle.split(/[^a-z0-9]+/));
    handle = '';

    if (handleCasing === 'snake') {
        return words.join('_');
    }

    if (handleCasing === 'kebab') {
        return words.join('-');
    }

    // Make it camelCase
    for (let i = 0; i < words.length; i++) {
        if (handleCasing !== 'pascal' && i === 0) {
            handle += words[i];
        } else {
            handle += words[i].charAt(0).toUpperCase() + words[i].substr(1);
        }
    }

    return handle;
};

/**
 * Find a unique handle by checking against reserved handles and adding suffixes
 * @param {string} baseHandle - The base handle to check
 * @param {Array} allReservedHandles - Array of all reserved handles to check against (static + dynamic)
 * @returns {string} A unique handle
 */
export const findUniqueHandle = (baseHandle: string, allReservedHandles: string[] = []): string => {
    if (!baseHandle) { return ''; }

    let handle = baseHandle;
    let counter = 1;

    // Keep adding numbers until we find a unique handle
    while (allReservedHandles.includes(handle)) {
        handle = `${baseHandle}${counter}`;
        counter++;
    }

    return handle;
};
