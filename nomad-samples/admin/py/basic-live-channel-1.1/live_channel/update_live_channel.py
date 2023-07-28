from constants.project_constants import *
from exceptions.api_exception_handler import *
from helpers.slugify import *
from live_channel.live_channel_statuses import *
from live_channel.wait_live_channel_status import *
from live_channel.live_channel_types import *

import json, requests

def update_live_channel(AUTH_TOKEN, ID, NAME, TYPE, THUMBNAIL_IMAGE, ARCHIVE_FOLDER_ASSET, IS_SECURE_OUTPUT, 
                        OUTPUT_SCREENSHOTS, URL):
    # Create header for the request
    HEADERS = {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + AUTH_TOKEN
    }
    
    # Build the payload BODY
    BODY = { id: ID }

    if NAME != "": 
        BODY["name"] = NAME
        BODY["routeName"] = slugify(NAME)
    if THUMBNAIL_IMAGE != "": BODY["thumbnailImage"] = THUMBNAIL_IMAGE
    if ARCHIVE_FOLDER_ASSET != "": BODY["archiveFolderAsset"] = ARCHIVE_FOLDER_ASSET
    if IS_SECURE_OUTPUT != "": BODY["isSecureOutput"] = IS_SECURE_OUTPUT
    if OUTPUT_SCREENSHOTS != "": BODY["outputScreenshots"] = OUTPUT_SCREENSHOTS
    if TYPE != "": BODY["type"] = { "id": TYPE }


    # Set the appropriate fields based on the channel type
    if (type == LIVE_CHANNEL_TYPES["External"]):
        if URL: BODY["externalUrl"] = URL

    try:
        # Send the request
        RESPONSE = requests.put(f"{ADMIN_URL}/liveChannel",  headers= HEADERS, data= json.dumps(BODY))
        INFO = json.loads(RESPONSE.text)
            
        wait_for_live_channel_status(AUTH_TOKEN, INFO["id"], LIVE_CHANNEL_STATUSES["Idle"], 120, 2)

        if not RESPONSE.ok:
            raise Exception()
        
        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, f"Created Live Channel {NAME} failed")

