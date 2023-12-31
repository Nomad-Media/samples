from constants.project_constants import *
from exceptions.api_exception_handler import *

import json
import requests

# @param {string} AUTH_TOKEN - The authentication token

def register_guest(AUTH_TOKEN: str, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD) -> dict:
    if not AUTH_TOKEN:
        raise Exception("Authentication token not found")
  
    API_URL = "https://" + PORTAL_API_URL + "/account/register-guest"

    HEADERS = {
        "Content-Type": "application/json",
      	"Authorization": "Bearer " + AUTH_TOKEN
    }
    
    # replace username and password with your username and password
    BODY = {
      	"email": EMAIL,
        "firstName": FIRST_NAME,
        "lastName": LAST_NAME,
        "password": PASSWORD
    }

    try:
        RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))
        if not RESPONSE.ok:
            raise Exception()

        return json.loads(RESPONSE.text)
    except:
      	api_exception_handler(RESPONSE, "Registering guest failed")

