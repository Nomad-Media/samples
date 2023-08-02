from constants.project_constants import *
from exceptions.api_exception_handler import *

import requests, json

def start_broadcast(AUTH_TOKEN, ID, CHANNEL_ID, PREROLL_ASSET_ID, POSTROLL_ASSET_ID, LIVE_INPUT_ID, 
                    RELATED_CONTENT_IDS, TAG_IDS):

    HEADERS = {
        "Authorization": "Bearer " +  AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    try:
        BODY = {
            "id": ID,
            "liveChannelId": CHANNEL_ID
        }

        if LIVE_INPUT_ID != "": BODY["liveInput"] = { "id": LIVE_INPUT_ID }
        if PREROLL_ASSET_ID != "": BODY["prerollAsset"] = { "id": PREROLL_ASSET_ID }
        if POSTROLL_ASSET_ID != "": BODY["postrollAsset"] = { "id": POSTROLL_ASSET_ID }

        if RELATED_CONTENT_IDS[0] != "":
            BODY["relatedContent"] = []
            for ID in RELATED_CONTENT_IDS: BODY["relatedContent"].append({ "id": ID })

        if TAG_IDS[0] != "":
            BODY["tags"] = []
            for ID in TAG_IDS: BODY["tags"].append({ "id": ID })

        RESPONSE = requests.post(f"{ADMIN_URL}/admin/liveOperator/start", headers= HEADERS, data= json.dumps(BODY))

        # If not found return None
        if (not RESPONSE.ok):
            raise Exception()
        
        INFO = json.loads(RESPONSE.text)

        return INFO
    
    except:
        api_exception_handler(RESPONSE, f"Starting broadcast for Live Channel {ID} failed")