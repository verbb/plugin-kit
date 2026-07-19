export const comboboxPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'Combobox',
    description: 'Searchable select with filtering and chips.',
} as const;

export const comboboxPlaygroundSections = {
    basic: {
        title: 'Basic usage',
        description: 'Type-to-filter with match highlighting.',
    },
    withClear: {
        title: 'With clear',
        description: 'Clearable with pre-selected value.',
    },
    grouped: {
        title: 'Grouped options',
        description: '`pk-option-group` labels.',
    },
    multiple: {
        title: 'Multiple selection',
        description: 'Removable chips. Backspace removes the last chip when input is empty.',
    },
    sizes: {
        title: 'Sizes',
        description: 'xs, sm, default, lg, xl.',
    },
    allowCreate: {
        title: 'Allow create',
        description: 'Create option for values not in the list.',
    },
    allowCustomValue: {
        title: 'Custom values',
        description: '`allow-custom-value` — single-select accepts non-matching text.',
    },
    popupMode: {
        title: 'Popup mode',
        description: 'Selected value in closed state; search inside the dropdown.',
    },
    asyncSearch: {
        title: 'Async search',
        description: '`async` with `fetchOptions` — remote matches as the user types.',
    },
} as const;

export const comboboxPlaygroundFormOptions = [
    { value: 'contact', label: 'Contact Form' },
    { value: 'newsletter', label: 'Newsletter Signup' },
    { value: 'support', label: 'Support Request' },
    { value: 'feedback', label: 'Feedback Survey' },
] as const;

export const comboboxPlaygroundFruitOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'grapes', label: 'Grapes' },
    { value: 'pineapple', label: 'Pineapple' },
] as const;

export const comboboxPlaygroundProduceGroups = [
    {
        label: 'Fruits',
        options: [
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana' },
            { value: 'orange', label: 'Orange' },
        ],
    },
    {
        label: 'Vegetables',
        options: [
            { value: 'carrot', label: 'Carrot' },
            { value: 'lettuce', label: 'Lettuce' },
            { value: 'spinach', label: 'Spinach' },
        ],
    },
] as const;

export const comboboxPlaygroundSizes = [
    { label: 'Extra small', size: 'xs' },
    { label: 'Small', size: 'sm' },
    { label: 'Default', size: 'default' },
    { label: 'Large', size: 'lg' },
] as const;

export const comboboxPlaygroundColorOptions = [
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' },
] as const;

export const comboboxPlaygroundCountryOptions = [
    { value: 'argentina', label: 'Argentina' },
    { value: 'australia', label: 'Australia' },
    { value: 'canada', label: 'Canada' },
    { value: 'france', label: 'France' },
    { value: 'japan', label: 'Japan' },
] as const;

export const comboboxPlaygroundAsyncFruits = [
    { value: 'apple', label: 'Apple' },
    { value: 'apricot', label: 'Apricot' },
    { value: 'avocado', label: 'Avocado' },
    { value: 'banana', label: 'Banana' },
    { value: 'blackberry', label: 'Blackberry' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'coconut', label: 'Coconut' },
    { value: 'cranberry', label: 'Cranberry' },
    { value: 'fig', label: 'Fig' },
    { value: 'grape', label: 'Grape' },
    { value: 'grapefruit', label: 'Grapefruit' },
    { value: 'guava', label: 'Guava' },
    { value: 'kiwi', label: 'Kiwi' },
    { value: 'lemon', label: 'Lemon' },
    { value: 'lime', label: 'Lime' },
    { value: 'mango', label: 'Mango' },
    { value: 'melon', label: 'Melon' },
    { value: 'orange', label: 'Orange' },
    { value: 'papaya', label: 'Papaya' },
    { value: 'peach', label: 'Peach' },
    { value: 'pear', label: 'Pear' },
    { value: 'pineapple', label: 'Pineapple' },
    { value: 'plum', label: 'Plum' },
    { value: 'pomegranate', label: 'Pomegranate' },
    { value: 'raspberry', label: 'Raspberry' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'watermelon', label: 'Watermelon' },
] as const;
