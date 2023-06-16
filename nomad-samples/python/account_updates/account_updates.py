from account.change_email import *
from account.change_password import *
from account.update_user import *

import json

def update_user_main(AUTH_TOKEN):
    try:
        print("Updateable values: email, first name, last name, phone number")
        USER_UPDATES = input("Enter the values you want to update (separated by comma no space): ")

        BODY = {}
        for update in USER_UPDATES.split(","):
            if update == "email":
                EMAIL = input("Enter your new email: ")
                BODY["email"] = EMAIL
            elif update == "first name":
                FIRST_NAME = input("Enter your new first name: ")
                BODY["firstName"] = FIRST_NAME
            elif update == "last name":
                LAST_NAME = input("Enter your new last name: ")
                BODY["lastName"] = LAST_NAME
            elif update == "phone number":
                PHONE_NUMBER = input("Enter your new phone number: ")
                BODY["mobilePhone"] = PHONE_NUMBER

        print("Updating user")
        print(json.dumps(BODY, indent=4))
        #print(json.dumps(update_user(AUTH_TOKEN, BODY), indent=4))
    except:
        raise Exception()

def change_email_main(AUTH_TOKEN):
    try:
        EMAIL = input("Enter your new email: ")
        PASSWORD = input("Enter your password: ")

        print("Changing email")
        #change_email(AUTH_TOKEN, EMAIL, PASSWORD)
        print("Email changed")
    except:
        raise Exception()

def change_password_main(AUTH_TOKEN):
    try:
        CURRENT_PASSWORD = input("Enter your current password: ")
        NEW_PASSWORD = input("Enter your new password: ")

        print("Changing password")
        #change_password(AUTH_TOKEN, CURRENT_PASSWORD, NEW_PASSWORD)
        print("Password changed")
    except:
        raise Exception()

if __name__ == "__main__":
    AUTH_TOKEN = input("Enter your authentication token: ")
    
    while True:
        print("Do you want to update the user, change your email or password, or quit")
        USER_INPUT = input("Enter user for update user, email for change email, password for change password, and exit to quit: ")
        
        if USER_INPUT == "user":
            update_user_main(AUTH_TOKEN)
        elif USER_INPUT == "email":
            change_email_main(AUTH_TOKEN)
        elif USER_INPUT == "password":
            change_password_main(AUTH_TOKEN)
        elif USER_INPUT == "exit":
            break
        else:
            print("Input invalid")