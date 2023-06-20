import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function creatingAndUploadingEventInstance(AUTH_TOKEN, ID, CONTENT_ID, 
    CONTENT_DEFINITION_ID, INSTANCE_NAME, START_DATETIME, END_DATETIME, DISABLED, DESCRIPTION, 
    SLATE_VIDEO_ID, PREROLL_VIDEO_ID, POSTROLL_VIDEO_ID, IS_SECURE_OUTPUT, ARCHIVE_FOLDER, 
    LIVE_INPUT_A_ID, LIVE_INPUT_B_ID, PRIMARY_LIVE_STREAM_URL, BACKUP_LIVESTREAM_URL, 
    OVERRIDE_SERIES_DETAILS, SERIES_DESCRIPTION, SERIES_ID) 
{
		// Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
    const BODY = {
        contentDefinitionId: CONTENT_DEFINITION_ID,

        properties: {
            instanceName: INSTANCE_NAME,
            startDatetime: START_DATETIME,
            endDatetime: END_DATETIME,
            disabled: DISABLED,
            overrideSeriesDetails: OVERRIDE_SERIES_DETAILS,
            isSecureOutput: IS_SECURE_OUTPUT,
            series: {
                properties: {}
            }
        },

        series: {
            properties: {}
        }
    };

    DESCRIPTION != "" ? BODY.description = DESCRIPTION : BODY.description = "";

    PREROLL_VIDEO_ID != "" ? BODY.properties.prerollVideo = { id: PREROLL_VIDEO_ID } : BODY.properties.prerollVideo = "";

    POSTROLL_VIDEO_ID != "" ? BODY.properties.postrollVideo = { id: POSTROLL_VIDEO_ID } : BODY.properties.postrollVideo = "";
    
    PRIMARY_LIVE_STREAM_URL != "" ? BODY.properties.primaryLiveStreamInputUrl = PRIMARY_LIVE_STREAM_URL : BODY.properties.primaryLiveStreamInputUrl = "";

    if (CONTENT_ID != "")
    { 
        BODY.contentId = CONTENT_ID 
    }

    ARCHIVE_FOLDER != "" ? BODY.properties.archiveFolder = { id: ARCHIVE_FOLDER } : BODY.properties.archiveFolder = "";

    SLATE_VIDEO_ID != "" ? BODY.properties.slateVideo = { id: SLATE_ID } : BODY.properties.slateVideo = "";

    LIVE_INPUT_A_ID != "" ? BODY.properties.liveInputA = { id: LIVE_INPUT_A_ID } : BODY.properties.liveInputA = "";

    LIVE_INPUT_B_ID != "" ? BODY.properties.liveInputB = { id: LIVE_INPUT_B_ID } : BODY.properties.liveInputB = "";

    BACKUP_LIVESTREAM_URL != "" ? BODY.properties.backupLiveStreamInputUrl = LIVE_INPUT_B_ID : BODY.properties.backupLiveStreamInputUrl = "";

    SERIES_DESCRIPTION != "" ? BODY.properties.series.description = SERIES_DESCRIPTION : BODY.properties.series.description = "";

    SERIES_ID != "" ?  BODY.properties.series.id = SERIES_ID : BODY.properties.series.id = "";

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
    await await apiExceptionHandler(RESPONSE, "Creating/Updating event instance failed");
}