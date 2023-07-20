from constants.project_constants import *
from exceptions.api_exception_handler import *

import requests, json

'''
 * Login
 *
 * @param {string} username | The username
 * @param {string} password | The password
 *
 * @returns {string} Authentication token
'''
def login(USERNAME, PASSWORD, APPLICATION_ID):
        
    API_URL = PORTAL_API_URL + "/account/login"

    # Create header for the request
    HEADERS = {
        'Content-Type': 'application/json'
    }

    # Build the payload BODY
    BODY = {
        "username": USERNAME,
        "password": PASSWORD
    }

    if APPLICATION_ID != "": BODY["applicationId"] = APPLICATION_ID

    try:
        # Send the request
        RESPONSE = requests.post(API_URL, headers= HEADERS, data= json.dumps(BODY))
    
        if not RESPONSE.ok:
            if RESPONSE.status_code == 409:
                return("Login info incorrect")
            raise Exception()
        

        return json.loads(RESPONSE.text)
            

    except:
        api_exception_handler(RESPONSE, "Login failed")

