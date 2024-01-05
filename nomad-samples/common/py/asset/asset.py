import sys, os
sys.path.append(os.path.realpath('...'))

from nomad_media_pip.nomad_sdk import Nomad_SDK
from config import config

nomad_sdk = Nomad_SDK(config)

import json

def get_input(prompt, required):
    return input(f"{prompt}: ") if required or input(f"Do you want to add {prompt} (y/n): ") == "y" else None

def get_dict(prompt, keys, required):
    return {key: input(f"{prompt} {key}: ") for key in keys} if required or input(f"Do you want to add {prompt} (y/n): ") == "y" else None

def get_list(prompt, keys, required):
    items = []
    if required or input(f"Do you want to add {prompt} (y/n): ") == "y":
        while True:
            items.append({key: input(f"{prompt} {key}: ") for key in keys})
            if not required or input(f"Do you want to add another {prompt} (y/n): ") == "n":
                break
    
    return items

def get_bool(prompt):
    return True if input(f"{prompt} (y/n): ") == "y" else False

def archive_asset():
    try:
        ASSET_ID = input("asset id: ")

        RESPONSE = nomad_sdk.archive_asset(ASSET_ID)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def build_media():
    try:
        SOURCES = get_list("source", ["sourceAssetId", "startTimeCode", "endTimeCode"], True)
        DESTINATION_FOLDER_ID = get_input("destination folder id", True)
        TITLE = get_input("title", False)
        TAGS = get_list("tag", ["id", "description"], False)
        COLLECTIONS = get_list("collection", ["id", "description"], False)
        RELATED_CONTENTS = get_list("related content", ["id", "description"], False)
        VIDEO_BITRATE = get_input("video bitrate", False)
        AUDIO_TRACKS = get_list("audio track", ["id", "description"], False)

        nomad_sdk.build_media(SOURCES, TITLE, TAGS, COLLECTIONS, RELATED_CONTENTS, 
                              DESTINATION_FOLDER_ID, VIDEO_BITRATE, AUDIO_TRACKS)
        
    except Exception as e:
        print(e)

