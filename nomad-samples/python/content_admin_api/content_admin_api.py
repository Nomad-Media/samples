from content.add_custom_properties import *
from content.add_related_content import *
from content.add_tag_or_collection import *
from content.delete_related_content import *
from content.delete_tag_or_collection import *
from content.create_content_definition import *
from content.update_content_definition import *

import json

def add_tag_or_collection_main(AUTH_TOKEN):
    try:
        TYPE = input("Enter tag or collection for what type of content you want to add: ")
        CONTENT_ID = input("Enter the content id of the tag/collection: ")
        CONTENT_DEFINITION = input("Enter content definition of the tag/collecion: ")
        NAME = input("Enter the name of the tag/collection: ")
        TAG_ID = input("Enter the tag id (optional): ")
        CREATE_NEW = input("Enter true/false for if you want to create a new tag/collection: ")
        CREATE_NEW_BOOL = True if CREATE_NEW == "true" else False

        print("Adding Tag/Collection")
        TAG_INFO = add_tag_or_collection(AUTH_TOKEN, TYPE, CONTENT_ID, CONTENT_DEFINITION, NAME, TAG_ID, CREATE_NEW_BOOL)
        print(json.dumps(TAG_INFO, indent=4))
    except:
        raise Exception()
    
def delete_tag_or_collection_main(AUTH_TOKEN):
    try:
        TYPE = input("Enter tag or collection for what type of content you want to delete: ")
        CONTENT_ID = input("Enter the content id of the tag/collection: ")
        TAG_ID = input("Enter the tag id (optional): ")
        CONTENT_DEFINITION = input("Enter content definition of the tag/collecion: ")

        print("Deleting Tag")
        DELETE_TAG_INFO = delete_tag_or_collection(AUTH_TOKEN, TYPE, CONTENT_ID, TAG_ID, CONTENT_DEFINITION)
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

def create_content_definition_main(AUTH_TOKEN):
    try:
        print("Getting content definition")
        CONTENT_DEFINITION_INFO = create_content_definition(AUTH_TOKEN)
        print(json.dumps(CONTENT_DEFINITION_INFO, indent = 4))
    except:
        raise Exception()

def update_content_definition_main(AUTH_TOKEN):
    try:
        print("Updating content defintion")
        UPDATED_CONTENT_DEFINTION_INFO = update_content_definition(AUTH_TOKEN)
        print(json.dumps(UPDATED_CONTENT_DEFINTION_INFO, indent=4))
    except:
        raise Exception()

if __name__ == "__main__":
    AUTH_TOKEN = input("Enter your authentication token: ")

    while True:
        print("Do you want to add a tag/collection, delete a tag/collection, "\
              "add related content, delete related content, add custom properties, "\
              "create a content defintion, update a content definition, or exit")
        USER_INPUT = input("Enter add tag/collection, delete tag/collection, add related, "\
                           "delete related, add custom, create def, update def, exit "\
                           "for each option above respetively: ")
        
        if USER_INPUT == "add tag/collection":
            add_tag_or_collection_main(AUTH_TOKEN)
        elif USER_INPUT == "delete tag/collection":
            delete_tag_or_collection_main(AUTH_TOKEN)
        elif USER_INPUT == "add related":
            add_related_content_main(AUTH_TOKEN)
        elif USER_INPUT == "delete related":
            delete_related_content_main(AUTH_TOKEN)
        elif USER_INPUT == "add custom":
            add_custom_properties_main(AUTH_TOKEN)
        elif USER_INPUT == "create def":
            create_content_definition_main(AUTH_TOKEN)
        elif USER_INPUT == "update def":
            update_content_definition_main(AUTH_TOKEN)
        elif USER_INPUT == "exit":
            break
        else:
            print("Input incorrect")
    