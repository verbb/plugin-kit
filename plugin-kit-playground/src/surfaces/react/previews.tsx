import {
    componentRegistry,
    REACT_ADAPTER_IDS,
    REACT_FULL_PREVIEW_IDS,
} from '@verbb/plugin-kit-playground';

import { buttonPreview } from './previews/ButtonPreview';
import { buttonGroupPreview } from './previews/ButtonGroupPreview';
import { calendarPreview } from './previews/CalendarPreview';
import { checkboxPreview } from './previews/CheckboxPreview';
import { checkboxSelectPreview } from './previews/CheckboxSelectPreview';
import { codeEditorPreview } from './previews/CodeEditorPreview';
import { colorInputPreview } from './previews/ColorInputPreview';
import { comboboxPreview } from './previews/ComboboxPreview';
import { copyButtonPreview } from './previews/CopyButtonPreview';
import { datePickerPreview } from './previews/DatePickerPreview';
import { dialogPreview } from './previews/DialogPreview';
import { dropdownMenuPreview } from './previews/DropdownMenuPreview';
import { editableTablePreview } from './previews/EditableTablePreview';
import { fieldPreview } from './previews/FieldPreview';
import { formsPreview } from './previews/FormsPreview';
import { iconPreview } from './previews/IconPreview';
import { inputPreview } from './previews/InputPreview';
import { lightswitchPreview } from './previews/LightswitchPreview';
import { popoverPreview } from './previews/PopoverPreview';
import { radioGroupPreview } from './previews/RadioGroupPreview';
import { scrollAreaPreview } from './previews/ScrollAreaPreview';
import { selectPreview } from './previews/SelectPreview';
import { separatorPreview } from './previews/SeparatorPreview';
import { spinnerPreview } from './previews/SpinnerPreview';
import { statusPreview } from './previews/StatusPreview';
import { tabsPreview } from './previews/TabsPreview';
import { textareaPreview } from './previews/TextareaPreview';
import { timePickerPreview } from './previews/TimePickerPreview';
import { tiptapContentPreview } from './previews/TiptapContentPreview';
import { tiptapEditorPreview } from './previews/TiptapEditorPreview';
import { tiptapInputPreview } from './previews/TiptapInputPreview';
import { toggleGroupPreview } from './previews/ToggleGroupPreview';
import { togglePreview } from './previews/TogglePreview';
import { tooltipPreview } from './previews/TooltipPreview';
import type { SurfacePreviewDefinition } from './types';
import { createBasicReactPreview } from './shared/createBasicPreview.js';

function PlaceholderPreview({ title, description }: { title: string; description: string }) {
    return (
        <div className="pg-page">
            <div className="pg-page__hero">
                <div className="pg-page__eyebrow">Workshop</div>
                <h1 className="pg-page__title">{title}</h1>
                <p className="pg-page__lead">{description}</p>
            </div>
            <div className="pg-card">
                <div className="pg-card__inner">
                    <p className="pg-placeholder__meta">Not implemented in plugin-kit-react yet</p>
                    <p className="pg-placeholder__copy">
                        Add a facade in plugin-kit-react, then wire a workshop preview.
                    </p>
                </div>
            </div>
        </div>
    );
}

const dedicatedPreviews = new Map<string, SurfacePreviewDefinition>([
    [buttonPreview.id, buttonPreview],
    [buttonGroupPreview.id, buttonGroupPreview],
    [calendarPreview.id, calendarPreview],
    [checkboxPreview.id, checkboxPreview],
    [checkboxSelectPreview.id, checkboxSelectPreview],
    [codeEditorPreview.id, codeEditorPreview],
    [colorInputPreview.id, colorInputPreview],
    [comboboxPreview.id, comboboxPreview],
    [copyButtonPreview.id, copyButtonPreview],
    [datePickerPreview.id, datePickerPreview],
    [dialogPreview.id, dialogPreview],
    [dropdownMenuPreview.id, dropdownMenuPreview],
    [fieldPreview.id, fieldPreview],
    [formsPreview.id, formsPreview],
    [editableTablePreview.id, editableTablePreview],
    [iconPreview.id, iconPreview],
    [inputPreview.id, inputPreview],
    [lightswitchPreview.id, lightswitchPreview],
    [popoverPreview.id, popoverPreview],
    [radioGroupPreview.id, radioGroupPreview],
    [scrollAreaPreview.id, scrollAreaPreview],
    [selectPreview.id, selectPreview],
    [separatorPreview.id, separatorPreview],
    [spinnerPreview.id, spinnerPreview],
    [statusPreview.id, statusPreview],
    [tabsPreview.id, tabsPreview],
    [textareaPreview.id, textareaPreview],
    [timePickerPreview.id, timePickerPreview],
    [tiptapContentPreview.id, tiptapContentPreview],
    [tiptapEditorPreview.id, tiptapEditorPreview],
    [tiptapInputPreview.id, tiptapInputPreview],
    [toggleGroupPreview.id, toggleGroupPreview],
    [togglePreview.id, togglePreview],
    [tooltipPreview.id, tooltipPreview],
]);

export const surfacePreviews: SurfacePreviewDefinition[] = componentRegistry.map((entry) => {
    const dedicated = dedicatedPreviews.get(entry.id);

    if (dedicated) {
        return dedicated;
    }

    if (REACT_ADAPTER_IDS.has(entry.id)) {
        return createBasicReactPreview(entry);
    }

    return {
        id: entry.id,
        title: entry.title,
        Component: () => (
            <PlaceholderPreview title={entry.title} description={entry.description} />
        ),
    };
});

export function getSurfacePreview(id: string): SurfacePreviewDefinition | undefined {
    return surfacePreviews.find((preview) => preview.id === id);
}

/** @deprecated Prefer `getSurfacePreview` — kept for coverage tooling. */
export const REACT_PREVIEW_IDS = new Set([
    ...REACT_FULL_PREVIEW_IDS,
    ...componentRegistry
        .filter((entry) => REACT_ADAPTER_IDS.has(entry.id) && !REACT_FULL_PREVIEW_IDS.has(entry.id))
        .map((entry) => entry.id),
]);
