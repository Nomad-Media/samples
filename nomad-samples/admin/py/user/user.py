import sys, os
sys.path.append(os.path.realpath('...'))

from nomad_media_pip.nomad_sdk import Nomad_SDK
from config import config

nomad_sdk = Nomad_SDK(config)

def get_input(prompt):
    return input(f"Enter {prompt}: ") if input(f"Do you want to add {prompt} (y/n): ") == "y" else None

def get_bool(prompt):
    return True if input(f"{prompt} (y/n): ") == "y" else False

def delete_user():
    try:
        USER_ID = input("Enter user id: (press enter to use current user id): ")
        
        nomad_sdk.delete_user(USER_ID)
        
    except:
        raise Exception()

def delete_user_content_attribute_data():
    try:
        USER_ID = input("Enter user id: (press enter to use current user id): ")

        nomad_sdk.delete_user_content_attribute_data(USER_ID)
        
    except:
        raise Exception()
    
def delete_user_content_group_data():
    try:
        USER_ID = input("Enter user id: (press enter to use current user id): ")
        
        nomad_sdk.delete_user_content_group_data(USER_ID)
        
    except:
        raise Exception()
    
def delete_user_content_security_data():
    try:
        USER_ID = input("Enter user id: (press enter to use current user id): ")

        CONTENT_ID = get_input("content id")
        CONTENT_DEFINITION_ID = get_input("content definition id")
        EMAIL = get_input("email")
        ID = get_input("id")
        KEY_NAME = get_input("key name")
        EXPIRATION_DATE = get_input("expiration date (YYYY-MM-DD)")
        
        nomad_sdk.delete_user_content_security_data(CONTENT_ID, CONTENT_DEFINITION_ID,
                                                    USER_ID, EMAIL, ID, KEY_NAME,
                                                    EXPIRATION_DATE)
        
    except:
        raise Exception()
    
def delete_user_data():
    try:
        USER_ID = input("Enter user id: (press enter to use current user id): ")
        
        nomad_sdk.delete_user_data(USER_ID)
        
    except:
        raise Exception()

def delete_user_dislikes_data():
    try:
        USER_ID = input("Enter user id: (press enter to use current user id): ")
        
        nomad_sdk.delete_user_dislikes_data(USER_ID)
        
    except:
        raise Exception()
    
def delete_user_favorites_data():
    try:
        USER_ID = input("Enter user id: (press enter to use current user id): ")
        
        nomad_sdk.delete_user_favorites_data(USER_ID)
        
    except:
        raise Exception()
    
def delete_user_likes_data():
    try:
        USER_ID = input("Enter user id: (press enter to use current user id): ")
        
        nomad_sdk.delete_user_likes_data(USER_ID)
        
    except:
        raise Exception()
    
def delete_user_saved_search_data():
    try:
        USER_ID = input("Enter user id: (press enter to use current user id): ")
        
        nomad_sdk.delete_user_saved_search_data(USER_ID)
        
    except:
        raise Exception()
    
def delete_user_session_data():
    try:
        USER_ID = input("Enter user id: (press enter to use current user id): ")
        if USER_ID == "":
            USER_ID = None
        
        nomad_sdk.delete_user_session_data(USER_ID)
        
    except:
        raise Exception()
    
def delete_user_video_tracking_data():
    try:
        USER_ID = input("Enter user id: (press enter to use current user id): ")
        if USER_ID == "":
            USER_ID = None

        ASSET_ID = get_input("asset id")
        CONTENT_ID = get_input("content id")
        VIDEO_TRACKING_ATTRIBUTE_ID = get_input("video tracking attribute id")
        ID = get_input("id")
        IS_FIRST_QUARTILE = get_bool("is first quartile")
        IS_MIDPOINT = get_bool("is midpoint")
        IS_THIRD_QUARTILE = get_input("is third quartile")
        IS_COMPLETE = get_bool("is complete")
        IS_HIDDEN = get_bool("is hidden")
        IS_LIVE_STREAM = get_bool("is live stream")
        MAX_SECOND = get_input("max second")
        LAST_SECOND = get_input("last second")
        TOTAL_SECONDS = get_input("total seconds")
        LAST_BEACON_DATE = get_input("last beacon date (YYYY-MM-DD)")
        KEY_NAME = get_input("key name")

        nomad_sdk.delete_user_video_tracking_data(ASSET_ID, CONTENT_ID, VIDEO_TRACKING_ATTRIBUTE_ID,
                                                  USER_ID, ID, IS_FIRST_QUARTILE, IS_MIDPOINT,
                                                  IS_THIRD_QUARTILE, IS_COMPLETE, IS_HIDDEN,
                                                  IS_LIVE_STREAM, MAX_SECOND, LAST_SECOND,
                                                  TOTAL_SECONDS, LAST_BEACON_DATE, KEY_NAME)

    except:
        raise Exception()
    
def exit():
    sys.exit()

functions = {
    "1": delete_user,
    "2": delete_user_content_attribute_data,
    "3": delete_user_content_group_data,
    "4": delete_user_content_security_data,
    "5": delete_user_data,
    "6": delete_user_dislikes_data,
    "7": delete_user_favorites_data,
    "8": delete_user_likes_data,
    "9": delete_user_saved_search_data,
    "10": delete_user_session_data,
    "11": delete_user_video_tracking_data,
    "12": exit
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