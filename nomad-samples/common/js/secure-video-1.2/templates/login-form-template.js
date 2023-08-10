import * as uiHelpers from "../helpers/ui-helpers.js";
import login from "../account/login.js";

export async function validateAndLogin() {
    try {
        const username = document.getElementById("nomad-email").value;
        const password = document.getElementById("nomad-password").value;
        const assetId = document.getElementById("asset-id").value;
        const usernameError = document.getElementById("nomad-email-error");
        const passwordError = document.getElementById("nomad-password-error");
        const assetIdError = document.getElementById("asset-id-error");

        uiHelpers.removeCssClass(usernameError, "visible");
        uiHelpers.removeCssClass(passwordError, "visible");
        uiHelpers.removeCssClass(assetIdError, "visible");

        if (!username) {
            uiHelpers.addCssClass(usernameError, "visible");
        }

        if (!password) {
            uiHelpers.addCssClass(passwordError, "visible");
        }

        if (!assetId) {
            uiHelpers.addCssClass(assetIdError, "visible");
        }

        if (!username || !password || !assetId) {
            return;
        }

        uiHelpers.showWaitIndicator();

        const authToken = await login(username, password);

        sessionStorage.setItem("authToken", authToken);

        return authToken;
    } finally {
        uiHelpers.hideWaitIndicator();
    }
}
