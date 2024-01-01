import sys, os
sys.path.append(os.path.realpath('...'))

from nomad_media_pip.nomad_sdk import Nomad_SDK
from config import config

nomad_sdk = Nomad_SDK(config)

import json

def get_input(prompt, required):
    return input(f"Enter {prompt}: ") if required or input(f"Do you want to add {prompt} (y/n): ") == "y" else ""

def get_bool(prompt):
    return True if input(f"{prompt} (y/n): ") == "y" else False

def create_form():
    try:
        CONTENT_DEFINITION_ID = get_input("Enter content definition id", True)
        FIRST_NAME = get_input("Enter first name", True)
        LAST_NAME = get_input("Enter last name", True)
        ACTIVE = get_bool("Enter active", True)
        START_DATE = get_input("Enter start date (YYYY-MM-DDTHH:MM:SS)", True) + "Z"
        DESCRIPTION = get_input("Enter description", True)

        FORMS = nomad_sdk.create_form(CONTENT_DEFINITION_ID, 
                                        {
                                          "firstName": FIRST_NAME, 
                                          "lastName": LAST_NAME, 
                                          "active": ACTIVE, 
                                          "startDate": START_DATE, 
                                          "description": DESCRIPTION
                                        })
        print(json.dumps(FORMS, indent=4))
    except:
        raise Exception()
    
def get_content_cookies():
    try:
        CONTENT_ID = get_input("Enter content id", True)

        COOKIES = nomad_sdk.get_content_cookies(CONTENT_ID)

        print(json.dumps(COOKIES, indent=4))
    except:
        raise Exception()
    
def get_default_site_config():
    try:
        DEFAULT_SITE_CONFIG = nomad_sdk.get_default_site_config()

        print(json.dumps(DEFAULT_SITE_CONFIG, indent=4))
    except:
        raise Exception()
    
def get_dynamic_content():
    try:
        DYNAMIC_CONTENT_RECORD_ID = get_input("Enter dynamic content record id", True)

        DYNAMIC_CONTENT = nomad_sdk.get_dynamic_content(DYNAMIC_CONTENT_RECORD_ID)

        print(json.dumps(DYNAMIC_CONTENT, indent=4))
    except:
        raise Exception()
    
def get_dynamic_contents():
    try:
        DYNAMIC_CONTENTS = nomad_sdk.get_dynamic_contents()

        print(json.dumps(DYNAMIC_CONTENTS, indent=4))
    except:
        raise Exception()
    
def get_media_group():
    try:
        MEDIA_GROUP_ID = get_input("Enter media group id", True)

        MEDIA_GROUP = nomad_sdk.get_media_group(MEDIA_GROUP_ID)

        print(json.dumps(MEDIA_GROUP, indent=4))
    except:
        raise Exception()
    
def get_media_item():
    try:
        MEDIA_ITEM_ID = get_input("Enter media item id", True)

        MEDIA_ITEM = nomad_sdk.get_media_item(MEDIA_ITEM_ID)

        print(json.dumps(MEDIA_ITEM, indent=4))
    except:
        raise Exception()
    
def get_my_content():
    try:
        MY_CONTENT = nomad_sdk.get_my_content()

        print(json.dumps(MY_CONTENT, indent=4))
    except:
        raise Exception()
    
def get_my_group():
    try:
        MY_GROUP = nomad_sdk.get_my_group()

        print(json.dumps(MY_GROUP, indent=4))
    except:
        raise Exception()
    
def get_site_config():
    try:
        SITE_CONFIG = nomad_sdk.get_site_config()

        print(json.dumps(SITE_CONFIG, indent=4))
    except:
        raise Exception()
    
def media_search():
    try:
        SEARCH_QUERY = get_input("Enter search query", False)
        IDS = get_input("Enter Ids (separated by comma)", False).split(",")
        SORT_FIELDS_NAME = get_input("Enter field name you want to sort by", False)
        SORT_FIELDS_ORDER = get_input("Enter the order you want to sort the field by (ascending/descending)", False)
        OFFSET = get_input("Enter offset", False)
        SIZE = get_input("Enter size", False)

        MEDIA = nomad_sdk.media_search(SEARCH_QUERY, IDS, SORT_FIELDS_NAME, SORT_FIELDS_ORDER,
                                       OFFSET, SIZE)
        
        print(json.dumps(MEDIA, indent=4))
    except:
        raise Exception()

functions = {
    "1": create_form,
    "2": get_content_cookies,
    "3": get_default_site_config,
    "4": get_dynamic_content,
    "5": get_dynamic_contents,
    "6": get_media_group,
    "7": get_media_item,
    "8": get_my_content,
    "9": get_my_group,
    "10": get_site_config,
    "11": media_search
}

if __name__ == "___":
    print("Which function do you want to run?")
    for key, value in functions.items():
        print(f"{key}: {value.__name__}")

    while True:
        USER_INPUT = input("Enter the number of the function you want to run: ")

        if USER_INPUT in functions:
            functions[USER_INPUT]()
            break
        else:
            print("Invalid input")