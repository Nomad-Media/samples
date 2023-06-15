from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def start_upload(AUTH_TOKEN: str) -> dict:

    # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = ADMIN_API_URL + "/asset/upload/start"
        
    # Create header for the request
    HEADERS = {
  	    "Authorization": "Bearer " + AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    # Build the payload BODY
    BODY = {
      	"parentId":"73d06e60-9607-4018-b666-775790c0f0c2",
      	"contentLength":3136083,
      	"uploadOverwriteOption":"cancel",
      	"chunkSize":8388608,
      	"relativePath":"test.txt",
        "languageId":"c66131cd-27fc-4f83-9b89-b57575ac0ed8"
    }

    try:
        # Send the request
        RESPONSE = requests.post(API_URL, headers= HEADERS, data= json.dumps(BODY))

        if RESPONSE.status_code != 200:
            raise Exception("Response returned " + str(RESPONSE.status_code))

        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, "Start asset upload failed")

