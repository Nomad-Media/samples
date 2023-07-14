from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def search_movies(AUTH_TOKEN, FILTERS, SEARCH_RESULT_FIELDS, SORT_FIELD, SORT_TYPE):
    # Create header for the request
    if not AUTH_TOKEN:
        raise Exception("Authorization token not found")
  
    API_URL = f"{PORTAL_API_URL}/portal/search"
    
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
    

    if (SORT_FIELD != ""):
        BODY["sortFields"] = [
            {
                "fieldName": SORT_FIELD,
                "sortType": SORT_TYPE
            }
        ]
    

    # Send POST request
    RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))

    # Check for success
    if (RESPONSE.ok):
        # Get the response
        MOVIES = RESPONSE.json()

        # Return the movies
        return MOVIES
    

    api_exception_handler(RESPONSE, "Getting movies failed")

