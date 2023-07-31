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
from live_channel.update_live_channel import *

from live_input.create_live_input import *
from live_input.delete_live_input import *
from live_input.live_input_types import *
from live_input.update_live_input import *

from schedule_event.add_asset_schedule_event import *
from schedule_event.remove_asset_schedule_event import *
from schedule_event.add_input_schedule_event import *
from schedule_event.remove_input_schedule_event import *

def create_live_channel_main(AUTH_TOKEN):

    try:
        # Create common random suffix for both, Live Channel and input, names
        while True:
            #test
            NAME = input("Enter Live Channel Name: ")

            UNIQUE = check_channel_names(AUTH_TOKEN, NAME)

            if UNIQUE:
                break

            print(f"Channel Name {NAME} is already taken")

        THUMBNAIL_IMAGE = input("Enter the thumbnail image URL: ")
        FOLDER_ID = input("Enter the id of the folder you want to archive to: ")

        ENABLE_HIGH_AVAILABLIITY = input("Do you want to enable high availability (y/n)?: ") == "y"
        ENABLE_LIVE_CLIPPING = input("Do you want to enable live clipping (y/n)?: ") == "y"
        IS_SECURE_OUTPUT = input("Do you want to enable secure output (y/n)?: ") == "y"
        OUTPUT_SCREENSHOTS = input("Do you want to enable output screenshots (y/n)?: ") == "y"

        TYPE = input("Enter the type of channel you want to create (External, IVS, Normal, Realtime): ")

        if TYPE == "External":
            URL = input("Enter the URL of the channel: ")
        else:
            URL = None

        # Give feedback to the console
        print(f"Creating Live Channel [{NAME}]...")

        # Create the channel
        CHANNEL_RESPONSE = create_live_channel(AUTH_TOKEN, NAME, THUMBNAIL_IMAGE, FOLDER_ID, 
                                               ENABLE_HIGH_AVAILABLIITY, ENABLE_LIVE_CLIPPING,
                                               IS_SECURE_OUTPUT, OUTPUT_SCREENSHOTS, TYPE, URL)
        
        # Check for errors
        if CHANNEL_RESPONSE == None or not "id" in CHANNEL_RESPONSE:
            print("Creating Channel failed")
            raise Exception()

        print(json.dumps(CHANNEL_RESPONSE, indent=4))

    except:
        raise Exception("Creating live channel failed")


def update_live_channel_main(AUTH_TOKEN):
    try:
        ID = input("Enter the channel id of the channel you want to update: ")

        # Create common random suffix for both, Live Channel and input, names
        while True:
            #test
            NAME = input("Enter Live Channel Name: ")

            UNIQUE = check_channel_names(AUTH_TOKEN, NAME)

            if UNIQUE:
                break

            print(f"Channel Name {NAME} is already taken")

        THUMBNAIL_IMAGE = input("Enter the thumbnail image URL: ")
        FOLDER_ID = input("Enter the id of the folder you want to archive to: ")

        ENABLE_HIGH_AVAILABLIITY = input("Do you want to enable high availability (y/n)?: ") == "y"
        ENABLE_LIVE_CLIPPING = input("Do you want to enable live clipping (y/n)?: ") == "y"
        IS_SECURE_OUTPUT = input("Do you want to enable secure output (y/n)?: ") == "y"
        OUTPUT_SCREENSHOTS = input("Do you want to enable output screenshots (y/n)?: ") == "y"

        TYPE = input("Enter the type of channel you want to create (External, IVS, Normal, Realtime): ")

        if TYPE == "External":
            URL = input("Enter the URL of the channel: ")
        else:
            URL = None

        # Give feedback to the console
        print(f"Updating Live Channel [{NAME}]...")

        # Create the channel
        CHANNEL_RESPONSE = update_live_channel(AUTH_TOKEN, ID, NAME, THUMBNAIL_IMAGE, FOLDER_ID, 
                                               ENABLE_HIGH_AVAILABLIITY, ENABLE_LIVE_CLIPPING,
                                               IS_SECURE_OUTPUT, OUTPUT_SCREENSHOTS, TYPE, URL)

        # Check for errors
        if CHANNEL_RESPONSE == None or not "id" in CHANNEL_RESPONSE:
            print("Updating Channel failed")
            raise Exception()

        return CHANNEL_RESPONSE

    except:
        raise Exception("Updating live channel failed")

    
