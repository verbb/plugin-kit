import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
//#region src/utils/cn.ts
/** Merge class names with Tailwind conflict resolution. */
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
export { cn };

//# sourceMappingURL=cn.js.map