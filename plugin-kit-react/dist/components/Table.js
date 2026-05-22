import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/components/Table.tsx
function Table({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "table-container",
		className: cn("border border-gray-200 rounded-md rounded-b-none overflow-x-auto"),
		children: /* @__PURE__ */ jsx("table", {
			"data-slot": "table",
			className: cn("w-full", className),
			...props
		})
	});
}
function TableHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("thead", {
		"data-slot": "table-header",
		className: cn("bg-gray-50", className),
		...props
	});
}
function TableBody({ className, ...props }) {
	return /* @__PURE__ */ jsx("tbody", {
		"data-slot": "table-body",
		className: cn("[&_tr:last-child]:border-0", "[&_tr]:bg-white", "relative", className),
		...props
	});
}
function TableFooter({ className, ...props }) {
	return /* @__PURE__ */ jsx("tfoot", {
		"data-slot": "table-footer",
		className: cn(className),
		...props
	});
}
var TableRow = forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("tr", {
		ref,
		"data-slot": "table-row",
		className: cn(className),
		...props
	});
});
TableRow.displayName = "TableRow";
function TableHead({ className, ...props }) {
	return /* @__PURE__ */ jsx("th", {
		"data-slot": "table-head",
		className: cn("whitespace-nowrap", "px-2 py-1.5! text-left text-xs font-medium text-gray-700", className),
		...props
	});
}
function TableCell({ className, ...props }) {
	return /* @__PURE__ */ jsx("td", {
		"data-slot": "table-cell",
		className: cn("h-[34px]", "whitespace-nowrap", "p-0 border-t border-gray-100 border-l border-l-gray-100 first:border-l-0", className),
		...props
	});
}
//#endregion
export { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow };

//# sourceMappingURL=Table.js.map