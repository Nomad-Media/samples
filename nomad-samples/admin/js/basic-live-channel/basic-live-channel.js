import * as prjConstants from "./constants/project-constants.js";
import * as guidHelpers from "./helpers/guid-helpers.js";

import createLiveChannel from "./live-channel/create-live-channel.js";
import deleteLiveChannel from "./live-channel/delete-live-channel.js";
import getLiveChannel from "./live-channel/get-live-channel.js";
import startLiveChannel from "./live-channel/start-live-channel.js";
import stopLiveChannel from "./live-channel/stop-live-channel.js";

import createLiveInput from "./live-input/create-live-input.js";

import addAssetScheduleEvent from "./schedule-event/add-asset-schedule-event.js";
import addInputScheduleEvent from "./schedule-event/add-input-schedule-event.js";
import removeInputScheduleEvent from "./schedule-event/remove-input-schedule-event.js";

import liveChannelTypes from "./live-channel/live-channel-types.js";
import liveInputTypes from "./live-input/live-input-types.js";

const AUTH_FORM = document.getElementById("authForm");
const CREATE_CHANNEL_FORM = document.getElementById("createChannelForm");
const UPDATE_CHANNEL_FORM = document.getElementById("updateChannelForm");
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
const CREATE_CHANNEL_IS_SECURE_OUTPUT_INPUT = document.getElementById("createChannelIsSecureOutputInput");
const CREATE_CHANNEL_OUTPUT_SCREENSHOTS_INPUT = document.getElementById("createChannelOutputScreenshotsInput");
const CREATE_CHANNEL_TYPE_INPUT = document.getElementById("createChannelTypeInput");
const CREATE_CHANNEL_URL_INPUT = document.getElementById("createChannelUrlInput");
const UPDATE_CHANNEL_ID_INPUT = document.getElementById("updateChannelIdInput");
const UPDATE_CHANNEL_NAME_INPUT = document.getElementById("updateChannelNameInput");
const UPDATE_CHANNEL_THUMBNAIL_IMAGE_ID_INPUT = document.getElementById("updateChannelThumbnailImageIdInput");
const UPDATE_CHANNEL_ARCHIVE_FOLDER_ASSET_ID_INPUT = document.getElementById("updateChannelArchiveFolderAssetIdInput");
const UPDATE_CHANNEL_IS_SECURE_OUTPUT_INPUT = document.getElementById("updateChannelIsSecureOutputInput");
const UPDATE_CHANNEL_OUTPUT_SCREENSHOTS_INPUT = document.getElementById("updateChannelOutputScreenshotsInput");
const UPDATE_CHANNEL_TYPE_INPUT = document.getElementById("updateChannelTypeInput");
const UPDATE_CHANNEL_URL_INPUT = document.getElementById("updateChannelUrlInput");
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
const REMOVE_INPUT_ID_INPUT = document.getElementById("removeInputIdInput");
const DELETE_CHANNEL_ID_INPUT = document.getElementById("deleteChannelIdInput");
const DELETE_INPUT_ID_INPUT = document.getElementById("deleteInputIdInput");

const CREATE_CHANNEL_URL_DIV = document.getElementById("createChannelUrlDiv");
const UPDATE_CHANNEL_URL_DIV = document.getElementById("updateChannelUrlDiv");
const CREATE_INPUT_SOURCE_URL_DIV = document.getElementById("createInputSourceUrlDiv");
const UPDATE_INPUT_SOURCE_URL_DIV = document.getElementById("updateInputSourceUrlDiv");

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
    CREATE_CHANNEL_URL_DIV.hidden = !(createChannelType === "EXTERNAL");
});

CREATE_CHANNEL_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let name = CREATE_CHANNEL_NAME_INPUT.value;
    let thumbnailImageId = CREATE_CHANNEL_THUMBNAIL_IMAGE_ID_INPUT.value;
    let archiveFolderAssetId = CREATE_CHANNEL_ARCHIVE_FOLDER_ASSET_ID_INPUT.value;
    let isSecureOutput = (CREATE_CHANNEL_IS_SECURE_OUTPUT_INPUT.value === "true");
    let outputScreenshots = (CREATE_CHANNEL_OUTPUT_SCREENSHOTS_INPUT.value === "true");
    let type = CREATE_CHANNEL_TYPE_INPUT.value;
    let url = CREATE_CHANNEL_URL_INPUT.value;

    createChannelMain(name, thumbnailImageId, archiveFolderAssetId, isSecureOutput, outputScreenshots, type, url);
});

UPDATE_CHANNEL_TYPE_INPUT.addEventListener("change", function (event)
{
    event.preventDefault();

    let channelType = UPDATE_CHANNEL_TYPE_INPUT.value;
    UPDATE_CHANNEL_URL_DIV.hidden = !(channelType === "EXTERNAL");
});

