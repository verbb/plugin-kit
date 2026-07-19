// #region example
import { useCallback, useState } from 'react';
import { ComboboxInput } from '@verbb/plugin-kit-react/components';

const fruits = [
    { value: 'apple', label: 'Apple' },
    { value: 'apricot', label: 'Apricot' },
    { value: 'avocado', label: 'Avocado' },
    { value: 'banana', label: 'Banana' },
    { value: 'blackberry', label: 'Blackberry' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'coconut', label: 'Coconut' },
    { value: 'grape', label: 'Grape' },
    { value: 'kiwi', label: 'Kiwi' },
    { value: 'lemon', label: 'Lemon' },
    { value: 'mango', label: 'Mango' },
    { value: 'orange', label: 'Orange' },
    { value: 'peach', label: 'Peach' },
    { value: 'pear', label: 'Pear' },
    { value: 'pineapple', label: 'Pineapple' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'watermelon', label: 'Watermelon' },
];

export function ComboboxAsyncSearchExample() {
    const [value, setValue] = useState<string | null>('apple');

    const fetchFruits = useCallback(async (query: string) => {
        await new Promise((resolve) => {
            window.setTimeout(resolve, 400);
        });

        const normalized = query.trim().toLowerCase();

        if (!normalized) {
            return [];
        }

        return fruits.filter((fruit) => fruit.label.toLowerCase().includes(normalized));
    }, []);

    return (
        <ComboboxInput
            fetchOptions={fetchFruits}
            value={value}
            onValueChange={(next) => setValue(next == null ? null : String(next))}
            placeholder="Search fruits…"
            startTypingMessage="Start typing to search fruits…"
        />
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Async Search',
    title: 'Async search example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <ComboboxAsyncSearchExample />
        </div>
    ),
};

export default preview;
