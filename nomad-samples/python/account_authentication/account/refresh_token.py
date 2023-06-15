from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

'''
 * Refresh Token
 *
 * @param {string} REFRESH_TOKEN | The refresh token
 *
 * @returns {string} Authorization token
'''
def refresh_token(REFRESH_TOKEN: str):
    # Check for valid parameters
    if (not REFRESH_TOKEN):
        raise Exception("Refresh Token: The refresh token is invalid")

    API_URL = PORTAL_API_URL + "/account/refresh-token"

    # Create header for the request
    HEADERS = {
        'Content-Type': 'application/json'
    }

    # Build the payload BODY
    BODY = {
        "refreshToken": REFRESH_TOKEN
    }


    try:
        # Send the request
        RESPONSE = requests.post(API_URL, headers= HEADERS, data= json.dumps(BODY))

        if RESPONSE.status_code != 200:
            raise Exception("Response returned " + str(RESPONSE.status_code))

        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, "Refresh Token failed")

