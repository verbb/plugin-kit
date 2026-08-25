import { t as PkButton } from "../chunks/pk-button-QpDDlRbG.js";
import { t as PkStatus } from "../chunks/pk-status-7_5dEuw-.js";
import { t as PkDialog } from "../chunks/pk-dialog-Ck1InIBC.js";
import { PkIcon } from "../components/icon/pk-icon.js";
import { PkConnect } from "../components/connect/pk-connect.js";
import { PkConnectOauth } from "../components/connect/pk-connect-oauth.js";
import { chevronRight, registerIcons, triangleExclamation, xmark } from "@verbb/plugin-kit-icons";
import "@verbb/plugin-kit-web/plugin-kit.css";
import "@verbb/plugin-kit-web/styles/connect/pk-connect.css";
//#region src/connect/register-cp-connect.ts
var CP_CONNECT_CTORS = [
	PkButton,
	PkConnect,
	PkConnectOauth,
	PkDialog,
	PkIcon,
	PkStatus
];
var CP_CONNECT_TAGS = [
	"pk-icon",
	"pk-button",
	"pk-connect",
	"pk-connect-oauth",
	"pk-dialog",
	"pk-status"
];
/** Register connect row WCs + CSS for Craft CP source/integration edit screens. */
async function registerCpConnectKit() {
	registerIcons({
		chevronRight,
		triangleExclamation,
		xmark
	});
	for (const Ctor of CP_CONNECT_CTORS) if (typeof Ctor !== "function") throw new Error("Plugin Kit connect constructor missing from bundle");
	await Promise.all(CP_CONNECT_TAGS.map((tag) => customElements.whenDefined(tag)));
}
//#endregion
export { registerCpConnectKit };

//# sourceMappingURL=register-cp-connect.js.map