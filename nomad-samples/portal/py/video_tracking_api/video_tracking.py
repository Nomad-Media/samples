from track_video.track_video_seconds import *
from track_video.track_video_hidden import *
from track_video.track_video_quartile import *

def track_video_seconds_main(AUTH_TOKEN):
    ASSET_ID = input("Enter the asset id of the video you want to track: ")
    SECONDS = input("How many seconds do you want the video beacon progress tracking data?: ")

    print("Tracking video with seconds")
    track_video_seconds(AUTH_TOKEN, ASSET_ID, SECONDS)
    print("Tracking video success")

def track_video_quartile_main(AUTH_TOKEN):
    ASSET_ID = input("Enter the asset id of the video you want to track: ")
    QUARTILE = input("Enter the quartile you want to track: ")

    ORDINAL = ["first", "second", "third", "fourth"]
    print(f"Tracking {ORDINAL[int(QUARTILE) - 1]} quartile")
    track_video_quartile(AUTH_TOKEN, ASSET_ID, QUARTILE)
    print("Tracking video success")

def track_video_hidden_main(AUTH_TOKEN):
    ASSET_ID = input("Enter the asset id of the video you want to track: ")

    print("Hiding video tracking")
    track_video_hidden(AUTH_TOKEN, ASSET_ID)
    print("Hiding video tracking success")

if __name__ == "__main__":
    AUTH_TOKEN = input("Enter your authentication token: ")

    while True:
        USER_INPUT = input("Enter seconds, quartile, or hidden for each how you want "\
                      "to track your video, or exit to exit: ")
        if USER_INPUT == "seconds":
            track_video_seconds_main(AUTH_TOKEN)
        elif USER_INPUT == "quartile":
            track_video_quartile_main(AUTH_TOKEN)
        elif USER_INPUT == "hidden":
            track_video_hidden_main(AUTH_TOKEN)
        elif USER_INPUT == "exit":
            break
        else:
            print("Invalid input")