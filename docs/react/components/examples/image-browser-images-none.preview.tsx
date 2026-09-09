// #region example
import { useState } from 'react';
import { ImageBrowser } from '@verbb/plugin-kit-react/components';

const markSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M224.3-2.5c19.8-11.4 44.2-11.4 64 0L464.2 99c19.8 11.4 32 32.6 32 55.4l0 203c0 22.9-12.2 44-32 55.4L288.3 514.5c-19.8 11.4-44.2 11.4-64 0L48.5 413c-19.8-11.4-32-32.6-32-55.4l0-203c0-22.9 12.2-44 32-55.4L224.3-2.5zm207.8 360l0-166.1-143.8 83 0 166.1 143.8-83z\"/></svg>";

const imageItems = [
    {
        value: 'seagulls.jpg',
        label: 'Seagulls',
        preview: 'https://images.pexels.com/photos/36620445/pexels-photo-36620445.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
        value: 'sailboat.jpg',
        label: 'Sailboat',
        preview: 'https://images.pexels.com/photos/14200079/pexels-photo-14200079.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
        value: 'flowers.jpg',
        label: 'Flower market',
        preview: 'https://images.pexels.com/photos/39108184/pexels-photo-39108184.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    { value: 'mark.svg', label: 'Mark', preview: markSvg },
];

export function ImageBrowserImagesNoneExample() {
    const [value, setValue] = useState('seagulls.jpg');

    return (
        <ImageBrowser
            value={value}
            onChange={setValue}
            mode="image"
            labelMode="none"
            placeholder="Choose a preview image"
            searchPlaceholder="Search images"
            items={imageItems}
        />
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Image No Labels',
    title: 'Image no labels example',
    language: 'tsx',
    source: true,
    render: () => <ImageBrowserImagesNoneExample />,
};

export default preview;
