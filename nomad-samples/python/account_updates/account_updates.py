from account.change_email import *
from account.change_password import *
from account.update_user import *

import json

def update_user_main(AUTH_TOKEN):
    try:
        print("Updating user")
        print(json.dumps(update_user(AUTH_TOKEN)))
    except:
        raise Exception()

def change_email_main(AUTH_TOKEN):
    try:
        print("Changing email")
        change_email(AUTH_TOKEN)
    except:
        raise Exception()

def change_password_main(AUTH_TOKEN):
    try:
        print("Changing password")
        change_password(AUTH_TOKEN)
    except:
        raise Exception("Failed to update account")

if __name__ == "__main__":
    AUTH_TOKEN = input("Enter your authentication token: ")
    
    while True:
        print("Do you want to update the user, change your email or password, or quit")
        USER_INPUT = input("Enter user for update user, email for change email, password for change password, and exit to quit: ")
        
        if USER_INPUT == "update user":
            update_user_main(AUTH_TOKEN)
        elif USER_INPUT == "change email":
            change_email_main(AUTH_TOKEN)
        elif USER_INPUT == "change password":
            change_password_main(AUTH_TOKEN)
        elif USER_INPUT == "exit":
            break
        else:
            print("Input invalid")