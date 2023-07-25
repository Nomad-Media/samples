from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def get_search(AUTH_TOKEN, ID, IS_ADMIN):

     # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = f"{ADMIN_API_URL}/admin/search/{ID}" if IS_ADMIN else f"{PORTAL_API_URL}/portal/search/{ID}"

    # Create header for the request
    HEADERS = {
  	    "Authorization": "Bearer " + AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    try:
        # Send the request
        RESPONSE = requests.post(API_URL, headers= HEADERS)

        if not RESPONSE.ok:
            raise Exception()

        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, "Searching failed")