import * as prjConstants from "./constants/project-constants.js";
import * as sysConstants from "./constants/system-constants.js";
import * as uiHelpers from "./helpers/ui-helpers.js";
import * as templateHelpers from "./helpers/template-helpers.js";
import * as loginForm from "./templates/login-form-template.js";

import logout from "./account/logout.js";
import searchAssetsByType from "./search/search-assets-by-type.js";
import VanillaTilt from "./lib/vanilla-tilt.js";

/**
 * Clear session
 */
sessionStorage.clear();

/**
 * Global
 *
 */
let loginFormTemplate;
let loginButton;
let logoutButton;
let videoWrapper;
let authToken;
let isInitialized = false;

/**
 * Initialize
 *
 */
async function init() {
    if (!isInitialized) {
        // Give feedback to the console
        console.log("Initializing...");

        loginFormTemplate = await templateHelpers.loadTemplate("login-form-template.html");
        loginButton = document.getElementById("nomad-login-button");
        logoutButton = document.getElementById("nomad-logout-button");
        videoWrapper = document.getElementById("nomad-video-wrapper");

        if (loginButton) {
            loginButton.addEventListener("click", async (evt) => signIn(evt));
        }

        if (logoutButton) {
            logoutButton.addEventListener("click", async (evt) => signOut(evt));
            uiHelpers.hide(logoutButton);
        }

        isInitialized = true;
    }

    authToken = sessionStorage.getItem("authToken");

    if (!authToken) {
        uiHelpers.hide(videoWrapper);
        uiHelpers.show(loginFormTemplate);
    } else {
        uiHelpers.hide(loginFormTemplate);
        uiHelpers.show(videoWrapper);

        // Get video assets
        getVideos();
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
        uiHelpers.showWaitIndicator();

        authToken = await loginForm.validateAndLogin();

        if (authToken) {
            // Give feedback to the console
            console.log("User logged in successfully");

            uiHelpers.show(logoutButton);
            uiHelpers.show(videoWrapper);
            uiHelpers.hide(loginFormTemplate);
        }
    } catch (error) {
        await uiHelpers.errorAlert(error);
    } finally {
        uiHelpers.hideWaitIndicator();
    }

    if (authToken) {
        // Get the videos
        await getVideos();
    }
}

/**
 * Logout
 *
 * @param {event} evt
 */
async function signOut(evt) {
    if (evt && evt.cancellable) {
        evt.preventDefault();
    }

    try {
        uiHelpers.showWaitIndicator();
        await logout();
        authToken = undefined;
        sessionStorage.removeItem("authToken");
        uiHelpers.hide(logoutButton);
        init();
    } catch (error) {
        throw new Error(`Logout failed: ${error}`);
    } finally {
        uiHelpers.hideWaitIndicator();
    }
}

/**
 * Get Videos
 *
 */
async function getVideos() {
    try {
        // Give feedback to the console
        console.log("Getting video assets...");

        // Get the video container element
        const videoContainer = document.getElementById("nomad-video-container");

        // Check the required container exists
        if (!videoContainer) {
            await uiHelpers.errorAlert("Get Videos failed: Required container element not found");
            return;
        }

        // Empty the video container
        videoContainer.innerHTML = null;

        // Search videos in the specified folder
        const videoAssets = await searchAssetsByType(authToken, sysConstants.ASSET_TYPE_FILE_ENUM, sysConstants.MEDIA_TYPE_VIDEO_ENUM, 0, 50, prjConstants.PUBLIC_FOLDER_ID, true);

        // Check if videos were found
        if (videoAssets && videoAssets.hasItems) {
            let thumbnail = "";

            // Loop all videos
            videoAssets.items.forEach((video) => {
                // Get the video thumbnail image URL
                if (video.identifiers.thumbnailImageFullUrl) {
                    thumbnail = video.identifiers.thumbnailImageFullUrl;
                }

                // If video has no thumbnail use default image
                if (!thumbnail || thumbnail.trim().length === 0) {
                    thumbnail = "./images/no-thumbnail.jpg";
                }

                // Build the video card element
                const card = `
                <div class="nomad-video-card" data-tilt data-tilt-max="15" data-tilt-speed="1000" data-tilt-perspective="1000" data-tilt-scale="1.22">
                    <button class="nomad-video-btn" id="${video.id}" nomad-title="${video.title}" nomad-full-url="${video.identifiers.fullUrl}">
                        <div class="nomad-video-img" style="background-image: url('${thumbnail}')">
                        </div>
                        <div class="nomad-video-info">
                            <p class="nomad-video-name">${video.title}</p>
                        </div>
                    </button>
                </div>`;

                // Add the card to the container
                videoContainer.insertAdjacentHTML("beforeend", card);
            });

            // Get all the nomad video buttons
            const buttons = document.querySelectorAll(".nomad-video-btn");

            // Add play video event to each button
            buttons.forEach((button) => {
                button.addEventListener("click", (evt) => openVideo(evt));
            });

            // Add Tilt effect
            VanillaTilt.init(document.querySelectorAll(".nomad-video-card"));
        } else {
            uiHelpers.errorAlert("No video assets found in the specified folder");
        }
    } catch (error) {
        uiHelpers.errorAlert(error);
    }
}

/**
 * Open selected video in a new tab
 *
 * @param {event} evt
 */
function openVideo(evt) {
    if (evt && evt.cancelable) {
        evt.preventDefault();
    }

    // Open the clicked video in a new tab
    window.open("video-page.html", "_blank");
}

/**
 * Wait for the DOM to load
 *
 */
window.addEventListener("DOMContentLoaded", async (event) => {
    console.log("DOM Ready...");
    init();
});
