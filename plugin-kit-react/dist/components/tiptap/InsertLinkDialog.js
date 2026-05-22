import { cn } from "../../utils/classes.js";
import "../../utils/index.js";
import { Checkbox } from "../Checkbox.js";
import { useTranslation } from "../../hooks/useTranslation.js";
import "../../hooks/index.js";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../Dialog.js";
import { Input } from "../Input.js";
import { Label } from "../Label.js";
import { Button } from "../Button.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/tiptap/InsertLinkDialog.tsx
function InsertLinkDialog({ open, onOpenChange, initialValues = {}, onInsert }) {
	const t = useTranslation();
	const [url, setUrl] = useState(initialValues.url ?? "");
	const [text, setText] = useState(initialValues.text ?? "");
	const [openInNewTab, setOpenInNewTab] = useState(initialValues.openInNewTab ?? false);
	useEffect(() => {
		if (open) {
			setUrl(initialValues.url ?? "");
			setText(initialValues.text ?? "");
			setOpenInNewTab(initialValues.openInNewTab ?? false);
		}
	}, [
		open,
		initialValues.url,
		initialValues.text,
		initialValues.openInNewTab
	]);
	const handleInsert = () => {
		const trimmedUrl = url.trim();
		if (!trimmedUrl) return;
		onInsert({
			url: trimmedUrl,
			text: text.trim(),
			openInNewTab
		});
		onOpenChange(false);
	};
	const handleCancel = () => {
		onOpenChange(false);
	};
	const handleDialogKeyDownCapture = (event) => {
		if (event.key !== "Enter") return;
		const target = event.target;
		if (!(target instanceof HTMLInputElement)) return;
		if ([
			"checkbox",
			"radio",
			"button",
			"submit"
		].includes(target.type)) return;
		event.preventDefault();
		event.stopPropagation();
		handleInsert();
	};
	const isEditing = !!initialValues?.url?.trim();
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, {
			showCloseButton: true,
			onKeyDownCapture: handleDialogKeyDownCapture,
			className: cn("w-[90vw] h-[90vh]", "max-w-[650px]", "max-h-[450px]"),
			portalClassName: "plugin-kit-react-tiptap-dialog",
			children: [
				/* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: isEditing ? t("Update Link") : t("Insert Link") }) }),
				/* @__PURE__ */ jsx("div", {
					className: "h-full overflow-y-auto",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-4 p-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ jsxs(Label, {
									htmlFor: "link-url",
									children: [
										t("URL"),
										" ",
										/* @__PURE__ */ jsx("span", {
											className: "text-red-600",
											children: "*"
										})
									]
								}), /* @__PURE__ */ jsx(Input, {
									id: "link-url",
									value: url,
									onChange: (e) => {
										return setUrl(e.target.value);
									},
									placeholder: "https://",
									"aria-required": true
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ jsx(Label, {
									htmlFor: "link-text",
									children: t("Text")
								}), /* @__PURE__ */ jsx(Input, {
									id: "link-text",
									value: text,
									onChange: (e) => {
										return setText(e.target.value);
									},
									placeholder: t("Link text")
								})]
							}),
							/* @__PURE__ */ jsxs("label", {
								className: "flex items-center gap-2 cursor-pointer",
								children: [/* @__PURE__ */ jsx(Checkbox, {
									checked: openInNewTab,
									onCheckedChange: (checked) => {
										return setOpenInNewTab(!!checked);
									}
								}), /* @__PURE__ */ jsx("span", {
									className: "text-sm",
									children: t("Open link in new tab")
								})]
							})
						]
					})
				}),
				/* @__PURE__ */ jsxs(DialogFooter, {
					className: "flex flex-row gap-2",
					children: [/* @__PURE__ */ jsx(Button, {
						type: "button",
						onClick: handleCancel,
						children: t("Cancel")
					}), /* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: "primary",
						onClick: handleInsert,
						disabled: !url.trim(),
						children: isEditing ? t("Update") : t("Insert")
					})]
				})
			]
		})
	});
}
//#endregion
export { InsertLinkDialog };

//# sourceMappingURL=InsertLinkDialog.js.map