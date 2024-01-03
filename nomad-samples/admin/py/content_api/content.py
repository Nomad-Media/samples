import sys, os
sys.path.append(os.path.realpath('...'))

from nomad_media_pip.nomad_sdk import Nomad_SDK
from config import config

nomad_sdk = Nomad_SDK(config)

import json

def get_content_main():
    try:
        ID = input("Enter id: ")
        CONTENT_DEFINITION_ID = input("Enter contentent definition id: ")
        IS_REVISION = input("Enter if you want the content to be a revision (y/n): ") == "y"

        print("Getting content")
        INFO = nomad_sdk.get_content(ID, CONTENT_DEFINITION_ID, IS_REVISION)
        print(json.dumps(INFO, indent=4))

    except:
        raise Exception()
    
def create_content_main():
    try:
        CONTENT_DEFINITION_ID = input("Enter contentent definition id: ")
        LANGUAGE_ID = input("Enter language id: ") if input("Do you want to add a language id (y/n): ") == "y" else None
        
        print("Creating content")
        ID = nomad_sdk.create_content(CONTENT_DEFINITION_ID, LANGUAGE_ID)
        print(json.dumps(ID, indent=4))

    except:
        raise Exception()

def update_content_main():
    try:
        CONTENT_DEFINITION_ID = input("Enter contentent definition id: ")
        ID = input("Enter the id: ")
        PROPERTIES = json.loads(input("Enter the property json: \n"))
        LANGUAGE_ID = input("Enter language id: ") if input("Do you want to add a language id (y/n): ") == "y" else None

        print("Updating content")
        nomad_sdk.update_content(ID, CONTENT_DEFINITION_ID, PROPERTIES, LANGUAGE_ID)

    except:
        raise Exception()

def delete_content_main():
    try:
        ID = input("Enter id: ")
        CONTENT_DEFINITION_ID = input("Enter contentent definition id: ")

        print("Deleting content")
        nomad_sdk.delete_content(ID, CONTENT_DEFINITION_ID)
        print("Content Deleted")
    except:
        raise Exception()
    
def deactivate_content_user_tracking_main():
    try:
        SESSION_ID = input("Enter session id: ")
        CONTENT_ID = input("Enter content id: ")
        CONTENT_DEFINITION_ID = input("Enter contentent definition id: ")
        DEACTIVATE = input("Enter if you want to deactivate content user tracking (y/n): ") == "y"

        print("Deactivating content user tracking")
        nomad_sdk.deactivate_content_user_track(SESSION_ID, CONTENT_ID, 
                                                CONTENT_DEFINITION_ID, DEACTIVATE)
        print("Content user tracking deactivated")
    except:
        raise Exception()
    
def get_content_user_tracking_main():
    try:
        CONTENT_ID = input("Enter content id: ")
        CONTENT_DEFINITION_ID = input("Enter contentent definition id: ")
        SORT_COLUMN = input("Enter sort column: ")
        IS_DESC = input("Enter if you want the sort to be descending (y/n): ") == "y"
        PAGE_INDEX = input("Enter page index: ") if input("Do you want to add a page index (y/n): ") == "y" else None
        PAGE_SIZE = input("Enter page size: ") if input("Do you want to add a page size (y/n): ") == "y" else None

        print("Getting content user tracking")
        INFO = nomad_sdk.get_content_user_track(CONTENT_ID, CONTENT_DEFINITION_ID, SORT_COLUMN,
                                                IS_DESC, PAGE_INDEX, PAGE_SIZE)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    
def get_content_user_tracking_touch_main():
    try:
        CONTENT_ID = input("Enter content id: ")
        CONTENT_DEFINITION_ID = input("Enter contentent definition id: ")

        print("Getting content user tracking touches")
        INFO = nomad_sdk.get_content_user_track_touch(CONTENT_ID, CONTENT_DEFINITION_ID)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
if __name__ == "__main__":
    while True:
        print("Do you want to get content by id, create a content, update a content, "\
              "delete a content, deactivate content user tracking, get user tracking, "\
              "get user tracking touch, or exit")
        USER_INPUT = input("get, create, update, delete, get, deactivate, tracking, "\
                           "tracking touch, or exit for each option above respectivly: ")

        if USER_INPUT == "create":
            create_content_main()

        elif USER_INPUT == "update":
            update_content_main()

        elif USER_INPUT == "delete":
            delete_content_main()

        elif USER_INPUT == "get":
            get_content_main()

        elif USER_INPUT == "deactivate":
            deactivate_content_user_tracking_main()

        elif USER_INPUT == "tracking":
            get_content_user_tracking_main()

        elif USER_INPUT == "tracking touch":
            get_content_user_tracking_touch_main()

        elif USER_INPUT == "exit":
            break

        else:
            print("Invalid input")