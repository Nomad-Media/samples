from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def delete_tag_or_collection(AUTH_TOKEN: str, TYPE: str, CONTENT_ID: str, TAG_ID: str) -> dict:

    # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = ADMIN_API_URL + "/admin/" + TYPE + "/content/delete"
        
    # Create header for the request
    HEADERS = {
  	    "Authorization": "Bearer " + AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    # Build the payload BODY
    BODY = {
        "items": [
            {
                "contentDefinition": "asset",
                "contentId": CONTENT_ID,
                "tagId": TAG_ID
            }
        ]
    }

    try:
        # Send the request
        RESPONSE = requests.post(API_URL, headers= HEADERS, data= json.dumps(BODY))

        if RESPONSE.status_code != 200:
            raise Exception("Response returned " + str(RESPONSE.status_code))

        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, "delete tag or colleciton failed")

