from contents.create_content import *
from contents.update_content import *
from contents.delete_content import *

import json

def create_content_main(AUTH_TOKEN):
    try:
        CONTENT_DEFINITION_ID = input("Enter contentent definition id: ")
        
        print("Creating content")
        ID = create_content(AUTH_TOKEN, CONTENT_DEFINITION_ID)
        print(json.dumps(ID, indent=4))

    except:
        raise Exception()

def update_content_main(AUTH_TOKEN):
    try:
        CONTENT_DEFINITION_ID = input("Enter contentent definition id: ")
        ID = input("Enter the id: ")

        PROPERTIES = json.loads(input("Enter the property json: \n"))

        print("Updating content")
        INFO = update_content(AUTH_TOKEN, ID, CONTENT_DEFINITION_ID, PROPERTIES)
        print(json.dumps(INFO, indent=4))

    except:
        raise Exception()

def delete_content_main(AUTH_TOKEN):
    ID = input("Enter id: ")
    CONTENT_DEFINITION_ID = input("Enter contentent definition id: ")

    print("Deleting content")
    delete_content(AUTH_TOKEN, ID, CONTENT_DEFINITION_ID)
    print("Content Deleted")

if __name__ == "__main__":
    AUTH_TOKEN = "eyJraWQiOiJkSkpRa3ZxdWxDekpqZEFmWTR0UGwrSytyWldVTE5OTkR1YitYVnljaFNRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJjdXN0b206Y29udGFjdF9pZCI6ImU5YWIxNDFmLWMxMjgtNDE5Yi04YTQ3LWIzNTg1MTQwMzZkNyIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX1ZHRXhveTY0aSIsImNvZ25pdG86dXNlcm5hbWUiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJnaXZlbl9uYW1lIjoiU2NvdHQiLCJvcmlnaW5fanRpIjoiNTlkOTdjNGMtNTBjMi00M2NlLWE0OGYtZmFlNDYxMzk5YTBkIiwiYXVkIjoiNWUybm92MXAzYTZxNHM1MHZjamo1ZXNqYjciLCJldmVudF9pZCI6ImY4OWYwMzM4LTQ0YWItNDBiYy1iNTczLTQwNzYzMTYyMDZlZiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjg5NjI5OTIyLCJleHAiOjE2ODk2MzM1MjIsImlhdCI6MTY4OTYyOTkyMiwiZmFtaWx5X25hbWUiOiJGYWx1ZGkiLCJqdGkiOiI5YTA5OTk3Yy0yYTA3LTQzYmMtODA4Mi0zZDMwNDI4NWM3ZGMiLCJlbWFpbCI6InNmYWx1ZGlAbm9tYWQtY21zLmNvbSJ9.LvlQrUdN2JF7IXa5FNpW1TZxlfbl-hkefWBESd0NdElL0gRKqu_AbjK7ibpVlQdg6x80bV8MX5tGDE5Te5UDlNv7VB_7EqPr9iVvfIES21LFKYyhVanyh0QQn2H_hXo9YHkqU46MVxOikbJ_AZGk6fvRIBf_cAzKveuusBy1OKGhTaxux3uuMa9Q0idWGRTppYIlvuAISo_Rgs4TXgCkOt-eT0iau1YBDzN1dvmr3iqJ6GKPw6TgL76EaSlBi1YgJzwyJG1nj_wnsWM66h3DiZQQiKTAnb6n8a1ygp9nGysZLL36rpnabFnKu5A9t-jrzLV_NKBudmk2o83_8lgSoA"
    print(f"Enter authentication token: {AUTH_TOKEN}")

    while True:
        print("Do you want to create a content, update a content, delete a content, or exit")
        USER_INPUT = input("Enter create, update, delete, or exit for each option above respectivly: ")

        if USER_INPUT == "create":
            create_content_main(AUTH_TOKEN)

        elif USER_INPUT == "update":
            update_content_main(AUTH_TOKEN)

        elif USER_INPUT == "delete":
            delete_content_main(AUTH_TOKEN)

        elif USER_INPUT == "exit":
            break

        else:
            print("Invalid input")