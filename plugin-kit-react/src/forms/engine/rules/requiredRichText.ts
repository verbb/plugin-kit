import { translate } from '@verbb/plugin-kit-react/utils/translation';
import { isRichTextEmpty } from '../../../utils/tiptap';

export const requiredRichTextRule = (value: unknown, label: string) => {
    if (isRichTextEmpty(value)) {
        return translate('{attribute} cannot be blank.', { attribute: label });
    }

    return null;
};
