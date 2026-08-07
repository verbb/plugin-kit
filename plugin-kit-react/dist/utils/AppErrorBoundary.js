import { LargeErrorState } from "./LargeErrorState.js";
import { Component } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/utils/AppErrorBoundary.tsx
/**
* Class error boundary for full React CP apps. Renders {@link LargeErrorState}
* on catch — the shared Formie / Navigation / CP Nav crash pattern.
*/
var AppErrorBoundary = class extends Component {
	state = {
		hasError: false,
		error: null
	};
	static getDerivedStateFromError() {
		return { hasError: true };
	}
	componentDidCatch(error, info) {
		this.setState({ error });
		console.error(this.props.consoleLabel || "React app crashed:", error, info);
	}
	render() {
		if (!this.state.hasError) return this.props.children;
		const { title, message, detailsLabel, reloadLabel, containerClassName = "flex flex-1 items-center justify-center py-12", contentClassName = "flex flex-col items-center justify-center text-center" } = this.props;
		return /* @__PURE__ */ jsx(LargeErrorState, {
			error: this.state.error,
			title,
			message,
			detailsLabel,
			actionLabel: reloadLabel,
			onAction: () => {
				window.location.reload();
			},
			containerClassName,
			contentClassName
		});
	}
};
//#endregion
export { AppErrorBoundary };

//# sourceMappingURL=AppErrorBoundary.js.map