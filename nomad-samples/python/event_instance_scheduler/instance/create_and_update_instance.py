from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def create_and_update_event_instance(AUTH_TOKEN, ID, CONTENT_ID, CONTENT_DEFINITION_ID, 
                                          INSTANCE_NAME, START_DATETIME, END_DATETIME, 
                                          DISABLED, SERIES_OVERWRITE,
                                          RECURRING, SERIES_DESCRIPTION, SERIES_ID, 
                                          EXISTING_SERIES, DESCRIPTION, SLATE_VIDEO_ID, 
                                          PREROLL_VIDEO_ID, POSTROLL_VIDEO_ID, 
                                          IS_SECURE_OUTPUT, ARCHIVE_FOLDER_ID, LIVE_INPUT_A,
                                          LIVE_INPUT_B, PRIMARY_LIVE_STREAM_INPUT_URL,
                                          BACKUP_LIVE_STREAM_INPUT_URL, RECURRING_WEEKS, 
                                          RECURRING_DAYS) -> dict:

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
            "overrideSeriesDetails": SERIES_OVERWRITE,
            "isRecurring": RECURRING
        }
    }

    if CONTENT_ID != "":
        BODY["contentId"] = CONTENT_ID

    if not EXISTING_SERIES or SERIES_OVERWRITE:
        BODY["isSecureOutput"] = IS_SECURE_OUTPUT
        BODY["description"] = DESCRIPTION
        BODY["primaryLiveStreamInputUrl"] = PRIMARY_LIVE_STREAM_INPUT_URL
        BODY["backupLiveStreamIputUrl"] = BACKUP_LIVE_STREAM_INPUT_URL
        BODY["properties"] = {
            "prerollVideo": { "id": PREROLL_VIDEO_ID } if PREROLL_VIDEO_ID != "" else "",
            "prerollVideo": { "id": POSTROLL_VIDEO_ID } if POSTROLL_VIDEO_ID != "" else "",
            "archiveFolder": { "id": ARCHIVE_FOLDER_ID } if ARCHIVE_FOLDER_ID != "" else "",
            "slateVideo": { "id": SLATE_VIDEO_ID } if SLATE_VIDEO_ID != "" else "",
            "liveInputA": { "id": LIVE_INPUT_A } if LIVE_INPUT_A != "" else "",
            "liveInputB": { "id": LIVE_INPUT_B } if LIVE_INPUT_B != "" else ""
        }

    print(RECURRING_DAYS)
    
    if RECURRING:
        BODY["properties"]["recurringDays"] = RECURRING_DAYS,
        BODY["properties"]["recurringDays"] = BODY["properties"]["recurringDays"][0]
        BODY["properties"]["recurringWeeks"] = int(RECURRING_WEEKS)

    if EXISTING_SERIES:
        BODY["properties"]["series"] = {
            "description": SERIES_DESCRIPTION,
            "id": SERIES_ID,
            "properties": {}
        }

    print(json.dumps(BODY, indent=4))

    try:
        # Send the request
        RESPONSE = requests.post(API_URL, headers= HEADERS, data= json.dumps(BODY))

        if not RESPONSE.ok:
            raise Exception()

        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, "Creating and uploading event instance failed")

