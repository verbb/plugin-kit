import { FieldLayout } from '../Field';
import type { SchemaFormEngineApi } from '../engine/context';
import type { SchemaNode, SchemaRenderable } from '../engine/SchemaIndex';

type ListFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        required?: boolean;
        schema?: SchemaRenderable;
        showGroupedErrors?: boolean;
        className?: string;
    };
};

export const ListField = ({ form, field }: ListFieldProps) => {
    const Renderer = form?.SchemaRenderer;
    const shouldShowGroupedErrors = field.showGroupedErrors !== false;
    const errors = shouldShowGroupedErrors
        ? (form?.getGroupedErrorsForPath?.(field.name)
            ?? form?.getErrorMapFields?.()[field.name]
            ?? [])
        : [];

    if (!Renderer) {
        return null;
    }

    const items = Array.isArray(form.getFieldValue(field.name)) ? form.getFieldValue(field.name) : [];
    const itemSchema = field.schema;

    return (
        <FieldLayout
            name={field.name}
            label={field.label}
            instructions={field.instructions}
            warning={field.warning}
            required={field.required}
            errors={errors}
            withControl={false}
            className={field.className}
        >
            {items.map((item, index) => {
                const modifyChildren = (children: SchemaRenderable | undefined): SchemaRenderable[] => {
                    let normalizedChildren: SchemaRenderable[] = [];
                    if (Array.isArray(children)) {
                        normalizedChildren = children;
                    } else if (children) {
                        normalizedChildren = [children];
                    }

                    return normalizedChildren.map((child) => {
                        if (!child || typeof child !== 'object' || Array.isArray(child)) {
                            return child;
                        }

                        const childNode = child as SchemaNode;
                        const shouldMapChildren = Boolean(childNode.children) && typeof childNode.children === 'object';
                        const resolvedChildren = shouldMapChildren ? modifyChildren(childNode.children) : childNode.children;

                        const childWithContext = {
                            ...childNode,
                            _data: {
                                $item: item,
                                $key: index,
                            },
                            children: resolvedChildren,
                        };

                        if (childNode.$field && typeof childNode.name === 'string') {
                            return {
                                ...childWithContext,
                                name: `${field.name}.${index}.${childNode.name}`,
                            };
                        }

                        return childWithContext;
                    });
                };

                const modifiedChildren = modifyChildren(itemSchema);
                const key = item?._uid || item?.id || `${field.name}-${index}`;

                return (
                    <Renderer
                        key={key}
                        schema={modifiedChildren}
                    />
                );
            })}
        </FieldLayout>
    );
};
