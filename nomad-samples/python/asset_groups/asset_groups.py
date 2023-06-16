from asset_group.add_asset_to_asset_group import *
from asset_group.create_asset_group import *
from asset_group.delete_asset_group import *
from asset_group.get_asset_groups import *
from asset_group.remove_asset_from_asset_group import *
from asset_group.rename_asset_group import *

def get_asset_groups_main(AUTH_TOKEN):
    try:
        print("Getting asset groups")
        print(json.dumps(get_asset_groups(AUTH_TOKEN), indent=4))
    except:
        raise Exception()

def create_asset_groups_main(AUTH_TOKEN):
    try:
        ASSET_GROUP_ID = input("Input an asset group id (press enter to skip): ")
        ASSET_GROUP_NAME = input("Input an asset group name (press enter to skip): ")
        ASSETS = input("Enter asset ids you wish to add to an asset group (separate by comma) (press enter to skip): ")

        BODY = {}

        if ASSET_GROUP_ID != "":
            BODY["id"] = ASSET_GROUP_ID
        if ASSET_GROUP_NAME != "":
            BODY["name"] = ASSET_GROUP_NAME
        if ASSETS != "":
            BODY["assets"] = ASSETS.split(",") 

        print("Creating a new asset group") 
        INFO = create_asset_group(AUTH_TOKEN, BODY)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()

def add_asset_to_asset_group_main(AUTH_TOKEN):
    try:
        ASSET_GROUP_ID = input("Input an asset group id: ")
        ASSETS = input("Enter asset ids you wish to add to an asset group (separate by comma): ")

        print("Adding asset to asset group")
        INFO = add_asset_to_asset_group(AUTH_TOKEN, ASSET_GROUP_ID, ASSETS.split(","))
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception() 

def remove_asset_from_asset_group_main(AUTH_TOKEN):
    try:
        ASSET_GROUP_ID = input("Input an asset group id: ")
        ASSETS = input("Enter asset ids you wish to remove from an asset group (separate by comma): ")

        print("Removing asset from asset group")
        INFO = remove_asset_to_asset_group(AUTH_TOKEN, ASSET_GROUP_ID, ASSETS.split(","))
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()

def rename_asset_group_main(AUTH_TOKEN):
    try: 
        ASSET_GROUP_ID = input("Input an asset group id: ")
        ASSET_GROUP_NEW_NAME = input("Input a new name for an asset group: ")

        print("Renaming asset group")
        INFO = rename_asset_group(AUTH_TOKEN, ASSET_GROUP_ID, ASSET_GROUP_NEW_NAME)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()

def delete_asset_group_main(AUTH_TOKEN):
    try:
        ASSET_GROUP_ID = input("Input an asset group id: ")

        print("Deleting asset group")
        INFO = delete_asset_group(AUTH_TOKEN, ASSET_GROUP_ID)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    


if __name__ == "__main__":
    AUTH_TOKEN = input("Enter your authentication token: ")
    
    while True:
        print("Do you want to get your asset groups, create an asset group, add an asset to an "\
              "asset group, remove an asset from an asset group, rename an asset, delete an asset, "\
              "or exit")
        USER_INPUT = input("Enter get, create, add, remove, rename, delete, or exit for each option above respectively: ")

        if USER_INPUT == "get":
            get_asset_groups_main(AUTH_TOKEN)
        elif USER_INPUT == "create":
            create_asset_groups_main(AUTH_TOKEN)
        elif USER_INPUT == "add":
            add_asset_to_asset_group_main(AUTH_TOKEN)
        elif USER_INPUT == "remove":
            remove_asset_from_asset_group_main(AUTH_TOKEN)
        elif USER_INPUT == "rename":
            rename_asset_group_main(AUTH_TOKEN)
        elif USER_INPUT == "delete":
            delete_asset_group_main(AUTH_TOKEN)
        elif USER_INPUT == "exit":
            break
        else:
            print("Input invalid")
        
