import { get } from 'lodash-es';
import { translate } from '../translate';
import type { SchemaNode } from '../types';

type RuleContext = {
    path: string;
    values: Record<string, unknown>;
    field: SchemaNode;
};

type HandleEntry = {
    path: string;
    handle: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
};

const getHandleValue = (value: unknown) => {
    if (!isRecord(value)) {
        return '';
    }

    const settings = isRecord(value.settings) ? value.settings : {};
    return String(value.handle || settings.handle || '').trim();
};

const collectTopLevelFieldHandles = (values: Record<string, unknown>) => {
    const entries: HandleEntry[] = [];
    const pages = Array.isArray(values?.pages) ? values.pages : [];

    pages.forEach((page, pageIndex) => {
        const rows = Array.isArray(page?.rows) ? page.rows : [];

        rows.forEach((row, rowIndex) => {
            const fields = Array.isArray(row?.fields) ? row.fields : [];

            fields.forEach((field, fieldIndex) => {
                const handle = getHandleValue(field);
                if (!handle) {
                    return;
                }

                entries.push({
                    path: `pages.${pageIndex}.rows.${rowIndex}.fields.${fieldIndex}.handle`,
                    handle,
                });
            });
        });
    });

    return entries;
};

const collectNestedFieldHandles = (values: Record<string, unknown>, parentFieldPath: string) => {
    const entries: HandleEntry[] = [];
    const rows = get(values, `${parentFieldPath}.rows`, []);
    const nestedRows = Array.isArray(rows) ? rows : [];

    nestedRows.forEach((row, nestedRowIndex) => {
        const fields = Array.isArray(row?.fields) ? row.fields : [];

        fields.forEach((field, nestedFieldIndex) => {
            const handle = getHandleValue(field);
            if (!handle) {
                return;
            }

            entries.push({
                path: `${parentFieldPath}.rows.${nestedRowIndex}.fields.${nestedFieldIndex}.handle`,
                handle,
            });
        });
    });

    return entries;
};

const collectNotificationHandles = (values: Record<string, unknown>) => {
    const entries: HandleEntry[] = [];
    const notifications = Array.isArray(values?.notifications) ? values.notifications : [];

    notifications.forEach((notification, index) => {
        const handle = String(notification?.handle || '').trim();
        if (!handle) {
            return;
        }

        entries.push({
            path: `notifications.${index}.handle`,
            handle,
        });
    });

    return entries;
};

const getScopedHandleEntries = (context: RuleContext) => {
    const { path, values } = context;
    const explicitScope = context?.field?.uniqueHandleScope;

    if (explicitScope === 'topLevelFields') {
        return collectTopLevelFieldHandles(values);
    }

    if (explicitScope === 'notifications') {
        return collectNotificationHandles(values);
    }

    if (explicitScope === 'nestedSiblings') {
        const parentFieldPath = context?.field?.uniqueHandleScopePath;

        if (typeof parentFieldPath === 'string' && parentFieldPath.trim() !== '') {
            return collectNestedFieldHandles(values, parentFieldPath);
        }
    }

    const nestedMatch = path.match(/^(pages\.\d+\.rows\.\d+\.fields\.\d+(?:\.rows\.\d+\.fields\.\d+)*)\.rows\.\d+\.fields\.\d+\.handle$/);
    if (nestedMatch) {
        const [, parentFieldPath] = nestedMatch;
        return collectNestedFieldHandles(values, parentFieldPath);
    }

    if (/^pages\.\d+\.rows\.\d+\.fields\.\d+\.handle$/.test(path)) {
        return collectTopLevelFieldHandles(values);
    }

    if (/^notifications\.\d+\.handle$/.test(path)) {
        return collectNotificationHandles(values);
    }

    return [];
};

export const uniqueHandleRule = (value: unknown, label: string, args: string[], context?: RuleContext) => {
    if (!context?.path || !context?.values) {
        return null;
    }

    const handle = String(value ?? '').trim();
    if (!handle) {
        return null;
    }

    const entries = getScopedHandleEntries(context);
    const normalizedHandle = handle.toLowerCase();
    const scopedDuplicate = entries.some((entry) => {
        if (entry.path === context.path) {
            return false;
        }

        return entry.handle.toLowerCase() === normalizedHandle;
    });

    const reservedHandles = Array.isArray(context.field?.reservedHandles) ? context.field.reservedHandles : [];
    const reservedDuplicate = reservedHandles.some((reservedHandle) => {
        return String(reservedHandle || '').toLowerCase() === normalizedHandle;
    });

    const duplicate = scopedDuplicate || reservedDuplicate;

    if (!duplicate) {
        return null;
    }

    return translate('{attribute} "{value}" has already been taken.', {
        attribute: label,
        value: handle,
    });
};
