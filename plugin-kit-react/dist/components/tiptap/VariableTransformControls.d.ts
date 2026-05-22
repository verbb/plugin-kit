type TransformParamOption = {
    value: string;
    label: string;
    group?: string;
};
type TransformParam = {
    name: string;
    type: string;
    label: string;
    required: boolean;
    default?: string | number | boolean | null;
    placeholder?: string;
    options?: TransformParamOption[];
    showWhen?: {
        param: string;
        equals: string;
    };
};
type TransformOption = {
    value: string;
    label: string;
    description: string;
    appliesTo?: string[];
    params: TransformParam[];
};
type VariableTransformControlsProps = {
    transformerId: string;
    onTransformerIdChange: (value: string) => void;
    transformOptions: TransformOption[];
    hasIncompatibleTransformerSelection: boolean;
    selectedTransformer: TransformOption | null;
    transformerParams: Record<string, string>;
    onTransformerParamChange: (paramName: string, value: string) => void;
};
export declare function VariableTransformControls({ transformerId, onTransformerIdChange, transformOptions, hasIncompatibleTransformerSelection, selectedTransformer, transformerParams, onTransformerParamChange, }: VariableTransformControlsProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=VariableTransformControls.d.ts.map