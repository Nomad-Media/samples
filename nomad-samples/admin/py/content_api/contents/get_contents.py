from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def get_contents(AUTH_TOKEN, CONTENT_DEFINITION_ID, SORT_COLUMN, IS_DESC, PAGE_INDEX, PAGE_SIZE, LANGUAGE_ID):
  
    API_URL = f"{ADMIN_API_URL}/content?contentDefinitionId={CONTENT_DEFINITION_ID}"
    
    if IS_DESC != "":
        API_URL += f"&isDesc={IS_DESC}"

    if SORT_COLUMN != "":
        API_URL += f"&sortColumn={SORT_COLUMN}"

    API_URL += f"&pageIndex={PAGE_INDEX}" if PAGE_INDEX != "" else "&pageIndex=0"

    API_URL += f"&pageSize={PAGE_SIZE}" if PAGE_SIZE != "" else "&pageSize=100"

    if LANGUAGE_ID != "":
        API_URL += f"&language={LANGUAGE_ID}"

    HEADERS = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + AUTH_TOKEN
    }

    try:
        RESPONSE = requests.get(API_URL, headers=HEADERS)

        if (RESPONSE.ok):
            INFO = RESPONSE.json()

            return INFO
        
        raise Exception()

    except:
        api_exception_handler(RESPONSE, "Getting content failed")