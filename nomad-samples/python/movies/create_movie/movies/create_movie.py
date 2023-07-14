from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def create_movie(AUTH_TOKEN):
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")
  
    API_URL = f"{ADMIN_API_URL}/content/new?contentDefinitionId={MOVIE_CONTENT_DEFINITION_ID}"
  
    # Create header for the request
    HEADERS = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    try:
        RESPONSE = requests.get(API_URL, headers=HEADERS)

        if RESPONSE.ok:
            ID = json.loads(RESPONSE.text)
            return ID
        
    except:
        api_exception_handler(RESPONSE, "Get movie id failed: ")
    
