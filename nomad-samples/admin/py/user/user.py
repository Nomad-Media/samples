import sys, os
sys.path.append(os.path.realpath('...'))

from nomad_media_pip.nomad_sdk import Nomad_SDK
from config import config

nomad_sdk = Nomad_SDK(config)

def get_input(prompt, required):
    return input(f"Enter {prompt}: ") if required or input(f"Do you want to add {prompt} (y/n): ") == "y" else ""

def get_bool(prompt):
    return True if input(f"{prompt} (y/n): ") == "y" else False

def get_data(prompts):
    data = {}
    for key, value in prompts.items():
        type = value[1]
        if type == "input":
            prompt, type, required = value
            data[key] = get_input(prompt, required)
        elif type == "bool":
            prompt, type, required = value
            data[key] = get_bool(prompt)

    return data

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
        prompts = {
            "CONTENT_ID": ("content id", "input"),
            "CONTENT_DEFINITION_ID": ("content definition id", "input"),
            "USER_ID": ("user id", "input"),
            "EMAIL": ("email", "input"),
            "ID": ("id", "input"),
            "KEY_NAME": ("key name", "input"),
            "EXPIRATION_DATE": ("expiration date (YYYY-MM-DD)", "input")
        }

        data = get_data(prompts)
        
        nomad_sdk.delete_user_content_security_data(**data)
        
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
    
def delete_user_saved_serach_data():
    try:
        USER_ID = input("Enter user id: (press enter to use current user id): ")
        
        nomad_sdk.delete_user_saved_search_data(USER_ID)
        
    except:
        raise Exception()
    
def delete_user_session_data():
    try:
        USER_ID = input("Enter user id: (press enter to use current user id): ")
        
        nomad_sdk.delete_user_session_data(USER_ID)
        
    except:
        raise Exception()
    
def delete_user_video_tracking_data():
    try:
        prompts = {
            "ASSET_ID": ("asset id", "input"),
            "CONTENT_ID": ("content id", "input"),
            "VIDEO_TRACKING_ATTRIBUTE_ID": ("video tracking attribute id", "input"),
            "USER_ID": ("user id", "input"),
            "ID": ("id", "input"),
            "IS_FIRST_QUARTILE": ("is first quartile", "bool"),
            "IS_MIDPOINT": ("is midpoint", "bool"),
            "IS_THIRD_QUARTILE": ("is third quartile", "bool"),
            "IS_COMPLETE": ("is complete", "bool"),
            "IS_HIDDEN": ("is hidden", "bool"),
            "IS_LIVE_STREAM": ("is live stream", "bool"),
            "MAX_SECOND": ("max second", "input"),
            "LAST_SECOND": ("last second", "input"),
            "TOTAL_SECONDS": ("total seconds", "input"),
            "LAST_BEACON_DATE": ("last beacon date (YYYY-MM-DD)", "input"),
            "KEY_NAME": ("key name", "input")
        }

        data = get_data(prompts)

        nomad_sdk.delete_user_video_tracking_data(**data)

        
    except:
        raise Exception()
    
functions = {
    "1": delete_user,
    "2": delete_user_content_attribute_data,
    "3": delete_user_content_group_data,
    "4": delete_user_content_security_data,
    "5": delete_user_data,
    "6": delete_user_dislikes_data,
    "7": delete_user_favorites_data,
    "8": delete_user_likes_data,
    "9": delete_user_saved_serach_data,
    "10": delete_user_session_data,
    "11": delete_user_video_tracking_data
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