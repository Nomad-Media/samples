import sys, os
sys.path.append(os.path.realpath('...'))

from nomad_media_pip.nomad_sdk import Nomad_SDK
from config import config

from helpers.get_search_result import get_search_result

nomad_sdk = Nomad_SDK(config)

import json

def get_input(prompt, required):
    return input(f"Enter {prompt}: ") if required or input(f"Do you want to add {prompt} (y/n): ") == "y" else ""

def get_dict(prompt, keys, required):
    return {key: input(f"Enter {prompt} {key}: ") for key in keys} if required or input(f"Do you want to add {prompt} (y/n): ") == "y" else {}

def get_list(prompt, keys, required):
    items = []
    if required or input(f"Do you want to add {prompt} (y/n): ") == "y":
        while True:
            items.append({key: input(f"Enter {prompt} {key}: ") for key in keys})
            if not required or input(f"Do you want to add another {prompt} (y/n): ") == "n":
                break
    return items

def get_bool(prompt):
    return True if input(f"{prompt} (y/n): ") == "y" else False

def add_saved_search():
    try:
        NAME = get_input("name", True)
        FEATURED = get_bool("Is featured")
        BOOKMARKED = get_bool("Is bookmarked")
        PUBLIC = get_bool("Is public")
        SEQUENCE = get_input("sequence", False)
        TYPE = get_input("type", False)
        QUERY = get_input("query", False)
        OFFSET = get_input("offset", False)
        SIZE = get_input("size", False)
        FILTERS = get_list("filter", ["fieldName", "operator", "value"], False)
        SORT_FIELDS = get_list("sort field", ["fieldName", "sortType"], False)
        
        RESULT_FIELDS_YN = True if input("Do you want to enter the names of the fields you want to "\
                                      "include in your search results (y/n)?: ") == "y" else False

        RESULT_FIELDS = []
        if RESULT_FIELDS_YN: 
            while True:
                RESULT_FIELDS.append(get_search_result())

                if input("Do you want to add another search result field (y/n)?: ") != "y":
                    break

        SIMILAR_ASSET_ID = get_input("similar asset id", False)
        MIN_SCORE = get_input("minimum score", False)
        EXCLUDE_TOTAL_RECORD_COUNT = get_bool("Exclude total record count")
        FILTER_BINDER = get_input("filter binder", False)

        SAVED_SEARCH = nomad_sdk.add_saved_search(NAME, FEATURED, BOOKMARKED, PUBLIC, 
                                                  SEQUENCE, TYPE, QUERY, OFFSET, SIZE, 
                                                  FILTERS, SORT_FIELDS, RESULT_FIELDS, 
                                                  SIMILAR_ASSET_ID, MIN_SCORE, 
                                                  EXCLUDE_TOTAL_RECORD_COUNT, FILTER_BINDER)
        
        print(json.dumps(SAVED_SEARCH, indent=4))
    except Exception as e:
        raise e
    
def delete_saved_search():
    try:
        SAVED_SEARCH_ID = input("Enter a saved search id: ")
        nomad_sdk.delete_saved_search(SAVED_SEARCH_ID)
    except Exception as e:
        raise e
    
def get_saved_search():
    try:
        SAVED_SEARCH_ID = input("Enter a saved search id: ")
        SAVED_SEARCH = nomad_sdk.get_saved_search(SAVED_SEARCH_ID)
        print(json.dumps(SAVED_SEARCH, indent=4))
    except Exception as e:
        raise e
    
def get_saved_searches():
    try:
        SAVED_SEARCHES = nomad_sdk.get_saved_searches()
        print(json.dumps(SAVED_SEARCHES, indent=4))
    except Exception as e:
        raise e
    
