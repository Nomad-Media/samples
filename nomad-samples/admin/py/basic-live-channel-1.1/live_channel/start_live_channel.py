from constants.project_constants import *
from exceptions.api_exception_handler import *
from live_channel.live_channel_statuses import *
from live_channel.wait_live_channel_status import *

import json, requests

def start_live_channel(AUTH_TOKEN, CHANNEL_ID):
    # Create header for the request
    HEADERS = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    try:
        # Send the request
        RESPONSE = requests.post(ADMIN_URL + "/liveChannel/" + CHANNEL_ID + "/start", headers= HEADERS)

        # Wait for the Live Channel to be running
        wait_for_live_channel_status(AUTH_TOKEN, CHANNEL_ID, LIVE_CHANNEL_STATUSES["Running"], 120, 2)

    except:
        api_exception_handler(RESPONSE, f"Start Live Channel {CHANNEL_ID} failed")