def clip_asset():
    try:
        ASSET_ID = get_input("asset id", True)
        START_TIME = get_input("start time", True)
        END_TIME = get_input("end time", True)
        TITLE = get_input("title", True)
        OUTPUT_FOLDER_ID = get_input("output folder id", True)
        TAGS = get_list("tag", ["id", "description"], False)
        COLLECTIONS = get_list("collection", ["id", "description"], False)
        RELATED_CONTENTS = get_list("related content", ["id", "description"], False)
        VIDEO_BITRATE = get_input("video bitrate", False)
        AUDIO_TRACKS = get_list("audio tracks", ["id", "description"], False)


        RESPONSE = nomad_sdk.clip_asset(ASSET_ID, START_TIME, END_TIME, TITLE, 
                                        OUTPUT_FOLDER_ID, TAGS, COLLECTIONS, 
                                        RELATED_CONTENTS, VIDEO_BITRATE, AUDIO_TRACKS)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def copy_asset():
    try:
        ASSET_IDS = get_input("asset ids", True).split(",")
        DESTINATION_FOLDER_ID = get_input("destination folder id", True)
        BATCH_ACTION = get_dict("batch action", ["id", "description"], False)
        CONTENT_DEFINITION_ID = get_input("content definition id", False)
        SCHEMA_NAME = get_input("schema name", False)
        RESOLVER_EXCEMPT = get_bool("resolver exempt")

        RESPONSE = nomad_sdk.copy_asset(ASSET_IDS, DESTINATION_FOLDER_ID,
                                        BATCH_ACTION, CONTENT_DEFINITION_ID, 
                                        SCHEMA_NAME, RESOLVER_EXCEMPT)
        
        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def create_annotation():
    try:
        ASSET_ID = get_input("asset id", True)
        START_TIME_CODE = get_input("start time code", True)
        END_TIME_CODE = get_input("end time code", False)
        FIRST_KEYWORD = get_input("first keyword", True)
        SECOND_KEYWORD = get_input("second keyword", True)
        DESCRIPTION = get_input("description", True)
        COUNTRY = get_dict("country", ["id", "description"], True)
        CONTENT_ID = get_input("content id", False)
        IMAGE_URL = get_input("image url", False)

        RESPONSE = nomad_sdk.create_annotation(ASSET_ID, START_TIME_CODE, END_TIME_CODE,
                                                  FIRST_KEYWORD, SECOND_KEYWORD, DESCRIPTION,
                                                  COUNTRY, CONTENT_ID, IMAGE_URL)
        
        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def create_asset_ad_break():
    try:
        ASSET_ID = get_input("asset id", True)
        TIME_CODE = get_input("time code", False)
        TAGS = get_list("tag", ["id", "description"], False)
        LABELS = get_list("label", ["id", "description"], False)

        RESPONSE = nomad_sdk.create_asset_ad_break(ASSET_ID, TIME_CODE, TAGS, LABELS)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def create_folder_asset():
    try:
        PARENT_ID = get_input("parent id", True)
        DISPLAY_NAME = get_input("display name", True)

        RESPONSE = nomad_sdk.create_folder_asset(PARENT_ID, DISPLAY_NAME)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def create_placeholder_asset():
    try:
        PARENT_ID = get_input("parent id", True)
        ASSET_NAME = get_input("asset name (include extention)", True)

        RESPONSE = nomad_sdk.create_placeholder_asset(PARENT_ID, ASSET_NAME)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def create_screenshot_at_timecode():
    try:
        ASSET_ID = get_input("asset id", True)
        TIME_CODE = get_input("time code", True)

        RESPONSE = nomad_sdk.create_screenshot_at_timecode(ASSET_ID, TIME_CODE)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def delete_annotation():
    try:
        ASSET_ID = get_input("asset id", True)
        ANNOTATION_ID = get_input("annotation id", True)

        RESPONSE = nomad_sdk.delete_annotation(ASSET_ID, ANNOTATION_ID)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def delete_asset():
    try:
        ASSET_ID = get_input("asset id", True)

        nomad_sdk.delete_asset(ASSET_ID)
    except Exception as e:
        print(e)

def delete_asset_ad_break():
    try:
        ASSET_ID = get_input("asset id", True)
        AD_BREAK_ID = get_input("ad break id", True)

        RESPONSE = nomad_sdk.delete_asset_ad_break(ASSET_ID, AD_BREAK_ID)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def download_archive_asset():
    try:
        ASSET_IDS = get_input("asset id", True).split(",")
        FILE_NAME = get_input("file name", False)
        DOWNLOAD_PROXY = get_bool("download proxy")

        RESPONSE = nomad_sdk.download_archive_asset(ASSET_IDS, FILE_NAME, DOWNLOAD_PROXY)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def duplicate_asset():
    try:
        ASSET_ID = get_input("asset id", True)
        
        RESPONSE = nomad_sdk.duplicate_asset(ASSET_ID)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def get_annotations():
    try:
        ASSET_ID = get_input("asset id", True)

        RESPONSE = nomad_sdk.get_annotations(ASSET_ID)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def get_asset():
    try:
        ASSET_ID = get_input("asset id", True)

        RESPONSE = nomad_sdk.get_asset(ASSET_ID)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def get_asset_ad_breaks():
    try:
        ASSET_ID = get_input("asset id", True)

        RESPONSE = nomad_sdk.get_asset_ad_breaks(ASSET_ID)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def get_asset_child_nodes():
    try:
        ASSET_ID = get_input("asset id", True)
        FOLDER_ID = get_input("folder id", True)
        SORT_COLUMN = get_input("sort column", True)
        IS_DESC = get_bool("is desc")
        PAGE_INDEX = get_input("page index", True)
        PAGE_SIZE = get_input("page size", True)

        RESPONSE = nomad_sdk.get_asset_child_nodes(ASSET_ID, FOLDER_ID, SORT_COLUMN, 
                                                   IS_DESC, PAGE_INDEX, PAGE_SIZE)
        
        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def get_asset_details():
    try:
        ASSET_ID = get_input("asset id", True)

        RESPONSE = nomad_sdk.get_asset_details(ASSET_ID)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def get_asset_manifest_with_cookies():
    try:
        ASSET_ID = get_input("asset id", True)
        COOKIE_ID = get_input("cookie id", True)

        RESPONSE = nomad_sdk.get_asset_manifest_with_cookies(ASSET_ID, COOKIE_ID)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def get_asset_metadata_summary():
    try:
        ASSET_ID = get_input("asset id", True)

        RESPONSE = nomad_sdk.get_asset_metadata_summary(ASSET_ID)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def get_asset_parent_folders():
    try:
        ASSET_ID = get_input("asset id", True)
        PAGE_SIZE = get_input("page size", True)

        RESPONSE = nomad_sdk.get_asset_parent_folders(ASSET_ID, PAGE_SIZE)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def get_asset_screenshot_details():
    try:
        ASSET_ID = get_input("asset id", True)
        SEGMENT_ID = get_input("segment id", True)
        SCREENSHOT_ID = get_input("screenshot id", True)

        RESPONSE = nomad_sdk.get_asset_screenshot_details(ASSET_ID, SEGMENT_ID, 
                                                          SCREENSHOT_ID)
        
        print(json.dumps(RESPONSE, indent=4))
        
    except Exception as e:
        print(e)

