from constants.project_constants import *
from exceptions.api_exception_handler import *

import requests

def get_contents(AUTH_TOKEN, CONTENT_DEFINITION_ID, SORT_COLUMN, SORT_ORDER, PAGE_INDEX, PAGE_SIZE, LANGUAGE_ID):
    if not AUTH_TOKEN:
        raise Exception("Authorization token not found")
  
    API_URL = f"{ADMIN_API_URL}/content?contentDefinitionId={CONTENT_DEFINITION_ID}"

    if SORT_COLUMN != "":
        API_URL += f"&sortColumn={SORT_COLUMN}"

    if SORT_ORDER != "":
        API_URL += f"&isDesc={SORT_ORDER}"

    if PAGE_INDEX != "":
        API_URL += f"&pageIndex{PAGE_INDEX}"

    if PAGE_SIZE != "":
        API_URL += f"&pageSize{PAGE_SIZE}"

    if LANGUAGE_ID != "":
        API_URL += f"&language={LANGUAGE_ID}"
    
    HEADERS = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + AUTH_TOKEN
    }

    try:
        RESPONSE = requests.get(API_URL, headers=HEADERS)

        if (RESPONSE.ok):
            return True

    except:
        api_exception_handler(RESPONSE, "Getting contents failed")