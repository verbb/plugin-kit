// Tier A — pass-through facades
export * from './ButtonGroup.js';
export * from './CopyButton.js';
export * from './Field.js';
export * from './Icon.js';
export * from './InputGroup.js';
export * from './Popover.js';
export * from './Popup.js';
export * from './ScrollArea.js';
export * from './Separator.js';
export * from './Status.js';
export * from './Toggle.js';
export * from './ToggleGroup.js';
export * from './Tooltip.js';

// Tier B — form-associated facades
export * from './Calendar.js';
export * from './CodeEditor.js';
export * from './ColorInput.js';
export * from './CheckboxSelect.js';
export * from './DatePicker.js';
export * from './Input.js';
export * from './Lightswitch.js';
export * from './RadioGroup.js';
export * from './Textarea.js';
export * from './TimePicker.js';
export * from './Tiptap.js';

// Tier C — overlay / compound facades
export * from './Combobox.js';
export * from './Dialog.js';
export * from './EditableTable.js';
export * from './DropdownMenu.js';
export * from './Select.js';
export * from './Tabs.js';

// Tier D — convenience wrappers with idiomatic controlled props
export * from './CheckboxInput.js';
export * from './ComboboxInput.js';
export * from './RadioGroupInput.js';
export * from './SelectInput.js';

// Hand-authored facades (typed props where it matters today)
export { Button, PkButtonElement, type ButtonProps } from './Button.js';
export { Checkbox, PkCheckboxElement, type CheckboxProps } from './Checkbox.js';
export { Spinner, PkSpinnerElement, type SpinnerProps } from './Spinner.js';
