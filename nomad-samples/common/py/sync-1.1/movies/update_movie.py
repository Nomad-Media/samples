from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def update_movie(AUTH_TOKEN, ID, CONTENT_ID, TITLE, SLUG, PLOT, RELEASE_DATE, GENRES, IMAGE_ID, VIDEO_ID):
    # Create header for the request
    if not AUTH_TOKEN:
        raise Exception("Authorization token not found")
  
    API_URL = f"{ADMIN_API_URL}/content/{ID}"
    
    HEADERS = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + AUTH_TOKEN
    }

    # Build the payload body
    BODY = {
        "contentDefinitionId": MOVIE_CONTENT_DEFINITION_ID,
        "contentId": CONTENT_ID,
        "properties": {},
    }

    if TITLE != "": BODY["properties"]["title"] = TITLE
    if SLUG != "": BODY["properties"]["slugifyField"] = SLUG
    if PLOT != "": BODY["properties"]["plot"] = PLOT
    if RELEASE_DATE != "": BODY["properties"]["releaseDate"] = RELEASE_DATE

    if GENRES != "":
        BODY["properties"]["genres"] = GENRES

    if IMAGE_ID != "":
        BODY["properties"]["image"] = { 
            "id": IMAGE_ID
        }

    if VIDEO_ID != "":
        BODY["properties"]["movieFile"] = {
            "id": VIDEO_ID
        }

    try:
        # Send POST request
        RESPONSE = requests.put(API_URL, headers=HEADERS, data=json.dumps(BODY))

        # Check for success
        if not RESPONSE.ok:
            raise Exception()

        # Get the response
        ID = RESPONSE.json()

        # Return the ID
        return ID
    
    except:
        api_exception_handler(RESPONSE, "Create/Update movie failed")

