import sys, os
sys.path.append(os.path.realpath('...'))

from nomad_media_pip.nomad_sdk import Nomad_SDK
from config import config

nomad_sdk = Nomad_SDK(config)

import json

def get_input(prompt, required):
    return input(f"Enter {prompt}: ") if required or input(f"Do you want to add {prompt} (y/n): ") == "y" else ""

def get_dict(prompt, keys, required):
    return {key: input(f"Enter {prompt} {key}: ") for key in keys} if required or input(f"Do you want to add {prompt} (y/n): ") == "y" else {}

def get_list(prompt, keys, required):
    items = []
    if required or input(f"Do you want to add {prompt} (y/n): ") == "y":
        while True:
            items.append({key: input(f"Enter {prompt} {key}: ") for key in keys})
            if not required or input(f"Do you want to add another {prompt} (y/n): ") == "n":
                break
    return items

def get_bool(prompt):
    return True if input(f"{prompt} (y/n): ") == "y" else False

def get_data(prompts):
    data = {}
    for key, value in prompts.items():
        type = value[1]
        if type == "input":
            prompt, type, required = value
            data[key] = get_input(prompt, required)
        elif type == "dict":
            prompt, type, keys, required = value
            data[key] = get_dict(prompt, keys, required)
        elif type == "list":
            prompt, type, keys, required = value
            data[key] = get_list(prompt, keys, required)
        elif type == "bool":
            prompt, type, required = value
            data[key] = get_bool(prompt)
        else:
            data[key] = value

    return data

def get_days():
    SEARCH_INFO = nomad_sdk.search(None, None, None, 
        [
            {
                "fieldName": "contentDefinitionId",
                "operator": "Equals",
                "values": "fc8042c1-1ade-400d-b0aa-02937e658ae6",
            },
            {
                "fieldName": "languageId",
                "operator": "Equals",
                "values": "c66131cd-27fc-4f83-9b89-b57575ac0ed8"
            }
        ], None, None, None, None, True, None)
    
    print(json.dumps(SEARCH_INFO, indent=4))

    return SEARCH_INFO["items"]

def create_intelligent_playlist():
    try:
        prompts = {
            "COLLECTIONS": ("collection", "list", ["id", "description"], False),
            "END_SEARCH_DATE": ("end search date (YYYY-MM-DD)", "input", False),
            "END_SEARCH_DURATION_IN_MINUTES": ("end search duration (in minutes)", "input", True),
            "NAME": ("name", "input", True),
            "RELATED_CONTENTS": ("related content", "list", ["id", "description"], False),
            "SEARCH_DATE": ("search date (YYYY-MM-DD)", "input", False),
            "SEARCH_DURATION_IN_MINUTES": ("search duration (in minutes)", "input", True),
            "SEARCH_FILTER_TYPE": ("search filter type: The types are 1 (Random), 2 (Random within a Date Range), 3 (Newest), and 4 (Newest Not Played)", "input", True),
            "TAGS": ("tag", "list", ["id", "description"], False),
            "THUMBNAIL_ASSET": ("thumbnail asset", "dict", ["id", "description"], False),
        }

        data = get_data(prompts)

        INFO = nomad_sdk.create_intelligent_playlist(**data)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    
def create_intelligent_schedule():
    try:
        prompts = {
            "DEFAULT_VIDEO_ASSET": ("default video asset", "dict", ["id", "description"], True),
            "NAME": ("name", "input", True),
            "THUMBNAIL_ASSET": ("thumbnail asset", "dict", ["id", "description"], False),
            "TIME_ZONE_ID": ("time zone id", "input", True),
        }

        data = get_data(prompts)

        INFO = nomad_sdk.create_intelligent_schedule(**data)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    
def create_playlist():
    try:
        prompts = {
            "NAME": ("name", "input", True),
            "THUMBNAIL_ASSET": ("thumbnail asset", "dict", ["id", "description"], False),
            "LOOP_PLAYLIST": ("loop playlist", "bool", False),
            "DEFAULT_VIDEO_ASSET": ("default video asset", "dict", ["id", "description"], True),
        }

        data = get_data(prompts)

        INFO = nomad_sdk.create_playlist(**data)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()

def create_playlist_video():
    try:
        prompts = {
            "PLAYLIST_ID": ("playlist id", "input", True),
            "ASSET": ("asset", "dict", ["id", "description"], True),
            "PREVIOUS_ITEM:": ("previous item", "dict", ["id", "description"], False)
        }

        data = get_data(prompts)

        INFO = nomad_sdk.create_playlist_video(**data)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    
