import * as guidHelpers from "./helpers/guid-helpers.js";

import createLiveChannel from "./live-channel/create-live-channel.js";
import deleteLiveChannel from "./live-channel/delete-live-channel.js";
import getLiveChannel from "./live-channel/get-live-channel.js";
import getLiveChannels from "./live-channel/get-live-channels.js";
import startLiveChannel from "./live-channel/start-live-channel.js";
import stopLiveChannel from "./live-channel/stop-live-channel.js";
import updateLiveChannel from "./live-channel/update-live-channel.js";

import createLiveInput from "./live-input/create-live-input.js";
import deleteInput from "./live-input/delete-live-input.js";
import getLiveInput from "./live-input/get-live-input.js";
import getLiveInputs from "./live-input/get-live-inputs.js";
import updateLiveInput from "./live-input/update-live-input.js";

import addAssetScheduleEvent from "./schedule-event/add-asset-schedule-event.js";
import removeAssetScheduleEvent from "./schedule-event/remove-asset-schedule-event.js";
import addInputScheduleEvent from "./schedule-event/add-input-schedule-event.js";
import removeInputScheduleEvent from "./schedule-event/remove-input-schedule-event.js";

import cancelBroadcast from "./live-operator/cancel-broadcast.js";
import cancelSegment from "./live-operator/cancel-segment.js";
import completeSegment from "./live-operator/complete-segment.js";
import getCompletedSegments from "./live-operator/get-completed-segments.js";
import getLiveOperator from "./live-operator/get-live-operator.js";
import getLiveOperators from "./live-operator/get-live-operators.js";
import startBroadcast from "./live-operator/start-broadcast.js";
import startSegment from "./live-operator/start-segment.js";
import stopBroadcast from "./live-operator/stop-broadcast.js";

const AUTH_FORM = document.getElementById("authForm");
const GET_CHANNELS_FORM = document.getElementById("getChannelsForm");
const GET_CHANNEL_FORM = document.getElementById("getChannelForm");
const CREATE_CHANNEL_FORM = document.getElementById("createChannelForm");
const UPDATE_CHANNEL_FORM = document.getElementById("updateChannelForm");
const ADD_ASSET_FORM = document.getElementById("addAssetForm");
const REMOVE_ASSET_FORM = document.getElementById("removeAssetForm");
const GET_INPUTS_FORM = document.getElementById("getInputsForm");
const GET_INPUT_FORM = document.getElementById("getInputForm");
const CREATE_INPUT_FORM = document.getElementById("createInputForm");
const UPDATE_INPUT_FORM = document.getElementById("updateInputForm");
const START_CHANNEL_FORM = document.getElementById("startChannelForm");
const STOP_CHANNEL_FORM = document.getElementById("stopChannelForm");
const ADD_FORM = document.getElementById("addForm");
const REMOVE_FORM = document.getElementById("removeForm");
const DELETE_CHANNEL_FORM = document.getElementById("deleteChannelForm");
const DELETE_INPUT_FORM = document.getElementById("deleteInputForm");
const GET_OPERATORS_FORM = document.getElementById("getOperatorsForm");
const GET_OPERATOR_FORM = document.getElementById("getOperatorForm");
const START_BROADCAST_FORM = document.getElementById("startBroadcastForm");
const CANCEL_BROADCAST_FORM = document.getElementById("cancelBroadcastForm");
const STOP_BROADCAST_FORM = document.getElementById("stopBroadcastForm");
const GET_COMPLETED_SEGMENTS_FORM = document.getElementById("getCompletedSegmentsForm");
const START_SEGMENT_FORM = document.getElementById("startSegmentForm");
const CANCEL_SEGMENT_FORM = document.getElementById("cancelSegmentForm");
const COMPLETE_SEGMENT_FORM = document.getElementById("completeSegmentForm");

