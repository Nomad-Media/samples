from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def forgot_password(USENAME: str, AUTH_TOKEN: str) -> None:
    if not USENAME:
        raise Exception("USENAME: The username is invalid")

    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")
        
    API_URL = PORTAL_API_URL + "/account/forgot-password"
  
    # Create header for the request
    HEADERS = {
        "Content-Type": "application/json"
    }

    # Build the payload body
    BODY = {
        "username": USENAME
    }
    
    try:
        RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))
        
        if not RESPONSE.ok:
            raise Exception()
          
    except:
        api_exception_handler(RESPONSE, "Forgot Password Failed")