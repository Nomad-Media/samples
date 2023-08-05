/* eslint-disable no-undef */
/* eslint-disable dot-notation */

import * as sysConstants from "./constants/system-constants.js";
import * as uiHelpers from "./helpers/ui-helpers.js";
import * as guidHelpers from "./helpers/guid-helpers.js";

import login from "./account/login.js";
import logout from "./account/logout.js";
import sleep from "./helpers/sleep.js";
import slugify from "./helpers/slugify.js";

import createLiveChannel from "./live-channel/create-live-channel.js";
import deleteLiveChannel from "./live-channel/delete-live-channel.js";
import startLiveChannel from "./live-channel/start-live-channel.js";
import stopLiveChannel from "./live-channel/stop-live-channel.js";
import getLiveChannelScheduleEvents from "./live-channel/get-live-channel-schedule-events.js";

import searchAssetsByType from "./search/search-assets-by-type.js";
import searchLiveChannel from "./search/search-live-channel.js";
import searchLiveChannels from "./search/search-live-channels.js";

import createLiveInput from "./live-input/create-live-input.js";
import deleteLiveInput from "./live-input/delete-live-input.js";
import getLiveInput from "./live-input/get-live-input.js";
import getLiveInputs from "./live-input/get-live-inputs.js";

import addAssetScheduleEvent from "./schedule-event/add-asset-schedule-event.js";
import addInputScheduleEvent from "./schedule-event/add-input-schedule-event.js";

import liveChannelTypes from "./live-channel/live-channel-types.js";
import liveInputTypes from "./live-input/live-input-types.js";

// Disable video.js Telemetry
window.HELP_IMPROVE_VIDEOJS = false;

// Clear session
sessionStorage.clear();

/**
 * Globals
 *
 */
const refreshInterval = 30000;
const liveChannelsPlaying = [];
let loadItemsInterval;
let token;
let player; // = videojs("nmd-player");

/**
 * Top menu
 */
const newInputButton = document.getElementById("new-input");
newInputButton.addEventListener("click", (evt) => addInput(evt));

const newChannelButton = document.getElementById("new-channel");
newChannelButton.addEventListener("click", (evt) => addChannel(evt));

const signOutButton = document.getElementById("sign-out");
signOutButton.addEventListener("click", (evt) => signOut(evt));

/**
 * Secondary menu
 */
const viewInputsButton = document.getElementById("view-inputs");
viewInputsButton.addEventListener("click", (evt) => viewInputs(evt));

const viewChannelsButton = document.getElementById("view-channels");
viewChannelsButton.addEventListener("click", (evt) => viewChannels(evt));

const reloadButton = document.getElementById("reload");
reloadButton.addEventListener("click", (evt) => reloadItems(evt));

/**
 * Constants
 */
const videoSection = document.getElementById("video-section");

const inputsSection = document.getElementById("inputs-section");
const channelsSection = document.getElementById("channels-section");

const inputItems = document.getElementById("input-items");
const channelItems = document.getElementById("channel-items");

const newInputForm = document.getElementById("new-input-form");
const newChannelForm = document.getElementById("new-channel-form");

const sectionHeaderInputLabel = document.getElementById("section-header-input");
const sectionHeaderChannelLabel = document.getElementById("section-header-channel");
const playingTitle = document.getElementById("playing-title");

const formInputId = document.getElementById("input-id");
const formChannelId = document.getElementById("channel-id");

const slateSelect = document.getElementById("slate");

/**
 * Create form buttons
 *
 */
const createInputButton = document.getElementById("create-input");
createInputButton.addEventListener("click", (evt) => createInput(evt));

const createChannelButton = document.getElementById("create-channel");
createChannelButton.addEventListener("click", (evt) => createChannel(evt));

/**
 * Cancel form buttons
 */
const cancelInputButton = document.getElementById("cancel-input");
cancelInputButton.addEventListener("click", (evt) => {
    if (evt && evt.cancelable) {
        evt.preventDefault();
    }

    uiHelpers.hide(newInputForm);
    uiHelpers.show(videoSection);
    uiHelpers.visible(newInputButton);
});

const cancelChannelButton = document.getElementById("cancel-channel");
cancelChannelButton.addEventListener("click", (evt) => {
    if (evt && evt.cancelable) {
        evt.preventDefault();
    }

    uiHelpers.hide(newChannelForm);
    uiHelpers.show(videoSection);
    uiHelpers.visible(newChannelButton);
});

/**
 * Listen input text fields to slugify
 */
const inputNameInput = document.getElementById("input-name");
const nameInput = document.getElementById("name");

/**
 * Show and hide elements based on live channel type
 */
const inputSourceLabel = document.getElementById("input-source-label");
const inputSourceInput = document.getElementById("input-source");
const inputLegendSpan = document.getElementById("input-legend");

