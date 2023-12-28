import sys, os
sys.path.append(os.path.realpath('...'))

from nomad_media_pip.nomad_sdk import Nomad_SDK
from config import config

nomad_sdk = Nomad_SDK(config)

import json

def get_content_group_main():
    try:
        CONTENT_GROUP_ID = input("Input a content group id: ")

        print("Getting content groups")
        INFO = nomad_sdk.get_content_group(CONTENT_GROUP_ID)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    

def get_content_groups_main():
    try:
        print("Getting content groups")
        INFO = nomad_sdk.get_content_groups()
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()

def create_content_groups_main():
    try:
        CONTENT_GROUP_NAME = input("Input a content group name (press enter to skip): ")

        print("Creating a new content group") 
        INFO = nomad_sdk.create_content_group(CONTENT_GROUP_NAME)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()

def add_contents_to_content_group_main():
    try:
        CONTENT_GROUP_ID = input("Input a content group id: ")
        CONTENTS = input("Enter content ids you wish to add to a content group (separate by comma): ").replace(" ","")

        print("Adding content to content group")
        INFO = nomad_sdk.add_contents_to_content_group(CONTENT_GROUP_ID, CONTENTS.split(","))
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception() 

def remove_contents_from_content_group_main():
    try:
        CONTENT_GROUP_ID = input("Input a content group id: ")
        CONTENTS = input("Enter content ids you wish to remove from a content group (separate by comma): ").replace(" ","")

        print("Removing content from content group")
        INFO = nomad_sdk.remove_contents_from_content_group(CONTENT_GROUP_ID, CONTENTS.split(","))
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()

def rename_content_group_main():
    try: 
        CONTENT_GROUP_ID = input("Input a content group id: ")
        CONTENT_GROUP_NEW_NAME = input("Input a new name for a content group: ")

        print("Renaming content group")
        INFO = nomad_sdk.rename_content_group(CONTENT_GROUP_ID, CONTENT_GROUP_NEW_NAME)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()

def share_content_with_user_main():
    try:
        CONTENT_GROUP_ID = input("Input a content group id: ")
        USER_ID_ARR = []
        while True:
            USER_ID = input("Enter the user id of the user you wish to share the content with: ")
            USER_ID_ARR.append(USER_ID)

            INPUT = input("Do you want to add another user to the list? (y/n): ")
            if INPUT == "n":
                break 

        print("Sharing content with user")
        INFO = nomad_sdk.share_content_group_with_user(CONTENT_GROUP_ID, USER_ID_ARR)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()

def stop_sharing_content_with_user_main():
    try:
        CONTENT_GROUP_ID = input("Input a content group id: ")
        USER_ID_ARR = []
        while True:
            USER_ID = input("Enter the user id of the user you wish to stop sharing the content with: ")
            USER_ID_ARR.append(USER_ID)

            INPUT = input("Do you want to add another user to the list? (y/n): ")
            if INPUT == "n":
                break 

        print("Sharing content with user")
        INFO = nomad_sdk.stop_sharing_content_group_with_user(CONTENT_GROUP_ID, USER_ID_ARR)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()


def get_portal_groups_main():
    try:
        RETURNED_GROUP_NAMES = input("Enter the group names you want returned (separated by comma): ").split(",")

        print("Getting portal groups")
        INFO = nomad_sdk.get_portal_groups(RETURNED_GROUP_NAMES)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()


def delete_content_group_main():
    try:
        CONTENT_GROUP_ID = input("Input a content group id: ")

        print("Deleting content group")
        INFO = nomad_sdk.delete_content_group(CONTENT_GROUP_ID)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    


if __name__ == "__main__":
    while True:
        print("Do you want to get a specific content group, get your content group, create an "\
              "content group, add content to a content group, remove content from a content group, "\
              "rename a content, , share content with a user, stop sharing content with a user, "\
              "get portal groups, delete content or exit")
        USER_INPUT = input("Enter get groups, get group, create, add, remove, rename, start "\
                           "sharing, stop sharing, get portal, delete, or exit for each option "\
                           "above respectively: ")

        if USER_INPUT == "get group":
            get_content_group_main()
        elif USER_INPUT == "get groups":
            get_content_groups_main()
        elif USER_INPUT == "create":
            create_content_groups_main()
        elif USER_INPUT == "add":
            add_contents_to_content_group_main()
        elif USER_INPUT == "remove":
            remove_contents_from_content_group_main()
        elif USER_INPUT == "rename":
            rename_content_group_main()
        elif USER_INPUT == "start sharing":
            share_content_with_user_main()
        elif USER_INPUT == "stop sharing":
            stop_sharing_content_with_user_main()
        elif USER_INPUT == "get portal":
            get_portal_groups_main()
        elif USER_INPUT == "delete":
            delete_content_group_main()
        elif USER_INPUT == "exit":
            break
        else:
            print("Input invalid")
        
