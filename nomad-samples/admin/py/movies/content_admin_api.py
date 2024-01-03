import sys, os
sys.path.append(os.path.realpath('...'))

from nomad_media_pip.nomad_sdk import Nomad_SDK
from config import config

nomad_sdk = Nomad_SDK(config)

import json

def add_tag_or_collection_main():
    try:
        TYPE = "tag" if input("Enter tag or collection for what type of content you want to add: ") == "tag" else "collection"
        CONTENT_ID = input(f"Enter the id of the content to add the {TYPE} to: ")
        CONTENT_DEFINITION = input(f"Enter content definition of the {TYPE}: ")
        NAME = input(f"Enter the name of the {TYPE}: ")
        CREATE_NEW = True if input(f"Do you want to create a {TYPE} (y/n): ") == "y" else False
        TAG_ID = input(f"Enter the {TYPE} id: ") if not CREATE_NEW else None

        print(f"Adding {TYPE}")
        TAG_INFO = nomad_sdk.add_tag_or_collection(TYPE, CONTENT_ID, CONTENT_DEFINITION, NAME, TAG_ID, CREATE_NEW)
        print(json.dumps(TAG_INFO, indent=4))
    except:
        raise Exception()
    

def remove_tag_or_collection_main():
    try:
        TYPE = "tag" if input("Enter tag or collection for what type of content you want to remove: ") == "tag" else "collection"
        TAG_ID = input(f"Enter the {TYPE} id: ")
        CONTENT_ID = input(f"Enter the id of the content to remove the {TYPE} from: ")
        CONTENT_DEFINITION = input(f"Enter content definition of the {TYPE}: ")

        print(f"Removing {TYPE}")
        REMOVE_TAG_INFO = nomad_sdk.remove_tag_or_collection(TYPE, CONTENT_ID, CONTENT_DEFINITION, TAG_ID)
        print(json.dumps(REMOVE_TAG_INFO, indent=4))
    except:
        raise Exception()


def delete_tag_or_collection_main():
    try:
        TYPE = "tag" if input("Enter tag or collection for what type of content you want to delete: ") == "tag" else "collection"
        TAG_ID = input(f"Enter the {TYPE} id: ")

        print(f"Deleting {TYPE}")
        DELETE_TAG_INFO = nomad_sdk.delete_tag_or_collection(TYPE, TAG_ID)
        print(json.dumps(DELETE_TAG_INFO, indent=4))
    except:
        raise Exception()

def add_related_content_main():
    try:
        CONTENT_ID = input("Enter the content id: ")
        RELATED_CONTENT_ID = input("Enter the content id of the related content: ")
        CONTENT_DEFINITION = input("Enter content definition: ")

        print("Creating related content")
        RELATED_CONTENT_INFO = nomad_sdk.add_related_content(CONTENT_ID, RELATED_CONTENT_ID, CONTENT_DEFINITION)
        print(json.dumps(RELATED_CONTENT_INFO, indent=4))
    except:
        raise Exception()
    
def delete_related_content_main():
    try:
        CONTENT_ID = input("Enter the content id: ")
        RELATED_CONTENT_ID = input("Enter the content id of the related content: ")
        CONTENT_DEFINITION = input("Enter content definition: ")

        print("Deleting related content")
        INFO = nomad_sdk.delete_related_content(CONTENT_ID, RELATED_CONTENT_ID, CONTENT_DEFINITION)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()

def add_custom_properties_main():
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
            
        INFO = nomad_sdk.add_custom_properties(ASSET_ID, DISPLAY_NAME, CUSTOM_PROPERTIES)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    
def bulk_update_metadata_main():
    try:
        CONTENT_IDS = input("Enter the content ids of the content you want to update (separate by comma): ").replace(" ","").split(",")
        COLLECTION_IDS = input("Enter the collection ids of the content you want to update (separate by comma): ").replace(" ","").split(",") if input("Do you want to add collection ids (y/n): ") == "y" else []
        RELATED_CONTENT_IDS = input("Enter the related content ids of the content you want to update (separate by comma): ").replace(" ","").split(",") if input("Do you want to add related content ids (y/n): ") == "y" else []
        TAG_IDS = input("Enter the tag ids of the content you want to update (separate by comma): ").replace(" ","").split(",") if input("Do you want to add tag ids (y/n): ") == "y" else []
        SCHEMA_NAME = input("Enter the schema name of the content you want to update: ") if input("Do you want to add schema name (y/n): ") == "y" else None
            
        nomad_sdk.bulk_update_metadata(CONTENT_IDS, COLLECTION_IDS, RELATED_CONTENT_IDS,
                                       TAG_IDS, SCHEMA_NAME)
    except:
        raise Exception()
    
def create_tag_or_collection_main():
    try:
        TYPE = "tag" if input("Enter tag or collection for what type of content you want to create: ") == "tag" else "collection"

        NAME = input(f"Enter the name of the {TYPE}: ")

        print(f"Creating {TYPE}")
        TAG_INFO = nomad_sdk.create_tag_or_collection(TYPE, NAME)
        print(json.dumps(TAG_INFO, indent=4))
    except:
        raise Exception()
    
def get_tag_or_collection_main():
    try:
        TYPE = "tag" if input("Enter tag or collection for what type of content you want to get: ") == "tag" else "collection"
        TAG_ID = input(f"Enter the {TYPE} id: ")

        print(f"Getting {TYPE}")
        TAG_INFO = nomad_sdk.get_tag_or_collection(TYPE, TAG_ID)
        print(json.dumps(TAG_INFO, indent=4))
    except:
        raise Exception()

if __name__ == "__main__":
    while True:
        print("Do you want to add a tag/collection, delete a tag/collection, remove a tag/collection, "\
              "add related content, delete related content, add custom properties, "\
              "bulk update metadata, create tag/collecton, get tag/collection, or exit")
        USER_INPUT = input("Enter add tag/collection, remove tag/collection, delete tag/collection, "\
                           "add related, delete related, add custom, bulk, create tag/collection, "\
                           "get tag/collection, or exit for each option above respetively: ")
        
        if USER_INPUT == "add tag/collection":
            add_tag_or_collection_main()
        elif USER_INPUT == "remove tag/collection":
            remove_tag_or_collection_main()
        elif USER_INPUT == "delete tag/collection":
            delete_tag_or_collection_main()
        elif USER_INPUT == "add related":
            add_related_content_main()
        elif USER_INPUT == "delete related":
            delete_related_content_main()
        elif USER_INPUT == "bulk":
            bulk_update_metadata_main()
        elif USER_INPUT == "create tag/collection":
            create_tag_or_collection_main()
        elif USER_INPUT == "get tag/collection":
            get_tag_or_collection_main()
        elif USER_INPUT == "exit":
            break
        else:
            print("Input incorrect")
    