const urlLabel = document.getElementById("url-label");
const urlInput = document.getElementById("url");
const normalSection = document.getElementById("normal");

const inputTypeSelect = document.getElementById("input-type");
inputTypeSelect.addEventListener("change", (evt) => onInputTypeSelectChange(evt));

const channelTypeSelect = document.getElementById("channel-type");
channelTypeSelect.addEventListener("change", (evt) => onChannelTypeSelectChange(evt));

/**
 * View Inputs Tab
 *
 */
function viewInputs() {
    channelsSection.style.display = "none";
    inputsSection.style.display = "flex";
}

/**
 * View Channels Tab
 *
 */
function viewChannels() {
    inputsSection.style.display = "none";
    channelsSection.style.display = "flex";
}

/**
 * Handle Input Type UI changes
 *
 * @param {Event} evt
 */
function onInputTypeSelectChange(evt) {
    if (evt && evt.cancelable) {
        evt.preventDefault();
    }

    if (inputTypeSelect.value === liveInputTypes.RTP_PUSH) {
        inputSourceLabel.innerText = "Source:";
        inputLegendSpan.innerText = "If set, must start with 'http' or 'rtmp'";
        inputSourceInput.required = false;
    } else if (inputTypeSelect.value === liveInputTypes.RTMP_PUSH) {
        inputSourceLabel.innerHTML = 'Source Video IP/CIDR Address<sup class="required">*</sup>:';
        inputLegendSpan.innerText = "Please use the following format: ###.###.###.###/##";
        inputSourceInput.required = true;
    } else if (inputTypeSelect.value === liveInputTypes.RTMP_PULL) {
        inputSourceLabel.innerHTML = 'Source<sup class="required">*</sup>:';
        inputLegendSpan.innerText = "";
        inputSourceInput.required = true;
    }
}

/**
 * Handle Channel Type UI changes
 *
 * @param {Event} evt
 */
function onChannelTypeSelectChange(evt) {
    if (evt && evt.cancelable) {
        evt.preventDefault();
    }

    if (channelTypeSelect.value === liveChannelTypes.External) {
        urlLabel.style.display = "block";
        urlInput.style.display = "block";
        urlInput.required = true;
    } else {
        urlLabel.style.display = "none";
        urlInput.style.display = "none";
        urlInput.required = false;
    }

    if (channelTypeSelect.value === liveChannelTypes.Normal) {
        normalSection.style.display = "flex";
    } else {
        normalSection.style.display = "none";
    }

    if (channelTypeSelect.value === liveChannelTypes.IVS) {
        urlLabel.style.display = "none";
        urlInput.style.display = "none";
        normalSection.style.display = "none";
    }
}

/**
 * Show and hide form elements for live channel of type Normal
 *
 */
const fileAssetSelect = document.getElementById("file-asset");
const fileAssetRadio = document.getElementById("file-asset-radio");

fileAssetRadio.addEventListener("click", (evt) => {
    if (fileAssetRadio.checked) {
        inputAssetSelect.value = "";
        inputAssetSelect.disabled = true;
        fileAssetSelect.disabled = false;
        fileAssetSelect.required = true;
    }
});

/**
 * Enable and disable form elements for live input type
 *
 */
const inputAssetSelect = document.getElementById("input-asset");
const inputAssetRadio = document.getElementById("input-asset-radio");

inputAssetRadio.addEventListener("click", (evt) => {
    if (inputAssetRadio.checked) {
        fileAssetSelect.value = "";
        fileAssetSelect.disabled = true;
        inputAssetSelect.disabled = false;
        inputAssetSelect.required = true;
    }
});

/**
 * Add Live Channel
 *
 * @param {Event} evt
 */
async function addChannel(evt) {
    if (evt && evt.cancelable) {
        evt.preventDefault();
    }

    uiHelpers.hidden(newChannelButton);
    uiHelpers.showWaitIndicator();

    sectionHeaderChannelLabel.innerText = "Create Channel";
    nameInput.value = "";
    channelTypeSelect.disabled = false;
    channelTypeSelect.value = liveChannelTypes.External;
    urlInput.value = "";
    channelTypeSelect.dispatchEvent(new Event("change"));
    slateSelect.value = "";
    fileAssetSelect.value = "";
    inputAssetSelect.value = "";
    formChannelId.value = null;

    await loadFilesIntoSelectOptions();
    await loadLiveInputsIntoSelectOptions();

    createChannelButton.innerText = "Create";
    uiHelpers.hide(videoSection);
    uiHelpers.hide(newInputForm);
    uiHelpers.visible(newInputButton);
    uiHelpers.show(newChannelForm);
    uiHelpers.hideWaitIndicator();
}

/**
 * Add live input
 *
 * @param {Event} evt
 */
