from constants.project_constants import *
from exceptions.api_exception_handler import *
from live_channel.live_channel_statuses import *
from live_channel.wait_live_channel_status import *

def stop_live_channel(AUTH_TOKEN, CHANNEL_ID):
    # Create header for the request
    HEADERS = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    # Send the request
    try:
        RESPONSE = requests.post(ADMIN_URL + "/liveChannel/" + CHANNEL_ID + "/stop", headers= HEADERS)

        # Wait for the live channel to be idle
        wait_for_live_channel_status(AUTH_TOKEN, CHANNEL_ID, LIVE_CHANNEL_STATUSES["Idle"], 120, 2)

    except:
        api_exception_handler(RESPONSE, "Stop Live Channel " + CHANNEL_ID + " failed")

