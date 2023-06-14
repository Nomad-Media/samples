from assets.start_asset_upload import *
from assets.upload_asset_part import *
from assets.upload_complete_asset import *

import json

def asset_upload(AUTH_TOKEN):
    print("Start upload")
    START_INFO = start_upload(AUTH_TOKEN)
    print(json.dumps(START_INFO, indent=4))
    if not "etag" in START_INFO:
        raise Exception("Asset did not upload successfully")

    for PART in START_INFO["parts"]:
        PART_NUM = PART["partNumber"]
        PART_ID = PART["id"]
        print("Upload asset part " + str(PART_NUM))
        upload_asset_part(AUTH_TOKEN, PART_ID, START_INFO["etag"])
    
    print("Upload complete asset")
    print(json.dumps(upload_complete_asset(AUTH_TOKEN, START_INFO["assetId"]), indent=4))
    


if __name__ == "__main__":
    AUTH_TOKEN = "eyJraWQiOiJkSkpRa3ZxdWxDekpqZEFmWTR0UGwrSytyWldVTE5OTkR1YitYVnljaFNRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJjdXN0b206Y29udGFjdF9pZCI6ImU5YWIxNDFmLWMxMjgtNDE5Yi04YTQ3LWIzNTg1MTQwMzZkNyIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX1ZHRXhveTY0aSIsImNvZ25pdG86dXNlcm5hbWUiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJnaXZlbl9uYW1lIjoiU2NvdHQiLCJvcmlnaW5fanRpIjoiOWEyZGZhOTgtMGQ3Yi00YmY5LWIxOTEtMzQ4ZGQ0YTdmNGFhIiwiYXVkIjoiNWUybm92MXAzYTZxNHM1MHZjamo1ZXNqYjciLCJldmVudF9pZCI6ImM5ZTRmMzY2LWRhOTEtNDVhMC04Y2NmLWY3NTM5ZjkxYWU4MyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjg2NjE2NzAwLCJleHAiOjE2ODY2MjAzMDAsImlhdCI6MTY4NjYxNjcwMCwiZmFtaWx5X25hbWUiOiJGYWx1ZGkiLCJqdGkiOiJmMzk3MjM5NC00MWEzLTRjZmUtOWJkMi1jMmMzMTY0NmRiMjkiLCJlbWFpbCI6InNmYWx1ZGlAbm9tYWQtY21zLmNvbSJ9.tvyhsJRN-suJnE7tC1B5sPoY_0TEitxZoF9a02eizld_T820aTp24-ce4BNHO2OY6ko7IoIIuHxGavhLrA9cvJyzYNIb4VFLU4htjHYjG6pSQJFe-TUQReI4VqFBJZC5d3V3D4qsChDPeOVAMnVLk2GcpuhCQxnPHF3YuvujK54yS1wA72AwPZmt1b2Q8voxGmdQiXMwZmfJ67vzFowsL7wEcoDjJ0ZkjBx4-f5wyqBgyOnBMsHa7gVG8d9Pyp_jB6abk1nQfM7IJUyjmBxvnKgDLrUqd46OaMts4PWF9l_8aPGHdp4D5Aj-DPvjfWTab1Y_jltyyEZr1ZJjA3Q6Jg"
    asset_upload(AUTH_TOKEN)