from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def update_user(AUTH_TOKEN, ADDRESS, ADDRESS2, CITY, FIRST_NAME, LAST_NAME, \
                PHONE_NUMBER, PHONE_EXT, POSTAL_CODE, ORGANIZATION, COUNTRY, STATE) -> dict:
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")
  
    API_URL = PORTAL_API_URL + "/account/user"
  
    # Create header for the request
    HEADERS = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    BODY = {}

    if ADDRESS != "": BODY["address"] = ADDRESS
    if ADDRESS2 != "": BODY["address2"] = ADDRESS2
    if CITY != "": BODY["city"] = CITY
    if STATE != "": BODY["state"] = STATE
    if COUNTRY != "": BODY["country"] = COUNTRY
    if FIRST_NAME != "": BODY["firstName"] = FIRST_NAME
    if LAST_NAME != "": BODY["lastName"] = LAST_NAME
    if PHONE_NUMBER != "": BODY["phone"] = PHONE_NUMBER
    if PHONE_EXT != "": BODY["phoneExt"] = PHONE_EXT
    if POSTAL_CODE != "": BODY["postalCode"] = POSTAL_CODE
    if ORGANIZATION != "": BODY["organization"] = ORGANIZATION
    
    try:
        RESPONSE = requests.put(API_URL, headers=HEADERS, data=json.dumps(BODY))
        if RESPONSE.status_code != 200:
            raise Exception("Response returned " + str(RESPONSE.status_code))

        return json.loads(RESPONSE.text)
    except:
        api_exception_handler(RESPONSE, "Update user failed")