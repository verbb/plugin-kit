import type { ReactNode } from 'react';

type PlaygroundPageProps = {
    eyebrow: string;
    title: string;
    description: string;
    children: ReactNode;
};

export function PlaygroundPage({ eyebrow, title, description, children }: PlaygroundPageProps) {
    return (
        <div className="pg-page">
            <div className="pg-page__hero">
                <div className="pg-page__eyebrow">{eyebrow}</div>
                <h1 className="pg-page__title">{title}</h1>
                <p className="pg-page__lead">{description}</p>
            </div>
            <div className="pg-sections">{children}</div>
        </div>
    );
}

type PlaygroundSectionProps = {
    title: string;
    description: string;
    children: ReactNode;
};

export function PlaygroundSection({ title, description, children }: PlaygroundSectionProps) {
    return (
        <section className="pg-section">
            <div className="pg-section__intro">
                <h2 className="pg-section__title">{title}</h2>
                <p className="pg-section__description">{description}</p>
            </div>
            {children}
        </section>
    );
}

export function PreviewCard({
    children,
    overflowVisible = false,
}: {
    children: ReactNode;
    overflowVisible?: boolean;
}) {
    return (
        <div className={overflowVisible ? 'pg-card pg-card--overflow-visible' : 'pg-card'}>
            <div className="pg-card__inner">{children}</div>
        </div>
    );
}
