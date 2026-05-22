import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/pro-solid-svg-icons';

import {
    ModalTabs as BaseModalTabs,
    ModalTabsList as BaseModalTabsList,
    ModalTabsTrigger as BaseModalTabsTrigger,
    ModalTabsContent as BaseModalTabsContent,
} from '../../components';

import { cn } from '../../utils';
import { hasSchemaErrorsCached } from '../../utils/schemaIndexCache';

import {
    createContext, useCallback, useContext, useEffect, useState,
} from 'react';

import type { SchemaFormComponentProps } from '../engine/context';
import { SchemaEngineContext } from '../engine/context';
import type { SchemaNode } from '../engine/SchemaIndex';

// Create a context to pass tab error information down
const ModalTabsErrorsContext = createContext<Record<string, boolean>>({});

export const useModalTabsErrors = () => {
    return useContext(ModalTabsErrorsContext);
};

const ModalTabs = Object.assign(({
    children, schema, schemaNode, ...props
}: SchemaFormComponentProps) => {
    const form = useContext(SchemaEngineContext);
    const node = schemaNode ?? schema;

    const [tabErrors, setTabErrors] = useState<Record<string, boolean>>({});

    const getTabErrors = useCallback(() => {
        const errors: Record<string, boolean> = {};

        if (!node?.children || !form?.getErrorMapFields) {
            return errors;
        }

        const formErrors = form.getErrorMapFields?.() || {};

        // Process schema children to find tab content
        Object.values(node.children as Record<string, unknown>).forEach((item) => {
            if (typeof item !== 'object' || item === null || Array.isArray(item)) {
                return;
            }

            const childNode = item as SchemaNode;
            const value = typeof childNode.props?.value === 'string' ? childNode.props.value : '';
            if (childNode.$cmp === 'ModalTabsContent' && value) {
                errors[value] = hasSchemaErrorsCached(formErrors, childNode.children || []);
            }
        });

        return errors;
    }, [form, node]);

    useEffect(() => {
        if (!form?.store?.subscribe) {
            setTabErrors(getTabErrors());
            return;
        }

        const update = () => {
            setTabErrors(getTabErrors());
        };

        update();
        const unsubscribe = form.store.subscribe(update);
        return unsubscribe;
    }, [form, getTabErrors]);

    return (
        <ModalTabsErrorsContext.Provider value={tabErrors}>
            <BaseModalTabs {...props}>{children}</BaseModalTabs>
        </ModalTabsErrorsContext.Provider>
    );
}, { usesSchemaNode: true as const });

function ModalTabsList({ children, ...props }) {
    return <BaseModalTabsList {...props}>{children}</BaseModalTabsList>;
}

function ModalTabsTrigger({ children, value, ...props }) {
    // Get tab errors from context
    const tabErrors = useModalTabsErrors();

    // Check if this specific tab has errors
    const hasErrors = Boolean(tabErrors[value]);

    return <BaseModalTabsTrigger
        value={value}
        data-has-errors={hasErrors}
        className={cn(
            'flex items-center gap-1',
            hasErrors && 'text-error',
        )}
        {...props}
    >
        {children}

        {hasErrors && (
            <FontAwesomeIcon icon={faTriangleExclamation} className="block size-3" />
        )}
    </BaseModalTabsTrigger>;
}

function ModalTabsContent({
    children, value, ...props
}) {
    return (
        <BaseModalTabsContent value={value} {...props}>
            <div className={cn(
                'grid grid-cols-1 gap-4',
            )}>{children}</div>
        </BaseModalTabsContent>
    );
}

export {
    ModalTabs,
    ModalTabsList,
    ModalTabsTrigger,
    ModalTabsContent,
};
