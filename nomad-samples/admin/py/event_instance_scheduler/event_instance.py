from instance.create_and_update_instance import *
from instance.delete_instance import *
from helpers.guid_helpers import *
from helpers.process_dates import *

import json, datetime

def create_and_update_instance_main(AUTH_TOKEN):
    try:
        ID = new_guid()
        CONTENT_ID = ""
        print("Enter Content Id (optional): ")
        CONTENT_DEFINITION_ID = "d34f116d-2a51-4d4a-b928-5dd581d9fd5e"
        print(f"Enter Content Definition Id: {CONTENT_DEFINITION_ID}")
        INSTANCE_NAME = "New Instance"
        print(f"Enter Instance Name: {INSTANCE_NAME}")
        RECURRING = True if input("Do you want your instance to be recurring? (yes, no): ") == "yes" else False
        if RECURRING:
            START_TIME = input ("Enter start time (HH:MM:SS): ")
            END_TIME = ("Enter end time (HH:MM:SS): ")
            RECURRING_WEEKS = ("Enter number of recurring weeks: ")
            DAYS = ("Enter the days (Monday,Tuesday,etc.) you want your "\
                    f"instance to recur (separate by comma): ")
            RECURRING_DAYS = process_dates(DAYS.split(","), START_TIME)

            START_DATETIME = f"{RECURRING_DAYS['startDate']}T{START_TIME}Z"
            END_DATETIME = f"{RECURRING_DAYS['startDate']}T{END_TIME}Z"
        else:
            START_DATETIME = input("Enter Start DateTime (YYYY-MM-DDTHH:MM:SS): ") + "Z"
            END_DATETIME = input("Enter End DateTime (YYYY-MM-DDTHH:MM:SS): ") + "Z"
            RECURRING_WEEKS = RECURRING_DAYS = ""

        DISABLED = True if input("Enter Disabled (True/False): ") == "True" else False
        EXISTING_SERIES = True if input("Do you want to use an existing series? (yes, no): ") == "yes" else False
        if EXISTING_SERIES:
            SERIES_DESCRIPTION = input("Enter Series Description: ")
            SERIES_ID = input("Enter Series Id: ")
            SERIES_OVERWRITE = True if input("Do you want to override the series details? (yes, no): ") == "yes" else False
        else:
            SERIES_DESCRIPTION = SERIES_ID = SERIES_OVERWRITE = ""

        if not EXISTING_SERIES or SERIES_OVERWRITE:
            DESCRIPTION = input("Enter description: ")
            SLATE_VIDEO_ID = input("Enter Slate Video Id (optional): ")
            PREROLL_VIDEO_ID = input("Enter Preroll Video: ")
            POSTROLL_VIDEO_ID = input("Enter Postroll Video: ")
            IS_SECURE_OUTPUT = True if input("Enter Is Secure Output (True/False): ") == "True" else False
            ARCHIVE_FOLDER_ID = input("Enter Archive Folder ID (optional): ")
            LIVE_INPUT_A = input("Enter Live Input A: ")
            LIVE_INPUT_B = input("Enter Live Input B (optional): ")
            PRIMARY_LIVE_STREAM_INPUT_URL = input("Enter Primary Live Stream Input Url: ")
            BACKUP_LIVE_STREAM_INPUT_URL = input("Enter Backup Live Stream Input Url (optional): ")
        else:
            DESCRIPTION = SLATE_VIDEO_ID = PREROLL_VIDEO_ID = POSTROLL_VIDEO_ID = IS_SECURE_OUTPUT = \
            ARCHIVE_FOLDER_ID = LIVE_INPUT_A = LIVE_INPUT_B = PRIMARY_LIVE_STREAM_INPUT_URL = \
            BACKUP_LIVE_STREAM_INPUT_URL = ""
        

        print("Creating event instance")
        INFO = create_and_update_event_instance(AUTH_TOKEN, ID, CONTENT_ID, CONTENT_DEFINITION_ID, 
                                                     INSTANCE_NAME, START_DATETIME, END_DATETIME, 
                                                     DISABLED, SERIES_OVERWRITE,
                                                     RECURRING, SERIES_DESCRIPTION, SERIES_ID, 
                                                     EXISTING_SERIES, DESCRIPTION, SLATE_VIDEO_ID, 
                                                     PREROLL_VIDEO_ID, POSTROLL_VIDEO_ID, 
                                                     IS_SECURE_OUTPUT, ARCHIVE_FOLDER_ID, LIVE_INPUT_A,
                                                     LIVE_INPUT_B, PRIMARY_LIVE_STREAM_INPUT_URL,
                                                     BACKUP_LIVE_STREAM_INPUT_URL, RECURRING_WEEKS, 
                                                     RECURRING_DAYS["dateList"])
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
            create_and_update_instance_main(AUTH_TOKEN)
        elif USER_INPUT == "delete":
            delete_instance_main(AUTH_TOKEN)
        elif USER_INPUT == "exit":
            break
        else:
            print("Invalid input")