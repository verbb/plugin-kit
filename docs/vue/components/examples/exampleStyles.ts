import type { CSSProperties } from 'vue';

export const rowStyle: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    alignItems: 'center',
};

export const stackStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxWidth: '420px',
};

/** Live `Value:` readout — inline styles so the preview shadow host does not depend on Tailwind. */
export const valuePreviewStyle: CSSProperties = {
    borderRadius: '0.25rem',
    background: '#f1f5f9',
    padding: '0.75rem',
    fontSize: '12px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
};

export const valuePreviewStackStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    fontSize: '14px',
};

/** Color input demo chrome — inline styles for preview shadow hosts (matches Web docs). */
export const colorInputDemoStackStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    maxWidth: '20rem',
};

export const colorInputValueStyle: CSSProperties = {
    fontSize: '11px',
    color: '#4b5563',
};
