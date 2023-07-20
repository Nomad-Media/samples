from contents.get_content import *
from contents.create_content import *
from contents.update_content import *
from contents.delete_content import *

import json

def get_content_main(AUTH_TOKEN):
    try:
        ID = input("Enter id: ")
        CONTENT_DEFINITION_ID = input("Enter contentent definition id: ")
        if input("Do you want to sort the results (y/n): ") == "y":
            SORT_COLUMN = input("Enter the parameter name you want to sort by: ")
            IS_DESC_STR = input("Enter if you want to display the sorted parameter "\
                                "in ascending or descending order (asc, desc): ")
            IS_DESC = True if IS_DESC_STR == "desc" else False
            PAGE_INDEX = input("Enter the index you want to start the sort on: ")
            PAGE_SIZE = input("Enter the amount of results you want to display: ")
            LANGUAGE_ID = input("Enter the language id you want to sort by: ")
        else:
            SORT_COLUMN = IS_DESC = PAGE_INDEX = PAGE_SIZE = LANGUAGE_ID = ""
        

        print("Getting content")
        INFO = get_content(AUTH_TOKEN, ID, CONTENT_DEFINITION_ID, SORT_COLUMN, IS_DESC, 
                           PAGE_INDEX, PAGE_SIZE, LANGUAGE_ID)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    
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
    try:
        ID = input("Enter id: ")
        CONTENT_DEFINITION_ID = input("Enter contentent definition id: ")

        print("Deleting content")
        delete_content(AUTH_TOKEN, ID, CONTENT_DEFINITION_ID)
        print("Content Deleted")
    except:
        raise Exception()

if __name__ == "__main__":
    AUTH_TOKEN = "eyJraWQiOiJkSkpRa3ZxdWxDekpqZEFmWTR0UGwrSytyWldVTE5OTkR1YitYVnljaFNRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJjdXN0b206Y29udGFjdF9pZCI6ImU5YWIxNDFmLWMxMjgtNDE5Yi04YTQ3LWIzNTg1MTQwMzZkNyIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX1ZHRXhveTY0aSIsImNvZ25pdG86dXNlcm5hbWUiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJnaXZlbl9uYW1lIjoiU2NvdHQiLCJvcmlnaW5fanRpIjoiN2UzYzMwMzAtMWE3OS00NzQyLWIyODItZTU3M2I4OTg3Y2QzIiwiYXVkIjoiNWUybm92MXAzYTZxNHM1MHZjamo1ZXNqYjciLCJldmVudF9pZCI6IjYyMTY0MTBiLWZmYTItNDE4Yi1hNTM5LWJkMDI5MTgxODkwOSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjg5NzEyNDUyLCJleHAiOjE2ODk3MTYwNTIsImlhdCI6MTY4OTcxMjQ1MiwiZmFtaWx5X25hbWUiOiJGYWx1ZGkiLCJqdGkiOiI2YWUyNTYxNy0wZmU2LTQ5Y2UtOGJmMC1hNTk5ZTkwNTQ0OWEiLCJlbWFpbCI6InNmYWx1ZGlAbm9tYWQtY21zLmNvbSJ9.bXVHZtVE93MQtP1u-YbXQLUUOYY4kZIu59tSiK0XfiA524z8Em4dLLkrQx-leVIGLuTOqG59HXaLOAk1j8iY7GA5mkuZrQl2cQbONHmkz45lPWHmrVCunHpJYR1tS4o_Or-Tf6X22Mcia7NAqRuu339-1OViLk7h8JSBu6ZxF4R5d5G-lhUDJpbEYsLe5EnySpar63_vRX0NZ82TjjjWzdQ48HUngjrFCkFhabu9rm161FpgA4ASEnSZxmavfw9XnPvGnoQmcX_7WYSCsz8u5znWZhlYzC9AH066584OxLrR5OkOloEloS6RuaNoy5gEOuNoXjWXcU72It9n-wNnlw"
    print(f"Enter authentication token: {AUTH_TOKEN}")

    while True:
        print("Do you want to get content by id, create a content, update a content, "\
              "delete a content, or exit")
        USER_INPUT = input("Enter get, create, update, delete, or exit for each option above respectivly: ")

        if USER_INPUT == "get":
            get_content_main(AUTH_TOKEN)

        elif USER_INPUT == "create":
            create_content_main(AUTH_TOKEN)

        elif USER_INPUT == "update":
            update_content_main(AUTH_TOKEN)

        elif USER_INPUT == "delete":
            delete_content_main(AUTH_TOKEN)

        elif USER_INPUT == "exit":
            break

        else:
            print("Invalid input")