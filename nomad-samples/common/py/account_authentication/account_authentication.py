import sys, os
sys.path.append(os.path.realpath('...'))

from nomad_media_pip.nomad_sdk import Nomad_SDK
from config import config

nomad_sdk = Nomad_SDK(config)

import json

def login():
    try:
        while True:
            LOGIN_INFO = nomad_sdk.login()  
            if LOGIN_INFO != "Login info incorrect":
                break
            print("Login credentials are incorrect.")
    except:
        raise Exception()
    
def refresh_token():
    try:
        nomad_sdk.refresh_token()
    except:
        raise Exception

def reset_password():
    try:
        nomad_sdk.forgot_password()

        print("An email has been sent to you with a 6 digit code")
        while True:
            verification_input = input("Did you recieve the 6 digit code (y/n): ")
            if verification_input == "y":
                while True:
                    IS_INT = True
                    CODE = input("Enter 6 digit code: ")
                    try: 
                        int(CODE)
                    except:
                        IS_INT = False
                    if len(CODE) == 6 and IS_INT:
                        try:
                            print("Resetting password")
                            NEW_PASSWORD = input("Enter new password: ")
                            nomad_sdk.reset_password(CODE, NEW_PASSWORD)
                            print("Password Reset")
                            break
                        except:
                            print("The 6 digit code you have provided is invalid")
                    else:
                        print("The 6 digit code you have provided is invalid")
                break
            else:
                print("Resending 6 digit code")
                nomad_sdk.forgot_password()
                print("An email has been sent to you with a 6 digit code")
    except:
        raise Exception()
    
def logout():
    try:
        nomad_sdk.logout()
    except:
        raise Exception()
    
def exit():
    sys.exit()

functions = {
    "1": login,
    "2": refresh_token,
    "3": reset_password,
    "4": logout,
    "5": exit
}

if __name__ == "___":
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