def create_schedule_item_asset():
    try:
        prompts = {
            "SCHEDULE_ID": ("schedule id", "input", True),
            "ASSET": ("asset", "dict", ["id", "description"], True),
            "DAYS": ("days", "input", True),
            "DURATION_TIME_CODE": ("duration time code (hh:mm:ss;fr)", "input", True),
            "END_TIME_CODE": ("end time code (hh:mm:ss;fr)", "input", True),
            "PREVIOUS_ITEM": ("previous item", "dict", ["id", "description"], False),
            "TIME_CODE": ("time code (hh:mm:ss;fr)", "input", True),
        }

        data = get_data(prompts)

        data["days"] = [day for day in get_days() if day["title"] in data["days"]]

        INFO = nomad_sdk.create_schedule_item_asset(**data)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()

def create_schedule_item_live_channel():
    try:
        prompts = {
            "SCHEDULE_ID": ("schedule id", "input", True),
            "DAYS": ("days", "input", True),
            "DURATION_TIME_CODE": ("duration time code (hh:mm:ss;fr)", "input", True),
            "END_TIME_CODE": ("end time code (hh:mm:ss;fr)", "input", True),
            "LIVE_CHANNEL": ("live channel", "dict", ["id", "description"], True),
            "PREVIOUS_ITEM": ("previous item", "dict", ["id", "description"], False),
            "TIME_CODE": ("time code (hh:mm:ss;fr)", "input", True),
        }

        data = get_data(prompts)

        data["days"] = [day for day in get_days() if day["title"] in data["days"]]

        INFO = nomad_sdk.create_schedule_item_live_channel(**data)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    
def create_schedule_item_playlist_schedule():
    try:
        prompts = {
            "SCHEDULE_ID": ("schedule id", "input", True),
            "DAYS": ("days", "input", True),
            "DURATION_TIME_CODE": ("duration time code (hh:mm:ss;fr)", "input", True),
            "END_TIME_CODE": ("end time code (hh:mm:ss;fr)", "input", True),
            "PLAYLIST_SCHEDULE": ("playlistSchedule", "dict", ["id", "description"], True),
            "PREVIOUS_ITEM": ("previous item", "dict", ["id", "description"], False),
            "TIME_CODE": ("time code (hh:mm:ss;fr)", "input", True),
        }

        data = get_data(prompts)

        data["days"] = [day for day in get_days() if day["title"] in data["days"]]

        INFO = nomad_sdk.create_schedule_item_playlist_schedule(**data)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
            
def create_schedule_item_search_filter():
    try:
        prompts = {
            "SCHEDULE_ID": ("schedule id", "input", True),\
            "COLLECTIONS": ("collection", "list", ["id", "description"], False),
            "DAYS": ("days", "input", True),
            "DURATION_TIME_CODE": ("duration time code (hh:mm:ss;fr)", "input", True),
            "END_SEARCH_DATE": ("end search date (YYYY-MM-DD)", "input", False),
            "END_SEARCH_DURATION_IN_MINUTES": ("end search duration (in minutes)", "input", True),
            "END_TIME_CODE": ("end time code (hh:mm:ss;fr)", "input", True),
            "PREVIOUS_ITEM": ("previous item", "dict", ["id", "description"], False),
            "RELATED_CONTENTS": ("related content", "list", ["id", "description"], False),
            "SEARCH_DATE": ("search date (YYYY-MM-DD)", "input", False),
            "SEARCH_DURATION_IN_MINUTES": ("search duration (in minutes)", "input", True),
            "SEARCH_FILTER": ("search filter: The types are 1 (Random), 2 (Random within a Date Range), 3 (Newest), and 4 (Newest Not Played)", "dict", ["id", "description"], True),
            "TAGS": ("tag", "list", ["id", "description"], False),
            "TIME_CODE": ("time code (hh:mm:ss;fr)", "input", True),
        }

        data = get_data(prompts)

        data["days"] = [day for day in get_days() if day["title"] in data["days"]]

        INFO = nomad_sdk.create_schedule_item_search_filter(**data)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    
def delte_intelligent_playlist():
    try:
        ID = input("Enter intelligent playlist id: ")

        nomad_sdk.delete_intelligent_playlist(ID)
    except:
        raise Exception()
    
def delete_intelligent_schedule():
    try:
        ID = input("Enter intelligent schedule: ")

        nomad_sdk.delete_intelligent_schedule(ID)
    except:
        raise Exception()
    
def delete_playlist():
    try:
        ID = input("Enter playlist: ")

        nomad_sdk.delete_playlist(ID)
    except:
        raise Exception()
    
def delete_schedule_item():
    try:
        SCHEDULE_ID = input("Enter scheudle id: ")
        ITEM_ID = input("Enter item id: ")

        nomad_sdk.delete_schedule_item(SCHEDULE_ID, ITEM_ID)
    except:
        raise Exception()
    
def get_intelligent_playlist():
    try:
        ID = input("Enter intelligent playlist id: ")

        INFO = nomad_sdk.get_intelligent_playlist(ID)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    
