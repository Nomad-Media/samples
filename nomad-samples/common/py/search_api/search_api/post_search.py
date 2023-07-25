from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def post_search(AUTH_TOKEN, PAGE_OFFSET, PAGE_SIZE, SEARCH_QUERY, FILTERS, SORT_FIELDS_NAME, 
                   SORT_FIELDS_ORDER, RESULT_FIELDS, IS_ADMIN) -> dict:

    # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = f"{ADMIN_API_URL}/admin/search" if IS_ADMIN else f"{PORTAL_API_URL}/portal/search"
        
    # Create header for the request
    HEADERS = {
  	    "Authorization": "Bearer " + AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    # Build the payload BODY
    BODY = {"searchResultFields": RESULT_FIELDS}

    if PAGE_OFFSET != "": BODY["pageOffset"] = PAGE_OFFSET
    if PAGE_SIZE != "": BODY["pageSize"] = PAGE_SIZE
    if SEARCH_QUERY != "": BODY["searchQuery"] = SEARCH_QUERY 

    if len(FILTERS) != 0: BODY["filters"] = FILTERS

    if SORT_FIELDS_NAME != "": BODY["sortFields"] = [{"fieldName": SORT_FIELDS_NAME, "sortType": SORT_FIELDS_ORDER}]

    try:
        # Send the request
        RESPONSE = requests.post(API_URL, headers= HEADERS, data= json.dumps(BODY))

        if not RESPONSE.ok:
            raise Exception()

        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, "Searching failed")

