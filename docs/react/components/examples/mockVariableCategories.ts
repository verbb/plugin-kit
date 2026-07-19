type OutputMode = 'singleLine' | 'multiLine';
type CompatibleType = 'plainText' | 'email' | 'number' | 'calculations' | 'url';

type MockVariableItem = {
    label: string;
    value?: string;
    group?: 'selector' | 'format';
    outputMode?: OutputMode;
    compatibleWith?: CompatibleType[];
    children?: MockVariableItem[];
};

type MockVariableGroups = Record<string, MockVariableItem[]>;

const identity = <T,>(value: T) => value;

const FORM_GROUPS = [
    {
        label: 'Form',
        children: [
            { label: 'All Form Fields', value: '{form:allFields}', group: 'selector', outputMode: 'multiLine' },
            { label: 'All Non Empty Fields', value: '{form:allContentFields}', group: 'selector', outputMode: 'multiLine' },
            { label: 'All Visible Fields', value: '{form:allVisibleFields}', group: 'selector', outputMode: 'multiLine' },
            { label: 'Form Name', value: '{form:name}', group: 'selector', outputMode: 'singleLine' },
            { label: 'Form Handle', value: '{form:handle}', group: 'selector', outputMode: 'singleLine' },
        ],
    },
    {
        label: 'Submission',
        children: [
            { label: 'Submission Title', value: '{submission:title}', group: 'selector', outputMode: 'singleLine' },
            { label: 'Submission ID', value: '{submission:id}', group: 'selector', outputMode: 'singleLine' },
            { label: 'Submission UID', value: '{submission:uid}', group: 'selector', outputMode: 'singleLine' },
            { label: 'Submission URL', value: '{submission:url}', group: 'selector', outputMode: 'singleLine', compatibleWith: ['url'] },
            { label: 'Submission Date', value: '{submission:date}', group: 'selector', outputMode: 'singleLine' },
            { label: 'Submission Status', value: '{submission:status}', group: 'selector', outputMode: 'singleLine' },
        ],
    },
];

const GENERAL_GROUPS = [
    {
        label: 'System',
        children: [
            { label: 'System Name', value: '{system:name}', group: 'selector', outputMode: 'singleLine' },
            { label: 'System Email', value: '{system:email}', group: 'selector', outputMode: 'singleLine', compatibleWith: ['plainText', 'email'] },
            { label: 'System Reply-To', value: '{system:replyTo}', group: 'selector', outputMode: 'singleLine', compatibleWith: ['plainText', 'email'] },
        ],
    },
    {
        label: 'Current Date/Time',
        children: [
            { label: 'Current Timestamp', value: '{timestamp}', group: 'format', outputMode: 'singleLine' },
            { label: 'Current Date (mm/dd/yyyy)', value: '{timestamp:dateUs}', group: 'format', outputMode: 'singleLine' },
            { label: 'Current Date (dd/mm/yyyy)', value: '{timestamp:dateInt}', group: 'format', outputMode: 'singleLine' },
            { label: 'Current Date (ISO)', value: '{timestamp:iso}', group: 'format', outputMode: 'singleLine' },
            { label: 'Current Date (RFC 2822)', value: '{timestamp:rfc2822}', group: 'format', outputMode: 'singleLine' },
            { label: 'Current Time (12h)', value: '{timestamp:time12}', group: 'format', outputMode: 'singleLine' },
            { label: 'Current Time (24h)', value: '{timestamp:time24}', group: 'format', outputMode: 'singleLine' },
            { label: 'Current Year', value: '{timestamp:year}', group: 'format', outputMode: 'singleLine' },
            { label: 'Current Month', value: '{timestamp:month}', group: 'format', outputMode: 'singleLine' },
        ],
    },
];

