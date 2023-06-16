from constants.project_constants import *
from exceptions.api_exception_handler import *

from libraries import asyncio, json, requests

'''
 * Refresh Token
 *
 * @param {string} REFRESH_TOKEN | The refresh token
 *
 * @returns {string} Authentication token
'''
async def refresh_token(REFRESH_TOKEN):

    # Check for valid parameters
    if (not REFRESH_TOKEN):
        raise Exception("Refresh Token: The refresh token is invalid")


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
        RESPONSE = requests.post("PUBLIC_URL/account/refresh-token", headers= HEADERS, data= json.dumps(BODY))

        # Get the response
        INFO = json.loads(RESPONSE.text)

        if RESPONSE.status_code != 200:
            raise Exception()

        # Return the token
        return INFO["token"]

    except:
        api_exception_handler(RESPONSE, "Refresh Token failed")

