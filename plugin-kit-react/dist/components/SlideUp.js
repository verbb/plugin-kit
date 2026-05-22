import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { jsx } from "react/jsx-runtime";
import { AnimatePresence, motion } from "framer-motion";
//#region src/components/SlideUp.tsx
var SlideUp = ({ show = true, children, className, duration = .2, delay = 0, ease = "easeInOut", ...props }) => {
	return /* @__PURE__ */ jsx(AnimatePresence, {
		initial: false,
		children: show && /* @__PURE__ */ jsx(motion.div, {
			initial: {
				height: 0,
				opacity: 0
			},
			animate: {
				height: "auto",
				opacity: 1
			},
			exit: {
				height: 0,
				opacity: 0
			},
			transition: {
				duration,
				delay,
				ease
			},
			className: cn("overflow-hidden", className),
			...props,
			children
		})
	});
};
//#endregion
export { SlideUp };

//# sourceMappingURL=SlideUp.js.map