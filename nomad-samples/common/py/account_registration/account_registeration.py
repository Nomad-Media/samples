import sys, os
sys.path.append(os.path.realpath('...'))

from nomad_media_pip.nomad_sdk import Nomad_SDK
from config import config

nomad_sdk = Nomad_SDK(config)

import json

def register_user():

    try:
        print("Starting Restration process")
        FIRST_NAME = input("Enter first name: ")
        LAST_NAME = input("Enter last name: ")
        EMAIL = input("Enter email: ")
        PASSWORD = input("Enter password: ")

        REGISTER_INFO = nomad_sdk.register(EMAIL, FIRST_NAME, LAST_NAME, PASSWORD)
        print(json.dumps(REGISTER_INFO, indent=4))

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
                            nomad_sdk.verify(EMAIL, CODE)
                            print("Account now verified")
                            break
                        except:
                            print("The 6 digit code you have provided is invalid")
                    else:
                        print("The 6 digit code you have provided is invalid")
                break
            else:
                print("Resending 6 digit code")
                nomad_sdk.resend_code(EMAIL)
                print("An email has been sent to you with a 6 digit code")

    except:
        raise Exception("Register user failed")
    
    

if __name__ == "__main__":
    register_user()