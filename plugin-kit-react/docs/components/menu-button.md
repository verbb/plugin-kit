# MenuButton

Menu buttons combine a primary action with a related action menu. They work well when the main action should stay obvious but nearby alternatives still need to be available.

## Basic Usage

Use a primary label for the main action and keep the related menu items close by in the secondary dropdown.

<ComponentPreview src="./examples/menu-button-basic.preview.tsx" />

## Variants

Menu buttons follow the same button variant system so they can live comfortably alongside the rest of the action hierarchy.

<ComponentPreview src="./examples/menu-button-variants.preview.tsx" />

## Loading

Loading state should preserve the overall button shape while indicating that the grouped action is busy.

<ComponentPreview src="./examples/menu-button-loading.preview.tsx" />

## Sizes

Size scaling helps the control fit both dense toolbars and larger action areas.

<ComponentPreview src="./examples/menu-button-sizes.preview.tsx" />

## Icons

Icons in the menu items help related actions scan more quickly when the dropdown contains mixed actions.

<ComponentPreview src="./examples/menu-button-icons.preview.tsx" />

## Toolbar

Use menu buttons in action bars when one primary action has closely related secondary actions.

<ComponentPreview src="./examples/menu-button-toolbar.preview.tsx" />

## API reference

`MenuButton` uses this package's `DropdownMenu`, which wraps [Base UI Menu](https://base-ui.com/react/components/menu/). Use the Base UI API reference for menu behavior, checkbox and radio items, submenus, and controlled open state.
