import type { Component } from 'vue';

import CraftComparisonSection from './CraftComparisonSection.vue';
import IconsSection from './IconsSection.vue';
import LoadingSection from './LoadingSection.vue';
import VariantsAndSizesSection from './VariantsAndSizesSection.vue';

/** Vue previews — one component per section id from buttonPlaygroundSpec. */
export const buttonVueSectionComponents: Record<string, Component> = {
    craftComparison: CraftComparisonSection,
    variantsAndSizes: VariantsAndSizesSection,
    icons: IconsSection,
    loading: LoadingSection,
};
