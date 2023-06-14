from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def content_search(AUTH_TOKEN: str) -> dict:

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
        "filters": [  
            {  
                "fieldName": "contentDefinitionId",  
                "operator": "Equals",  
                "values": "d34f116d-2a51-4d4a-b928-5dd581d9fd5e"  
            }  
        ],  
        "returnedFieldNames": [  
            "title"  
        ],  
        "sortFields": [  
            {  
                "fieldName": "title",  
                "sortType": "Ascending"  
            }  
        ]  
    }

    try:
        # Send the request
        RESPONSE = requests.post(API_URL, headers= HEADERS, data= json.dumps(BODY))

        if RESPONSE.status_code != 200:
            raise Exception("Response returned " + str(RESPONSE.status_code))

        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, "Content searching failed")

