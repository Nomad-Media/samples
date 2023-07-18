from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def add_tag_or_collection(AUTH_TOKEN: str, TYPE: str, CONTENT_ID: str, CONTENT_DEFINITION: str, NAME: str, TAG_ID: str, CREATE_NEW: bool) -> dict:

    # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = ADMIN_API_URL + "/admin/" + TYPE + "/content"
        
    # Create header for the request
    HEADERS = {
  	    "Authorization": "Bearer " + AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    # Build the payload BODY
    BODY = {
        "items": [
            {
                "contentDefinition": CONTENT_DEFINITION,
                "contentId": CONTENT_ID,
                "name": NAME,
                "createNew": CREATE_NEW
            }
        ]
    }

    if TAG_ID != "":
        BODY["items"]["tagId"] = TAG_ID

    try:
        # Send the request
        RESPONSE = requests.post(API_URL, headers= HEADERS, data= json.dumps(BODY))

        if not RESPONSE.ok:
            raise Exception("Response returned " + str(RESPONSE.status_code))

        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, "add tag or collection failed")

