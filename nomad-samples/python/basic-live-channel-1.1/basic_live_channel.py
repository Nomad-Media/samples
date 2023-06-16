#from Swal.from import * "https:#cdn.jsdelivr.net/npm/sweetalert2@11.1.5/src/sweetalert2.js"

from constants.project_constants import *

from account.login import *
from account.logout import *

from channel_names.check_channel_and_input_names import *

from helpers.guid_helpers import *
from helpers.slugify import *

from live_channel.create_live_channel import *
from live_channel.delete_live_channel import *
from live_channel.start_live_channel import *
from live_channel.stop_live_channel import *

from live_input.create_live_input import *

from schedule_event.add_asset_schedule_event import *
from schedule_event.add_input_schedule_event import *

from live_channel.live_channel_types import *
from live_input.live_input_types import *

from libraries import asyncio, getpass, secrets

import tracemalloc
tracemalloc.start()
'''
 * Start
 *
 * @param {Event} evt
'''
async def start(AUTH_TOKEN):

    # Source is required
    #while True:
    #    USER_INPUT = input("Enter source: ")
    #    if len(USER_INPUT.strip()) == 0:
    #        print("The source can't be empty")
    #    else:
    #        SOURCE = USER_INPUT
    #        break
    SOURCE = "https://e80d652dc035f381411f071289929a20.p05sqb.channel-assembly.mediatailor.us-west-2.amazonaws.com/v1/channel/MyTestChannel/index.m3u8"

    try:
        print("Starting...")

        # Create common random suffix for both, Live Channel and input, names
        while True:
            CHANNEL_AND_INPUT_NAME = secrets.randbelow(1000)
            # Set the Live Channel name
            CHANNEL_NAME = "Live Channel - " + str(CHANNEL_AND_INPUT_NAME)

            UNIQUE = await check_channel_and_input_names(AUTH_TOKEN, CHANNEL_NAME)

            if UNIQUE:
                break


        # Create Live Channel object
        CHANNEL_OBJECT = {
            "name": CHANNEL_NAME,
            "route": slugify(CHANNEL_NAME),
            "type": LIVE_CHANNEL_TYPES["Normal"],
            "archiveFolderAsset": {
                "id": ARCHIVE_FOLDER_ASSET_ID # NOTE: Update constant in /constants/project-constants.js with actual archive folder ID if needed
            }
        }



        # Give feedback to the console
        print("Creating Live Channel [" + CHANNEL_NAME + "]...")

        # Create the channel
        CHANNEL_RESPONSE = await create_live_channel(AUTH_TOKEN, CHANNEL_OBJECT)

        # Check for errors
        if CHANNEL_RESPONSE == None or not "id" in CHANNEL_RESPONSE:
            print("Creating Channel failed")
            raise Exception()


        # Set the Live Channel ID
        CHANNEL_ID = CHANNEL_RESPONSE["id"]

        # Create slate asset schedule event object
        SLATE_OBJECT = {
            "id": new_guid(),
            "channelId": CHANNEL_ID,
            "assetId": SLATE_ASSET_ID, # NOTE: Update constant in /constants/project-constants.js with actual slate ID if needed
            "previousId": None
        }


        # Give feedback to the console
        print("Adding slate to the Live Channel...")

        # Add slate to the channel
        ADD_ASSET_SCHEDULE_EVENT_RESPONSE = await add_asset_schedule_event(AUTH_TOKEN, SLATE_OBJECT)

        # Check the response
        if (ADD_ASSET_SCHEDULE_EVENT_RESPONSE == None):
            print("Adding slate to the Live Channel failed")
            raise Exception()


        # Set the Live Input name
        INPUT_NAME = "Live Input - " + str(CHANNEL_AND_INPUT_NAME)

        # Create Live Input object
        INPUT_OBJECT = {
            "name": INPUT_NAME,
            "internalName": slugify(INPUT_NAME),
            "type": LIVE_INPUT_TYPES["URL_PULL"], # NOTE: Replace type if needed
            "source": SOURCE
        }


        # Give feedback to the console
        print("Creating Live Input...")

        # Create the input
        INPUT_RESPONSE = await create_live_input(AUTH_TOKEN, INPUT_OBJECT)

        # Check for errors
        if INPUT_RESPONSE == None or not "id" in INPUT_RESPONSE:
            print("Creating Input failed")
            raise Exception()


        # Set the Live Input ID
        INPUT_ID = INPUT_RESPONSE["id"]

        # Create Live Input schedule event object
        EVENT_OBJECT = {
            "channelId": CHANNEL_ID,
            "inputId": INPUT_ID,
            "previousId": SLATE_OBJECT["id"]
        }


        # Give feedback to the console
        print("Adding Live Input to the Live Channel...")

        # Add the Live Input event to Live Channel
        ADD_INPUT_SCHEDULE_EVENT_RESPONSE = await add_input_schedule_event(AUTH_TOKEN, EVENT_OBJECT)

        # Check the response
        if (ADD_INPUT_SCHEDULE_EVENT_RESPONSE == None):
            print("Adding Live Input to the Live Channel failed")
            raise Exception()


        # Give feedback to the console
        print("Starting the Live Channel: This could take a couple of minutes...")

        # Start the Live Channel
        await start_live_channel(AUTH_TOKEN, CHANNEL_ID)

        # Give feedback to the console
        print("Live Channel was created and started successfully")

        # Show successful message
        print("Live Channel", "Live Channel was created and started successfully")

        return { "CHANNEL_ID": CHANNEL_ID, "INPUT_ID": INPUT_ID }

    except:
        print("Live Channel failed to start")
        exit()



