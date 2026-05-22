const e=`// #region example
import {
    Button,
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxPrimitiveInput,
    ComboboxTrigger,
    ComboboxValue,
} from '@verbb/plugin-kit-react/components';

const countries = [
    { code: 'ar', value: 'argentina', label: 'Argentina', continent: 'South America' },
    { code: 'au', value: 'australia', label: 'Australia', continent: 'Oceania' },
    { code: 'ca', value: 'canada', label: 'Canada', continent: 'North America' },
    { code: 'fr', value: 'france', label: 'France', continent: 'Europe' },
    { code: 'jp', value: 'japan', label: 'Japan', continent: 'Asia' },
];

export function ComboboxPopupModeExample() {
    return (
        <Combobox
            items={countries}
            defaultValue={countries[0]}
            itemToStringLabel={(item) => item.label}
            itemToStringValue={(item) => item.value}
        >
            <ComboboxTrigger
                render={(
                    <Button variant="outline" className="justify-between font-normal">
                        <ComboboxValue />
                    </Button>
                )}
            />
            <ComboboxContent>
                <ComboboxPrimitiveInput showTrigger={false} placeholder="Search" />
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                    {(item) => (
                        <ComboboxItem key={item.code} value={item}>
                            <span className="flex flex-col">
                                <span>{item.label}</span>
                                <span className="text-xs text-slate-500">{item.continent}</span>
                            </span>
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Popup Mode',
    title: 'Popup mode example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <ComboboxPopupModeExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