def get_intelligent_schedule():
    try:
        ID = input("Enter intelligent schedule: ")

        INFO = nomad_sdk.get_intelligent_schedule(ID)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    
def get_playlist():
    try:
        ID = input("Enter playlist: ")

        INFO = nomad_sdk.get_playlist(ID)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    
def get_schedule_item():
    try:
        SCHEDULE_ID = input("Enter scheudle id: ")
        ITEM_ID = input("Enter item id: ")

        INFO = nomad_sdk.get_schedule_item(SCHEDULE_ID, ITEM_ID)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    
def get_schedule_items():
    try:
        SCHEDULE_ID = input("Enter scheudle id: ")

        INFO = nomad_sdk.get_schedule_items(SCHEDULE_ID)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    
def get_schedule_preview():
    try:
        SCHEDULE_ID = input("Enter scheudle id: ")

        INFO = nomad_sdk.get_schedule_preview(SCHEDULE_ID)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    
def move_schedule_item():
    try:
        SCHEDULE_ID = input("Enter scheudle id: ")
        ITEM_ID = input("Enter item id: ")
        PREVIOUS_ITEM_ID = input("Enter previous item id: ")

        nomad_sdk.move_schedule_item(SCHEDULE_ID, ITEM_ID, PREVIOUS_ITEM_ID)
    except:
        raise Exception()
    
def publish_intelligent_schedule():
    try:
        ID = input("Enter intelligent schedule: ")
        NUM_LOCKED_DAYS = input("Enter number of days you want the intelligent schedule to be locked: ")

        nomad_sdk.publish_intelligent_schedule(ID, NUM_LOCKED_DAYS)
    except:
        raise Exception()
    
def start_schedule():
    try:
        ID = input("Enter schedule id: ")
        SKIP_CLEANUP_ON_FAILURE = input("Enter if you want to skip cleanup on failure (y/n): ") == "y"

        nomad_sdk.start_schedule(ID, SKIP_CLEANUP_ON_FAILURE)
    except:
        raise Exception()
    
def stop_schedule():
    try:
        ID = input("Enter schedule id: ")
        FORCE_STOP = input("Enter if you want to force stop (y/n): ") == "y"

        nomad_sdk.stop_schedule(ID, FORCE_STOP)
    except:
        raise Exception()
    
def update_intelligent_playlist():
    try:
        prompts = {
            "SCHEDULE_ID": ("id", "input", True),
            "COLLECTIONS": ("collection", "list", ["id", "description"], False),
            "END_SEARCH_DATE": ("end search date (YYYY-MM-DD)", "input", False),
            "END_SEARCH_DURATION_IN_MINUTES": ("end search duration (in minutes)", "input", False),
            "NAME": ("name", "input", False),
            "RELATED_CONTNETS": ("related content", "list", ["id", "description"], False),
            "SEARCH_DATE": ("search date (YYYY-MM-DD)", "input", False),
            "SEARCH_DURATION_IN_MINUTES": ("search duration (in minutes)", "input", False),
            "SEARCH_FILTER_TYPE": ("search filter type: The types are 1 (Random), 2 (Random within a Date Range), 3 (Newest), and 4 (Newest Not Played)", "input", True),
            "TAGS": ("tag", "list", ["id", "description"], False),
            "THUMBNAIL_ASSSET": ("thumbnail asset", "dict", ["id", "description"], False),
        }

        data = get_data(prompts)

        INFO = nomad_sdk.update_intelligent_playlist(**data)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    
def update_intelligent_schedule():
    try:
        prompts = {
            "SCHEDULE_ID": ("id", "input", True),
            "DEFAULT_VIDEO_ASSET": ("default video asset", "dict", ["id", "description"], False),
            "NAME": ("name", "input", False),
            "THUMBNAIL_ASSET": ("thumbnail asset", "dict", ["id", "description"], False),
            "TIME_ZONE_ID": ("time zone id", "input", False),
        }

        data = get_data(prompts)

        INFO = nomad_sdk.update_intelligent_schedule(**data)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    
def update_playlist():
    try:
        prompts = {
            "SCHEDULE_ID": ("id", "input", True),
            "NAME": ("name", "input", False),
            "THUMBNAIL_ASSET": ("thumbnail asset", "dict", ["id", "description"], False),
            "LOOP_PLAYLIST": ("loop playlist", "bool", False),
            "DEFAULT_VIDEO_ASSET": ("default video asset", "dict", ["id", "description"], False),
        }

        data = get_data(prompts)

        INFO = nomad_sdk.update_playlist(**data)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    