def get_asset_segment_details():
    try:
        ASSET_ID = get_input("asset id", True)
        SEGMENT_ID = get_input("segment id", True)

        RESPONSE = nomad_sdk.get_asset_segment_details(ASSET_ID, SEGMENT_ID)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def get_user_upload_parts():
    try:
        UPLOAD_ID = get_input("upload id", True)

        RESPONSE = nomad_sdk.get_user_upload_parts(UPLOAD_ID)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def get_user_uploads():
    try:
        INCLUDE_COMPLETED_UPLOADS = get_bool("include completed uploads")

        RESPONSE = nomad_sdk.get_user_uploads(INCLUDE_COMPLETED_UPLOADS)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def import_annotations():
    try:
        ASSET_ID = get_input("asset id", True)
        ANNOTATIONS = get_list("annotation", ["startTimeCode", "endTimeCode"], True)

        nomad_sdk.import_annotations(ASSET_ID, ANNOTATIONS)

    except Exception as e:
        print(e)

def index_asset():
    try:
        ASSET_ID = get_input("asset id", True)

        nomad_sdk.index_asset(ASSET_ID)

    except Exception as e:
        print(e)

def local_restore_asset():
    try:
        ASSET_ID = get_input("asset id", True)
        PROFILE = get_input("profile", False)

        RESPONSE = nomad_sdk.local_restore_asset(ASSET_ID, PROFILE)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def move_asset():
    try:
        ASSET_ID = get_input("asset id", True)
        DESTINATION_FOLDER_ID = get_input("destination folder id", True)
        BATCH_ACTION = get_dict("batch action", ["id", "description"], False)
        CONTENT_DEFINITION_ID = get_input("content definition id", False)
        SCHEMA_NAME = get_input("schema name", False)
        RESOLVER_EXCEMPT = get_bool("resolver exempt")

        RESPONSE = nomad_sdk.move_asset(ASSET_ID, DESTINATION_FOLDER_ID,
                                        BATCH_ACTION, CONTENT_DEFINITION_ID, 
                                        SCHEMA_NAME, RESOLVER_EXCEMPT)
        
        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def records_asset_tracking_beacon():
    try:
        ASSET_ID = get_input("asset id", True)
        TRACKING_EVENT = get_input("tracking event (Progress, FirstQuartile, Midpoint, "\
                                   "ThirdQuartile, Complete, Hide, LiveStream)", True)
        LIVE_CHANNEL_ID = get_input("live channel id", True)
        CONTENT_ID = get_input("content id", True)
        SECOND = get_input("second", True)

        nomad_sdk.records_asset_tracking_beacon(ASSET_ID, TRACKING_EVENT, LIVE_CHANNEL_ID, 
                                                CONTENT_ID, SECOND)
        
    except Exception as e:
        print(e)