async function addInput(evt) {
    if (evt && evt.cancelable) {
        evt.preventDefault();
    }

    uiHelpers.hidden(newInputButton);
    uiHelpers.showWaitIndicator();

    sectionHeaderInputLabel.innerText = "Create Input";
    inputNameInput.value = "";
    inputTypeSelect.disabled = false;
    inputTypeSelect.value = liveInputTypes.RTMP_PULL;
    inputSourceInput.value = "";
    inputTypeSelect.dispatchEvent(new Event("change"));
    formInputId.value = null;

    createInputButton.innerText = "Create";
    uiHelpers.hide(videoSection);
    uiHelpers.hide(newChannelForm);
    uiHelpers.visible(newChannelButton);
    uiHelpers.show(newInputForm);
    uiHelpers.hideWaitIndicator();
}

/**
 * Load video assets into select element
 *
 */
async function loadFilesIntoSelectOptions() {
    try {
        const files = await searchAssetsByType(token);

        if (files && files.hasItems) {
            const slateOptions = [...slateSelect.options];
            slateOptions.forEach((option) => {
                if (option.value !== "") {
                    option.remove();
                }
            });

            const fileAssetSelectOptions = [...fileAssetSelect.options];
            fileAssetSelectOptions.forEach((option) => {
                if (option.value !== "") {
                    option.remove();
                }
            });

            files.items.forEach((file) => {
                const option = document.createElement("option");
                option.value = file.id;
                option.innerText = file.title;

                slateSelect.appendChild(option);
                fileAssetSelect.appendChild(option.cloneNode(true));
            });
        }
    } catch (e) {
        await uiHelpers.errorAlert(e);
    }
}

/**
 * Load live inputs into select element
 *
 */
async function loadLiveInputsIntoSelectOptions() {
    try {
        const inputs = await getLiveInputs(token);

        if (inputs && inputs.length > 0) {
            const inputOptions = [...inputAssetSelect.options];
            inputOptions.forEach((option) => {
                if (option.value !== "") {
                    option.remove();
                }
            });

            inputs.forEach((input) => {
                const option = document.createElement("option");
                option.value = input.id;
                option.innerText = input.name;
                inputAssetSelect.appendChild(option);
            });
        }
    } catch (e) {
        await uiHelpers.errorAlert(e);
    }
}

/**
 * Create Live Channel
 *
 * @param {Event} evt
 */
async function createChannel(evt) {
    if (evt && evt.cancelable) {
        evt.preventDefault();
    }

    const errors = [];

    const name = nameInput.value;
    const type = channelTypeSelect.value;
    let url = urlInput.value;

    if (name.trim() === "") {
        errors.push("Channel Name");
    }

    if (type === liveChannelTypes.External && url.trim() === "") {
        errors.push("External URL");
    }

    if (type !== liveChannelTypes.External) {
        url = "";
    }

    if (type === liveChannelTypes.Normal) {
        if (slateSelect.value === "") {
            errors.push("Slate File");
        }

        if (fileAssetRadio.checked && fileAssetSelect.value === "") {
            errors.push("File Asset");
        }

        if (inputAssetRadio.checked && inputAssetSelect.value === "") {
            errors.push("Input Asset");
        }
    }

    const ul = document.createElement("ul");

    errors.forEach((error) => {
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(error));
        ul.appendChild(li);
    });

    if (errors.length > 0) {
        await Swal.fire({
            icon: "error",
            title: "These fields are required:",
            text: errors,
            html: ul,
            footer: '<span>Fields with  <sup class="required">*</sup>  are required</span>'
        });

        return;
    }

    try {
        clearLoadItemsInterval();
        uiHelpers.showWaitIndicator();

        const channelObject = {
            name: name,
            route: slugify(name),
            type: type,
            url: url
        };

        if (formChannelId.value) {
            channelObject.id = formChannelId.value;
        }

        const channelResponse = await createLiveChannel(token, channelObject);

        if (!channelResponse || !channelResponse.id) {
            throw new Error(`Creating Channel ${name} failed`);
        }

        if (type === liveInputTypes.Normal) {
            const slateObject = {
                id: guidHelpers.newGuid(),
                channelId: channelResponse.id,
                assetId: slateSelect.value,
                previousId: null
            };

            await addAssetScheduleEvent(token, slateObject);

            if (fileAssetRadio.checked) {
                const assetObject = {
                    id: guidHelpers.newGuid(),
                    channelId: channelResponse.id,
                    assetId: fileAssetSelect.value,
                    previousId: slateObject.id
                };

                await addAssetScheduleEvent(token, assetObject);
            } else if (inputAssetRadio.checked) {
                const inputObject = {
                    id: guidHelpers.newGuid(),
                    channelId: channelResponse.id,
                    inputId: inputAssetSelect.value,
                    previousId: slateObject.id
                };

                await addInputScheduleEvent(token, inputObject);
            }
        }

        await Swal.fire("Live Channel", `${name} was created successfully`, "success");

        uiHelpers.hide(newChannelForm);
        uiHelpers.show(videoSection);
        uiHelpers.visible(newChannelButton);
    } catch (e) {
        await uiHelpers.errorAlert(e);
    } finally {
        uiHelpers.hideWaitIndicator();
        setLoadItemsInterval();
    }
}

