from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

async def upload_complete_asset(AUTH_TOKEN: str, ID: str) -> dict:

    # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = ADMIN_API_URL + "/asset/upload/" + ID + "/complete"
        
    # Create header for the request
    HEADERS = {
      	"Authorization": "Bearer " + AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    try:
        # Send the request
        RESPONSE = requests.post(API_URL, headers= HEADERS)

        if RESPONSE.status_code != 200:
            raise Exception("Response returned " + str(RESPONSE.status_code))

        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, "Upload complete asset failed")

