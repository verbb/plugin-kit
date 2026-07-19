# Dialog

Dialogs interrupt the current flow to confirm an action, gather focused input, or present short-form detail without leaving the page.

## Basic Usage

Use a trigger, content container, header, and footer to create a straightforward modal action flow.

<ComponentPreview src="./examples/dialog-basic.preview.web.ts" />

## Confirmation

Use confirmation dialogs for destructive or high-impact actions. Set `disable-pointer-dismissal` so a backdrop click cannot dismiss by accident.

<ComponentPreview src="./examples/dialog-confirmation.preview.web.ts" />

## Scrollable Content

Constrain long content inside the dialog body so actions remain reachable.

<ComponentPreview src="./examples/dialog-scrollable.preview.web.ts" />

## Initial Focus

Put `autofocus` on the control that should receive focus when the dialog opens (often the first field).

<ComponentPreview src="./examples/dialog-initial-focus.preview.web.ts" />
