from genre.check_genres import *

from movies.create_movie import *
from movies.delete_movie import *
from movies.get_movie import *
from movies.update_movie import *


import json, os

def sync(AUTH_TOKEN):

    print("Syncronizing...")

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


if __name__ == "__main__":
    AUTH_TOKEN = input("Enter your auth token: ")

    while True:
        USER_INPUT = input("Do you want to sync movies form json, or delte movies (s/d) or exit?: ")
        if USER_INPUT == "s":    
            sync(AUTH_TOKEN)
        elif USER_INPUT == "d":
            delete_movie(AUTH_TOKEN, input("Enter the movie id to delete: "))
        elif USER_INPUT == "exit":
            break
        else:
            print("Invalid input")
    


