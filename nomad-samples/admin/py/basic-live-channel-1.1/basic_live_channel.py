import sys, os
sys.path.append(os.path.realpath('...'))

from nomad_media_pip.nomad_sdk import Nomad_SDK
from config import config

nomad_sdk = Nomad_SDK(config)

import json

def check_channel_names(name):
    CHANNELS = nomad_sdk.get_live_channels()

    return next((True for channel in CHANNELS if channel["name"] == name))

def check_input_names(name):
    INPUTS = nomad_sdk.get_live_inputs()

    return next((True for input in INPUTS if input["name"] == name))

def get_channels_main():
    try:
        CHANNELS_RESPONSE = nomad_sdk.get_live_channels()

        print(json.dumps(CHANNELS_RESPONSE, indent=4))

    except:
        raise Exception("Getting live channels failed")
def get_channel_main():
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to get: ")

        CHANNEL_RESPONSE = nomad_sdk.get_live_channel(CHANNEL_ID)

        print(json.dumps(CHANNEL_RESPONSE, indent=4))

    except:
        raise Exception("Getting live channel failed")
def inputs_main():
    try:

        INPUTS_RESPONSE = nomad_sdk.get_live_inputs()

        print(json.dumps(INPUTS_RESPONSE, indent=4))

    except:
        raise Exception("Getting live inputs failed")
def input_main():
    try:
        INPUT_ID = input("Enter the input id of the input you want to get: ")

        INPUT_RESPONSE = nomad_sdk.get_live_input(INPUT_ID)

        print(json.dumps(INPUT_RESPONSE, indent=4))

    except:
        raise Exception("Getting live input failed")

def live_channel_refresh_main():
    try:
        nomad_sdk.live_channel_refresh()

    except:
        raise Exception("Refreshing live channels failed")

def create_live_channel_main():
    try:
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

        SECURITY_GROUPS = input("Enter the security groups of the channel (separated by comma): ").split(",") if input("Do you want to add security groups (y/n)?: ") == "y" else None

        print(f"Creating Live Channel [{NAME}]...")

        CHANNEL_RESPONSE = nomad_sdk.create_live_channel(NAME, THUMBNAIL_IMAGE, FOLDER_ID, 
                                               ENABLE_HIGH_AVAILABLIITY, ENABLE_LIVE_CLIPPING,
                                               IS_SECURE_OUTPUT, OUTPUT_SCREENSHOTS, TYPE, URL,
                                               SECURITY_GROUPS)
        
        if CHANNEL_RESPONSE == None or not "id" in CHANNEL_RESPONSE:
            print("Creating Channel failed")
            raise Exception()

        print(json.dumps(CHANNEL_RESPONSE, indent=4))

    except:
        raise Exception("Creating live channel failed")

def clip_live_channel_main():
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to clip: ")
        START_TIME = input("Enter the start time of the clip (hh:mm:ss): ") if input("Do you want to set a start time (y/n)?: ") == "y" else None
        END_TIME = input("Enter the end time of the clip (hh:mm:ss): ") if input("Do you want to set a end time (y/n)?: ") == "y" else None
        NAME = input("Enter the name of the clip: ") if input("Do you want to set a name (y/n)?: ") == "y" else None
        OUTPUT_FOLDER_ID = input("Enter the id of the folder you want to archive to: ")
        TAGS_IDS = input("Enter the tags ids of the tags (separated by comma): ").split(",") if input("Do you want to add tags (y/n)?: ") == "y" else None
        COLLECTION_IDS = input("Enter the collection ids of the collections (separated by comma): ").split(",") if input("Do you want to add collections (y/n)?: ") == "y" else None
        RELATED_CONTENT_IDS = input("Enter the related content ids of the related content (separated by comma): ").split(",") if input("Do you want to add related content (y/n)?: ") == "y" else None
        VIDEO_BITRATE = input("Enter the video bitrate of the clip: ") if input("Do you want to set a video bitrate (y/n)?: ") == "y" else None
        AUDIO_TRACKS = input("Enter the audio tracks of the clip (separated by comma): ").split(",") if input("Do you want to set audio tracks (y/n)?: ") == "y" else None

        CLIP_RESPONSE = nomad_sdk.clip_live_channel(CHANNEL_ID, START_TIME, END_TIME, NAME, 
                                                    OUTPUT_FOLDER_ID, TAGS_IDS, COLLECTION_IDS,
                                                    RELATED_CONTENT_IDS, VIDEO_BITRATE, 
                                                    AUDIO_TRACKS)

        print(json.dumps(CLIP_RESPONSE, indent=4))

    except:
        raise Exception("Clipping live channel failed")
    
def get_next_event_main():
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to get the next event from: ")

        NEXT_EVENT_RESPONSE = nomad_sdk.next_event(CHANNEL_ID)

        print(json.dumps(NEXT_EVENT_RESPONSE, indent=4))

    except:
        raise Exception("Getting next event failed")
    
