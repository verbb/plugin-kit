// Full-library path: every curated glyph is available to `<pk-icon icon="…">`.
import '@verbb/plugin-kit-icons/all.js';

import { PkButton } from './components/button/pk-button.js';
import { PkButtonGroup } from './components/button-group/pk-button-group.js';
import { PkButtonGroupSeparator } from './components/button-group/pk-button-group-separator.js';
import { PkButtonGroupText } from './components/button-group/pk-button-group-text.js';
import { PkCheckbox } from './components/checkbox/pk-checkbox.js';
import { PkCheckboxSelect } from './components/checkbox-select/pk-checkbox-select.js';
import { PkCodeEditor } from './components/code-editor/pk-code-editor.js';
import { PkColorInput } from './components/color-input/pk-color-input.js';
import { PkCalendar } from './components/calendar/pk-calendar.js';
import { PkDatePicker } from './components/date-picker/pk-date-picker.js';
import { PkCombobox } from './components/combobox/pk-combobox.js';
import { PkCopyButton } from './components/copy-button/pk-copy-button.js';
import { PkDialog } from './components/dialog/pk-dialog.js';
import { PkDropdownLabel } from './components/dropdown-menu/pk-dropdown-label.js';
import { PkDropdownMenu } from './components/dropdown-menu/pk-dropdown-menu.js';
import { PkDropdownItem } from './components/dropdown-menu/pk-dropdown-item.js';
import { PkDropdownSeparator } from './components/dropdown-menu/pk-dropdown-separator.js';
import { PkEditableTable } from './components/editable-table/pk-editable-table.js';
import { PkField } from './components/field/pk-field.js';
import { PkIcon } from './components/icon/pk-icon.js';
import { PkInput } from './components/input/pk-input.js';
import { PkInputGroup } from './components/input-group/pk-input-group.js';
import { PkInputGroupAddon } from './components/input-group/pk-input-group-addon.js';
import { PkInputGroupButton } from './components/input-group/pk-input-group-button.js';
import { PkInputGroupInput } from './components/input-group/pk-input-group-input.js';
import { PkInputGroupText } from './components/input-group/pk-input-group-text.js';
import { PkInputGroupTextarea } from './components/input-group/pk-input-group-textarea.js';
import { PkLightswitch } from './components/lightswitch/pk-lightswitch.js';
import { PkOption } from './components/select/pk-option.js';
import { PkOptionGroup } from './components/select/pk-option-group.js';
import { PkPopover } from './components/popover/pk-popover.js';
import { PkPopup } from './components/popup/pk-popup.js';
import { PkRadio } from './components/radio-group/pk-radio.js';
import { PkRadioGroup } from './components/radio-group/pk-radio-group.js';
import { PkScrollArea } from './components/scroll-area/pk-scroll-area.js';
import { PkSelect } from './components/select/pk-select.js';
import { PkSeparator } from './components/separator/pk-separator.js';
import { PkSpinner } from './components/spinner/pk-spinner.js';
import { PkStatus } from './components/status/pk-status.js';
import { PkTab } from './components/tabs/pk-tab.js';
import { PkTabHeading } from './components/tabs/pk-tab-heading.js';
import { PkTabPanel } from './components/tabs/pk-tab-panel.js';
import { PkTabs } from './components/tabs/pk-tabs.js';
import { PkTextarea } from './components/textarea/pk-textarea.js';
import { PkTiptapContent } from './components/tiptap/pk-tiptap-content.js';
import { PkTiptapEditor } from './components/tiptap/pk-tiptap-editor.js';
import { PkTiptapInput } from './components/tiptap/pk-tiptap-input.js';
import { PkTimePicker } from './components/time-picker/pk-time-picker.js';
import { PkToggle } from './components/toggle/pk-toggle.js';
import { PkToggleGroup } from './components/toggle-group/pk-toggle-group.js';
import { PkTooltip } from './components/tooltip/pk-tooltip.js';

export * from './components/button/index.js';
export * from './components/button-group/index.js';
export * from './components/checkbox/index.js';
export * from './components/checkbox-select/index.js';
export * from './components/input/index.js';
export * from './components/input-group/index.js';
export * from './components/textarea/index.js';
export * from './components/separator/index.js';
export * from './components/status/index.js';
export * from './components/toggle/index.js';
export * from './components/toggle-group/index.js';
export * from './components/lightswitch/index.js';
export * from './components/copy-button/index.js';
export * from './components/dialog/index.js';
export * from './components/dropdown-menu/index.js';
export * from './components/field/index.js';
export * from './components/popover/index.js';
export * from './components/popup/index.js';
export * from './components/tooltip/index.js';
export * from './components/radio-group/index.js';
export * from './components/tabs/index.js';
export * from './components/scroll-area/index.js';
export * from './components/color-input/index.js';
export * from './components/code-editor/index.js';
export * from './components/calendar/index.js';
export * from './components/date-picker/index.js';
export * from './components/select/index.js';
export * from './components/spinner/index.js';
export * from './components/time-picker/index.js';
export * from './components/tiptap/index.js';

