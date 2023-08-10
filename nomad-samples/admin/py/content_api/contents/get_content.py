from constants.project_constants import *
from exceptions.api_exception_handler import *

import requests

def get_content(AUTH_TOKEN, ID, CONTENT_DEFINITION_ID, IS_REVISION):

    API_URL = f"{ADMIN_API_URL}/content/{ID}?contentDefinitionId={CONTENT_DEFINITION_ID}&isRevision={IS_REVISION}"

    HEADERS = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    try:
        RESPONSE = requests.get(API_URL, headers=HEADERS)

        if (not RESPONSE.ok):
            raise Exception()
        
        return RESPONSE.json()
    
    except:
        api_exception_handler(RESPONSE, f"Getting content {ID} failed")