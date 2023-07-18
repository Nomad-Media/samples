from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def create_content_definition(AUTH_TOKEN: str) -> dict:

    # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = ADMIN_API_URL + "/contentDefinition/0ef57abd-6e2e-4468-aaa4-e5ae864126f0"
        
    # Create header for the request
    HEADERS = {
      	"Authorization": "Bearer " + AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    try:
        # Send the request
        RESPONSE = requests.get(API_URL, headers= HEADERS)

        if not RESPONSE.ok:
            raise Exception("Response returned " + str(RESPONSE.status_code))

        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, "get content definition")

