from constants.project_constants import *

from channel_names.check_channel_names import *

from helpers.guid_helpers import *
from helpers.slugify import *

from input_names.check_input_names import *

from live_channel.create_live_channel import *
from live_channel.delete_live_channel import *
from live_channel.live_channel_types import *
from live_channel.start_live_channel import *
from live_channel.stop_live_channel import *

from live_input.create_live_input import *
from live_input.live_input_types import *

from schedule_event.add_asset_schedule_event import *
from schedule_event.add_input_schedule_event import *

import secrets

def create_live_channel_main(AUTH_TOKEN):

    try:
        print("Starting...")

        # Create common random suffix for both, Live Channel and input, names
        while True:
            #test
            CHANNEL_NAME = input("Enter Live Channel Name: ")

            UNIQUE = check_channel_names(AUTH_TOKEN, CHANNEL_NAME)

            if UNIQUE:
                break

            print(f"Channel Name {CHANNEL_NAME} is already taken")


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
        CHANNEL_RESPONSE = create_live_channel(AUTH_TOKEN, CHANNEL_OBJECT)

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
        ADD_ASSET_SCHEDULE_EVENT_RESPONSE = add_asset_schedule_event(AUTH_TOKEN, SLATE_OBJECT)

        # Check the response
        if (ADD_ASSET_SCHEDULE_EVENT_RESPONSE == None):
            print("Adding slate to the Live Channel failed")
            raise Exception()


        
        
        # Create Live Input schedule event object
        EVENT_OBJECT = {
            "channelId": CHANNEL_ID,
            "inputId": INPUT_ID,
            "previousId": SLATE_OBJECT["id"]
        }

        # Give feedback to the console
        print("Adding Live Input to the Live Channel...")

        # Add the Live Input event to Live Channel
        ADD_INPUT_SCHEDULE_EVENT_RESPONSE = add_input_schedule_event(AUTH_TOKEN, EVENT_OBJECT)

        # Check the response
        if (ADD_INPUT_SCHEDULE_EVENT_RESPONSE == None):
            print("Adding Live Input to the Live Channel failed")
            raise Exception()


        # Give feedback to the console
        print("Starting the Live Channel: This could take a couple of minutes...")

        # Start the Live Channel
        start_live_channel(AUTH_TOKEN, CHANNEL_ID)

        # Give feedback to the console
        print("Live Channel was created and started successfully")

        # Show successful message
        print("Live Channel", "Live Channel was created and started successfully")

        print(json.dumps({ "CHANNEL_ID": CHANNEL_ID, "INPUT_ID": INPUT_ID }, indent=4))

    except:
        print("Live Channel failed to start")
        exit()

    
def create_live_input_main(AUTH_TOKEN):
    # Set the Live Input name
    while True:
        INPUT_NAME = input("Enter Live Input Name: ")

        UNIQUE = check_input_names(AUTH_TOKEN, INPUT_NAME)

        if UNIQUE:
            break

        print(f"Input Name {INPUT_NAME} is already taken")

    # Source is required
    #while True:
    #    USER_INPUT = input("Enter source: ")
    #    if len(USER_INPUT.strip()) == 0:
    #        print("The source can't be empty")
    #    else:
    #        SOURCE = USER_INPUT
    #        break
    SOURCE = "https://e80d652dc035f381411f071289929a20.p05sqb.channel-assembly.mediatailor.us-west-2.amazonaws.com/v1/channel/MyTestChannel/index.m3u8"
    SOURCE = input("Enter Source: ")

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
    INPUT_RESPONSE = create_live_input(AUTH_TOKEN, INPUT_OBJECT)

    # Check for errors
    if INPUT_RESPONSE == None or not "id" in INPUT_RESPONSE:
        print("Creating Input failed")
        raise Exception()


    # Set the Live Input ID
    INPUT_ID = INPUT_RESPONSE["id"]



def delete_channel(AUTH_TOKEN):

    CHANNEL_ID = input("Enter the Channel id of the channel you want to delete: ")

    DELETE_LIVE_INPUTS = True if input("Do you want to delete the inputs of the channel (y/n)?: ") == "y" else False

    try:
        print("Stopping...")

        # Give feedback to the console
        print("Stopping Live Channel: This could take a couple of minutes...")

        # Stop the channel
        stop_live_channel(AUTH_TOKEN, CHANNEL_ID)

        # Give feedback to the console
        print("Deleting the Live Channel...")

        # Delete the Live Channel
        delete_live_channel(AUTH_TOKEN, CHANNEL_ID, DELETE_LIVE_INPUTS)

        # Give feedback to the console
        print("Live Channel was stopped and deleted successfully")

        # Show successful message
        print("Live Channel", "Live Channel was stopped and deleted successfully")

    except:
        print("Live Channel failed to Stop")
        exit()

if __name__ == "__main__":
    while True:
        AUTH_TOKEN = ""
        print(f"Enter authentication token: {AUTH_TOKEN}")

        print("Do you want to create a live channel, create a live input, start a live channel, "\
              "stop a live channel, add a live input to a live channel, remove an input from a "\
              "channel, delete a live channel, delete a live input, or exit")
        USER_INPUT = input("Enter create channel, create input, start, stop, add, remove, "\
                           "delete channel, delete input, or exit for each option above respectivly: ")
        if USER_INPUT == "create channel":
            create_live_channel_main(AUTH_TOKEN)

        elif USER_INPUT == "create input":
            create_live_input_main(AUTH_TOKEN)

        elif USER_INPUT == "start":
            start_live_channel_main(AUTH_TOKEN)

        elif USER_INPUT == "stop":
            stop_live_channel_main(AUTH_TOKEN)

        elif USER_INPUT == "add":
            add_live_input_to_live_channel(AUTH_TOKEN)

        elif USER_INPUT == "remove":
            remove_live_input_from_live_channel(AUTH_TOKEN)

        elif USER_INPUT == "delete channel":
            delete_channel(AUTH_TOKEN)
    
        elif USER_INPUT == "exit":
            break
            
        else:
            print("Invalid input") 

