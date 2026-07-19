import type { Component } from 'vue';

import BasicUsageSection from './BasicUsageSection.vue';
import CraftComparisonSection from './CraftComparisonSection.vue';
import DropdownSection from './DropdownSection.vue';
import MenuTriggerSection from './MenuTriggerSection.vue';
import OrientationSection from './OrientationSection.vue';
import PopoverSection from './PopoverSection.vue';
import RegularButtonsSection from './RegularButtonsSection.vue';
import SeparatorsSection from './SeparatorsSection.vue';
import SizesSection from './SizesSection.vue';
import SplitActionsSection from './SplitActionsSection.vue';
import ToolbarControlsSection from './ToolbarControlsSection.vue';
import VariantsSection from './VariantsSection.vue';

/** Vue previews — one component per section id from buttonGroupPlaygroundSpec. */
export const buttonGroupVueSectionComponents: Record<string, Component> = {
    craftComparison: CraftComparisonSection,
    basicUsage: BasicUsageSection,
    menuTrigger: MenuTriggerSection,
    regularButtons: RegularButtonsSection,
    separators: SeparatorsSection,
    variants: VariantsSection,
    splitActions: SplitActionsSection,
    sizes: SizesSection,
    orientation: OrientationSection,
    toolbarControls: ToolbarControlsSection,
    dropdown: DropdownSection,
    popover: PopoverSection,
};
