import { Component } from "react";
//#region src/fault/AppFaultBoundary.tsx
/** Catches React render/lifecycle errors in the builder subtree. */
var AppFaultBoundary = class extends Component {
	state = { hasError: false };
	static getDerivedStateFromError() {
		return { hasError: true };
	}
	componentDidCatch(error, info) {
		this.props.onFault({
			kind: "react",
			message: error.message,
			stack: info.componentStack ? `${error.stack ?? ""}\n\n${info.componentStack}` : error.stack
		});
	}
	render() {
		if (this.state.hasError) return null;
		return this.props.children;
	}
};
//#endregion
export { AppFaultBoundary };

//# sourceMappingURL=AppFaultBoundary.js.map