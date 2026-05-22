import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { Button } from "./Button.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClipboard } from "@fortawesome/pro-solid-svg-icons";
//#region src/components/CopyButton.tsx
async function copyToClipboardWithMeta(value) {
	await navigator.clipboard.writeText(value);
}
function CopyButton({ value, className, variant = "transparent", ...props }) {
	const [hasCopied, setHasCopied] = useState(false);
	useEffect(() => {
		const timeoutId = window.setTimeout(() => {
			setHasCopied(false);
		}, 2e3);
		return () => {
			window.clearTimeout(timeoutId);
		};
	}, [hasCopied]);
	return /* @__PURE__ */ jsxs(Button, {
		size: "icon",
		variant,
		className: cn(className),
		onClick: () => {
			copyToClipboardWithMeta(value);
			setHasCopied(true);
		},
		...props,
		children: [/* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Copy"
		}), hasCopied ? /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faCheck }) : /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faClipboard })]
	});
}
//#endregion
export { CopyButton, copyToClipboardWithMeta };

//# sourceMappingURL=CopyButton.js.map