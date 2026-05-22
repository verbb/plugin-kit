import { ClassValue } from 'clsx';
/**
 * Utility function to merge class names with Tailwind support
 *
 * Combines clsx for conditional class names with tailwind-merge for
 * proper handling of Tailwind utility classes.
 *
 * @param inputs - Class names or conditional class name objects to merge
 * @returns Merged class name string with proper Tailwind handling
 *
 * @example
 * ```ts
 * cn('p-4', 'bg-red-500', { 'hidden': isHidden })
 * // Returns: 'p-4 bg-red-500' or 'p-4 bg-red-500 hidden'
 * ```
 */
export declare function cn(...inputs: ClassValue[]): string;
//# sourceMappingURL=classes.d.ts.map