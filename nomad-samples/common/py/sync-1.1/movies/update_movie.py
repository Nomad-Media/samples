from constants.project_constants import *
from exceptions.api_exception_handler import *

from helpers.slugify import slugify

import json, requests

def update_movie(AUTH_TOKEN, ID, CONTENT_ID, TITLE, PLOT, RELEASE_DATE, GENRE_ID, GENRE_NAME, IMAGE_ID, VIDEO_ID):
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

    if TITLE != "": 
        BODY["properties"]["title"] = TITLE
        BODY["properties"]["slug"] = slugify(TITLE)
    if PLOT != "": BODY["properties"]["plot"] = PLOT
    if RELEASE_DATE != "": BODY["properties"]["releaseDate"] = RELEASE_DATE

    if GENRE_ID != "":
        BODY["properties"]["genre"] = {
            "id": GENRE_ID,
            "description": GENRE_NAME
        }

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

