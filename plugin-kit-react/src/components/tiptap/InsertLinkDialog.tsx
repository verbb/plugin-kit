import { useState, useEffect } from 'react';
import type { KeyboardEvent } from 'react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@verbb/plugin-kit-react/components/Dialog';
import { Button } from '@verbb/plugin-kit-react/components/Button';
import { Input } from '@verbb/plugin-kit-react/components/Input';
import { Label } from '@verbb/plugin-kit-react/components/Label';
import { Checkbox } from '@verbb/plugin-kit-react/components/Checkbox';
import { useTranslation } from '@verbb/plugin-kit-react/hooks';
import { cn } from '@verbb/plugin-kit-react/utils';

export type InsertLinkDialogState = {
    url: string;
    text: string;
    openInNewTab: boolean;
};

type InsertLinkDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues?: Partial<InsertLinkDialogState>;
    onInsert: (values: InsertLinkDialogState) => void;
};

export function InsertLinkDialog({
    open,
    onOpenChange,
    initialValues = {},
    onInsert,
}: InsertLinkDialogProps) {
    const t = useTranslation();
    const [url, setUrl] = useState(initialValues.url ?? '');
    const [text, setText] = useState(initialValues.text ?? '');
    const [openInNewTab, setOpenInNewTab] = useState(initialValues.openInNewTab ?? false);

    useEffect(() => {
        if (open) {
            setUrl(initialValues.url ?? '');
            setText(initialValues.text ?? '');
            setOpenInNewTab(initialValues.openInNewTab ?? false);
        }
    }, [open, initialValues.url, initialValues.text, initialValues.openInNewTab]);

    const handleInsert = () => {
        const trimmedUrl = url.trim();
        if (!trimmedUrl) {
            return;
        }
        onInsert({ url: trimmedUrl, text: text.trim(), openInNewTab });
        onOpenChange(false);
    };

    const handleCancel = () => {
        onOpenChange(false);
    };

    const handleDialogKeyDownCapture = (event: KeyboardEvent<HTMLElement>) => {
        if (event.key !== 'Enter') {
            return;
        }

        const target = event.target as HTMLElement | null;
        if (!(target instanceof HTMLInputElement)) {
            return;
        }

        // Only hijack Enter for text-like inputs in this dialog.
        if (['checkbox', 'radio', 'button', 'submit'].includes(target.type)) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        handleInsert();
    };

    const isEditing = !!(initialValues?.url?.trim());

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton
                onKeyDownCapture={handleDialogKeyDownCapture}
                className={cn(
                    'w-[90vw] h-[90vh]',
                    'max-w-[650px]',
                    'max-h-[450px]',
                )}
                portalClassName="plugin-kit-react-tiptap-dialog"
            >
                <DialogHeader>
                    <DialogTitle>{isEditing ? t('Update Link') : t('Insert Link')}</DialogTitle>
                </DialogHeader>

                <div className="h-full overflow-y-auto">
                    <div className="flex flex-col gap-4 p-4">
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="link-url">
                                {t('URL')} <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                id="link-url"
                                value={url}
                                onChange={(e) => { return setUrl(e.target.value); }}
                                placeholder="https://"
                                aria-required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="link-text">{t('Text')}</Label>
                            <Input
                                id="link-text"
                                value={text}
                                onChange={(e) => { return setText(e.target.value); }}
                                placeholder={t('Link text')}
                            />
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <Checkbox
                                checked={openInNewTab}
                                onCheckedChange={(checked) => { return setOpenInNewTab(!!checked); }}
                            />
                            <span className="text-sm">{t('Open link in new tab')}</span>
                        </label>
                    </div>
                </div>

                <DialogFooter className="flex flex-row gap-2">
                    <Button type="button" onClick={handleCancel}>
                        {t('Cancel')}
                    </Button>
                    <Button type="button" variant="primary" onClick={handleInsert} disabled={!url.trim()}>
                        {isEditing ? t('Update') : t('Insert')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
