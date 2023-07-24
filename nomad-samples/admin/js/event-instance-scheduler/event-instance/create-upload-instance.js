import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function creatingAndUploadingEventInstance(AUTH_TOKEN, ID, CONTENT_ID, 
    CONTENT_DEFINITION_ID, INSTANCE_NAME, START_DATETIME, END_DATETIME, RECURRING_WEEKS, START_TIME, 
    END_TIME, DATE_CHECKBOX, DISABLED, DESCRIPTION, SLATE_VIDEO_ID, PREROLL_VIDEO_ID, 
    POSTROLL_VIDEO_ID, IS_SECURE_OUTPUT, ARCHIVE_FOLDER, LIVE_INPUT_A_ID, LIVE_INPUT_B_ID, 
    PRIMARY_LIVE_STREAM_URL, BACKUP_LIVESTREAM_URL, OVERRIDE_SERIES_DETAILS, SERIES_DESCRIPTION, 
    SERIES_ID, RECURRING, IS_CURRENT_SERIES) 
{

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const DATE = DATE_CHECKBOX.startDate;

    const BODY = {
        contentDefinitionId: CONTENT_DEFINITION_ID,

        properties: {
            instanceName: INSTANCE_NAME,
            startDatetime: RECURRING ? `${DATE.getFullYear()}-${DATE.getMonth() + 1}-${DATE.getDate()}T${START_TIME}` : START_DATETIME,
            endDatetime: RECURRING ? `${DATE.getFullYear()}-${DATE.getMonth() + 1}-${DATE.getDate()}T${END_TIME}` : END_DATETIME,
            disabled: DISABLED,
            overrideSeriesDetails: OVERRIDE_SERIES_DETAILS,
            isRecurring: RECURRING,
        },
    };

    if (RECURRING)
    {
        BODY.properties.recurringDays = DATE_CHECKBOX.dates;
        BODY.properties.recurringWeeks = RECURRING_WEEKS;
    }

    if (IS_CURRENT_SERIES)
    {
        BODY.properties.series = {
            description: SERIES_DESCRIPTION,
            id: SERIES_ID,
            properties: {}
        };
    }

    if (OVERRIDE_SERIES_DETAILS || !IS_CURRENT_SERIES)
    {
        BODY.description = DESCRIPTION;
        BODY.isSecureOutput = IS_SECURE_OUTPUT;
        BODY.primaryLiveStreamInputUrl = PRIMARY_LIVE_STREAM_URL;
        BODY.backupLiveStreamInputUrl = BACKUP_LIVESTREAM_URL;
        BODY.properties = {
            prerollVideo: PREROLL_VIDEO_ID === "" ? "" : { id: PREROLL_VIDEO_ID },
            postrollVideo: POSTROLL_VIDEO_ID === "" ? "" : { id: POSTROLL_VIDEO_ID },
            archiveFolder: ARCHIVE_FOLDER === "" ? "" : { id: ARCHIVE_FOLDER },
            slateVideo: SLATE_VIDEO_ID === "" ? "" : { id: SLATE_VIDEO_ID },
            liveInputA: LIVE_INPUT_A_ID === "" ? "" : { id: LIVE_INPUT_A_ID },
            liveInputB: LIVE_INPUT_B_ID === "" ? "" : { id: LIVE_INPUT_B_ID },
        };
    }

    if (CONTENT_ID != "")
    { 
        BODY.contentId = CONTENT_ID;
    }
    // Post
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/content/${ID}`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(BODY)
    }).catch((exception) => {
        throw exception;
    });

    // Check for success
    if (RESPONSE.ok) {
        // Get the JSON from the response
        const INFO = await RESPONSE.json();

        return INFO;
    }
		
  	// There was an error
    await apiExceptionHandler(RESPONSE, "Creating/Updating event instance failed");
}