def add_asset_schedule_event_to_channel(AUTH_TOKEN):
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to add an asset to: ")

        ASSET_ID = input(f"Enter the asset id of the asset you want to add to the channel: ")

        # Give feedback to the console
        print("Adding asset schedule event to the live channel...")

        # Add slate to the channel
        ADD_ASSET_SCHEDULE_EVENT_RESPONSE = add_asset_schedule_event(AUTH_TOKEN, new_guid(), CHANNEL_ID, ASSET_ID, None)
        print(json.dumps(ADD_ASSET_SCHEDULE_EVENT_RESPONSE, indent=4))

    except:
        raise Exception("Adding asset schedule event to channel failed")


def remove_asset_schedule_event_from_channel(AUTH_TOKEN):
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to remove an asset from: ")
        SCHEDULE_EVENT_ID = input("Enter the schedule event id of the asset you want to remove from the channel: ")

        print("Removing asset schedule event from the live channel...")
        remove_asset_schedule_event(AUTH_TOKEN, CHANNEL_ID, SCHEDULE_EVENT_ID)
        print("Asset schedule event was removed successfully")

    except:
        raise Exception("Removing asset schedule event from channel failed")
    

def create_live_input_main(AUTH_TOKEN):
    try:
        # Set the Live Input name
        while True:
            NAME = input("Enter Live Input Name: ")

            UNIQUE = check_input_names(AUTH_TOKEN, NAME)

            if UNIQUE:
                break

            print(f"Input Name {NAME} is already taken")

        while True:
            TYPE = "URL_PULL"
            print(f"Enter the type of input you want to create (RTMP_PULL, RTMP_PUSH, RTP_PUSH, UPD_PUSH, URL_PULL): {TYPE}")

            if TYPE == "RTMP_PULL" or TYPE == "RPT_PULL" or TYPE == "URL_PULL":
                print("Must start with http or rtmp")
                SOURCE = "https://e80d652dc035f381411f071289929a20.p05sqb.channel-assembly.mediatailor.us-west-2.amazonaws.com/v1/channel/MyTestChannel/index.m3u8"
                print(f"Enter Source: {SOURCE}")
                break
            elif TYPE == "RTMP_PUSH":
                print("Please use the following format: ###.###.###.###/##")
                SOURCE = input("Enter Source Video IP/CIDR Address: ")
                break
            elif TYPE == "UPD_PUSH":
                SOURCE = None
                break
            else:
                print("Invalid input")

        # Give feedback to the console
        print("Creating Live Input...")

        # Create the input
        INPUT_RESPONSE = create_live_input(AUTH_TOKEN, NAME, TYPE, SOURCE)

        # Check for errors
        if INPUT_RESPONSE == None or not "id" in INPUT_RESPONSE:
            raise Exception()

        print(json.dumps(INPUT_RESPONSE, indent=4))

    except:
        raise Exception("Creating live input failed")
        