'''
 * Stop
 *
 * @param {Event} evt
'''
async def stop(CHANNEL_ID, INPUT_ID, AUTH_TOKEN):

    if (CHANNEL_ID == None or INPUT_ID == None):
        return

    try:
        print("Stopping...")

        # Give feedback to the console
        print("Stopping Live Channel: This could take a couple of minutes...")

        # Stop the channel
        await stop_live_channel(AUTH_TOKEN, CHANNEL_ID)

        # Give feedback to the console
        print("Deleting the Live Channel and its Live Inputs...")

        # Delete the Live Channel
        await delete_live_channel(AUTH_TOKEN, CHANNEL_ID, True)

        # Give feedback to the console
        print("Live Channel was stopped and deleted successfully")

        # Show successful message
        print("Live Channel", "Live Channel was stopped and deleted successfully")

    except:
        print("Live Channel failed to Stop")
        exit()

'''
 * Login
 *
'''
async def sign_in():
    try:
        user = 'xxxxxxxx'#input("Username: ")
        password = 'N0madInternshipPassword!!'#getpass.getpass()

        print("Logging in...")

        # Login and get/set the authentication token
        AUTH_TOKEN = await login(user, password)
        
        if AUTH_TOKEN == None:
            raise Exception()

        # Store the token
        #sessionStorage.setItem("token", AUTH_TOKEN)

        # Give feedback to the console
        print("User logged in successfully")

        return AUTH_TOKEN

    except:
        print("User failed to login")
        exit()




'''
 * Logout
 *
'''
async def sign_out(USER_SESSION_ID, AUTH_TOKEN):
    try:
        print("Logging out...")

        # Logout
        SUCCESS = await logout(USER_SESSION_ID, AUTH_TOKEN)
        
        if not SUCCESS:
            raise Exception()
        # Give feedback to the console
        print("User logged out successfully")
    except:
        print("User failed to logout")
        exit()



if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    auth_token = None
    user_session_id = None

    ID = None

    while True:
        USER_INPUT = input("Enter start, stop, sign in, sign out or exit: ")
        if USER_INPUT != None and USER_INPUT.lower() == "start":
            if auth_token == None:
                print("Starting requires signing in")
            elif ID == None:
                ID = loop.run_until_complete(start(auth_token))
            else:
                print("Session already started")
        elif USER_INPUT != None and USER_INPUT.lower() == "stop":
            if ID == None:
                print("Session already stopped")
            elif (auth_token == None):
                print("Stopping requires signing in")
            else:
                loop.run_until_complete(stop(ID["CHANNEL_ID"], ID["INPUT_ID"], auth_token))
                ID = None
        elif USER_INPUT.lower() == "sign in":
            if auth_token == None:
                INFO = loop.run_until_complete(sign_in())
                auth_token = INFO["token"]
                user_session_id = INFO["userSessionId"]
        elif USER_INPUT.lower() == "sign out":
            if (auth_token == None):
                print("Already signed out")
            else:
                loop.run_until_complete(sign_out(user_session_id, auth_token))
            auth_token = None
        elif USER_INPUT.lower() == "exit":
            break
        else:
            print(USER_INPUT + " is not a valid input") 
    loop.close()
