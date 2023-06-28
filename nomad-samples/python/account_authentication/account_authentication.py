from account.login import *
from account.refresh_token import *
from account.forgot_password import *
from account.reset_password import *
from account.logout import *
from constants.project_constants import*
from exceptions.api_exception_handler import *

import json

def login_main():
    try:
        while True:
            USERNAME = input("Enter your username: ")
            PASSWORD = input("Enter your password: ")
            APPLICATION_ID = input("Enter your application id (optional): ")
            print("Logging in")
            LOGIN_INFO = login(USERNAME, PASSWORD, APPLICATION_ID)  
            if LOGIN_INFO != "Login info incorrect":
                break
            print("Login credentials are incorrect.")
        
        print(f"Token: {LOGIN_INFO['token']}")
        LOGIN_INFO["username"] = USERNAME
        return LOGIN_INFO, APPLICATION_ID
    except:
        raise Exception()
    
def refresh_token_main(REFRESH_TOKEN):
    try:
        print("Refreshing token")
        REFRESH_INFO = refresh_token(REFRESH_TOKEN)
        print(f"Token: {REFRESH_INFO['token']}")
        token = REFRESH_INFO["token"]
    except:
        raise Exception

def reset_password_main(AUTH_TOKEN, USERNAME):
    try:
        forgot_password(USERNAME, AUTH_TOKEN)

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
                            reset_password(USERNAME, CODE, NEW_PASSWORD)
                            print("Password Reset")
                            break
                        except:
                            print("The 6 digit code you have provided is invalid")
                    else:
                        print("The 6 digit code you have provided is invalid")
                break
            else:
                print("Resending 6 digit code")
                forgot_password(USERNAME, AUTH_TOKEN)
                print("An email has been sent to you with a 6 digit code")
    except:
        raise Exception()

if __name__ == "__main__":
    LOGIN_INFO, APPLICATION_ID = login_main()
    while True:
        print("Do you want to refresh your token, reset your password, or logout?")
        USER_INPUT = input("Enter refresh to refresh token, reset to reset your password or logout: ")
        auth_token = LOGIN_INFO["token"]
        if USER_INPUT == "refresh":
            auth_token = refresh_token_main(LOGIN_INFO["refreshToken"])
        elif USER_INPUT == "reset":
            reset_password_main(auth_token, LOGIN_INFO["username"])
        elif USER_INPUT == "logout":
            logout(auth_token, LOGIN_INFO["userSessionId"], APPLICATION_ID)
            print("Logged out successfully")
            break
        else:
            print("The input is incorrect")

