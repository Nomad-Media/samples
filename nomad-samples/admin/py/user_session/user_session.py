import sys, os
sys.path.append(os.path.realpath('...'))

from nomad_media_pip.nomad_sdk import Nomad_SDK
from config import config

nomad_sdk = Nomad_SDK(config)

import json

def change_session_status():
    try:
        USER_SESSION_STATUS = input("Enter user session status: The options are Normal, ChatDisabled, SessionReplaced, Deactivated, SharedAccess, PendingInvite, Expired, DeleteInvite")
        APPLICATON_ID = input("Enter application id: ")

        nomad_sdk.change_session_status(USER_SESSION_STATUS, APPLICATON_ID)

    except:
        raise Exception()
    
def get_user_session():
    try:
        INFO = nomad_sdk.get_user_session()
        print(json.dumps(INFO, indent=4))

    except:
        raise Exception()
    
functions = {
    "1": change_session_status,
    "2": get_user_session
}

if __name__ == "__main__":
    print("Which function do you want to run?")
    for key, value in functions.items():
        print(f"{key}: {value.__name__}")

    while True:
        USER_INPUT = input("Enter the number of the function you want to run: ")
        if USER_INPUT in functions:
            functions[USER_INPUT]()
            break
        else:
            print("Invalid input")
