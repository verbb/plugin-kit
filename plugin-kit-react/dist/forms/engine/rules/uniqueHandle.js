import { translate } from "../../../utils/translation.js";
import { get } from "lodash-es";
//#region src/forms/engine/rules/uniqueHandle.ts
var isRecord = (value) => {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
};
var getHandleValue = (value) => {
	if (!isRecord(value)) return "";
	const settings = isRecord(value.settings) ? value.settings : {};
	return String(value.handle || settings.handle || "").trim();
};
var collectTopLevelFieldHandles = (values) => {
	const entries = [];
	(Array.isArray(values?.pages) ? values.pages : []).forEach((page, pageIndex) => {
		(Array.isArray(page?.rows) ? page.rows : []).forEach((row, rowIndex) => {
			(Array.isArray(row?.fields) ? row.fields : []).forEach((field, fieldIndex) => {
				const handle = getHandleValue(field);
				if (!handle) return;
				entries.push({
					path: `pages.${pageIndex}.rows.${rowIndex}.fields.${fieldIndex}.handle`,
					handle
				});
			});
		});
	});
	return entries;
};
var collectNestedFieldHandles = (values, parentFieldPath) => {
	const entries = [];
	const rows = get(values, `${parentFieldPath}.rows`, []);
	(Array.isArray(rows) ? rows : []).forEach((row, nestedRowIndex) => {
		(Array.isArray(row?.fields) ? row.fields : []).forEach((field, nestedFieldIndex) => {
			const handle = getHandleValue(field);
			if (!handle) return;
			entries.push({
				path: `${parentFieldPath}.rows.${nestedRowIndex}.fields.${nestedFieldIndex}.handle`,
				handle
			});
		});
	});
	return entries;
};
var collectNotificationHandles = (values) => {
	const entries = [];
	(Array.isArray(values?.notifications) ? values.notifications : []).forEach((notification, index) => {
		const handle = String(notification?.handle || "").trim();
		if (!handle) return;
		entries.push({
			path: `notifications.${index}.handle`,
			handle
		});
	});
	return entries;
};
var getScopedHandleEntries = (context) => {
	const { path, values } = context;
	const explicitScope = context?.field?.uniqueHandleScope;
	if (explicitScope === "topLevelFields") return collectTopLevelFieldHandles(values);
	if (explicitScope === "notifications") return collectNotificationHandles(values);
	if (explicitScope === "nestedSiblings") {
		const parentFieldPath = context?.field?.uniqueHandleScopePath;
		if (typeof parentFieldPath === "string" && parentFieldPath.trim() !== "") return collectNestedFieldHandles(values, parentFieldPath);
	}
	const nestedMatch = path.match(/^(pages\.\d+\.rows\.\d+\.fields\.\d+(?:\.rows\.\d+\.fields\.\d+)*)\.rows\.\d+\.fields\.\d+\.handle$/);
	if (nestedMatch) {
		const [, parentFieldPath] = nestedMatch;
		return collectNestedFieldHandles(values, parentFieldPath);
	}
	if (/^pages\.\d+\.rows\.\d+\.fields\.\d+\.handle$/.test(path)) return collectTopLevelFieldHandles(values);
	if (/^notifications\.\d+\.handle$/.test(path)) return collectNotificationHandles(values);
	return [];
};
var uniqueHandleRule = (value, label, args, context) => {
	if (!context?.path || !context?.values) return null;
	const handle = String(value ?? "").trim();
	if (!handle) return null;
	const entries = getScopedHandleEntries(context);
	const normalizedHandle = handle.toLowerCase();
	const scopedDuplicate = entries.some((entry) => {
		if (entry.path === context.path) return false;
		return entry.handle.toLowerCase() === normalizedHandle;
	});
	const reservedDuplicate = (Array.isArray(context.field?.reservedHandles) ? context.field.reservedHandles : []).some((reservedHandle) => {
		return String(reservedHandle || "").toLowerCase() === normalizedHandle;
	});
	if (!(scopedDuplicate || reservedDuplicate)) return null;
	return translate("{attribute} \"{value}\" has already been taken.", {
		attribute: label,
		value: handle
	});
};
//#endregion
export { uniqueHandleRule };

//# sourceMappingURL=uniqueHandle.js.map