const SITE_GROUPS = [
    {
        label: 'Current User',
        children: [
            { label: 'User IP Address', value: '{user:ip}', group: 'selector', outputMode: 'singleLine' },
            { label: 'User ID', value: '{user:id}', group: 'selector', outputMode: 'singleLine' },
            { label: 'User Email', value: '{user:email}', group: 'selector', outputMode: 'singleLine', compatibleWith: ['plainText', 'email'] },
            { label: 'Username', value: '{user:username}', group: 'selector', outputMode: 'singleLine' },
            { label: 'User Full Name', value: '{user:fullName}', group: 'selector', outputMode: 'singleLine' },
            { label: 'User First Name', value: '{user:firstName}', group: 'selector', outputMode: 'singleLine' },
            { label: 'User Last Name', value: '{user:lastName}', group: 'selector', outputMode: 'singleLine' },
        ],
    },
    {
        label: 'Current Site',
        children: [
            { label: 'Site Name', value: '{site:name}', group: 'selector', outputMode: 'singleLine' },
            { label: 'Site Handle', value: '{site:handle}', group: 'selector', outputMode: 'singleLine' },
            { label: 'Site URL', value: '{site:url}', group: 'selector', outputMode: 'singleLine', compatibleWith: ['url'] },
            { label: 'Site Language', value: '{site:language}', group: 'selector', outputMode: 'singleLine' },
        ],
    },
];

const simpleTextField = (handle: string, label: string): MockVariableItem => ({
    label,
    value: `{field:${handle}}`,
    outputMode: 'singleLine',
    compatibleWith: ['plainText', 'calculations'],
});

const multilineTextField = (handle: string, label: string): MockVariableItem => ({
    label,
    value: `{field:${handle}}`,
    outputMode: 'multiLine',
    compatibleWith: ['plainText'],
});

const emailField = (handle: string, label: string): MockVariableItem => ({
    label,
    value: `{field:${handle}}`,
    outputMode: 'singleLine',
    compatibleWith: ['plainText', 'email'],
});

const numberField = (handle: string, label: string): MockVariableItem => ({
    label,
    value: `{field:${handle}}`,
    outputMode: 'singleLine',
    compatibleWith: ['plainText', 'number', 'calculations'],
});

const hiddenField = (handle: string, label: string): MockVariableItem => ({
    label,
    value: `{field:${handle}}`,
    outputMode: 'singleLine',
    compatibleWith: ['plainText', 'email', 'number', 'calculations'],
});

const selectorOptions = (handle: string, label: string): MockVariableItem[] => [
    {
        label,
        compatibleWith: ['plainText', 'number', 'calculations'],
        children: [
            { label: `${label}: Label`, value: `{field:${handle}:label}`, group: 'selector', outputMode: 'singleLine' },
            { label: `${label}: Value`, value: `{field:${handle}:value}`, group: 'selector', outputMode: 'singleLine' },
        ],
    },
];

const checkboxOptions = (handle: string, label: string): MockVariableItem[] => [
    {
        label,
        compatibleWith: ['plainText', 'calculations'],
        children: [
            { label: `${label}: Label`, value: `{field:${handle}:label}`, group: 'selector', outputMode: 'singleLine' },
            { label: `${label}: Value`, value: `{field:${handle}:value}`, group: 'selector', outputMode: 'singleLine' },
        ],
    },
];

