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
    AUTH_TOKEN = "eyJraWQiOiJkSkpRa3ZxdWxDekpqZEFmWTR0UGwrSytyWldVTE5OTkR1YitYVnljaFNRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJjdXN0b206Y29udGFjdF9pZCI6ImU5YWIxNDFmLWMxMjgtNDE5Yi04YTQ3LWIzNTg1MTQwMzZkNyIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX1ZHRXhveTY0aSIsImNvZ25pdG86dXNlcm5hbWUiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJnaXZlbl9uYW1lIjoiU2NvdHQiLCJvcmlnaW5fanRpIjoiYzQ4NTk1OWYtYTVlNi00OTliLWJjNWUtOWEwZTAxYjdhMjk1IiwiYXVkIjoiNWUybm92MXAzYTZxNHM1MHZjamo1ZXNqYjciLCJldmVudF9pZCI6ImE2YzQ5ZTg1LTcwMzktNDllNy05M2NhLTBlNWQzMjRhYzZmYiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjg3Mjk2OTU4LCJleHAiOjE2ODczMDA1NTgsImlhdCI6MTY4NzI5Njk1OCwiZmFtaWx5X25hbWUiOiJGYWx1ZGkiLCJqdGkiOiJjNDdmMzZhYy1lOGIwLTRjN2EtODMzNy03MzdjMDhhZGZiMTIiLCJlbWFpbCI6InNmYWx1ZGlAbm9tYWQtY21zLmNvbSJ9.wyNoOdAsdOUq_0HGPpKvBkoKbV-0RxES4Jz8pj4-DNNNYyhWod_kt3d21qY0r8oVHqNI6VmjT6LdkN-Vu6rr12_rKsC5tcMkEmKFfctrrASPp8p_VnCf_9eDoWZg-EvCJvFI4vZ-xTrFm4nc3OAe39WG0cR5_qZkgHkqmvjHJXRci3FYeylMJnc-UAJCLlBr1wcokZP2apNcPQGYE5uDGThx3OshDncmzQnMdN6Wdmo_he8zEKzx1G6eLHSpzmio-mMTBXzQwvnP7t6PZwkTBqkxsP3cHUNch69X3cxit-UXFJEXggcRS00pU2aDFKQ2ctd0dqtv484RWBPOQi6-ww"
    print(f"Enter your authentication token: \n{AUTH_TOKEN}")

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