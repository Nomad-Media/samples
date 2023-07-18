from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def update_content_definition(AUTH_TOKEN: str, ID: str) -> dict:

    # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = ADMIN_API_URL + "/contentDefinition/" + ID
        
    # Create header for the request
    HEADERS = {
      	"Authorization": "Bearer " + AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    BODY = {
        "contentDefinitionId": "95638412-7a40-4710-8b0e-329191f18a74",
        "createdDate": "2021-08-03T18:30:50.53Z",
        "lastModifiedDate": "2022-09-17T11:13:03.028Z",
        "isSystemModule": False,
        "useEditorFormOverride": False,
        "templateFolderAssetId": "687c59bd-59b8-4026-9b7f-6f469e05cfdb"
    }

    try:
        # Send the request
        RESPONSE = requests.put(API_URL, headers= HEADERS, data=json.dumps(BODY))

        if not RESPONSE.ok:
            raise Exception("Response returned " + str(RESPONSE.status_code))


    except:
        api_exception_handler(RESPONSE, "Update Content Definition Failed")

