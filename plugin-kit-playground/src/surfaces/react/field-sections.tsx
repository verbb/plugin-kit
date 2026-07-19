import { fieldPlaygroundSections } from '@verbb/plugin-kit-playground';

import { Button } from '@verbb/plugin-kit-react/components';
import { Field } from '@verbb/plugin-kit-react/components';
import { Icon } from '@verbb/plugin-kit-react/components';
import { Input } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';

const {
    standaloneLabels,
    errorsAndWarnings,
    translatable,
    tip,
    inlineCode,
    headerEnd,
} = fieldPlaygroundSections;

/** React previews — one function per section id from fieldPlaygroundSpec. */
export const fieldReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    standaloneLabels: () => (
        <div className="pg-demo-narrow">
            <Input
                label={standaloneLabels.label}
                instructions={standaloneLabels.instructions}
                placeholder={standaloneLabels.placeholder}
            />
        </div>
    ),

    errorsAndWarnings: () => (
        <div className="pg-demo-narrow">
            <Field
                label={errorsAndWarnings.label}
                instructions={errorsAndWarnings.instructions}
                required
                errors={[errorsAndWarnings.error]}
                warning={errorsAndWarnings.warning}
            >
                <Input placeholder={errorsAndWarnings.placeholder} invalid />
            </Field>
        </div>
    ),

    translatable: () => (
        <div className="pg-demo-narrow">
            <Field
                label={translatable.label}
                instructions={translatable.instructions}
                required
                translatable
            >
                <Input placeholder={translatable.placeholder} />
            </Field>
        </div>
    ),

    tip: () => (
        <div className="pg-demo-narrow">
            <Field
                label={tip.label}
                instructions={tip.instructions}
                required
                tip={tip.tip}
            >
                <Input placeholder={tip.placeholder} value={tip.value} mono />
            </Field>
        </div>
    ),

    inlineCode: () => (
        <div className="pg-demo-narrow">
            <Field
                label={inlineCode.label}
                instructions={inlineCode.instructions}
                required
                tip={inlineCode.tip}
                warning={inlineCode.warning}
                errors={[inlineCode.error]}
            >
                <Input placeholder={inlineCode.placeholder} invalid />
            </Field>
        </div>
    ),

    headerEnd: () => (
        <div className="pg-demo-narrow">
            <Field
                label={headerEnd.label}
                instructions={headerEnd.instructions}
                headerEnd={(
                    <Button size="sm">
                        <Icon slot="start" icon="plus" />
                        {headerEnd.action}
                    </Button>
                )}
            >
                <div className="pg-field-header-end-demo">Option rows would render here.</div>
            </Field>
        </div>
    ),
};