def get_search_saved():
    try:
        QUERY = get_input("query", False)
        OFFSET = get_input("offset", False)
        SIZE = get_input("size", False)
        FILTERS = get_list("filter", ["fieldName", "operator", "value"], False)
        SORT_FIELDS = get_list("sort field", ["fieldName", "sortType"], False)
        
        RESULT_FIELDS_YN = True if input("Do you want to enter the names of the fields you want to "\
                                      "include in your search results (y/n)?: ") == "y" else False

        RESULT_FIELDS = []
        if RESULT_FIELDS_YN: 
            while True:
                RESULT_FIELDS.append(get_search_result())

                if input("Do you want to add another search result field (y/n)?: ") != "y":
                    break

        SIMILAR_ASSET_ID = get_input("similar asset id", False)
        MIN_SCORE = get_input("minimum score", False)
        EXCLUDE_TOTAL_RECORD_COUNT = get_bool("Exclude total record count")
        FILTER_BINDER = get_input("filter binder", False)

        SEARCH_SAVED = nomad_sdk.get_search_saved(QUERY, OFFSET, SIZE, 
                                                  FILTERS, SORT_FIELDS, RESULT_FIELDS, 
                                                  SIMILAR_ASSET_ID, MIN_SCORE, 
                                                  EXCLUDE_TOTAL_RECORD_COUNT, FILTER_BINDER)
        
        print(json.dumps(SEARCH_SAVED), indent=4)
    except Exception as e:
        raise e
    
def get_search_saved_by_id():
    try:
        SAVED_SEARCH_ID = input("Enter a saved search id: ")
        SEARCH_SAVED_BY_ID = nomad_sdk.get_search_saved_by_id(SAVED_SEARCH_ID)
        print(json.dumps(SEARCH_SAVED_BY_ID, indent=4))
    except Exception as e:
        raise e
    
def patch_saved_search():
    try:
        ID = input("Enter a saved search id: ")
        NAME = get_input("name", False)
        FEATURED = get_bool("Is featured")
        BOOKMARKED = get_bool("Is bookmarked")
        PUBLIC = get_bool("Is public")
        SEQUENCE = get_input("sequence", False)

        SAVED_SEARCH = nomad_sdk.patch_saved_search(ID, NAME, FEATURED, BOOKMARKED,
                                                    PUBLIC, SEQUENCE)

        print(json.dumps(SAVED_SEARCH, indent=4))
    except Exception as e:
        raise e
    
def update_saved_search():
    try:
        ID = input("Enter a saved search id: ")
        NAME = get_input("name", False)
        FEATURED = get_bool("Is featured")
        BOOKMARKED = get_bool("Is bookmarked")
        PUBLIC = get_bool("Is public")
        SEQUENCE = get_input("sequence", False)
        TYPE = get_input("type", False)
        QUERY = get_input("query", False)
        OFFSET = get_input("offset", False)
        SIZE = get_input("size", False)
        FILTERS = get_list("filter", ["fieldName", "operator", "value"], False)
        SORT_FIELDS = get_list("sort field", ["fieldName", "sortType"], False)
        
        RESULT_FIELDS_YN = True if input("Do you want to enter the names of the fields you want to "\
                                      "include in your search results (y/n)?: ") == "y" else False

        RESULT_FIELDS = []
        if RESULT_FIELDS_YN: 
            while True:
                RESULT_FIELDS.append(get_search_result())

                if input("Do you want to add another search result field (y/n)?: ") != "y":
                    break

        SIMILAR_ASSET_ID = get_input("similar asset id", False)
        MIN_SCORE = get_input("minimum score", False)
        EXCLUDE_TOTAL_RECORD_COUNT = get_bool("Exclude total record count")
        FILTER_BINDER = get_input("filter binder", False)

        SAVED_SEARCH = nomad_sdk.update_saved_search(ID, NAME, FEATURED, BOOKMARKED, PUBLIC, 
                                                     SEQUENCE, TYPE, QUERY, OFFSET, SIZE, 
                                                     FILTERS, SORT_FIELDS, RESULT_FIELDS, 
                                                     SIMILAR_ASSET_ID, MIN_SCORE, 
                                                     EXCLUDE_TOTAL_RECORD_COUNT, FILTER_BINDER)
        
        print(json.dumps(SAVED_SEARCH, indent=4))
    except Exception as e:
        raise e
    
def exit():
    sys.exit()

functions = {
    "1": add_saved_search,
    "2": delete_saved_search,
    "3": get_saved_search,
    "4": get_saved_searches,
    "5": get_search_saved,
    "6": get_search_saved_by_id,
    "7": patch_saved_search,
    "8": update_saved_search,
    "9": exit
}

if __name__ == "__main__":
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
