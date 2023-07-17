from assets.multi_thread_upload import *
from assets.start_asset_upload import *
from assets.upload_complete_asset import *
from genre.check_genres import *
from genre.get_genres import *
from login.login import *
from movies.create_movie import *
from movies.delete_movie import *
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
        
def update_movie_main(AUTH_TOKEN, ID):
    try:
        GENRES = get_genres(AUTH_TOKEN)
        
        GENRE_TITLES = []
        for GENRE_DICT in GENRES["items"]: GENRE_TITLES.append(GENRE_DICT["title"])

        print("Press enter to skip parameters")
        TITLE = input("Enter title: ")
        PLOT = input("Enter plot: ")
        RELEASE_DATE = input("Enter release date (YYYY-MM-DDTHH:MM:SS): ")
        GENRE = input(f"Enter genre: \nGenres: {GENRE_TITLES}\n")
        IMAGE_FILE = input("Enter image file path: ")
        VIDEO_FILE = input("Enter video file: ")
    
        if GENRE == "":
            GENRE_INFO = { "id": "", "title": "" }
        else:
            GENRE_INFO = check_genres(AUTH_TOKEN, GENRE)

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

        ID = update_movie(AUTH_TOKEN, ID, TITLE, slugify(TITLE), PLOT, RELEASE_DATE, GENRE_INFO["id"], GENRE_INFO["title"], IMAGE_ID, VIDEO_ID)
        print(f"Movie id: {ID}") 
    except:
        raise Exception()

def search_movie_main(AUTH_TOKEN):
    try:
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

        FIELD_NAMES = input("Enter field names (separated by comma): ").split(",")
        SORT_FIELDS = input("Enter field name you want to sort by: ")
        SORT_TYPE = input("Enter the order you want to sort the field by (ascending/descending): ")

        FIELD_LIST = []
        for FIELD in FIELD_NAMES:
            FIELD_DICT = {
                "name": FIELD
            }
            FIELD_LIST.append(FIELD_DICT)

        SEARCH_RESULTS = search_movies(AUTH_TOKEN, FILTERS, FIELD_LIST, SORT_FIELDS, SORT_TYPE)
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
            ID = create_movie(AUTH_TOKEN)
            update_movie_main(AUTH_TOKEN, ID["contentId"])

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
    