import * as guidHelpers from "./helpers/guid-helpers.js";

import createLiveChannel from "./live-channel/create-live-channel.js";
import deleteLiveChannel from "./live-channel/delete-live-channel.js";
import getLiveChannel from "./live-channel/get-live-channel.js";
import startLiveChannel from "./live-channel/start-live-channel.js";
import stopLiveChannel from "./live-channel/stop-live-channel.js";
import updateLiveChannel from "./live-channel/update-live-channel.js";

import createLiveInput from "./live-input/create-live-input.js";
import deleteInput from "./live-input/delete-live-input.js";
import updateLiveInput from "./live-input/update-live-input.js";

import addAssetScheduleEvent from "./schedule-event/add-asset-schedule-event.js";
import removeAssetScheduleEvent from "./schedule-event/remove-asset-schedule-event.js";
import addInputScheduleEvent from "./schedule-event/add-input-schedule-event.js";
import removeInputScheduleEvent from "./schedule-event/remove-input-schedule-event.js";

const AUTH_FORM = document.getElementById("authForm");
const CREATE_CHANNEL_FORM = document.getElementById("createChannelForm");
const UPDATE_CHANNEL_FORM = document.getElementById("updateChannelForm");
const ADD_ASSET_FORM = document.getElementById("addAssetForm");
const REMOVE_ASSET_FORM = document.getElementById("removeAssetForm");
const CREATE_INPUT_FORM = document.getElementById("createInputForm");
const UPDATE_INPUT_FORM = document.getElementById("updateInputForm");
const START_CHANNEL_FORM = document.getElementById("startChannelForm");
const STOP_CHANNEL_FORM = document.getElementById("stopChannelForm");
const ADD_FORM = document.getElementById("addForm");
const REMOVE_FORM = document.getElementById("removeForm");
const DELETE_CHANNEL_FORM = document.getElementById("deleteChannelForm");
const DELETE_INPUT_FORM = document.getElementById("deleteInputForm");

