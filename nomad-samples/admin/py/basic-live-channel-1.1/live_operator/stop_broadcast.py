from constants.project_constants import *
from exceptions.api_exception_handler import *

import requests

def stop_broadcast(AUTH_TOKEN, ID):

    HEADERS = {
        "Authorization": "Bearer " +  AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    try:
        RESPONSE = requests.post(f"{ADMIN_URL}/admin/liveOperator/{ID}/stop", headers= HEADERS)

        # If not found return None
        if (not RESPONSE.ok):
            raise Exception()
    
    except:
        api_exception_handler(RESPONSE, f"Stopping broadcast for Live Channel {ID} failed")