import * as uiHelpers from "../helpers/ui-helpers.js";
import login from "../account/login.js";

export async function validateAndLogin() {
    try {
        const username = document.getElementById("nomad-email").value;
        const password = document.getElementById("nomad-password").value;
        const usernameError = document.getElementById("nomad-email-error");
        const passwordError = document.getElementById("nomad-password-error");

        uiHelpers.removeCssClass(usernameError, "visible");
        uiHelpers.removeCssClass(passwordError, "visible");

        if (!username) {
            uiHelpers.addCssClass(usernameError, "visible");
        }

        if (!password) {
            uiHelpers.addCssClass(passwordError, "visible");
        }

        if (!username || !password) {
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
