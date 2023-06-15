from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def creating_and_uploading_event_instance(AUTH_TOKEN: str, ID: str) -> dict:

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
        "contentId": "00939c2b-d355-44c8-83c3-7700646c96f8",
        "contentDefinitionId": "d34f116d-2a51-4d4a-b928-5dd581d9fd5e",

        "properties": {
            "instanceName": "Test Event Name",
            "startDatetime": "2023-06-22T00:00:00.000Z",
            "endDatetime": "2023-06-22T01:00:00.000Z",
            "disabled": False,
            "description": "Test Description",
            "prerollVideo": {
                "id": "f77d514e-092b-4a37-91e7-9c5d1c7ba7ff"
            },
            "postrollVideo": {
                "id": "a14d9768-7c8e-4387-a95f-7bd8839647b5"
            },
            "isSecureOutput": False,
            "primaryLiveStreamInputUrl": "https://admin.dev-05.demos.media/admin/live-channels/1ee912cf-1c99-4f34-a742-f8d9f6b3baf2"
        }
    }

    try:
        # Send the request
        RESPONSE = requests.post(API_URL, headers= HEADERS, data= json.dumps(BODY))

        if RESPONSE.status_code != 201:
            raise Exception("Response returned " + str(RESPONSE.status_code))

        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, "Creating and uploading event instance failed")

