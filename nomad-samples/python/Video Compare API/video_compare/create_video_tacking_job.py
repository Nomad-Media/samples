from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def create_video_tracking_job(AUTH_TOKEN: str) -> dict:

    # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = VIDEO_COMPARE_API_URL + "/videocompare/tracking"
        
    # Create header for the request
    HEADERS = {
  	    "Authorization": "Bearer abc...xyz",
		    "Content-Type": "application/json"
    }

    # Build the payload BODY
    BODY = {
        "externalId": "Footsports US-CAN Stream",
        "programStartDtUtc": "2022-01-01T18:22:00-07:00",
        "programEndDtUtc": "2022-01-01T20:22:00-07:00",
        "programName": "X-treme Armball Footsports",
        "channelGroup": [
            {
                "primaryUdpMulticastIpAddress": "127.0.0.1",
                "primaryUdpPort": 9001,
                "backupUdpMulticastIpAddress": "127.0.0.2",
                "backupUdpPort": 9100,
                "channelName": "Sports 1"
            },
            {
                "primaryUdpMulticastIpAddress": "127.0.0.10",
                "primaryUdpPort": 9010,
                "backupUdpMulticastIpAddress": "127.0.0.9",
                "backupUdpPort": 9110,
                "channelName": "Sports 2"
            }
        ],
        "defaultThresholdInfos": {
            "thresholdKey1": "ThresholdValue1",
            "thresholdKey2": "ThresholdValue2"
        }
    }

    try:
        # Send the request
        RESPONSE = requests.post(API_URL, headers= HEADERS, data= json.dumps(BODY))

        # Get the response
        

        if RESPONSE.status_code != 200:
            raise Exception("Response returned " + str(RESPONSE.status_code))

        

        return json.loads(RESPONSE.text)

    except:
        api_exception_handler("Search failed")

