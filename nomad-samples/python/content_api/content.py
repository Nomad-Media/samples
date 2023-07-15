from content.get_content import *
from content.get_contents import *
from content.create_content import *
from content.update_content import *
from content.delete_content import *

import sys

def get_contents_main(AUTH_TOKEN):
    try:
        CONTENT_DEFINITION_ID = input("Enter contentent definition id: ")
        SORT_COLUMN = input("Enter sort column (optional): ")
        SORT_ORDER = input("Enter the order you want to sort the field by (ascending/descending) (optional): ")
        PAGE_INDEX = input("Enter the page index (optional): ")
        PAGE_SIZE = input("Enter the page size (optional): ")
        LANGUAGE_ID = input("Enter the language id (optional): ")

        print("Getting contents")
        INFO = get_contents(AUTH_TOKEN, CONTENT_DEFINITION_ID, SORT_COLUMN, SORT_ORDER, PAGE_INDEX, PAGE_SIZE, LANGUAGE_ID)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()

def get_content_main(AUTH_TOKEN):
    try:
        ID = input("Enter id of the content you want to get: ")
        CONTENT_DEFINITION_ID = input("Enter contentent definition id: ")

        print("Getting content")
        INFO = get_content(AUTH_TOKEN, ID, CONTENT_DEFINITION_ID)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    
def update_content_main(AUTH_TOKEN, ID):
    try:
        CONTENT_DEFINITION_ID = input("Enter contentent definition id: ")

        print("Enter/Paste the property json")
        print("Enter Ctrl + D (Unix) or Ctrl + Z (Windows) to exit")

        PROPERTIES = sys.stdin.read()

        print("Updating content")
        update_content(AUTH_TOKEN, ID, CONTENT_DEFINITION_ID, PROPERTIES)

    except:
        raise Exception()

def delete_content_main(AUTH_TOKEN):
    ID = input("Enter id of the content you want to get: ")
    CONTENT_DEFINITION_ID = input("Enter contentent definition id: ")

    print("Deleting content")
    delete_content(AUTH_TOKEN, ID, CONTENT_DEFINITION_ID)
    print("Content Deleted")

if __name__ == "__main__":
    AUTH_TOKEN = input("Enter authentication token: ")

    while True:
        print("Do you want to get contents, get content by id, create a content, "\
              "update a content, delete a content, or exit")
        USER_INPUT = input("Enter get groups, get group, create, update, delete, "\
                           "or exit for each option above respectivly: ")
        
        if USER_INPUT == "get groups":
            get_contents_main(AUTH_TOKEN)
        
        elif USER_INPUT == "get group":
            get_content_main(AUTH_TOKEN)

        elif USER_INPUT == "create":
            ID = create_content(AUTH_TOKEN)
            update_content_main(AUTH_TOKEN, ID)

        elif USER_INPUT == "update":
            ID = input("Enter the id of the movie you want to update: ")
            update_content_main(AUTH_TOKEN, ID)

        elif USER_INPUT == "delete":
            delete_content_main(AUTH_TOKEN)

        elif USER_INPUT == "exit":
            break

        else:
            print("Invalid input")