const addressSelectors = (handle: string, label: string): MockVariableItem[] => [
    {
        label: `${label} (Formatted)`,
        compatibleWith: ['plainText', 'calculations'],
        children: [
            { label: `${label} (Formatted): Address`, value: `{field:${handle}:__toString}`, group: 'selector', outputMode: 'singleLine' },
            { label: `${label} (Formatted): Address 1`, value: `{field:${handle}:address1}`, group: 'selector', outputMode: 'singleLine' },
            { label: `${label} (Formatted): Address 2`, value: `{field:${handle}:address2}`, group: 'selector', outputMode: 'singleLine' },
            { label: `${label} (Formatted): Address 3`, value: `{field:${handle}:address3}`, group: 'selector', outputMode: 'singleLine' },
            { label: `${label} (Formatted): City`, value: `{field:${handle}:city}`, group: 'selector', outputMode: 'singleLine' },
            { label: `${label} (Formatted): State / Province`, value: `{field:${handle}:state}`, group: 'selector', outputMode: 'singleLine' },
            { label: `${label} (Formatted): ZIP / Postal Code`, value: `{field:${handle}:zip}`, group: 'selector', outputMode: 'singleLine' },
            { label: `${label} (Formatted): Country`, value: `{field:${handle}:country}`, group: 'selector', outputMode: 'singleLine' },
        ],
    },
];

const nameSelectors = (handle: string, label: string): MockVariableItem[] => [
    {
        label: `${label} (Full Name)`,
        compatibleWith: ['plainText', 'calculations'],
        children: [
            { label: `${label} (Full Name)`, value: `{field:${handle}:__toString}`, group: 'selector', outputMode: 'singleLine' },
            { label: `${label} (Full Name): Prefix`, value: `{field:${handle}:prefix}`, group: 'selector', outputMode: 'singleLine' },
            { label: `${label} (Full Name): First Name`, value: `{field:${handle}:firstName}`, group: 'selector', outputMode: 'singleLine' },
            { label: `${label} (Full Name): Middle Name`, value: `{field:${handle}:middleName}`, group: 'selector', outputMode: 'singleLine' },
            { label: `${label} (Full Name): Last Name`, value: `{field:${handle}:lastName}`, group: 'selector', outputMode: 'singleLine' },
        ],
    },
];

const fileSelectors = (handle: string, label: string): MockVariableItem[] => [
    {
        label: `${label} (URL)`,
        compatibleWith: ['plainText', 'url'],
        children: [
            { label: `${label}: URL`, value: `{field:${handle}:url}`, group: 'selector', outputMode: 'singleLine', compatibleWith: ['url'] },
            { label: `${label}: Filename`, value: `{field:${handle}:filename}`, group: 'selector', outputMode: 'singleLine' },
            { label: `${label}: Extension`, value: `{field:${handle}:extension}`, group: 'selector', outputMode: 'singleLine' },
            { label: `${label}: Size`, value: `{field:${handle}:size}`, group: 'selector', outputMode: 'singleLine' },
        ],
    },
];

const entrySelectors = (handle: string, label: string): MockVariableItem[] => [
    {
        label: `${label} (Formatted)`,
        compatibleWith: ['plainText', 'url'],
        children: [
            { label: 'Title', value: `{field:${handle}:title}`, group: 'selector', outputMode: 'singleLine' },
            { label: 'Public URL', value: `{field:${handle}:url}`, group: 'selector', outputMode: 'singleLine', compatibleWith: ['url'] },
            { label: 'Control Panel URL', value: `{field:${handle}:cpUrl}`, group: 'selector', outputMode: 'singleLine', compatibleWith: ['url'] },
            { label: 'Formatted', value: `{field:${handle}:__toString}`, group: 'selector', outputMode: 'singleLine' },
        ],
    },
];

const signatureSelectors = (handle: string, label: string): MockVariableItem[] => [
    {
        label,
        compatibleWith: ['plainText', 'url'],
        children: [
            { label: `${label}: Image URL`, value: `{field:${handle}:url}`, group: 'selector', outputMode: 'singleLine', compatibleWith: ['url'] },
        ],
    },
];

const plainTextFields = [
    simpleTextField('singleLine', 'Single Line Text'),
    emailField('email', 'Email Field'),
    numberField('number', 'Number Field'),
    ...selectorOptions('dropdown', 'Dropdown Field'),
    ...checkboxOptions('priority', 'Radio Field'),
    ...checkboxOptions('interests', 'Checkboxes Field'),
    simpleTextField('agree', 'Agree Field'),
].map(identity);

