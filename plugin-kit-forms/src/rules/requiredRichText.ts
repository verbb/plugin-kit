import { translate } from '../translate';
import { isEmptyValue } from './utils';

/**
 * Required check for TipTap/ProseMirror JSON fields (`validation: 'requiredRichText'`).
 * Empty docs are JSON (`[]` / bare paragraphs), not `''` — handled via `isEmptyValue`.
 */
export const requiredRichTextRule = (value: unknown, label: string) => {
    if (isEmptyValue(value)) {
        return translate('{attribute} cannot be blank.', { attribute: label });
    }

    return null;
};