UPDATE_CHANNEL_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let id = UPDATE_CHANNEL_ID_INPUT.value;
    let name = UPDATE_CHANNEL_NAME_INPUT.value;
    let thumbnailImageId = UPDATE_CHANNEL_THUMBNAIL_IMAGE_ID_INPUT.value;
    let archiveFolderAssetId = UPDATE_CHANNEL_ARCHIVE_FOLDER_ASSET_ID_INPUT.value;
    let isSecureOutput = (UPDATE_CHANNEL_IS_SECURE_OUTPUT_INPUT.value === "true");
    let outputScreenshots = (UPDATE_CHANNEL_OUTPUT_SCREENSHOTS_INPUT.value === "true");
    let type = UPDATE_CHANNEL_TYPE_INPUT.value;
    let url = UPDATE_CHANNEL_URL_INPUT.value;

    updateChannelMain(id, name, thumbnailImageId, archiveFolderAssetId, isSecureOutput, outputScreenshots, 
                      type, url);
});

CREATE_SOURCE_TYPE_INPUT.addEventListener("change", function (event) 
{
    event.preventDefault();

    let sourceType = CREATE_SOURCE_TYPE_INPUT.value;
    CREATE_INPUT_SOURCE_URL_DIV.hidden = !(sourceType === "RTMP_PUSH" || sourceType === "URL_PULL");
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
    UPDATE_INPUT_SOURCE_URL_DIV.hidden = !(sourceType === "RTMP_PUSH" || sourceType === "URL_PULL");
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

    let addChannelId = ADD_CHANNEL_ID_INPUT.value;
    let addInputId = ADD_INPUT_ID_INPUT.value;

    addMain(addChannelId, addInputId);
});

REMOVE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let removeChannelId = REMOVE_CHANNEL_ID_INPUT.value;
    let removeInputId = REMOVE_INPUT_ID_INPUT.value;

    removeMain(removeChannelId, removeInputId);
});

DELETE_CHANNEL_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let deleteChannelId = DELETE_CHANNEL_ID_INPUT.value;

    deleteChannelMain(deleteChannelId);
});

DELETE_INPUT_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let deleteInputId = DELETE_INPUT_ID_INPUT.value;

    deleteInputMain(deleteInputId);
});


async function createChannelMain(NAME, THUMBNAIL_IMAGE_ID, ARCHIVE_FOLDER_ASSET_ID, IS_SECURE_OUTPUT, 
                                 OUTPUT_SCREENSHOTS, TYPE, URL)
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
                                                IS_SECURE_OUTPUT, OUTPUT_SCREENSHOTS, TYPE, URL);
        console.log(JSON.stringify(CHANNEL, null, 4));

        console.log("Adding slate to Live Channel...");
        const ADD_ASSET_SCHEDULE_EVENT_OBJECT = addAssetScheduleEvent(AUTH_TOKEN, guidHelpers.newGuid(), CHANNEL.id, 
                                                                      prjConstants.SLATE_ASSET_ID, null);
        console.log(JSON.stringify(ADD_ASSET_SCHEDULE_EVENT_OBJECT, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function updateChannelMain(ID, NAME,THUMBNAIL_IMAGE_ID, ARCHIVE_FOLDER_ASSET_ID, IS_SECURE_OUTPUT, 
                                 OUTPUT_SCREENSHOTS, TYPE, URL)
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
                                                IS_SECURE_OUTPUT, OUTPUT_SCREENSHOTS, TYPE, URL);
        console.log(JSON.stringify(CHANNEL, null, 4));

        console.log("Updating slate of Live Channel...");
        const ASSET_SCHEDULE_EVENT_OBJECT = updateAssetScheduleEvent(AUTH_TOKEN, guidHelpers.newGuid(), 
                                                                     CHANNEL.id, prjConstants.SLATE_ASSET_ID, null);
        console.log(JSON.stringify(ASSET_SCHEDULE_EVENT_OBJECT, null, 4));
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
        const CHANNEL = await startLiveChannel(AUTH_TOKEN, START_CHANNEL_ID);
        console.log(JSON.stringify(CHANNEL, null, 4));
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
        const CHANNEL = await stopLiveChannel(AUTH_TOKEN, STOP_CHANNEL_ID);
        console.log(JSON.stringify(CHANNEL, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function addMain(ADD_CHANNEL_ID, ADD_INPUT_ID)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        const CHANNEL_INFO = await getLiveChannel(AUTH_TOKEN, ADD_CHANNEL_ID);
        const PREVIOUS_ID = CHANNEL_INFO.previousId;

        console.log("Adding input to channel...");
        const CHANNEL = await addInputScheduleEvent(AUTH_TOKEN, ADD_CHANNEL_ID, ADD_INPUT_ID, PREVIOUS_ID);
        console.log(JSON.stringify(CHANNEL, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function removeMain(REMOVE_CHANNEL_ID, REMOVE_INPUT_ID)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Removing input from channel...");
        const CHANNEL = await removeInputScheduleEvent(AUTH_TOKEN, REMOVE_CHANNEL_ID, REMOVE_INPUT_ID);
        console.log(JSON.stringify(CHANNEL, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function deleteChannelMain(DELETE_CHANNEL_ID)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Deleting channel...");
        const CHANNEL = await deleteLiveChannel(AUTH_TOKEN, DELETE_CHANNEL_ID);
        console.log(JSON.stringify(CHANNEL, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

