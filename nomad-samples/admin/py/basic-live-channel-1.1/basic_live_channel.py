from constants.project_constants import *

from channel_names.check_channel_names import *

from helpers.guid_helpers import *
from helpers.slugify import *

from input_names.check_input_names import *

from live_channel.create_live_channel import *
from live_channel.delete_live_channel import *
from live_channel.get_live_channel import *
from live_channel.live_channel_types import *
from live_channel.start_live_channel import *
from live_channel.stop_live_channel import *

from live_input.create_live_input import *
from live_input.live_input_types import *

from schedule_event.add_asset_schedule_event import *
from schedule_event.add_input_schedule_event import *
from schedule_event.remove_input_schedule_event import *

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

        CHANNEL_TYPE = input("Enter the type of channel you want to create\n (External, IVS, Normal): ")


        # Create Live Channel object
        CHANNEL_OBJECT = {
            "name": CHANNEL_NAME,
            "route": slugify(CHANNEL_NAME),
            "type": LIVE_CHANNEL_TYPES[CHANNEL_TYPE],
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
        print(json.dumps(ADD_ASSET_SCHEDULE_EVENT_RESPONSE, indent=4))

    except:
        raise Exception("Live Channel creation failed")

    
def create_live_input_main(AUTH_TOKEN):
    try:
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

        INPUT_TYPE = "URL_PULL"
        print(f"Enter the type of input you want to create\n (RTMP_PULL, RTMP_PUSH, RTP_PUSH, URL_PULL): {INPUT_TYPE}")

        # Create Live Input object
        INPUT_OBJECT = {
            "name": INPUT_NAME,
            "internalName": slugify(INPUT_NAME),
            "type": LIVE_INPUT_TYPES[INPUT_TYPE], # NOTE: Replace type if needed
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
    except:
        raise Exception("Live Input creation failed")
        

def start_live_channel_main(AUTH_TOKEN):
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to start: ")
    
        # Give feedback to the console
        print("Starting the Live Channel: This could take a couple of minutes...")
    
        # Start the Live Channel
        start_live_channel(AUTH_TOKEN, CHANNEL_ID)
    
        # Give feedback to the console
        print("Live Channel was started successfully")
    except:
        raise Exception("Live Channel failed to start")
    

def stop_live_channel_main(AUTH_TOKEN):
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to stop: ")

        # Give feedback to the console
        print("Stopping the Live Channel: This could take a couple of minutes...")

        # Stop the Live Channel
        stop_live_channel(AUTH_TOKEN, CHANNEL_ID)

        # Give feedback to the console
        print("Live Channel was stopped successfully")
    except:
        raise Exception("Live Channel failed to stop")


def add_live_input_to_live_channel(AUTH_TOKEN):
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to add an input to: ")
        INPUT_ID = input("Enter the input id of the input you want to add to the channel: ")

        CHANNEL_INFO = get_live_channel(AUTH_TOKEN, CHANNEL_ID)
        SLATE_ID = CHANNEL_INFO["previousId"]
    
        # Create Live Input schedule event object
        EVENT_OBJECT = {
            "channelId": CHANNEL_ID,
            "inputId": INPUT_ID,
            "previousId": SLATE_ID
        }

        # Give feedback to the console
        print("Adding Live Input to the Live Channel...")

        # Add the Live Input event to Live Channel
        ADD_INPUT_SCHEDULE_EVENT_RESPONSE = add_input_schedule_event(AUTH_TOKEN, EVENT_OBJECT)

        # Check the response
        if (ADD_INPUT_SCHEDULE_EVENT_RESPONSE == None):
            raise Exception()
        
    except:
        raise Exception("Adding Live Input to the Live Channel failed")


def remove_live_input_from_live_channel(AUTH_TOKEN):
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to remove an input from: ")
        INPUT_ID = input("Enter the input id of the input you want to remove from the channel: ")

        # Give feedback to the console
        print("Removing Live Input from the Live Channel...")

        # Remove the Live Input event from Live Channel
        remove_input_schedule_event(AUTH_TOKEN)
        
    except:
        raise Exception("Removing Live Input from the Live Channel failed")
    

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
        raise Exception("Live Channel failed to Stop")
    
    
def delete_input(AUTH_TOKEN):
    INPUT_ID = input("Enter the input id of the input you want to delete: ")

    try:
        print("Deleting the Live Input...")

        # Delete the Live Input
        delete_live_input(AUTH_TOKEN, INPUT_ID)

        # Give feedback to the console
        print("Live Input was deleted successfully")

        # Show successful message
        print("Live Input", "Live Input was deleted successfully")

    except:
        raise Exception("Live Input failed to delete")

if __name__ == "__main__":
    while True:
        AUTH_TOKEN = "eyJraWQiOiJkSkpRa3ZxdWxDekpqZEFmWTR0UGwrSytyWldVTE5OTkR1YitYVnljaFNRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJjdXN0b206Y29udGFjdF9pZCI6ImU5YWIxNDFmLWMxMjgtNDE5Yi04YTQ3LWIzNTg1MTQwMzZkNyIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX1ZHRXhveTY0aSIsImNvZ25pdG86dXNlcm5hbWUiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJnaXZlbl9uYW1lIjoiU2NvdHQiLCJvcmlnaW5fanRpIjoiN2QwZjAxMTYtOTk0MS00MDQxLWFhMjUtM2VmNWRkOGM5MmEwIiwiYXVkIjoiNWUybm92MXAzYTZxNHM1MHZjamo1ZXNqYjciLCJldmVudF9pZCI6IjU4NzMwNzQxLTMzMWQtNGY0Yy05NWI5LTg4M2JkMWJhZjQyMSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjkwMzE4MjIyLCJleHAiOjE2OTAzMjE4MjIsImlhdCI6MTY5MDMxODIyMiwiZmFtaWx5X25hbWUiOiJGYWx1ZGkiLCJqdGkiOiJlODE5YzA5Zi03MjAwLTQ0OGYtOWU0Yy05YzEwOTdiYzhkOGQiLCJlbWFpbCI6InNmYWx1ZGlAbm9tYWQtY21zLmNvbSJ9.uNziZtgHBY2yJnEAdJYnntLlX1LhN5U_lyemQEDNASjd38mRFIZff6NyFnBxLPUdl5e3R_73J2GR1oPbZ5eJXdrTyd1XDFSQ4SG68HFvBUyvfbsZYesnNX0gDC2eB_wVWCkHlY85wqGEWEGxd3QZpwbP9zE0fl4EWXUb9j_gZ7FRDahagCtrhgbBfMn-8h_ibrbc4vzo3xgh862WmIqR7civpdZ3gpXxNkpPjaGaQGcvjHtz4inUS-OcQhV81Pnjf987w_PH4HqhEi3hvf54bIfg-Nkq0Ox1VZFEyJqufABhZ-MP2FyNaUiJmGpgFczYpPxbzCtj0t70dNj0UNfNEg"
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

