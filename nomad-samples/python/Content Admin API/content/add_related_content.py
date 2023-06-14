from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def add_related_content(AUTH_TOKEN: str) -> dict:

    # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = ADMIN_API_URL + "/admin/related"
        
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
                "contentId": "1030c066-d875-490b-8e02-e093c7ce042f",
                "relatedContentId": "b943c762-1fb3-449e-9012-54dec10f1925"
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
        api_exception_handler(RESPONSE, "add related content failed")

