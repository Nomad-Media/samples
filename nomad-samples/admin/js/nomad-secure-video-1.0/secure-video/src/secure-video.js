import login from "./login/login.js";
import getAssetDetails from "./asset/get-asset-detail.js";
import getRelatedVideoCookies from "./asset/get-asset-cookies.js";
import * as helper from "./helpers/nomad-helpers.js";

const loginWrapper = document.getElementById("nomad-login-wrapper");
const loginButton = document.getElementById("nomad-login-button");
const videoWrapper = document.getElementById("nomad-video-wrapper");
const selectElement = document.getElementById("related-videos");
selectElement.addEventListener("change", async (evt) => playSelectedVideo(evt));

let authToken = sessionStorage.getItem("authToken");
let assetId = undefined;

if (!authToken || !assetId) {
    helper.hide(videoWrapper);
    helper.show(loginWrapper);
    loginButton.addEventListener("click", async (evt) => validateAndLogin(evt));
} else {
    helper.hide(loginWrapper);
    helper.show(videoWrapper);
    getSecureVideo(assetId, authToken);
}

async function validateAndLogin(evt) {
    if (evt.cancellable) {
        evt.preventDefault();
    }

    try {
        // Set asset id globally
        assetId = document.getElementById("asset-id").value;

        const username = document.getElementById("nomad-email").value;
        const password = document.getElementById("nomad-password").value;
        const usernameError = document.getElementById("nomad-email-error");
        const passwordError = document.getElementById("nomad-password-error");
        const assetIdError = document.getElementById("asset-id-error");

        helper.removeCssClass(usernameError, "visible");
        helper.removeCssClass(passwordError, "visible");
        helper.removeCssClass(assetIdError, "visible");

        if (!username) {
            helper.addCssClass(usernameError, "visible");
        }

        if (!password) {
            helper.addCssClass(passwordError, "visible");
        }

        if (!assetId) {
            helper.addCssClass(assetIdError, "visible");
        }

        if (!username || !password || !assetId) {
            return;
        }

        helper.showWaitIndicator();
        console.log("Logging in..");
        authToken = await login(username, password);

        if (authToken) {
            sessionStorage.setItem("authToken", authToken);
            helper.show(videoWrapper);
            helper.hide(loginWrapper);
            await getSecureVideo(assetId, authToken);
        }
    } catch (x) {
        console.error(x.message);
    } finally {
        helper.hideWaitIndicator();
    }
}

/**
 * Get Secure Video and its related assets
 *
 * @param {string} authToken
 */
async function getSecureVideo(assetId, authToken) {
    console.log(`Getting secure video for asset with ID: ${assetId}...`);

    // Clear the select related video dropdown
    while (selectElement.options.length > 1) {
        selectElement.remove(1);
    }

    helper.showWaitIndicator();

    // Get the asset details
    const details = await getAssetDetails(assetId, authToken);

    helper.hideWaitIndicator();

    // Check for related videos
    if (details && details.relatedVideos) {
        // Loop all related videos in the array
        for (let index = 0; index < details.relatedVideos.length; index++) {
            // Assign current item to relatedVideo
            const relatedVideo = details.relatedVideos[index];

            // Check if Apple HLS type, if not then skip it
            if (relatedVideo.title != "Apple HLS") {
                continue;
            }

            console.log(`Adding ${relatedVideo.title} related video with ID ${relatedVideo.id} to the dropdown...`);

            // Create new select option
            let newOption = new Option(relatedVideo.title, relatedVideo.id);

            // Add full url attribute to select option
            newOption.setAttribute("full-url", relatedVideo.properties.fullUrl);

            // Add the select option to the select element
            selectElement.add(newOption, undefined);
        }

        return;
    }

    console.log(`No related videos were found for asset with ID ${assetId}...`);
}

const player = videojs("nomad-vide-player");
player.responsive(true);

/**
 *
 * @param {*} evt
 */
async function playSelectedVideo(evt) {
    if (evt.cancellable) {
        evt.preventDefault();
    }

    const relatedAssetId = evt.target.value;

    if (!relatedAssetId) {
        player.reset();
        return;
    }

    const option = evt.target.options[evt.target.selectedIndex];
    const fullUrl = option.getAttribute("full-url");

    console.log(`Getting cookies for related video with ID ${relatedAssetId}...`);

    helper.showWaitIndicator();

    const cookies = await getRelatedVideoCookies(assetId, relatedAssetId, authToken);

    helper.hideWaitIndicator();

    if (cookies) {
        console.log(`Setting cookies for secure video...`);

        cookies.forEach((cookie) => {
            console.log("\tSetting cookie: ", cookie);
            document.cookie = cookie;
        });

        console.log(`Resetting player...`);
        player.reset();

        console.log(`Updating player source...`);
        player.src({
            src: fullUrl,
            type: "application/x-mpegURL",
            withCredentials: true,
        });
    }
}