/**
 *  Create live input
 *
 * @param {Event} evt
 */
async function createInput(evt) {
    if (evt && evt.cancelable) {
        evt.preventDefault();
    }

    const errors = [];
    const name = inputNameInput.value;
    const source = inputSourceInput.value;

    if (name.trim() === "") {
        errors.push("Input Name");
    }

    if (errors.length > 0) {
        const ul = document.createElement("ul");
        errors.forEach((error) => {
            const li = document.createElement("li");
            li.appendChild(document.createTextNode(error));
            ul.appendChild(li);
        });

        await Swal.fire({
            icon: "error",
            title: "These fields are required:",
            text: errors,
            html: ul,
            footer: '<span>Fields with  <sup class="required">*</sup>  are required</span>'
        });

        return;
    }

    try {
        clearLoadItemsInterval();
        uiHelpers.showWaitIndicator();

        const inputObject = {
            name: name,
            internalName: slugify(name),
            type: inputTypeSelect.value,
            source: source
        };

        if (formInputId.value) {
            inputObject.id = formInputId.value;
        }

        const response = await createLiveInput(token, inputObject);

        if (!response || !response.id) {
            throw new Error(`Creating Input ${name} failed`);
        }

        await uiHelpers.successAlert("Live Input", `${name} was created successfully`);

        uiHelpers.hide(newInputForm);
        uiHelpers.show(videoSection);
        uiHelpers.visible(newInputButton);
    } catch (e) {
        await uiHelpers.errorAlert(e);
    } finally {
        uiHelpers.hideWaitIndicator();
        setLoadItemsInterval();
    }
}

/**
 * Load inputs and channels and update the UI
 *
 */
async function loadItems() {
    if (token) {
        console.log("Updating items...");
        try {
            uiHelpers.addCssClass(reloadButton.firstChild, "fa-spin");

            const inputs = await getLiveInputs(token);
            addRows(inputs, inputItems);

            const channels = await searchLiveChannels(token);
            addRows(channels, channelItems);

            uiHelpers.removeCssClass(reloadButton.firstChild, "fa-spin");
        } catch (e) {
            await uiHelpers.errorAlert(e);
        }
    }
}

/**
 * Manually load inputs and channels and update the UI
 *
 */
async function reloadItems(evt) {
    if (evt && evt.cancelable) {
        evt.preventDefault();
    }

    uiHelpers.showWaitIndicator();

    clearLoadItemsInterval();
    await loadItems();
    setLoadItemsInterval();

    uiHelpers.hideWaitIndicator();
}

/**
 * Add inputs and channels to the grids
 *
 * @param {object} data         | Row data
 * @param {HTMLElement} parent  | Parent element
 */
function addRows(data, parent) {
    if (!data || !parent) {
        return;
    }

    if (parent.hasChildNodes) {
        parent.textContent = "";
    }

    const isInputs = parent.attributes.name.value === "inputs";
    const items = isInputs ? data : data.items;

    items.forEach((item) => {
        const row = document.createElement("section");

        if (isInputs) {
            if (item.type.description !== "Input Device") {
                row.className = "input-row";
                row.setAttribute("input-id", item.id);
                row.setAttribute("input-name", item.name);
                row.setAttribute("input-status", item.status.description);

                addButton(row, item, "name", null, item.name);
                addButton(row, item, "type", null, item.type.description);
                addButton(row, item, "status", null, item.status.description);
                addButton(row, item, "play", null, "");
                addButton(row, item, "view", null, "");
                addButton(row, item, "stop", null, "");
                addButton(row, item, "edit", '<i class="fad fa-edit"></i>', null);
                addButton(row, item, "delete", '<i class="fad fa-trash-alt"></i>', null);
                addButton(row, item, "error", '<i class="fad fa-exclamation-triangle"></i>', null);
                addButton(row, item, "refresh", '<i class="fad fa-sync-alt fa-spin"></i>', null);
            }
        } else {
            row.className = "channel-row";
            row.setAttribute("channel-id", item.id);
            row.setAttribute("channel-title", item.title);
            row.setAttribute("channel-status", item.identifiers.status.description);

            addButton(row, item, "name", null, item.title);
            addButton(row, item, "type", null, item.identifiers.type.description);
            addButton(row, item, "status", null, item.identifiers.status.description);
            addButton(row, item, "play", '<i class="fad fa-play"></i>', null);
            addButton(row, item, "view", '<i class="fad fa-eye"></i>', null);
            addButton(row, item, "stop", '<i class="fad fa-stop"></i>', null);
            addButton(row, item, "edit", '<i class="fad fa-edit"></i>', null);
            addButton(row, item, "delete", '<i class="fad fa-trash-alt"></i>', null);
            addButton(row, item, "error", '<i class="fad fa-exclamation-triangle"></i>', null);
            addButton(row, item, "refresh", '<i class="fad fa-sync-alt fa-spin"></i>', null);
        }

        parent.appendChild(row);
    });
}