def register_asset():
    try:
        ASSET_ID = get_input("asset id", True)
        PARENT_ID = get_input("parent id", True)
        DISPLAY_OBJECT_KEY = get_input("display object key", False)
        BUCKET_NAME = get_input("bucket name", True)
        OBJECT_KEY = get_input("object key", True)
        E_TAG = get_input("e tag", False)
        TAGS = get_list("tag", ["id", "description"], False)
        COLLECTIONS = get_list("collection", ["id", "description"], False)
        RELATED_CONTENTS = get_list("related content", ["id", "description"], False)
        SEQUENCER = get_input("sequencer", False)
        ASSET_STATUS = get_input("asset status (Available, Renaming, Copying, Restoring, "\
                                 "Registering, Uploading, Archiving, Archived, "\
                                 "PendingArchive, PendingRestore, Restored, Deleting, "\
                                 "Moving, SlugReplaced, Updating, Error, Assembling, "\
                                 "Clipping, Placeholder)", False)
        STORAGE_CLASS = get_input("storage class (Standard, ReducedRedundancy, "\
                                  "Glacier, StandardInfrequentAccess, OneZoneInfrequentAccess, "\
                                  "IntelligentTiering, DeepArchive, GlacierInstanctRetrival, Outposts)", 
                                  False)
        ASSET_TYPE = get_input("asset type (Folder, File, Bucket)", False)
        CONTENT_LENGTH = get_input("content length", False)
        STORAGE_EVENT_NAME = get_input("storage event name", False)
        CREATED_DATE = get_input("created date", False)
        STORAGE_SOURCE_IP_ADDRESS = get_input("storage source ip address", False)
        START_MEDIA_PROCESSOR = get_bool("start media processor")
        DELETE_MISSING_ASSET = get_bool("delete missing asset")

        RESPONSE = nomad_sdk.register_asset(ASSET_ID, PARENT_ID, DISPLAY_OBJECT_KEY,
                                            BUCKET_NAME, OBJECT_KEY, E_TAG, TAGS, 
                                            COLLECTIONS, RELATED_CONTENTS, SEQUENCER, 
                                            ASSET_STATUS, STORAGE_CLASS, ASSET_TYPE, 
                                            CONTENT_LENGTH, STORAGE_EVENT_NAME, CREATED_DATE,
                                            STORAGE_SOURCE_IP_ADDRESS, START_MEDIA_PROCESSOR,
                                            DELETE_MISSING_ASSET)
        
        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def reprocess_asset():
    try:
        TARGET_IDS = get_input("target ids", True).split(",")

        RESPONSE = nomad_sdk.reprocess_asset(TARGET_IDS)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def restore_asset():
    try:
        ASSET_ID = get_input("asset id", True)

        RESPONSE = nomad_sdk.restore_asset(ASSET_ID)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def share_asset():
    try:
        ASSET_ID = get_input("asset id", True)
        NOMAD_USERS = get_list("nomad user", ["id"], False)
        EXTERNAL_USERS = get_list("external user", ["id"], False)
        SHARE_DURATION = get_input("share duration (in hours)", False)

        RESPONSE = nomad_sdk.share_asset(ASSET_ID, NOMAD_USERS, EXTERNAL_USERS, SHARE_DURATION)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def start_workflow():
    try:
        ACTION_ARGUMENTS = get_dict("action argument", ["key", "value"], True)
        TARGET_IDS = get_input("target ids", True).split(",")

        RESPONSE = nomad_sdk.start_workflow(ACTION_ARGUMENTS, TARGET_IDS)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def transcribe_asset():
    try:
        ASSET_ID = get_input("asset id", True)
        TRANSCRIPT_ID = get_input("transcript id", True)
        TRANSCRIPT = get_list("transcript", ["startTimeCode", "content"], False)

        nomad_sdk.transcribe_asset(ASSET_ID, TRANSCRIPT_ID, TRANSCRIPT)

    except Exception as e:
        print(e)

