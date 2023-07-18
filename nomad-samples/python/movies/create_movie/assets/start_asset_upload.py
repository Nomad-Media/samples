from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, os, requests

def start_upload(AUTH_TOKEN: str, NAME: str, FILE: str) -> dict:

    # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = ADMIN_API_URL + "/asset/upload/start"
    FILE_STATS = os.stat(FILE)

    AWS_MIN_LIMIT = 5242880
    chunkSize = FILE_STATS.st_size / 10000

    if (chunkSize < (AWS_MIN_LIMIT * 4)):
        chunkSize = 20971520
        
    # Create header for the request
    HEADERS = {
  	    "Authorization": "Bearer " + AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    # Build the payload BODY
    BODY = {
      	"contentLength":FILE_STATS.st_size,
      	"uploadOverwriteOption": "continue",
      	"chunkSize": chunkSize,
      	"relativePath": FILE,
        "relatedContentId": "",
        "displayName": os.path.basename(FILE) if NAME == "" else NAME
    }

    try:
        # Send the request
        RESPONSE = requests.post(API_URL, headers= HEADERS, data= json.dumps(BODY))

        if not RESPONSE.ok:
            raise Exception("Response returned " + str(RESPONSE.status_code))

        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, "Start asset upload failed")

