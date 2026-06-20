import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { useTranslation } from "../hooks/useTranslation.js";
import "../hooks/index.js";
import { Label } from "../components/Label.js";
import { Markdown } from "../components/Markdown.js";
import "../components/index.js";
import { Slot } from "../components/Slot.js";
import { TranslationIcon } from "./TranslationIcon.js";
import { createContext, useContext, useId } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk, faTriangleExclamation } from "@fortawesome/pro-solid-svg-icons";
//#region src/forms/Field.tsx
var FieldContext = createContext(null);
var InlineFieldErrorVisibilityContext = createContext(true);
var useFieldContext = () => {
	const context = useContext(FieldContext);
	if (!context) throw new Error("Field components must be used within <FieldRoot>.");
	return context;
};
var FieldRoot = ({ name, errors = [], className, ...props }) => {
	const id = useId();
	return /* @__PURE__ */ jsx(FieldContext.Provider, {
		value: {
			id,
			name,
			errors
		},
		children: /* @__PURE__ */ jsx("div", {
			"data-slot": "field",
			className: cn("space-y-1.5", className),
			...props
		})
	});
};
var FieldHeader = ({ className, ...props }) => {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "field-header",
		className: cn(className),
		...props
	});
};
var FieldLabel = ({ className, ...props }) => {
	const { id, errors } = useFieldContext();
	return /* @__PURE__ */ jsx(Label, {
		"data-slot": "field-label",
		htmlFor: `${id}-control`,
		"data-error": errors.length > 0,
		className: cn("text-sm font-bold", className),
		...props
	});
};
var FieldInstructions = ({ className, children, ...props }) => {
	const { id } = useFieldContext();
	const content = typeof children === "string" ? children : null;
	const baseProps = {
		"data-slot": "field-instructions",
		id: `${id}-description`,
		className: cn("text-sm text-gray-500", className)
	};
	if (content !== null) return /* @__PURE__ */ jsx(Markdown, {
		content,
		inline: true,
		as: "p",
		...baseProps
	});
	return /* @__PURE__ */ jsx("p", {
		...baseProps,
		...props,
		children
	});
};
var FieldControl = ({ className, ...props }) => {
	const { id, errors } = useFieldContext();
	const isInvalid = errors.length > 0;
	return /* @__PURE__ */ jsx(Slot, {
		"data-slot": "field-control",
		id: `${id}-control`,
		"aria-invalid": isInvalid,
		"aria-describedby": `${id}-description ${id}-errors`,
		"aria-errormessage": isInvalid ? `${id}-errors` : void 0,
		className: cn(className),
		...props
	});
};
var FieldErrors = ({ className, ...props }) => {
	const { id, errors } = useFieldContext();
	if (!errors.length) return null;
	return /* @__PURE__ */ jsx("ul", {
		"data-slot": "field-errors",
		id: `${id}-errors`,
		className: cn("list-[square] text-error", className),
		style: {
			marginBlockStart: "5px",
			paddingInlineStart: "20px"
		},
		...props,
		children: errors.map((message, index) => {
			return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Markdown, {
				content: message,
				inline: true
			}) }, index);
		})
	});
};
var FieldLayout = ({ name, label, instructions, headerEnd, required, warning, errors = [], withControl = true, showInlineErrors, translatable = false, className, children, ...props }) => {
	const t = useTranslation();
	const contextShowInlineErrors = useContext(InlineFieldErrorVisibilityContext);
	const shouldShowInlineErrors = showInlineErrors ?? contextShowInlineErrors;
	return /* @__PURE__ */ jsxs(FieldRoot, {
		name,
		errors,
		className,
		...props,
		children: [
			label || instructions || headerEnd ? /* @__PURE__ */ jsxs(FieldHeader, {
				className: cn(headerEnd ? "flex items-start justify-between gap-3" : "space-y-0.5"),
				children: [/* @__PURE__ */ jsxs("div", {
					className: "min-w-0 space-y-0.5",
					children: [label && /* @__PURE__ */ jsxs(FieldLabel, {
						className: "flex items-center gap-1",
						children: [
							label,
							required && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("span", {
								className: "sr-only",
								children: t("Required")
							}), /* @__PURE__ */ jsx("span", {
								className: "text-rose-600",
								"aria-hidden": "true",
								children: /* @__PURE__ */ jsx(FontAwesomeIcon, {
									icon: faAsterisk,
									className: "size-[10px]"
								})
							})] }),
							translatable ? /* @__PURE__ */ jsxs("span", {
								className: "inline-flex",
								title: t("Translatable"),
								children: [/* @__PURE__ */ jsx(TranslationIcon, {}), /* @__PURE__ */ jsx("span", {
									className: "sr-only",
									children: t("Translatable")
								})]
							}) : null
						]
					}), instructions && /* @__PURE__ */ jsx(FieldInstructions, { children: instructions })]
				}), headerEnd && /* @__PURE__ */ jsx("div", {
					className: "shrink-0",
					children: headerEnd
				})]
			}) : null,
			withControl ? /* @__PURE__ */ jsx(FieldControl, { children }) : children,
			shouldShowInlineErrors && /* @__PURE__ */ jsx(FieldErrors, {}),
			warning && /* @__PURE__ */ jsxs("div", {
				className: "flex min-w-0 items-start gap-1 text-sm text-warning",
				children: [/* @__PURE__ */ jsx(FontAwesomeIcon, {
					icon: faTriangleExclamation,
					className: "mt-[0.3em] size-3 shrink-0"
				}), /* @__PURE__ */ jsx(Markdown, {
					className: "min-w-0",
					content: warning,
					inline: true,
					as: "p"
				})]
			})
		]
	});
};
//#endregion
export { FieldControl, FieldErrors, FieldHeader, FieldInstructions, FieldLabel, FieldLayout, FieldRoot, InlineFieldErrorVisibilityContext, useFieldContext };

//# sourceMappingURL=Field.js.map