import { useState } from 'react';
import {
    buildCraftTextareaComparisonHtml,
    textareaFieldStates,
    textareaPlaygroundSections,
} from '@verbb/plugin-kit-playground';

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupText,
    InputGroupTextarea,
} from '@verbb/plugin-kit-react/components';
import { Textarea } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';
import { ComparisonRow, StateMatrixCell } from './shared/sectionHelpers.js';

/** React previews — one function per section id from textareaPlaygroundSpec. */
export const textareaReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    craftComparison: () => (
        <div className="cmp-layout">
            <div className="cmp-column">
                <span className="cmp-column-title">Plugin Kit</span>
                <div className="cmp-rows">
                    <ComparisonRow heading="Field states" layout="stack">
                        {textareaFieldStates.map(({ label, placeholder, invalid, disabled, focus }) => (
                            <StateMatrixCell key={label} label={label}>
                                <Textarea
                                    placeholder={placeholder}
                                    invalid={invalid}
                                    disabled={disabled}
                                    style={{ width: '9rem' }}
                                    {...(focus ? { 'data-state': 'focus-visible' } : {})}
                                />
                            </StateMatrixCell>
                        ))}
                    </ComparisonRow>
                </div>
            </div>
            <div className="cmp-column">
                <span className="cmp-column-title">Craft</span>
                <div dangerouslySetInnerHTML={{ __html: buildCraftTextareaComparisonHtml() }} />
            </div>
        </div>
    ),

    basicUsage: () => (
        <div className="pg-demo-narrow">
            <Textarea placeholder={textareaPlaygroundSections.basicUsage.placeholder} />
        </div>
    ),

    sizes: () => (
        <div className="pg-demo-stack pg-demo-narrow">
            <Textarea placeholder="Default" size="default" />
            <Textarea placeholder="Small" size="sm" />
        </div>
    ),

    widths: () => (
        <div className="pg-demo-stack">
            <div className="pg-demo-narrow">
                <Textarea placeholder={textareaPlaygroundSections.widths.fullWidthPlaceholder} />
            </div>
            <Textarea
                placeholder={textareaPlaygroundSections.widths.fixedWidthPlaceholder}
                style={{ width: '320px' }}
            />
        </div>
    ),

    validation: () => (
        <div className="pg-demo-narrow">
            <Textarea placeholder={textareaPlaygroundSections.validation.placeholder} invalid />
        </div>
    ),

    disabled: () => (
        <div className="pg-demo-narrow">
            <Textarea placeholder={textareaPlaygroundSections.disabled.placeholder} disabled />
        </div>
    ),

    resize: () => (
        <div className="pg-demo-narrow">
            <Textarea value={textareaPlaygroundSections.resize.value} />
        </div>
    ),

    characterCount: function CharacterCountSection() {
        const { defaultValue, maxLength } = textareaPlaygroundSections.characterCount;
        const [value, setValue] = useState(defaultValue);

        return (
            <div className="pg-field-stack pg-demo-narrow">
                <Textarea
                    id="textarea-char-count"
                    value={value}
                    maxLength={maxLength}
                    onInput={(event) => { setValue((event.target as HTMLTextAreaElement).value); }}
                />
                <p id="textarea-char-count-value" className="pg-char-count">
                    {`${value.length}/${maxLength}`}
                </p>
            </div>
        );
    },

    inputGroup: () => {
        const { placeholder, headerLabel, footerCount, footerAction } = textareaPlaygroundSections.inputGroup;

        return (
            <div className="pg-demo-stack pg-demo-narrow">
                <InputGroup>
                    <InputGroupAddon align="block-start">
                        <InputGroupText>{headerLabel}</InputGroupText>
                    </InputGroupAddon>
                    <InputGroupTextarea placeholder={placeholder} rows={4} />
                </InputGroup>
                <InputGroup>
                    <InputGroupTextarea placeholder={placeholder} rows={4} />
                    <InputGroupAddon align="block-end">
                        <div className="pg-input-group-block-footer">
                            <InputGroupText>{footerCount}</InputGroupText>
                            <InputGroupButton>{footerAction}</InputGroupButton>
                        </div>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        );
    },
};
