import sys, os
sys.path.append(os.path.realpath('...'))

from nomad_media_pip.nomad_sdk import Nomad_SDK
from config import config

nomad_sdk = Nomad_SDK(config)

import json

def check_channel_names(name):
    CHANNELS = nomad_sdk.get_live_channels()

    return next((True for channel in CHANNELS if channel["name"] == name), False)

def check_input_names(name):
    INPUTS = nomad_sdk.get_live_inputs()

    return next((True for input in INPUTS if input["name"] == name), False)

def get_channels_main():
    try:
        # Give feedback to the console
        print("Getting Live Channels...")

        # Get the channels
        CHANNELS_RESPONSE = nomad_sdk.get_live_channels()

        # Give feedback to the console
        print(json.dumps(CHANNELS_RESPONSE, indent=4))

    except:
        raise Exception("Getting live channels failed")
    

def get_channel_main():
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to get: ")

        # Give feedback to the console
        print("Getting the Live Channel...")

        # Get the channel
        CHANNEL_RESPONSE = nomad_sdk.get_live_channel(CHANNEL_ID)

        # Give feedback to the console
        print(json.dumps(CHANNEL_RESPONSE, indent=4))

    except:
        raise Exception("Getting live channel failed")
    

def get_inputs_main():
    try:
        # Give feedback to the console
        print("Getting Live Inputs...")

        # Get the inputs
        INPUTS_RESPONSE = nomad_sdk.get_live_inputs()

        # Give feedback to the console
        print(json.dumps(INPUTS_RESPONSE, indent=4))

    except:
        raise Exception("Getting live inputs failed")
    

def get_input_main():
    try:
        INPUT_ID = input("Enter the input id of the input you want to get: ")

        # Give feedback to the console
        print("Getting the Live Input...")

        # Get the input
        INPUT_RESPONSE = nomad_sdk.get_live_input(INPUT_ID)

        # Give feedback to the console
        print(json.dumps(INPUT_RESPONSE, indent=4))

    except:
        raise Exception("Getting live input failed")


def create_live_channel_main():

    try:
        # Create common random suffix for both, Live Channel and input, names
        while True:
            #test
            NAME = input("Enter Live Channel Name: ")

            UNIQUE = check_channel_names(NAME)

            if UNIQUE:
                break

            print(f"Channel Name {NAME} is already taken")

        THUMBNAIL_IMAGE = input("Enter the thumbnail image URL: ") if input("Do you want to add a thumbnail image (y/n)?: ") == "y" else None
        FOLDER_ID = input("Enter the id of the folder you want to archive to: ") if input("Do you want to archive to a folder (y/n)?: ") == "y" else None

        ENABLE_HIGH_AVAILABLIITY = input("Do you want to enable high availability (y/n)?: ") == "y"
        ENABLE_LIVE_CLIPPING = input("Do you want to enable live clipping (y/n)?: ") == "y"
        IS_SECURE_OUTPUT = input("Do you want to enable secure output (y/n)?: ") == "y"
        OUTPUT_SCREENSHOTS = input("Do you want to enable output screenshots (y/n)?: ") == "y"

        TYPE = input("Enter the type of channel you want to create (External, IVS, Normal, Realtime): ")

        if TYPE == "External":
            URL = input("Enter the URL of the channel: ")
        else:
            URL = None

        print("Securtiy groups: Content Manager, Everyone, Guest")
        SECURITY_GROUPS = input("Enter the security groups of the channel (separated by comma): ").split(",") if input("Do you want to add security groups (y/n)?: ") == "y" else None

        # Give feedback to the console
        print(f"Creating Live Channel [{NAME}]...")

        # Create the channel
        CHANNEL_RESPONSE = nomad_sdk.create_live_channel(NAME, THUMBNAIL_IMAGE, FOLDER_ID, 
                                               ENABLE_HIGH_AVAILABLIITY, ENABLE_LIVE_CLIPPING,
                                               IS_SECURE_OUTPUT, OUTPUT_SCREENSHOTS, TYPE, URL,
                                               SECURITY_GROUPS)
        
        # Check for errors
        if CHANNEL_RESPONSE == None or not "id" in CHANNEL_RESPONSE:
            print("Creating Channel failed")
            raise Exception()

        print(json.dumps(CHANNEL_RESPONSE, indent=4))

    except:
        raise Exception("Creating live channel failed")


