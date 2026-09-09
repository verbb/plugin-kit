import type {
    PkImageBrowserGroup,
    PkImageBrowserItem,
} from '@verbb/plugin-kit-web/components/image-browser/pk-image-browser.js';

/** Font Awesome Free solid glyphs for playground demos — no network. */
export const demoIconSvg = {
    star: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 576 512\"><path d=\"M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z\"/></svg>",
    heart: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M241 87.1l15 20.7 15-20.7C296 52.5 336.2 32 378.9 32 452.4 32 512 91.6 512 165.1l0 2.6c0 112.2-139.9 242.5-212.9 298.2-12.4 9.4-27.6 14.1-43.1 14.1s-30.8-4.6-43.1-14.1C139.9 410.2 0 279.9 0 167.7l0-2.6C0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1z\"/></svg>",
    bolt: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><path d=\"M338.8-9.9c11.9 8.6 16.3 24.2 10.9 37.8L271.3 224 416 224c13.5 0 25.5 8.4 30.1 21.1s.7 26.9-9.6 35.5l-288 240c-11.3 9.4-27.4 9.9-39.3 1.3s-16.3-24.2-10.9-37.8L176.7 288 32 288c-13.5 0-25.5-8.4-30.1-21.1s-.7-26.9 9.6-35.5l288-240c11.3-9.4 27.4-9.9 39.3-1.3z\"/></svg>",
    leaf: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M471.3 6.7C477.7 .6 487-1.6 495.6 1.2 505.4 4.5 512 13.7 512 24l0 186.9c0 131.2-108.1 237.1-238.8 237.1-77 0-143.4-49.5-167.5-118.7-35.4 30.8-57.7 76.1-57.7 126.7 0 13.3-10.7 24-24 24S0 469.3 0 456C0 381.1 38.2 315.1 96.1 276.3 131.4 252.7 173.5 240 216 240l80 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-80 0c-39.7 0-77.3 8.8-111 24.5 23.3-70 89.2-120.5 167-120.5 66.4 0 115.8-22.1 148.7-44 19.2-12.8 35.5-28.1 50.7-45.3z\"/></svg>",
    cube: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M224.3-2.5c19.8-11.4 44.2-11.4 64 0L464.2 99c19.8 11.4 32 32.6 32 55.4l0 203c0 22.9-12.2 44-32 55.4L288.3 514.5c-19.8 11.4-44.2 11.4-64 0L48.5 413c-19.8-11.4-32-32.6-32-55.4l0-203c0-22.9 12.2-44 32-55.4L224.3-2.5zm207.8 360l0-166.1-143.8 83 0 166.1 143.8-83z\"/></svg>",
    globe: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M351.9 280l-190.9 0c2.9 64.5 17.2 123.9 37.5 167.4 11.4 24.5 23.7 41.8 35.1 52.4 11.2 10.5 18.9 12.2 22.9 12.2s11.7-1.7 22.9-12.2c11.4-10.6 23.7-28 35.1-52.4 20.3-43.5 34.6-102.9 37.5-167.4zM160.9 232l190.9 0C349 167.5 334.7 108.1 314.4 64.6 303 40.2 290.7 22.8 279.3 12.2 268.1 1.7 260.4 0 256.4 0s-11.7 1.7-22.9 12.2c-11.4 10.6-23.7 28-35.1 52.4-20.3 43.5-34.6 102.9-37.5 167.4zm-48 0C116.4 146.4 138.5 66.9 170.8 14.7 78.7 47.3 10.9 131.2 1.5 232l111.4 0zM1.5 280c9.4 100.8 77.2 184.7 169.3 217.3-32.3-52.2-54.4-131.7-57.9-217.3L1.5 280zm398.4 0c-3.5 85.6-25.6 165.1-57.9 217.3 92.1-32.7 159.9-116.5 169.3-217.3l-111.4 0zm111.4-48C501.9 131.2 434.1 47.3 342 14.7 374.3 66.9 396.4 146.4 399.9 232l111.4 0z\"/></svg>",
} as const;

export const demoIconItems: PkImageBrowserItem[] = [
    { value: 'star', label: 'Star', preview: demoIconSvg.star },
    { value: 'heart', label: 'Heart Outline', preview: demoIconSvg.heart },
    { value: 'bolt', label: 'Lightning Bolt', preview: demoIconSvg.bolt },
    { value: 'leaf', label: 'Add Parent Node', preview: demoIconSvg.leaf },
    { value: 'cube', label: 'Cube', preview: demoIconSvg.cube },
    { value: 'globe', label: 'Globe', preview: demoIconSvg.globe },
];

/** Tiny Pexels thumbs for image-mode demos (w=400). */
const pexelsThumb = (id: number): string => (
    `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=400`
);

const demoPexels = {
    seagulls: pexelsThumb(36620445),
    sailboat: pexelsThumb(14200079),
    flowers: pexelsThumb(39108184),
} as const;

/** Image catalog with curated display names. */
export const demoImageLabeledItems: PkImageBrowserItem[] = [
    {
        value: 'seagulls.jpg',
        label: 'Seagulls',
        preview: demoPexels.seagulls,
    },
    {
        value: 'sailboat.jpg',
        label: 'Sailboat',
        preview: demoPexels.sailboat,
    },
    {
        value: 'flowers.jpg',
        label: 'Flower market',
        preview: demoPexels.flowers,
    },
    {
        value: 'mark.svg',
        label: 'Mark',
        preview: demoIconSvg.cube,
    },
];

export const demoIconGroups: PkImageBrowserGroup[] = [
    {
        name: 'Marks',
        items: demoIconItems.slice(0, 3),
    },
    {
        name: 'Shapes',
        items: demoIconItems.slice(3),
    },
];

/** Image-mode groups — photos vs marks under the same `groups` API. */
export const demoImageGroups: PkImageBrowserGroup[] = [
    {
        name: 'Photos',
        items: demoImageLabeledItems.slice(0, 3),
    },
    {
        name: 'Marks',
        items: demoImageLabeledItems.slice(3),
    },
];
