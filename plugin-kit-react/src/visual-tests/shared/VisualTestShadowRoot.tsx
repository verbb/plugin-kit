import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import pluginKitStyles from '../../css/style.css?inline';
import visualTestStyles from '../../../visual-tests/public/css/visual-tests.css?inline';
import { configurePluginKitReact, createCraftHostBridge } from '@verbb/plugin-kit-react/utils';

type VisualTestShadowRootProps = {
    children: React.ReactNode;
};

export const VisualTestShadowRoot = ({ children }: VisualTestShadowRootProps) => {
    const hostRef = useRef<HTMLDivElement | null>(null);
    const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (!hostRef.current) {
            return;
        }

        const shadowRoot = hostRef.current.shadowRoot ?? hostRef.current.attachShadow({ mode: 'open' });

        shadowRoot.querySelectorAll('style[data-visual-test-shadow-style]').forEach((node) => {
            node.remove();
        });

        [
            { id: 'plugin-kit', css: pluginKitStyles },
            { id: 'visual-tests', css: visualTestStyles },
        ].forEach(({ id, css }) => {
            if (!css) {
                return;
            }

            const style = document.createElement('style');
            style.setAttribute('data-visual-test-shadow-style', id);
            style.textContent = css;
            shadowRoot.appendChild(style);
        });

        let rootNode = shadowRoot.querySelector<HTMLElement>('[data-visual-test-shadow-root]');

        if (!rootNode) {
            rootNode = document.createElement('div');
            rootNode.setAttribute('data-visual-test-shadow-root', '');
            shadowRoot.appendChild(rootNode);
        }

        configurePluginKitReact({
            portalContainer: shadowRoot,
            portalClassName: 'visual-tests-ui',
            shadowRootSelectors: ['[data-visual-test-shadow-root]'],
            hostBridge: createCraftHostBridge(),
        });

        setMountNode(rootNode);
    }, []);

    return (
        <div ref={hostRef}>
            {mountNode ? createPortal(children, mountNode) : null}
        </div>
    );
};
