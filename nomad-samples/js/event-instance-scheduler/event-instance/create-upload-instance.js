import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function creatingAndUploadingEventInstance(AUTH_TOKEN, ID, CONTENT_ID, 
    CONTENT_DEFINITION_ID, INSTANCE_NAME, START_DATETIME, END_DATETIME, DISABLED, DESCRIPTION, 
    SLATE_VIDEO_ID, PREROLL_VIDEO_ID, POSTROLL_VIDEO_ID, IS_SECURE_OUTPUT, ARCHIVE_FOLDER, 
    LIVE_INPUT_A_ID, LIVE_INPUT_B_ID, PRIMARY_LIVE_STREAM_URL, BACKUP_LIVESTREAM_URL, 
    SERIES_DESCRIPTION, SERIES_ID) 
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
            description: DESCRIPTION,
            prerollVideo: {
                id: PREROLL_VIDEO_ID
            },
            postrollVideo: {
                id: POSTROLL_VIDEO_ID
            },
            isSecureOutput: IS_SECURE_OUTPUT,
            primaryLiveStreamInputUrl: PRIMARY_LIVE_STREAM_URL,
            series: {
                properties: {}
            }
        },

        series: {
            properties: {}
        }
    };

    if (CONTENT_ID != "")
    {
        BODY.contentId = CONTENT_ID;
    }

    if (ARCHIVE_FOLDER != "")
    {
        BODY.properties.archiveFolder = { id: ARCHIVE_FOLDER }; 
    }

    if (SLATE_VIDEO_ID != "")
    {
        BODY.properties.slateVideo = { id: SLATE_ID }
    }

    if (LIVE_INPUT_A_ID != "")
    {
        BODY.properties.liveInputA = { id: LIVE_INPUT_A_ID };
    }

    if (LIVE_INPUT_B_ID != "")
    {
        BODY.properties.liveInputB = { id: LIVE_INPUT_B_ID };
    }

    if (BACKUP_LIVESTREAM_URL != "")
    {
        BODY.properties.backupLiveStreamInputUrl = LIVE_INPUT_B_ID;
    }

    if (SERIES_DESCRIPTION != "")
    {
        //BODY
        BODY.properties.series.description = SERIES_DESCRIPTION;
    }

    if (SERIES_ID != "")
    {
        BODY.propertie.series.id = SERIES_ID;
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
    await await apiExceptionHandler(RESPONSE, "Creating/Updating event instance failed");
}