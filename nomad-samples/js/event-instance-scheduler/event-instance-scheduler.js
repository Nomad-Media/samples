import creatingAndUploadingEventInstance from "./event-instance/create-upload-instance.js";
import deletingEventInstance from "./event-instance/delete-instance.js";
import getCheckboxDates from "./helpers/process-dates.js";
import newGuid from "./helpers/guid-helpers.js";

const AUTH_FORM = document.getElementById("authForm");
const CREATE_FORM = document.getElementById("createForm");
const DELETE_FORM = document.getElementById("deleteForm");

const TOKEN_INPUT = document.getElementById("authInput");
const CREATE_ID_INPUT = newGuid();
const CONTENT_ID_INPUT = document.getElementById("contentIdInput");
const CONTENT_DEFINITION_ID_INPUT = document.getElementById("contentDefinitionIdInput");
const INSTANCE_NAME_INPUT = document.getElementById("instanceNameInput");
const START_DATETIME_INPUT = document.getElementById("startDatetimeInput");
const END_DATETIME_INPUT = document.getElementById("endDatetimeInput");
const RECURRING_WEEKS_INPUT = document.getElementById("recurringWeeksInput");
const START_TIME_INPUT = document.getElementById("startTimeInput");
const END_TIME_INPUT = document.getElementById("endTimeInput");
const DATE_CHECKBOX = document.getElementsByName("dateCheckbox");
const IS_RECURRING = document.getElementById("isRecurring");
const IS_NOT_RECURRING = document.getElementById("isNotRecurring");
const RECURRING_INPUT = document.getElementById("recurringInput");
const DISABLED_INPUT = document.getElementById("disabledInput");
const IS_SERIES = document.getElementById("isSeries");
const IS_NOT_SERIES = document.getElementById("isNotSeries");
const SERIES_INPUT = document.getElementById("seriesInput");
const SERIES_DESCRIPTION_INPUT = document.getElementById("seriesDescriptionInput");
const SERIES_ID_INPUT = document.getElementById("seriesIdInput");
const OVERRIDE_SERIES_DETAILS_INPUT = document.getElementById("overrideSeriesDetailsInput");
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

IS_RECURRING.hidden = true;
IS_NOT_RECURRING.hidden = false;

RECURRING_INPUT.addEventListener("change", function(event)
{
    event.preventDefault();

    const RECURRING = RECURRING_INPUT.value

    if (RECURRING === "true") 
    {
        IS_RECURRING.hidden = false;
        IS_NOT_RECURRING.hidden = true;
    }
    else
    {
        IS_RECURRING.hidden = true;
        IS_NOT_RECURRING.hidden = false;
    }
});

IS_SERIES.hidden = true;
IS_NOT_SERIES.hidden = false;

SERIES_INPUT.addEventListener("change", function(event)
{
    event.preventDefault();

    const SERIES = SERIES_INPUT.value;

    if (SERIES === "no") 
    {
        IS_SERIES.hidden = true;
        IS_NOT_SERIES.hidden = false;
    }
    else
    {
        IS_SERIES.hidden = false;
        IS_NOT_SERIES.hidden = true;
    }
});

IS_NOT_SERIES.hidden = false

OVERRIDE_SERIES_DETAILS_INPUT.addEventListener("change", function(event)
{
    event.preventDefault();

    OVERRIDE_SERIES_DETAILS_INPUT.value === "true" ? IS_NOT_SERIES.hidden = false : IS_NOT_SERIES.hidden = true;

});

CREATE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let createId = CREATE_ID_INPUT.value;
    let contentId = CONTENT_ID_INPUT.value;
    let contentDefinitionId = CONTENT_DEFINITION_ID_INPUT.value;
    let instanceName = INSTANCE_NAME_INPUT.value;
    let startDatetime = START_DATETIME_INPUT.value + 'Z';
    let endDatetime = END_DATETIME_INPUT.value + 'Z';
    let recurringWeeks = parseInt(RECURRING_WEEKS_INPUT.value);
    let startTime = START_TIME_INPUT.value  + ':00.000Z';
    let endTime = END_TIME_INPUT.value + ':00.000Z';
    let dateCheckbox = getCheckboxDates(DATE_CHECKBOX, START_TIME_INPUT.value);
    let seriesDescription = SERIES_DESCRIPTION_INPUT.value;
    let seriesId = SERIES_ID_INPUT.value;
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
    let overrideSeriesDetails = OVERRIDE_SERIES_DETAILS_INPUT.value === "true"? true: false;
    let recurring = RECURRING_INPUT.value === "true" ? true : false;
    let isCurrentSeries = SERIES_INPUT.value === "yes" ? true : false;

    creatingAndUploadingEventInstanceMain(createId, contentId, contentDefinitionId, instanceName, 
        startDatetime, endDatetime, recurringWeeks, startTime, endTime, dateCheckbox, 
        disabled, description, slateVideoId, prerollVideoId, postrollVideoId, isSecureOutput, 
        archiveFolder, liveInputAId, liveInputBId, primaryLiveStreamUrl, backupLivestreamUrl, 
        overrideSeriesDetails, seriesDescription, seriesId, recurring, isCurrentSeries);
});

DELETE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let deleteId = DELETE_ID_INPUT.value;
    let contentDefinitionId = DELETE_CONTENT_DEFINITION_ID.value;

    deletingEventInstanceMain(deleteId, contentDefinitionId)
});

async function creatingAndUploadingEventInstanceMain(CREATE_ID, CONTENT_ID, CONTENT_DEFINITION_ID, 
    INSTANCE_NAME, START_DATETIME, END_DATETIME, RECURRING_WEEKS, START_TIME, END_TIME, DATE_CHECKBOX, 
    DISABLED, DESCRIPTION, SLATE_VIDEO_ID, PREROLL_VIDEO_ID, POSTROLL_VIDEO_ID, IS_SECURE_OUTPUT, 
    ARCHIVE_FOLDER, LIVE_INPUT_A_ID, LIVE_INPUT_B_ID, PRIMARY_LIVE_STREAM_URL, BACKUP_LIVESTREAM_URL,
    OVERRIDE_SERIES_DETAILS, SERIES_DESCRIPTION, SERIES_ID, RECURRING, IS_CURRENT_SERIES)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Creating/Updating event instance");
        const CREATE_INFO = await creatingAndUploadingEventInstance(sessionStorage.getItem("token"), 
            CREATE_ID, CONTENT_ID, CONTENT_DEFINITION_ID, INSTANCE_NAME, START_DATETIME, END_DATETIME, 
            RECURRING_WEEKS, START_TIME, END_TIME, DATE_CHECKBOX, DISABLED, DESCRIPTION, 
            SLATE_VIDEO_ID, PREROLL_VIDEO_ID, POSTROLL_VIDEO_ID, IS_SECURE_OUTPUT, ARCHIVE_FOLDER, 
            LIVE_INPUT_A_ID, LIVE_INPUT_B_ID, PRIMARY_LIVE_STREAM_URL, BACKUP_LIVESTREAM_URL, 
            OVERRIDE_SERIES_DETAILS, SERIES_DESCRIPTION, SERIES_ID, RECURRING, IS_CURRENT_SERIES);
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
        throw new Error("Authentication token: The authentication token is empty");
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