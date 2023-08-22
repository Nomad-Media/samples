from constants.project_constants import *
from exceptions.api_exception_handler import *

import requests

def get_movies(AUTH_TOKEN):

    HEADERS = {
        "Authorization": "Bearer " +  AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    BODY = {
        "filters": [
            {
                "fieldName": "contentDefinitionId",
                "operator": "Equals",
                "values": MOVIE_CONTENT_DEFINITION_ID
            },
            {
                "fieldName": "languageId",
                "operator": "Equals",
                "values": US_ENGLISH_LANGUAGE_LOOKUP_ID
            }
        ],
        "SearchResultFields": [
            {
                "name": "contentDefinitionId"
            },
            {
                "name": "contentDefinitionTitle"
            },
            {
                "name": "plot"
            },
            {
                "name": "releaseDate"
            },
            {
                "name": "genre"
            },
            {
                "name": "image",
                "SearchResultFields": [
                    {
                        "name": "fullUrl"
                    }
                ]
            },
            {
                "name": "movieFile",
                "SearchResultFields": [
                    {
                        "name": "fullUrl"
                    }
                ]
            }
        ]
    }

    try:
        RESPONSE = requests.get(f"{ADMIN_API_URL}/admin/search", headers= HEADERS, data= json.dumps(BODY))

        # If not found return None
        if (not RESPONSE.ok):
            raise Exception()
        
        return RESPONSE.json()
    
    except:
        api_exception_handler(RESPONSE, f"Getting Movies failed")