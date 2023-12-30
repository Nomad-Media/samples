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

def update_movie():
    try:
        ID = input("Enter the id of the movie you want to update: ")

        try:
            MOVIE = nomad_sdk.get_content(ID, MOVIE_CONTENT_DEFINITION_ID, None)
        except Exception as e:
            raise Exception(f"Movie not found: {e}")

        print("Press enter to skip parameters")
        TITLE = input("Enter title: ")
        PLOT = input("Enter plot: ")
        RELEASE_DATE = input("Enter release date (YYYY-MM-DDTHH:MM:SS): ")
        GENRES = input(f"Enter genres (separated by comma): ").split(",")
        IMAGE_FILE = input("Enter image file path: ")
        VIDEO_FILE = input("Enter video file path: ")
    
        if TITLE == "" and "title" in MOVIE:
            TITLE = MOVIE["title"]

        if PLOT == "" and "plot" in MOVIE["properties"]:
            PLOT = MOVIE["properties"]["plot"]

        if RELEASE_DATE == "" and "releaseDate" in MOVIE["properties"]:
            RELEASE_DATE = MOVIE["releaseDate"]

        if GENRES[0] == "" and "genres" in MOVIE["properties"]:
            GENRES_INFO = MOVIE["properties"]["genres"]
        else:
            GENRES_INFO = check_genres(GENRES)

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

        nomad_sdk.update_content(ID, MOVIE_CONTENT_DEFINITION_ID, 
                                 {
                                     "title": TITLE, 
                                     "plot": PLOT, 
                                     "releaseDate": RELEASE_DATE,
                                     "genres": GENRES,
                                     "image": IMAGE_ID,
                                     "movieFile": VIDEO_ID
                                 }, None)
        print(f"Movie id: {ID}")
    except:
        raise Exception()

def search_movie():
    try:
        PAGE_OFFSET = input("Enter page offset: ") if input("Do you want to add a page offset (y/n): ") == "y" else ""
        PAGE_SIZE = input("Enter page size: ") if input("Do you want to add a page size (y/n): ") == "y" else ""

        SEARCH_QUERY = input("Enter a search query: ") if input("Do you want to add a search query (y/n): ") == "y" else ""

        filterYN = True if input("Do you want to add a filter (y/n)?\n") == "y" else False
    
        FILTERS = []
        while filterYN:
            fieldName = input("Enter field name: ")
            operator = input("Enter operator: ")
            value = input("Enter value: ")

            filter = { 
                "fieldName": fieldName,
                "operator": operator,
                "values": value
            }

            FILTERS.append(filter)

            filterYN = True if input("Do you want to add another field (y/n)?\n") == "y" else False

        if input("Do you want to sort the fields (y/n): ") == "y":
            SORT_FIELDS_NAME = input("Enter field name you want to sort by: ")
            SORT_FIELDS_ORDER = input("Enter the order you want to sort the field by (ascending/descending): ")
        else:
            SORT_FIELDS_NAME = SORT_FIELDS_ORDER = ""

        RESULT_FIELDS_YN = True if input("Do you want to enter the names of the fields you want to "\
                                      "include in your search results (y/n)?: ") == "y" else False

        RESULT_FIELDS = []
        if RESULT_FIELDS_YN: 
            while True:
                RESULT_FIELDS.append(get_search_result())

                if input("Do you want to add another search result field (y/n)?: ") != "y":
                    break

        IS_ADMIN = True if input("Do you want to search by admin or portal?: ") == "admin" else False

        print("Searching")
        SEARCH_RESULTS = nomad_sdk.search(PAGE_OFFSET, PAGE_SIZE, SEARCH_QUERY, FILTERS, 
                                       SORT_FIELDS_NAME, SORT_FIELDS_ORDER, RESULT_FIELDS,
                                       None, True, None)
        print("Search Results: ")
        print(json.dumps(SEARCH_RESULTS, indent=4))

    except:
        raise Exception()

def delete_movie():
    try:
        ID = input("Enter the id of the movie you want to to delete: ")

        delete_movie(ID)
        print("Movie deleted")

    except:
        raise Exception()

if __name__ == "__main__":
    while True:
        print("Do you want to create or update a movie, search for a movie, "\
          "delete a movie, or exit?")
        USER_INPUT = input("Enter create, update, search, delete or exit for "\
                       "each option above respectively: ")
        if USER_INPUT == "create":
            create_movie()

        elif USER_INPUT == "update":
            update_movie()
        
        elif USER_INPUT == "search":
            search_movie()

        elif USER_INPUT == "delete":
            delete_movie()

        elif USER_INPUT == "exit":
            break

        else:
            print("Invalid input")
    