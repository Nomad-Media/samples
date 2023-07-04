from exceptions.api_exception_handler import *

import requests

def upload_asset_part(FILE, URL, PART):
    if not FILE or not URL or not PART:
        raise Exception("Upload Part: Invalid API call")
    
    OPEN_FILE = open(FILE, "rb")
    OPEN_FILE.seek(PART["startingPosition"])
    BODY = OPEN_FILE.read(PART["endingPosition"] + 1 - PART["startingPosition"])
    OPEN_FILE.close()
    

    HEADER = {
        "Accept": "application/json, text/plain, */*"
    }

    RESPONSE = requests.put(URL, headers=HEADER, data=BODY)

    if RESPONSE.ok:
        return RESPONSE.headers.get("ETag")
    
    api_exception_handler(RESPONSE, "Upload part failed")