from instance.create_and_upload_instance import *
from instance.delete_instance import *
from helpers.guid_helpers import *
from helpers.process_dates import *

import json, datetime

def create_and_upload_instance_main(AUTH_TOKEN):
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
            START_TIME = "00:00:00"
            print(f"Enter start time (HH:MM:SS): {START_TIME}")
            END_TIME = "12:00:00"
            print(f"Enter end time (HH:MM:SS): {END_TIME}")
            RECURRING_WEEKS = "2"
            print("Enter number of recurring weeks: 2")
            DAYS = "Thursday,Saturday,Monday"
            print(f"Enter the days (Monday,Tuesday,etc.) you want your "\
                    f"instance to recur (separate by comma): {DAYS}")
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
            SERIES_DESCRIPTION = "Fourth Testing"
            print(f"Enter Series Description: {SERIES_DESCRIPTION}")
            SERIES_ID = "9fbdc0ff-5eed-41e1-b606-93f4fb548952"
            print(f"Enter Series Id: {SERIES_ID}")
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
        INFO = creating_and_uploading_event_instance(AUTH_TOKEN, ID, CONTENT_ID, CONTENT_DEFINITION_ID, 
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
    AUTH_TOKEN = "eyJraWQiOiJkSkpRa3ZxdWxDekpqZEFmWTR0UGwrSytyWldVTE5OTkR1YitYVnljaFNRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJjdXN0b206Y29udGFjdF9pZCI6ImU5YWIxNDFmLWMxMjgtNDE5Yi04YTQ3LWIzNTg1MTQwMzZkNyIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX1ZHRXhveTY0aSIsImNvZ25pdG86dXNlcm5hbWUiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJnaXZlbl9uYW1lIjoiU2NvdHQiLCJvcmlnaW5fanRpIjoiZjcyMjllMTEtZWRlYy00ZDc2LTk1OGUtOWJlOGNkMzcyZWViIiwiYXVkIjoiNWUybm92MXAzYTZxNHM1MHZjamo1ZXNqYjciLCJldmVudF9pZCI6ImE0NTc4YmRkLWVhZjQtNGZlZS1hMWRkLTNhOGVlOWIyZTliOCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjg3ODkzMzAwLCJleHAiOjE2ODc4OTY5MDAsImlhdCI6MTY4Nzg5MzMwMCwiZmFtaWx5X25hbWUiOiJGYWx1ZGkiLCJqdGkiOiI4YzQzNDRhZS1hMDk5LTQ5YTItODNjMS1jMGNmZDUyMDU4MWQiLCJlbWFpbCI6InNmYWx1ZGlAbm9tYWQtY21zLmNvbSJ9.vcaNE6pQF9ZL6TUH1ZeHDZ4Q8HEwcMoVPB9iEF2mhc8yM6ylhvWU1rO5N4HMp20tZaFjtjgcJxxGY6ek-QB8X6eb_B4t6GeFGKrpO1NiCrIXKSc15gaIhp6jGmhpMvf8egM7iLaoS8j6dw526lV9SDRtiVCa3Rci2ylIpNZqQmoPCABPnT8nIHL8eqqITP8X76YFQhYBILyuGDpb2Q8ZZ_93IPGsKUYVVIWyrBIvInfRFSo9x-n3J3vUxXwdLVgd-eU7Xs1syBASduI3aw2goPt_9UnILwZngVbJv_QpT2PbaZhFB8JSNRzz4F5K1RB8yfq5OgO27-UjKQ46_N_UbA"
    print(f"Enter your authentication token: {AUTH_TOKEN}")

    while True:
        print("Do you want to create/update, delete an instance, or exit?")
        USER_INPUT = "create/update"
        print("Enter create/update, delete, or exit for each option respectively: create/update")
        
        if USER_INPUT == "create/update":
            create_and_upload_instance_main(AUTH_TOKEN)
        elif USER_INPUT == "delete":
            delete_instance_main(AUTH_TOKEN)
        elif USER_INPUT == "exit":
            break
        else:
            print("Invalid input")