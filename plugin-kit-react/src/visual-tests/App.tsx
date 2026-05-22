import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';

import { visualTests } from './cases';

const appStyle: CSSProperties = {
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: '280px minmax(0, 1fr)',
    background: '#f8fafc',
    color: '#0f172a',
};

const sidebarStyle: CSSProperties = {
    position: 'sticky',
    top: 0,
    alignSelf: 'start',
    height: '100vh',
    overflowY: 'auto',
    borderRight: '1px solid #e2e8f0',
    background: '#ffffff',
    padding: '24px 18px',
};

const sidebarTitleStyle: CSSProperties = {
    margin: 0,
    fontSize: '22px',
    fontWeight: 700,
    letterSpacing: '-0.02em',
};

const sidebarTextStyle: CSSProperties = {
    margin: '10px 0 0',
    fontSize: '14px',
    lineHeight: 1.6,
    color: '#475569',
};

const navStyle: CSSProperties = {
    marginTop: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
};

const contentStyle: CSSProperties = {
    minWidth: 0,
    minHeight: '100vh',
};

const mobileHeaderStyle: CSSProperties = {
    display: 'none',
    padding: '16px 20px 0',
};

function getSelectedTestId() {
    return window.location.hash.replace(/^#/, '') || visualTests[0]?.id || '';
}

export function App() {
    const [selectedId, setSelectedId] = useState(getSelectedTestId);

    useEffect(() => {
        const handleHashChange = () => {
            setSelectedId(getSelectedTestId());
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    useEffect(() => {
        if (!window.location.hash && visualTests[0]) {
            window.location.hash = visualTests[0].id;
        }
    }, []);

    const activeTest = useMemo(() => {
        return visualTests.find((visualTest) => visualTest.id === selectedId) ?? visualTests[0];
    }, [selectedId]);

    if (!activeTest) {
        return null;
    }

    return (
        <>
            <style>{`
                @media (max-width: 960px) {
                    .visual-tests-app {
                        grid-template-columns: 1fr !important;
                    }

                    .visual-tests-sidebar {
                        position: static !important;
                        height: auto !important;
                        border-right: 0 !important;
                        border-bottom: 1px solid #e2e8f0 !important;
                    }

                    .visual-tests-mobile-header {
                        display: block !important;
                    }
                }
            `}</style>

            <div className="visual-tests-app" style={appStyle}>
                <aside className="visual-tests-sidebar" style={sidebarStyle}>
                    <h1 style={sidebarTitleStyle}>Visual Tests</h1>
                    <p style={sidebarTextStyle}>
                        Lean bespoke regression surfaces for `plugin-kit-react`.
                    </p>

                    <nav aria-label="Visual tests" style={navStyle}>
                        {visualTests.map((visualTest) => {
                            const isActive = visualTest.id === activeTest.id;

                            return (
                                <a
                                    key={visualTest.id}
                                    href={`#${visualTest.id}`}
                                    style={{
                                        display: 'block',
                                        borderRadius: '12px',
                                        padding: '10px 12px',
                                        textDecoration: 'none',
                                        fontSize: '14px',
                                        fontWeight: isActive ? 700 : 600,
                                        color: isActive ? '#0f172a' : '#334155',
                                        background: isActive ? '#e2e8f0' : 'transparent',
                                    }}
                                >
                                    {visualTest.title}
                                </a>
                            );
                        })}
                    </nav>
                </aside>

                <main style={contentStyle}>
                    <div className="visual-tests-mobile-header" style={mobileHeaderStyle}>
                        <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#64748b' }}>
                            Visual Tests
                        </div>
                        <div style={{ marginTop: '6px', fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em' }}>
                            {activeTest.title}
                        </div>
                        <p style={{ margin: '10px 0 0', maxWidth: '60ch', fontSize: '14px', lineHeight: 1.6, color: '#475569' }}>
                            {activeTest.description}
                        </p>
                    </div>

                    <activeTest.Component />
                </main>
            </div>
        </>
    );
}
