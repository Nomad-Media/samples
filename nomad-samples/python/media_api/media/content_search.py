from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def content_search(AUTH_TOKEN: str, FILTERS: list, FIELD_NAMES: list, SORT_FIELDS_NAME: str, 
                   SORT_FIELDS_ORDER: str) -> dict:

    # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = PORTAL_API_URL + "/portal/search"
        
    # Create header for the request
    HEADERS = {
  	    "Authorization": "Bearer " + AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    # Build the payload BODY
    BODY = {  
        "filters": FILTERS,
        "returnedFieldNames": FIELD_NAMES,
        "sortFields": [  
            {  
                "fieldName": SORT_FIELDS_NAME,  
                "sortType": SORT_FIELDS_ORDER 
            }  
        ]  
    }

    try:
        # Send the request
        RESPONSE = requests.post(API_URL, headers= HEADERS, data= json.dumps(BODY))

        if not RESPONSE.ok:
            raise Exception("Response returned " + str(RESPONSE.status_code))

        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, "Content searching failed")

