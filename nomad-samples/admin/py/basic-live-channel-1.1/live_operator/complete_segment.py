from constants.project_constants import *
from exceptions.api_exception_handler import *

import requests, json

def complete_segment(AUTH_TOKEN, ID, RELATED_CONTENT_IDS, TAG_IDS):

    HEADERS = {
        "Authorization": "Bearer " +  AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    BODY = {
        "liveOperatorId": ID,
    }
    if RELATED_CONTENT_IDS[0] != "":
        BODY["relatedContent"] = [] 
        for ID in RELATED_CONTENT_IDS:
            BODY["relatedContent"].append({ "id": ID }),
    if TAG_IDS[0] != "":
        BODY["tags"] = []
        for ID in TAG_IDS:
            BODY["tags"].append({"id": ID })

    try:
        RESPONSE = requests.post(f"{ADMIN_URL}/admin/liveOperator/{ID}/completeSegment", headers= HEADERS, data= json.dumps(BODY))

        # If not found return None
        if (not RESPONSE.ok):
            raise Exception()
    
    except:
        api_exception_handler(RESPONSE, f"Completing segment for Live Channel {ID} failed")