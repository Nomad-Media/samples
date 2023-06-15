from constants.project_constants import *
from exceptions.api_exception_handler import *

import requests, json

'''
 * Login
 *
 * @param {string} username | The username
 * @param {string} password | The password
 *
 * @returns {string} Authorization token
'''
def login(USERNAME, PASSWORD):
    # Check for valid parameters
    if (not USERNAME):
        raise Exception("Username: The username is invalid")
     
    if (not PASSWORD):
        raise Exception("Password: The password is invalid")
        
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


    try:
        # Send the request
        RESPONSE = requests.post(API_URL, headers= HEADERS, data= json.dumps(BODY))
    
        if RESPONSE.status_code != 200:
            raise Exception("Response returned " + str(RESPONSE.status_code))

        return json.loads(RESPONSE.text)
            

    except:
        api_exception_handler(RESPONSE, "Login failed")