const TOKEN_INPUT = document.getElementById("authInput");
const CREATE_CHANNEL_NAME_INPUT = document.getElementById("createChannelNameInput");
const CREATE_CHANNEL_THUMBNAIL_IMAGE_ID_INPUT = document.getElementById("createChannelThumbnailImageIdInput");
const CREATE_CHANNEL_ARCHIVE_FOLDER_ASSET_ID_INPUT = document.getElementById("createChannelArchiveFolderAssetIdInput");
const CREATE_CHANNEL_ENABLE_HIGH_AVAILABILITY_INPUT = document.getElementById("createChannelEnableHighAvailabilityInput");
const CREATE_CHANNEL_ENABLE_LIVE_CLIPPING_INPUT = document.getElementById("createChannelEnableLiveClippingInput");
const CREATE_CHANNEL_IS_SECURE_OUTPUT_INPUT = document.getElementById("createChannelIsSecureOutputInput");
const CREATE_CHANNEL_IS_OUTPUT_SCREENSHOTS_INPUT = document.getElementById("createChannelIsOutputScreenshotsInput");
const CREATE_CHANNEL_TYPE_INPUT = document.getElementById("createChannelTypeInput");
const CREATE_CHANNEL_URL_INPUT = document.getElementById("createChannelUrlInput");
const UPDATE_CHANNEL_ID_INPUT = document.getElementById("updateChannelIdInput");
const UPDATE_CHANNEL_NAME_INPUT = document.getElementById("updateChannelNameInput");
const UPDATE_CHANNEL_THUMBNAIL_IMAGE_ID_INPUT = document.getElementById("updateChannelThumbnailImageIdInput");
const UPDATE_CHANNEL_ARCHIVE_FOLDER_ASSET_ID_INPUT = document.getElementById("updateChannelArchiveFolderAssetIdInput");
const UPDATE_CHANNEL_ENABLE_HIGH_AVAILABILITY_INPUT = document.getElementById("updateChannelEnableHighAvailabilityInput");
const UPDATE_CHANNEL_ENABLE_LIVE_CLIPPING_INPUT = document.getElementById("updateChannelEnableLiveClippingInput");
const UPDATE_CHANNEL_IS_SECURE_OUTPUT_INPUT = document.getElementById("updateChannelIsSecureOutputInput");
const UPDATE_CHANNEL_IS_OUTPUT_SCREENSHOTS_INPUT = document.getElementById("updateChannelIsOutputScreenshotsInput");
const UPDATE_CHANNEL_TYPE_INPUT = document.getElementById("updateChannelTypeInput");
const UPDATE_CHANNEL_URL_INPUT = document.getElementById("updateChannelUrlInput");
const ADD_ASSET_CHANNEL_ID_INPUT = document.getElementById("addAssetChannelIdInput");
const ADD_ASSET_ASSET_ID_INPUT = document.getElementById("addAssetAssetIdInput");
const ADD_ASSET_IS_LOOP_INPUT = document.getElementById("addAssetIsLoopInput");
const REMOVE_ASSET_CHANNEL_ID_INPUT = document.getElementById("removeAssetChannelIdInput");
const REMOVE_ASSET_SCHEDULE_EVENT_ID_INPUT = document.getElementById("removeAssetScheduleEventIdInput");
const CREATE_INPUT_NAME_INPUT = document.getElementById("createInputNameInput");
const CREATE_SOURCE_TYPE_INPUT = document.getElementById("createSourceTypeInput");
const CREATE_INPUT_SOURCE_URL_INPUT = document.getElementById("createInputSourceUrlInput");
const UPDATE_INPUT_ID_INPUT = document.getElementById("updateInputIdInput");
const UPDATE_INPUT_NAME_INPUT = document.getElementById("updateInputNameInput");
const UPDATE_SOURCE_TYPE_INPUT = document.getElementById("updateSourceTypeInput");
const UPDATE_INPUT_SOURCE_URL_INPUT = document.getElementById("updateInputSourceUrlInput");
const START_CHANNEL_ID_INPUT = document.getElementById("startChannelIdInput");
const STOP_CHANNEL_ID_INPUT = document.getElementById("stopChannelIdInput");
const ADD_CHANNEL_ID_INPUT = document.getElementById("addChannelIdInput");
const ADD_INPUT_ID_INPUT = document.getElementById("addInputIdInput");
const REMOVE_CHANNEL_ID_INPUT = document.getElementById("removeChannelIdInput");
const REMOVE_REQUEST_ID_INPUT = document.getElementById("removeRequestIdInput");
const DELETE_CHANNEL_ID_INPUT = document.getElementById("deleteChannelIdInput");
const DELETE_LIVE_INPUTS_INPUT = document.getElementById("deleteLiveInputsInput");
const DELETE_INPUT_ID_INPUT = document.getElementById("deleteInputIdInput");

const CREATE_CHANNEL_URL_DIV = document.getElementById("createChannelUrlDiv");
const UPDATE_CHANNEL_URL_DIV = document.getElementById("updateChannelUrlDiv");
const CREATE_INPUT_SOURCE_URL_DIV = document.getElementById("createInputSourceUrlDiv");
const UPDATE_INPUT_SOURCE_URL_DIV = document.getElementById("updateInputSourceUrlDiv");

const CREATE_INPUT_SOURCE_URL_LABEL = document.getElementById("createInputSourceUrlLabel");
const UPDATE_INPUT_SOURCE_URL_LABEL = document.getElementById("updateInputSourceUrlLabel");

sessionStorage.clear();

AUTH_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    sessionStorage.setItem("token", TOKEN_INPUT.value);
    console.log("Successfuly updated token");
});

CREATE_CHANNEL_TYPE_INPUT.addEventListener("change", function (event)
{
    event.preventDefault();

    let createChannelType = CREATE_CHANNEL_TYPE_INPUT.value;
    CREATE_CHANNEL_URL_DIV.hidden = !(createChannelType === "External");
});

