from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def search_movies(AUTH_TOKEN, PAGE_OFFSET, PAGE_SIZE, SEARCH_QUERY, FILTERS,
                  SORT_FIELDS_NAME, SORT_FIELDS_ORDER, SEARCH_RESULT_FIELDS, IS_ADMIN):
    # Create header for the request
    if not AUTH_TOKEN:
        raise Exception("Authorization token not found")
  
    API_URL = f"{ADMIN_API_URL}/admin/search" if IS_ADMIN else f"{PORTAL_API_URL}/portal/search"
    
    HEADERS = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    DEFAULT_FILTERS = [
        {
            "fieldName": "contentDefinitionId",
            "operator": "Equals",
            "values": MOVIE_CONTENT_DEFINITION_ID,
        },
        {
            "fieldName": "languageId",
            "operator": "Equals",
            "values": US_ENGLISH_LANGUAGE_LOOKUP_ID,
        }
    ]

    for FILTER in FILTERS:
        DEFAULT_FILTERS.append(FILTER)
    

    # Build the payload body
    BODY = {
        "filters": DEFAULT_FILTERS,
        "searchResultFields": SEARCH_RESULT_FIELDS
    }
    
    if PAGE_OFFSET != "": BODY["pageOffset"] = PAGE_OFFSET
    if PAGE_SIZE != "": BODY["pageSize"] = PAGE_SIZE
    if SEARCH_QUERY != "": BODY["searchQuery"] = SEARCH_QUERY 

    if SORT_FIELDS_NAME != "": BODY["sortFields"] = [{"fieldName": SORT_FIELDS_NAME, "sortType": SORT_FIELDS_ORDER}]
    

    try:
        # Send POST request
        RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))

        # Check for success
        if not RESPONSE.ok:
            raise Exception()
        
        # Get the response
        MOVIES = RESPONSE.json()

        # Return the movies
        return MOVIES
        
    except:
        api_exception_handler(RESPONSE, "Getting movies failed")

