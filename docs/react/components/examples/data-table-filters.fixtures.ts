import type {
    DataTableReactColumn,
    DataTableFilter,
} from '@verbb/plugin-kit-react/components';

export const filterRows = [
    {
        id: 1,
        name: 'Alex Morgan',
        status: 'pending',
        team: 'Support',
        verified: false,
        requests: 12,
        created: '2026-10-05T09:00:00Z',
    },
    {
        id: 2,
        name: 'Jamie Ellis',
        status: 'active',
        team: 'Sales',
        verified: true,
        requests: 38,
        created: '2026-10-12T14:00:00Z',
    },
    {
        id: 3,
        name: 'Taylor Chen',
        status: 'active',
        team: 'Support',
        verified: true,
        requests: 23,
        created: '2026-10-18T11:00:00Z',
    },
    {
        id: 4,
        name: 'Sam Rivera',
        status: 'inactive',
        team: 'Operations',
        verified: false,
        requests: 0,
        created: '2026-09-02T09:00:00Z',
    },
    {
        id: 5,
        name: 'Casey Wright',
        status: 'pending',
        team: 'Sales',
        verified: true,
        requests: 7,
        created: '2026-10-22T23:59:00Z',
    },
    {
        id: 6,
        name: 'Jordan Lee',
        status: 'active',
        team: '',
        verified: false,
        requests: 19,
        created: null,
    },
];
export const filterColumns = [
    { id: 'name', label: 'Participant', sortable: true, hideable: false },
    { id: 'status', label: 'Status', type: 'status', sortable: true },
    { id: 'team', label: 'Team', sortable: true },
    { id: 'requests', label: 'Requests', type: 'number', sortable: true },
    { id: 'created', label: 'Created', type: 'date', sortable: true },
] satisfies DataTableReactColumn[];
export const filterDefinitions: DataTableFilter[] = [
    { id: 'name', label: 'Participant', type: 'text' },
    {
        id: 'status',
        label: 'Status',
        type: 'select',
        options: [
            { value: 'active', label: 'Active' },
            { value: 'pending', label: 'Pending' },
            { value: 'inactive', label: 'Inactive' },
        ],
    },
    {
        id: 'team',
        label: 'Team',
        type: 'multi-select',
        options: [
            { value: 'Support', label: 'Support' },
            { value: 'Sales', label: 'Sales' },
            { value: 'Operations', label: 'Operations' },
        ],
    },
    { id: 'verified', label: 'Verified', type: 'boolean' },
    { id: 'requests', label: 'Requests', type: 'number-range' },
    { id: 'created', label: 'Created', type: 'date-range' },
];