def start_output_tracking_main():
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to start output tracking: ")

        OUTPUT_TRACKING_RESPONSE = nomad_sdk.start_output_tracking(CHANNEL_ID)

        print(json.dumps(OUTPUT_TRACKING_RESPONSE, indent=4))

    except:
        raise Exception("Starting output tracking failed")

def update_live_channel_main():
    try:
        ID = input("Enter the channel id of the channel you want to update: ")

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

        SECURITY_GROUPS = input("Enter the security groups of the channel (separated by comma): ").split(",") if input("Do you want to add security groups (y/n)?: ") == "y" else None

        print(f"Updating Live Channel [{NAME}]...")

        CHANNEL_RESPONSE = nomad_sdk.update_live_channel(ID, NAME, THUMBNAIL_IMAGE, FOLDER_ID, 
                                               ENABLE_HIGH_AVAILABLIITY, ENABLE_LIVE_CLIPPING,
                                               IS_SECURE_OUTPUT, OUTPUT_SCREENSHOTS, TYPE, URL,
                                               SECURITY_GROUPS)

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


        ADD_ASSET_SCHEDULE_EVENT_RESPONSE = nomad_sdk.add_asset_schedule_event(CHANNEL_ID, {"id": ASSET_ID}, IS_LOOP,
                                                                               DURATION_TIME_CODE, PREVIOUS_ID)
        print(json.dumps(ADD_ASSET_SCHEDULE_EVENT_RESPONSE, indent=4))

    except:
        raise Exception("Adding asset schedule event to channel failed")

def get_asset_schedule_event():
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to get an asset from: ")
        SCHEDULE_EVENT_ID = input("Enter the schedule event id of the asset you want to get from the channel: ")

        SCHEDULE_EVENT_RESPONSE = nomad_sdk.get_asset_schedule_event(CHANNEL_ID, SCHEDULE_EVENT_ID)

        print(json.dumps(SCHEDULE_EVENT_RESPONSE, indent=4))
    except:
        raise Exception("Getting asset schedule event failed")
    
def update_asset_schedule_event():
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to update an asset from: ")
        SCHEDULE_EVENT_ID = input("Enter the schedule event id of the asset you want to update from the channel: ")

        ASSET_ID = input("Enter the asset id of the asset you want to update from the channel: ") if input("Do you want to update the asset id (y/n)?: ") == "y" else None
        IS_LOOP = input("Do you want to loop the input (y/n)?: ") == "y"
        DURATION_TIME_CODE = input("Enter the duration of the asset you want to update from the channel (hh:mm:ss): ") if input("Do you want to set a duration (y/n)?: ") == "y" else None

        if ASSET_ID:
            ASSET = {"id": ASSET_ID}
        else:
            ASSET = None

        UPDATE_ASSET_SCHEDULE_EVENT_RESPONSE = nomad_sdk.update_asset_schedule_event(SCHEDULE_EVENT_ID, CHANNEL_ID,
                                                                                     ASSET, IS_LOOP,
                                                                                     DURATION_TIME_CODE)
        print(json.dumps(UPDATE_ASSET_SCHEDULE_EVENT_RESPONSE, indent=4))

    except:
        raise Exception("Updating asset schedule event from channel failed")

def remove_asset_schedule_event_from_channel():
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to remove an asset from: ")
        SCHEDULE_EVENT_ID = input("Enter the schedule event id of the asset you want to remove from the channel: ")

        nomad_sdk.remove_asset_schedule_event(CHANNEL_ID, SCHEDULE_EVENT_ID)

    except:
        raise Exception("Removing asset schedule event from channel failed")
    
def move_asset_schedule_event_in_channel():
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to move an asset from: ")
        SCHEDULE_EVENT_ID = input("Enter the schedule event id of the asset you want to move from the channel: ")
        PREVIOUS_ID = input("Enter the schedule event id of the previous asset you want to move from the channel: ")

        MOVE_ASSET_SCHEDULE_EVENT = nomad_sdk.move_schedule_event(CHANNEL_ID, SCHEDULE_EVENT_ID, PREVIOUS_ID)

        print(json.dumps(MOVE_ASSET_SCHEDULE_EVENT, indent=4))

    except:
        raise Exception("Moving asset schedule event in channel failed")
    
def create_live_input_main():
    try:
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


        INPUT_RESPONSE = nomad_sdk.create_live_input(NAME, TYPE, SOURCE, IS_STANDARD, VIDEO_ASSET_ID,
                                                     DESTINATIONS, SOURCES)

        if INPUT_RESPONSE == None or not "id" in INPUT_RESPONSE:
            raise Exception()

        print(json.dumps(INPUT_RESPONSE, indent=4))

    except:
        raise Exception("Creating live input failed")
        

