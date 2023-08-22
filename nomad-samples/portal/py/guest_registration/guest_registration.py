from account.guest_invite import *
from account.participant_panel_query import *
from account.ping_user import *
from account.register_guest import *
from account.remove_guest_invitation import *

import json

def invite_guest(AUTH_TOKEN):
    try:
        CONTENT_ID = input("Enter content ID: ")
        CONTENT_DEFINITION_ID = input("Enter content definition ID: ")
        USER_ID = input("Enter user ID: ")
        EMAILS = input("Enter emails (separated by comma): ").split(",")
        CONTENT_SECURITY_ATTRIBUTE = input("Enter content security attribute (Undefined, Guest, Demo): ")

        print("Inviting Guest")
        INFO = guest_invite(AUTH_TOKEN, CONTENT_ID, CONTENT_DEFINITION_ID, USER_ID, 
                            EMAILS, CONTENT_SECURITY_ATTRIBUTE)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()

def remove_guest_invite(AUTH_TOKEN):
    try:
        CONTENT_ID = input("Enter content ID: ")
        CONTENT_DEFINITION_ID = input("Enter content definition ID: ")
        USER_ID = input("Enter user ID: ")
        EMAILS = input("Enter emails (separated by comma): ").split(",")
        CONTENT_SECURITY_ATTRIBUTE = input("Enter content security attribute (Undefined, Guest, Demo): ")

        print("Removing guest invitation")
        INFO = remove_guest_invitation(AUTH_TOKEN, CONTENT_ID, CONTENT_DEFINITION_ID, USER_ID, 
                                       EMAILS, CONTENT_SECURITY_ATTRIBUTE)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()


def register_guest_main(AUTH_TOKEN):
    try:
        EMAIL = input("Enter email: ")
        FIRST_NAME = input("Enter first name: ")
        LAST_NAME = input("Enter last name: ")
        PASSWORD = input("Enter password: ")

        print("Registering Guest")
        INFO = register_guest(AUTH_TOKEN, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()
    
def ping_user(AUTH_TOKEN):
    try:
        APPLICATION_ID = input("Enter application ID: ")
        USER_ID = input("Enter user ID: ")

        print("Pinging user")
        INFO = ping_user(AUTH_TOKEN, APPLICATION_ID, USER_ID)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()

def participant_panel_query_main(AUTH_TOKEN):
    try:
        USER_ID = input("Enter user ID: ")
        API = input("Enter API (portal, admin): ")

        print("Getting participant panel query")
        INFO = participant_panel_query(AUTH_TOKEN, USER_ID, API)
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()

if __name__ == "__main__":
    AUTH_TOKEN = "eyJraWQiOiJkSkpRa3ZxdWxDekpqZEFmWTR0UGwrSytyWldVTE5OTkR1YitYVnljaFNRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJjdXN0b206Y29udGFjdF9pZCI6ImU5YWIxNDFmLWMxMjgtNDE5Yi04YTQ3LWIzNTg1MTQwMzZkNyIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX1ZHRXhveTY0aSIsImNvZ25pdG86dXNlcm5hbWUiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJnaXZlbl9uYW1lIjoiU2NvdHQiLCJvcmlnaW5fanRpIjoiZWY2MjQ5ODEtMzUyMS00ZTI4LTlkYzYtNDkyYWU4MjE3ZWQ3IiwiYXVkIjoiNWUybm92MXAzYTZxNHM1MHZjamo1ZXNqYjciLCJldmVudF9pZCI6IjRmMGY4Y2MxLTc0MTEtNGZhNy05NjgzLTE0YTFiOGZlMDRjZCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjg1NTc0NTMzLCJleHAiOjE2ODU1NzgxMzMsImlhdCI6MTY4NTU3NDUzMywiZmFtaWx5X25hbWUiOiJGYWx1ZGkiLCJqdGkiOiI3OTY4YTJkNi1jNGQ4LTQwZWUtOTg0Ni1hYzhkMjg4N2FjN2YiLCJlbWFpbCI6InNmYWx1ZGlAbm9tYWQtY21zLmNvbSJ9.LGkGKuUoYrFi2ssBnYxdkAYq8rdDvykw7ofzfe7djd1Dz8vfpq4QWB9qXqM6Ke5-e9SnVEzGNXyZdmurTt2LEpuZ1-cl7EcGrIjUQr9gxCl3E1RCO5abNCc2dgT25N82Yo3DK6VCAYd11r7PXEAtaavGuRsmXg8cWIyvT1-5w10oJekWxI6whdg_R4O3hIdH_pzQF7mznkPicED1O5kaqZrDPvylGWRq6K4FJPqj-3_eoMuFPNRv35OqAjKpLZNUuqpbWcjjXJYhzPA8b_ETwvCrrS9icEiapJxLQwmZs61sYNErEk0xzbMJ6LbV-bNUW4gy94lhVJC60f7m87GhtA"#input("Enter authentication token: ")
    
    while True:
        print("Do you want to invite a guest, remove invitation/security attribute, register a guest, "\
              "ping a user, get participant panel query, or exit?")
        USER_INPUT = input("Enter invite, remove, register, ping, query, or exit for each option above respectivly: ")

        if USER_INPUT == "invite":
            invite_guest(AUTH_TOKEN)

        elif USER_INPUT == "remove":
            remove_guest_invite(AUTH_TOKEN)

        elif USER_INPUT == "register":
            register_guest_main(AUTH_TOKEN)

        elif USER_INPUT == "ping":
            ping_user(AUTH_TOKEN)

        elif USER_INPUT == "query":
            participant_panel_query_main(AUTH_TOKEN)

        elif USER_INPUT == "exit":
            break

        else:
            print("Invalid input")