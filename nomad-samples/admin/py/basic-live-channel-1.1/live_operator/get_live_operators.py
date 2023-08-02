from constants.project_constants import *
from exceptions.api_exception_handler import *

import requests

def get_live_operators(AUTH_TOKEN):

    HEADERS = {
        "Authorization": "Bearer " +  AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    try:
        RESPONSE = requests.get(f"{ADMIN_URL}/admin/liveOperator", headers= HEADERS)

        # If not found return None
        if (not RESPONSE.ok):
            raise Exception()
        
        return RESPONSE.json()
    
    except:
        api_exception_handler(RESPONSE, "Getting Live Operators failed")