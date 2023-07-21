from media.forms import *
from media.media_search import *

import json

def media_search_main(AUTH_TOKEN):
    try:
        SEARCH_QUERY = input("Enter search query: ")
        IDS = input("Enter Ids (separated by comma): ").split(",")
        SORT_FIELDS_NAME = input("Enter field name you want to sort by: ")
        SORT_FIELDS_ORDER = input("Enter the order you want to sort the field by (ascending/descending): ")

        print("Media search")
        MEDIA = media_search(AUTH_TOKEN, SEARCH_QUERY, IDS, SORT_FIELDS_NAME, SORT_FIELDS_ORDER)
        print(json.dumps(MEDIA, indent=4))
    except:
        raise Exception()

def forms_main(AUTH_TOKEN):
    ID = input("Enter id: ")
    FIRST_NAME = input("Enter first name: ")
    LAST_NAME = input("Enter last name: ")
    ACTIVE = True if input("Enter active (true/false): ") == "true" else False
    START_DATE = input("Enter start date (YYYY-MM-DDTHH:MM:SS): ") + "Z"
    LOOKUP_ID = input("Enter lookup id: ")
    DESCRIPTION = input("Enter description: ")

    try:
        print("Forms")
        FORMS = forms(AUTH_TOKEN, ID, FIRST_NAME, LAST_NAME, ACTIVE, START_DATE, LOOKUP_ID, DESCRIPTION)
        print(json.dumps(FORMS, indent=4))
    except:
        raise Exception()

if __name__ == "__main__":
    AUTH_TOKEN = print("Enter your authentication token :")

    while True:
        print("Do you want to search media, create a form, or exit")
        USER_INPUT = input("Enter media, form, or exit for each option above respectively: ")

        if USER_INPUT == "media":
            media_search_main(AUTH_TOKEN)
        elif USER_INPUT == "form":
            forms_main(AUTH_TOKEN)
        elif USER_INPUT == "exit":
            break
        else:
            print("Invalid input")