/**
 *  Add corresponding buttons to the row
 *
 * @param {Element} row
 * @param {Object}  item
 * @param {string}  buttonName
 * @param {string}  innerHTML
 * @param {string}  innerText
 */
async function addButton(row, item, buttonName, innerHTML, innerText) {
    if (!row || !item) {
        return;
    }

    const itemId = item.id;
    const isInput = row.className === "input-row";
    const button = document.createElement("button");

    let itemStatus;
    let outputLiveVideoUrl = null;

    if (isInput) {
        itemStatus = item.status.description;
        button.setAttribute("input-id", itemId);
    } else {
        itemStatus = item.identifiers.status.description;
        outputLiveVideoUrl = item.identifiers.outputLiveVideoUrl;

        // Ignore channels without output URL
        if (!outputLiveVideoUrl || outputLiveVideoUrl.trim() === "") {
            return;
        }

        row.setAttribute("output-url", outputLiveVideoUrl);
        button.setAttribute("channel-id", itemId);
    }

    button.id = `${buttonName}-${itemId}`;
    button.name = buttonName;
    button.className = buttonName;
    button.addEventListener("click", (evt) => buttonClicked(evt));

    if (innerHTML) {
        button.innerHTML = innerHTML;
    } else if (innerText) {
        button.innerText = innerText;
    }

    button.style.visibility = "visible";

    // Always disable these buttons
    if (["name", "type", "status"].includes(buttonName)) {
        button.setAttribute("disabled", true);
    }

    if (!isInput) {
        switch (itemStatus) {
            case "Idle":
                if (["stop", "view", "error", "refresh"].includes(buttonName)) {
                    button.style.visibility = "hidden";
                }
                break;
            case "Starting":
                // Hide these buttons
                if (["play", "view", "stop", "edit", "error"].includes(buttonName)) {
                    button.style.visibility = "hidden";
                }
                break;
            case "Creating":
            case "Stopping":
            case "Updating":
            case "Deleting":
            case "Recovering":
                // Hide these buttons
                if (["play", "view", "stop", "edit", "delete", "error"].includes(buttonName)) {
                    button.style.visibility = "hidden";
                }
                break;
            case "Running":
                // Hide these buttons
                if (["play", "edit", "delete", "error", "refresh"].includes(buttonName)) {
                    button.style.visibility = "hidden";
                } else if (buttonName === "view" && player) {
                    const playerCurrentSource = player.currentSrc();

                    // If the player is playing this source then also hide the view button
                    if (playerCurrentSource === outputLiveVideoUrl) {
                        button.style.visibility = "hidden";
                    }
                }
                // Set the status Running green
                if (buttonName === "status") {
                    button.className = `${buttonName} running-status`;
                }
                break;
            case "Create Failed":
            case "Update Failed":
            case "Error":
                // Set the error as a tooltip
                if (buttonName === "error") {
                    button.title = item.identifiers.statusMessage;
                }
                // Set the status Error red
                if (buttonName === "status") {
                    button.className = `${buttonName} error-status`;
                }
                // Hide these buttons
                if (["play", "view", "stop", "refresh"].includes(buttonName)) {
                    button.style.visibility = "hidden";
                }
                break;
            default:
                await uiHelpers.errorAlert(`Unhandled Channel Status: ${itemStatus}`);
                break;
        }
    } else {
        // Always hide these buttons for inputs
        if (["play", "stop", "view"].includes(buttonName)) {
            button.style.visibility = "hidden";
        }

        switch (itemStatus) {
            // name, type, status, edit, delete, error, refresh
            case "New":
            case "Attached":
                // Hide these buttons
                if (["edit", "delete", "error", "refresh"].includes(buttonName)) {
                    button.style.visibility = "hidden";
                }
                break;
            case "Detached":
                // Hide these buttons
                if (["error", "refresh"].includes(buttonName)) {
                    button.style.visibility = "hidden";
                }
                break;
            case "Deleted":
                // Hide these buttons
                if (["edit", "delete", "error", "refresh"].includes(buttonName)) {
                    button.style.visibility = "hidden";
                }
                break;
            case "Creating":
            case "Attaching":
            case "Detaching":
            case "Updating":
            case "Deleting":
                // Hide these buttons
                if (["edit", "delete", "error"].includes(buttonName)) {
                    button.style.visibility = "hidden";
                }
                break;
            case "Create Failed":
            case "Error":
                // Set the error as a tooltip
                if (buttonName === "error") {
                    button.title = item.statusMessage;
                }
                // Set the status Error red
                if (buttonName === "status") {
                    button.className = `${buttonName} error-status`;
                }
                // Hide these buttons
                if (["refresh"].includes(buttonName)) {
                    button.style.visibility = "hidden";
                }
                break;
            default:
                await uiHelpers.errorAlert(`Unhandled Input Status: ${itemStatus}`);
                break;
        }
    }

    row.appendChild(button);
}