CREATE_CHANNEL_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();

    let name = CREATE_CHANNEL_NAME_INPUT.value;
    let thumbnailImageId = CREATE_CHANNEL_THUMBNAIL_IMAGE_ID_INPUT.value;
    let archiveFolderAssetId = CREATE_CHANNEL_ARCHIVE_FOLDER_ASSET_ID_INPUT.value;
    let enableHighAvailability = (CREATE_CHANNEL_ENABLE_HIGH_AVAILABILITY_INPUT.value === "true");
    let enableLiveClipping = (CREATE_CHANNEL_ENABLE_LIVE_CLIPPING_INPUT.value === "true");
    let isSecureOutput = (CREATE_CHANNEL_IS_SECURE_OUTPUT_INPUT.value === "true");
    let isOutputScreenshots = (CREATE_CHANNEL_IS_OUTPUT_SCREENSHOTS_INPUT.value === "true");
    let type = CREATE_CHANNEL_TYPE_INPUT.value;
    let url = CREATE_CHANNEL_URL_INPUT.value;

    createChannelMain(name, thumbnailImageId, archiveFolderAssetId, enableHighAvailability, enableLiveClipping, 
                      isSecureOutput, isOutputScreenshots, type, url);
});


UPDATE_CHANNEL_TYPE_INPUT.addEventListener("change", function (event)
{
    event.preventDefault();

    let channelType = UPDATE_CHANNEL_TYPE_INPUT.value;
    UPDATE_CHANNEL_URL_DIV.hidden = !(channelType === "External");
});

UPDATE_CHANNEL_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let id = UPDATE_CHANNEL_ID_INPUT.value;
    let name = UPDATE_CHANNEL_NAME_INPUT.value;
    let thumbnailImageId = UPDATE_CHANNEL_THUMBNAIL_IMAGE_ID_INPUT.value;
    let archiveFolderAssetId = UPDATE_CHANNEL_ARCHIVE_FOLDER_ASSET_ID_INPUT.value;
    let enableHighAvailability = (UPDATE_CHANNEL_ENABLE_HIGH_AVAILABILITY_INPUT.value === "true");
    let enableLiveClipping = (UPDATE_CHANNEL_ENABLE_LIVE_CLIPPING_INPUT.value === "true");
    let isSecureOutput = (UPDATE_CHANNEL_IS_SECURE_OUTPUT_INPUT.value === "true");
    let isOutputScreenshots = (UPDATE_CHANNEL_IS_OUTPUT_SCREENSHOTS_INPUT.value === "true");
    let type = UPDATE_CHANNEL_TYPE_INPUT.value;
    let url = UPDATE_CHANNEL_URL_INPUT.value;

    updateChannelMain(id, name, thumbnailImageId, archiveFolderAssetId, enableHighAvailability, enableLiveClipping,
                      isSecureOutput, isOutputScreenshots, type, url);
});

CREATE_SOURCE_TYPE_INPUT.addEventListener("change", function (event) 
{
    event.preventDefault();

    let sourceType = CREATE_SOURCE_TYPE_INPUT.value;
    CREATE_INPUT_SOURCE_URL_DIV.hidden = !(sourceType !== "UDP_PUSH");

    if (sourceType === "RTMP_PUSH")
    {
        CREATE_INPUT_SOURCE_URL_LABEL.innerHTML = "Enter Source Video IP/CIDR Address<br>\
                                                   Please use the following format: ###.###.###.###/##";
    }
    else if (sourceType !== "UDP_PUSH")
    {
        CREATE_INPUT_SOURCE_URL_LABEL.innerHTML = "Enter Source Video URL<br>\
                                                   Must start with http or rtmp";
    }
});


CREATE_INPUT_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let name = CREATE_INPUT_NAME_INPUT.value;
    let sourceUrl = CREATE_INPUT_SOURCE_URL_INPUT.value;
    let sourceType = CREATE_SOURCE_TYPE_INPUT.value;

    createInputMain(name, sourceUrl, sourceType);
});