def update_live_channel_main():
    try:
        ID = input("Enter the channel id of the channel you want to update: ")

        # Create common random suffix for both, Live Channel and input, names
        while True:
            NAME = input("Enter Live Channel Name: ")

            UNIQUE = check_channel_names(NAME)

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

        print("Securtiy groups: Content Manager, Everyone, Guest")
        SECURITY_GROUPS = input("Enter the security groups of the channel (separated by comma): ").split(",") if input("Do you want to add security groups (y/n)?: ") == "y" else None

        # Give feedback to the console
        print(f"Updating Live Channel [{NAME}]...")

        # Create the channel
        CHANNEL_RESPONSE = nomad_sdk.update_live_channel(ID, NAME, THUMBNAIL_IMAGE, FOLDER_ID, 
                                               ENABLE_HIGH_AVAILABLIITY, ENABLE_LIVE_CLIPPING,
                                               IS_SECURE_OUTPUT, OUTPUT_SCREENSHOTS, TYPE, URL,
                                               SECURITY_GROUPS)

        # Check for errors
        if CHANNEL_RESPONSE == None or not "id" in CHANNEL_RESPONSE:
            print("Updating Channel failed")
            raise Exception()

        return CHANNEL_RESPONSE

    except:
        raise Exception("Updating live channel failed")

    
def add_asset_schedule_event_to_channel():
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to add an asset to: ")
        ASSET_ID = input("Enter the asset id of the asset you want to add to the channel: ")
        IS_LOOP = input("Do you want to loop the input (y/n)?: ") == "y"
        DURATION_TIME_CODE = input("Enter the duration of the asset you want to add to the channel (hh:mm:ss): ") if input("Do you want to set a duration (y/n)?: ") == "y" else None
        PREVIOUS_ID = input("Enter the schedule event id of the previous asset you want to add to the channel: ") if input("Do you want to set a previous asset (y/n)?: ") == "y" else None

        # Give feedback to the console
        print("Adding asset schedule event to the live channel...")

        # Add slate to the channel
        ADD_ASSET_SCHEDULE_EVENT_RESPONSE = nomad_sdk.add_asset_schedule_event(CHANNEL_ID, ASSET_ID, IS_LOOP,
                                                                               DURATION_TIME_CODE, PREVIOUS_ID)
        print(json.dumps(ADD_ASSET_SCHEDULE_EVENT_RESPONSE, indent=4))

    except:
        raise Exception("Adding asset schedule event to channel failed")


def remove_asset_schedule_event_from_channel():
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to remove an asset from: ")
        SCHEDULE_EVENT_ID = input("Enter the schedule event id of the asset you want to remove from the channel: ")

        print("Removing asset schedule event from the live channel...")
        nomad_sdk.remove_asset_schedule_event(CHANNEL_ID, SCHEDULE_EVENT_ID)
        print("Asset schedule event was removed successfully")

    except:
        raise Exception("Removing asset schedule event from channel failed")
    

def create_live_input_main():
    try:
        # Set the Live Input name
        while True:
            NAME = input("Enter Live Input Name: ")

            UNIQUE = check_input_names(NAME)

            if UNIQUE:
                break

            print(f"Input Name {NAME} is already taken")

        while True:
            TYPE = input("Enter the type of input you want to create (RTMP_PULL, RTMP_PUSH, RTP_PUSH, UDP_PUSH, URL_PULL): ")

            if TYPE == "RTMP_PULL" or TYPE == "RPT_PULL" or TYPE == "URL_PULL":
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

        IS_STANDARD = input("Do you want to enable standard mode (y/n)?: ") == "y"
        VIDEO_ASSET_ID = input("Enter the asset id of the video asset you want to add to the input: ") if input("Do you want to add a video asset (y/n)?: ") == "y" else None
        DESTINATIONS = input("Enter the destinations of the input (separated by comma): ").split(",") if input("Do you want to add destinations (y/n)?: ") == "y" else None
        SOURCES = input("Enter the sources of the input (separated by comma): ").split(",") if input("Do you want to add sources (y/n)?: ") == "y" else None

        # Give feedback to the console
        print("Creating Live Input...")

        # Create the input
        INPUT_RESPONSE = nomad_sdk.create_live_input(NAME, TYPE, SOURCE, IS_STANDARD, VIDEO_ASSET_ID,
                                                     DESTINATIONS, SOURCES)

        # Check for errors
        if INPUT_RESPONSE == None or not "id" in INPUT_RESPONSE:
            raise Exception()

        print(json.dumps(INPUT_RESPONSE, indent=4))

    except:
        raise Exception("Creating live input failed")
        