/**
 * Handle buttons click event
 *
 * @param {Event} evt
 */
async function buttonClicked(evt) {
    if (evt && evt.cancelable) {
        evt.preventDefault();
    }

    clearLoadItemsInterval();

    const button = evt.currentTarget;
    const parent = button.parentElement;
    const buttonName = button.name;
    const isInput = parent.className === "input-row";

    if (isInput === true) {
        const inputId = button.attributes["input-id"].value;
        const inputName = parent.attributes["input-name"].value;

        switch (buttonName) {
            case "edit":
                editInput(inputId);
                break;
            case "delete":
                deleteInput(inputId, inputName);
                break;
            case "error":
                Swal.fire({
                    icon: "error",
                    iconColor: "#e71837",
                    title: "Live Input Error",
                    text: button.title
                });
                break;
            default:
                break;
        }
    } else {
        const title = parent.attributes["channel-title"].value;
        const status = parent.attributes["channel-status"].value;

        const channelId = button.attributes["channel-id"].value;
        const outputLiveVideoUrl = parent.attributes["output-url"].value;

        const playing = liveChannelsPlaying.indexOf(channelId) > -1;
        const viewing = player ? outputLiveVideoUrl === player.currentSrc() : false;

        const refreshButton = document.getElementById(`refresh-${channelId}`);
        uiHelpers.visible(refreshButton);

        switch (buttonName) {
            case "play":
                if (status === "Idle") {
                    await startLiveChannel(token, channelId);
                }
                break;
            case "view":
                if (status === "Running") {
                    if (!playing) {
                        liveChannelsPlaying.push(channelId);
                    }

                    if (!playing || (playing && !viewing)) {
                        await playVideo(outputLiveVideoUrl, title, parent, channelId);
                    }
                }
                break;
            case "stop":
                if (status === "Running") {
                    await stopLiveChannel(token, channelId);

                    if (playing) {
                        liveChannelsPlaying.splice(liveChannelsPlaying.indexOf(channelId), 1);
                    }

                    if (viewing) {
                        disposePlayer();
                    }
                }
                break;
            case "edit":
                if (status === "Idle" || status === "Error") {
                    editChannel(channelId);
                }
                break;
            case "delete":
                deleteChannel(channelId, title);
                break;
            case "error":
                Swal.fire({
                    icon: "error",
                    iconColor: "#e71837",
                    title: "Live Channel Error",
                    text: button.title
                });
                break;
            default:
                break;
        }

        await loadItems();
        uiHelpers.hidden(refreshButton);
    }

    setLoadItemsInterval();
}

/**
 *
 * @param {*} channelId
 */
async function editChannel(channelId) {
    try {
        uiHelpers.showWaitIndicator();

        await loadFilesIntoSelectOptions();
        await loadLiveInputsIntoSelectOptions();

        const response = await searchLiveChannel(token, channelId);

        if (response && response.hasItems && response.items.length === 1) {
            const channel = response.items[0];
            const channelType = channel.identifiers.type.lookupId;
            const externalUrl = channel.identifiers.outputLiveVideoUrl;

            sectionHeaderChannelLabel.innerText = `Edit Channel [${channelId}]`;
            nameInput.value = channel.title;
            channelTypeSelect.value = channelType;
            channelTypeSelect.dispatchEvent(new Event("change"));
            channelTypeSelect.disabled = true;
            urlInput.value = channelType === liveChannelTypes.External ? externalUrl : "";

            switch (channelType) {
                case liveChannelTypes.External:
                    break;
                case liveChannelTypes.IVS:
                    slateSelect.value = "";
                    fileAssetSelect.value = "";
                    inputAssetSelect.value = "";
                    break;
                case liveChannelTypes.Normal: {
                    const scheduleEvents = await getLiveChannelScheduleEvents(token, channel.id);
                    if (scheduleEvents && scheduleEvents.length > 0) {
                        scheduleEvents.forEach((e) => {
                            if (e.type.lookupId === sysConstants.VIDEO_ASSET_LOOKUP_ID) {
                                if (e.previousId) {
                                    fileAssetRadio.checked = true;
                                    fileAssetRadio.dispatchEvent(new Event("click"));
                                    fileAssetSelect.value = e.asset?.lookupId;
                                } else {
                                    slateSelect.value = e.asset.lookupId;
                                }
                            } else if (e.type.lookupId === sysConstants.LIVE_INPUT_LOOKUP_ID) {
                                inputAssetRadio.checked = true;
                                inputAssetRadio.dispatchEvent(new Event("click"));
                                inputAssetSelect.value = e.asset?.lookupId;
                            }
                        });
                    }
                    break;
                }
                default:
                    await uiHelpers.errorAlert(`Unhandled Live Channel type: ${channelType}`);
                    break;
            }

            createChannelButton.innerText = "Update";
            formChannelId.value = channelId;
            uiHelpers.hide(videoSection);
            uiHelpers.show(newChannelForm);
        }
    } catch (e) {
        await uiHelpers.errorAlert(e);
    } finally {
        uiHelpers.hideWaitIndicator();
    }
}

