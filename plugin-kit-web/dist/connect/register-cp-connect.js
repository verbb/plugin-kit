import { t as PkButton } from "../chunks/pk-button-ntSVrer_.js";
import { PkIcon } from "../components/icon/pk-icon.js";
import { t as PkStatePanel } from "../chunks/pk-state-panel-BTo2xiug.js";
import { t as PkStatus } from "../chunks/pk-status-CdiRBRyh.js";
import { t as PkDialog } from "../chunks/pk-dialog-C7KZGpQs.js";
import { PkConnect } from "../components/connect/pk-connect.js";
import { PkConnectOauth } from "../components/connect/pk-connect-oauth.js";
import { registerIcons, xmark } from "@verbb/plugin-kit-icons";
import "@verbb/plugin-kit-web/plugin-kit.css";
import "@verbb/plugin-kit-web/styles/connect/pk-connect.css";
//#region src/connect/register-cp-connect.ts
var CP_CONNECT_CTORS = [
	PkButton,
	PkConnect,
	PkConnectOauth,
	PkDialog,
	PkIcon,
	PkStatePanel,
	PkStatus
];
var CP_CONNECT_TAGS = [
	"pk-icon",
	"pk-button",
	"pk-connect",
	"pk-connect-oauth",
	"pk-dialog",
	"pk-state-panel",
	"pk-status"
];
/** Register connect row WCs + CSS for Craft CP source/integration edit screens. */
async function registerCpConnectKit() {
	registerIcons({ xmark });
	for (const Ctor of CP_CONNECT_CTORS) if (typeof Ctor !== "function") throw new Error("Plugin Kit connect constructor missing from bundle");
	await Promise.all(CP_CONNECT_TAGS.map((tag) => customElements.whenDefined(tag)));
}
//#endregion
export { registerCpConnectKit };

//# sourceMappingURL=register-cp-connect.js.map