def update_annotation():
    try:
        ASSET_ID = get_input("asset id", True)
        ANNOTATION_ID = get_input("annotation id", True)
        START_TIME_CODE = get_input("start time code", False)
        END_TIME_CODE = get_input("end time code", False)
        FIRST_KEYWORD = get_input("first keyword", False)
        SECOND_KEYWORD = get_input("second keyword", False)
        DESCRIPTION = get_input("description", False)
        COUNTRY = get_dict("country", ["id", "description"], False)
        CONTENT_ID = get_input("content id", False)
        IMAGE_URL = get_input("image url", False)

        RESPONSE = nomad_sdk.update_annotation(ASSET_ID, ANNOTATION_ID, START_TIME_CODE, 
                                               END_TIME_CODE, FIRST_KEYWORD, SECOND_KEYWORD, 
                                               DESCRIPTION, COUNTRY, CONTENT_ID, IMAGE_URL)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)


def update_asset():
    try:
        ASSET_ID = get_input("asset id", True)
        DISPLAY_NAME = get_input("display name", False)
        DISPLAY_DATE = get_input("display date", False)
        AVAILABLE_START_DATE = get_input("available start date", False)
        AVAILABLE_END_DATE = get_input("available end date", False)
        CUSTOM_PROPERTIES = {}
        
        if input("Do you want to add custom properties (y/n): ") == "y":
            while True:
                CUSTOM_PROPERTIES[input("Enter a key: ")] = input("Enter a value: ")

                if input("Do you want to add another custom property (y/n): ") == "n":
                    break

        nomad_sdk.update_asset(ASSET_ID, DISPLAY_NAME, DISPLAY_DATE, 
                               AVAILABLE_START_DATE, AVAILABLE_END_DATE, 
                               CUSTOM_PROPERTIES)

    except Exception as e:
        print(e)

def update_asset_ad_break():
    try:
        ASSET_ID = get_input("asset id", True)
        AD_BREAK_ID = get_input("ad break id", True)
        TIME_CODE = get_input("time code", False)
        TAGS = get_list("tag", ["id", "description"], False)
        LABELS = get_list("label", ["id", "description"], False)

        RESPONSE = nomad_sdk.update_asset_ad_break(ASSET_ID, AD_BREAK_ID, TIME_CODE, TAGS, LABELS)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

def update_asset_language():
    try:
        ASSET_ID = get_input("asset id", True)
        LANGUAGE_ID = get_input("language id", True)

        RESPONSE = nomad_sdk.update_asset_language(ASSET_ID, LANGUAGE_ID)

        print(json.dumps(RESPONSE, indent=4))

    except Exception as e:
        print(e)

functions = {
    "1": archive_asset,
    "2": build_media,
    "3": clip_asset,
    "4": copy_asset,
    "5": create_annotation,
    "6": create_asset_ad_break,
    "7": create_folder_asset,
    "8": create_placeholder_asset,
    "9": create_screenshot_at_timecode,
    "10": delete_annotation,
    "11": delete_asset,
    "12": delete_asset_ad_break,
    "13": download_archive_asset,
    "14": duplicate_asset,
    "15": get_annotations,
    "16": get_asset,
    "17": get_asset_ad_breaks,
    "18": get_asset_child_nodes,
    "19": get_asset_details,
    "20": get_asset_manifest_with_cookies,
    "21": get_asset_metadata_summary,
    "22": get_asset_parent_folders,
    "23": get_asset_screenshot_details,
    "24": get_asset_segment_details,
    "25": get_user_upload_parts,
    "26": get_user_uploads,
    "27": import_annotations,
    "28": index_asset,
    "29": local_restore_asset,
    "30": move_asset,
    "31": records_asset_tracking_beacon,
    "32": register_asset,
    "33": reprocess_asset,
    "34": restore_asset,
    "35": share_asset,
    "36": start_workflow,
    "37": transcribe_asset,
    "38": update_annotation,
    "39": update_asset,
    "40": update_asset_ad_break,
    "41": update_asset_language
}

if __name__ == "__main__":
    print("Which function do you want to run?")
    for key, value in functions.items():
        
        print(f"{key}: {value.__name__}")

    while True:
        USER_INPUT = input("Enter the number of the function you want to run: ")

        if USER_INPUT in functions:
            functions[USER_INPUT]()
            break
        else:
            print("Invalid input")