UPDATE_SOURCE_TYPE_INPUT.addEventListener("change", function (event)
{
    event.preventDefault();

    let sourceType = UPDATE_SOURCE_TYPE_INPUT.value;
    UPDATE_INPUT_SOURCE_URL_DIV.hidden = !(sourceType !== "UDP_PUSH");

    if (sourceType === "RTMP_PUSH")
    {
        UPDATE_INPUT_SOURCE_URL_LABEL.innerHTML = "Enter Source Video IP/CIDR Address<br>\
                                                   Please use the following format: ###.###.###.###/##";
    }
    else if (sourceType !== "UDP_PUSH")
    {
        UPDATE_INPUT_SOURCE_URL_LABEL.innerHTML = "Enter Source Video URL<br>\
                                                   Must start with http or rtmp";
    }
});

UPDATE_INPUT_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let id = UPDATE_INPUT_ID_INPUT.value;
    let name = UPDATE_INPUT_NAME_INPUT.value;
    let sourceUrl = UPDATE_INPUT_SOURCE_URL_INPUT.value;
    let sourceType = UPDATE_SOURCE_TYPE_INPUT.value;

    updateInputMain(id, name, sourceUrl, sourceType);
});

ADD_ASSET_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let channelId = ADD_ASSET_CHANNEL_ID_INPUT.value;
    let assetId = ADD_ASSET_ASSET_ID_INPUT.value;
    let isLoop = (ADD_ASSET_IS_LOOP_INPUT.value === "true");

    addAssetScheduleEventToChannelMain(channelId, assetId, isLoop);
});

REMOVE_ASSET_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let channelId = REMOVE_ASSET_CHANNEL_ID_INPUT.value;
    let scheduleEventId = REMOVE_ASSET_SCHEDULE_EVENT_ID_INPUT.value;

    removeAssetScheduleEventFromChannelMain(channelId, scheduleEventId);
});

START_CHANNEL_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let startChannelId = START_CHANNEL_ID_INPUT.value;

    startChannelMain(startChannelId);
});

STOP_CHANNEL_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let stopChannelId = STOP_CHANNEL_ID_INPUT.value;

    stopChannelMain(stopChannelId);
});

ADD_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let channelId = ADD_CHANNEL_ID_INPUT.value;
    let inputId = ADD_INPUT_ID_INPUT.value;

    addMain(channelId, inputId);
});

REMOVE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let channelId = REMOVE_CHANNEL_ID_INPUT.value;
    let requestId = REMOVE_REQUEST_ID_INPUT.value;

    removeMain(channelId, requestId);
});

DELETE_CHANNEL_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let channelId = DELETE_CHANNEL_ID_INPUT.value;
    let deleteLiveInputs = (DELETE_LIVE_INPUTS_INPUT.value === "true");

    deleteChannelMain(channelId, deleteLiveInputs);
});

DELETE_INPUT_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let inputId = DELETE_INPUT_ID_INPUT.value;

    deleteInputMain(inputId);
});