export {
    PkButton,
    PkButtonGroup,
    PkButtonGroupSeparator,
    PkButtonGroupText,
    PkCheckbox,
    PkCheckboxSelect,
    PkColorInput,
    PkCodeEditor,
    PkCalendar,
    PkDatePicker,
    PkCombobox,
    PkCopyButton,
    PkDialog,
    PkDropdownMenu,
    PkDropdownItem,
    PkDropdownSeparator,
    PkEditableTable,
    PkField,
    PkIcon,
    PkInput,
    PkInputGroup,
    PkInputGroupAddon,
    PkInputGroupButton,
    PkInputGroupInput,
    PkInputGroupText,
    PkInputGroupTextarea,
    PkLightswitch,
    PkOption,
    PkOptionGroup,
    PkPopover,
    PkPopup,
    PkRadio,
    PkRadioGroup,
    PkScrollArea,
    PkSelect,
    PkSeparator,
    PkSpinner,
    PkStatus,
    PkTab,
    PkTabPanel,
    PkTabs,
    PkTextarea,
    PkTimePicker,
    PkTiptapContent,
    PkTiptapEditor,
    PkTiptapInput,
    PkToggle,
    PkToggleGroup,
    PkTooltip,
};

const COMPONENTS: [string, CustomElementConstructor][] = [
    ['pk-spinner', PkSpinner],
    ['pk-icon', PkIcon],
    ['pk-button', PkButton],
    ['pk-checkbox', PkCheckbox],
    ['pk-checkbox-select', PkCheckboxSelect],
    ['pk-color-input', PkColorInput],
    ['pk-code-editor', PkCodeEditor],
    ['pk-input', PkInput],
    ['pk-input-group', PkInputGroup],
    ['pk-input-group-addon', PkInputGroupAddon],
    ['pk-input-group-button', PkInputGroupButton],
    ['pk-input-group-input', PkInputGroupInput],
    ['pk-input-group-text', PkInputGroupText],
    ['pk-input-group-textarea', PkInputGroupTextarea],
    ['pk-textarea', PkTextarea],
    ['pk-tiptap-editor', PkTiptapEditor],
    ['pk-tiptap-input', PkTiptapInput],
    ['pk-tiptap-content', PkTiptapContent],
    ['pk-field', PkField],
    ['pk-separator', PkSeparator],
    ['pk-status', PkStatus],
    ['pk-toggle', PkToggle],
    ['pk-toggle-group', PkToggleGroup],
    ['pk-lightswitch', PkLightswitch],
    ['pk-button-group', PkButtonGroup],
    ['pk-button-group-separator', PkButtonGroupSeparator],
    ['pk-button-group-text', PkButtonGroupText],
    ['pk-dialog', PkDialog],
    ['pk-popup', PkPopup],
    ['pk-dropdown-label', PkDropdownLabel],
    ['pk-dropdown-item', PkDropdownItem],
    ['pk-dropdown-separator', PkDropdownSeparator],
    ['pk-dropdown-menu', PkDropdownMenu],
    ['pk-editable-table', PkEditableTable],
    ['pk-popover', PkPopover],
    ['pk-tooltip', PkTooltip],
    ['pk-radio', PkRadio],
    ['pk-radio-group', PkRadioGroup],
    ['pk-tab', PkTab],
    ['pk-tab-heading', PkTabHeading],
    ['pk-tab-panel', PkTabPanel],
    ['pk-tabs', PkTabs],
    ['pk-scroll-area', PkScrollArea],
    ['pk-option', PkOption],
    ['pk-option-group', PkOptionGroup],
    ['pk-select', PkSelect],
    ['pk-calendar', PkCalendar],
    ['pk-date-picker', PkDatePicker],
    ['pk-combobox', PkCombobox],
    ['pk-time-picker', PkTimePicker],
    ['pk-copy-button', PkCopyButton],
];

/** Side-effect registration for all Plugin Kit web components. */
export function registerAll(): void {
    for (const [tag, ctor] of COMPONENTS) {
        if (!customElements.get(tag)) {
            customElements.define(tag, ctor);
        }
    }
}

export {
    createRegisterComponents,
    type PkComponentTag,
} from './register-components.js';

export { BUNDLER_TAG_IMPORT_PATHS as componentImportPaths } from './component-registry.js';
