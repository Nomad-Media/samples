import sys, os
sys.path.append(os.path.realpath('...'))

from nomad_media_pip.nomad_sdk import Nomad_SDK
from config import config

nomad_sdk = Nomad_SDK(config)

def track_video_seconds():
    ASSET_ID = input("Enter the asset id of the video you want to track: ")
    SECONDS = input("How many seconds do you want the video beacon progress tracking data?: ")

    print("Tracking video with seconds")
    nomad_sdk.get_video_tracking(ASSET_ID, 0, SECONDS)
    print("Tracking video success")

def track_video_quartile():
    ASSET_ID = input("Enter the asset id of the video you want to track: ")
    QUARTILE = input("Enter the quartile you want to track: ")

    ORDINAL = ["first", "second", "third", "fourth"]
    print(f"Tracking {ORDINAL[int(QUARTILE) - 1]} quartile")
    nomad_sdk.get_video_tracking(ASSET_ID, QUARTILE, None)
    print("Tracking video success")

def track_video_hidden():
    ASSET_ID = input("Enter the asset id of the video you want to track: ")

    print("Hiding video tracking")
    nomad_sdk.get_video_tracking(ASSET_ID, 5, None)
    print("Hiding video tracking success")

if __name__ == "__main__":
    AUTH_TOKEN = input("Enter your authentication token: ")

    while True:
        USER_INPUT = input("Enter seconds, quartile, or hidden for each how you want "\
                      "to track your video, or exit to exit: ")
        if USER_INPUT == "seconds":
            track_video_seconds()
        elif USER_INPUT == "quartile":
            track_video_quartile()
        elif USER_INPUT == "hidden":
            track_video_hidden()
        elif USER_INPUT == "exit":
            break
        else:
            print("Invalid input")