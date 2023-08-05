import embedPublicVideo from "./embedded/embed-public-video.js";

// Get all elements with our attribute
const nomadEmbedVideoElements = document.querySelectorAll("[nomad-embed-video]");

// Globals
let dynamicPlayerCounter = 0;

/**
 * Initialize
 */
export async function init() {
    // Run this script only if there are elements
    if (nomadEmbedVideoElements && nomadEmbedVideoElements.length > 0) {
        console.log("Nomad Embed Video initializing...");

        // Loop all elements
        for (let index = 0; index < nomadEmbedVideoElements.length; index++) {
            // Get the current element
            const nomadEmbedVideoElement = nomadEmbedVideoElements[index];

            // Embed the video
            await embed(nomadEmbedVideoElement);
        }
    }
}

/**
 * Embed
 *
 * @param {HTMLElement} nomadEmbedVideoContainer
 */
export async function embed(nomadEmbedVideoContainer) {
    // Ignore if no container
    if (!nomadEmbedVideoContainer) {
        return;
    }

    let errorMessage = "";

    // Get the asset ID
    const assetId = nomadEmbedVideoContainer.getAttribute("nomad-embed-video");

    // Display error if not asset id
    if (!assetId) {
        errorMessage = "Error: Asset ID in  [nomad-embed-video] attribute was not set.";
        nomadEmbedVideoContainer.innerHTML = `<span class="nomad-error">${errorMessage}</span>`;
        console.error(errorMessage);
        return;
    }

    // Get the video to embed
    const video = await embedPublicVideo(assetId);

    // Display error if no video
    if (!video) {
        errorMessage = `Error: Asset with ID ${assetId} was not found.`;
        nomadEmbedVideoContainer.innerHTML = `<span class="nomad-error">${errorMessage}</span>`;
        console.error(errorMessage);
        return;
    }

    // Display error if video does not have a valid URL
    if (!video.fullUrl) {
        errorMessage = "Error: Asset Full URL is invalid.";
        nomadEmbedVideoContainer.innerHTML = `<span class="nomad-error">${errorMessage}</span>`;
        console.error(errorMessage);
        return;
    }

    // Set default properties
    let tracks = "";
    let autoplay = "";
    let showCaptions = false;

    // Get nomad attributes
    const nomadAttributes = nomadEmbedVideoContainer.getAttribute("nomad-attributes");

    // Parse Nomad attributes
    if (nomadAttributes) {
        autoplay = nomadAttributes.includes("autoplay") ? "autoplay muted" : "";
        showCaptions = nomadAttributes.includes("showCaptions");
    }

    // Add captions if required
    if (showCaptions) {
        if (video.transcripts && video.transcripts.length > 0) {
            video.transcripts.forEach((language) => {
                const isDefault = language.isDefault === true ? "default" : "";
                tracks += `<track kind="subtitles" src="${language.fullUrl}" srclang="${language.language}" label="${language.title}" ${isDefault} />`;
            });
        }
    }

    // Set default type
    let type = "video/mp4";

    // Set options based on type
    if (video.fullUrl.endsWith(".m3u8")) {
        type = "application/x-mpegURL";
    } else if (video.fullUrl.endsWith(".mpd")) {
        type = "application/dash+xml";
    }

    // Make all player IDs unique
    dynamicPlayerCounter += 1;
    const dynamicPlayerId = `PLAYER_${dynamicPlayerCounter}_${assetId.replaceAll("-", "_")}`;

    // Build video HTML tag
    const videoTag = `
        <video id="${dynamicPlayerId}" class="video-js" controls ${autoplay} crossorigin="use-credentials" width="650" height="320">
            <source src="${video.fullUrl}" type="${type}">
            ${tracks}
            <p class="vjs-no-js">Your browser does not support the video tag.</p>
        </video>
        `;

    // Add the video tag to the container
    nomadEmbedVideoContainer.innerHTML = videoTag;

    console.log(`Player added: ${dynamicPlayerId}`);
}

// Wait for DOM to load and then initialize
document.addEventListener("DOMContentLoaded", init);
