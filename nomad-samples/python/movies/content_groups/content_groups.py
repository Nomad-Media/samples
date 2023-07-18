from content_group.add_content_to_content_group import *
from content_group.create_content_group import *
from content_group.delete_content_group import*
from content_group.get_content_group import *
from content_group.get_content_groups import *
from content_group.remove_content_from_content_group import *
from content_group.rename_content_group import *
from content_group.share_content_group_with_user import *
from content_group.stop_sharing_content_group_with_user import *
from login.login import *

def login_main():
    while True:
        USERNAME = "xxxxxxxx"#input("Enter username: ")
        PASSWORD = "***REMOVED***"#input("Enter password: ")
        AUTH_TOKEN = login(USERNAME, PASSWORD)["token"]
        if not AUTH_TOKEN:
            print("Invalid credentials")
        else:
            return AUTH_TOKEN

def get_content_group_main(AUTH_TOKEN):
    try:
        CONTENT_GROUP_ID = input("Input an content group id: ")

        print("Getting content groups")
        INFO = get_content_group(AUTH_TOKEN, CONTENT_GROUP_ID)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    

def get_content_groups_main(AUTH_TOKEN):
    try:
        print("Getting content groups")
        INFO = get_content_groups(AUTH_TOKEN)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()

def create_content_groups_main(AUTH_TOKEN):
    try:
        CONTENT_GROUP_NAME = input("Input an content group name (press enter to skip): ")

        print("Creating a new content group") 
        INFO = create_content_group(AUTH_TOKEN, CONTENT_GROUP_NAME)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()

def add_content_to_content_group_main(AUTH_TOKEN):
    try:
        CONTENT_GROUP_ID = input("Input an content group id: ")
        CONTENTS = input("Enter content ids you wish to add to an content group (separate by comma): ").replace(" ","")

        print("Adding content to content group")
        INFO = add_content_to_content_group(AUTH_TOKEN, CONTENT_GROUP_ID, CONTENTS.split(","))
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception() 

def remove_content_from_content_group_main(AUTH_TOKEN):
    try:
        CONTENT_GROUP_ID = input("Input an content group id: ")
        CONTENTS = input("Enter content ids you wish to remove from an content group (separate by comma): ").replace(" ","")

        print("Removing content from content group")
        INFO = remove_content_to_content_group(AUTH_TOKEN, CONTENT_GROUP_ID, CONTENTS.split(","))
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()

def rename_content_group_main(AUTH_TOKEN):
    try: 
        CONTENT_GROUP_ID = input("Input an content group id: ")
        CONTENT_GROUP_NEW_NAME = input("Input a new name for an content group: ")

        print("Renaming content group")
        INFO = rename_content_group(AUTH_TOKEN, CONTENT_GROUP_ID, CONTENT_GROUP_NEW_NAME)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()

def share_content_with_user_main(AUTH_TOKEN):
    try:
        CONTENT_GROUP_ID = input("Input an content group id: ")
        USER_ID_ARR = []
        while True:
            USER_ID = input("Enter the user id of the user you wish to share the content with: ")
            USER_ID_ARR.append(USER_ID)

            INPUT = input("Do you want to add another user to the list? (y/n): ")
            if INPUT == "n":
                break 

        print("Sharing content with user")
        INFO = share_content_group_with_user(AUTH_TOKEN, CONTENT_GROUP_ID, USER_ID_ARR)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()

def stop_sharing_content_with_user_main(AUTH_TOKEN):
    try:
        CONTENT_GROUP_ID = input("Input an content group id: ")
        USER_ID_ARR = []
        while True:
            USER_ID = input("Enter the user id of the user you wish to stop sharing the content with: ")
            USER_ID_ARR.append(USER_ID)

            INPUT = input("Do you want to add another user to the list? (y/n): ")
            if INPUT == "n":
                break 

        print("Sharing content with user")
        INFO = stop_sharing_content_group_with_user(AUTH_TOKEN, CONTENT_GROUP_ID, USER_ID_ARR)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    
def delete_content_group_main(AUTH_TOKEN):
    try:
        CONTENT_GROUP_ID = input("Input an content group id: ")

        print("Deleting content group")
        INFO = delete_content_group(AUTH_TOKEN, CONTENT_GROUP_ID)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()

if __name__ == "__main__":
    AUTH_TOKEN = login_main()
    
    while True:
        print("Do you want to get a specific content group, get your content group, create an "\
              "content group, add content to a content group, remove content from a content group, "\
              "rename a content, , share content with a user, stop sharing content with a user, "\
              "delete content or exit")
        USER_INPUT = input("Enter get groups, get group, create, add, remove, rename, start "\
                           "sharing, stop sharing, get portal, delete, or exit for each option "\
                           "above respectively: ")

        if USER_INPUT == "get group":
            get_content_group_main(AUTH_TOKEN)
        elif USER_INPUT == "get groups":
            get_content_groups_main(AUTH_TOKEN)
        elif USER_INPUT == "create":
            create_content_groups_main(AUTH_TOKEN)
        elif USER_INPUT == "add":
            add_content_to_content_group_main(AUTH_TOKEN)
        elif USER_INPUT == "remove":
            remove_content_from_content_group_main(AUTH_TOKEN)
        elif USER_INPUT == "rename":
            rename_content_group_main(AUTH_TOKEN)
        elif USER_INPUT == "start sharing":
            share_content_with_user_main(AUTH_TOKEN)
        elif USER_INPUT == "stop sharing":
            stop_sharing_content_with_user_main(AUTH_TOKEN)
        elif USER_INPUT == "delete":
            delete_content_group_main(AUTH_TOKEN)
        elif USER_INPUT == "exit":
            break
        else:
            print("Input invalid")