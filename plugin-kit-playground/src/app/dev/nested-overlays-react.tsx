/**
 * React-driven nested overlay demos — loaded on demand by the nested overlays lab.
 */
import React, { useRef, useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { PluginKitProvider } from '@verbb/plugin-kit-react';
import { Button } from '@verbb/plugin-kit-react/components';
import { Dialog } from '@verbb/plugin-kit-react/components';
import { DropdownItem, DropdownMenu, DropdownSeparator } from '@verbb/plugin-kit-react/components';
import { Option, Select } from '@verbb/plugin-kit-react/components';

function DialogCloseButton() {
    return (
        <Button variant="none" className="pk-dialog__close" aria-label="Close" data-dialog-close>
            ×
        </Button>
    );
}

function NavigationCopyToSiteDemo() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [site, setSite] = useState('');
    const copyPendingRef = useRef(false);

    return (
        <div className="overlay-lab-react">
            <div className="overlay-lab-react__row">
                <span className="overlay-lab-react__row-label">Row chrome (simulated)</span>
                <DropdownMenu
                    onPkSelect={(event) => {
                        if (event.detail.value === 'copy-to-site') {
                            copyPendingRef.current = true;
                        }
                    }}
                    onPkAfterHide={() => {
                        if (!copyPendingRef.current) {
                            return;
                        }

                        copyPendingRef.current = false;
                        setDialogOpen(true);
                    }}
                >
                    <Button slot="trigger" withCaret aria-label="Row actions">
                        Actions
                    </Button>
                    <DropdownItem value="edit">Edit</DropdownItem>
                    <DropdownItem value="duplicate">Duplicate</DropdownItem>
                    <DropdownSeparator />
                    <DropdownItem value="copy-to-site">Copy to site…</DropdownItem>
                </DropdownMenu>
            </div>

            <p className="overlay-lab-react__hint">
                Uses <code>pk-after-hide</code> handoff + declarative <code>open</code>.
            </p>

            <Dialog
                open={dialogOpen}
                onPkOpenChange={(event) => {
                    setDialogOpen(event.detail.open);
                }}
                size="wide"
            >
                <div slot="header" className="pk-dialog__header">
                    <h3 className="pk-dialog__title">Copy to site</h3>
                    <DialogCloseButton />
                </div>
                <div className="pk-dialog__body" style={{ display: 'grid', gap: '1rem' }}>
                    <label style={{ display: 'grid', gap: '6px', fontSize: 13 }}>
                        Target site
                        <Select
                            placeholder="Choose a site…"
                            value={site}
                            onPkChange={(event) => {
                                setSite(event.detail.value);
                            }}
                        >
                            <Option value="craft">Craft demo</Option>
                            <Option value="commerce">Commerce</Option>
                            <Option value="blog">Blog</Option>
                        </Select>
                    </label>
                </div>
                <Button slot="footer" data-dialog-close>
                    Cancel
                </Button>
                <Button slot="footer" variant="primary" data-dialog-close disabled={!site}>
                    Copy
                </Button>
            </Dialog>
        </div>
    );
}

function ReactImmediateOpenDemo() {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <div className="overlay-lab-react">
            <DropdownMenu
                onPkSelect={(event) => {
                    if (event.detail.value === 'open-dialog') {
                        setDialogOpen(true);
                    }
                }}
            >
                <Button slot="trigger" withCaret aria-label="Risky menu">
                    Risky open
                </Button>
                <DropdownItem value="open-dialog">Open dialog immediately</DropdownItem>
            </DropdownMenu>

            <p className="overlay-lab-react__hint overlay-lab-react__hint--warn">
                Does <strong>not</strong> await <code>whenClosed()</code>.
            </p>

            <Dialog
                open={dialogOpen}
                onPkOpenChange={(event) => {
                    setDialogOpen(event.detail.open);
                }}
            >
                <div slot="header" className="pk-dialog__header">
                    <h3 className="pk-dialog__title">Immediate open</h3>
                    <DialogCloseButton />
                </div>
                <div className="pk-dialog__body">
                    <p style={{ margin: 0 }}>Opened in the same turn as menu close.</p>
                </div>
                <Button slot="footer" data-dialog-close>
                    Close
                </Button>
            </Dialog>
        </div>
    );
}

export async function mountNestedOverlaysReactDemo(
    host: HTMLElement,
    variant: 'safe' | 'risky',
): Promise<{ root: Root; unmount: () => void }> {
    const root = createRoot(host);
    root.render(
        <PluginKitProvider>
            {variant === 'safe' ? <NavigationCopyToSiteDemo /> : <ReactImmediateOpenDemo />}
        </PluginKitProvider>,
    );

    return {
        root,
        unmount: () => root.unmount(),
    };
}
