import {
    buildCraftInputComparisonHtml,
    inputFieldStates,
    inputMatrixSizes,
    inputPlaygroundSections,
} from '@verbb/plugin-kit-playground';

import { Icon } from '@verbb/plugin-kit-react/components';
import { Input } from '@verbb/plugin-kit-react/components';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
} from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';
import { ComparisonRow, StateMatrixCell } from './shared/sectionHelpers.js';

/** React previews — one function per section id from inputPlaygroundSpec. */
export const inputReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    craftComparison: () => (
        <div className="cmp-layout">
            <div className="cmp-column">
                <span className="cmp-column-title">Plugin Kit</span>
                <div className="cmp-rows">
                    <ComparisonRow heading="Field states" layout="stack">
                        {inputFieldStates.map(({ label, placeholder, invalid, disabled, focus }) => (
                            <StateMatrixCell key={label} label={label}>
                                <Input
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
                <div dangerouslySetInnerHTML={{ __html: buildCraftInputComparisonHtml() }} />
            </div>
        </div>
    ),

    basicUsage: () => (
        <div className="pg-demo-narrow">
            <Input placeholder={inputPlaygroundSections.basicUsage.placeholder} />
        </div>
    ),

    sizes: () => (
        <div className="pg-demo-stack pg-demo-narrow">
            {inputMatrixSizes.map(({ label, size }) => (
                <Input key={size} placeholder={label} size={size} />
            ))}
        </div>
    ),

    widths: () => (
        <div className="pg-demo-stack">
            <div className="pg-demo-narrow">
                <Input placeholder={inputPlaygroundSections.widths.fullWidthPlaceholder} />
            </div>
            <Input
                placeholder={inputPlaygroundSections.widths.fixedWidthPlaceholder}
                style={{ width: '320px' }}
            />
        </div>
    ),

    inputGroup: () => (
        <div className="pg-demo-stack pg-demo-narrow">
            <InputGroup>
                <InputGroupInput placeholder={inputPlaygroundSections.inputGroupIcon.placeholder} />
                <InputGroupAddon align="inline-end">
                    <Icon icon="search" aria-hidden />
                </InputGroupAddon>
            </InputGroup>
        </div>
    ),

    inputGroupIcon: () => (
        <div className="pg-demo-stack pg-demo-narrow">
            <InputGroup>
                <InputGroupInput placeholder={inputPlaygroundSections.inputGroupIcon.placeholder} />
                <InputGroupAddon align="inline-end">
                    <Icon icon="search" aria-hidden />
                </InputGroupAddon>
            </InputGroup>
            <InputGroup>
                <InputGroupInput placeholder={inputPlaygroundSections.inputGroupIcon.placeholder} />
                <InputGroupAddon align="inline-end">
                    <Icon icon="search" aria-hidden />
                </InputGroupAddon>
            </InputGroup>
        </div>
    ),

    inputGroupText: () => {
        const {
            currencyPlaceholder,
            urlPlaceholder,
            emailPlaceholder,
            charsLeft,
        } = inputPlaygroundSections.inputGroupText;

        return (
            <div className="pg-demo-stack pg-demo-narrow">
                <InputGroup>
                    <InputGroupInput placeholder={currencyPlaceholder} />
                    <InputGroupAddon align="inline-start"><InputGroupText>$</InputGroupText></InputGroupAddon>
                    <InputGroupAddon align="inline-end"><InputGroupText>USD</InputGroupText></InputGroupAddon>
                </InputGroup>
                <InputGroup>
                    <InputGroupInput placeholder={urlPlaceholder} />
                    <InputGroupAddon align="inline-start"><InputGroupText>https://</InputGroupText></InputGroupAddon>
                    <InputGroupAddon align="inline-end"><InputGroupText>.com</InputGroupText></InputGroupAddon>
                </InputGroup>
                <InputGroup>
                    <InputGroupInput placeholder={emailPlaceholder} type="email" />
                    <InputGroupAddon align="inline-end"><InputGroupText>@company.com</InputGroupText></InputGroupAddon>
                </InputGroup>
                <InputGroup>
                    <InputGroupInput placeholder="Bio" />
                    <InputGroupAddon align="inline-end"><InputGroupText>{charsLeft}</InputGroupText></InputGroupAddon>
                </InputGroup>
            </div>
        );
    },

    inputGroupButton: () => (
        <div className="pg-demo-narrow">
            <InputGroup>
                <InputGroupInput placeholder={inputPlaygroundSections.inputGroupButton.urlPlaceholder} />
                <InputGroupAddon align="inline-start"><InputGroupText>https://</InputGroupText></InputGroupAddon>
                <InputGroupAddon align="inline-end">
                    <InputGroupButton>{inputPlaygroundSections.inputGroupButton.buttonLabel}</InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        </div>
    ),

    validation: () => (
        <div className="pg-demo-narrow">
            <Input placeholder={inputPlaygroundSections.validation.placeholder} invalid />
        </div>
    ),

    disabled: () => (
        <div className="pg-demo-narrow">
            <Input placeholder={inputPlaygroundSections.disabled.placeholder} disabled />
        </div>
    ),
};
