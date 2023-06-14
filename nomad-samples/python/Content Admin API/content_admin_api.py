from content.add_custom_properties import *
from content.add_related_content import *
from content.add_tags_and_collections import *
from content.delete_related_content import *
from content.delete_tags_and_collections import *
from content.get_content_definition import *
from content.update_content_definition import *

import json

def content(AUTH_TOKEN):
    try:
        print("Creating Tag")
        TAG_INFO = add_tag_or_collection(AUTH_TOKEN, "tag")
        print(json.dumps(TAG_INFO, indent=4))

        print("Deleting Tag")
        DELETE_TAG_INFO = delete_tag_or_collection(AUTH_TOKEN, "tag", TAG_INFO["items"][0]["id"], TAG_INFO["items"][0]["tagId"])
        print(json.dumps(DELETE_TAG_INFO, indent=4))

        print("Creating related content")
        RELATED_CONTENT_INFO = add_related_content(AUTH_TOKEN)
        print(json.dumps(RELATED_CONTENT_INFO, indent=4))

        print("Deleting related content")
        delete_related_content(AUTH_TOKEN, RELATED_CONTENT_INFO["items"][0]["id"], RELATED_CONTENT_INFO["items"][0]["relatedContentId"])

        #add_custom_properties(AUTH_TOKEN, ID)

        print("Getting content definition")
        CONTENT_DEFINITION_INFO = get_content_definition(AUTH_TOKEN)
        print(json.dumps(CONTENT_DEFINITION_INFO, indent = 4))

        #print("Updating content defintion")
        #UPDATED_CONTENT_DEFINTION_INFO = update_content_definition(AUTH_TOKEN, CONTENT_DEFINITION_INFO["contentDefinitionId"])

    except:
        raise Exception()

if __name__ == "__main__":
    AUTH_TOKEN = "eyJraWQiOiJkSkpRa3ZxdWxDekpqZEFmWTR0UGwrSytyWldVTE5OTkR1YitYVnljaFNRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJjdXN0b206Y29udGFjdF9pZCI6ImU5YWIxNDFmLWMxMjgtNDE5Yi04YTQ3LWIzNTg1MTQwMzZkNyIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX1ZHRXhveTY0aSIsImNvZ25pdG86dXNlcm5hbWUiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJnaXZlbl9uYW1lIjoiU2NvdHQiLCJvcmlnaW5fanRpIjoiOTE3ODQzN2YtYzhjNC00ODBhLWExMjYtMzc0NDI0ZTBmY2JkIiwiYXVkIjoiNWUybm92MXAzYTZxNHM1MHZjamo1ZXNqYjciLCJldmVudF9pZCI6IjUzMzZkYTQwLWEyYzktNDJmNS1iMGJiLTUwZGM5YWZlMTEyMCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjg2Njg4MDAxLCJleHAiOjE2ODY2OTE2MDEsImlhdCI6MTY4NjY4ODAwMSwiZmFtaWx5X25hbWUiOiJGYWx1ZGkiLCJqdGkiOiI5YTYxZjRkZS02NDk2LTQ5NWMtOTY0NC05ZmQ2ZmQyMzdiZTQiLCJlbWFpbCI6InNmYWx1ZGlAbm9tYWQtY21zLmNvbSJ9.P1GrcD88rGMlS2Zlo04X6CeAr-28Q7lpQLktbjmOGczqJfQW7iPyp3GL77FBpf6Ox7CYlGaTvhU_sVALYHmkRY65eeUeaALTKH5VprzO19Z6A1xRWsqir6I8aBvNCA_oE6bCr2uScG-Dyafa4F0aiZDIRjNXjDmYmHxIKYsomm-Z75NLXx_LXMUBmR3Ulcswq8PhY0tUFJw3dqsvDHuNaYVC2p9jBl6TOz84NjveFLq5pvryZlVijlvEaCeVBY-RoEjBRTPpx3yf5RtU4yBMRubm8ynS6mv7Ie1kqQ8W4KVbRyVA-TZJg7yCwXXb7tEN3T3sxbDPmd7hiJG8iGhttg"
    content(AUTH_TOKEN)