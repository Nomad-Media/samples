from constants.project_constants import *
from exceptions.api_exception_handler import *

from libraries import requests, json

async def get_channel_names(AUTH_TOKEN):
    HEADERS = {
        "Authorization": "Bearer " +  AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    try:
        RESPONSE = requests.get(SERVER_URL + "/liveChannel/" + "", headers= HEADERS)

        # If not found return None
        if (not RESPONSE.ok):
            raise Exception()
        
        INFO = json.loads(RESPONSE.text)

        CHANNEL_NAMES = []
        for CHANNEL in INFO:
            CHANNEL_NAMES.append(CHANNEL["name"])
                                 
        return CHANNEL_NAMES
    
    except:
        await api_exception_handler(RESPONSE, "Search found no channels")