const TOKEN_INPUT = document.getElementById("authInput");
const GET_LIVE_CHANNEL_ID_INPUT = document.getElementById("getLiveChannelIdInput");
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
const GET_INPUT_ID_INPUT = document.getElementById("getInputIdInput");
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
const GET_OPERATOR_ID_INPUT = document.getElementById("getOperatorIdInput");
const START_BROADCAST_CHANNEL_ID_INPUT = document.getElementById("startBroadcastChannelIdInput");
const START_BROADCAST_PREROLL_ASSET_ID_INPUT = document.getElementById("startBroadcastPrerollAssetIdInput");
const START_BROADCAST_POSTROLL_ASSET_ID_INPUT = document.getElementById("startBroadcastPostrollAssetIdInput");
const START_BROADCAST_LIVE_INPUT_ID_INPUT = document.getElementById("startBroadcastLiveInputIdInput");
const START_BROADCAST_RELATED_CONTENT_IDS_INPUT = document.getElementById("startBroadcastRelatedContentIdsInput");
const START_BROADCAST_TAG_IDS_INPUT = document.getElementById("startBroadcastTagIdsInput");
const CANCEL_BROADCAST_CHANNEL_ID_INPUT = document.getElementById("cancelBroadcastChannelIdInput");
const STOP_BROADCAST_CHANNEL_ID_INPUT = document.getElementById("stopBroadcastChannelIdInput");
const GET_COMPLETED_SEGMENTS_CHANNEL_ID_INPUT = document.getElementById("getCompletedSegmentsChannelIdInput");
const START_SEGMENT_CHANNEL_ID_INPUT = document.getElementById("startSegmentChannelIdInput");
const CANCEL_SEGMENT_CHANNEL_ID_INPUT = document.getElementById("cancelSegmentChannelIdInput");
const COMPLETE_SEGMENT_CHANNEL_ID_INPUT = document.getElementById("completeSegmentChannelIdInput");
const COMPLETE_SEGMENT_RELATED_CONTENT_IDS_INPUT = document.getElementById("completeSegmentrelatedContentIdsInput");
const COMPLETE_SEGMENT_TAG_IDS_INPUT = document.getElementById("completeSegmentTagIdsInput");

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

GET_CHANNELS_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    getLiveChannelsMain();
});

GET_CHANNEL_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let getLiveChannelId = GET_LIVE_CHANNEL_ID_INPUT.value;

    getLiveChannelMain(getLiveChannelId);
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

GET_INPUTS_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    getLiveInputsMain();
});

GET_INPUT_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let getInputId = GET_INPUT_ID_INPUT.value;

    getLiveInputMain(getInputId);
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

GET_OPERATORS_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    getLiveOperatorsMain();
});

GET_OPERATOR_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let getOperatorId = GET_OPERATOR_ID_INPUT.value;

    getLiveOperatorMain(getOperatorId);
});

START_BROADCAST_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let channelId = START_BROADCAST_CHANNEL_ID_INPUT.value;
    let prerollAssetId = START_BROADCAST_PREROLL_ASSET_ID_INPUT.value;
    let postrollAssetId = START_BROADCAST_POSTROLL_ASSET_ID_INPUT.value;
    let liveInputId = START_BROADCAST_LIVE_INPUT_ID_INPUT.value;
    let relatedContentIds = START_BROADCAST_RELATED_CONTENT_IDS_INPUT.value;
    let tagIds = START_BROADCAST_TAG_IDS_INPUT.value;

    startBroadcastMain(channelId, prerollAssetId, postrollAssetId, liveInputId, 
                       relatedContentIds.split(","), tagIds.split(","));
});

CANCEL_BROADCAST_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let liveOperatorId = CANCEL_BROADCAST_CHANNEL_ID_INPUT.value;

    cancelBroadcastMain(liveOperatorId);
});

STOP_BROADCAST_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let liveOperatorId = STOP_BROADCAST_CHANNEL_ID_INPUT.value;

    stopBroadcastMain(liveOperatorId);
});

GET_COMPLETED_SEGMENTS_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let liveOperatorId = GET_COMPLETED_SEGMENTS_CHANNEL_ID_INPUT.value;

    getCompletedSegmentsMain(liveOperatorId);
});

START_SEGMENT_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let liveOperatorId = START_SEGMENT_CHANNEL_ID_INPUT.value;

    startSegmentMain(liveOperatorId);
});

CANCEL_SEGMENT_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let liveOperatorId = CANCEL_SEGMENT_CHANNEL_ID_INPUT.value;

    cancelSegmentMain(liveOperatorId);
});

