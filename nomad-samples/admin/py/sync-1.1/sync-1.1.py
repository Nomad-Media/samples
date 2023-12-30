import sys, os
sys.path.append(os.path.realpath('...'))

from nomad_media_pip.nomad_sdk import Nomad_SDK
from config import config

nomad_sdk = Nomad_SDK(config)

import json

GENRE_CONTENT_DEFINITION_ID = "dbbace1f-ddb1-462b-9cae-c9be7d5990ac"
MOVIE_CONTENT_DEFINITION_ID = "eb710e28-7c44-492e-91f9-8acd0cd9331c"

def check_genres(GENRES):
    NOMAD_GENRES = nomad_sdk.search(None, None, None,
        [
            {
                "fieldName":"contentDefinitionId",
                "operator":"Equals",
                "values":GENRE_CONTENT_DEFINITION_ID
            }
        ], None, None, None, None, True, None)

    GENRE_MAP_LIST = []
    for GENRE in GENRES:
        for GENRE_ELEM in NOMAD_GENRES["items"]:
            if GENRE_ELEM["title"] == GENRE:
                GENRE_MAP_LIST.append(GENRE_ELEM)
                break
        else:
            GENRE = nomad_sdk.create_content(GENRE_CONTENT_DEFINITION_ID, None)
            nomad_sdk.update_content(GENRE["contentId"], GENRE_CONTENT_DEFINITION_ID,
                {
                    "title": GENRE
                }, None)
            GENRE_MAP_LIST.append({ "id": GENRE["contentId"], "title": GENRE })

    return GENRE_MAP_LIST

def get_search_result():
    choice = input("Do you want to add a name or a search result field? (name/search): ").lower()

    if choice == "name":
        name = input("Enter the name: ")
        return {"name": name}

    elif choice == "search":
        search_result_name = input("Enter the search result name: ")

        search_result_fields = []
        search_result = get_search_result()
        search_result_fields.append(search_result)

        return {"name": search_result_name, "searchResultFields": search_result_fields}

    else:
        print("Invalid choice. Please enter 'name' or 'search'.")
        return get_search_result()

def create_movie():
    try:
        print("Press enter to skip parameters")
        TITLE = input("Enter title: ")
        PLOT = input("Enter plot: ")
        RELEASE_DATE = input("Enter release date (YYYY-MM-DDTHH:MM:SS): ")

        GENRE_INPUT = input(f"Enter genres (separated by comma): ").split(",")
        GENRES = check_genres(GENRE_INPUT)

        IMAGE_FILE = input("Enter image file path: ")
        VIDEO_FILE = input("Enter video file path: ")

        if IMAGE_FILE != "":
            print("Uploading image")
            IMAGE_ID = nomad_sdk.upload_asset(None, None, None, None, None, None, 
                "replace", IMAGE_FILE, None)
        else:
            IMAGE_ID = ""

        if VIDEO_FILE != "":
            print("Uploading video")
            VIDEO_ID = nomad_sdk.upload_asset(None, None, None, None, None, None,
                "replace", VIDEO_FILE, None)
        else:
            VIDEO_ID = ""

        print("Creating movie...")
        MOVIE = nomad_sdk.create_content(MOVIE_CONTENT_DEFINITION_ID, None)
        nomad_sdk.update_content(MOVIE["contentId"], MOVIE_CONTENT_DEFINITION_ID, 
                                 {
                                     "title": TITLE, 
                                     "plot": PLOT, 
                                     "releaseDate": RELEASE_DATE,
                                     "genres": GENRES,
                                     "image": IMAGE_ID,
                                     "movieFile": VIDEO_ID
                                 }, None)
        print(f"Movie id: {MOVIE['contentId']}")
    except:
        raise Exception("Error creating movie")

