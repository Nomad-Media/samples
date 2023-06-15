# for requests library, you need to add the requests library as layer as shown in the link below

from constants.project_constants import *
from exceptions.api_exception_handler import *

import json
import requests

def register(EMAIL: str) -> dict:
    if not EMAIL:
        raise Exception("Email: The email is invalid")

    API_URL = PORTAL_API_URL + "/account/register"

    HEADERS = {
      "Content-Type": "application/json"
    }
    
    # replace username and password with your username and password
    BODY = {
    	"firstName": "Test",
    	"lastName": "Account",
    	"email": EMAIL,
    	"password": "Securepass$$23hh"
    }

    try:
        RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))

        if RESPONSE.status_code != 200:
            raise Exception()
        
        return json.loads(RESPONSE.text)
    
    except:
      raise Exception(RESPONSE, "Register user failed")
            
