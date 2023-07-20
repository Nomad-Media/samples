from constants.project_constants import *
from exceptions.api_exception_handler import *

import requests, json

def get_input_names(AUTH_TOKEN):
    HEADERS = {
        "Authorization": "Bearer " +  AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    try:
        RESPONSE = requests.get(f"{ADMIN_URL}/liveInput/", headers= HEADERS)

        # If not found return None
        if (not RESPONSE.ok):
            raise Exception()
        
        INFO = json.loads(RESPONSE.text)

        INPUT_NAMES = []
        for INPUT in INFO:
            INPUT_NAMES.append(INPUT["name"])
                                 
        return INPUT_NAMES
    
    except:
        api_exception_handler(RESPONSE, "Search found no inputs")