const justFields = [
    ...plainTextFields,
    multilineTextField('message', 'Multi Line Text'),
    {
        label: 'Table Field',
        value: '{field:items}',
        outputMode: 'multiLine',
        compatibleWith: ['plainText', 'calculations'],
    },
].map(identity);

const emailFields = [
    emailField('email', 'Email Field'),
    {
        label: 'Recipients Field',
        value: '{field:recipients}',
        outputMode: 'singleLine',
        compatibleWith: ['plainText', 'email'],
    },
    hiddenField('hiddenEmail', 'Hidden (Email)'),
].map(identity);

const selectorFields = [
    numberField('quantity', 'Number Field'),
    simpleTextField('singleLine', 'Single Line Text'),
    nameSelectors('contactName', 'Name Field')[0],
    ...selectorOptions('dropdown', 'Dropdown Field'),
    ...checkboxOptions('interests', 'Checkboxes Field'),
    simpleTextField('agree', 'Agree Field'),
    ...addressSelectors('address', 'Address Field'),
    ...nameSelectors('contactName', 'Name Field'),
    ...fileSelectors('attachment', 'File Upload'),
    ...entrySelectors('relatedPage', 'Entries Field'),
    ...signatureSelectors('signature', 'Signature Field'),
].map(identity);

function filterByCompatibility(items: MockVariableItem[], compatibleWith: CompatibleType[], strict = false): MockVariableItem[] {
    return items.flatMap((item) => {
        const childItems = item.children ? filterByCompatibility(item.children, compatibleWith, strict) : undefined;
        const itemCompat = item.compatibleWith;
        const isCompatible = strict
            ? !!itemCompat && compatibleWith.some((value) => itemCompat.includes(value))
            : !itemCompat || compatibleWith.some((value) => itemCompat.includes(value));

        if (childItems && childItems.length > 0) {
            return [{ ...item, children: childItems }];
        }

        return isCompatible ? [{ ...item }] : [];
    });
}

function pickGroups(groups: MockVariableGroups, compatibleWith: CompatibleType[], strict = false): MockVariableGroups {
    return Object.fromEntries(
        Object.entries(groups)
            .map(([key, value]) => [key, filterByCompatibility(value, compatibleWith, strict)] as const)
            .filter(([, value]) => value.length > 0),
    );
}

export const MOCK_LABELS = {
    form: 'Form',
    general: 'General',
    site: 'Site',
    plainTextFields: 'Fields',
    emailFields: 'Fields',
    fieldsWithSelectors: 'Fields',
};

export const MOCK_ORDER_FULL = ['form', 'general', 'site'];
export const MOCK_ORDER_JUST_FIELDS = ['plainTextFields'];
export const MOCK_ORDER_EMAIL = ['emailFields'];
export const MOCK_ORDER_EMAIL_WITH_GENERAL = ['emailFields', 'general', 'site'];
export const MOCK_ORDER_SELECTORS = ['fieldsWithSelectors', 'form', 'general', 'site'];

export const MOCK_WITH_GENERAL = {
    form: FORM_GROUPS.map(identity),
    general: GENERAL_GROUPS.map(identity),
    site: SITE_GROUPS.map(identity),
};

export const MOCK_JUST_FIELDS = {
    plainTextFields: justFields,
};

export const MOCK_EMAIL_WITH_GENERAL = pickGroups(
    {
        emailFields,
        general: GENERAL_GROUPS.map(identity),
        site: SITE_GROUPS.map(identity),
    },
    ['email'],
    true,
);

export const MOCK_EMAIL_JUST_FIELDS = {
    emailFields,
};

export const MOCK_WITH_SELECTORS = {
    fieldsWithSelectors: selectorFields,
    form: FORM_GROUPS.map(identity),
    general: GENERAL_GROUPS.map(identity),
    site: SITE_GROUPS.map(identity),
};