def update_live_input_main():
    try:
        ID = input("Enter the input id of the input you want to update: ")

        # Set the Live Input name
        while True:
            NAME = input("Enter Live Input Name: ")

            INPUTS = nomad_sdk.get_live_inputs()

            UNIQUE = check_input_names(NAME)

            if UNIQUE:
                break

            print(f"Input Name {NAME} is already taken")

        while True:
            TYPE = input("Enter the type of input you want to create (RTMP_PULL, RTMP_PUSH, RTP_PUSH, UDP_PUSH, URL_PULL): ")

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

        IS_STANDARD = input("Do you want to enable standard mode (y/n)?: ") == "y"
        VIDEO_ASSET_ID = input("Enter the asset id of the video asset you want to add to the input: ") if input("Do you want to add a video asset (y/n)?: ") == "y" else None
        DESTINATIONS = input("Enter the destinations of the input (separated by comma): ").split(",") if input("Do you want to add destinations (y/n)?: ") == "y" else None
        SOURCES = input("Enter the sources of the input (separated by comma): ").split(",") if input("Do you want to add sources (y/n)?: ") == "y" else None

        # Give feedback to the console
        print("Updating Live Input...")

        # Update the input
        INPUT_RESPONSE = nomad_sdk.update_live_input(ID, NAME, TYPE, SOURCE, IS_STANDARD, VIDEO_ASSET_ID,
                                                     DESTINATIONS, SOURCES)

        # Check for errors
        if INPUT_RESPONSE == None or not "id" in INPUT_RESPONSE:
            raise Exception()
        
        print(json.dumps(INPUT_RESPONSE, indent=4))

    except:
        raise Exception("Updating live input failed")


def add_live_input_to_live_channel():
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to add an input to: ")
        LIVE_INPUT = {
            "id": input("Enter the input id of the input you want to add to the channel: "),
            "description": input("Enter the name of the input you want to add to the channel: ")
        }

        BACKUP_LIVE_INPUT = {}
        if input("Do you want to add a backup input (y/n)?: ") == "y":
            BACKUP_INPUT_ID = input("Enter the input id of the backup input you want to add to the channel: ")
            BACKUP_INPUT_NAME = input("Enter the name of the backup input you want to add to the channel: ")
            BACKUP_LIVE_INPUT = {"id": BACKUP_INPUT_ID, "description": BACKUP_INPUT_NAME}


        if input("Do you want to have a fixed on air time (y/n)?: ") == "y":
            ON_AIR_TIME = input("Enter the on air time of the input you want to add to the channel (hh:mm:ss): ")
        else:
            ON_AIR_TIME = None

        PREVIOUS_ID = input("Enter the schedule event id of the previous input you want to add to the channel: ") if input("Do you want to set a previous input (y/n)?: ") == "y" else None

        # Give feedback to the console
        print("Adding Live Input to the Live Channel...")

        # Add the Live Input event to Live Channel
        ADD_INPUT_SCHEDULE_EVENT_RESPONSE = nomad_sdk.add_input_schedule_event(CHANNEL_ID, LIVE_INPUT, BACKUP_LIVE_INPUT,
                                                                               ON_AIR_TIME, PREVIOUS_ID)

        # Check the response
        if (ADD_INPUT_SCHEDULE_EVENT_RESPONSE == None):
            raise Exception()
        
        print(json.dumps(ADD_INPUT_SCHEDULE_EVENT_RESPONSE, indent=4))
        
    except:
        raise Exception("Adding Live Input to the Live Channel failed")


def remove_live_input_from_live_channel():
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to remove an input from: ")
        INPUT_ID = input("Enter the request id of the input you want to remove from the channel: ")

        # Give feedback to the console
        print("Removing Live Input from the Live Channel...")

        # Remove the Live Input event from Live Channel
        nomad_sdk.remove_input_schedule_event(CHANNEL_ID, INPUT_ID)

        print("Live Input was removed successfully")
        
    except:
        raise Exception("Removing Live Input from the Live Channel failed")
    


def start_live_channel_main():
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to start: ")
    
        # Give feedback to the console
        print("Starting the Live Channel: This could take a couple of minutes...")
    
        # Start the Live Channel
        nomad_sdk.start_live_channel(CHANNEL_ID)
    
        # Give feedback to the console
        print("Live Channel was started successfully")
    except:
        raise Exception("Live Channel failed to start")
    

