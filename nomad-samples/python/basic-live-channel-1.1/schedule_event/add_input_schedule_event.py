from constants.system_constants import *
from constants.project_constants import *
from exceptions.api_exception_handler import *

from libraries import json, requests

'''
 * Add Input Schedule Event
 *
 * @param {string} AUTH_TOKEN    | Authentication token
 * @param {Object} DATA         | BODY
 *
 * @returns JSON Object
'''
async def add_input_schedule_event(AUTH_TOKEN, DATA):
    # Check for valid parameters
    if (not AUTH_TOKEN or not DATA):
        raise Exception("Add Input Schedule Event: Invalid API call")


    # Build the payload BODY
    BODY = {
        "channelId": DATA["channelId"],
        "type": {
            "id": LIVE_INPUT_LOOKUP_ID,
            "description": "Live Input"
        },
        "liveInput": {
            "id": DATA["inputId"],
            "description": "name"#DATA["name"]
        },
        "previousId": DATA["previousId"]
    }


    # Create header for the request
    HEADERS = {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    try:
        # Send the request
        RESPONSE = requests.post(SERVER_URL + "/liveChannel/" + DATA["channelId"] + "/liveScheduleEvent",  headers= HEADERS, data= json.dumps(BODY))
    
        # Return JSON response
        INFO =  json.loads(RESPONSE.text)

        if not RESPONSE.ok:
            raise Exception()
        
        return INFO

    except:
        await api_exception_handler(RESPONSE, "Add Input Schedule Event failed")