COMPLETE_SEGMENT_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let liveOperatorId = COMPLETE_SEGMENT_CHANNEL_ID_INPUT.value;
    let relatedContentIds = COMPLETE_SEGMENT_RELATED_CONTENT_IDS_INPUT.value;
    let tagIds = COMPLETE_SEGMENT_TAG_IDS_INPUT.value;

    completeSegmentMain(liveOperatorId, relatedContentIds.split(","), tagIds.split(","));
});

async function getLiveChannelsMain()
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Getting live channels...");
        const CHANNELS = await getLiveChannels(AUTH_TOKEN);
        console.log(JSON.stringify(CHANNELS, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function getLiveChannelMain(GET_LIVE_CHANNEL_ID)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty")
    }

    try
    {
        console.log("Getting live channel...");
        const CHANNEL = await getLiveChannel(AUTH_TOKEN, GET_LIVE_CHANNEL_ID);
        console.log(JSON.stringify(CHANNEL, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

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

async function getLiveInputsMain()
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty")
    }

    try
    {
        console.log("Getting live inputs...");
        const INPUTS = await getLiveInputs(AUTH_TOKEN);
        console.log(JSON.stringify(INPUTS, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function getLiveInputMain(GET_INPUT_ID)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty")
    }

    try
    {
        console.log("Getting live input...");
        const INPUT = await getLiveInput(AUTH_TOKEN, GET_INPUT_ID);
        console.log(JSON.stringify(INPUT, null, 4));
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

async function getLiveOperatorsMain()
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty")
    }

    try
    {
        console.log("Getting live operators...");
        const LIVE_OPERATORS = await getLiveOperators(AUTH_TOKEN);
        console.log(JSON.stringify(LIVE_OPERATORS, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function getLiveOperatorMain(GET_OPERATOR_ID)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty")
    }

    try
    {
        console.log("Getting live operator...");
        const LIVE_OPERATOR = await getLiveOperator(AUTH_TOKEN, GET_OPERATOR_ID);
        console.log(JSON.stringify(LIVE_OPERATOR, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function startBroadcastMain(CHANNEL_ID, PREROLL_ASSET_ID, POSTROLL_ASSET_ID, LIVE_INPUT_ID,
                                  RELATED_CONTENT_IDS, TAG_IDS)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty")
    }

    try
    {
        console.log("Starting broadcast...");
        const BROADCAST = await startBroadcast(AUTH_TOKEN, CHANNEL_ID, PREROLL_ASSET_ID, 
                                               POSTROLL_ASSET_ID, LIVE_INPUT_ID, 
                                               RELATED_CONTENT_IDS, TAG_IDS);
        console.log(JSON.stringify(BROADCAST, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function cancelBroadcastMain(CHANNEL_ID)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty")
    }

    try
    {
        console.log("Canceling broadcast...");
        await cancelBroadcast(AUTH_TOKEN, CHANNEL_ID);
        console.log("Broadcast canceled");
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function stopBroadcastMain(CHANNEL_ID)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty")
    }

    try
    {
        console.log("Stopping broadcast...");
        await stopBroadcast(AUTH_TOKEN, CHANNEL_ID);
        console.log("Broadcast stopped");
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function getCompletedSegmentsMain(CHANNEL_ID)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty")
    }

    try
    {
        console.log("Getting completed segments...");
        const COMPLETED_SEGMENTS = await getCompletedSegments(AUTH_TOKEN, CHANNEL_ID);
        console.log(JSON.stringify(COMPLETED_SEGMENTS, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function startSegmentMain(CHANNEL_ID)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty")
    }

    try
    {
        console.log("Starting segment...");
        await startSegment(AUTH_TOKEN, CHANNEL_ID);
        console.log("Segment started");
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function cancelSegmentMain(CHANNEL_ID)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty")
    }

    try
    {
        console.log("Canceling segment...");
        await cancelSegment(AUTH_TOKEN, CHANNEL_ID);
        console.log("Segment canceled");
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function completeSegmentMain(CHANNEL_ID, RELATED_CONTENT_IDS, TAG_IDS)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty")
    }
    
    try
    {
        console.log("Completing segment...");
        await completeSegment(AUTH_TOKEN, CHANNEL_ID, RELATED_CONTENT_IDS, TAG_IDS);
        console.log("Segment completed");
    }
    catch (error)
    {
        throw new Error(error);
    }
}
