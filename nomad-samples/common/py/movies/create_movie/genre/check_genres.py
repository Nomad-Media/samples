from genre.create_genre import *
from genre.get_genres import *
from helpers.slugify import *

def check_genres(AUTH_TOKEN, GENRE):
    GENRES = get_genres(AUTH_TOKEN)["items"]
    
    GENRE_LIST = []
    for GENRE_ELEM in GENRES:
        GENRE_DICT = {
            "id": GENRE_ELEM["id"],
            "title": GENRE_ELEM["title"]
        }
        GENRE_LIST.append(GENRE_DICT)

    for GENRE_ELEM in GENRE_LIST:
        if GENRE_ELEM["title"] == GENRE:
            return GENRE_ELEM
        
    ID = create_genre(AUTH_TOKEN, GENRE, slugify(GENRE))

    return { "id": ID, "title": GENRE }

    