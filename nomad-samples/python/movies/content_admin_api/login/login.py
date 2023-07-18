from constants.project_constants import *
from exceptions.api_exception_handler import *

import requests, json

def login(USERNAME, PASSWORD):
        
    API_URL = f"{PORTAL_API_URL}/account/login"

    # Create header for the request
    HEADERS = {
        'Content-Type': 'application/json'
    }

    # Build the payload BODY
    BODY = {
        "username": USERNAME,
        "password": PASSWORD
    }

    try:
        # Send the request
        RESPONSE = requests.post(API_URL, headers= HEADERS, data= json.dumps(BODY))
    
        if not RESPONSE.ok:
            if RESPONSE.status_code == 409:
                return("Login info incorrect")
            raise Exception("Response returned " + str(RESPONSE.status_code))
        

        return json.loads(RESPONSE.text)
            

    except:
        return False

