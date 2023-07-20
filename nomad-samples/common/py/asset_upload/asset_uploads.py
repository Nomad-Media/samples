from assets.multi_thread_upload import *
from assets.single_thread_upload import *
from assets.start_asset_upload import *
from assets.upload_asset_part_complete import *
from assets.upload_complete_asset import *

import asyncio, json

async def uploadFile(AUTH_TOKEN, NAME, UPLOAD_OVERWRITE_OPTION, FILE, RELATED_CONTENT_ID, MULTI_THREAD):
    print("Start upload")
    RESPONSE = await start_upload(AUTH_TOKEN, NAME, UPLOAD_OVERWRITE_OPTION, FILE, RELATED_CONTENT_ID)
    print(json.dumps(RESPONSE, indent=4))

    if (MULTI_THREAD == "y"):
        await multi_thread_upload(AUTH_TOKEN, FILE, RESPONSE)
    else:
        await single_thread_upload(AUTH_TOKEN, FILE, RESPONSE)

    INFO = await upload_complete_asset(AUTH_TOKEN, RESPONSE["id"])
    print(json.dumps(INFO, indent=4))
    


if __name__ == "__main__":
    AUTH_TOKEN = input("Enter authentication token: ")
    NAME = input("Enter asset name (press enter to skip): ")
    while True:
        UPLOAD_OVERWRITE_OPTION = input("Enter upload overwrite option (replace, continue, cancel): ")
        if UPLOAD_OVERWRITE_OPTION == "replace" or UPLOAD_OVERWRITE_OPTION == "continue" \
        or UPLOAD_OVERWRITE_OPTION == "cancel":
            break
        print("Invalid input")
    FILE = input("Enter file path: ")
    RELATED_CONTENT_ID = input("Enter related content id (press enter to skip): ")
    MULTI_THREAD = input("Do you want to use multithread (y/n)?: ")

    asyncio.run(uploadFile(AUTH_TOKEN, NAME, UPLOAD_OVERWRITE_OPTION, FILE, RELATED_CONTENT_ID, MULTI_THREAD))
