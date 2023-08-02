from constants.project_constants import *
from exceptions.api_exception_handler import *

import requests, json

def complete_segment(AUTH_TOKEN, ID, RELATED_CONTENT_ID, TAGS_ID):

    HEADERS = {
        "Authorization": "Bearer " +  AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    BODY = {
        "liveOperatorId": ID,
        "relatedContentId": { "id": RELATED_CONTENT_ID },
        "tags": {"id": TAGS_ID }
    }

    try:
        RESPONSE = requests.post(f"{ADMIN_URL}/admin/liveOperator/{ID}/completeSegment", headers= HEADERS, data= json.dumps(BODY))

        # If not found return None
        if (not RESPONSE.ok):
            raise Exception()
        
        return RESPONSE.json()
    
    except:
        api_exception_handler(RESPONSE, f"Completing segment for Live Channel {ID} failed")