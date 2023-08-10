const backdrop = document.getElementById("nomad-backdrop");
const waitIndicator = document.getElementById("nomad-wait-indicator");
const waitIndicatorMessage = document.getElementById("nomad-wait-indicator-message");
const progressIndicator = document.getElementById("nomad-progress-indicator");
const progressIndicatorBar = document.getElementById("nomad-progress-indicator-bar");
const progressIndicatorMessage = document.getElementById("nomad-progress-indicator-message");

// const progressIndicatorIcon = document.getElementById("nomad-progress-indicator-icon");

/**
 *  Show backdrop
 *
 */
export function showBackdrop() {
    if (backdrop) {
        if (!backdrop.classList.contains("visible")) {
            backdrop.classList.add("visible");
        }
    }
}

/**
 * Hide backdrop
 *
 */
export function hideBackdrop() {
    if (backdrop) {
        if (backdrop.classList.contains("visible")) {
            backdrop.classList.remove("visible");
        }
    }
}

/**
 *  Show spinning wait indicator
 *
 */
export function showWaitIndicator(message) {
    if (waitIndicator) {
        if (!waitIndicator.classList.contains("visible")) {
            showBackdrop();
            waitIndicator.classList.add("visible");
        }
        if (message && waitIndicatorMessage) {
            waitIndicatorMessage.innerHTML = `&nbsp;&nbsp;${message}`;
        }
    }
}

/**
 * Hide spinning wait indicator
 *
 */
export function hideWaitIndicator() {
    if (waitIndicator) {
        if (waitIndicator.classList.contains("visible")) {
            hideBackdrop();
            waitIndicator.classList.remove("visible");
        }
    }
}

/**
 * Add CSS class to an element
 *
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
 * Remove CSS class off an element
 *
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
 *
 */
export const visibilityModes = {
    Display: "display",
    Visibility: "visibility"
};

/**
 * Hide element
 *
 * @param {*} element
 * @param {*} mode
 */
export function hide(element, mode = visibilityModes.Display) {
    if (!element) return;
    switch (mode) {
        case visibilityModes.Display:
            if (element.style.display !== "none") {
                element.style.display = "none";
            }
            break;
        case visibilityModes.Visibility:
            if (element.style.visibility !== "hidden") {
                element.style.visibility = "hidden";
            }
    }
}

/**
 * Show element
 *
 * @param {*} element
 * @param {*} mode
 * @param {*} display
 */
export function show(element, mode = visibilityModes.Display, display = "flex") {
    if (!element) return;
    switch (mode) {
        case visibilityModes.Display:
            if (element.style.display !== display) {
                element.style.display = display;
            }
            break;
        case visibilityModes.Visibility:
            if (element.style.visibility !== "visible") {
                element.style.visibility = "visible";
            }
    }
}

/**
 * Visible element
 *
 * @param {*} element
 * @param {*} mode
 */
export function visible(element) {
    if (!element) return;
    if (element.style.visibility !== "visible") {
        element.style.visibility = "visible";
    }
}

/**
 * Hidden element
 *
 * @param {*} element
 * @param {*} mode
 */
export function hidden(element) {
    if (!element) return;
    if (element.style.visibility !== "hidden") {
        element.style.visibility = "hidden";
    }
}

/**
 * Error Alert
 *
 * @param {string} errorData
 */
export async function errorAlert(errorData) {
    let text = errorData;

    if (!errorData) {
        text = "An unknown error has occurred.";
    }

    // Also log error to the console
    console.error(errorData);

    await Swal.fire({
        title: "Error",
        text: text,
        icon: "error",
        heightAuto: false,
        allowOutsideClick: false
    });
}

/**
 * Error Alert
 *
 * @param {string} text
 */
export async function successAlert(title, text) {
    await Swal.fire({
        title: title,
        text: text,
        icon: "success",
        heightAuto: false,
        allowOutsideClick: false
    });
}

/**
 * Error Alert
 *
 * @param {string} text
 */
export async function infoAlert(title, text) {
    await Swal.fire({
        title: title,
        text: text,
        icon: "info",
        heightAuto: false,
        allowOutsideClick: false
    });
}

/**
 * Set progress indicator values
 *
 * @param {Number} value
 * @param {Number} max
 *
 */
export function setProgressIndicator(value, max) {
    if (!progressIndicatorBar) return;
    progressIndicatorBar.value = value;
    progressIndicatorBar.max = max;
}

/**
 * Increment progress indicator
 *
 * @param {Number} value
 *
 */
export function incrementProgressIndicator(increment) {
    if (!progressIndicatorBar) return;
    progressIndicatorBar.value = progressIndicatorBar.value + increment;
}

/**
 *  Show progress indicator
 *
 */
export function showProgressIndicator(message) {
    if (progressIndicator) {
        if (!progressIndicator.classList.contains("visible")) {
            progressIndicator.classList.add("visible");
        }
        if (message && progressIndicatorMessage) {
            progressIndicatorMessage.innerHTML = message;
        }
    }
}

/**
 * Hide progress indicator
 *
 */
export function hideProgressIndicator() {
    if (progressIndicator) {
        if (progressIndicator.classList.contains("visible")) {
            progressIndicator.classList.remove("visible");
        }
    }
}
