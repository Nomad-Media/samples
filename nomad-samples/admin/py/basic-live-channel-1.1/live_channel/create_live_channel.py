from constants.project_constants import *
from exceptions.api_exception_handler import *
from helpers.slugify import *
from live_channel.live_channel_statuses import *
from live_channel.wait_live_channel_status import *
from live_channel.live_channel_types import *

import json, requests

def create_live_channel(AUTH_TOKEN, NAME, THUMBNAIL_IMAGE, ARCHIVE_FOLDER_ASSET, 
                        ENABLE_HIGH_AVAILABILITY, ENABLE_LIVE_CLIPPING, IS_SECURE_OUTPUT, 
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
        "enableHighAvailability": ENABLE_HIGH_AVAILABILITY,
        "enableLiveClipping": ENABLE_LIVE_CLIPPING,
        "isSecureOutput": IS_SECURE_OUTPUT,
        "outputScreenshots": OUTPUT_SCREENSHOTS,
        "type": { "id": LIVE_CHANNEL_TYPES[TYPE] }
    }


    # Set the appropriate fields based on the channel type
    if (TYPE == LIVE_CHANNEL_TYPES["External"]):
        BODY["externalUrl"] = URL

    try:
        # Send the request
        RESPONSE = requests.post(f"{ADMIN_URL}/liveChannel",  headers= HEADERS, data= json.dumps(BODY))
        INFO = json.loads(RESPONSE.text)

        if not RESPONSE.ok:
            raise Exception()
            
        wait_for_live_channel_status(AUTH_TOKEN, INFO["id"], LIVE_CHANNEL_STATUSES["Idle"], 120, 2)
        
        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, f"Created Live Channel {NAME} failed")

