from media.content_search import *
from media.forms import *
from media.media_search import *

import json

def content_search_main(AUTH_TOKEN):
    filterYN = True if input("Do you want to add a filter (y/n)?\n") == "y" else False
    
    FILTERS = []
    while filterYN:
        fieldName = input("Enter field name: ")
        operator = input("Enter operator: ")
        value = input("Enter value: ")

        filter = { 
            "fieldName": fieldName,
            "operator": operator,
            "value": value
        }

        FILTERS.append(filter)

        filterYN = True if input("Do you want to add another field (y/n)?\n") == "y" else False

    FIELD_NAMES = input("Enter field names (separated by comma): ").split(",")
    SORT_FIELDS_NAME = input("Enter field name you want to sort by: ")
    SORT_FIELDS_ORDER = input("Enter the order you want to sort the field by (ascending/descending): ")

    try:
        print("Content search")
        CONTENT = content_search(AUTH_TOKEN, FILTERS, FIELD_NAMES, SORT_FIELDS_NAME, SORT_FIELDS_ORDER)
        print(json.dumps(CONTENT, indent=4))
    except:
        raise Exception()

def media_search_main(AUTH_TOKEN):
    try:
        SEARCH_QUERY = input("Enter search query: ")
        IDS = input("Enter Ids (separated by comma): ").split(",")
        SORT_FIELDS_NAME = input("Enter field name you want to sort by: ")
        SORT_FIELDS_ORDER = input("Enter the order you want to sort the field by (ascending/descending): ")

        print("Media search")
        MEDIA = media_search(AUTH_TOKEN, SEARCH_QUERY, IDS, SORT_FIELDS_NAME, SORT_FIELDS_ORDER)
        print(json.dumps(MEDIA, indent=4))
    except:
        raise Exception()

def forms_main(AUTH_TOKEN):
    ID = input("Enter id: ")
    FIRST_NAME = input("Enter first name: ")
    LAST_NAME = input("Enter last name: ")
    ACTIVE = True if input("Enter active (true/false): ") == "true" else False
    START_DATE = input("Enter start date (YYYY-MM-DDTHH:MM:SS): ") + "Z"
    LOOKUP_ID = input("Enter lookup id: ")
    DESCRIPTION = input("Enter description: ")

    try:
        print("Forms")
        FORMS = forms(AUTH_TOKEN, ID, FIRST_NAME, LAST_NAME, ACTIVE, START_DATE, LOOKUP_ID, DESCRIPTION)
        print(json.dumps(FORMS, indent=4))
    except:
        raise Exception()

if __name__ == "__main__":
    AUTH_TOKEN = "eyJraWQiOiJkSkpRa3ZxdWxDekpqZEFmWTR0UGwrSytyWldVTE5OTkR1YitYVnljaFNRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJjdXN0b206Y29udGFjdF9pZCI6ImU5YWIxNDFmLWMxMjgtNDE5Yi04YTQ3LWIzNTg1MTQwMzZkNyIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX1ZHRXhveTY0aSIsImNvZ25pdG86dXNlcm5hbWUiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJnaXZlbl9uYW1lIjoiU2NvdHQiLCJvcmlnaW5fanRpIjoiYjdmYzAzYzEtM2Q3MS00ZjM0LTk0YmQtZjVhMWNkZDJlY2RkIiwiYXVkIjoiNWUybm92MXAzYTZxNHM1MHZjamo1ZXNqYjciLCJldmVudF9pZCI6IjA3ZDBlNWNmLTFhMWEtNDM0OS1hNjVhLTBmODQ0YmZhYjM5ZSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjg3Mjg0MDMwLCJleHAiOjE2ODcyODc2MzAsImlhdCI6MTY4NzI4NDAzMCwiZmFtaWx5X25hbWUiOiJGYWx1ZGkiLCJqdGkiOiI0MzQ3NjQ0MC1lNzY2LTRhODQtYWY1MS1kMjcwODJmYWMzY2QiLCJlbWFpbCI6InNmYWx1ZGlAbm9tYWQtY21zLmNvbSJ9.lix-88YDV1bZlnNnQFsB8rb7TW0b3G3eaNnt_E6TBOWmyRkVCdl2PKTFCj0WbXERIhR45SSDUKBeYYq5xDUv8-9iTbbJX-9aQFGjTdHhgIVqdZvZ8q5DFWJ9w2HZxWwr6qze_XWZIPbsWxM5EDlSqilt3Gk64DqP5EXti3ZNuHlrZ1N2PspA600FDffbslvZ4esmkXCBZczsGoAJLNPneltnsFdw-80Q7j1Z97V90kPY67rsE1tcMQYNS_dDiJCzFDHy1ui019r_45sLc6ytgbm799OBx90lxeJDu9t4aDpb7CKEKrml42DNEz5cuA0xbJ461FOjkhcormYq1dENJQ"
    print(f"Enter your authentication token :\n{AUTH_TOKEN}")

    while True:
        print("Do you want to search content, search media, create a form, or exit")
        USER_INPUT = input("Enter content, media, form, or exit for each option above respectively: ")

        if USER_INPUT == "content":
            content_search_main(AUTH_TOKEN)
        elif USER_INPUT == "media":
            media_search_main(AUTH_TOKEN)
        elif USER_INPUT == "form":
            forms_main(AUTH_TOKEN)
        elif USER_INPUT == "exit":
            break
        else:
            print("Invalid input")