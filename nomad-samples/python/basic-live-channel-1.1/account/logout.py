from constants.project_constants import *
from exceptions.api_exception_handler import *

from libraries import requests, json
'''
 * Logout
 *
'''
async def logout(USER_SESSION_ID, AUTH_TOKEN):
    HEADERS = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    BODY = {
        "userSessionId": USER_SESSION_ID
    }

    try:
        # Send the request
        RESPONSE = requests.post(PUBLIC_URL + "/account/logout", headers= HEADERS, data = json.dumps(BODY))

        if RESPONSE.status_code != 200:
            raise Exception()
        
        return True

    except:
        await api_exception_handler(RESPONSE, "Logout failed")