def stop_live_channel_main():
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to stop: ")

        # Give feedback to the console
        print("Stopping the Live Channel: This could take a couple of minutes...")

        # Stop the Live Channel
        nomad_sdk.stop_live_channel(CHANNEL_ID)

        # Give feedback to the console
        print("Live Channel was stopped successfully")
    except:
        raise Exception("Live Channel failed to stop")


def delete_channel():
    CHANNEL_ID = input("Enter the Channel id of the channel you want to delete: ")

    DELETE_LIVE_INPUTS = input("Do you want to delete the inputs of the channel (y/n)?: ") == "y"

    try:
        # Give feedback to the console
        print("Deleting the Live Channel...")

        # Delete the Live Channel
        nomad_sdk.delete_live_channel(CHANNEL_ID, DELETE_LIVE_INPUTS)

        # Give feedback to the console
        print("Live Channel was deleted successfully")

    except:
        raise Exception("Failed to delete Live Channel")
    
    
def delete_input():
    INPUT_ID = input("Enter the input id of the input you want to delete: ")

    try:
        print("Deleting the Live Input...")

        # Delete the Live Input
        nomad_sdk.delete_live_input(INPUT_ID)

        # Give feedback to the console
        print("Live Input was deleted successfully")
    except:
        raise Exception("Live Input failed to delete")


def get_live_operators_main():
    try:
        # Give feedback to the console
        print("Getting Live Operators...")

        # Get the Live Operators
        LIVE_OPERATORS_RESPONSE = nomad_sdk.get_live_operators()

        # Give feedback to the console
        print(json.dumps(LIVE_OPERATORS_RESPONSE, indent=4))

    except:
        raise Exception("Getting live operators failed")
    

def get_live_operator_main():
    try:
        ID = input("Enter the id of the live operator you want to get: ")

        # Give feedback to the console
        print("Getting the Live Operator...")

        # Get the Live Operator
        LIVE_OPERATOR_RESPONSE = nomad_sdk.get_live_operator(ID)

        # Give feedback to the console
        print(json.dumps(LIVE_OPERATOR_RESPONSE, indent=4))

    except:
        raise Exception("Getting live operator failed")


def start_broadcast_main():
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to start broadcasting: ")
        PREROLL_ASSET_ID = input("Enter the asset id of the preroll asset: ")
        POSTROLL_ASSET_ID = input("Enter the asset id of the postroll asset: ")
        LIVE_INPUT_ID = input("Enter the input id of the live input: ")
        RELATED_CONTENT_IDS = input("Enter the related content ids of the related content (separated by comma): ").split(",")
        TAGS_IDS = input("Enter the tags ids of the tags (separated by comma): ").split(",")

        # Give feedback to the console
        print("Starting the broadcast...")

        # Start the broadcast
        START_BROADCAST_RESPONSE = nomad_sdk.start_broadcast(CHANNEL_ID, PREROLL_ASSET_ID, 
                                                   POSTROLL_ASSET_ID, LIVE_INPUT_ID, 
                                                   RELATED_CONTENT_IDS, TAGS_IDS)

        # Give feedback to the console
        print("Broadcast was started successfully")
        print(json.dumps(START_BROADCAST_RESPONSE, indent=4))

    except:
        raise Exception("Broadcast failed to start")
    

def cancel_broadcast_main():
    try:
        ID = input("Enter the id of the broadcast you want to cancel: ")

        # Give feedback to the console
        print("Canceling the broadcast...")

        # Cancel the broadcast
        nomad_sdk.cancel_broadcast(ID)

        # Give feedback to the console
        print("Broadcast was canceled successfully")

    except:
        raise Exception("Broadcast failed to cancel")
    

def stop_broadcast_main():
    try:
        ID = input("Enter the id of the broadcast you want to stop: ")

        # Give feedback to the console
        print("Stopping the broadcast...")

        # Stop the broadcast
        nomad_sdk.stop_broadcast(ID)

        # Give feedback to the console
        print("Broadcast was stopped successfully")

    except:
        raise Exception("Broadcast failed to stop")
    

def get_completed_segments_main():
    try:
        ID = input("Enter the id of the live operator you want to get the segments from: ")

        # Give feedback to the console
        print("Getting segments...")

        # Get the segments
        SEGMENTS_RESPONSE = nomad_sdk.get_completed_segments(ID)

        # Give feedback to the console
        print(json.dumps(SEGMENTS_RESPONSE, indent=4))

    except:
        raise Exception("Getting segments failed")