def update_schedule_item_asset():
    try:
        prompts = {
            "SCHEDULE_ID": ("schedule id", "input", True),
            "ASSET": ("asset", "dict", ["id", "description"], False),
            "DAYS": ("days", "input", False),
            "DURATION_TIME_CODE": ("duration time code (hh:mm:ss;fr)", "input", False),
            "END_TIME_CODE": ("end time code (hh:mm:ss;fr)", "input", False),
            "PREVIOUS_ITEM": ("previous item", "dict", ["id", "description"], False),
            "TIME_CODE": ("time code (hh:mm:ss;fr)", "input", False),
        }

        data = get_data(prompts)

        data["days"] = [day for day in get_days() if day["title"] in data["days"]]

        INFO = nomad_sdk.update_schedule_item_asset(**data)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    
def update_schedule_item_live_channel():
    try:
        prompts = {
            "SCHEDULE_ID": ("schedule id", "input", True),
            "DAYS": ("days", "input", False),
            "DURATION_TIME_CODE": ("duration time code (hh:mm:ss;fr)", "input", False),
            "END_TIME_CODE": ("end time code (hh:mm:ss;fr)", "input", False),
            "LIVE_CHANNEL": ("live channel", "dict", ["id", "description"], False),
            "PREVIOUS_ITEM": ("previous item", "dict", ["id", "description"], False),
            "TIME_CODE": ("time code (hh:mm:ss;fr)", "input", False),
        }

        data = get_data(prompts)

        data["days"] = [day for day in get_days() if day["title"] in data["days"]]

        INFO = nomad_sdk.update_schedule_item_live_channel(**data)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    
def update_schedule_item_playlist():
    try:
        prompts = {
            "SCHEDULE_ID": ("schedule id", "input", True),
            "DAYS": ("days", "input", False),
            "DURATION_TIME_CODE": ("duration time code (hh:mm:ss;fr)", "input", False),
            "END_TIME_CODE": ("end time code (hh:mm:ss;fr)", "input", False),
            "PLAYLIST_SCHEDULE": ("playlistSchedule", "dict", ["id", "description"], False),
            "PREVIOUS_ITEM": ("previous item", "dict", ["id", "description"], False),
            "TIME_CODE": ("time code (hh:mm:ss;fr)", "input", False),
        }

        data = get_data(prompts)

        data["days"] = [day for day in get_days() if day["title"] in data["days"]]

        INFO = nomad_sdk.update_schedule_item_playlist_schedule(**data)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    
def update_schedule_item_search_filter():
    try:
        prompts = {
            "SCHEDULE_ID": ("schedule id", "input", True),\
            "COLLECTIONS": ("collection", "list", ["id", "description"], False),
            "DAYS": ("days", "input", False),
            "DURATION_TIME_CODE": ("duration time code (hh:mm:ss;fr)", "input", False),
            "END_SEARCH_DATE": ("end search date (YYYY-MM-DD)", "input", False),
            "END_SEARCH_DURATION_IN_MINUTES": ("end search duration (in minutes)", "input", False),
            "END_TIME_CODE": ("end time code (hh:mm:ss;fr)", "input", False),
            "PREVIOUS_ITEM": ("previous item", "dict", ["id", "description"], False),
            "RELATED_CONTENTS": ("related content", "list", ["id", "description"], False),
            "SEARCH_DATE": ("search date (YYYY-MM-DD)", "input", False),
            "SEARCH_DURATION_IN_MINUTES": ("search duration (in minutes)", "input", False),
            "SEARCH_FILTER": ("search filter: The types are 1 (Random), 2 (Random within a Date Range), 3 (Newest), and 4 (Newest Not Played)", "dict", ["id", "description"], False),
            "TAGS": ("tag", "list", ["id", "description"], False),
            "TIME_CODE": ("time code (hh:mm:ss;fr)", "input", False),
        }

        data = get_data(prompts)

        data["days"] = [day for day in get_days() if day["title"] in data["days"]]

        INFO = nomad_sdk.update_schedule_item_search_filter(**data)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    
functions = {
    "1": create_intelligent_playlist,
    "2": create_intelligent_schedule,
    "3": create_playlist,
    "4": create_playlist_video,
    "5": create_schedule_item_asset,
    "6": create_schedule_item_live_channel,
    "7": create_schedule_item_playlist_schedule,
    "8": create_schedule_item_search_filter,
    "9": delte_intelligent_playlist,
    "10": delete_intelligent_schedule,
    "11": delete_playlist,
    "12": delete_schedule_item,
    "13": get_intelligent_playlist,
    "14": get_intelligent_schedule,
    "15": get_playlist,
    "16": get_schedule_item,
    "17": get_schedule_items,
    "18": get_schedule_preview,
    "19": move_schedule_item,
    "20": publish_intelligent_schedule,
    "21": start_schedule,
    "22": stop_schedule,
    "23": update_intelligent_playlist,
    "24": update_intelligent_schedule,
    "25": update_playlist,
    "26": update_schedule_item_asset,
    "27": update_schedule_item_live_channel,
    "28": update_schedule_item_playlist,
    "29": update_schedule_item_search_filter
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