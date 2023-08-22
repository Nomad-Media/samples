from constants.project_constants import *
from exceptions.api_exception_handler import *

import json
import requests

# @param {string} AUTH_TOKEN - The authentication token

def remove_guest_invitation(AUTH_TOKEN: str, CONTENT_ID: str, CONTENT_DEFINITION_ID: str, USER_ID: str,
                            EMAILS: list, CONTENT_SECURITY_ATTRIBUTE: str) -> dict:
    if not AUTH_TOKEN:
        raise Exception("Authentication token not found")
        
    API_URL = "https://" + PORTAL_API_URL + "/account/remove-user"

    HEADERS = {
        "Content-Type": "application/json",
      	"Authorization": "Bearer " + AUTH_TOKEN
    }
    
    # replace username and password with your username and password
    BODY = {
      	"contentId": CONTENT_ID,
      	"contentDefinitionId": CONTENT_DEFINITION_ID,
        "userId": USER_ID,
        "emails": EMAILS,
        "contentSecurityAttribute": CONTENT_SECURITY_ATTRIBUTE
    }

    try:
        RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))
        if not RESPONSE.ok:
            raise Exception()

        return json.loads(RESPONSE.text)
    except:
      	api_exception_handler(RESPONSE, "Removing Guest Failed")