/**
 * Edit live input
 *
 * @param {string} inputId
 */
async function editInput(inputId) {
    try {
        uiHelpers.showWaitIndicator();

        const input = await getLiveInput(token, inputId);

        if (input) {
            sectionHeaderInputLabel.innerText = `Edit Input [${inputId}]`;
            inputNameInput.value = input.name;
            inputTypeSelect.value = input.type.lookupId;
            inputSourceInput.value = "";

            inputTypeSelect.value = input.type.lookupId;

            switch (input.type.lookupId) {
                case liveInputTypes.RTP_PUSH:
                case liveInputTypes.RTMP_PUSH:
                    inputSourceInput.value = input.sourceCidr;
                    break;
                case liveInputTypes.RTMP_PULL:
                case liveInputTypes.URL_PULL:
                    if (input.sources && input.sources.length > 0) {
                        inputSourceInput.value = input.sources[0].url;
                    }
                    break;
                default:
                    throw new Error(`Unhandled Input type: ${input.type.description}`);
            }

            inputTypeSelect.dispatchEvent(new Event("change"));
            inputTypeSelect.disabled = true;
            formInputId.value = inputId;

            createInputButton.innerText = "Update";
            uiHelpers.hide(videoSection);
            uiHelpers.show(newInputForm);
        }
    } catch (e) {
        await uiHelpers.errorAlert(e);
    } finally {
        uiHelpers.hideWaitIndicator();
    }
}

/**
 * Delete Live Input
 *
 * @param {string} inputId    - The ID of the input to delete
 */
async function deleteInput(inputId, name) {
    const result = await Swal.fire({
        title: "Delete live input?",
        text: `Name: ${name}`,
        iconColor: "#f60000",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it"
    });

    if (result.isConfirmed) {
        try {
            uiHelpers.showWaitIndicator();
            await deleteLiveInput(token, inputId);
            await uiHelpers.successAlert("Deleted!", "The input has been deleted.");
        } catch (e) {
            await uiHelpers.errorAlert(e);
        } finally {
            uiHelpers.hideWaitIndicator();
        }
    }
}

/**
 * Delete Live Channel
 *
 * @param {string} channelId    - The ID of the channel to delete
 */
async function deleteChannel(channelId, title) {
    const result = await Swal.fire({
        title: "Delete live channel?",
        text: `Name: ${title}`,
        iconColor: "#f60000",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Delete channel only",
        denyButtonText: "Delete inputs too"
    });

    const deleteInputs = !!result.isDenied;

    if (result.isConfirmed || result.isDenied) {
        try {
            uiHelpers.showWaitIndicator();
            await deleteLiveChannel(token, channelId, deleteInputs);
            await uiHelpers.successAlert("Deleted!", "The channel has been deleted.");
        } catch (e) {
            await uiHelpers.errorAlert(e);
        } finally {
            uiHelpers.hideWaitIndicator();
        }
    }
}

/**
 *
 * @param {string} outputLiveVideoUrl
 * @param {string} title
 * @param {HTMLElement} parent
 */