def sync():

    print("Syncronizing...")
    try:
        # Get movies from json
        with open("movie.json", "r") as movies_file:
            MOVIES = json.load(movies_file)

        if (MOVIES is None or len(MOVIES) == 0):
            raise Exception("Error retrieving data, make sure the source file exists and is not empty.")

        print(f"{len(MOVIES)} movies found in source file")

        # Loop all the movies to sync
        for idx, JSON_MOVIE in enumerate(MOVIES):
            print(f"Syncing movie #{idx + 1} out of {len(MOVIES)} | {JSON_MOVIE['title']}")

            # Check if genre exists if not create it
            GENRES = check_genres(JSON_MOVIE["genres"])

            # Check if movie exists
            MOVIE = nomad_sdk.search(None, None, None,
                [
                    {
                        "fieldName": "contentDefinitionId",
                        "operator": "Equals",
                        "values": MOVIE_CONTENT_DEFINITION_ID
                    },
                    {
                        "fieldName": "title",
                        "operator": "Equals",
                        "values": JSON_MOVIE['title']
                    }
                ], None, None, None, None, True, None)

            if (MOVIE["hasItems"]):
                if sorted(MOVIE.items()) != sorted(JSON_MOVIE.items()):
                    print(f"Updating movie {JSON_MOVIE['title']}")
                    MOVIE = nomad_sdk.update_content(MOVIE["items"][0]["id"],
                        MOVIE_CONTENT_DEFINITION_ID,
                        {
                            "title": JSON_MOVIE["title"], 
                            "plot": JSON_MOVIE["plot"], 
                            "releaseDate": JSON_MOVIE["releaseDate"], 
                            "genres": GENRES, 
                            "image": JSON_MOVIE["image"]["id"], 
                            "video": JSON_MOVIE["movieFile"]["id"]
                        }, None)
            else:
                print(f"Creating movie {JSON_MOVIE['title']}")
                CONTENT = nomad_sdk.create_content(MOVIE_CONTENT_DEFINITION_ID, None)
                CONTENT_ID = CONTENT["contentId"]
                MOVIE = nomad_sdk.update_content(CONTENT_ID,
                        MOVIE_CONTENT_DEFINITION_ID,
                        {
                            "title": JSON_MOVIE["title"], 
                            "plot": JSON_MOVIE["plot"], 
                            "releaseDate": JSON_MOVIE["releaseDate"], 
                            "genres": GENRES, 
                            "image": JSON_MOVIE["image"]["id"], 
                            "video": JSON_MOVIE["movieFile"]["id"]
                        }, None)



        print("Syncronization completed")
    except:
        raise Exception("Error syncing movies")

def update_movie():
    try:
        TITLE = input("Enter the movie title to update: ")

        MOVIE_JSON = nomad_sdk.search(None, None, None,
        [
            {
                "fieldName":"contentDefinitionId",
                "operator":"Equals",
                "values":MOVIE_CONTENT_DEFINITION_ID
            }
        ], None, None, None, None, True, None)

        if not MOVIE_JSON["hasItems"]:
            raise Exception("Movie not found")
        
        MOVIE = MOVIE_JSON["items"][0]
        NOMAD_GENRES = nomad_sdk.search(None, None, None,
        [
            {
                "fieldName":"contentDefinitionId",
                "operator":"Equals",
                "values":GENRE_CONTENT_DEFINITION_ID
            }
        ], None, None, None, None, True, None)
        
        GENRE_TITLES = []
        for GENRE_DICT in NOMAD_GENRES["items"]: GENRE_TITLES.append(GENRE_DICT["title"])

        print("Press enter to skip parameters")
        TITLE = input("Enter title: ")
        PLOT = input("Enter plot: ")
        RELEASE_DATE = input("Enter release date (YYYY-MM-DDTHH:MM:SS): ")
        GENRES = input(f"Enter genres (separated by comma): \nGenres: {GENRE_TITLES}\n").split(",")
        IMAGE_ID = input("Enter image asset id: ")
        VIDEO_ID = input("Enter video asset id: ")
    
        if TITLE == "" and "title" in MOVIE:
            TITLE = MOVIE["title"]

        if PLOT == "" and "plot" in MOVIE["identifiers"]:
            PLOT = MOVIE["identifiers"]["plot"]

        if RELEASE_DATE == "" and "releaseDate" in MOVIE:
            RELEASE_DATE = MOVIE["releaseDate"]

        if GENRES[0] == "":
            GENRES_INFO = MOVIE["identifiers"]["genres"]
        else:
            GENRES_INFO = check_genres(GENRES)

        if IMAGE_ID == "" and "image" in MOVIE["identifiers"]:
            IMAGE_ID = MOVIE["identifiers"]["image"]["id"]

        if VIDEO_ID == "" and "movieFile" in MOVIE["identifiers"]:
            VIDEO_ID = MOVIE["identifiers"]["movieFile"]["id"]

        ID = update_movie(MOVIE["masterId"], MOVIE["masterId"], TITLE, 
                          PLOT, RELEASE_DATE, GENRES_INFO, IMAGE_ID, 
                          VIDEO_ID)
        print(f"Movie id: {ID}") 
    except:
        raise Exception()

def delete_movie():
    INPUT = input("Enter the movie id to delete: ")

    try:
        delete_movie(INPUT)
        print("Movie deleted")
    except:
        raise Exception("Error deleting movie")

if __name__ == "__main__":
    while True:
        print("Do you want to create, sync movies form json, update a movie, or delete movies or exit?: ")
        USER_INPUT = input("Enter create, sync, update, delete, or exit for each option above respectivly: ")
        if USER_INPUT == "create":
            ID = create_movie
        elif USER_INPUT == "sync":    
            sync()
        elif USER_INPUT == "update":
            update_movie
        elif USER_INPUT == "delete":
            delete_movie
        elif USER_INPUT == "exit":
            break
        else:
            print("Invalid input")
    


