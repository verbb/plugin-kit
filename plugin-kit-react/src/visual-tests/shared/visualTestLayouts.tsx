import type { CSSProperties, ReactNode } from 'react';

import { VisualTestShadowRoot } from './VisualTestShadowRoot';

type VisualTestPageProps = {
    eyebrow: string;
    title: string;
    description: ReactNode;
    maxWidth?: string;
    children: ReactNode;
};

type VisualTestSectionProps = {
    title: string;
    description: ReactNode;
    children: ReactNode;
};

type VisualTestCardProps = {
    children: ReactNode;
    overflowVisible?: boolean;
};

const pageStyle: CSSProperties = {
    margin: '0 auto',
    padding: '40px 32px',
    color: '#334155',
    fontSize: '14px',
};

const heroStyle: CSSProperties = {
    marginBottom: '40px',
};

const eyebrowStyle: CSSProperties = {
    marginBottom: '12px',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#64748b',
};

const titleStyle: CSSProperties = {
    margin: '0 0 12px',
    fontSize: '42px',
    lineHeight: 1.05,
    fontWeight: 650,
    letterSpacing: '-0.03em',
    color: '#0f172a',
};

const leadStyle: CSSProperties = {
    margin: 0,
    fontSize: '16px',
    lineHeight: 1.7,
    color: '#475569',
    maxWidth: '780px',
};

const sectionsStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
};

const sectionStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
};

const sectionIntroStyle: CSSProperties = {
    maxWidth: '760px',
};

const sectionTitleStyle: CSSProperties = {
    margin: '0 0 6px',
    fontSize: '28px',
    lineHeight: 1.2,
    fontWeight: 650,
    letterSpacing: '-0.02em',
    color: '#0f172a',
};

const sectionTextStyle: CSSProperties = {
    margin: 0,
    fontSize: '15px',
    lineHeight: 1.7,
    color: '#475569',
};

const cardShellStyle: CSSProperties = {
    border: '1px solid #e5e7eb',
    borderRadius: '16px',
    background: '#ffffff',
    boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
};

const cardPaddingStyle: CSSProperties = {
    padding: '32px',
};

const visualCardInnerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    background: '#ffffff',
};

export function VisualTestPage({
    eyebrow,
    title,
    description,
    maxWidth = '1280px',
    children,
}: VisualTestPageProps) {
    return (
        <div style={{ ...pageStyle, maxWidth }}>
            <div style={heroStyle}>
                <div style={eyebrowStyle}>{eyebrow}</div>
                <h1 style={titleStyle}>{title}</h1>
                <p style={leadStyle}>{description}</p>
            </div>

            <div style={sectionsStyle}>{children}</div>
        </div>
    );
}

export function VisualTestSection({ title, description, children }: VisualTestSectionProps) {
    return (
        <section style={sectionStyle}>
            <div style={sectionIntroStyle}>
                <h2 style={sectionTitleStyle}>{title}</h2>
                <p style={sectionTextStyle}>{description}</p>
            </div>

            {children}
        </section>
    );
}

export function VisualTestCard({ children, overflowVisible = false }: VisualTestCardProps) {
    return (
        <div
            style={{
                ...cardShellStyle,
                ...cardPaddingStyle,
                overflow: overflowVisible ? 'visible' : 'hidden',
            }}
        >
            <VisualTestShadowRoot>
                <div style={visualCardInnerStyle}>{children}</div>
            </VisualTestShadowRoot>
        </div>
    );
}
