import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11.1.5/src/sweetalert2.js";

import * as prjConstants from "./constants/project-constants.js";
import * as guidHelpers from "./helpers/guid-helpers.js";

import slugify from "./helpers/slugify.js";

import createLiveChannel from "./live-channel/create-live-channel.js";
import deleteLiveChannel from "./live-channel/delete-live-channel.js";
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
const CHANNEL_TYPE_INPUT = document.getElementById("channelTypeInput");
const CREATE_INPUT_FORM = document.getElementById("createInputForm");
const START_CHANNEL_FORM = document.getElementById("startChannelForm");
const STOP_CHANNEL_FORM = document.getElementById("stopChannelForm");
const ADD_FORM = document.getElementById("addForm");
const REMOVE_FORM = document.getElementById("removeForm");
const DELETE_CHANNEL_FORM = document.getElementById("deleteChannelForm");
const DELETE_INPUT_FORM = document.getElementById("deleteInputForm");

const TOKEN_INPUT = document.getElementById("authInput");
const CREATE_CHANNEL_NAME_INPUT = document.getElementById("createChannelNameInput");
const CREATE_INPUT_NAME_INPUT = document.getElementById("createInputNameInput");
const CREATE_INPUT_SOURCE_URL_INPUT = document.getElementById("createInputSourceUrlInput");
const SOURCE_TYPE_INPUT = document.getElementById("sourceTypeInput");
const START_CHANNEL_ID_INPUT = document.getElementById("startChannelIdInput");
const STOP_CHANNEL_ID_INPUT = document.getElementById("stopChannelIdInput");
const ADD_CHANNEL_ID_INPUT = document.getElementById("addChannelIdInput");
const ADD_INPUT_ID_INPUT = document.getElementById("addInputIdInput");
const REMOVE_CHANNEL_ID_INPUT = document.getElementById("removeChannelIdInput");
const REMOVE_INPUT_ID_INPUT = document.getElementById("removeInputIdInput");
const DELETE_CHANNEL_ID_INPUT = document.getElementById("deleteChannelIdInput");
const DELETE_INPUT_ID_INPUT = document.getElementById("deleteInputIdInput");

sessionStorage.clear();

AUTH_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    sessionStorage.setItem("token", TOKEN_INPUT.value);
    console.log("Successfuly updated token");
});

CREATE_CHANNEL_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let createChannelName = CREATE_CHANNEL_NAME_INPUT.value;
    let channelType = CHANNEL_TYPE_INPUT.value;

    createChannelMain(createChannelName, channelType);
});

CREATE_INPUT_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let createInputName = CREATE_INPUT_NAME_INPUT.value;
    let createInputSourceUrl = CREATE_INPUT_SOURCE_URL_INPUT.value;
    let sourceType = SOURCE_TYPE_INPUT.value;

    createInputMain(createInputName, createInputSourceUrl, sourceType);
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


async function createChannelMain(CREATE_CHANNEL_NAME, CHANNEL_TYPE)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        const CHANNEL_OBJECT = {
            name: CREATE_CHANNEL_NAME,
            route: slugify(CREATE_CHANNEL_NAME),
            type: liveChannelTypes[CHANNEL_TYPE],
            archiveFolderAsset: {
                "id": ARCHIVE_FOLDER_ASSET_ID 
            }
        };

        console.log("Creating channel...");
        const CHANNEL = await createLiveChannel(AUTH_TOKEN, CHANNEL_OBJECT);
        console.log(JSON.stringify(CHANNEL, null, 4));

        const SLATE_OBJECT = {
            id: guidHelpers.newGuid(),
            channelId: CHANNEL.id,
            assetId: prjConstants.SLATE_ASSET_ID,
            previousId: null,
        }

        console.log("Adding slate to Live Channel...");

        const ADD_ASSET_SCHEDULE_EVENT_OBJECT = addAssetScheduleEvent(AUTH_TOKEN, SLATE_OBJECT);
        console.log(JSON.stringify(ADD_ASSET_SCHEDULE_EVENT_OBJECT, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function createInputMain(CREATE_INPUT_NAME, CREATE_INPUT_SOURCE_URL, SOURCE_TYPE)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        const INPUT_OBJECT = {
            name: CREATE_INPUT_NAME,
            internalName: slugify(CREATE_INPUT_NAME),
            source: CREATE_INPUT_SOURCE_URL,
            type: liveInputTypes[SOURCE_TYPE]
        };

        console.log("Creating input...");
        const INPUT = await createLiveInput(AUTH_TOKEN, INPUT_OBJECT);
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
        console.log("Adding input to channel...");
        const CHANNEL = await addInputScheduleEvent(AUTH_TOKEN, ADD_CHANNEL_ID, ADD_INPUT_ID);
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

