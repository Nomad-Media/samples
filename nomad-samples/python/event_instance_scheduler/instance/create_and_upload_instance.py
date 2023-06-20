from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def creating_and_uploading_event_instance(AUTH_TOKEN, ID, CONTENT_ID, CONTENT_DEFINITION_ID, 
                                          INSTANCE_NAME, START_DATETIME, END_DATETIME, 
                                          DISABLED, DESCRIPTION, SLATE_VIDEO_ID, 
                                          PREROLL_VIDEO_ID, POSTROLL_VIDEO_ID, 
                                          IS_SECURE_OUTPUT, ARCHIVE_FOLDER_ID, LIVE_INPUT_A,
                                          LIVE_INPUT_B, PRIMARY_LIVE_STREAM_INPUT_URL,
                                          BACKUP_LIVE_STREAM_INPUT_URL, OVERRIDE_SERIES_DETAILS,
                                          SERIES_DESCRIPTION, SERIES_ID) -> dict:

    # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = ADMIN_API_URL + "/content/" + ID
        
    # Create header for the request
    HEADERS = {
  	    "Authorization": "Bearer " + AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    # Build the payload BODY
    BODY = {
        "contentDefinitionId": CONTENT_DEFINITION_ID,

        "properties": {
            "instanceName": INSTANCE_NAME,
            "startDatetime": START_DATETIME,
            "endDatetime": END_DATETIME,
            "disabled": DISABLED,
            "description": DESCRIPTION,
            "isSecureOutput": IS_SECURE_OUTPUT,
            "primaryLiveStreamInputUrl": PRIMARY_LIVE_STREAM_INPUT_URL,
            "backupLiveStreamIputUrl": BACKUP_LIVE_STREAM_INPUT_URL,
            "overrideSeriesDetails": OVERRIDE_SERIES_DETAILS,
            "series": {
                "description": SERIES_DESCRIPTION,
                "id": SERIES_ID,
                "properties": {}
            }
        }
    }

    if CONTENT_ID != "":
        BODY["contentId"] = CONTENT_ID

    BODY["properties"]["prerollVideo"] = { "id": PREROLL_VIDEO_ID } if PREROLL_VIDEO_ID != "" else ""
    
    BODY["properties"]["prerollVideo"] = { "id": POSTROLL_VIDEO_ID } if POSTROLL_VIDEO_ID != "" else ""

    BODY["properties"]["archiveFolder"] = { "id": ARCHIVE_FOLDER_ID } if ARCHIVE_FOLDER_ID != "" else ""

    BODY["properties"]["slateVideo"] = { "id": SLATE_VIDEO_ID } if SLATE_VIDEO_ID != "" else ""

    BODY["properties"]["liveInputA"] = { "id": LIVE_INPUT_A } if LIVE_INPUT_A != "" else ""

    BODY["properties"]["liveInputB"] = { "id": LIVE_INPUT_B } if LIVE_INPUT_B != "" else ""

    try:
        # Send the request
        RESPONSE = requests.post(API_URL, headers= HEADERS, data= json.dumps(BODY))

        if RESPONSE.status_code != 201:
            raise Exception("Response returned " + str(RESPONSE.status_code))

        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, "Creating and uploading event instance failed")

