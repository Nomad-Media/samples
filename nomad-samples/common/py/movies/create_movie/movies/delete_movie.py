from constants.project_constants import *
from exceptions.api_exception_handler import *

import requests

def delete_movie(AUTH_TOKEN, ID):
    if not AUTH_TOKEN:
        raise Exception("Authorization token not found")
  
    API_URL = f"{ADMIN_API_URL}/content/{ID}?contentDefinitionId={MOVIE_CONTENT_DEFINITION_ID}"
    
    HEADERS = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + AUTH_TOKEN
    }

    try:
        RESPONSE = requests.delete(API_URL, headers=HEADERS)

        if (RESPONSE.ok):
            return True

    except:
        api_exception_handler(RESPONSE, "Deleting movie failed")