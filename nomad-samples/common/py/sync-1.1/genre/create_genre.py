from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def create_genre(AUTH_TOKEN, NAME, SLUG):
    if not AUTH_TOKEN:
        raise Exception("Authorization token not found")
  
    GET_API_URL = f"{ADMIN_API_URL}/content/new?contentDefinitionId={MOVIE_GENRE_CONTENT_DEFINITION_ID}"
    
    HEADERS = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + AUTH_TOKEN
    }
    try:
        NEW_RESPONSE = requests.get(GET_API_URL, headers=HEADERS)
    
        if not NEW_RESPONSE:
            raise Exception()
        
        INFO = NEW_RESPONSE.json()
        ID = INFO["contentId"]
    
    except:
        raise Exception()

    PUT_API_URL = f"{ADMIN_API_URL}/Content/{MOVIE_GENRE_CONTENT_DEFINITION_ID}"

    # Build the payload body
    BODY = {
        "contentId": ID,
        "contentDefinitionId": MOVIE_GENRE_CONTENT_DEFINITION_ID,
        "properties": {
            "name": NAME,
            "slug": SLUG,
        },
    }

    try:
        # Send POST request
        RESPONSE = requests.put(PUT_API_URL, headers=HEADERS, data=json.dumps(BODY))

        # Check for success
        if not RESPONSE.ok:
            raise Exception()
        
        # Get the response
        ID = RESPONSE.json()

        # Return the ID
        return ID
    except:
        api_exception_handler(RESPONSE, "Update genre failed")
    
    
