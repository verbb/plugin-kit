// #region example
import type { ReactNode } from 'react';
import { Tab, TabPanel, Tabs } from '@verbb/plugin-kit-react/components';

const overflowTabs = [
    { value: 'general', label: 'General', content: 'General content' },
    { value: 'content', label: 'Content', content: 'Content settings' },
    { value: 'notifications', label: 'Notifications', content: 'Notification settings' },
    { value: 'integrations', label: 'Integrations', content: 'Integration settings' },
    { value: 'advanced', label: 'Advanced', content: 'Advanced settings', disabled: true },
] as const;

function OverflowTabs({
    variant,
}: {
    variant?: 'pane' | 'modal';
}) {
    return (
        <Tabs value="general" {...(variant ? { variant } : {})}>
            {overflowTabs.map(({ value, label, disabled }) => (
                <Tab key={value} slot="nav" value={value} disabled={disabled}>{label}</Tab>
            ))}
            {overflowTabs.map(({ value, content }) => (
                <TabPanel key={value} value={value}>{content}</TabPanel>
            ))}
        </Tabs>
    );
}

function VariantRow({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '5rem minmax(0,1fr)', gap: '1rem', alignItems: 'start' }}>
            <div style={{ paddingTop: '0.625rem', fontSize: 12, fontWeight: 600, color: '#64748b' }}>{label}</div>
            {children}
        </div>
    );
}

export function TabsDisabledOverflowExample() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 520 }}>
            <VariantRow label="Default">
                <div style={{ maxWidth: '28rem' }}>
                    <OverflowTabs />
                </div>
            </VariantRow>
            <VariantRow label="Pane">
                <div style={{ maxWidth: '28rem', height: 220 }}>
                    <OverflowTabs variant="pane" />
                </div>
            </VariantRow>
            <VariantRow label="Modal">
                <div style={{ maxWidth: '28rem', height: 220, overflow: 'hidden', border: '1px solid #e2e8f0', borderRadius: 6 }}>
                    <OverflowTabs variant="modal" />
                </div>
            </VariantRow>
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Disabled and Overflow',
    title: 'Disabled and overflowing tabs example',
    language: 'tsx',
    source: true,
    render: () => <TabsDisabledOverflowExample />,
};

export default preview;
