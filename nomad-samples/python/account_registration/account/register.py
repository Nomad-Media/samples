# for requests library, you need to add the requests library as layer as shown in the link below

from constants.project_constants import *
from exceptions.api_exception_handler import *

import json
import requests

def register(FIRST_NAME: str, LAST_NAME: str, EMAIL: str, PASSWORD: str) -> dict:

    API_URL = PORTAL_API_URL + "/account/register"

    HEADERS = {
      "Content-Type": "application/json"
    }
    
    # replace username and password with your username and password
    BODY = {
    	"firstName": FIRST_NAME,
    	"lastName": LAST_NAME,
    	"email": EMAIL,
    	"password": PASSWORD
    }

    try:
        RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))

        if RESPONSE.status_code != 200:
            raise Exception()
        
        return json.loads(RESPONSE.text)
    
    except:
      raise Exception(RESPONSE, "Register user failed")
            
