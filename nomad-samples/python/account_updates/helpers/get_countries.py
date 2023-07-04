from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def get_countries(AUTH_TOKEN):

    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")
  
    API_URL = "https://dev-05.demos.media/config/ea1d7060-6291-46b8-9468-135e7b94021b/lookups.json"
  
    # Create header for the request
    HEADERS = {
        "Content-Type": "application/json"
    }

    try:
        RESPONSE = requests.get(API_URL, headers=HEADERS)
        if RESPONSE.status_code != 200:
            raise Exception("Response returned " + str(RESPONSE.status_code))

        return json.loads(RESPONSE.text)[5]
    except:
        api_exception_handler(RESPONSE, "Get countries failed")