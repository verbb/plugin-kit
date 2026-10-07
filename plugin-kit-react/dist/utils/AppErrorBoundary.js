import { ErrorState } from "./ErrorState.js";
import { Component } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/utils/AppErrorBoundary.tsx
/**
* Class error boundary for full React CP apps. Renders {@link ErrorState} on catch.
*/
var AppErrorBoundary = class extends Component {
	state = {
		hasError: false,
		error: null
	};
	static getDerivedStateFromError(error) {
		return {
			hasError: true,
			error
		};
	}
	componentDidCatch(error, info) {
		console.error(this.props.consoleLabel || "React app crashed:", error, info);
	}
	render() {
		if (!this.state.hasError) return this.props.children;
		const { heading, message, detailsLabel, copyLabel, copiedLabel, copyErrorLabel, reloadLabel, size, className } = this.props;
		return /* @__PURE__ */ jsx(ErrorState, {
			error: this.state.error,
			heading,
			message,
			detailsLabel,
			copyLabel,
			copiedLabel,
			copyErrorLabel,
			actionLabel: reloadLabel,
			size,
			onAction: () => {
				window.location.reload();
			},
			className
		});
	}
};
//#endregion
export { AppErrorBoundary };

//# sourceMappingURL=AppErrorBoundary.js.map