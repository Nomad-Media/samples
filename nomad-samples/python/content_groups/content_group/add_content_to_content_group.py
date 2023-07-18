from constants.project_constants import *
from exceptions.api_exception_handler import *

import json
import requests

def add_content_to_content_group(AUTH_TOKEN: str, CONTENT_GROUP_ID, CONTENTS: list) -> dict:
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = PORTAL_API_URL + "/contentgroup/add/" + CONTENT_GROUP_ID

    HEADERS = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + AUTH_TOKEN
    }
    
    BODY = CONTENTS

    try:
        RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))
        if not RESPONSE.ok:
            raise Exception()

        return json.loads(RESPONSE.text)
   	
    except:
      	api_exception_handler(RESPONSE, "Add content to content group failed")