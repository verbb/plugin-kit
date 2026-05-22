import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@verbb/plugin-kit-react/components';
import type { Editor } from '@tiptap/core';
import { VariableDropdown } from '@verbb/plugin-kit-react/components/tiptap/VariableDropdown';
import type { VariableCategories } from '@verbb/plugin-kit-react/components/tiptap/VariableDropdown';
import { useTranslation } from '@verbb/plugin-kit-react/hooks';

const OPERATOR_GROUPS = [
    {
        title: 'Arithmetic',
        items: [
            ['+', 'Addition'],
            ['-', 'Subtraction'],
            ['*', 'Multiplication'],
            ['/', 'Division'],
            ['%', 'Modulus'],
            ['**', 'Power'],
        ],
    },
    {
        title: 'Bitwise',
        items: [
            ['&', 'AND'],
            ['|', 'OR'],
            ['^', 'XOR'],
        ],
    },
    {
        title: 'Logical',
        items: [
            ['!, not', 'Not'],
            ['&&, and', 'And'],
            ['||, or', 'Or'],
        ],
    },
    {
        title: 'Comparison',
        items: [
            ['==', 'Equal'],
            ['===', 'Identical'],
            ['!=', 'Not equal'],
            ['!==', 'Not identical'],
            ['<, >, <=, >=', 'Relational'],
            ['matches', 'Regex match'],
        ],
    },
    {
        title: 'Ternary',
        items: [['a ? b : c', 'Conditional']],
    },
    {
        title: 'Array',
        items: [
            ['in', 'Contains'],
            ['not in', 'Does not contain'],
        ],
    },
    {
        title: 'Numeric',
        items: [['..', 'Range']],
    },
    {
        title: 'String',
        items: [['~', 'Concatenation']],
    },
];

type CalculationsToolbarProps = {
    editor: Editor | null | undefined;
    variableCategories: VariableCategories;
    variableCategoryLabels?: Record<string, string>;
    variableCategoryOrder?: string[];
    variablePickerOpen: boolean;
    onVariablePickerOpenChange: (open: boolean) => void;
    guideOpen: boolean;
    onGuideOpenChange: (open: boolean) => void;
    validating: boolean;
    onValidate: () => void;
};

export const CalculationsToolbar = ({
    editor,
    variableCategories,
    variableCategoryLabels,
    variableCategoryOrder,
    variablePickerOpen,
    onVariablePickerOpenChange,
    guideOpen,
    onGuideOpenChange,
    validating,
    onValidate,
}: CalculationsToolbarProps) => {
    const t = useTranslation();

    return (
        <div className="flex items-center justify-between relative z-10 px-[8px] py-[8px] border-b border-[rgba(96,125,159,0.4)] bg-white shadow-[0_2px_3px_rgba(49,49,93,.07)]">
            <div className="flex flex-wrap gap-1">
                <VariableDropdown
                    editor={editor}
                    variableCategories={variableCategories}
                    variableCategoryLabels={variableCategoryLabels}
                    variableCategoryOrder={variableCategoryOrder}
                    title={t('Insert Variable')}
                    buttonLabel={t('Insert Field')}
                    buttonVariant="outline"
                    buttonSize="sm"
                    buttonClassName="h-auto [&_svg]:size-3"
                    open={variablePickerOpen}
                    onOpenChange={onVariablePickerOpenChange}
                />
            </div>

            <div className="flex items-center gap-2">
                <Dialog open={guideOpen} onOpenChange={onGuideOpenChange}>
                    <DialogTrigger render={<Button variant="outline" size="sm">{t('Syntax Guide')}</Button>} />
                    <DialogContent className="max-w-4xl" showCloseButton>
                        <DialogHeader>
                            <DialogTitle>{t('Syntax Guide')}</DialogTitle>
                            <DialogDescription>{t('Use field variables and expression syntax in formulas.')}</DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 p-4 text-sm md:grid-cols-2 xl:grid-cols-4">
                            {OPERATOR_GROUPS.map((group) => {
                                return (
                                    <div key={group.title}>
                                        <p className="mb-2 font-semibold text-gray-700">{t(group.title)}</p>
                                        <ul className="space-y-1 text-xs text-gray-600">
                                            {group.items.map(([token, label]) => {
                                                return (
                                                    <li key={`${group.title}-${token}`} className="flex items-center gap-2">
                                                        <code className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-[11px]">{token}</code>
                                                        <span>{t(label)}</span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    </DialogContent>
                </Dialog>

                <Button variant="secondary" size="sm" loading={validating} onClick={onValidate}>
                    {t('Test Formula')}
                </Button>
            </div>
        </div>
    );
};