def start_segment_main():
    try:
        ID = input("Enter the id of the segment you want to start: ")

        # Give feedback to the console
        print("Starting the segment...")

        # Start the segment
        nomad_sdk.start_segment(ID)

        # Give feedback to the console
        print("Segment was started successfully")

    except:
        raise Exception("Segment failed to start")
    

def cancel_segment_main():
    try:
        ID = input("Enter the id of the segment you want to cancel: ")

        # Give feedback to the console
        print("Canceling the segment...")

        # Cancel the segment
        nomad_sdk.cancel_segment(ID)

        # Give feedback to the console
        print("Segment was canceled successfully")

    except:
        raise Exception("Segment failed to cancel")


def complete_segment_main():
    try:
        ID = input("Enter the id of the segment you want to complete: ")
        RELATED_CONTENT_IDS = input("Enter the related content ids of the related content (separated by comma): ").split(",")
        TAGS_IDS = input("Enter the tags ids of the tags (separated by comma): ").split(",")

        # Give feedback to the console
        print("Completing the segment...")

        # Complete the segment
        nomad_sdk.complete_segment(ID, RELATED_CONTENT_IDS, TAGS_IDS)

        # Give feedback to the console
        print("Segment was completed successfully")

    except:
        raise Exception("Segment failed to complete")


if __name__ == "__main__":
    while True:
        print("Do you want to get live channels, get a live channel, create a live channel, "\
              "update a live channel, get live inputs, get a live input, create a live input, "\
              "update a live input, add an asset schedule event, remove an asset schedule event, "\
              "start a live channel, stop a live channel, add a live input to a live channel, remove "\
              "an input from a channel, delete a live channel, delete a live input, get all operators, "\
              "get a specific operator, start a broadcast, cancel a broadcast, stop a broadcast, "\
              "get all completed segments, start a segment, cancel a segment, complete a segment, or exit")
        USER_INPUT = input("Enter get channels, get channel, create channel, update channel, "\
                           "get inputs, get input, create input, update input, "\
                           "add event, remove event, start channel, stop channel, add input, "\
                           "remove input, delete channel, delete input, get operators, get operator, "\
                           "start broadcast, cancel broadcast, stop broadcast, get segments, start segment, "\
                           "cancel segment, complete segment, or exit for each option above respectivly: ")
        
        if USER_INPUT == "get channels":
            get_channels_main()

        elif USER_INPUT == "get channel":
            get_channel_main()
        
        elif USER_INPUT == "get inputs":
            get_inputs_main()

        elif USER_INPUT == "get input":
            get_input_main()
        
        elif USER_INPUT == "create channel":
            create_live_channel_main()

        elif USER_INPUT == "create input":
            create_live_input_main()

        elif USER_INPUT == "update channel":
            update_live_channel_main()

        elif USER_INPUT == "update input":
            update_live_input_main()

        elif USER_INPUT == "add event":
            add_asset_schedule_event_to_channel()

        elif USER_INPUT == "remove event":
            remove_asset_schedule_event_from_channel()

        elif USER_INPUT == "start channel":
            start_live_channel_main()

        elif USER_INPUT == "stop channel":
            stop_live_channel_main()

        elif USER_INPUT == "add input":
            add_live_input_to_live_channel()

        elif USER_INPUT == "remove input":
            remove_live_input_from_live_channel()

        elif USER_INPUT == "delete channel":
            delete_channel()
    
        elif USER_INPUT == "delete input":
            delete_input()

        elif USER_INPUT == "get operators":
            get_live_operators_main()

        elif USER_INPUT == "get operator":
            get_live_operator_main()

        elif USER_INPUT == "start broadcast":
            start_broadcast_main()

        elif USER_INPUT == "cancel broadcast":
            cancel_broadcast_main()

        elif USER_INPUT == "stop broadcast":
            stop_broadcast_main()

        elif USER_INPUT == "get segments":
            get_completed_segments_main()

        elif USER_INPUT == "start segment":
            start_segment_main()

        elif USER_INPUT == "cancel segment":
            cancel_segment_main()

        elif USER_INPUT == "complete segment":
            complete_segment_main()

        elif USER_INPUT == "exit":
            break
            
        else:
            print("Invalid input") 

