from assets.multi_thread_upload import *
from assets.start_asset_upload import *
from assets.upload_complete_asset import *
from genre.check_genres import *
from genre.get_genres import *
from helpers.get_search_result import *
from login.login import *
from movies.create_movie import *
from movies.delete_movie import *
from movies.get_movie import *
from movies.search_movies import *
from movies.update_movie import *

def login_main():
    while True:
        USERNAME = input("Enter username: ")
        PASSWORD = input("Enter password: ")
        AUTH_TOKEN = login(USERNAME, PASSWORD)["token"]
        if not AUTH_TOKEN:
            print("Invalid credentials")
        else:
            return AUTH_TOKEN
        
def create_movie_main(AUTH_TOKEN):
    try:
        print("Press enter to skip parameters")
        TITLE = input("Enter title: ")
        PLOT = input("Enter plot: ")
        RELEASE_DATE = input("Enter release date (YYYY-MM-DDTHH:MM:SS): ")

        NOMAD_GENRES = get_genres(AUTH_TOKEN)
        
        GENRE_TITLES = []
        for GENRE_DICT in NOMAD_GENRES["items"]: GENRE_TITLES.append(GENRE_DICT["title"])
        GENRE_INPUT = input(f"Enter genres (separated by comma): \nGenres: {GENRE_TITLES}\n").split(",")
        if GENRE_INPUT[0] != "":
            GENRES = check_genres(AUTH_TOKEN, GENRE_INPUT)
        else:
            GENRES = ""
        IMAGE_FILE = input("Enter image file path: ")
        VIDEO_FILE = input("Enter video file path: ")

        if IMAGE_FILE != "":
            print("Uploading image")
            IMAGE_RESPONSE = start_upload(AUTH_TOKEN, f"{TITLE} image", IMAGE_FILE)
            multi_thread_upload(AUTH_TOKEN, IMAGE_FILE, IMAGE_RESPONSE)
            IMAGE_ID = IMAGE_RESPONSE["id"]
            upload_complete_asset(AUTH_TOKEN, IMAGE_ID)
        else:
            IMAGE_ID = ""

        if VIDEO_FILE != "":
            print("Uploading video")
            VIDEO_RESPONSE = start_upload(AUTH_TOKEN, f"{TITLE} video", VIDEO_FILE)
            multi_thread_upload(AUTH_TOKEN, VIDEO_FILE, VIDEO_RESPONSE)
            VIDEO_ID = VIDEO_RESPONSE["id"]
            upload_complete_asset(AUTH_TOKEN, VIDEO_ID)
        else:
            VIDEO_ID = ""

        print("Creating movie...")
        ID = create_movie(AUTH_TOKEN)["contentId"]
        update_movie(AUTH_TOKEN, ID, TITLE, slugify(TITLE), PLOT, RELEASE_DATE, GENRES,
                     IMAGE_ID, VIDEO_ID)
        print(f"Movie id: {ID}")
    except:
        raise Exception("Error creating movie")

def update_movie_main(AUTH_TOKEN, ID):
    try:
        MOVIE_JSON = get_movie(AUTH_TOKEN, ID)
        if not MOVIE_JSON["hasItems"]:
            raise Exception("Movie not found")
        
        MOVIE = MOVIE_JSON["items"][0]
        NOMAD_GENRES = get_genres(AUTH_TOKEN)
        
        GENRE_TITLES = []
        for GENRE_DICT in NOMAD_GENRES["items"]: GENRE_TITLES.append(GENRE_DICT["title"])

        print("Press enter to skip parameters")
        TITLE = input("Enter title: ")
        PLOT = input("Enter plot: ")
        RELEASE_DATE = input("Enter release date (YYYY-MM-DDTHH:MM:SS): ")
        GENRES = input(f"Enter genres (separated by comma): \nGenres: {GENRE_TITLES}\n").split(",")
        IMAGE_FILE = input("Enter image file path: ")
        VIDEO_FILE = input("Enter video file path: ")
    
        if TITLE == "" and "title" in MOVIE:
            TITLE = MOVIE["title"]

        if PLOT == "" and "plot" in MOVIE["identifiers"]:
            PLOT = MOVIE["identifiers"]["plot"]

        if RELEASE_DATE == "" and "releaseDate" in MOVIE:
            RELEASE_DATE = MOVIE["releaseDate"]

        if GENRES[0] == "":
            GENRES_INFO = MOVIE["identifiers"]["genres"]
        else:
            GENRES_INFO = check_genres(AUTH_TOKEN, GENRES)

        if IMAGE_FILE != "":
            print("Uploading image")
            IMAGE_RESPONSE = start_upload(AUTH_TOKEN, f"{TITLE} image", IMAGE_FILE)
            multi_thread_upload(AUTH_TOKEN, IMAGE_FILE, IMAGE_RESPONSE)
            IMAGE_ID = IMAGE_RESPONSE["id"]
            upload_complete_asset(AUTH_TOKEN, IMAGE_ID)
        else:
            if "image" in MOVIE["identifiers"]:
                IMAGE_ID = MOVIE["identifiers"]["image"]["id"]
            else:
                IMAGE_ID = ""

        if VIDEO_FILE != "":
            print("Uploading video")
            VIDEO_RESPONSE = start_upload(AUTH_TOKEN, f"{TITLE} video", VIDEO_FILE)
            multi_thread_upload(AUTH_TOKEN, VIDEO_FILE, VIDEO_RESPONSE)
            VIDEO_ID = VIDEO_RESPONSE["id"]
            upload_complete_asset(AUTH_TOKEN, VIDEO_ID)
        else:
            if "moveiFile" in MOVIE["identifiers"]:
                VIDEO_ID = MOVIE["identifiers"]["movieFile"]["id"]
            else:
                VIDEO_ID = ""

        ID = update_movie(AUTH_TOKEN, ID, TITLE, slugify(TITLE), PLOT, RELEASE_DATE, GENRES_INFO, IMAGE_ID, VIDEO_ID)
        print(f"Movie id: {ID}") 
    except:
        raise Exception()

def search_movie_main(AUTH_TOKEN):
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
        SEARCH_RESULTS = search_movies(AUTH_TOKEN, PAGE_OFFSET, PAGE_SIZE, SEARCH_QUERY, FILTERS, 
                                       SORT_FIELDS_NAME, SORT_FIELDS_ORDER, RESULT_FIELDS, IS_ADMIN)
        print("Search Results: ")
        print(json.dumps(SEARCH_RESULTS, indent=4))

    except:
        raise Exception()

def delete_movie_main(AUTH_TOKEN):
    try:
        ID = input("Enter the id of the movie you want to to delete: ")

        delete_movie(AUTH_TOKEN, ID)
        print("Movie deleted")

    except:
        raise Exception()

if __name__ == "__main__":
    AUTH_TOKEN = login_main()

    while True:
        print("Do you want to create or update a movie, search for a movie, "\
          "delete a movie, or exit?")
        USER_INPUT = input("Enter create, update, search, delete or exit for "\
                       "each option above respectively: ")
        if USER_INPUT == "create":
            create_movie_main(AUTH_TOKEN)

        elif USER_INPUT == "update":
            MOVIE_ID = input("Enter the id of the movie you want to update: ")
            update_movie_main(AUTH_TOKEN, MOVIE_ID)
        
        elif USER_INPUT == "search":
            search_movie_main(AUTH_TOKEN)

        elif USER_INPUT == "delete":
            delete_movie_main(AUTH_TOKEN)

        elif USER_INPUT == "exit":
            break

        else:
            print("Invalid input")
    