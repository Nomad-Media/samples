import * as uiHelpers from "./helpers/ui-helpers.js";
import * as loginForm from "./templates/login-form-template.js";
import * as templateHelpers from "./helpers/template-helpers.js";

import getAssetDetails from "./asset/get-asset-details.js";
import getRelatedAssetCookies from "./asset/get-related-asset-cookies.js";

/**
 * Clear session
 */
sessionStorage.clear();

/**
 * Global
 *
 */
let loginWrapper;
let loginButton;
let videoWrapper;
let selectElement;
let authToken;
let assetId;
let player;
let isInitialized = false;

/**
 * Initialize
 *
 */
async function init() {
    player = videojs("nomad-video-player");
    player.responsive(true);
    player.on("error", async () => {
        await uiHelpers.errorAlert(`Player Error: ${player.error().message}`);
    });

    if (!isInitialized) {
        // Give feedback to the console
        console.log("Initializing...");

        loginWrapper = await templateHelpers.loadTemplate("login-form-template.html");
        loginButton = document.getElementById("nomad-login-button");
        videoWrapper = document.getElementById("nomad-video-wrapper");
        selectElement = document.getElementById("related-videos");

        if (loginButton) {
            loginButton.addEventListener("click", async (evt) => signIn(evt));
        }

        if (selectElement) {
            selectElement.addEventListener("change", async (evt) => playSelectedVideo(evt));
        }

        isInitialized = true;
    }

    authToken = sessionStorage.getItem("authToken");

    // Set asset ID
    assetId = document.getElementById("asset-id").value;

    if (!authToken) {
        uiHelpers.hide(videoWrapper);
        uiHelpers.show(loginWrapper);
    } else {
        uiHelpers.hide(loginWrapper);
        uiHelpers.show(videoWrapper);

        getSecureVideo(assetId, authToken);
    }
}

/**
 *  Login
 *
 * @param {event} evt
 */
async function signIn(evt) {
    if (evt && evt.cancellable) {
        evt.preventDefault();
    }

    try {
        uiHelpers.showWaitIndicator("Logging in...");

        authToken = await loginForm.validateAndLogin();

        if (authToken) {
            // Give feedback to the console
            console.log("User logged in successfully");

            // Set asset ID
            assetId = document.getElementById("asset-id").value;

            uiHelpers.show(videoWrapper);
            uiHelpers.hide(loginWrapper);
        }
    } catch (error) {
        await uiHelpers.errorAlert(error);
    } finally {
        uiHelpers.hideWaitIndicator();
    }

    if (authToken && assetId) {
        getSecureVideo(assetId, authToken);
    }
}

/**
 * Get Secure Video and its related assets
 *
 * @param {string} authToken
 */
async function getSecureVideo(assetId, authToken) {
    // Check for valid parameters
    if (!assetId || !authToken) {
        await uiHelpers.errorAlert("Asset Id and Authorization Token are required to get secure video");
        return;
    }

    console.log(`Getting secure video for asset with ID: ${assetId}...`);

    try {
        uiHelpers.showWaitIndicator("Getting asset details...");

        // Clear the select related video dropdown
        while (selectElement.options.length > 1) {
            selectElement.remove(1);
        }

        // Get the asset details
        const details = await getAssetDetails(assetId, authToken);

        // Check for related videos
        if (details && details.relatedVideos && details.relatedVideos.length > 0) {
            // Loop all related videos in the array
            for (let index = 0; index < details.relatedVideos.length; index++) {
                // Assign current item to relatedVideo
                const relatedVideo = details.relatedVideos[index];

                console.log(relatedVideo);

                // Check if Apple HLS type, if not then skip it
                if (relatedVideo.title !== "Apple HLS") {
                    continue;
                }

                // Give feedback to the console
                console.log(`Adding ${relatedVideo.title} related video with ID ${relatedVideo.id} to the dropdown...`);

                // Create new select option
                const newOption = new Option(relatedVideo.title, relatedVideo.id);

                // Add full url attribute to select option
                newOption.setAttribute("full-url", relatedVideo.properties.fullUrl);

                // Add the select option to the select element
                selectElement.add(newOption, undefined);
            }
        } else {
            await uiHelpers.errorAlert(`No related videos were found for asset with ID ${assetId}...`);
        }
    } catch (error) {
        await uiHelpers.errorAlert(error);
    } finally {
        uiHelpers.hideWaitIndicator();
    }
}

/**
 *
 * @param {*} evt
 */
async function playSelectedVideo(evt) {
    if (evt && evt.cancellable) {
        evt.preventDefault();
    }

    if (!evt || !evt.target || !evt.target.value) {
        return;
    }

    try {
        // Reset the player
        player.reset();

        // Get the related asset Id from the selected option
        const relatedAssetId = evt.target.value;

        // Check for valid related asset Id
        if (!relatedAssetId) {
            await uiHelpers.errorAlert("The selected video does not have a related asset ID");
            return;
        }

        uiHelpers.showWaitIndicator("Getting related asset cookies...");

        const option = evt.target.options[evt.target.selectedIndex];
        const fullUrl = option.getAttribute("full-url");

        console.log(`Getting cookies for related video with ID ${relatedAssetId}...`);

        // Get the cookies
        const cookies = await getRelatedAssetCookies(assetId, relatedAssetId, authToken);

        if (cookies) {
            console.log("Setting cookies for secure video...");

            cookies.responseCookies.forEach((cookie) => {
                console.log("\tSetting cookie: ", cookie);
                document.cookie = cookie;
            });

            console.log("Updating player source...");

            player.src({
                src: fullUrl,
                type: "application/x-mpegURL",
                withCredentials: true
            });
        }
    } catch (error) {
        await uiHelpers.errorAlert(error);
    } finally {
        uiHelpers.hideWaitIndicator();
    }
}

/**
 * Wait for the DOM to load
 *
 */
window.addEventListener("DOMContentLoaded", async (event) => {
    console.log("DOM Ready...");
    window.HELP_IMPROVE_VIDEOJS = false;
    init();
});