async function playVideo(outputLiveVideoUrl, title, parent, channelId) {
    // Check for valid parameters
    if (!outputLiveVideoUrl || !title || !parent || !channelId) {
        throw new Error("Play Video: All parameters are required");
    }

    try {
        console.log(`Play Video called for ${title}`);

        disposePlayer();

        // Set default type and tech
        let type = "video/mp4";
        let techOrder = ["Html5"];

        // Set options based of source
        if (outputLiveVideoUrl.endsWith(".m3u8")) {
            type = "application/x-mpegURL";
        } else if (outputLiveVideoUrl.includes("youtube") || outputLiveVideoUrl.includes("youtu.be")) {
            type = "video/youtube";
            techOrder = ["youtube"];
        }

        // TODO: add application/dash+xml

        // Initialized the player
        player = videojs("nmd-player");
        videojs.options.techOrder = techOrder;
        player.responsive(true);

        player.on("error", async () => {
            const errorMessage = `Player Error: ${player.error().message}`;
            console.error(`Player On Error: ${errorMessage}`);
            await uiHelpers.errorAlert(errorMessage);
            disposePlayer();
        });

        player.ready(async () => {
            console.log(`Player ready: ${player.readyState()}`);
        });

        player.on("loadedmetadata", async () => {
            console.log("Player metadata loaded");

            // Play when metadata was loaded if player has a source
            if (player && player.currentSrc()) {
                player.play();
            }
        });

        // playingTitle.innerText = "...";
        player.src([{ type: type, src: outputLiveVideoUrl }]);

        // If player did not error set the title
        playingTitle.innerText = title;

        await sleep(1);
    } catch (e) {
        console.error(`
            Play Video: Couldn't play source ${outputLiveVideoUrl}
                Channel Id: ${channelId}
                Error     : ${player.error()}
                Exception : ${e}
        `);
    }
}

/**
 * Reset video tag
 *
 */
function resetVideo() {
    // Get video section element
    const videoSection = document.getElementById("video-section");

    // Create new video tag
    const video = document.createElement("video");

    // Set video tag properties and attributes
    video.id = "nmd-player";
    video.className = "video-js vjs-fill vjs-big-play-centered"; // vjs-fluid vjs-fill
    video.controls = "true";
    video.loop = "true";
    video.preload = "metadata";
    video.style.width = "100%";
    video.style.height = "100%";

    video.setAttribute("playsinline", "true");

    // Add video tag to video section
    videoSection.insertAdjacentElement("beforeend", video);

    playingTitle.innerText = "...";
}

/**
 * Reset VideoJS Player
 *
 */
async function disposePlayer() {
    try {
        console.log("Disposing player...");

        // Dispose the player
        if (player) {
            player.dispose();
        }

        // Make sure there is only one video tag
        const nomadPlayer = document.getElementById("nmd-player");
        if (nomadPlayer) {
            nomadPlayer.remove();
        }

        // Reset video tag
        resetVideo();
    } catch (e) {
        console.error(`Reset Player failed: ${e}`);
    }
}

/**
 *
 */
function setLoadItemsInterval() {
    if (loadItemsInterval) {
        return;
    }

    loadItemsInterval = setInterval(loadItems, refreshInterval);
}

/**
 * Clear Interval
 *
 */
function clearLoadItemsInterval() {
    if (loadItemsInterval) {
        clearInterval(loadItemsInterval);
        loadItemsInterval = undefined;
    }
}

/**
 * Sign In
 *
 */
async function signIn() {
    const result = await Swal.fire({
        title: "Sign In",
        html: `
        <input type="text" id="username" class="swal2-input" placeholder="Username">
        <input type="password" id="password" class="swal2-input" placeholder="Password">
        `,
        confirmButtonText: "Sign in",
        focusConfirm: false,
        allowOutsideClick: false,
        preConfirm: () => {
            const username = Swal.getPopup().querySelector("#username").value;
            const password = Swal.getPopup().querySelector("#password").value;
            if (!username || !password) {
                Swal.showValidationMessage("Please enter valid username and password");
            }
            return { username: username, password: password };
        }
    });

    if (result) {
        try {
            uiHelpers.showWaitIndicator();
            token = await login(result.value.username, result.value.password);
            await loadItems();
            setLoadItemsInterval();
        } catch (e) {
            await uiHelpers.errorAlert(e);
        } finally {
            uiHelpers.hideWaitIndicator();
        }
    }

    if (!token) {
        signIn();
    }
}

/**
 * Sign Out
 *
 */
async function signOut(evt) {
    if (evt && evt.cancelable) {
        evt.preventDefault();
    }

    const result = await Swal.fire({
        title: "Sign Out",
        text: "Are you sure?",
        showCancelButton: true,
        confirmButtonText: "Logout",
        allowOutsideClick: false
    });

    if (result && result.isConfirmed) {
        try {
            uiHelpers.showWaitIndicator();
            await logout();
            uiHelpers.deleteCookies();
            channelItems.textContent = "";
            clearLoadItemsInterval();
            signIn();
        } catch (e) {
            await uiHelpers.errorAlert(e);
        } finally {
            uiHelpers.hideWaitIndicator();
        }
    }
}

/**
 * Wait for the DOM to load
 *
 */
window.addEventListener("DOMContentLoaded", async (event) => {
    console.log("DOM Ready...");
    disposePlayer();
    token = sessionStorage.getItem("token");

    if (!token) {
        signIn();
    }
});
