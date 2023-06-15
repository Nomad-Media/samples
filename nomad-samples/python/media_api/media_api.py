from media.content_search import *
from media.forms import *
from media.media_search import *

import json

def media_api(AUTH_TOKEN: str):
    try:
        print("Content search")
        CONTENT = content_search(AUTH_TOKEN)
        print(json.dumps(CONTENT, indent=4))

        print("Media search")
        MEDIA = media_search(AUTH_TOKEN)
        print(json.dumps(MEDIA, indent=4))

        print("Forms")
        FORMS = forms(AUTH_TOKEN)
        print(json.dumps(FORMS, indent=4))
    except:
        raise Exception("Media API failed")

if __name__ == "__main__":
    AUTH_TOKEN = "eyJraWQiOiJkSkpRa3ZxdWxDekpqZEFmWTR0UGwrSytyWldVTE5OTkR1YitYVnljaFNRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJjdXN0b206Y29udGFjdF9pZCI6ImU5YWIxNDFmLWMxMjgtNDE5Yi04YTQ3LWIzNTg1MTQwMzZkNyIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX1ZHRXhveTY0aSIsImNvZ25pdG86dXNlcm5hbWUiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJnaXZlbl9uYW1lIjoiU2NvdHQiLCJvcmlnaW5fanRpIjoiYjE4NzVkZGUtYzVmYS00NWU3LTk2ODItMTMzZDI0ZjU3M2ZhIiwiYXVkIjoiNWUybm92MXAzYTZxNHM1MHZjamo1ZXNqYjciLCJldmVudF9pZCI6IjgwNmVmZmU1LTM4MDMtNDE2YS1iZWEzLTgyMGQ3NGU3ZmE0NCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjg1OTQyOTQ3LCJleHAiOjE2ODU5NDY1NDcsImlhdCI6MTY4NTk0Mjk0NywiZmFtaWx5X25hbWUiOiJGYWx1ZGkiLCJqdGkiOiIwNzkzNzg5NC0wYWIzLTQxMjYtYWUyZS00NzAxMjg2MzI5YzAiLCJlbWFpbCI6InNmYWx1ZGlAbm9tYWQtY21zLmNvbSJ9.xOG0To1JDQi0VZoRW1pHUkb0viJzIEFCqH2zLAHjXRv-qqSM25Vz1oivQ0udFcKJjtxg9Jk8aZnbsUAYfi9rUMNCMXEi1LrnR-UgNPqaZ1y_DM3pwTntNbkLwSWOiGP5__9YlPlcC1cgzlkNsAf7qPsVB-oJxJ1MU_8ExV2ewECjb1Rpb62V8VQ3sC8TBkOxKU51R1MEQpVfr5Se5QUvcKX9ZJDwGp_72l9zrUG5jck3PwRL8F0hAOB_dXRE6Wivvq_xwqo7JPg9co8OjIfDsnIhHeSCoH_m-B6NUS5LCBd7h85IYs5Cb0jMF6shuSZxghr4g9XESmCBwGQ2fJfQ1w"
    media_api(AUTH_TOKEN)