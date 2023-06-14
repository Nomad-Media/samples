from constants.project_constants import *
from exceptions.api_exception_handler import *

import json
import requests

# @param {string} AUTH_TOKEN - The authorization token

def register_guest(AUTH_TOKEN: str) -> dict:
    if not AUTH_TOKEN:
        raise Exception("Authorization token not found")
  
    API_URL = "https://" + PORTAL_API_URL + "/account/register-guest"

    HEADERS = {
        "Content-Type": "application/json",
      	"Authorization": "Bearer " + AUTH_TOKEN
    }
    
    # replace username and password with your username and password
    BODY = {
      	"email": "pawev59721@ozatvn.com",
        "firstName": "Guest",
        "lastName": "User",
        "organization": "Nomad Media, Corp",
        "password": "nepqub-nuJvo1-woczih!",
        "passwordConfirmation": "nepqub-nuJvo1-woczih!"
    }

    try:
        RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))
        if RESPONSE.status_code != 200:
            raise Exception("Response returned " + str(RESPONSE.status_code))

        return json.loads(RESPONSE.text)
    except:
      	api_exception_handler(RESPONSE, "Registering guest failed")