def update_live_input_main():
    try:
        ID = input("Enter the input id of the input you want to update: ")

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

        INPUT_RESPONSE = nomad_sdk.update_live_input(ID, NAME, TYPE, SOURCE, IS_STANDARD, VIDEO_ASSET_ID,
                                                     DESTINATIONS, SOURCES)

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


        ADD_INPUT_SCHEDULE_EVENT_RESPONSE = nomad_sdk.add_input_schedule_event(CHANNEL_ID, LIVE_INPUT, BACKUP_LIVE_INPUT,
                                                                               ON_AIR_TIME, PREVIOUS_ID)
        if (ADD_INPUT_SCHEDULE_EVENT_RESPONSE == None):
            raise Exception()
        
        print(json.dumps(ADD_INPUT_SCHEDULE_EVENT_RESPONSE, indent=4))
        
    except:
        raise Exception("Adding Live Input to the Live Channel failed")

def get_live_input_schedule_event():
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to get an input from: ")
        INPUT_ID = input("Enter the request id of the input you want to get from the channel: ")

        INPUT_RESPONSE = nomad_sdk.get_input_schedule_event(CHANNEL_ID, INPUT_ID)

        print(json.dumps(INPUT_RESPONSE, indent=4))
    except:
        raise Exception("Getting live input schedule event failed")
    
def update_live_input_schedule_event():
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to update an input from: ")
        EVENT_ID = input("Enter the event id of the input you want to update from the channel: ")

        LIVE_INPUT_ID = input("Enter the input id of the input you want to update from the channel: ") if input("Do you want to update the input id (y/n)?: ") == "y" else None
        LIVE_INPUT = {"id": LIVE_INPUT_ID} if LIVE_INPUT_ID else None

        BACKUP_LIVE_INPUT_ID = input("Enter the input id of the backup input you want to update from the channel: ") if input("Do you want to update the backup input id (y/n)?: ") == "y" else None
        BACKUP_LIVE_INPUT = {"id": BACKUP_LIVE_INPUT_ID} if BACKUP_LIVE_INPUT_ID else None

        if input("Do you want to have a fixed on air time (y/n)?: ") == "y":
            ON_AIR_TIME = input("Enter the on air time of the input you want to update from the channel (hh:mm:ss): ")
        else:
            ON_AIR_TIME = None

        UPDATE_INPUT_SCHEDULE_EVENT_RESPONSE = nomad_sdk.update_input_schedule_event(EVENT_ID, CHANNEL_ID,
                                                                                     LIVE_INPUT, BACKUP_LIVE_INPUT,
                                                                                     ON_AIR_TIME)
        print(json.dumps(UPDATE_INPUT_SCHEDULE_EVENT_RESPONSE, indent=4))

    except:
        raise Exception("Updating live input schedule event from channel failed")

def remove_live_input_from_live_channel():
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to remove an input from: ")
        INPUT_ID = input("Enter the request id of the input you want to remove from the channel: ")

        nomad_sdk.remove_input_schedule_event(CHANNEL_ID, INPUT_ID)

    except:
        raise Exception("Removing Live Input from the Live Channel failed")

def start_live_channel_main():
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to start: ")    
        nomad_sdk.start_live_channel(CHANNEL_ID)   
    except:
        raise Exception("Live Channel failed to start")
def stop_live_channel_main():
    try:
        CHANNEL_ID = input("Enter the channel id of the channel you want to stop: ")


        nomad_sdk.stop_live_channel(CHANNEL_ID)

    except:
        raise Exception("Live Channel failed to stop")


def delete_channel():
    CHANNEL_ID = input("Enter the Channel id of the channel you want to delete: ")
    DELETE_LIVE_INPUTS = input("Do you want to delete the inputs of the channel (y/n)?: ") == "y"

    try:
        nomad_sdk.delete_live_channel(CHANNEL_ID, DELETE_LIVE_INPUTS)


    except:
        raise Exception("Failed to delete Live Channel")    
def delete_input():
    INPUT_ID = input("Enter the input id of the input you want to delete: ")

    try:
        nomad_sdk.delete_live_input(INPUT_ID)

    except:
        raise Exception("Live Input failed to delete")


def get_live_operators_main():
    try:
        LIVE_OPERATORS_RESPONSE = nomad_sdk.get_live_operators()

        print(json.dumps(LIVE_OPERATORS_RESPONSE, indent=4))

    except:
        raise Exception("Getting live operators failed")
def get_live_operator_main():
    try:
        ID = input("Enter the id of the live operator you want to get: ")

        LIVE_OPERATOR_RESPONSE = nomad_sdk.get_live_operator(ID)

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


        START_BROADCAST_RESPONSE = nomad_sdk.start_broadcast(CHANNEL_ID, PREROLL_ASSET_ID, 
                                                   POSTROLL_ASSET_ID, LIVE_INPUT_ID, 
                                                   RELATED_CONTENT_IDS, TAGS_IDS)

        print(json.dumps(START_BROADCAST_RESPONSE, indent=4))

    except:
        raise Exception("Broadcast failed to start")