async function createChannelMain(NAME, THUMBNAIL_IMAGE_ID, ARCHIVE_FOLDER_ASSET_ID, ENABLE_HIGH_AVAILABILITY, 
                                 ENABLE_LIVE_CLIPPING, IS_SECURE_OUTPUT, IS_OUTPUT_SCREENSHOTS, TYPE, URL)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Creating channel...");
        const CHANNEL = await createLiveChannel(AUTH_TOKEN, NAME, THUMBNAIL_IMAGE_ID, ARCHIVE_FOLDER_ASSET_ID,
                                                ENABLE_HIGH_AVAILABILITY, ENABLE_LIVE_CLIPPING, IS_SECURE_OUTPUT, 
                                                IS_OUTPUT_SCREENSHOTS, TYPE, URL);
        console.log(JSON.stringify(CHANNEL, null, 4));

    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function updateChannelMain(ID, NAME,THUMBNAIL_IMAGE_ID, ARCHIVE_FOLDER_ASSET_ID, ENABLE_HIGH_AVAILABILITY,
                                 ENABLE_LIVE_CLIPPING, IS_SECURE_OUTPUT, OUTPUT_SCREENSHOTS, TYPE, URL)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Updating channel...");
        const CHANNEL = await updateLiveChannel(AUTH_TOKEN, ID, NAME, THUMBNAIL_IMAGE_ID, ARCHIVE_FOLDER_ASSET_ID, 
                                                ENABLE_HIGH_AVAILABILITY, ENABLE_LIVE_CLIPPING, IS_SECURE_OUTPUT, 
                                                OUTPUT_SCREENSHOTS, TYPE, URL);
        console.log(JSON.stringify(CHANNEL, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}


async function addAssetScheduleEventToChannelMain(CHANNEL_ID, ASSET_ID, IS_LOOP)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty")
    }

    try
    {
        console.log("Adding asset schedule event to channel...");
        const ASSET_SCHEDULE_EVENT_OBJECT = await addAssetScheduleEvent(AUTH_TOKEN, guidHelpers.newGuid(), 
                                                                        CHANNEL_ID, ASSET_ID, IS_LOOP);
        console.log(JSON.stringify(ASSET_SCHEDULE_EVENT_OBJECT, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}


async function removeAssetScheduleEventFromChannelMain(CHANNEL_ID, SCHEDULE_EVENT_ID)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty")
    }

    try
    {
        console.log("Removing asset schedule event from channel...");
        const ASSET_SCHEDULE_EVENT_OBJECT = await removeAssetScheduleEvent(AUTH_TOKEN, CHANNEL_ID, SCHEDULE_EVENT_ID);
        console.log("Asset schedule event removed from channel");
    }
    catch (error)
    {
        throw new Error(error);
    }
}


async function createInputMain(NAME, SOURCE_URL, SOURCE_TYPE)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Creating input...");
        const INPUT = await createLiveInput(AUTH_TOKEN, NAME, SOURCE_URL, SOURCE_TYPE);
        console.log(JSON.stringify(INPUT, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function updateInputMain(ID, NAME, SOURCE_URL, SOURCE_TYPE)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Updating input...");
        const INPUT = await updateLiveInput(AUTH_TOKEN, ID, NAME, SOURCE_URL, SOURCE_TYPE);
        console.log(JSON.stringify(INPUT, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}


async function startChannelMain(START_CHANNEL_ID)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Starting channel...");
        await startLiveChannel(AUTH_TOKEN, START_CHANNEL_ID);
        console.log("Channel started");
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function stopChannelMain(STOP_CHANNEL_ID)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Stopping channel...");
        await stopLiveChannel(AUTH_TOKEN, STOP_CHANNEL_ID);
        console.log("Channel stopped");
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function addMain(CHANNEL_ID, INPUT_ID)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        const CHANNEL_INFO = await getLiveChannel(AUTH_TOKEN, CHANNEL_ID);
        const PREVIOUS_ID = CHANNEL_INFO.previousId;

        console.log("Adding input to channel...");
        const CHANNEL = await addInputScheduleEvent(AUTH_TOKEN, CHANNEL_ID, INPUT_ID, PREVIOUS_ID);
        console.log(JSON.stringify(CHANNEL, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function removeMain(CHANNEL_ID, INPUT_ID)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Removing input from channel...");
        await removeInputScheduleEvent(AUTH_TOKEN, CHANNEL_ID, INPUT_ID);
        console.log("Input removed from channel");
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function deleteChannelMain(CHANNEL_ID, DELETE_LIVE_INPUTS)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Deleting channel...");
        await deleteLiveChannel(AUTH_TOKEN, CHANNEL_ID, DELETE_LIVE_INPUTS);
        console.log("Channel deleted");
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function deleteInputMain(INPUT_ID)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Deleting input...");
        await deleteInput(AUTH_TOKEN, INPUT_ID);
        console.log("Input deleted");
    }
    catch (error)
    {
        throw new Error(error);
    }
}