def update_live_input_main(AUTH_TOKEN):
    try:
        ID = input("Enter the input id of the input you want to update: ")

        # Set the Live Input name
        while True:
            NAME = input("Enter Live Input Name: ")

            UNIQUE = check_input_names(AUTH_TOKEN, NAME)

            if UNIQUE:
                break

            print(f"Input Name {NAME} is already taken")

        while True:
            TYPE = "UDP_PUSH"
            print(f"Enter the type of input you want to create (RTMP_PULL, RTMP_PUSH, RTP_PUSH, UDP_PUSH, URL_PULL): {TYPE}")

            if TYPE == "RTMP_PULL" or TYPE == "RTP_PUSH" or TYPE == "URL_PULL":
                print("Must start with http or rtmp")
                SOURCE = input("Enter Source: ")
                break
            elif TYPE == "RTMP_PUSH":
                print("Please use the following format: ###.###.###.###/##")
                SOURCE = input("Enter Source Video IP/CIDR Address: ")
                break
            elif TYPE == "UDP_PUSH":
                SOURCE = None
                break
            else:
                print("Invalid input")

        # Give feedback to the console
        print("Updating Live Input...")

        # Update the input
        INPUT_RESPONSE = update_live_input(AUTH_TOKEN, ID, NAME, TYPE, SOURCE)

        # Check for errors
        if INPUT_RESPONSE == None or not "id" in INPUT_RESPONSE:
            raise Exception()
        
        print(json.dumps(INPUT_RESPONSE, indent=4))

    except:
        raise Exception("Updating live input failed")


def add_live_input_to_live_channel(AUTH_TOKEN):
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to add an input to: ")
        INPUT_ID = input("Enter the input id of the input you want to add to the channel: ")
        if input("Do you want to have a fixed on air time (y/n)?: ") == "y":
            ON_AIR_TIME = input("Enter the on air time of the input you want to add to the channel (hh:mm:ss): ")
        else:
            ON_AIR_TIME = None

        # Give feedback to the console
        print("Adding Live Input to the Live Channel...")

        # Add the Live Input event to Live Channel
        ADD_INPUT_SCHEDULE_EVENT_RESPONSE = add_input_schedule_event(AUTH_TOKEN, CHANNEL_ID, INPUT_ID, ON_AIR_TIME)

        # Check the response
        if (ADD_INPUT_SCHEDULE_EVENT_RESPONSE == None):
            raise Exception()
        
        print(json.dumps(ADD_INPUT_SCHEDULE_EVENT_RESPONSE, indent=4))
        
    except:
        raise Exception("Adding Live Input to the Live Channel failed")


def remove_live_input_from_live_channel(AUTH_TOKEN):
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to remove an input from: ")
        INPUT_ID = input("Enter the request id of the input you want to remove from the channel: ")

        # Give feedback to the console
        print("Removing Live Input from the Live Channel...")

        # Remove the Live Input event from Live Channel
        #remove_input_schedule_event(AUTH_TOKEN, CHANNEL_ID, INPUT_ID)

        print("Live Input was removed successfully")
        
    except:
        raise Exception("Removing Live Input from the Live Channel failed")
    


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


def delete_channel(AUTH_TOKEN):
    CHANNEL_ID = input("Enter the Channel id of the channel you want to delete: ")

    DELETE_LIVE_INPUTS = input("Do you want to delete the inputs of the channel (y/n)?: ") == "y"

    try:
        # Give feedback to the console
        print("Deleting the Live Channel...")

        # Delete the Live Channel
        delete_live_channel(AUTH_TOKEN, CHANNEL_ID, DELETE_LIVE_INPUTS)

        # Give feedback to the console
        print("Live Channel was stopped and deleted successfully")

    except:
        raise Exception("Failed to delete Live Channel")
    
    
def delete_input(AUTH_TOKEN):
    INPUT_ID = input("Enter the input id of the input you want to delete: ")

    try:
        print("Deleting the Live Input...")

        # Delete the Live Input
        delete_live_input(AUTH_TOKEN, INPUT_ID)

        # Give feedback to the console
        print("Live Input was deleted successfully")
    except:
        raise Exception("Live Input failed to delete")

