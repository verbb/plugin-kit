import type { ReactNode } from 'react';

export function CpPreview({ children }: { children: ReactNode }) {
    return (
        <div className="cp-preview" data-cp-preview="cp">
            <div id="main-content" className="content-pane">
                {children}
            </div>
        </div>
    );
}
