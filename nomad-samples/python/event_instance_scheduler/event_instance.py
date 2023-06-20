from instance.create_and_upload_instance import *
from instance.delete_instance import *

import json

def create_and_upload_instance_main(AUTH_TOKEN):
    try:
        ID = input("Enter Id: ")
        CONTENT_ID = input("Enter Content Id (optional): ")
        CONTENT_DEFINITION_ID = input("Enter Content Definition Id: ")
        INSTANCE_NAME = input("Enter Instance Name: ")
        START_DATETIME = input("Enter Start DateTime (YYYY-MM-DDTHH:MM:SS): ") + "Z"
        END_DATETIME = input("Enter End DateTime (YYYY-MM-DDTHH:MM:SS): ") + "Z"
        DISABLED = True if input("Enter Disabled (True/False): ") == "True" else False
        DESCRIPTION = input("Enter description: ")
        SLATE_VIDEO_ID = input("Enter Slate Video Id (optional): ")
        PREROLL_VIDEO_ID = input("Enter Preroll Video: ")
        POSTROLL_VIDEO_ID = input("Enter Postroll Video: ")
        IS_SECURE_OUTPUT = True if input("Enter Is Secure Output (True/False): ") == "True" else False
        ARCHIVE_FOLDER = input("Enter Archive Folder (optional): ")
        LIVE_INPUT_A = input("Enter Live Input A: ")
        LIVE_INPUT_B = input("Enter Live Input B (optional): ")
        PRIMARY_LIVE_STREAM_INPUT_URL = input("Enter Primary Live Stream Input Url: ")
        BACKUP_LIVE_STREAM_INPUT_URL = input("Enter Backup Live Stream Input Url (optional): ")
        OVERRIDE_SERIES_DETAILS = True if input("Enter Override Series Details (True/False): ") == "True" else False
        SERIES_DESCRIPTION = input("Enter Series Description (optional): ")
        SERIES_ID = input("Enter Series Id (optional): ")

        print("Creating event instance")
        INFO = creating_and_uploading_event_instance(AUTH_TOKEN, ID, CONTENT_ID, CONTENT_DEFINITION_ID, 
                                                     INSTANCE_NAME, START_DATETIME, END_DATETIME, 
                                                     DISABLED, DESCRIPTION, SLATE_VIDEO_ID, 
                                                     PREROLL_VIDEO_ID, POSTROLL_VIDEO_ID, 
                                                     IS_SECURE_OUTPUT, ARCHIVE_FOLDER, LIVE_INPUT_A,
                                                     LIVE_INPUT_B, PRIMARY_LIVE_STREAM_INPUT_URL,
                                                     BACKUP_LIVE_STREAM_INPUT_URL, OVERRIDE_SERIES_DETAILS,
                                                     SERIES_DESCRIPTION, SERIES_ID)
        print(json.dumps(INFO, indent=4))

    except:
        raise Exception()

def delete_instance_main(AUTH_TOKEN: str):
    try:
        CONTENT_ID = input("Enter Content Id: ")
        CONTENT_DEFINITION_ID = input("Enter Content Definition Id: ")

        print("Deleting event instance")
        deleting_event_instance(AUTH_TOKEN, CONTENT_ID, CONTENT_DEFINITION_ID)
        print("Deleting event instance successfull")
    except:
        raise Exception()
    
if __name__ == "__main__":
    AUTH_TOKEN = input("Enter your authentication token: ")

    while True:
        print("Do you want to create/update, delete an instance, or exit?")
        USER_INPUT = input("Enter create/update, delete, or exit for each option respectively: ")
        
        if USER_INPUT == "create/update":
            create_and_upload_instance_main(AUTH_TOKEN)
        elif USER_INPUT == "delete":
            delete_instance_main(AUTH_TOKEN)
        elif USER_INPUT == "exit":
            break
        else:
            print("Invalid input")