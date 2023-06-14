import creatingAndUploadingEventInstance from "./event-instance/create-upload-instance.js";
import deletingEventInstance from "./event-instance/delete-instance.js";

const AUTH_FORM = document.getElementById("authForm");
const CREATE_FORM = document.getElementById("createForm");
const DELETE_FORM = document.getElementById("deleteForm");

const TOKEN_INPUT = document.getElementById("authInput");
const CREATE_ID_INPUT = document.getElementById("createIdInput");
const CONTENT_ID_INPUT = document.getElementById("contentIdInput");
const CONTENT_DEFINITION_ID_INPUT = document.getElementById("contentDefinitionIdInput");
const INSTANCE_NAME_INPUT = document.getElementById("instanceNameInput");
const START_DATETIME_INPUT = document.getElementById("startDatetimeInput");
const END_DATETIME_INPUT = document.getElementById("endDatetimeInput");
const DISABLED_INPUT = document.getElementById("disabledInput");
const DESCRIPTION_INPUT = document.getElementById("descriptionInput");
const SLATE_VIDEO_ID_INPUT = document.getElementById("slateVideoIdInput");
const PREROLL_VIDEO_ID_INPUT = document.getElementById("prerollVideoIdInput");
const POSTROLL_VIDEO_ID_INPUT = document.getElementById("postrollVideoIdInput");
const IS_SECURE_OUTPUT_INPUT = document.getElementById("isSecureOutputInput");
const ARCHIVE_FOLDER_INPUT = document.getElementById("archiveFolderInput");
const LIVE_INPUT_A_ID_INPUT = document.getElementById("liveInputAIdInput");
const LIVE_INPUT_B_ID_INPUT = document.getElementById("liveInputBIdInput");
const PRIMARY_LIVESTREAM_URL_INPUT = document.getElementById("primaryLivestreamUrlInput");
const BACKUP_LIVESTREAM_URL_INPUT = document.getElementById("backupLivestreamUrlInput");
const DELETE_ID_INPUT = document.getElementById("deleteIdInput");
const DELETE_CONTENT_DEFINITION_ID = document.getElementById("deleteContentDefinitionIdInput");

AUTH_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    sessionStorage.setItem("token", TOKEN_INPUT.value);
    console.log("Successfuly updated token");
});

CREATE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let createId = CREATE_ID_INPUT.value;
    let contentId = CONTENT_ID_INPUT.value;
    let contentDefinitionId = CONTENT_DEFINITION_ID_INPUT.value;
    let instanceName = INSTANCE_NAME_INPUT.value;
    let startDatetime = START_DATETIME_INPUT.value;
    let endDatetime = END_DATETIME_INPUT.value;
    let disabled = (DISABLED_INPUT.value === "true" ? true : false);
    let description = DESCRIPTION_INPUT.value;
    let slateVideoId = SLATE_VIDEO_ID_INPUT.value;
    let prerollVideoId = PREROLL_VIDEO_ID_INPUT.value;
    let postrollVideoId = POSTROLL_VIDEO_ID_INPUT.value;
    let isSecureOutput = (IS_SECURE_OUTPUT_INPUT.value === "true" ? true : false);
    let archiveFolder = ARCHIVE_FOLDER_INPUT.value;
    let liveInputAId = LIVE_INPUT_A_ID_INPUT.value;
    let liveInputBId = LIVE_INPUT_B_ID_INPUT.value;
    let primaryLiveStreamUrl = PRIMARY_LIVESTREAM_URL_INPUT.value;
    let backupLivestreamUrl = BACKUP_LIVESTREAM_URL_INPUT.value;

    creatingAndUploadingEventInstanceMain(createId, contentId, contentDefinitionId, instanceName, startDatetime, endDatetime, disabled, description, slateVideoId, prerollVideoId, postrollVideoId, isSecureOutput, archiveFolder, liveInputAId, liveInputBId, primaryLiveStreamUrl, backupLivestreamUrl);
});

DELETE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let deleteId = DELETE_ID_INPUT.value;
    let contentDefinitionId = DELETE_CONTENT_DEFINITION_ID.value;

    deletingEventInstanceMain(deleteId, contentDefinitionId)
});

async function creatingAndUploadingEventInstanceMain(CREATE_ID, CONTENT_ID, CONTENT_DEFINITION_ID, INSTANCE_NAME, START_DATETIME, END_DATETIME, DISABLED, DESCRIPTION, SLATE_VIDEO_ID, PREROLL_VIDEO_ID, POSTROLL_VIDEO_ID, IS_SECURE_OUTPUT, ARCHIVE_FOLDER, LIVE_INPUT_A_ID, LIVE_INPUT_B_ID, PRIMARY_LIVE_STREAM_URL, BACKUP_LIVESTREAM_URL)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authorization token: The authorization token is empty");
    }

    try
    {
        console.log("Creating/Updating event instance");
        const CREATE_INFO = await creatingAndUploadingEventInstance(sessionStorage.getItem("token"), CREATE_ID, CONTENT_ID, CONTENT_DEFINITION_ID, INSTANCE_NAME, START_DATETIME, END_DATETIME, DISABLED, DESCRIPTION, SLATE_VIDEO_ID, PREROLL_VIDEO_ID, POSTROLL_VIDEO_ID, IS_SECURE_OUTPUT, ARCHIVE_FOLDER, LIVE_INPUT_A_ID, LIVE_INPUT_B_ID, PRIMARY_LIVE_STREAM_URL, BACKUP_LIVESTREAM_URL);
        console.log(JSON.stringify(CREATE_INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function deletingEventInstanceMain(DELETE_ID, CONTENT_DEFINITION_ID)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authorization token: The authorization token is empty");
    }

    try
    {
        console.log("Deleting event instance");
        await deletingEventInstance(sessionStorage.getItem("token"), DELETE_ID, CONTENT_DEFINITION_ID);
        console.log("Successfully deleted event instance");
    }
    catch (error)
    {
        throw new Error(error);
    }
}