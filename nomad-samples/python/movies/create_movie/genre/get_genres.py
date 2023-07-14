from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def get_genres(AUTH_TOKEN):
    # Create header for the request
    if not AUTH_TOKEN:
        raise Exception("Authorization token not found")
  
    API_URL = f"{PORTAL_API_URL}/portal/search"
    
    HEADERS = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    # Build the payload body
    BODY = {
        "filters": [
            {
                "fieldName": "contentDefinitionId",
                "operator": "Equals",
                "values": MOVIE_GENRE_CONTENT_DEFINITION_ID,
            },
            {
                "fieldName": "languageId",
                "operator": "Equals",
                "values": US_ENGLISH_LANGUAGE_LOOKUP_ID,
            }
        ],
        "returnedFieldNames":["title"]
    }

    # Send POST request
    RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))

    # Check for success
    if (RESPONSE.ok):
        # Get the response
        GENRES = RESPONSE.json()

        # Return the genres
        return GENRES

    api_exception_handler(RESPONSE, "Getting genres failed")