if __name__ == "__main__":
    AUTH_TOKEN = "eyJraWQiOiJkSkpRa3ZxdWxDekpqZEFmWTR0UGwrSytyWldVTE5OTkR1YitYVnljaFNRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJjdXN0b206Y29udGFjdF9pZCI6ImU5YWIxNDFmLWMxMjgtNDE5Yi04YTQ3LWIzNTg1MTQwMzZkNyIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX1ZHRXhveTY0aSIsImNvZ25pdG86dXNlcm5hbWUiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJnaXZlbl9uYW1lIjoiU2NvdHQiLCJvcmlnaW5fanRpIjoiNDdhMDBiM2MtOWI0NS00NTY5LWFhNmYtNjJkZWZlZmU5NDUyIiwiYXVkIjoiNWUybm92MXAzYTZxNHM1MHZjamo1ZXNqYjciLCJldmVudF9pZCI6ImU4ZGJlZTQ2LTg0MGEtNGM4MS1hOTg5LTE3Y2I2OTVjYTBhZCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjkwNzY4NTY5LCJleHAiOjE2OTA3NzIxNjksImlhdCI6MTY5MDc2ODU2OSwiZmFtaWx5X25hbWUiOiJGYWx1ZGkiLCJqdGkiOiIwYWI2OGMzOS00OTYxLTQ2NDUtOGNkMS01MTQ5NzhhNWEzZmYiLCJlbWFpbCI6InNmYWx1ZGlAbm9tYWQtY21zLmNvbSJ9.NPHmwfYMsXkN_i4mv-XKws6HgARmUKUfl_x2qnKYICu5eD_zVOUXJUm7S0FDvKP_XVJEXE4CUqsSTVbfSh4n28B7I1mPM1j3_L02yil-SEBnI-awVXlmZs6qAt3YJAqLXSnAMUefwfEqaOWA7boLnllsOrJQmZxEayu_xQnv6iytcDzGic2xu9aEVH7O0wGp61ItBj87wJ-kXwMC0rhjGmdxL4YhMfnK92R-5Wz-idGyYzLoLtxRNWjV1qdQG1Pr4Y4_Ye4xXxznTQz2i_8psfjUWpHq0G4OImYZRnQnr66spZhqaoTa1A7sXLKK0BjA8hdHPMWSkg8NgW1DRqX8Nw"
    print(f"Enter authentication token: {AUTH_TOKEN}")

    while True:
        print("Do you want to create a live channel, create a live input, update a live channel, "\
              "add an asset schedule event, remove an asset schedule event, update a live input, "\
              "start a live channel, stop a live channel, add a live input to a live channel, remove "\
              "an input from a channel, delete a live channel, delete a live input, or exit")
        USER_INPUT = input("Enter create channel, create input, update channel, update input, "\
                           "add event, remove event, start channel, stop channel, add input, "\
                           "remove input, delete channel, delete input, or exit for each option "\
                           "above respectivly: ")
        if USER_INPUT == "create channel":
            create_live_channel_main(AUTH_TOKEN)

        elif USER_INPUT == "create input":
            create_live_input_main(AUTH_TOKEN)

        elif USER_INPUT == "update channel":
            update_live_channel_main(AUTH_TOKEN)

        elif USER_INPUT == "update input":
            update_live_input_main(AUTH_TOKEN)

        elif USER_INPUT == "add event":
            add_asset_schedule_event_to_channel(AUTH_TOKEN)

        elif USER_INPUT == "remove event":
            remove_asset_schedule_event_from_channel(AUTH_TOKEN)

        elif USER_INPUT == "start channel":
            start_live_channel_main(AUTH_TOKEN)

        elif USER_INPUT == "stop channel":
            stop_live_channel_main(AUTH_TOKEN)

        elif USER_INPUT == "add input":
            add_live_input_to_live_channel(AUTH_TOKEN)

        elif USER_INPUT == "remove input":
            remove_live_input_from_live_channel(AUTH_TOKEN)

        elif USER_INPUT == "delete channel":
            delete_channel(AUTH_TOKEN)
    
        elif USER_INPUT == "delete input":
            delete_input(AUTH_TOKEN)

        elif USER_INPUT == "exit":
            break
            
        else:
            print("Invalid input") 

