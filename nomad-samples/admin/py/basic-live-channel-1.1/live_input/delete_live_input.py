from constants.project_constants import *
from exceptions.api_exception_handler import *
from live_input.live_input_statuses import *
from live_input.wait_live_input_status import *

import json, requests

def delete_live_input(AUTH_TOKEN, INPUT_ID):
    # Create header for the request
    HEADERS = {
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    try:
        # Send the request
        RESPONSE = requests.delete(f"{ADMIN_URL}/liveInput/{INPUT_ID}", headers= HEADERS)

        # Wait for the live input to be deleted
        wait_for_live_input_status(AUTH_TOKEN, INPUT_ID, LIVE_INPUT_STATUSES["Deleted"], 60, 2)

        # Return the JSON response
        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, f"Delete Live Input {INPUT_ID} failed")

