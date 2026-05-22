import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { jsx } from "react/jsx-runtime";
import { AnimatePresence, motion } from "framer-motion";
//#region src/components/FadeIn.tsx
var FadeIn = ({ show = true, children, className, duration = .2, delay = 0, ease = "easeInOut", ...props }) => {
	return /* @__PURE__ */ jsx(AnimatePresence, { children: show && /* @__PURE__ */ jsx(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: {
			duration,
			delay,
			ease
		},
		className: cn(className),
		...props,
		children
	}) });
};
//#endregion
export { FadeIn };

//# sourceMappingURL=FadeIn.js.map