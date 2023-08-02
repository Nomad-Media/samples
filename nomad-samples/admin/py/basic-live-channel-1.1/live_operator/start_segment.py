from constants.project_constants import *
from exceptions.api_exception_handler import *

import requests

def start_segment(AUTH_TOKEN, ID):

    HEADERS = {
        "Authorization": "Bearer " +  AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    try:
        RESPONSE = requests.post(f"{ADMIN_URL}/admin/liveOperator/{ID}/startSegment", headers= HEADERS)

        # If not found return None
        if (not RESPONSE.ok):
            raise Exception()
        
    except:
        api_exception_handler(RESPONSE, f"Starting segment for Live Channel {ID} failed")