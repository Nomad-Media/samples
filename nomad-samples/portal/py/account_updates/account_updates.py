import sys, os
sys.path.append(os.path.realpath('...'))

from nomad_media_pip.nomad_sdk import Nomad_SDK
from config import config

nomad_sdk = Nomad_SDK(config)

import json

def update_user():
    try:
        print("Leave fields you don't want to update blank")
        ADDRESS = input("Enter new address: ")
        ADDRESS2 = input("Enter new second address: ")
        CITY = input("Enter new city: ")
        STATE = input("Enter new state: ")
        FIRST_NAME = input("Enter new first name: ")
        LAST_NAME = input("Enter new last name: ")
        PHONE_NUMBER = input("Enter new phone number: ")
        PHONE_EXT = input("Enter new phone extention: ")
        POSTAL_CODE = input("Enter new postal code: ")
        ORGANIZATION = input("Enter new organization: ")

        while True:
            COUNTRIES = nomad_sdk.misc_function("config/ea1d7060-6291-46b8-9468-135e7b94021b/lookups.json",
                                                "GET", None, True)[5]

            COUNTRY = {}

            COUNTRY_INPUT = input("Enter country: ")
            if COUNTRY_INPUT == "": 
                COUNTRY = ""
                break

            for COUNTRY_DICT in COUNTRIES["children"]:
                if COUNTRY_DICT['label'] == COUNTRY_INPUT:
                    COUNTRY = COUNTRY_DICT
                    break
            if COUNTRY_DICT is not None:
                break

            print("The country you entered does not exist")


        print("Updating user")
        INFO = nomad_sdk.update_user(ADDRESS, ADDRESS2, CITY, FIRST_NAME, LAST_NAME, \
                           PHONE_NUMBER, PHONE_EXT, POSTAL_CODE, ORGANIZATION, COUNTRY, STATE)
        
        print(json.dumps(INFO, indent=4))
    except:
        raise Exception()

def change_email():
    try:
        EMAIL = input("Enter your new email: ")
        PASSWORD = input("Enter your password: ")

        print("Changing email")
        nomad_sdk.change_email(EMAIL, PASSWORD)
        print("Email changed")
    except:
        raise Exception()

def change_password():
    try:
        CURRENT_PASSWORD = input("Enter your current password: ")
        NEW_PASSWORD = input("Enter your new password: ")

        print("Changing password")
        nomad_sdk.change_password(CURRENT_PASSWORD, NEW_PASSWORD)
        print("Password changed")
    except:
        raise Exception()

if __name__ == "__main__":
    while True:
        print("Do you want to update the user, change your email or password, or quit")
        USER_INPUT = input("Enter user for update user, email for change email, password for change password, and exit to quit: ")
        
        if USER_INPUT == "user":
            update_user()
        elif USER_INPUT == "email":
            change_email()
        elif USER_INPUT == "password":
            change_password()
        elif USER_INPUT == "exit":
            break
        else:
            print("Input invalid")