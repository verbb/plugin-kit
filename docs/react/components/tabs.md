# Tabs

Tabs organize related content into compact sections without leaving the current view.

## Basic Usage

Use standard tabs for the most common inline section switching pattern.

<ComponentPreview src="./examples/tabs-basic.preview.tsx" />

## Pane Tabs

Pane tabs are useful inside taller bounded regions where the tab list and content live together in the same panel.

<ComponentPreview src="./examples/tabs-pane.preview.tsx" />

## Modal Tabs

Modal tabs adapt the same pattern to dialog layouts where the tab content needs a slightly different structure.

<ComponentPreview src="./examples/tabs-modal.preview.tsx" />

## Sidebar Tabs

`variant="sidebar"` is the Craft-style vertical nav — group with `TabHeading`, and optionally slot `icon` / `status` on each `Tab`.

<ComponentPreview src="./examples/tabs-sidebar.preview.tsx" />

## Disabled and Overflow

Disabled tabs and scrollable tab lists — default, pane, and modal variants.

<ComponentPreview src="./examples/tabs-disabled-overflow.preview.tsx" />