def cancel_broadcast_main():
    try:
        ID = input("Enter the id of the broadcast you want to cancel: ")

        nomad_sdk.cancel_broadcast(ID)

    except:
        raise Exception("Broadcast failed to cancel")
def stop_broadcast_main():
    try:
        ID = input("Enter the id of the broadcast you want to stop: ")

        nomad_sdk.stop_broadcast(ID)


    except:
        raise Exception("Broadcast failed to stop")
def get_completed_segments_main():
    try:
        ID = input("Enter the id of the live operator you want to get the segments from: ")

        SEGMENTS_RESPONSE = nomad_sdk.get_completed_segments(ID)

        print(json.dumps(SEGMENTS_RESPONSE, indent=4))

    except:
        raise Exception("Getting segments failed")


def start_segment_main():
    try:
        ID = input("Enter the id of the segment you want to start: ")

        nomad_sdk.start_segment(ID)

    except:
        raise Exception("Segment failed to start")
def cancel_segment_main():
    try:
        ID = input("Enter the id of the segment you want to cancel: ")


        nomad_sdk.cancel_segment(ID)


    except:
        raise Exception("Segment failed to cancel")


def complete_segment_main():
    try:
        ID = input("Enter the id of the segment you want to complete: ")
        RELATED_CONTENT_IDS = input("Enter the related content ids of the related content (separated by comma): ").split(",")
        TAGS_IDS = input("Enter the tags ids of the tags (separated by comma): ").split(",")


        nomad_sdk.complete_segment(ID, RELATED_CONTENT_IDS, TAGS_IDS)


    except:
        raise Exception("Segment failed to complete")


if __name__ == "__main__":
    while True:
        print("Do you want to get live channels, get a live channel, live channel refresh, create a live "\
              "channel, clip a live channel, get next event, start output tracking, update a live channel, "\
              "get live inputs, get a live input, create a live input, update a live input, add an asset "\
              "schedule event, get an asset schedule event, update an asset schedule event, remove an asset "\
              "schedule event, move a schedule event, start a live channel, stop a live channel, "\
              "add a live input schedule event, get a live input schedule event, update a live input schedule "\
              "event, remove a live input from a channel, delete a live channel, delete a live input, get all "\
              "operators, get a specific operator, start a broadcast, cancel a broadcast, stop a broadcast, "\
              "get all completed segments, start a segment, cancel a segment, complete a segment, or exit")
        USER_INPUT = input("Enter get channels, get channel, channel refresh, clip channel, create channel, "\
                           "clip channel, get next, start tracking, update channel, get inputs, get input, "\
                           "create input, update input, add event, get event, update event, remove event, "\
                           "move event, start channel, stop channel, add input, get input event, update input "\
                           "event, remove input, delete channel, delete input, get operators, get operator, "\
                           "start broadcast, cancel broadcast, stop broadcast, get segments, start segment, "\
                           "cancel segment, complete segment, or exit for each option above respectivly: ")
        
        if USER_INPUT == "get channels":
            get_channels_main()

        elif USER_INPUT == "get channel":
            get_channel_main()
        
        elif USER_INPUT == "get inputs":
            inputs_main()

        elif USER_INPUT == "get input":
            input_main()

        elif USER_INPUT == "channel refresh":
            live_channel_refresh_main()
        
        elif USER_INPUT == "create channel":
            create_live_channel_main()

        elif USER_INPUT == "clip channel":
            clip_live_channel_main()

        elif USER_INPUT == "get next":
            get_next_event_main()

        elif USER_INPUT == "start tracking":
            start_output_tracking_main()

        elif USER_INPUT == "create input":
            create_live_input_main()

        elif USER_INPUT == "update channel":
            update_live_channel_main()

        elif USER_INPUT == "update input":
            update_live_input_main()

        elif USER_INPUT == "add event":
            add_asset_schedule_event_to_channel()

        elif USER_INPUT == "get event":
            get_asset_schedule_event()

        elif USER_INPUT == "update event":
            update_asset_schedule_event()

        elif USER_INPUT == "remove event":
            remove_asset_schedule_event_from_channel()

        elif USER_INPUT == "move event":
            move_asset_schedule_event_in_channel()

        elif USER_INPUT == "start channel":
            start_live_channel_main()

        elif USER_INPUT == "stop channel":
            stop_live_channel_main()

        elif USER_INPUT == "add input":
            add_live_input_to_live_channel()

        elif USER_INPUT == "get input event":
            get_live_input_schedule_event()

        elif USER_INPUT == "update input event":
            update_live_input_schedule_event()

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

