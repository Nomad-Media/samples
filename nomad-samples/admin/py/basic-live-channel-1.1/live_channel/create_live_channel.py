from constants.project_constants import *
from exceptions.api_exception_handler import *
from helpers.slugify import *
from live_channel.live_channel_statuses import *
from live_channel.wait_live_channel_status import *
from live_channel.live_channel_types import *

import json, requests

def create_live_channel(AUTH_TOKEN, NAME, THUMBNAIL_IMAGE, ARCHIVE_FOLDER_ASSET, IS_SECURE_OUTPUT, 
                        OUTPUT_SCREENSHOTS, TYPE, URL):
    # Create header for the request
    HEADERS = {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    # Build the payload BODY
    BODY = {
        "name": NAME,
        "routeName": slugify(NAME),
        "thumbnailImage": THUMBNAIL_IMAGE,
        "archiveFolderAsset": ARCHIVE_FOLDER_ASSET,
        "isSecureOutput": IS_SECURE_OUTPUT,
        "outputScreenshots": OUTPUT_SCREENSHOTS,
        "type": { "id": TYPE }
    }


    # Set the appropriate fields based on the channel type
    if (type == LIVE_CHANNEL_TYPES["External"]):
        BODY["externalUrl"] = URL

    try:
        # Send the request
        RESPONSE = requests.post(f"{ADMIN_URL}/liveChannel",  headers= HEADERS, data= json.dumps(BODY))
        INFO = json.loads(RESPONSE.text)
            
        wait_for_live_channel_status(AUTH_TOKEN, INFO["id"], LIVE_CHANNEL_STATUSES["Idle"], 120, 2)

        if not RESPONSE.ok:
            raise Exception()
        
        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, f"Created Live Channel {NAME} failed")

