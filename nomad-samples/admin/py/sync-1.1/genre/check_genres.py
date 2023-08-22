from genre.create_genre import *
from genre.get_genres import *
from helpers.slugify import *

def check_genres(AUTH_TOKEN, GENRES):
    NOMAD_GENRES = get_genres(AUTH_TOKEN)["items"]
    
    GENRE_LIST = []
    for GENRE_ELEM in NOMAD_GENRES:
        GENRE_DICT = {
            "id": GENRE_ELEM["id"],
            "title": GENRE_ELEM["title"]
        }
        GENRE_LIST.append(GENRE_DICT)
    GENRE_MAP_LIST = []
    for GENRE in GENRES:
        for GENRE_ELEM in GENRE_LIST:
            if GENRE_ELEM["title"] == GENRE:
                GENRE_MAP_LIST.append(GENRE_ELEM)
                break
        else:
            ID = create_genre(AUTH_TOKEN, GENRE, slugify(GENRE))
            GENRE_MAP_LIST.append({ "id": ID, "title": GENRE })

    return GENRE_MAP_LIST

    