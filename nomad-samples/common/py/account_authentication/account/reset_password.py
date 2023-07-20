from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def reset_password(USENAME: str, TOKEN: str, NEW_PASSWORD: str) -> None:
    if not USENAME:
        raise Exception("USENAME: The username is invalid")
    
    if not TOKEN:
        raise Exception("Token: The token is invalid")
    
    if not NEW_PASSWORD:
        raise Exception("Password: The password is invalid")
  
    API_URL = PORTAL_API_URL + "/account/reset-password"
  
    # Create header for the request
    HEADERS = {
        "Content-Type": "application/json"
    }

    # Build the payload body
    BODY = {
        "userName": USENAME,
        "token": TOKEN,
        "newPassword": NEW_PASSWORD
    }
    
    try:
        RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))
        
        if not RESPONSE.ok:
            raise Exception()
    except:
        raise Exception("Reset Password failed")