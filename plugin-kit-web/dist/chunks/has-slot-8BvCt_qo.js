//#region src/internal/has-slot.ts
/** Detects whether named slots have assigned content —  `HasSlotController`. */
var HasSlotController = class {
	constructor(host, ...slotNames) {
		this.host = host;
		this.boundSlots = /* @__PURE__ */ new Set();
		this.lastHasContent = /* @__PURE__ */ new Map();
		this.handleSlotChange = () => {
			let changed = false;
			for (const name of this.slotNames) {
				const has = this.test(name);
				if (this.lastHasContent.get(name) !== has) {
					this.lastHasContent.set(name, has);
					changed = true;
				}
			}
			if (changed) this.host.requestUpdate();
		};
		this.slotNames = slotNames;
		host.addController(this);
	}
	hostConnected() {
		this.bindSlotListeners();
	}
	hostUpdated() {
		this.bindSlotListeners();
	}
	hostDisconnected() {
		for (const slot of this.boundSlots) slot.removeEventListener("slotchange", this.handleSlotChange);
		this.boundSlots.clear();
	}
	/**
	* Bind a `slotchange` listener to each watched slot once it exists.
	*
	* Deliberately does NOT call `requestUpdate()` here: this runs from
	* `hostUpdated()` (after an update completes), so requesting one would trigger
	* Lit's "scheduled an update after an update completed" warning and, if a
	* slot's element identity changed between renders, an infinite update loop.
	* The initial render already reflects light-DOM content (children exist before
	* upgrade), and the initial `slotchange` covers any late-assigned content — so
	* `handleSlotChange` is the single, deduped path that schedules re-renders.
	*/
	bindSlotListeners() {
		for (const name of this.slotNames) {
			const slot = this.findSlot(name);
			if (!slot || this.boundSlots.has(slot)) continue;
			this.boundSlots.add(slot);
			slot.addEventListener("slotchange", this.handleSlotChange);
			if (!this.lastHasContent.has(name)) this.lastHasContent.set(name, this.test(name));
		}
	}
	findSlot(name) {
		if (!this.host.shadowRoot) return null;
		if (!name) return this.host.shadowRoot.querySelector("slot:not([name])");
		return this.host.shadowRoot.querySelector(`slot[name="${name}"]`);
	}
	test(name, ssrFlag = false) {
		if (ssrFlag) return true;
		if (this.hasLightDomSlotContent(name)) return true;
		const slot = this.findSlot(name);
		if (!slot) return false;
		return slot.assignedNodes({ flatten: true }).some((node) => {
			if (node.nodeType === Node.TEXT_NODE) return Boolean(node.textContent?.trim());
			return node.nodeType === Node.ELEMENT_NODE;
		});
	}
	hasLightDomSlotContent(name) {
		return [...this.host.children].some((child) => child.getAttribute("slot") === name);
	}
};
//#endregion
export { HasSlotController as t };

//# sourceMappingURL=has-slot-8BvCt_qo.js.map