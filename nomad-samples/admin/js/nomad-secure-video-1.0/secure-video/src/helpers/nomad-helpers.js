const backdrop = document.getElementById("nomad-backdrop");
const waitIndicator = document.getElementById("nomad-wait-indicator");

export function showBackdrop() {
    if (backdrop) {
        if (!backdrop.classList.contains("visible")) {
            backdrop.classList.add("visible");
        }
    }
}

export function hideBackdrop() {
    if (backdrop) {
        if (backdrop.classList.contains("visible")) {
            backdrop.classList.remove("visible");
        }
    }
}

export function showWaitIndicator() {
    if (waitIndicator) {
        if (!waitIndicator.classList.contains("visible")) {
            showBackdrop();
            waitIndicator.classList.add("visible");
        }
    }
}

export function hideWaitIndicator() {
    if (waitIndicator) {
        if (waitIndicator.classList.contains("visible")) {
            hideBackdrop();
            waitIndicator.classList.remove("visible");
        }
    }
}

/**
 * Add CSS class
 * @param {HTMLElement} element
 * @param {string} cssClass
 */
export function addCssClass(element, cssClass) {
    if (element) {
        if (!element.classList.contains(cssClass)) {
            element.classList.add(cssClass);
        }
    }
}

/**
 * Remove CSS class
 * @param {HTMLElement} element
 * @param {string} cssClass
 */
export function removeCssClass(element, cssClass) {
    if (element) {
        if (element.classList.contains(cssClass)) {
            element.classList.remove(cssClass);
        }
    }
}

/**
 * Visibility constants
 */
export const visibilityModes = {
    Display: "display",
    Visibility: "visibility",
};

/**
 * Hide element
 * @param {*} element
 * @param {*} mode
 */
export function hide(element, mode = visibilityModes.Display) {
    if (!element) return;
    switch (mode) {
        case visibilityModes.Display:
            if (element.style.display != "none") {
                element.style.display = "none";
            }
            break;
        case visibilityModes.Visibility:
            if (element.style.visibility != "hidden") {
                element.style.visibility = "hidden";
            }
    }
}

/**
 * Show element
 * @param {*} element
 * @param {*} mode
 * @param {*} display
 */
export function show(element, mode = visibilityModes.Display, display = "flex") {
    if (!element) return;
    switch (mode) {
        case visibilityModes.Display:
            if (element.style.display != display) {
                element.style.display = display;
            }
            break;
        case visibilityModes.Visibility:
            if (element.style.visibility != "visible") {
                element.style.visibility = "visible";
            }
    }
}

/**
 *  Sleep
 * @param duration Enter duration in seconds
 */
export async function sleep(duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration * 1000);
    });
}

export function setCookie(cookieName, cookieValue, cookieExpiration, cookiePath = "/", expirationSeconds) {
    if (!cookieName || !cookieValue) {
        return;
    }

    if (cookieName.trim() === "") {
        return;
    }

    if (!expirationSeconds) {
        if (!window.cookieExpirationSeconds) {
            window.cookieExpirationSeconds = 3600;
        }
        expirationSeconds = window.cookieExpirationSeconds;
    }

    if (!cookieExpiration) {
        cookieExpiration = new Date();
        cookieExpiration.setMinutes(new Date().getMinutes() + expirationSeconds / 60);
        cookieExpiration = cookieExpiration.toUTCString();
    }

    document.cookie = `${cookieName}=${cookieValue}; path=${cookiePath}; expires=${cookieExpiration}; secure;`;
}

/**
 *
 * @param {*} cookieName
 */
export function getCookie(cookieName) {
    if (!cookieName) {
        return "";
    }

    cookieName += "=";

    let cookies = document.cookie.split(";");

    cookies.forEach((cookie) => {
        while (cookie.charAt(0) == " ") {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    });

    return "";
}

/**
 *
 * @param {*} name
 */
export function getCookieByName(name) {
    let match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    if (match) return match[2];
}

/**
 *
 * @param {*} cookieName
 */
export function deleteCookie(cookieName) {
    document.cookie = `${cookieName}=;expires=${new Date(0).toUTCString()}`;
}

/**
 *
 */
export function deleteCookies() {
    console.log("Deleting all cookies...");

    const cookieExpiration = new Date(0).toUTCString();
    const cookies = document.cookie.split(";");

    cookies.forEach((cookie) => {
        let equalIndex = cookie.indexOf("=");

        if (equalIndex < 1) {
            return;
        }

        let cookieName = cookie.substring(0, equalIndex).trim();

        document.cookie = `${cookieName}=; path=/; expires=${cookieExpiration}; secure`;
    });
}
