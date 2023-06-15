from constants.project_constants import *
from exceptions.api_exception_handler import *

import requests, json
'''
 * Logout
 *
'''
def logout(USER_SESSION_ID: str, AUTH_TOKEN: str, USERNAME: str):
    if not USER_SESSION_ID:
        raise Exception("User Session Id: The user sesssion id is invalid")

    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = PORTAL_API_URL + "/account/logout"

    HEADERS = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    BODY = {
        "userSessionId": USER_SESSION_ID
    }

    try:
        # Send the request
        RESPONSE = requests.post(API_URL, headers= HEADERS, data = json.dumps(BODY))

        if RESPONSE.status_code != 200:
            raise Exception("Response returned " + str(RESPONSE.status_code))
        
        return True

    except:
        api_exception_handler(RESPONSE, "Logout failed")

