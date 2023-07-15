from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def update_content(AUTH_TOKEN, ID, CONTENT_DEFINITION_ID, PROPERTIES):
    # Create header for the request
    if not AUTH_TOKEN:
        raise Exception("Authorization token not found")
  
    API_URL = f"{ADMIN_API_URL}/content/{ID}"
    
    HEADERS = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + AUTH_TOKEN
    }

    # Build the payload body
    BODY = {
        "contentDefinitionId": CONTENT_DEFINITION_ID,
        "contentId": ID,
        "properties": PROPERTIES
    }

    # Send POST request
    RESPONSE = requests.put(API_URL, headers=HEADERS, data=json.dumps(BODY))

    # Check for success
    if (RESPONSE.ok):
        # Get the response
        ID = RESPONSE.json()

        # Return the ID
        return ID
    

    api_exception_handler(RESPONSE, "Create/Update movie failed")

