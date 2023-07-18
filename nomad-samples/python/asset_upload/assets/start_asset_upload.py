from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, os, requests

async def start_upload(AUTH_TOKEN: str, NAME: str, UPLOAD_OVERWRITE_OPTION: str, FILE: str, \
                 RELATED_CONTENT_ID: str) -> dict:

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
      	"uploadOverwriteOption": UPLOAD_OVERWRITE_OPTION,
      	"chunkSize": chunkSize,
      	"relativePath": FILE,
        "relatedContentId": "" if RELATED_CONTENT_ID == "" else RELATED_CONTENT_ID,
        "displayName": os.path.basename(FILE) if NAME == "" else NAME
    }

    try:
        # Send the request
        RESPONSE = requests.post(API_URL, headers= HEADERS, data= json.dumps(BODY))

        if not RESPONSE.ok:
            raise Exception()

        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, "Start asset upload failed")

