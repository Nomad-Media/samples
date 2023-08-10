from genre.check_genres import *

from movies.create_movie import *
from movies.delete_movie import *
from movies.get_movie import *
from movies.update_movie import *


import json

def create_movie_main(AUTH_TOKEN):
    try:
        print("Press enter to skip parameters")
        TITLE = input("Enter title: ")
        PLOT = input("Enter plot: ")
        RELEASE_DATE = input("Enter release date (YYYY-MM-DDTHH:MM:SS): ")

        GENRES = get_genres(AUTH_TOKEN)
        
        GENRE_TITLES = []
        for GENRE_DICT in GENRES["items"]: GENRE_TITLES.append(GENRE_DICT["title"])
        GENRE = check_genres(AUTH_TOKEN, input(f"Enter genre: \nGenres: {GENRE_TITLES}\n"))
        IMAGE_ID = input("Enter image asset id: ")
        VIDEO_ID = input("Enter video asset id: ")

        print("Creating movie...")
        ID = create_movie(AUTH_TOKEN)["contentId"]
        update_movie(AUTH_TOKEN, ID, ID, TITLE, PLOT, RELEASE_DATE, GENRE["id"], GENRE["title"],
                     IMAGE_ID, VIDEO_ID)
        print(f"Movie id: {ID}")
    except:
        raise Exception("Error creating movie")

def sync(AUTH_TOKEN):

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
            GENRE = check_genres(AUTH_TOKEN, JSON_MOVIE["genre"])

            # Check if movie exists
            MOVIE = get_movie(AUTH_TOKEN, JSON_MOVIE["title"])

            if (MOVIE["hasItems"]):
                if sorted(MOVIE.items()) != sorted(JSON_MOVIE.items()):
                    print(f"Updating movie {JSON_MOVIE['title']}")
                    MOVIE = update_movie(AUTH_TOKEN, MOVIE["items"][0]["id"], JSON_MOVIE["id"],
                                         JSON_MOVIE["title"], JSON_MOVIE["plot"], 
                                         JSON_MOVIE["releaseDate"], GENRE["id"], GENRE["title"], 
                                         JSON_MOVIE["image"], JSON_MOVIE["movieFile"])
            else:
                print(f"Creating movie {JSON_MOVIE['title']}")
                MOVIE_ID = create_movie(AUTH_TOKEN)
                MOVIE = update_movie(AUTH_TOKEN, MOVIE_ID["masterId"], JSON_MOVIE["id"],
                                     JSON_MOVIE["title"], JSON_MOVIE["plot"],
                                     JSON_MOVIE["releaseDate"], GENRE["id"], GENRE["title"],
                                     JSON_MOVIE["image"], JSON_MOVIE["movieFile"])



        print("Syncronization completed")
    except:
        raise Exception("Error syncing movies")

def update_movie_main(AUTH_TOKEN):
    try:
        TITLE = input("Enter the movie title to update: ")

        MOVIE_JSON = get_movie(AUTH_TOKEN, TITLE)
        if not MOVIE_JSON["hasItems"]:
            raise Exception("Movie not found")
        
        MOVIE = MOVIE_JSON["items"][0]
        GENRES = get_genres(AUTH_TOKEN)
        
        GENRE_TITLES = []
        for GENRE_DICT in GENRES["items"]: GENRE_TITLES.append(GENRE_DICT["title"])

        print("Press enter to skip parameters")
        TITLE = input("Enter title: ")
        PLOT = input("Enter plot: ")
        RELEASE_DATE = input("Enter release date (YYYY-MM-DDTHH:MM:SS): ")
        GENRE = input(f"Enter genre: \nGenres: {GENRE_TITLES}\n")
        IMAGE_ID = input("Enter image asset id: ")
        VIDEO_ID = input("Enter video asset id: ")
    
        if TITLE == "" and "title" in MOVIE:
            TITLE = MOVIE["title"]

        if PLOT == "" and "plot" in MOVIE["identifiers"]:
            PLOT = MOVIE["identifiers"]["plot"]

        if RELEASE_DATE == "" and "releaseDate" in MOVIE:
            RELEASE_DATE = MOVIE["releaseDate"]

        if GENRE == "":
            GENRE_INFO = MOVIE["identifiers"]["genre"]
        else:
            GENRE_INFO = check_genres(AUTH_TOKEN, GENRE)

        if IMAGE_ID == "" and "image" in MOVIE["identifiers"]:
            IMAGE_ID = MOVIE["identifiers"]["image"]["id"]

        if VIDEO_ID == "" and "movieFile" in MOVIE["identifiers"]:
            VIDEO_ID = MOVIE["identifiers"]["movieFile"]["id"]

        ID = update_movie(AUTH_TOKEN, MOVIE["masterId"], MOVIE["masterId"], TITLE, 
                          PLOT, RELEASE_DATE, GENRE_INFO["id"], GENRE_INFO["title"], IMAGE_ID, 
                          VIDEO_ID)
        print(f"Movie id: {ID}") 
    except:
        raise Exception()

def delete_movie_main(AUTH_TOKEN):
    INPUT = input("Enter the movie id to delete: ")

    try:
        delete_movie(AUTH_TOKEN, INPUT)
        print("Movie deleted")
    except:
        raise Exception("Error deleting movie")

if __name__ == "__main__":
    AUTH_TOKEN = input("Enter your auth token: ")

    while True:
        print("Do you want to create, sync movies form json, update a movie, or delete movies or exit?: ")
        USER_INPUT = input("Enter create, sync, update, delete, or exit for each option above respectivly: ")
        if USER_INPUT == "create":
            ID = create_movie_main(AUTH_TOKEN)
        elif USER_INPUT == "sync":    
            sync(AUTH_TOKEN)
        elif USER_INPUT == "update":
            update_movie_main(AUTH_TOKEN)
        elif USER_INPUT == "delete":
            delete_movie_main(AUTH_TOKEN)
        elif USER_INPUT == "exit":
            break
        else:
            print("Invalid input")
    


