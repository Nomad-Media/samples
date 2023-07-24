from constants.project_constants import *
from exceptions.api_exception_handler import *

import json
import requests

def resend_code(EMAIL: str) -> dict:
    if not EMAIL:
        raise Exception("Email: The email is invalid")

    API_URL = PORTAL_API_URL + "/account/resend-code"

    HEADERS = {
      "Content-Type": "application/json"
    }
    
    # replace username and password with your username and password
    BODY = {
      "userName": EMAIL
    }

    try:
        RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))
        if not RESPONSE.ok:
          raise Exception()
    except:
      api_exception_handler(RESPONSE, "Resend code failed")
            
