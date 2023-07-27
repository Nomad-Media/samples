from content.add_custom_properties import *
from content.add_related_content import *
from content.add_tag_or_collection import *
from content.delete_related_content import *
from content.delete_tag_or_collection import *
from content.remove_tag_or_collection import *

import json

def add_tag_or_collection_main(AUTH_TOKEN):
    try:
        TYPE = "tag" if input("Enter tag or collection for what type of content you want to add: ") == "tag" else "collection"
        CONTENT_ID = input(f"Enter the content id of the {TYPE}: ")
        CONTENT_DEFINITION = input(f"Enter content definition of the {TYPE}: ")
        NAME = input(f"Enter the name of the {TYPE}: ")
        CREATE_NEW = True if input(f"Do you want to create a {TYPE} (y/n): ") == "y" else False
        TAG_ID = input(f"Enter the {TYPE} id: ") if not CREATE_NEW else ""
        CREATE_NEW_BOOL = True if CREATE_NEW == "true" else False

        print(f"Adding {TYPE}")
        TAG_INFO = add_tag_or_collection(AUTH_TOKEN, TYPE, CONTENT_ID, CONTENT_DEFINITION, NAME, TAG_ID, CREATE_NEW_BOOL)
        print(json.dumps(TAG_INFO, indent=4))
    except:
        raise Exception()
    

def remove_tag_or_collection_main(AUTH_TOKEN):
    try:
        TYPE = "tag" if input("Enter tag or collection for what type of content you want to remove: ") == "tag" else "collection"
        TAG_ID = input(f"Enter the {TYPE} id: ")
        CONTENT_ID = input(f"Enter the content id of the {TYPE}: ")
        CONTENT_DEFINITION = input(f"Enter content definition of the {TYPE}: ")

        print(f"Removing {TYPE}")
        REMOVE_TAG_INFO = remove_tag_or_collection(AUTH_TOKEN, TYPE, CONTENT_ID, TAG_ID, CONTENT_DEFINITION)
        print(json.dumps(REMOVE_TAG_INFO, indent=4))
    except:
        raise Exception()


def delete_tag_or_collection_main(AUTH_TOKEN):
    try:
        TYPE = "tag" if input("Enter tag or collection for what type of content you want to delete: ") == "tag" else "collection"
        TAG_ID = input(f"Enter the {TYPE} id: ")

        print(f"Deleting {TYPE}")
        DELETE_TAG_INFO = delete_tag_or_collection(AUTH_TOKEN, TYPE, TAG_ID)
        print(json.dumps(DELETE_TAG_INFO, indent=4))
    except:
        raise Exception()

def add_related_content_main(AUTH_TOKEN):
    try:
        CONTENT_ID = input("Enter the content id: ")
        RELATED_CONTENT_ID = input("Enter the content id of the related content: ")
        CONTENT_DEFINITION = input("Enter content definition: ")

        print("Creating related content")
        RELATED_CONTENT_INFO = add_related_content(AUTH_TOKEN, CONTENT_ID, RELATED_CONTENT_ID, CONTENT_DEFINITION)
        print(json.dumps(RELATED_CONTENT_INFO, indent=4))
    except:
        raise Exception()
    
def delete_related_content_main(AUTH_TOKEN):
    try:
        CONTENT_ID = input("Enter the content id: ")
        RELATED_CONTENT_ID = input("Enter the content id of the related content: ")
        CONTENT_DEFINITION = input("Enter content definition: ")

        print("Deleting related content")
        INFO = delete_related_content(AUTH_TOKEN, CONTENT_ID, RELATED_CONTENT_ID, CONTENT_DEFINITION)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()

def add_custom_properties_main(AUTH_TOKEN):
    try:
        ASSET_ID = input("Enter the asset id of the asset you want to add the custom property to: ")
        DISPLAY_NAME = input("Enter the name of the asset you want to add the custom property to: ")
        CUSTOM_PROPERTIES = {}
        while True:
            propertyName = input("Enter the name for the property: ")
            propertyValue = input("Enter the value for the property: ")
            CUSTOM_PROPERTIES[propertyName] = propertyValue

            USER_INPUT = input("Do you want to add another property (y/n): ")
            if USER_INPUT == "n":
                break
            
        INFO = add_custom_properties(AUTH_TOKEN, ASSET_ID, DISPLAY_NAME, CUSTOM_PROPERTIES)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()


if __name__ == "__main__":
    AUTH_TOKEN = input("Enter your authentication token: ")

    while True:
        print("Do you want to add a tag/collection, delete a tag/collection, remove a tag/collection, "\
              "add related content, delete related content, add custom properties, "\
              "create a content defintion, update a content definition, or exit")
        USER_INPUT = input("Enter add tag/collection, remove tag/collection, delete tag/collection, "\
                           "add related, delete related, add custom, create def, update def, or exit "\
                           "for each option above respetively: ")
        
        if USER_INPUT == "add tag/collection":
            add_tag_or_collection_main(AUTH_TOKEN)
        elif USER_INPUT == "remove tag/collection":
            remove_tag_or_collection_main(AUTH_TOKEN)
        elif USER_INPUT == "delete tag/collection":
            delete_tag_or_collection_main(AUTH_TOKEN)
        elif USER_INPUT == "add related":
            add_related_content_main(AUTH_TOKEN)
        elif USER_INPUT == "delete related":
            delete_related_content_main(AUTH_TOKEN)
        elif USER_INPUT == "add custom":
            break
        else:
            print("Input incorrect")
    